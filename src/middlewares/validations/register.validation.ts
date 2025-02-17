import { body } from "express-validator";
import { handleValidationErrors } from "./handle.validation.errors";

export const validateRegistration = [
  body("email").isEmail().withMessage("Invalid email format"),
  body("firstName")
    .isString()
    .withMessage("First name should be a string")
    .notEmpty()
    .withMessage("First name is required"),
  body("lastName")
    .isString()
    .withMessage("Last name should be a string")
    .notEmpty()
    .withMessage("Last name is required"),
  body("middleName")
    .isString()
    .withMessage("Middle name should be a string")
    .notEmpty()
    .withMessage("Middle name is required"),
  body("phone").isMobilePhone("any").withMessage("Invalid phone number"),
  body("address")
    .isString()
    .withMessage("Address should be a string")
    .notEmpty()
    .withMessage("Address is required"),
  body("password")
    .isString()
    .withMessage("Password should be a string")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  handleValidationErrors,
];
