import { Request } from "express";
import { UserDocument } from "../models/user.model";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  firstName: string;
  lastName: string;
  middleName: string;
  phone: string;
  address: string;
  password: string;
}

export interface TokenPayload {
  userId: string;
  iat?: number;
  exp?: number;
}

export interface AuthenticatedRequest extends Request {
  user?: UserDocument;
}
