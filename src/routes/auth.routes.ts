import express from "express";
import { getMe, login, register } from "../controllers/auth.controller";
import { validateRegistration } from "../middlewares/validations/register.validation";
import { handleValidationErrors } from "../middlewares/validations/handle.validation.errors";
import { validateLogin } from "../middlewares/validations/login.validation";
import { authenticateUser } from "../middlewares/auth.middleware";

const authRoutes = express.Router();

authRoutes.post("/register", validateRegistration, register);

authRoutes.post("/login", validateLogin, login);

authRoutes.get("/me", authenticateUser, getMe);

export default authRoutes;
