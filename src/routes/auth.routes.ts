import express from "express";
import { getMe, login, logout, register } from "../controllers/auth.controller";
import { validateRegistration } from "../middlewares/validations/register.validation";
import { validateLogin } from "../middlewares/validations/login.validation";
import { authenticateUser } from "../middlewares/auth.middleware";

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Управління автентифікацією користувачів
 */

const authRoutes = express.Router();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     tags: [Auth]
 *     summary: Реєстрація нового користувача
 *     description: Створення нового користувача
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterRequest'
 *     responses:
 *       201:
 *         description: Повідомлення про успішну реєстрацію користувача
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RegisterResponse'
 *         headers:
 *           Set-Cookie:
 *             description: HTTP-only cookie з JWT токеном
 *             schema:
 *               type: string
 *               example: "token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...; HttpOnly; Path=/; Secure; SameSite=Strict"
 *       400:
 *         description: Некоректний запит (невірний формат даних)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/RegisterError"
 */
authRoutes.post("/register", validateRegistration, register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags: [Auth]
 *     summary: Вхід в аккаунт користувача
 *     description: Вхід в аккаунт користувача
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       201:
 *         description: Повідомлення про успішний вхід в аккаунт користувача
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 *         headers:
 *           Set-Cookie:
 *             description: HTTP-only cookie з JWT токеном
 *             schema:
 *               type: string
 *               example: "token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...; HttpOnly; Path=/; Secure; SameSite=Strict"
 *
 *       401:
 *         description: Невірні облікові дані
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/LoginError"
 *
 */
authRoutes.post("/login", validateLogin, login);

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     tags: [Auth]
 *     summary: Вихід з облікового запису
 *     description: Очищує HTTP-only cookie з JWT токеном та завершує сесію користувача.
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       201:
 *         description: Успішний вихід з системи
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/LogoutResponse"
 *       401:
 *         description: Неавторизований доступ (відсутній або недійсний токен)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/UnauthorizedError"
 */
authRoutes.post("/logout", authenticateUser, logout);

/**
 * @swagger
 * /auth/me:
 *   get:
 *     tags: [Auth]
 *     summary: Отримання інформації про поточного користувача
 *     description: Повертає дані авторизованого користувача на основі переданого токена.
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Дані поточного користувача
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: "#/components/schemas/UserResponse"
 *       401:
 *         description: Неавторизований доступ (відсутній або недійсний токен)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/UnauthorizedError"
 */
authRoutes.get("/me", authenticateUser, getMe);

export default authRoutes;
