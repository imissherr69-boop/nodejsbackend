import prisma from "../../../config/prisma.js";

export class TodoRepository {
  static findAll(query: any) {
    const { search, status, page = 1, limit = 10 } = query;

    return prisma.todo.findMany({
      where: {
        AND: [
          search
            ? {
                title: {
                  contains: search,
                  mode: "insensitive",
                },
              }
            : {},
          status ? { status } : {},
        ],
      },
      skip: (page - 1) * limit,
      take: Number(limit),
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  static findById(id: string) {
    return prisma.todo.findUnique({
      where: { id },
    });
  }

  static create(data: any) {
    return prisma.todo.create({
      data,
    });
  }

  static update(id: string, data: any) {
    return prisma.todo.update({
      where: { id },
      data,
    });
  }

  static delete(id: string) {
    return prisma.todo.delete({
      where: { id },
    });
  }
}