import mongoose, { Document, Schema } from "mongoose";
import { OrderDocument } from "./order.model";

export interface ClientDocument extends Document {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  phone: string;
  address: string;
  isRegular: boolean;
  orders: mongoose.Types.ObjectId[] | OrderDocument[];
}

const ClientSchema = new Schema<ClientDocument>(
  {
    email: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    middleName: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    isRegular: { type: Boolean, default: false },
    orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model<ClientDocument>("Client", ClientSchema);
