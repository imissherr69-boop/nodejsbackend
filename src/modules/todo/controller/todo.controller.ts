import { apiResponse } from "../../../utils/apiResponse.js";
import { StatusCodes } from "http-status-codes";
import { TodoService } from "../service/todo.service.js";

export class TodoController {
  static async getAll(req: any, res: any) {
    const todos = await TodoService.getAllTodos(req.query);
    res.status(StatusCodes.OK).json(apiResponse.success(todos));
  }

  static async getById(req: any, res: any) {
    const todo = await TodoService.getTodoById(req.params.id);

    if (!todo) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json(apiResponse.error("Todo not found"));
    }

    res.json(apiResponse.success(todo));
  }

  static async create(req: any, res: any) {
    const todo = await TodoService.createTodo(req.body);
    res.status(StatusCodes.CREATED).json(apiResponse.success(todo));
  }

  static async update(req: any, res: any) {
    const todo = await TodoService.updateTodo(req.params.id, req.body);
    res.json(apiResponse.success(todo));
  }

  static async delete(req: any, res: any) {
    await TodoService.deleteTodo(req.params.id);
    res.json(apiResponse.success(null, "Deleted successfully"));
  }
}