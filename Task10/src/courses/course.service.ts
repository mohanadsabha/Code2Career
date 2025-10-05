import { Course } from "./course.entity";
import { courseRepository } from "./course.repository";

class CourseService {
  private repository = courseRepository;
  public async getCourses() {
    return await this.repository.findAll();
  }
  public async getCourse(id: string) {
    return await this.repository.findById(id);
  }
  public async addCourse(
    title: string,
    description: string,
    ownerId: string,
    image: string | null
  ) {
    return await this.repository.create({ title, description, image, ownerId });
  }
  public async updateCourse(
    id: string,
    title: string,
    description: string,
    image?: string
  ): Promise<Course | null> {
    const updates: Partial<Course> = { title, description };
    if (image) {
      updates.image = image;
    }
    return await this.repository.update(id, updates);
  }
  public async deleteCourse(id: string): Promise<boolean> {
    return await this.repository.delete(id);
  }
  public checkOwnerShip() {}
}

export const courseService = new CourseService();
