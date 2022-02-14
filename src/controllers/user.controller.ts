import express, { Request, Response, NextFunction } from "express";
import UserModel from "../models/user.model";
import { Sucess } from "../Enum/success";

const userModel = new UserModel();

export const getAll = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await userModel.index();
    res.json({
      status: Sucess.status,
      message: Sucess.AllUsers,
      data: { user },
    });
  } catch (error) {
    next(error);
  }
};
