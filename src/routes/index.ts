import express from "express";
import userRouter from "../routes/api/users";
import orderRouter from "./api/orders";
import productRouter from "./api/products";
import orderProductRouter from "./api/order-products";
const routes = express.Router();

routes.use("/users", userRouter);
routes.use("/orders", orderRouter);
routes.use("/products", productRouter);
routes.use("/order-products", orderProductRouter);

export default routes;
