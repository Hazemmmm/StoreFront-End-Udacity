import Product from "../types/product.types";
import db from "../database";

class ProductModel {
  //create a new Product//
  async createProduct(product: Product): Promise<Product> {
    try {
      const connnection = await db.connect();
      const sql =
        "INSERT INTO products (name,description,price,category) VALUES($1,$2,$3,$4) RETURNING *";
      const result = await connnection.query(sql, [
        product.name,
        product.description,
        product.price,
        product.category,
      ]);
      connnection.release();
      return result.rows[0];
    } catch (error: any) {
      throw new Error(`Couldn't create new product ${error.message}`);
    }
  }
  //update a new Product
  async updateProduct(product: Product): Promise<Product> {
    try {
      const connection = await db.connect();
      const sql =
        "UPDATE products SET name=$1, description=$2, price=$3, category=$4 WHERE id=($5)";
      const result = await connection.query(sql, [
        product.name,
        product.description,
        product.price,
        product.category,
        product.id,
      ]);
      connection.release();
      return result.rows[0];
    } catch (error: any) {
      throw new Error(`couldn't update products Error ${error.message}`);
    }
  }
  //delete a Product
  async deleteProduct(id: number): Promise<Product> {
    try {
      const connection = await db.connect();
      const sql = "DELETE FROM products WHERE id=($1)";
      const result = await connection.query(sql, [id]);
      connection.release();
      return result.rows[0];
    } catch (error: any) {
      throw new Error(`Coudn't delte product id: ${id}`);
    }
  }
  //getAll products
  async getAllProducts(): Promise<Product[]> {
    try {
      const connection = await db.connect();
      const sql = "SELECT * FROM products";
      const result = await connection.query(sql);
      connection.release();
      return result.rows;
    } catch (error: any) {
      throw new Error(`Can't get all products, Error ${error.message}`);
    }
  }
  //get by category

  async getProductsById(id: number): Promise<Product> {
    try {
      const connection = await db.connect();
      const sql = "SELECT * FROM products WHERE id=($1)";
      const result = await connection.query(sql, [id]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Can't get products by product Id: ${id}`);
    }
  }
}

export default ProductModel;
