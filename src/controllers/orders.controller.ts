import { Request, Response } from "express";
import { ordersService } from "../services/orders.service";
import { AuthenticatedRequest } from "../types/auth.types";
import { Role } from "../models/user.model";
import {
  getOrderResponse,
  getOrdersResponse,
  getSimpleOrderResponse,
} from "../mappers/orders.mapper";

export const createOrder = async (req: Request, res: Response) => {
  const result = await ordersService.createOrder(req.body);
  const order = getSimpleOrderResponse(result.order);
  res.status(201).json({ order, price: result.price });
};

export const getAllOrders = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  if (req.user?.role === Role.USER) req.query.clientId = req.user.id;
  const result = await ordersService.getAllOrders(req.query);
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
