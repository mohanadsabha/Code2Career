import { GenericRepository } from "../shared/generic.repository";
import { Course } from "../generated/prisma";

class CourseRepository extends GenericRepository<Course> {
  constructor() {
    super("course");
  }
}

export const courseRepository = new CourseRepository();
