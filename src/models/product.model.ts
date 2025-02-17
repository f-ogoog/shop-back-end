import mongoose, { Document, Schema } from "mongoose";

export enum MeasurementUnit {
  KILOGRAMS = "kg",
  LITERS = "l",
  UNIT = "unit",
}

export interface ProductDocument extends Document {
  _id: string;
  name: string;
  price: number;
  measurementUnit: MeasurementUnit;
}

const ProductSchema = new Schema<ProductDocument>(
  {
    name: { type: String, required: true },
    price: {
      type: Number,
      required: true,
      min: 0,
      set: (n: number) => parseFloat(n.toFixed(2)),
    },
    measurementUnit: {
      type: String,
      required: true,
      enum: Object.values(MeasurementUnit),
    },
  },
  { timestamps: true }
);

export default mongoose.model<ProductDocument>("Product", ProductSchema);
