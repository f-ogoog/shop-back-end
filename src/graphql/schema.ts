import { gql } from "apollo-server-express";

const typeDefs = gql`
  scalar Date

  type User {
    _id: ID!
    email: String!
    password: String!
    role: String!
    client: Client
  }

  type Client {
    _id: ID!
    email: String!
    firstName: String!
    lastName: String!
    middleName: String
    phone: String!
    address: String!
    isRegular: Boolean!
    orders: [Order]
  }

  type Product {
    _id: ID!
    name: String!
    price: Float!
    measurementUnit: String!
  }

  type Order {
    _id: ID!
    deliveryDate: Date!
    saleDate: Date!
    totalPrice: Float!
    number: Int!
    discount: Int!
    status: String!
    products: [Product]
    client: Client!
  }

  type Query {
    products: [Product]
    product(id: ID!): Product
  }

  type Mutation {
    addProduct(name: String!, price: Float!, measurementUnit: String!): Product
    updateProduct(
      id: ID!
      name: String
      price: Float
      measurementUnit: String
    ): Product
    deleteProduct(id: ID!): Product
  }
`;

export default typeDefs;
