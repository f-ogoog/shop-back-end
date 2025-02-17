import { Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt.utils";
import { AuthenticatedRequest } from "../types/auth.types";
import UnauthorizedException from "../utils/exceptions/unauthorized.exception";
import { userService } from "../services/user.service";
import { UserDocument } from "../models/user.model";

export const authenticateUser = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.token;
  if (!token) throw new UnauthorizedException("Invalid token");

  const userId = verifyToken(token);
  if (!userId) throw new UnauthorizedException("Invalid token");

  const user = (await userService.getUserById(userId)) as UserDocument;

  req.user = user;
  next();
};
