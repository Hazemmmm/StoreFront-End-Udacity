import express from "express";
import * as controllers from "../../controllers/user.controller";

import authoizationMiddleWare from "../../middlewares/authenticationMiddleWare";

const userRouter = express.Router();

userRouter.get("/", controllers.getAll);
userRouter.get("/:id", controllers.getById);
userRouter.post("/", controllers.createUser);
userRouter.delete("/:id", controllers.deleteUser);
userRouter.patch("/:id", controllers.updateUser);

userRouter.post("/authenticate", controllers.authenticate);
export default userRouter;
