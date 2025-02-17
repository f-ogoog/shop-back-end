import mongoose, { Document, Schema } from "mongoose";
import { ClientDocument } from "./client.model";

export enum Role {
  ADMIN = "admin",
  USER = "user",
}

export interface UserDocument extends Document {
  _id: string;
  email: string;
  password: string;
  role: Role;
  client?: mongoose.Types.ObjectId | ClientDocument | null;
}

const UserSchema = new Schema<UserDocument>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: Object.values(Role),
      default: Role.USER,
    },
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
      default: null,
    },
  },
  { timestamps: true }
);

export default mongoose.model<UserDocument>("User", UserSchema);
