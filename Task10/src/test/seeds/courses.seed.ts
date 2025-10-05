import { faker } from "@faker-js/faker";
import { Course } from "../../courses/course.entity";

export function createRandomCourse() {
  const randomCourse: Course = {
    id: faker.string.uuid(),
    title: faker.lorem.words(3),
    description: faker.lorem.sentence(),
    image: faker.image.urlLoremFlickr({ category: "education" }),
    createdAt: faker.date.past(),
    updatedAt: faker.date.anytime(),
    ownerId: faker.string.uuid(),
  };
  return randomCourse;
}
