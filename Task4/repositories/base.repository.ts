import { DataModel } from '../models/data.model';
import { IRepository } from '../interfaces/repository.interface';

export class Repository<T extends DataModel> implements IRepository<T> {
  protected data: T[] = [];

  constructor(initialData: T[] = []) {
    this.data = [...initialData];
  }

  async findAll(): Promise<T[]> {
    return Promise.resolve([...this.data]);
  }

  async findById(id: string): Promise<T | null> {
    const item = this.data.find(item => item.id === id);
    return Promise.resolve(item || null);
  }

  async create(item: Omit<T, 'id'>): Promise<T> {
    const newItem = {
      ...item,
      id: this.generateId()
    } as T;
    
    this.data.push(newItem);
    return Promise.resolve(newItem);
  }

  async update(id: string, updates: Partial<Omit<T, 'id'>>): Promise<T | null> {
    const index = this.data.findIndex(item => item.id === id);
    
    if (index === -1) {
      return Promise.resolve(null);
    }

    this.data[index] = { ...this.data[index], ...updates };
    return Promise.resolve(this.data[index]);
  }

  async delete(id: string): Promise<boolean> {
    const index = this.data.findIndex(item => item.id === id);
    
    if (index === -1) {
      return Promise.resolve(false);
    }

    this.data.splice(index, 1);
    return Promise.resolve(true);
  }

  async findByFilter(filter: Partial<T>): Promise<T[]> {
    const filtered = this.data.filter(item => {
      return Object.keys(filter).every(key => {
        const filterValue = filter[key as keyof T];
        const itemValue = item[key as keyof T];
        
        if (filterValue === undefined) return true;
        
        if (typeof filterValue === 'string' && typeof itemValue === 'string') {
          return itemValue.toLowerCase().includes(filterValue.toLowerCase());
        }
        
        return itemValue === filterValue;
      });
    });

    return Promise.resolve(filtered);
  }

  // Utility methods
  protected generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
  async count(): Promise<number> {
    return Promise.resolve(this.data.length);
  }
}