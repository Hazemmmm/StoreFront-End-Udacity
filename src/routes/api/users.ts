import express from "express";
import * as controllers from "../../controllers/user.controller";
const userRouter = express.Router();

userRouter.get("/", controllers.getAll)

export default userRouter;
