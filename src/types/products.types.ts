import { MeasurementUnit } from "../models/product.model";

export interface Product {
  name: string;
  price: number;
  measurementUnit: MeasurementUnit;
}

export interface ProductQuery {
  page?: number;
  limit?: number;
  order?: "asc" | "desc";
  search?: string;
}
