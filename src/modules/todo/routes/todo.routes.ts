import { Router } from "express";
import { TodoController } from "../controller/todo.controller.js";
import { validate } from "../../../middlewares/validate.js";
import { createTodoSchema, updateTodoSchema } from "../todo.validation.js";

const router = Router();

/**
 * @openapi
 * /todos:
 *   get:
 *     summary: Get all todos with search, filter, and pagination
 *     description: Retrieve todos with optional search, status filter, and pagination
 *     tags:
 *       - Todos
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search in todo title (case-insensitive)
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [PENDING, DONE]
 *         description: Filter by status
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: Successfully retrieved todos
 */
router.get("/", TodoController.getAll);

/**
 * @openapi
 * /todos/{id}:
 *   get:
 *     summary: Get a todo by ID
 *     tags:
 *       - Todos
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved the todo
 *       404:
 *         description: Todo not found
 */
router.get("/:id", TodoController.getById);

/**
 * @openapi
 * /todos:
 *   post:
 *     summary: Create a new todo
 *     tags:
 *       - Todos
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [PENDING, DONE]
 *               priority:
 *                 type: string
 *                 enum: [LOW, MEDIUM, HIGH]
 *               dueDate:
 *                 type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Todo created successfully
 */
router.post("/", validate(createTodoSchema), TodoController.create);

/**
 * @openapi
 * /todos/{id}:
 *   put:
 *     summary: Update a todo
 *     tags:
 *       - Todos
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [PENDING, DONE]
 *               priority:
 *                 type: string
 *                 enum: [LOW, MEDIUM, HIGH]
 *               dueDate:
 *                 type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *               isArchived:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Todo updated successfully
 */
router.put("/:id", validate(updateTodoSchema), TodoController.update);

/**
 * @openapi
 * /todos/{id}:
 *   delete:
 *     summary: Delete a todo
 *     tags:
 *       - Todos
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Todo deleted successfully
 */
router.delete("/:id", TodoController.delete);

export default router;