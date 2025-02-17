import { Response, NextFunction } from "express";
import { AuthenticatedRequest } from "../types/auth.types";
import UnauthorizedException from "../utils/exceptions/unauthorized.exception";
import { Role } from "../models/user.model";

export const isAdmin = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  if (req.user?.role !== Role.ADMIN)
    throw new UnauthorizedException(
      "You have not permission to perform this action"
    );
  next();
};
