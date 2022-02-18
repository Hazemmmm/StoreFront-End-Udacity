import supertest from "supertest";
import db from "../../database";
import app from "../../server";
import UserModel from "../../models/user.model";
import User from "../../types/user.types";

const userModel = new UserModel();
const req = supertest(app);
let token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxOSwiZW1haWwiOiJoYXplbXpvbkBnbWF3aWwuY29tIiwiZmlyc3RfbmFtZSI6ImhhemVtIiwibGFzdF9uYW1lIjoibW9oYW1lZCJ9LCJpYXQiOjE2NDUyMDY2Mjd9.8kLkITZkCEoZMabEiOCzaQA05UM78Q2AYDsiv1OBot8";

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
      "DELETE FROM users;\nALTER SEQUENCE users_id_seq RESTART WITH 1;\nDELETE FROM orders;\nALTER SEQUENCE orders_id_seq RESTART WITH 1";
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
          id: 1,
          status: "active",
          user_id: 1,
        });
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
      let id = 1;
      const res = await req
        .get(`/api/orders/${id}`)
        .set("content-type", "application/json")
        .set("Authorization", `Bearer ${token}`);
      expect(res.statusCode).toBe(200);
    });
    it("should get order for user", async () => {
      const res = await req
        .get("/api/orders/users/1")
        .set("content-type", "application/json")
        .set("Authorization", `Bearer ${token}`);
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
  });
});
