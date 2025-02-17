import { Request, Response } from "express";
import { authService } from "../services/auth.service";
import { AuthenticatedRequest } from "../types/auth.types";
import { getUserResponse } from "../mappers/users.mapper";

export const register = async (req: Request, res: Response) => {
  const token = await authService.registration(req.body);
  res
    .cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
    })
    .status(201)
    .json({ message: "User registered successfully" });
};

export const login = async (req: Request, res: Response) => {
  const token = await authService.login(req.body);
  res
    .cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
    })
    .status(201)
    .json({ message: "User login successfully" });
};

export const getMe = async (req: AuthenticatedRequest, res: Response) => {
  const user = getUserResponse(req.user!);
  res.status(200).json({ user });
};
