import supertest from "supertest";
import db from "../../database";
import app from "../../server";
import UserModel from "../../models/user.model";
import ProductModel from "../../models/product.model";
import OrderProduct from "../../types/order-product.types";
import OrderModel from "../../models/order.model";
import User from "../../types/user.types";
import Product from "../../types/product.types";
import Order from "../../types/order.types";

const req = supertest(app);
const userModel = new UserModel();
const productModel = new ProductModel();
const orderModel = new OrderModel();
let token = "";

describe("Test Order-Product EndPoints", () => {
  const productOrder = {
    quantity: 10,
    order_id: 1,
    product_id: 1,
  } as OrderProduct;
  beforeAll(async () => {
    const user = {
      first_name: "testUserOrder-product",
      last_name: "testUserOrder-product",
      password: "testUserOrder@123-product",
      email: "testUserOrder-product@gmail.com",
    } as User;

    const order = {
      status: "active",
      user_id: 1,
    } as Order;

    const product = {
      name: "prdo",
      description: "fdar",
      price: 12.34,
      category: "staser",
    } as Product;

    await userModel.createUser(user);
    await productModel.createProduct(product);
    await orderModel.createOrder(order);
  });

  afterAll(async () => {
    const connection = await db.connect();
    const sql =
      "DELETE FROM orders;\nALTER SEQUENCE orders_id_seq RESTART WITH 1;\nDELETE FROM products;\nALTER SEQUENCE products_id_seq RESTART WITH 1;\nDELETE FROM users;\nALTER SEQUENCE users_id_seq RESTART WITH 1;\nDELETE FROM order_products;\nALTER SEQUENCE order_products_id_seq RESTART WITH 1;";
    await connection.query(sql);
    connection.release();
  });

  describe("Test Order-Product CRUD Operations API", () => {
    it("it should create new order product", async () => {
      const res = await req
        .post("/api/order-products/1")
        .set("content-type", "application/json")
        .set("Authorization", `Bearer ${token}`)
        .send({
          quantity: 150,
          order_id: 1,
          product_id: 1,
        });
      expect(res.statusCode).toBe(200);
    });

    it("it should get list of order product", async () => {
      const res = await req
        .get("/api/order-products/1/products/1")
        .set("content-type", "application/json")
        .set("Authorization", `Bearer ${token}`);
      expect(res.statusCode).toBe(200);
    });
    it("it should get order product by Id", async () => {
      const res = await req
        .get("/api/order-products/1/products/1")
        .set("content-type", "application/json")
        .set("Authorization", `Bearer ${token}`);
      expect(res.statusCode).toBe(200);
    });
    it("it should update order product", async () => {
      const res = await req
        .patch("/api/order-products/1/products/1")
        .set("content-type", "application/json")
        .set("Authorization", `Bearer ${token}`)
        .send({
          quantity: "19",
          order_id: 14,
          product_id: 14,
          id: 1,
        });
      expect(res.statusCode).toBe(200);
    });
    it("it should delete order", async () => {
      const res = await req
        .delete("/api/order-products/1/products/1")
        .set("content-type", "application/json")
        .set("Authorization", `Bearer ${token}`)
        .send({
          orderId: 1,
          productId: 1,
        });
      expect(res.statusCode).toBe(200);
    });
  });
});
