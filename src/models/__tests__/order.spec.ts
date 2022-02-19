import OrderModel from "../order.model";
import Order from "../../types/order.types";
import User from "../../types/user.types";
import Product from "../../types/product.types";
import db from "../../database";
import UserModel from "../../models/user.model";
import ProductModel from "../product.model";

const orderModel = new OrderModel();
const userModel = new UserModel();
const productModel = new ProductModel();

describe("Order Model Dfined", () => {
  describe("Test Order Model Methods have defined", () => {
    it("Order createOrder has defined", () => {
      expect(orderModel.createOrder).toBeDefined();
    });
    it("Order deleteOrder has defined", () => {
      expect(orderModel.deleteOrder).toBeDefined();
    });
    it("Order getAllOrders has defined", () => {
      expect(orderModel.getAllOrders).toBeDefined();
    });
    it("Order getOrderById has defined", () => {
      expect(orderModel.getOrderById).toBeDefined();
    });
    it("Order getOrderByUserId has defined", () => {
      expect(orderModel.getOrderByUserId).toBeDefined();
    });
    it("Order updateOrder has defined", () => {
      expect(orderModel.updateOrder).toBeDefined();
    });
  });

  describe("Order Model logic", () => {
    const user = {
      id: 1,
      first_name: "Hazem_test_4",
      last_name: "Mohamed_test_4",
      email: "test4@gmail.com",
      password: "test1@142345",
    } as User;
    const product = {
      name: "product name test",
      description: "product desc test",
      price: 62.25,
      category: "srfas",
    } as Product;
    const order = {
      id: 1,
      status: "active",
      user_id: 1,
    } as Order;

    beforeAll(async () => {
      await userModel.createUser(user);
      await productModel.createProduct(product);
    });

    afterAll(async () => {
      const connection = await db.connect();
      const sql =
        "DELETE FROM users;\n ALTER SEQUENCE users_id_seq RESTART WITH 1;\nDELETE FROM products;\n ALTER SEQUENCE products_id_seq RESTART WITH 1;\nDELETE FROM orders;\nALTER SEQUENCE orders_id_seq RESTART WITH 1;";
      await connection.query(sql);
      connection.release();
    });

    it("createOrder should Create Order", async () => {
      const newOrder = await orderModel.createOrder(order);
      expect(newOrder.status).toBe("active");
    });

    it("getAllOrders should return all Orders", async () => {
      const allOrders = await orderModel.getAllOrders();
      expect(allOrders.length).toBeGreaterThanOrEqual(1);
    });

    it("getOrderById should return specific order", async () => {
      const returnOrder = await orderModel.getOrderById(1);
      expect(returnOrder.id).toEqual(1);
    });

    it("getOrderByUserId should return Order related to specific user", async () => {
      const returnedOrder = await orderModel.getOrderByUserId(1);
      expect(returnedOrder.id).toEqual(1);
    });

    it("updateOrder should update order", async () => {
      const updateOrder = await orderModel.updateOrder({
        status: "inactive",
        user_id: 1,
        id: 1,
      });
      expect(updateOrder.status).toBe("inactive");
    });
    it("deleteOrder should delete Order", async () => {
      const deletedOrder = await orderModel.deleteOrder(1);
      expect(deletedOrder.id).toEqual(1);
    });
  });
});
