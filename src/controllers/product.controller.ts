import { Request, Response } from "express";
import { productService } from "../services/product.service";
import {
  getProductResponse,
  getProductsResponse,
} from "../mappers/products.mapper";
import { ProductQuery } from "../types/products.types";

export const createProduct = async (req: Request, res: Response) => {
  const data = await productService.createProduct(req.body);
  const product = getProductResponse(data);
  res.status(201).json({ product });
};

export const updateProduct = async (req: Request, res: Response) => {
  const data = await productService.updateProductById(
    req.params.productId,
    req.body
  );
  const product = getProductResponse(data);
  res.status(201).json({ product });
};

export const getAllProducts = async (req: Request, res: Response) => {
  const result = await productService.getAllProducts(req.query as ProductQuery);
  const products = getProductsResponse(result.products);
  res.status(200).json({ products, pagination: result.pagination });
};

export const getProductById = async (req: Request, res: Response) => {
  const data = await productService.getProductById(req.params.productId);
  const product = getProductResponse(data);
  res.status(200).json({ product });
};

export const deleteProduct = async (req: Request, res: Response) => {
  const data = await productService.deleteProductById(req.params.productId);
  const product = getProductResponse(data);
  res.status(201).json({ product });
};
