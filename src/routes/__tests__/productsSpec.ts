import supertest from "supertest";
import db from "../../database";
import productModel from "../../models/product.model";
import UserModel from "../../models/user.model";
import app from "../../server";
import Product from "../../types/product.types";
import User from "../../types/user.types";

const req = supertest(app);
const userModel = new UserModel();
let token = "";
xdescribe("Product Route API", () => {
  beforeAll(async () => {
    const user = {
      first_name: "testUserProduct",
      last_name: "testUserProduct",
      password: "testUserProduct@123",
      email: "testUserProduct@gmail.com",
    } as User;

    await userModel.createUser(user);
  });

  afterAll(async () => {
    const connection = await db.connect();
    const sql =
      "DELETE FROM users;\nALTER SEQUENCE users_id_seq RESTART WITH 1";
    const result = await connection.query(sql);
    connection.release();
  });

  describe("Test CRUD Operation for Product APIS ", () => {
    it("it should create new product", async () => {
      const res = await req
        .post("/api/products")
        .set("content-type", "application/json")
        .set("Authorization", `Bearer ${token}`)
        .send({
          name: "testProdcut",
          description: "testt",
          price: 31.9,
          category: "test",
        });
      expect(res.statusCode).toBe(200);
    });
    it("it should delete product", async () => {
      const res = await req
        .delete("/api/products/1")
        .set("content-type", "application/json")
        .set("Authorization", `Bearer ${token}`);
      expect(res.statusCode).toBe(200);
    });
    it("it should update product", async () => {
      const res = await req
        .patch("/api/products/3")
        .set("content-type", "application/json")
        .set("Authorization", `Bearer ${token}`)
        .send({
          name: "new Prsoduct",
          description: "dessc",
          price: 0.01,
          category: "elecstrorc",
        });
      expect(res.statusCode).toBe(200);
    });
    it("it should get all product", async () => {
      const res = await req
        .get("/api/products")
        .set("content-type", "application/json")
        .set("Authorization", `Bearer ${token}`);
      expect(res.statusCode).toBe(200);
    });
    it("it should getByid product", async () => {
      const res = await req
        .get("/api/products/3")
        .set("content-type", "application/json")
        .set("Authorization", `Bearer ${token}`);

      expect(res.statusCode).toBe(200);
    });
  });
});
