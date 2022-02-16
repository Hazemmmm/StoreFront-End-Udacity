import supertest from "supertest";
import db from "../../database";
import app from "../../server";
import UserModel from "../../models/user.model";
import User from "../../types/user.types";

const userModel = new UserModel();
const req = supertest(app);
let token = "";

describe("Test Orderes API", () => {
  beforeAll(async () => {
    const user = {
      first_name: "testUserOrder",
      last_name: "testUserOrder",
      password: "testUserOrder@123",
      email: "testUserOrder@gmail.com",
    } as User;

    await userModel.createUser(user);
  });

  afterAll(async () => {
    const connection = await db.connect();
    const sql =
      "DELETE FROM users;\nALTER SEQUENCE users_id_seq RESTART WITH 1";
    const resul = await connection.query(sql);
    connection.release();
  });

  describe("Test Orders CRUP Operations", () => {
    it("should create new order", async () => {
      const res = await req
        .post("/api/orders")
        .set("content-type", "application/json")
        .set("Authorization", `Bearer ${token}`)
        .send({
          status: "active",
          user_id: 5,
        });
      expect(res.statusCode).toBe(200);
    });
    it("should update order", async () => {
      const res = await req
        .patch("/api/orders/4")
        .set("content-type", "application/json")
        .set("Authorization", `Bearer ${token}`)
        .send({
          status: "inactive",
          user_id: 10,
        });
      expect(res.statusCode).toBe(200);
    });
    it("should delete order", async () => {
      const res = await req
        .delete("/api/orders/1")
        .set("content-type", "application/json")
        .set("Authorization", `Bearer ${token}`);
      expect(res.statusCode).toBe(200);
    });
    it("should get All order", async () => {
      const res = await req
        .get("/api/orders")
        .set("content-type", "application/json")
        .set("Authorization", `Bearer ${token}`);
      expect(res.statusCode).toBe(200);
    });
    it("should get order byId", async () => {
      const res = await req
        .get("/api/orders/4")
        .set("content-type", "application/json")
        .set("Authorization", `Bearer ${token}`);
      expect(res.statusCode).toBe(200);
    });
    it("should get order for user", async () => {
      const res = await req
        .get("/api/orders/users/4")
        .set("content-type", "application/json")
        .set("Authorization", `Bearer ${token}`);
      expect(res.statusCode).toBe(200);
    });
  });
});
