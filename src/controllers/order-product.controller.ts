import { NextFunction, Request, Response } from "express";
import OrderProductModel from "../models/order-product.model";

const orderProductModel = new OrderProductModel();

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const orderProModel = await orderProductModel.create(req.body);
    res.json({
      status: "Ok",
      data: { ...orderProModel },
    });
  } catch (error) {
    next(error);
  }
};

export const upadte = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const orderProModel = await orderProductModel.update(req.body);
    res.json({
      status: "Ok",
      data: { ...orderProModel },
    });
  } catch (error) {
    next(error);
  }
};
export const deleted = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const orderProModel = await orderProductModel.deleteProduct(
      req.body.orderId,
      req.body.productId
    );
    res.json({
      status: "Ok",
      data: { ...orderProModel },
    });
  } catch (error) {
    next(error);
  }
};
export const show = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const orderProModel = await orderProductModel.show(
      req.body.orderId as unknown as number,
      req.body.productId as unknown as number
    );
    res.json({
      status: "Ok",
      data: { ...orderProModel },
    });
  } catch (error) {
    next(error);
  }
};
export const getByOrderId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const orderProModel = await orderProductModel.getByOrderId(
      req.params.orderId as unknown as number
    );
    res.json({
      status: "Ok",
      data: { ...orderProModel },
    });
  } catch (error) {
    next(error);
  }
};
