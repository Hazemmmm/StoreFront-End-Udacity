import express from "express";
import * as controllers from "../../controllers/user.controller";

import authoizationMiddleWare from "../../middlewares/authenticationMiddleWare";

const userRouter = express.Router();

userRouter.get("/", authoizationMiddleWare, controllers.getAll);
userRouter.get("/:id", authoizationMiddleWare, controllers.getById);
userRouter.post("/", controllers.createUser);
userRouter.delete("/:id", authoizationMiddleWare, controllers.deleteUser);
userRouter.patch("/:id", authoizationMiddleWare, controllers.updateUser);

userRouter.post("/authenticate", controllers.authenticate);
export default userRouter;
