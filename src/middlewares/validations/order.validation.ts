import { body } from "express-validator";
import { handleValidationErrors } from "./handle.validation.errors";

export const validateOrder = [
  body("client")
    .isObject()
    .withMessage("Client must be an object")
    .notEmpty()
    .withMessage("Client is required"),

  body("client.firstName")
    .isString()
    .withMessage("Clients first name should be a string")
    .notEmpty()
    .withMessage("Client first name is required"),

  body("client.lastName")
    .isString()
    .withMessage("Clients last name should be a string")
    .notEmpty()
    .withMessage("Client last name is required"),

  body("client.middleName")
    .isString()
    .withMessage("Clients middle name should be a string")
    .notEmpty()
    .withMessage("Clients middle name is required"),

  body("client.email")
    .isEmail()
    .withMessage("Client email must be a valid email address"),

  body("client.phone").isMobilePhone("any").withMessage("Invalid phone number"),

  body("client.address")
    .isString()
    .withMessage("Clients address should be a string")
    .notEmpty()
    .withMessage("Client address is required"),

  body("products")
    .isArray({ min: 1 })
    .withMessage("Products must be an array with at least one item"),

  body("products.*.productId")
    .isString()
    .withMessage("Product id should be a string")
    .notEmpty()
    .withMessage("Each product must have a valid productId (string)"),

  body("products.*.count")
    .isInt({ min: 1 })
    .withMessage("Each product must have a valid count (minimum 1)")
    .notEmpty()
    .withMessage("Product count is required"),

  handleValidationErrors,
];
