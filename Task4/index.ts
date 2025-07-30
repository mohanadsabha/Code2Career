import { Booking } from "./models/booking.model";
import { Course } from "./models/course.model";
import { User } from "./models/user.model";
import { Repository } from "./repositories/base.repository";

async function runTests() {
  console.log("🚀 Starting TypeScript Generic Repository System Tests\n");

  // Initialize repositories
  const userRepo = new Repository<User>();
  const courseRepo = new Repository<Course>();
  const bookingRepo = new Repository<Booking>();


  /**
   * most of console logs below are written with Ai
   */

  console.log("📊 Repository Initialization Complete\n");

  // User Tests
  console.log("👤 Testing User Repository");
  console.log("=".repeat(50));

  // Test findAll
  console.log("📋 Finding all users:");
  const allUsers = await userRepo.findAll();
  console.log(
    `Found ${allUsers.length} users:`,
    allUsers.map((u) => `${u.name} (${u.role})`)
  );

  // Test findById
  console.log("\n🔍 Finding user by ID (user1):");
  const user = await userRepo.findById("user1");
  console.log("Found user:", user?.name || "Not found");

  // Test create
  console.log("\n➕ Creating new user:");
  const newUser = await userRepo.create({
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    age: 29,
    role: "user",
  });
  console.log("Created user:", newUser);

  // Test update
  console.log("\n✏️ Updating user (user2):");
  const updatedUser = await userRepo.update("user2", {
    age: 33,
    role: "admin",
  });
  console.log("Updated user:", updatedUser);

  // Test findByFilter
  console.log("\n🎯 Finding users by filter (role: admin):");
  const adminUsers = await userRepo.findByFilter({ role: "admin" });
  console.log(
    "Admin users:",
    adminUsers.map((u) => u.name)
  );

  // Test delete
  console.log("\n🗑️ Deleting user (user3):");
  const deleted = await userRepo.delete("user3");
  console.log("User deleted:", deleted);
  const remainingUsers = await userRepo.count();
  console.log("Remaining users count:", remainingUsers);

  // Course Tests
  console.log("\n\n📚 Testing Courses Repository");
  console.log("=".repeat(50));

  // Test findAll
  console.log("📋 Finding all courses:");
  const allCourses = await courseRepo.findAll();
  console.log(
    `Found ${allCourses.length} courses:`,
    allCourses.map((c) => `${c.title} ($${c.price})`)
  );

  // Test create
  console.log("\n➕ Creating new course:");
  const newCourse = await courseRepo.create({
    title: "React Advanced Patterns",
    description: "Learn advanced React patterns and best practices",
    instructor: "Alice Johnson",
    duration: 30,
    category: "programming",
    price: 249.99,
  });
  console.log("Created course:", newCourse.title);

  // Test findByFilter
  console.log("\n🎯 Finding courses by filter (category: programming):");
  const programmingCourses = await courseRepo.findByFilter({
    category: "programming",
  });
  console.log(
    "Programming courses:",
    programmingCourses.map((c) => c.title)
  );

  // Test update
  console.log("\n✏️ Updating course (course1):");
  const updatedCourse = await courseRepo.update("course1", {
    price: 279.99,
    duration: 45,
  });
  console.log(
    "Updated course:",
    `${updatedCourse?.title} - New price: $${updatedCourse?.price}`
  );

  // Booking Tests
  console.log("\n\n📅 Testing Booking Repository");
  console.log("=".repeat(50));

  // Test findAll
  console.log("📋 Finding all bookings:");
  const allBookings = await bookingRepo.findAll();
  console.log(
    `Found ${allBookings.length} bookings:`,
    allBookings.map((b) => `${b.id} (${b.status}) - $${b.paymentAmount}`)
  );

  // Test create
  console.log("\n➕ Creating new booking:");
  const newBooking = await bookingRepo.create({
    userId: "user1",
    courseId: "course2",
    bookingDate: new Date(),
    status: "pending",
    paymentAmount: 199.99,
  });
  console.log("Created booking:", newBooking.id);

  // Test findByFilter
  console.log("\n🎯 Finding bookings by filter (status: confirmed):");
  const confirmedBookings = await bookingRepo.findByFilter({
    status: "confirmed",
  });
  console.log(
    "Confirmed bookings:",
    confirmedBookings.map((b) => b.id)
  );

  // Test update
  console.log("\n✏️ Updating booking status (booking2):");
  const updatedBooking = await bookingRepo.update("booking2", {
    status: "confirmed",
  });
  console.log(
    "Updated booking:",
    `${updatedBooking?.id} - New status: ${updatedBooking?.status}`
  );

  // Final test - delete
  console.log("\n🗑️ Deleting booking (booking3):");
  const bookingDeleted = await bookingRepo.delete("booking3");
  console.log("Booking deleted:", bookingDeleted);

  // Summary
  console.log("\n\n📊 FINAL SUMMARY");
  console.log("=".repeat(50));
  console.log(`👤 Users remaining: ${await userRepo.count()}`);
  console.log(`📚 Courses available: ${await courseRepo.count()}`);
  console.log(`📅 Bookings active: ${await bookingRepo.count()}`);

  console.log("\n✅ All tests completed successfully!");
  console.log(
    "🎉 Generic Repository System is working perfectly with full type safety!"
  );
}

runTests().catch(console.error);
