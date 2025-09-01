export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export class GenericRepository<T extends BaseEntity> {
  protected items: T[] = [];
  protected idCounter = 1;

  findAll(): T[] {
    return this.items;
  }

  findById(id: string): T | undefined {
    return this.items.find((item) => item.id === id);
  }

  create(data: Omit<T, "id" | "createdAt" | "updatedAt">): T {
    const now = new Date();
    const item: T = {
      ...data,
      id: this.idCounter.toString(),
      createdAt: now,
      updatedAt: now,
    } as T;
    this.items.push(item);
    this.idCounter++;
    return item;
  }

  update(
    id: string,
    data: Partial<Omit<T, "id" | "createdAt" | "updatedAt">>
  ): T | null {
    const item = this.findById(id);
    if (!item) return null;
    Object.assign(item, data);
    item.updatedAt = new Date();
    return item;
  }

  delete(id: string): boolean {
    const index = this.items.findIndex((item) => item.id === id);
    if (index === -1) return false;
    this.items.splice(index, 1);
    return true;
  }
}
