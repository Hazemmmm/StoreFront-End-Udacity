import express from "express";
import userRouter from "../routes/api/users";
import orderRouter from "./api/orders";
const routes = express.Router();

routes.use("/users", userRouter);

routes.use("/orders", orderRouter);

export default routes;
