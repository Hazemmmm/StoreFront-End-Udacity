import express, { Request, Response, NextFunction } from "express";
import * as controllers from "../../controllers/product.controller";
import validateTokenMiddleWare from "../../middlewares/authenticationMiddleWare";

const productRouter = express.Router();

productRouter.get("/", controllers.getAllProducts);
productRouter.get("/:id", controllers.getProductsById);
productRouter.delete("/:id", controllers.deleteProduct);
productRouter.patch("/:id", controllers.updateProduct);
productRouter.post("/", validateTokenMiddleWare, controllers.createProduct);

export default productRouter;
