import mongoose from "mongoose";
import { OrderDocument } from "../models/order.model";

export const getOrdersResponse = (orders: OrderDocument[]) => {
  return orders.map(getSimpleOrderResponse);
};

export const getSimpleOrderResponse = (order: OrderDocument) => {
  return {
    id: order._id,
    number: order.number,
    status: order.status,
    saledate: order.saleDate,
    deliveryDate: order.deliveryDate,
  };
};

export const getOrderResponse = (order: OrderDocument) => {
  return {
    id: order._id,
    number: order.number,
    status: order.status,
    saleDate: order.saleDate,
    deliveryDate: order.deliveryDate,
    totalPrice: order.totalPrice,
    discount: order.discount,
    client:
      order.client && !(order.client instanceof mongoose.Types.ObjectId)
        ? {
            id: order.client._id,
            email: order.client.email,
            firstName: order.client.firstName,
            lastName: order.client.lastName,
            phone: order.client.phone,
            address: order.client.address,
          }
        : null,
    products: order.products.map(({ product, count }) => ({
      product:
        product && !(product instanceof mongoose.Types.ObjectId)
          ? {
              id: product._id,
              name: product.name,
              price: product.price,
              measurementUnit: product.measurementUnit,
            }
          : null,
      count,
    })),
  };
};
