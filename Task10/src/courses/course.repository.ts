import { GenericRepository } from "../shared/generic.repository";
import { CourseModel } from "./course.model";

class CourseRepository extends GenericRepository<any> {
  constructor() {
    super(CourseModel as any);
  }
}

export const courseRepository = new CourseRepository();
