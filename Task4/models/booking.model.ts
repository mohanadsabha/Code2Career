import { DataModel } from './data.model';

export interface Booking extends DataModel {
  userId: string;
  courseId: string;
  bookingDate: Date;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  paymentAmount: number;
}
