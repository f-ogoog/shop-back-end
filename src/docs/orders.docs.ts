import { pagination } from "./pagination.docs";
import { productResponseSchema } from "./products.docs";

export const orderRequestSchema = {
  type: "object",
  required: ["client", "products"],
  properties: {
    client: {
      type: "object",
      required: [
        "firstName",
        "lastName",
        "middleName",
        "email",
        "phone",
        "address",
      ],
      properties: {
        firstName: { type: "string", example: "Іван" },
        lastName: { type: "string", example: "Петренко" },
        middleName: { type: "string", example: "Андрійович" },
        email: { type: "string", format: "email", example: "ivan@example.com" },
        phone: { type: "string", example: "+380745344593" },
        address: { type: "string", example: "вул. Хрещатик 1, Київ" },
      },
    },
    products: {
      type: "array",
      minItems: 1,
      items: {
        type: "object",
        required: ["productId", "count"],
        properties: {
          productId: { type: "string", example: "65a6c79f5d6a7e001f8b5a9d" },
          count: { type: "integer", minimum: 1, example: 2 },
        },
      },
    },
  },
};

export const simpleOrderResponseSchema = {
  type: "object",
  properties: {
    id: { type: "string", example: "65a6c79f5d6a7e001f8b5a9d" },
    number: { type: "integer", example: 1024 },
    status: { type: "string", example: "created" },
    saleDate: {
      type: "string",
      format: "date-time",
      example: "2024-03-15T12:30:00.000Z",
    },
    deliveryDate: {
      type: "string",
      format: "date-time",
      example: "2024-03-20T12:30:00.000Z",
    },
  },
};

export const simpleOrderWithPriceResponseSchema = {
  type: "object",
  properties: {
    order: simpleOrderResponseSchema,
    price: {
      type: "object",
      properties: {
        totalPrice: { type: "number", example: 1200.5 },
        discount: { type: "number", example: 10 },
      },
    },
  },
};

export const ordersQuerySchema = {
  type: "object",
  properties: {
    page: { type: "integer", minimum: 1, example: 1 },
    limit: { type: "integer", minimum: 1, example: 10 },
    search: { type: "number", example: 1024 },
    status: {
      type: "string",
      enum: ["created", "paid", "shipped", "received", "declined"],
      example: "created",
    },
    order: { type: "string", enum: ["asc", "desc"], example: "desc" },
  },
};

export const simpleOrdersResponseSchema = {
  type: "object",
  properties: {
    orders: {
      type: "array",
      items: simpleOrderResponseSchema,
    },
    pagination,
  },
};

export const orderResponseSchema = {
  type: "object",
  properties: {
    order: {
      type: "object",
      properties: {
        id: { type: "string", example: "65a6c79f5d6a7e001f8b5a9d" },
        number: { type: "integer", example: 1024 },
        status: {
          type: "string",
          enum: ["created", "paid", "shipped", "received", "declined"],
          example: "created",
        },
        saleDate: {
          type: "string",
          format: "date-time",
          example: "2024-03-15T12:30:00.000Z",
        },
        deliveryDate: {
          type: "string",
          format: "date-time",
          example: "2024-03-20T12:30:00.000Z",
        },
        totalPrice: { type: "number", example: 250.5 },
        discount: { type: "number", example: 10 },
        client: {
          type: "object",
          nullable: true,
          properties: {
            id: { type: "string", example: "65a6c79f5d6a7e001f8b5a9d" },
            email: { type: "string", example: "client@example.com" },
            firstName: { type: "string", example: "Іван" },
            lastName: { type: "string", example: "Петренко" },
            middleName: { type: "string", example: "Андрійович" },
            phone: { type: "string", example: "+380745344593" },
            address: { type: "string", example: "Київ, вул. Грушевського, 10" },
          },
        },
        products: {
          type: "array",
          items: {
            type: "object",
            properties: {
              product: productResponseSchema,
              count: { type: "integer", example: 2 },
            },
          },
        },
      },
    },
  },
};
