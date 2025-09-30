export interface Course {
  id: number;
  title: string;
  description: string;
  image?: string | null;
  createdAt: Date;
  updatedAt: Date;
  ownerId: number;
}
