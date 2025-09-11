import { Course } from "./course.entity";
import { courseRepository } from "./course.repository";

class CourseService {
  private repository = courseRepository;
  public getCourses() {
    return this.repository.findAll();
  }
  public getCourse(id: string): Course | undefined {
    return this.repository.findById(id);
  }
  public addCourse(
    title: string,
    description: string,
    owner: string,
    image?: string
  ) {
    return this.repository.create({ title, description, image, owner });
  }
  public updateCourse(
    id: string,
    title: string,
    description: string,
    image?: string
  ): Course | null {
    const updates: Partial<Course> = { title, description };
    if (image) {
      updates.image = image;
    }
    return this.repository.update(id, updates);
  }
  public deleteCourse(id: string): boolean {
    return this.repository.delete(id);
  }
  public checkOwnerShip() {}
}

export const courseService = new CourseService();
