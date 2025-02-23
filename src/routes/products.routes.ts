import express from "express";
import { validateProductCreation } from "../middlewares/validations/product.validation";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProduct,
} from "../controllers/product.controller";
import { validateId } from "../middlewares/validations/id.validation";
import { authenticateUser } from "../middlewares/auth.middleware";
import { isAdmin } from "../middlewares/is.admin.middleware";
import { validateProductsQuery } from "../middlewares/validations/products.query.validation";

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Взаємодія з продуктами
 */

const productsRoutes = express.Router();

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Створення нового продукту
 *     tags: [Products]
 *     description: Доступно тільки для адміністратора. Додає новий продукт у систему.
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/CreateProductRequest"
 *     responses:
 *       201:
 *         description: Продукт успішно створено
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ProductResponse"
 *       400:
 *         description: Некоректний запит (невірні дані або відсутні обов'язкові поля)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ProductError"
 *       401:
 *         description: Неавторизований користувач
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/UnauthorizedError"
 */

productsRoutes.post(
  "/",
  authenticateUser,
  isAdmin,
  validateProductCreation,
  createProduct
);

/**
 * @swagger
 * /products/{productId}:
 *   patch:
 *     summary: Оновлення інформації про продукт
 *     tags: [Products]
 *     description: Доступно тільки для адміністратора. Оновлює існуючий продукт.
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *           example: "65a6c79f5d6a7e001f8b5a9d"
 *         description: Унікальний ідентифікатор продукту
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/UpdateProductRequest"
 *     responses:
 *       201:
 *         description: Продукт успішно оновлено
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ProductResponse"
 *       400:
 *         description: Неправильний формат ідентифікатора або продукту не існує
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid product id"
 *       401:
 *         description: Неавторизований користувач
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/UnauthorizedError"
 */

productsRoutes.patch(
  "/:productId",
  authenticateUser,
  isAdmin,
  validateId("productId"),
  updateProduct
);

/**
 * @swagger
 * /products:
 *   get:
 *     tags: [Products]
 *     summary: Отримання списку продуктів
 *     description: Отримати список всіх продуктів із можливістю фільтрації, пагінації та сортування
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Пошук продуктів за назвою
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *         description: Сортування за ціною (asc - зростання, desc - спадання)
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Номер сторінки
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Кількість продуктів на сторінці
 *     responses:
 *       200:
 *         description: Успішне отримання списку продуктів
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ProductsResponse"
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
 */

productsRoutes.get("/", validateProductsQuery, getAllProducts);

/**
 * @swagger
 * /products/{productId}:
 *   get:
 *     tags: [Products]
 *     summary: Отримання продукту за ID
 *     description: Отримати детальну інформацію про продукт за його унікальним ідентифікатором
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         description: Унікальний ідентифікатор продукту
 *         schema:
 *           type: string
 *           example: "65a6c79f5d6a7e001f8b5a9d"
 *     responses:
 *       200:
 *         description: Успішне отримання продукту
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ProductResponse"
 *       400:
 *         description: Неправильний формат ідентифікатора або продукт не знайдено
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid product id"
 */

productsRoutes.get("/:productId", validateId("productId"), getProductById);

/**
 * @swagger
 * /products/{productId}:
 *   delete:
 *     tags: [Products]
 *     summary: Видалення продукту
 *     description: Видаляє продукт за його унікальним ідентифікатором (лише адміністратор)
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         description: Унікальний ідентифікатор продукту
 *         schema:
 *           type: string
 *           example: "65a6c79f5d6a7e001f8b5a9d"
 *     responses:
 *       201:
 *         description: Продукт успішно видалений
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ProductResponse"
 *       400:
 *         description: Неправильний формат ідентифікатора або продукту не існує
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid product id"
 *       401:
 *         description: Неавторизований запит (відсутній токен)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/UnauthorizedError"
 */

productsRoutes.delete(
  "/:productId",
  authenticateUser,
  isAdmin,
  validateId("productId"),
  deleteProduct
);

export default productsRoutes;
