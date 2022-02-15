import express from "express";
import userRouter from "../routes/api/users";
import orderRouter from "./api/orders";
import productRouter from "./api/products";
const routes = express.Router();

routes.use("/users", userRouter);
routes.use("/orders", orderRouter);
routes.use("/products", productRouter);

export default routes;
