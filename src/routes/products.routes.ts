import express from "express";
import { validateProductCreation } from "../middlewares/validations/product.validation";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProduct,
} from "../controllers/product.controller";
import { validateId } from "../middlewares/validations/id.validation";
import { authenticateUser } from "../middlewares/auth.middleware";
import { isAdmin } from "../middlewares/is.admin.middleware";
import { validateProductsQuery } from "../middlewares/validations/products.query.validation";

const productsRoutes = express.Router();

productsRoutes.post(
  "/",
  authenticateUser,
  isAdmin,
  validateProductCreation,
  createProduct
);

productsRoutes.patch(
  "/:productId",
  authenticateUser,
  isAdmin,
  validateId("productId"),
  updateProduct
);

productsRoutes.get("/", validateProductsQuery, getAllProducts);

productsRoutes.get("/:productId", validateId("productId"), getProductById);

productsRoutes.delete(
  "/:productId",
  authenticateUser,
  isAdmin,
  validateId("productId"),
  deleteProduct
);

export default productsRoutes;
