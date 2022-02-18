import { NextFunction, Response, Request } from "express";
import { SucessOrder } from "../Enum/successOrder";
import OrderModel from "../models/order.model";

const orderModel = new OrderModel();

export const getAllOrders = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const order = await orderModel.getAllOrders();
    res.status(200).json({
      status: SucessOrder.status,
      message: SucessOrder.AllOrders,
      data: { ...order },
    });
  } catch (error) {
    next(error);
  }
};

export const getOrderById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const oder = await orderModel.getOrderById(Number(req.params.id));

    if (oder !== undefined) {
      res.json({
        status: SucessOrder.status,
        message: SucessOrder.OneOrder,
        data: { oder },
      });
    } else {
      console.error("cant get order by id, order id is not found");
    }
  } catch (error) {
    next(error);
  }
};
export const getOrderByUserId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const order = await orderModel.getOrderByUserId(
      req.params.id as unknown as number
    );
    if (order !== undefined) {
      res.json({
        status: SucessOrder.status,
        message: SucessOrder.OrderByUserId,
        data: { order },
      });
    } else {
      console.log("cant get order by user id, id is not found");
    }
  } catch (error) {
    next(error);
  }
};
export const deleteOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const order = await orderModel.deleteOrder(
      req.params.id as unknown as number
    );
    res.json({
      status: SucessOrder.status,
      message: SucessOrder.DeleteOrder,
      data: { order },
    });
  } catch (error) {
    next(error);
  }
};
export const createOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const order = await orderModel.createOrder(req.body);
    res.json({
      status: SucessOrder.status,
      message: SucessOrder.CreateOrder,
      data: { ...order },
    });
  } catch (error) {
    next(error);
  }
};
export const updateOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const order = await orderModel.updateOrder(req.body);
    res.json({
      status: SucessOrder.status,
      message: SucessOrder.UpdateOrder,
      data: { ...order },
    });
  } catch (error) {
    next(error);
  }
};
