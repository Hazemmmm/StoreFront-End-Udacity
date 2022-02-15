import { NextFunction, Response, Request } from "express";
import { SucessProduct } from "../Enum/successProduct";
import ProductModel from "../models/product.model";

const productModel = new ProductModel();

export const getAllProducts = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const products = await productModel.getAllProducts();
    res.json({
      status: SucessProduct.status,
      message: SucessProduct.AllProducts,
      data: { ...products },
    });
  } catch (error) {
    next(error);
  }
};
export const getProductsById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const products = await productModel.getProductsById(
      req.params.id as unknown as number
    );
    res.json({
      status: SucessProduct.status,
      message: SucessProduct.ProductById,
      data: { ...products },
    });
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = await productModel.deleteProduct(
      req.params.id as unknown as number
    );
    res.json({
      status: SucessProduct.status,
      message: SucessProduct.DeleteProduct,
      data: { product },
    });
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = await productModel.updateProduct(req.body);
    res.json({
      status: SucessProduct.status,
      message: SucessProduct.UpdateProduct,
      data: { ...product },
    });
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const products = await productModel.createProduct(req.body);
    res.json({
      status: SucessProduct.status,
      message: SucessProduct.CreateProduct,
      data: { products },
    });
  } catch (error) {
    next(error);
  }
};
