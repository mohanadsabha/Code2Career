import supertest from "supertest";
import { signJWT } from "../../auth/utils/jwt.util";
import { userRepository } from "../../users/user.repository";
import app from "../../server";
import { User } from "../../users/user.entity";

const userT = {
  name: "Test User",
  id: "1",
};
const user1 = userRepository.findById("1") ?? userT;
console.log(userRepository.findAll());

const token = signJWT({ id: user1.id, name: user1.name });

export const unAuthedTestAgent = supertest.agent(app);

export const authedTestAgent = supertest
  .agent(app)
  .set("AUTHORIZATION", `Bearer ${token}`);
