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
      Number(req.body["order_id"]),
      Number(req.body["product_id"])
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
      req.body["order_id"],
      req.body["product_id"]
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
      Number(req.params["id"])
    );
    res.json({
      status: "Ok",
      data: { ...orderProModel },
    });
  } catch (error) {
    next(error);
  }
};
