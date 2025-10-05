import "dotenv/config";
import { connectDB } from "../../src/db/mongoose";
import { UserModel } from "../../src/users/user.model";
import { CourseModel } from "../../src/courses/course.model";

async function seed() {
  await connectDB();

  await UserModel.deleteMany({});
  await CourseModel.deleteMany({});

  const coach = await UserModel.create({
    name: "Coach One",
    email: "coach@example.com",
    password: "password123",
    role: "COACH",
  });

  const student = await UserModel.create({
    name: "Student One",
    email: "student@example.com",
    password: "password123",
    role: "STUDENT",
  });

  await CourseModel.create({
    title: "Intro to Testing",
    description: "A course",
    ownerId: coach._id,
    students: [student._id],
  });

  console.log("Seeding finished");
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
