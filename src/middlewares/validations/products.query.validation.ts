import { query } from "express-validator";
import { handleValidationErrors } from "./handle.validation.errors";

export const validateProductsQuery = [
  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Page must be a positive integer"),

  query("limit")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Limit must be a positive integer"),

  query("order")
    .optional()
    .isIn(["asc", "desc"])
    .withMessage('Sort must be either "asc" or "desc"'),

  query("search").optional().isString().withMessage("Search must be a string"),

  handleValidationErrors,
];
