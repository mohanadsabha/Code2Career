import { User, Course, Booking } from '../models/index';
/**
 * The data below is written by ChatGPT
 */
export const seedUsers: User[] = [
  {
    id: 'user1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    age: 28,
    role: 'user'
  },
  {
    id: 'user2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    age: 32,
    role: 'admin'
  },
  {
    id: 'user3',
    name: 'Bob Wilson',
    email: 'bob.wilson@example.com',
    age: 25,
    role: 'moderator'
  }
];

export const seedCourses: Course[] = [
  {
    id: 'course1',
    title: 'Advanced TypeScript',
    description: 'Master advanced TypeScript concepts and patterns',
    instructor: 'John Doe',
    duration: 40,
    category: 'programming',
    price: 299.99
  },
  {
    id: 'course2',
    title: 'UI/UX Design Fundamentals',
    description: 'Learn the basics of user interface and experience design',
    instructor: 'Jane Smith',
    duration: 35,
    category: 'design',
    price: 199.99
  },
  {
    id: 'course3',
    title: 'Digital Marketing Strategy',
    description: 'Comprehensive guide to modern digital marketing',
    instructor: 'Bob Wilson',
    duration: 25,
    category: 'marketing',
    price: 149.99
  }
];

export const seedBookings: Booking[] = [
  {
    id: 'booking1',
    userId: 'user1',
    courseId: 'course1',
    bookingDate: new Date('2024-01-15'),
    status: 'confirmed',
    paymentAmount: 299.99
  },
  {
    id: 'booking2',
    userId: 'user2',
    courseId: 'course2',
    bookingDate: new Date('2024-01-20'),
    status: 'pending',
    paymentAmount: 199.99
  },
  {
    id: 'booking3',
    userId: 'user3',
    courseId: 'course3',
    bookingDate: new Date('2024-01-25'),
    status: 'completed',
    paymentAmount: 149.99
  }
];