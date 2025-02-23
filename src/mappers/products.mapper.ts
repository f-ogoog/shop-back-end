import { ProductDocument } from "../models/product.model";

export const getProductResponse = (product: ProductDocument) => {
  return {
    id: product._id,
    name: product.name,
    price: product.price,
    measurementUnit: product.measurementUnit,
  };
};

export const getProductsResponse = (products: ProductDocument[]) => {
  return products.map(getProductResponse);
};
