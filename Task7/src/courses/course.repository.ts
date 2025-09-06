import { GenericRepository } from "../shared/generic.repository";
import { Course } from "./course.entity";

class CourseRepository extends GenericRepository<Course> {
  constructor() {
    super();
  }
}

export const courseRepository = new CourseRepository();
