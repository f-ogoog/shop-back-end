import userModel from "../models/user.model";
import { LoginRequest, RegisterRequest } from "../types/auth.types";
import { comparePasswords, hashPassword } from "../utils/bcrypt.utils";
import BadRequestException from "../utils/exceptions/bad.request.exception";
import UnauthorizedException from "../utils/exceptions/unauthorized.exception";
import { generateToken } from "../utils/jwt.utils";
import { clientsService } from "./clients.service";
import { userService } from "./user.service";

const registration = async (body: RegisterRequest) => {
  const { password, ...data } = body;

  const user = await userModel.findOne({
    $or: [{ email: data.email }],
  });
  if (user) throw new BadRequestException("User with such email already exist");

  const client = await clientsService.updateOrCreate(data);

  const hashedPassword = await hashPassword(password);
  const newUser = await userModel.create({
    email: data.email,
    password: hashedPassword,
    client: client,
  });

  return generateToken(newUser._id.toString());
};

const login = async ({ email, password }: LoginRequest) => {
  const user = await userModel.findOne({ email });
  if (!user) throw new UnauthorizedException("Invalid Credentials");

  const isPasswordMatch = await comparePasswords(password, user.password);
  if (!isPasswordMatch) throw new UnauthorizedException("Invalid Credentials");

  return generateToken(user._id.toString());
};

export const authService = {
  registration,
  login,
};
