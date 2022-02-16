import { NextFunction, Response, Request } from "express";
import config from "../config";
import jwt from "jsonwebtoken";

export interface IError {
  name?: string;
  message?: string;
  status?: number;
}

const handleAuthorizeErrorMiddleWare = (next: NextFunction) => {
  const error: IError = new Error("Login error, please try again!");
  error.status = 404;
  error.name = "Authorized Error";
  error.message = "Login error";
  next(error);
};
const validateTokenMiddleWare = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.get("Authorization");
    if (authHeader) {
      const bearer = authHeader.split(" ")[0].toLowerCase();
      const token = authHeader.split(" ")[1];
      if (token && bearer === "bearer") {
        const decode = jwt.verify(token, config.token as unknown as string);
        if (decode) {
          next();
        } else {
          handleAuthorizeErrorMiddleWare(next);
        }
      } else {
        handleAuthorizeErrorMiddleWare(next);
      }
    } else {
      handleAuthorizeErrorMiddleWare(next);
    }
  } catch (error) {
    handleAuthorizeErrorMiddleWare(next);
  }
};

export default validateTokenMiddleWare;
