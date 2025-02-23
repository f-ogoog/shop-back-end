import express from "express";
import { validateOrder } from "../middlewares/validations/order.validation";
import {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
} from "../controllers/orders.controller";
import { authenticateUser } from "../middlewares/auth.middleware";
import { validateOrdersQuery } from "../middlewares/validations/orders.query.validation";
import { validateId } from "../middlewares/validations/id.validation";
import { validateOrderStatus } from "../middlewares/validations/order.status.validation";

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Взаємодія з  замовленнями
 */

const ordersRoutes = express.Router();

/**
 * @swagger
 * /orders:
 *   post:
 *     tags: [Orders]
 *     summary: Створення нового замовлення
 *     description: Оформлення нового замовлення клієнтом
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/OrderRequest"
 *     responses:
 *       201:
 *         description: Успішне створення замовлення
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/SimpleOrderWithPriceResponse"
 *       400:
 *         description: Невірні дані у запиті
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid request data"
 */

ordersRoutes.post("/", validateOrder, createOrder);

/**
 * @swagger
 * /orders:
 *   get:
 *     tags: [Orders]
 *     summary: Отримати список замовлень
 *     description: Повертає список замовлень із пагінацією
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         required: false
 *         description: Номер сторінки
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         required: false
 *         description: Кількість елементів на сторінці
 *       - in: query
 *         name: search
 *         schema:
 *           type: number
 *         required: false
 *         description: Номер замовлення
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: ["created", "paid", "shipped", "received", "declined"]
 *         required: false
 *         description: Фільтр за статусом замовлення
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: ["asc", "desc"]
 *         required: false
 *         description: Сортування за номером замовлення
 *     responses:
 *       200:
 *         description: Успішне отримання списку замовлень
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/SimpleOrdersResponse"
 *       400:
 *         description: Невірні параметри запиту
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid query parameters"
 *       401:
 *         description: Невірні облікові дані
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/UnauthorizedError"
 */

ordersRoutes.get("/", authenticateUser, validateOrdersQuery, getAllOrders);

/**
 * @swagger
 * /orders/{orderId}:
 *   get:
 *     tags: [Orders]
 *     summary: Отримати інформацію про конкретне замовлення
 *     description: Повертає детальну інформацію про замовлення за його ID
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *           example: "65a6c79f5d6a7e001f8b5a9d"
 *         description: ID замовлення
 *     responses:
 *       200:
 *         description: Інформація про замовлення
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/OrderResponse"
 *       400:
 *         description: Некоректний запит (невірний ID)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid order ID"
 *       401:
 *         description: Невірні облікові дані
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/UnauthorizedError"
 */

ordersRoutes.get(
  "/:orderId",
  authenticateUser,
  validateId("orderId"),
  getOrderById
);

/**
 * @swagger
 * /orders/{orderId}:
 *   patch:
 *     tags: [Orders]
 *     summary: Оновити статус замовлення
 *     description: Оновлює статус конкретного замовлення за його ID. Тільки адміністратор може змінювати статус на будь-який, а клієнт може лише оплачувати своє замовлення.
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *           example: "65a6c79f5d6a7e001f8b5a9d"
 *         description: ID замовлення
 *       - in: query
 *         name: status
 *         required: true
 *         schema:
 *           type: string
 *           enum: ["created", "paid", "shipped", "declined", "received"]
 *           example: "created"
 *
 *
 *         description: Новий статус замовлення
 *     responses:
 *       201:
 *         description: Оновлений статус замовлення
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/SimpleOrderResponse"
 *       400:
 *         description: Некоректний запит (невірний статус або відсутній ID)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid status value"
 *       401:
 *         description: Невірні облікові дані
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/UnauthorizedError"
 */

ordersRoutes.patch(
  "/:orderId",
  authenticateUser,
  validateOrderStatus,
  validateId("orderId"),
  updateOrderStatus
);

export default ordersRoutes;
