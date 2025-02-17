import mongoose, { Document, Schema } from "mongoose";
import { ClientDocument } from "./client.model";
import { ProductDocument } from "./product.model";
import { DAY } from "../utils/dates";

const AutoIncrement = require("mongoose-sequence")(mongoose.connection);

export enum OrderStatus {
  "CREATED" = "created",
  "PAID" = "paid",
  "SHIPPED" = "shipped",
  "RECEIVED" = "received",
  "DECLINED" = "declined",
}

export interface OrderDocument extends Document {
  _id: string;
  deliveryDate: Date;
  saleDate: Date;
  totalPrice: number;
  number: number;
  discount: number;
  status: OrderStatus;
  products: {
    product: mongoose.Types.ObjectId | ProductDocument;
    count: number;
  }[];
  client: mongoose.Types.ObjectId | ClientDocument | null;
}

const OrderSchema = new Schema<OrderDocument>(
  {
    deliveryDate: { type: Date, default: new Date().getTime() + 3 * DAY },
    saleDate: { type: Date, default: new Date() },
    totalPrice: { type: Number, required: true, min: 0 },
    number: { type: Number, unique: true },
    discount: { type: Number, default: 0, min: 0 },
    status: {
      type: String,
      default: OrderStatus.CREATED,
      enum: Object.values(OrderStatus),
    },
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        count: { type: Number, required: true, min: 1 },
      },
    ],
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
      required: true,
    },
  },
  { timestamps: true }
);

OrderSchema.plugin(AutoIncrement, { inc_field: "number", start_seq: 1 });

export default mongoose.model<OrderDocument>("Order", OrderSchema);
