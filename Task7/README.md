🎯 Goal

Build a small Express API in TypeScript using a modular architecture with three modules: auth, user, and course and a Generic Repository Pattern. 
The API must support JWT authentication, role-based access (ADMIN / COACH / STUDENT), user profile management, and course CRUD operations.
All data must be stored in in-memory JavaScript objects (reset on server restart).
Use Zod for DTO validation.


 Note : Every time the server starts, there will be :  
 admin@no.com
 admin123
 ADMIN
Project Architecture

Organize the codebase into the following folder structure:

src/
 ├── auth/            # Authentication module (register, login, JWT)
 ├── users/          # User module (profile read/update)
 ├── courses/      # Course module (CRUD)
 ├── shared/        # Common utils, middlewares, and error handling
 ├── server.ts      # App entry point

Entities:
User
interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: "ADMIN" | "COACH" | "STUDENT";
  createdAt: Date;
  updatedAt: Date;
}

Course
interface Course {
  id: string;
  title: string;
  description: string;
  image?: string; 
  createdAt: Date;
  updatedAt: Date;
}

✅ Features & Requirements 
Authentication (/auth)
POST /auth/register →Register as a (default role).
POST /auth/login → Authenticate and issue JWT token.
Users (/users)
GET /users/me → Get current user profile (protected).
PUT /users/me → Update current profile.
POST /users/coach → : create a COACH user
Courses (/courses) 
POST /courses → Create a new course (only COACH or ADMIN)
GET /courses → Get all courses (public)
GET /courses/:id → Get course by ID (public)
PUT /courses/:id → Update course (only the course creator, role: COACH or ADMIN)
DELETE /courses/:id → Delete course (only the course creator, role: COACH or ADMIN)
  
Roles & Permissions     
    ADMIN
Can create COACH users
Can update/delete any course
     COACH
Can create/update/delete their own courses
     STUDENT
Default role when registering
Can only view courses

Generic Repository Requirement  

You must implement a Generic Repository class in shared/ that provides CRUD methods (findAll, findById, create, update, delete).
This repository should use TypeScript Generics so it can be reused for both Users and Courses.
Each module (users, courses) must extend or instantiate the repository to manage its in-memory data.
This enforces clean architecture and code reuse.
Error Handling 
 400 → Validation errors
401 → Unauthorized (no/invalid token)
403 → Forbidden (wrong role)
404 → Resource not found

Global error handler with CustomError
Fallback 404 middleware for unknown routes

Important Notes for Students  
You must strictly follow all the above guidelines (architecture, modules, DTO validation, repository pattern, role-based access, and error handling)
The project must be published to a
  Clear with setup instructions, routes summary.
  Clean, well-formatted, and professional TypeScript code.  
  Submissions that do not meet the above requirements will be considered .
