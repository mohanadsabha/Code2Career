import { DataModel } from '../models/data.model';

export interface IRepository<T extends DataModel> {
  findAll(): Promise<T[]>;
  findById(id: string): Promise<T | null>;
  create(item: Omit<T, 'id'>): Promise<T>;
  update(id: string, updates: Partial<Omit<T, 'id'>>): Promise<T | null>;
  delete(id: string): Promise<boolean>;
  findByFilter(filter: Partial<T>): Promise<T[]>;
}
