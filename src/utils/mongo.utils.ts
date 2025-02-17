import mongoose from "mongoose";
import BadRequestException from "./exceptions/bad.request.exception";

export const validateObjectId = (id: string, param: string) => {
  const isIdValid = mongoose.Types.ObjectId.isValid(id);
  if (!isIdValid) throw new BadRequestException(`${param} is ivalid`);
};
