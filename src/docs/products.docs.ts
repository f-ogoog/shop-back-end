import { MeasurementUnit } from "../models/product.model";
import { pagination } from "./pagination.docs";

const baseProductSchema = {
  type: "object",
  properties: {
    name: {
      type: "string",
      example: "Груша",
    },
    price: {
      type: "number",
      example: 30.75,
    },
    measurementUnit: {
      type: "string",
      enum: ["kg", "l", "unit"],
      example: "kg",
    },
  },
};

export const createProductRequestSchema = {
  ...baseProductSchema,
  required: ["name", "price", "measurementUnit"],
};

export const updateProductRequestSchema = {
  ...baseProductSchema,
  required: [],
};

export const productErrorSchema = {
  type: "object",
  properties: {
    error: {
      type: "object",
      properties: {
        message: {
          type: "string",
          example: "Measurement unit must be in enum: kg, l, unit",
        },
      },
    },
  },
};

export const productResponseSchema = {
  type: "object",
  properties: {
    product: {
      type: "object",
      properties: {
        id: {
          type: "string",
          example: "65a6f1a5d6c17b002b6c72a1",
        },
        name: {
          type: "string",
          example: "Яблуко",
        },
        price: {
          type: "number",
          example: 25.5,
        },
        measurementUnit: {
          type: "string",
          enum: Object.values(MeasurementUnit),
          example: "kg",
        },
      },
    },
  },
};

export const productsQuerySchema = {
  type: "object",
  properties: {
    search: {
      type: "string",
      description: "Пошуковий запит для фільтрації продуктів",
      example: "яблуко",
    },
    order: {
      type: "string",
      enum: ["asc", "desc"],
      description:
        "Сортування за ціною (asc - за зростанням, desc - за спаданням)",
      example: "asc",
    },
    page: {
      type: "integer",
      description: "Номер сторінки",
      example: 1,
    },
    limit: {
      type: "integer",
      description: "Кількість елементів на сторінці",
      example: 10,
    },
  },
};

export const productsResponseSchema = {
  type: "object",
  properties: {
    products: {
      type: "array",
      items: productResponseSchema,
    },
    pagination,
  },
};
