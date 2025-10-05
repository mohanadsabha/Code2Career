import supertest from "supertest";
import { signJWT } from "../../auth/utils/jwt.util";
import app from "../../server";

const userT = {
  name: "Admin",
  id: "1",
};

const token = signJWT({ id: userT.id, name: userT.name });

export const unAuthedTestAgent = supertest.agent(app);

export const authedTestAgent = supertest
  .agent(app)
  .set("AUTHORIZATION", `Bearer ${token}`);
