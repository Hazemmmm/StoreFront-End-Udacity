import Order from "../../types/order.types";
import User from "../../types/user.types";
import Product from "../../types/product.types";
import OrderProduct from "../../types/order-product.types";
import db from "../../database";
import UserModel from "../../models/user.model";
import OrderModel from "../order.model";
import ProductModel from "../product.model";
import OrderProductModel from "../order-product.model";

const userModel = new UserModel();
const orderModel = new OrderModel();
const productModel = new ProductModel();
const orderProductModel = new OrderProductModel();

xdescribe("Order Product Model", () => {
  describe("Test Methods that have defined", () => {
    it("should have create", () => {
      expect(orderProductModel.create).toBeDefined();
    });
    it("should have show", () => {
      expect(orderProductModel.show).toBeDefined();
    });
    it("should have deleteProduct", () => {
      expect(orderProductModel.deleteProduct).toBeDefined();
    });
    it("should have getByOrderId", () => {
      expect(orderProductModel.getByOrderId).toBeDefined();
    });
    it("should have update", () => {
      expect(orderProductModel.update).toBeDefined();
    });
  });

  describe("test model logic", () => {
    const user = {
      first_name: "Hazem_test_5",
      last_name: "Mohamed_test_5",
      email: "test45@gmail.com",
      password: "test5@142345",
    } as User;
    const product = {
      name: "product name test1",
      description: "product desc test1",
      price: 62.25,
      category: "test",
    } as Product;
    const order = {
      status: "active",
      user_id: 1,
    } as Order;

    const orderroduct = {
      product_id: 1,
      order_id: 1,
      quantity: 1,
      id: 1,
    } as OrderProduct;
    beforeAll(async () => {
      await userModel.createUser(user);
      await orderModel.createOrder(order);
      await productModel.createProduct(product);
    });

    afterAll(async () => {
      const connection = await db.connect();
      const sql =
        "DELETE FROM order_products;\nALTER SEQUENCE order_products_id_seq RESTART WITH 1;\nDELETE FROM users;\n ALTER SEQUENCE users_id_seq RESTART WITH 1;\n DELETE FROM products;\n ALTER SEQUENCE products_id_seq RESTART WITH 1;\nDELETE FROM orders;\nALTER SEQUENCE orders_id_seq RESTART WITH 1; ";
      await connection.query(sql);
      connection.release();
    });

    it("should create method return order product", async () => {
      const newOrderProduct = await orderProductModel.create(orderroduct);
      expect(newOrderProduct.id).toBe(1);
      expect(newOrderProduct.order_id).toBe(1);
      expect(newOrderProduct.quantity).toBe(1);
    });
    it("should index return all order products", async () => {
      const allOrderProducts = await orderProductModel.show(1, 1);
      expect(allOrderProducts.product_id).toBe(1);
    });
    it("should update metohd update the exsiting order product", async () => {});
    it("should getByOrderId", async () => {
      const updateOrderProduct = await orderProductModel.update({
        quantity: 100,
        order_id: 1,
        product_id: 1,
        id: 1,
      });
      expect(updateOrderProduct.quantity).toBe(100);
    });
    it("deleteProduct should deelte product", async () => {
      const deleteOrderProduct = await orderProductModel.deleteProduct(1, 1);
      expect(deleteOrderProduct.id).toBe(1);
    });
  });
});
