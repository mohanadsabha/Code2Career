import { verify, sign } from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });

type JWT_PAYLOAD = { id: string; name: string };
const JWT_SECRET = process.env.JWT_SECRET as string;

export const signJWT = (payload: JWT_PAYLOAD) => {
  return sign(payload, JWT_SECRET, { expiresIn: "15m" });
};

export const verifyJWT = (token: string): Promise<JWT_PAYLOAD> => {
  return new Promise((resolve, reject) => {
    verify(token, JWT_SECRET, (err, decoded) => {
      if (err) return reject(err);

      if (isJWT_PAYLOAD(decoded)) {
        resolve(decoded);
      } else {
        reject(new Error("Invalid token payload"));
      }
    });
  });
};

function isJWT_PAYLOAD(obj: any): obj is JWT_PAYLOAD {
  return obj && typeof obj.id === "string" && typeof obj.name === "string";
}
