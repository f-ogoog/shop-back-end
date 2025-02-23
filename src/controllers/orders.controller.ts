import { query, Request, Response } from "express";
import { ordersService } from "../services/orders.service";
import { AuthenticatedRequest } from "../types/auth.types";
import { Role } from "../models/user.model";
import {
  getOrderResponse,
  getOrdersResponse,
  getSimpleOrderResponse,
} from "../mappers/orders.mapper";
import { OrderStatus } from "../models/order.model";
import { ClientDocument } from "../models/client.model";
import UnauthorizedException from "../utils/exceptions/unauthorized.exception";

export const createOrder = async (req: Request, res: Response) => {
  const result = await ordersService.createOrder(req.body);
  const order = getSimpleOrderResponse(result.order);
  res.status(201).json({ order, price: result.price });
};

export const getAllOrders = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const query = { ...req.query };

  if (req.user?.role === Role.USER)
    query.clientId = req.user.client?._id.toString();

  const result = await ordersService.getAllOrders(query);
  const orders = getOrdersResponse(result.orders);
  res.status(200).json({ orders, pagination: result.pagination });
};

export const getOrderById = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const result = await ordersService.getOrderById(req.params.orderId);
  const order = getOrderResponse(result);
  res.status(200).json({ order });
};

export const updateOrderStatus = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const user = req.user;
  const client = req.user?.client as ClientDocument;
  const orderId = req.params.orderId;
  const status = req.query.status as OrderStatus;

  if (user?.role === "user") {
    const isOrderBelongToClient = client.orders.some(
      (order) => order.toString() === orderId
    );
    if (!isOrderBelongToClient || status !== "paid")
      throw new UnauthorizedException("User can not perform this action");
  }

  const result = await ordersService.updateOrderStatusById(orderId, status);
  const order = getSimpleOrderResponse(result);
  res.status(201).json({ order });
};
