import express, { Request, Response, NextFunction } from "express";
import * as controllers from "../../controllers/product.controller";

const productRouter = express.Router();

productRouter.get("/", controllers.getAllProducts);
productRouter.get("/:id", controllers.getProductsById);
productRouter.delete("/:id", controllers.deleteProduct);
productRouter.post("/:id", controllers.updateProduct);
productRouter.post("/", controllers.createProduct);

export default productRouter;
