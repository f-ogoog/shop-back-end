import { OrderStatus } from "../models/order.model";
import { ProductDocument } from "../models/product.model";
import { Client } from "./clients.types";

export interface Order {
  client: Client;
  products: OrderProductId[];
}

export interface OrderProductId {
  productId: string;
  count: number;
}

export interface OrderProduct {
  product: ProductDocument;
  count: number;
}

export interface OrderQuery {
  search?: string;
  page?: number;
  limit?: number;
  status?: OrderStatus;
  clientId?: string;
  order?: "asc" | "desc";
}
