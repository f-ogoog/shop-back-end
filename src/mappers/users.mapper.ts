import { Types } from "mongoose";
import { ClientDocument } from "../models/client.model";
import { UserDocument } from "../models/user.model";

const isPopulatedClient = (
  client: Types.ObjectId | ClientDocument | null | undefined
): client is ClientDocument => {
  return client != null && !(client instanceof Types.ObjectId);
};

export const getUserResponse = (user: UserDocument) => {
  const client = isPopulatedClient(user.client) ? user.client : null;

  return {
    id: user._id,
    role: user.role,
    firstName: client?.firstName,
    lastName: client?.lastName,
    email: client?.email,
    phone: client?.phone,
    address: client?.address,
    isRegular: client?.isRegular,
  };
};
