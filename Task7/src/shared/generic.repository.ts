import { PrismaClient } from "../generated/prisma";

export interface BaseEntity {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}

export class GenericRepository<T extends BaseEntity> {
  protected prisma: PrismaClient;
  protected model: keyof PrismaClient;

  constructor(model: keyof PrismaClient) {
    this.prisma = new PrismaClient();
    this.model = model;
  }

  async findAll(): Promise<T[]> {
    return (await (this.prisma[this.model] as any).findMany()) as T[];
  }

  async findById(id: number): Promise<T | null> {
    return (await (this.prisma[this.model] as any).findUnique({
      where: { id },
    })) as T | null;
  }

  async create(data: Omit<T, "id" | "createdAt" | "updatedAt">): Promise<T> {
    return (await (this.prisma[this.model] as any).create({
      data,
    })) as T;
  }

  async update(
    id: number,
    data: Partial<Omit<T, "id" | "createdAt" | "updatedAt">>
  ): Promise<T | null> {
    return (await (this.prisma[this.model] as any).update({
      where: { id },
      data,
    })) as T;
  }

  async delete(id: number): Promise<boolean> {
    try {
      await (this.prisma[this.model] as any).delete({
        where: { id },
      });
      return true;
    } catch {
      return false;
    }
  }
}
