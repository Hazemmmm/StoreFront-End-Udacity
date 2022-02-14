
import express, { Request, Response, NextFunction } from "express";
import * as controllers from "../../controllers/order.controller";
const orderRouter = express.Router();

orderRouter.get("/", controllers.getAllOrders);
orderRouter.get("/:id", controllers.getOrderById);
orderRouter.get("/users/:id", controllers.getOrderByUserId);
orderRouter.delete("/:id", controllers.deleteOrder);
orderRouter.post("/", controllers.createOrder);
orderRouter.patch("/:id", controllers.updateOrder);

export default orderRouter;