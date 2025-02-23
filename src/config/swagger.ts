import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";
import {
  registerResponseSchema,
  registerRequestSchema,
  registerErrorSchema,
} from "../docs/register.docs";
import {
  loginErrorSchema,
  loginRequestSchema,
  loginResponseSchema,
} from "../docs/login.docs";
import { logoutResponseSchema } from "../docs/logout.docs";
import { unauthorizedErrorSchema } from "../docs/share.docs";
import { userResponseSchema } from "../docs/user.docs";
import {
  productErrorSchema,
  createProductRequestSchema,
  productResponseSchema,
  updateProductRequestSchema,
  productsQuerySchema,
  productsResponseSchema,
} from "../docs/products.docs";
import {
  orderRequestSchema,
  orderResponseSchema,
  ordersQuerySchema,
  simpleOrderResponseSchema,
  simpleOrdersResponseSchema,
  simpleOrderWithPriceResponseSchema,
} from "../docs/orders.docs";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Документація",
      version: "1.0.0",
      description: "Документація для мого Express API",
    },
    components: {
      securitySchemes: {
        cookieAuth: {
          type: "apiKey",
          in: "cookie",
          name: "token",
        },
      },
      schemas: {
        RegisterRequest: registerRequestSchema,
        RegisterResponse: registerResponseSchema,
        RegisterError: registerErrorSchema,
        LoginRequest: loginRequestSchema,
        LoginResponse: loginResponseSchema,
        LoginError: loginErrorSchema,
        LogoutResponse: logoutResponseSchema,
        UserResponse: userResponseSchema,
        CreateProductRequest: createProductRequestSchema,
        UpdateProductRequest: updateProductRequestSchema,
        ProductError: productErrorSchema,
        ProductResponse: productResponseSchema,
        ProductsQuerySchema: productsQuerySchema,
        ProductsResponse: productsResponseSchema,
        OrderRequest: orderRequestSchema,
        SimpleOrderResponse: simpleOrderResponseSchema,
        SimpleOrderWithPriceResponse: simpleOrderWithPriceResponseSchema,
        OrderQuery: ordersQuerySchema,
        SimpleOrdersResponse: simpleOrdersResponseSchema,
        OrderResponse: orderResponseSchema,
        UnauthorizedError: unauthorizedErrorSchema,
      },
    },
  },
  apis: ["./src/routes/*.ts"],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

export const setupSwagger = (app: Express) => {
  app.use("/api", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
