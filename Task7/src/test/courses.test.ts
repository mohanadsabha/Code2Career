import { todo } from "node:test";
import { authedTestAgent, unAuthedTestAgent } from "./helpers/supertest.helper";

describe("Courses E2E Tests", () => {
  it("GET /api/v1/users with authed and unauthed agent", async () => {
    const response = await authedTestAgent.get("/api/v1/courses");
    console.log(response);
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      status: "success",
      data: expect.any(Array),
    });
    const response2 = await unAuthedTestAgent.get("/api/v1/courses/1");
    expect(response2.status).toBe(200);
    expect(response2.body).toMatchObject({
      status: "success",
      data: expect.any(Array),
    });
  });
  todo("Create Course");
});
