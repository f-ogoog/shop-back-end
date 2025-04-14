import userModel from "../models/user.model";
import { InvalidEntityIdExceprion } from "../utils/exceptions/invalid.entity.id.exception";

const getUserById = async (id: string) => {
  const user = await userModel.findById(id).populate("client");
  if (!user) throw new InvalidEntityIdExceprion("User");
  return user;
};

export const userService = {
  getUserById,
};
