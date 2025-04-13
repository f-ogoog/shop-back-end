import { IResolvers } from "@graphql-tools/utils";
import Product, { ProductDocument } from "../models/product.model";

const resolvers: IResolvers = {
  Query: {
    products: async (): Promise<ProductDocument[]> => Product.find({}),
    product: async (
      _: unknown,
      { id }: { id: string }
    ): Promise<ProductDocument | null> => Product.findById(id),
  },

  Mutation: {
    addProduct: async (
      _: unknown,
      {
        name,
        price,
        measurementUnit,
      }: { name: string; price: number; measurementUnit: string }
    ): Promise<ProductDocument> => {
      const product = new Product({ name, price, measurementUnit });
      return await product.save();
    },

    updateProduct: async (
      _: unknown,
      args: { id: string } & Partial<{
        name: string;
        price: number;
        measurementUnit: string;
      }>
    ): Promise<ProductDocument | null> => {
      const { id, ...updates } = args;
      return Product.findByIdAndUpdate(id, updates, { new: true });
    },

    deleteProduct: async (
      _: unknown,
      { id }: { id: string }
    ): Promise<ProductDocument | null> => Product.findByIdAndDelete(id),
  },
};

export default resolvers;
