import { DataModel } from './data.model';

export interface User extends DataModel {
  name: string;
  email: string;
  age: number;
  role: 'admin' | 'user' | 'moderator';
}