import orderModel, { OrderDocument, OrderStatus } from "../models/order.model";
import {
  Order,
  OrderProduct,
  OrderProductId,
  OrderQuery,
} from "../types/orders.type";
import { clientsService } from "./clients.service";
import { productService } from "./product.service";
import { validateObjectId } from "../utils/mongo.utils";
import clientModel from "../models/client.model";
import { InvalidEntityIdExceprion } from "../utils/exceptions/invalid.entity.id.exception";
import mongoose from "mongoose";

const DISCOUNTS = new Map([
  [1000, 1],
  [2000, 3],
  [3000, 5],
]);

const createOrder = async ({ client, products }: Order) => {
  const validatedProducts = await getProducts(products);
  const totalPrice = calculateTotalPrice(validatedProducts as OrderProduct[]);
  const newClient = await clientsService.updateOrCreate(client);
  const discount = calculateDiscount(totalPrice, newClient.isRegular);

  const order = await orderModel.create({
    products: validatedProducts,
    client: newClient,
    totalPrice,
    discount,
  });

  let isRegular = true;
  if (!newClient.isRegular) {
    const { orders } = await newClient.populate<{ orders: OrderDocument[] }>(
      "orders"
    );
    const totalPriceOfAllClientOrders =
      calculateTotalPriceOfPreviousClientOrders(orders) + totalPrice;

    isRegular = totalPriceOfAllClientOrders >= 5000;
  }

  await clientModel.updateOne(
    {
      _id: newClient._id,
    },
    { isRegular, $push: { orders: order._id } }
  );

  return {
    order,
    price: {
      totalPrice,
      discount,
    },
  };
};

const getProducts = async (products: OrderProductId[]) => {
  const result = [];
  for (const { productId, count } of products) {
    validateObjectId(productId, "productId");
    const product = await productService.getProductById(productId);
    result.push({
      product,
      count,
    });
  }
  return result;
};

const calculateTotalPrice = (products: OrderProduct[]) => {
  let result = 0;
  products.forEach(({ product, count }) => {
    result += product.price * count;
  });
  return result;
};

const calculateDiscount = (totalPrice: number, isClientRegular: boolean) => {
  let discount = 0;
  DISCOUNTS.forEach((value, key) => {
    if (totalPrice > key) discount = value;
    else return;
  });

  return discount + (isClientRegular ? 2 : 0);
};

const calculateTotalPriceOfPreviousClientOrders = (orders: OrderDocument[]) => {
  let result = 0;
  orders.forEach(({ totalPrice }) => {
    result += totalPrice;
  });
  return result;
};

const getAllOrders = async ({
  search,
  page = 1,
  limit = 10,
  status,
  clientId,
  order,
}: OrderQuery) => {
  const query: Record<string, unknown> = {};
  search && (query.number = Number(search));
  status && (query.status = status);
  clientId && (query.client = clientId);

  const orders = await orderModel
    .find(query)
    .sort({ number: order ?? "desc" })
    .skip((page - 1) * limit)
    .limit(limit);

  const totalCount = await orderModel.countDocuments(query);

  return {
    orders,
    pagination: {
      totalCount,
      totalPages: Math.ceil(totalCount / limit) || 1,
      page,
      limit,
    },
  };
};

const getOrderById = async (id: string) => {
  const order = await orderModel
    .findById(id)
    .populate("client")
    .populate("products.product");
  if (!order) throw new InvalidEntityIdExceprion("Order");
  return order;
};

const updateOrderStatusById = async (id: string, status: OrderStatus) => {
  const order = await getOrderById(id);
  order.status = status;
  return await order.save();
};

export const ordersService = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatusById,
};
