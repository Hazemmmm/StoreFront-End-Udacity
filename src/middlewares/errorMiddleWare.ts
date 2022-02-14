import { NextFunction, Response, Request } from "express";
import { errorMsg } from "../Enum/error";

const errorMiddleWare = (_req: Request, res: Response, next: NextFunction) => {
  res.status(400).json({
    status: errorMsg.status,
    message: errorMsg.message,
  });
};
export default errorMiddleWare;
