import { query } from "express-validator";
import { handleValidationErrors } from "./handle.validation.errors";
import { OrderStatus } from "../../models/order.model";

export const validateOrderStatus = [
  query("status")
    .optional()
    .isString()
    .withMessage("Measurement unit should be a string")
    .isIn(Object.values(OrderStatus))
    .withMessage(
      `Measurement unit must be in enum: ${Object.values(OrderStatus).join(
        ","
      )}`
    ),

  handleValidationErrors,
];
