import ProductModel from "../product.model";
import Product from "../../types/product.types";
import db from "../../database";

const productModel = new ProductModel();

xdescribe("Product Model Dfined", () => {
  describe("Test Product Model Methods have defined", () => {
    it("Product createProduct has defined", () => {
      expect(productModel.createProduct).toBeDefined();
    });
    it("Product deleteProduct has defined", () => {
      expect(productModel.deleteProduct).toBeDefined();
    });
    it("Product getAllProducts has defined", () => {
      expect(productModel.getAllProducts).toBeDefined();
    });
    it("Product getProductsById has defined", () => {
      expect(productModel.getProductsById).toBeDefined();
    });
    it("Product updateProduct has defined", () => {
      expect(productModel.updateProduct).toBeDefined();
    });
  });

  describe("Test Product Methods Functionality", () => {
    const product = {
      name: "product name test",
      description: "product desc test",
      price: 62.25,
      category: "srfas",
    } as Product;

    it("Product createProduct should update exsiting product", async () => {
      const newProduct = await productModel.createProduct(product);
      expect(newProduct.category).toBe("srfas");
      expect(newProduct.name).toBe("product name test");
      expect(newProduct.description).toBe("product desc test");
    });
    it("Product deleteProduct should update exsiting product", async () => {
      const upProduct = {
        name: "updated-product",
        description: "updated",
        price: 100.0,
        category: "electronic",
        id: 1,
      };
      const updateProduct1 = await productModel.updateProduct(upProduct);
      expect(updateProduct1.id).toBe(1);
      expect(updateProduct1.name).toBe("updated-product");
      expect(upProduct.description).toBe("updated");
      expect(upProduct.price).toBe(100);
      expect(upProduct.category).toBe("electronic");
    });
    it("Product getAllProducts should return all Products", async () => {
      const allProducts = await productModel.getAllProducts();
      expect(allProducts.length).toBe(1);
    });
    it("Product getProductsById should update exsiting product", async () => {
      const getProductByID = await productModel.getProductsById(1);
      expect(getProductByID.id).toBe(1);
      expect(getProductByID.name).toBe("updated-product");
      expect(getProductByID.description).toBe("updated");
    });
    it("Product updateProduct should update exsiting product", async () => {
      const updateProduct = await productModel.updateProduct({
        category: "asd",
        description: "desc",
        name: "ds",
        price: 12.44,
        id: 1,
      });
      expect(updateProduct.category).toBe("asd");
      expect(updateProduct.description).toBe("desc");
    });
  });

  afterAll(async () => {
    const connection = await db.connect();
    const sql =
      "DELETE FROM products;\n ALTER SEQUENCE products_id_seq RESTART WITH 1;\n";
    await connection.query(sql);
    connection.release();
  });
});
