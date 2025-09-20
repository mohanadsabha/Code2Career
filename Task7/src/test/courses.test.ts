import { todo } from "node:test";
import { authedTestAgent, unAuthedTestAgent } from "./helpers/supertest.helper";
import { Course } from "../courses/course.entity";
describe("GET /api/v1/courses e2e-test", () => {
  it("GET /api/v1/courses with authed agent", async () => {
    const response = await authedTestAgent.get("/api/v1/courses");
    console.log(response);
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      success: true,
      data: expect.any(Array),
    });
  });
  it("GET /api/v1/courses with unauthed agent", async () => {
    const response = await unAuthedTestAgent.get("/api/v1/courses");
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      success: true,
      data: expect.any(Array),
    });
  });
});
describe("POST /api/v1/courses e2e-test", () => {
  it("Create Course with authed agent", async () => {
    const response = await authedTestAgent.post("/api/v1/courses").send({
      title: "Test Course",
      description: "This is a test course",
    });
    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({
      success: true,
      data: expect.objectContaining<Course>({
        id: expect.any(String),
        title: expect.any(String),
        description: expect.any(String),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        owner: expect.any(String),
      }),
    });
  });
  it("Create Course with unauthed agent", async () => {
    const response = await unAuthedTestAgent.post("/api/v1/courses").send({
      title: "Test Course",
      description: "This is a test course",
    });
    expect(response.status).toBe(401);
  });
});
