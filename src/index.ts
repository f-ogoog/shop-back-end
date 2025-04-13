import express, { Application } from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import authRoutes from "./routes/auth.routes";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middlewares/error.handler";
import productsRoutes from "./routes/products.routes";
import ordersRoutes from "./routes/orders.routes";
import cors from "cors";
import { setupSwagger } from "./config/swagger";
import { ApolloServer } from "apollo-server-express";
import typeDefs from "./graphql/schema";
import resolvers from "./graphql/resolvers";

dotenv.config();

const port = process.env.PORT || 3001;

const startServer = async () => {
  await connectDB();

  const app = express();

  setupSwagger(app);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();

  server.applyMiddleware({ app: app as any });

  app.use(express.json());
  app.use(cookieParser());
  app.use(
    cors({
      origin: "http://localhost:4200",
      credentials: true,
    })
  );

  app.use("/auth", authRoutes);
  app.use("/products", productsRoutes);
  app.use("/orders", ordersRoutes);

  app.use(errorHandler);

  app.listen(port, () => {
    console.log(`🚀 Server running at http://localhost:${port}`);
    console.log(`🚀 GraphQL at http://localhost:${port}${server.graphqlPath}`);
  });
};

startServer();
