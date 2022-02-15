import express, { Request, Response, NextFunction } from "express";
import * as controllers from '../../controllers/order-product.controller'

const orderProductRouter = express.Router();

orderProductRouter.get("/:id/products/:id", controllers.show);
orderProductRouter.get('/', controllers.getByOrderId)
orderProductRouter.post('/', controllers.create)
orderProductRouter.delete('/:id/products/:id', controllers.deleted)
orderProductRouter.patch('/:id/products/:id', controllers.upadte)



export default orderProductRouter;
