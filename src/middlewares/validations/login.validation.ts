import { body } from "express-validator";
import { handleValidationErrors } from "./handle.validation.errors";

export const validateLogin = [
  body("email").isEmail().withMessage("Invalid email format"),
  body("password").notEmpty().withMessage("Password is required"),
  handleValidationErrors,
];
