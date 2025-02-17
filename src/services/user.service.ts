import userModel from "../models/user.model";
import { InvalidEntityIdExceprion } from "../utils/exceptions/invalid.entity.id.exception";

const getUserById = (id: string) => {
  const user = userModel.findById(id).populate("client");
  if (!user) throw new InvalidEntityIdExceprion("User");
  return user;
};

export const userService = {
  getUserById,
};
