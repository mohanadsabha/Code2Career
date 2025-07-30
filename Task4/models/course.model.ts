import { DataModel } from './data.model';

export interface Course extends DataModel {
  title: string;
  description: string;
  instructor: string;
  duration: number;
  category: 'programming' | 'design' | 'business' | 'marketing';
  price: number;
}