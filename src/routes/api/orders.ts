import express, { Request, Response, NextFunction } from "express";
import * as controllers from "../../controllers/order.controller";
import validateTokenMiddleWare from "../../middlewares/authenticationMiddleWare";

const orderRouter = express.Router();
orderRouter.get("/", validateTokenMiddleWare, controllers.getAllOrders);
orderRouter.get("/:id", validateTokenMiddleWare, controllers.getOrderById);
orderRouter.get(
  "/users/:id",
  validateTokenMiddleWare,
  controllers.getOrderByUserId
);
orderRouter.delete("/:id", validateTokenMiddleWare, controllers.deleteOrder);
orderRouter.post("/", controllers.createOrder);
orderRouter.patch("/:id", validateTokenMiddleWare, controllers.updateOrder);

export default orderRouter;
