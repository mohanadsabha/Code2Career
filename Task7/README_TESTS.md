🎯 Goal
Write automated tests for the Course module using Supertest and Jest, ensuring API correctness and reliability.

✅ Requirements

1. Testing Framework
   - Use Jest as the testing framework.
   - Use Supertest for HTTP request testing.

2. Helper File
   - Create a reusable helper file for Supertest setup (e.g., initializing the app, JWT token handling).

3. Seed Data with Faker
   - Use Faker.js to generate mock users and courses for testing.
   - Ensure tests do not rely on static data but instead seed dynamic test data.

4. Course Module Tests
   - Write tests for at least 2 routes in the Course module (minimum POST /courses and another route of your choice).

5. Branching
   - Create a new Git branch named course-tests and create a pull request without merge with main .
   - All test-related changes must be committed to this branch.

📂 Suggested Folder Structure

src/
 ├── __tests__/          # Test files
 │    ├── helpers/       # Supertest helper files
 │    └── courses.test.ts
 ├── ...
jest.config.js

--------------------------------------
 Test Scenarios for Course Module

1. POST /courses
   - ✅ Success: COACH or ADMIN can create a course with valid data.
   - ❌ Forbidden: STUDENT cannot create a course.
   - ❌ Validation Error: Missing required fields returns 400.

2. GET /courses
   - ✅ Success: Returns a list of all courses (public).
   - ❌ Edge: Returns an empty array when no courses exist.

3. GET /courses/:id
   - ✅ Success: Returns course details when ID is valid.
   - ❌ Not Found: Returns 404 for invalid course ID.

4. PUT /courses/:id
   - ✅ Success: Course creator (COACH/ADMIN) updates a course successfully.
   - ❌ Forbidden: STUDENT cannot update courses.
   - ❌ Not Owner: COACH cannot update a course created by another COACH.

5. DELETE /courses/:id
   - ✅ Success: Course creator (COACH/ADMIN) deletes a course successfully.
   - ❌ Forbidden: STUDENT cannot delete courses.
   - ❌ Not Owner: COACH cannot delete a course created by another COACH.

--------------------------------------
📌 Important Notes

- Ensure Zod validation errors are tested.
- Keep test code clean, readable, and reusable with helpers.
- Final PR must include:
  - ✅ Updated README with test running instructions (npm run test).
