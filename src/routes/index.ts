import express from "express";
import userRouter from "../routes/api/users";
const routes = express.Router();

routes.use("/users", userRouter);

export default routes;
