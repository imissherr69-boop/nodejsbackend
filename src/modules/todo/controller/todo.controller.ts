import type { Request, Response } from "express";
import { TodoService } from "../service/todo.service.js";

export class TodoController {
  static async getAll(req: Request, res: Response) {
    const todos = await TodoService.getAllTodos(req.query);
    res.json(todos);
  }

  static async getById(req: Request, res: Response) {
    const id = req.params.id as string;
    const todo = await TodoService.getTodoById(id);
    res.json(todo);
  }

  static async create(req: Request, res: Response) {
    const todo = await TodoService.createTodo(req.body);
    res.status(201).json(todo);
  }

  static async update(req: Request, res: Response) {
    const id = req.params.id as string;
    const todo = await TodoService.updateTodo(id, req.body);
    res.json(todo);
  }

  static async delete(req: Request, res: Response) {
    const id = req.params.id as string;
    const result = await TodoService.deleteTodo(id);
    res.json({ message: "Deleted successfully", result });
  }
}