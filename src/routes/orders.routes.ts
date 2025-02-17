import express from "express";
import { validateOrder } from "../middlewares/validations/order.validation";
import {
  createOrder,
  getAllOrders,
  getOrderById,
} from "../controllers/orders.controller";
import { authenticateUser } from "../middlewares/auth.middleware";
import { validateOrdersQuery } from "../middlewares/validations/orders.query.validation";
import { validateObjectId } from "../utils/mongo.utils";
import { validateId } from "../middlewares/validations/id.validation";

const ordersRoutes = express.Router();

ordersRoutes.post("/", validateOrder, createOrder);

ordersRoutes.get("/", authenticateUser, validateOrdersQuery, getAllOrders);

ordersRoutes.get(
  "/:orderId",
  authenticateUser,
  validateId("orderId"),
  getOrderById
);

export default ordersRoutes;
