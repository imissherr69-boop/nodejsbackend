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
      skip: (page - 1) * Number(limit),
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
      data: {
        title: data.title,
        description: data.description,
        status: data.status,
        priority: data.priority,
        dueDate: data.dueDate ? new Date(data.dueDate) : null,
        tags: data.tags || [],
      },
    });
  }

  static update(id: string, data: any) {
    const updateData: any = {};

    if (data.title !== undefined) updateData.title = data.title;
    if (data.description !== undefined) updateData.description = data.description;
    if (data.status !== undefined) updateData.status = data.status;
    if (data.priority !== undefined) updateData.priority = data.priority;
    if (data.dueDate !== undefined) {
      updateData.dueDate = data.dueDate ? new Date(data.dueDate) : null;
    }
    if (data.tags !== undefined) updateData.tags = data.tags;
    if (data.isArchived !== undefined) updateData.isArchived = data.isArchived;

    return prisma.todo.update({
      where: { id },
      data: updateData,
    });
  }

  static delete(id: string) {
    return prisma.todo.delete({
      where: { id },
    });
  }
}