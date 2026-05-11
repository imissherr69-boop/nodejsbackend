import { TodoRepository } from "../repository/todo.repository.js";

export class TodoService {
  static getAllTodos(query: any) {
    return TodoRepository.findAll(query);
  }

  static getTodoById(id: string) {
    return TodoRepository.findById(id);
  }

  static createTodo(data: any) {
    return TodoRepository.create(data);
  }

  static updateTodo(id: string, data: any) {
    return TodoRepository.update(id, data);
  }

  static deleteTodo(id: string) {
    return TodoRepository.delete(id);
  }
}