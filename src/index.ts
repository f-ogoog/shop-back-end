import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import authRoutes from "./routes/auth.routes";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middlewares/error.handler";
import productsRoutes from "./routes/products.routes";
import ordersRoutes from "./routes/orders.routes";
import cors from "cors";
import { setupSwagger } from "./config/swagger";

dotenv.config();

const port = process.env.PORT || 3001;

connectDB();

const app = express();

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

setupSwagger(app);

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
