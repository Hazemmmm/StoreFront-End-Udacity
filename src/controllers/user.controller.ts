import { Request, Response, NextFunction } from "express";
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

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await userModel.createUser(req.body);
    res.status(200).json({
      status: Sucess.status,
      message: Sucess.CreateUser,
      data: { ...user },
    });
  } catch (error) {
    next(error);
  }
};

export const getById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await userModel.getById(req.params.id as unknown as number);
    res.status(200).json({
      status: Sucess.status,
      message: Sucess.OneUser,
      data: { ...user },
    });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await userModel.deleteUser(req.params.id as unknown as number);
    res.status(200).json({
      status: Sucess.status,
      message: Sucess.DeleteUser,
      data: { ...user },
    });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await userModel.updateUser(req.body);
    res.status(200).json({
      status: Sucess.status,
      message: Sucess.UpdateUser,
      data: { ...user },
    });
  } catch (error) {
    next(error);
  }
};
