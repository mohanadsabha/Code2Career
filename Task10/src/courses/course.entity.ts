export interface Course {
  id: string;
  title: string;
  description: string;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
  ownerId: string;
}
