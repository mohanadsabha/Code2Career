import { PrismaClient } from "../../src/generated/prisma";

const prisma = new PrismaClient();

async function main() {
  // Clean existing data
  await prisma.user.deleteMany();
  await prisma.course.deleteMany();

  // Create users with different roles
  const instructor = await prisma.user.create({
    data: {
      name: "John Coach",
      email: "john@example.com",
      password: "$2b$10$VrweVzLBBmh9dPJJG1TkEODbYo0r0G2DmO8NCzY1JJUqz5YqvBhXi",
      Role: "COACH",
    },
  });

  const student = await prisma.user.create({
    data: {
      name: "Alice Student",
      email: "alice@example.com",
      password: "$2b$10$VrweVzLBBmh9dPJJG1TkEODbYo0r0G2DmO8NCzY1JJUqz5YqvBhXi", // "password123"
      Role: "STUDENT",
    },
  });

  // Create courses owned by the coach
  const course1 = await prisma.course.create({
    data: {
      title: "Introduction to Programming",
      description:
        "Learn the basics of programming with this comprehensive course",
      ownerId: instructor.id,
    },
  });

  const course2 = await prisma.course.create({
    data: {
      title: "Web Development Fundamentals",
      description: "Master the core concepts of web development",
      ownerId: instructor.id,
      students: {
        connect: { id: student.id },
      },
    },
  });

  console.log({
    instructor,
    student,
    courses: [course1, course2],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
