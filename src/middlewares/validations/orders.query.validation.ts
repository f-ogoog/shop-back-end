import { query } from "express-validator";
import { handleValidationErrors } from "./handle.validation.errors";
import { OrderStatus } from "../../models/order.model";

export const validateOrdersQuery = [
  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Page must be a positive integer"),

  query("limit")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Limit must be a positive integer"),

  query("search").optional().isNumeric().withMessage("Search must be a number"),

  query("status")
    .optional()
    .isIn(Object.values(OrderStatus))
    .withMessage(
      `Status must be in enum: ${Object.values(OrderStatus).join(",")}`
    ),

  handleValidationErrors,
];
