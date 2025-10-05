import { Model, Document } from "mongoose";

export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export class GenericRepository<T extends BaseEntity> {
  protected model: Model<Document>;

  constructor(model: Model<Document>) {
    this.model = model;
  }

  async findAll(): Promise<T[]> {
    const docs = await this.model.find().lean();
    return docs as unknown as T[];
  }

  async findById(id: string): Promise<T | null> {
    const doc = await this.model.findById(id).lean();
    return doc as unknown as T | null;
  }

  async create(data: Partial<T>): Promise<T> {
    const created = await this.model.create(data as any);
    return created.toObject() as unknown as T;
  }

  async update(id: string, data: Partial<T>): Promise<T | null> {
    const updated = await this.model
      .findByIdAndUpdate(id, data as any, {
        new: true,
        runValidators: true,
      })
      .lean();
    return updated as unknown as T | null;
  }

  async delete(id: string): Promise<boolean> {
    try {
      await this.model.findByIdAndDelete(id);
      return true;
    } catch {
      return false;
    }
  }
}
