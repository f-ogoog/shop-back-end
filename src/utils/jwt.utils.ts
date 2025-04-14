import jwt, { SignOptions } from "jsonwebtoken";
import dotenv from "dotenv";
import { TokenPayload } from "../types/auth.types";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET!;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES!;

export const generateToken = (userId: string): string => {
  const payload = { userId };
  const options = { expiresIn: JWT_EXPIRES_IN } as SignOptions;

  return jwt.sign(payload, JWT_SECRET, options);
};

export const verifyToken = (token: string) => {
  try {
    const payload = jwt.verify(token, JWT_SECRET) as TokenPayload;
    return payload.userId;
  } catch (error) {
    return null;
  }
};
