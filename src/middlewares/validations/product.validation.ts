import { body, ValidationChain } from "express-validator";
import { MeasurementUnit } from "../../models/product.model";
import { handleValidationErrors } from "./handle.validation.errors";

const validateProduct = () => [
  body("name")
    .isString()
    .withMessage("Name should be a string")
    .notEmpty()
    .withMessage("Name is required"),
  body("price")
    .isNumeric()
    .withMessage("Price should be a number")
    .notEmpty()
    .withMessage("Price is required"),
  body("measurementUnit")
    .isString()
    .withMessage("Measurement unit should be a string")
    .notEmpty()
    .withMessage("Measurement unit is required")
    .isIn(Object.values(MeasurementUnit))
    .withMessage(
      `Measurement unit must be in enum: ${Object.values(MeasurementUnit).join(
        ","
      )}`
    ),
];

export const validateProductCreation = [
  ...validateProduct(),
  handleValidationErrors,
];

export const validateProductUpdation = [
  ...validateProduct().map((validation: ValidationChain) =>
    validation.optional()
  ),
  handleValidationErrors,
];
