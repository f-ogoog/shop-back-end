import productModel from "../models/product.model";
import { Product, ProductQuery } from "../types/products.types";
import { InvalidEntityIdExceprion } from "../utils/exceptions/invalid.entity.id.exception";

const createProduct = async (data: Product) => {
  return productModel.create(data);
};

const updateProductById = async (id: string, data: Partial<Product>) => {
  const product = await getProductById(id);
  Object.assign(product, data);
  return await product.save();
};

const getAllProducts = async ({
  search,
  order = "asc",
  page = 1,
  limit = 10,
}: ProductQuery) => {
  const query = search ? { name: { $regex: search, $options: "i" } } : {};

  const products = await productModel
    .find(query)
    .sort({ price: order })
    .skip((page - 1) * limit)
    .limit(limit);

  const totalCount = await productModel.countDocuments(query);

  return {
    products,
    pagination: {
      totalCount,
      totalPages: Math.ceil(totalCount / limit) || 1,
      page,
      limit,
    },
  };
};

const getProductById = async (id: string) => {
  const product = await productModel.findById(id);
  if (!product) throw new InvalidEntityIdExceprion("Product");
  return product;
};

const deleteProductById = async (id: string) => {
  const product = await productModel.findByIdAndDelete(id);
  if (!product) throw new InvalidEntityIdExceprion("Product");
  return product;
};

export const productService = {
  createProduct,
  updateProductById,
  getAllProducts,
  getProductById,
  deleteProductById,
};
