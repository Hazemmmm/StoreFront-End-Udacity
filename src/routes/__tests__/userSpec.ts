import supertest from "supertest";
import db from "../../database";
import UserModel from "../../models/user.model";
import app from "../../server";
import User from "../../types/user.types";

const req = supertest(app);
const userModel = new UserModel();
let token = "";

xdescribe("User Route API", () => {
  beforeAll(async () => {
    const user = {
      first_name: "test",
      last_name: "test",
      password: "test@123",
      email: "test@gmail.com",
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

  describe("User Test Authenitcation Method", () => {
    it("it should be able to authenticate and get token", async () => {
      const res = await req
        .post("/api/users/authenticate")
        .set("content-type", "application/json")
        .send({
          email: "test@gmail.com",
          password: "test@123",
        });
      expect(res.statusCode).toBe(200);
      const { id, email, token: userToken } = res.body.data;
      expect(email).toBe("test@gmail.com");
      token = userToken;
    });
  });

  describe("User Test CRUD Operations", () => {
    it("should create new user", async () => {
      const res = await req
        .post("/api/users")
        .set("Content-type", "application/json")
        .set("Authorization", `Bearer ${token}`)
        .send({
          first_name: "newU1ser1",
          last_name: "User121",
          password: "newUsertes1t@123",
          email: "newU1ser1test@gmail.com",
        });
      expect(res.statusCode).toBe(200);
      const { id, first_name, last_name, email } = res.body.data;
      expect(email).toBe("newU1ser1test@gmail.com");
      expect(first_name).toBe("newU1ser1");
      expect(last_name).toBe("User121");
    });
    it("should delete user", async () => {
      const res = await req
        .delete("/api/users/1000")
        .set("Content-type", "application/json")
        .set("Authorization", `Bearer ${token}`);
      expect(res.statusCode).toBe(200);
    });
    it("should update user", async () => {
      const res = await req
        .patch("/api/users/5")
        .set("Content-type", "application/json")
        .set("Authorization", `Bearer ${token}`)
        .send({
          id: 100,
          email: "test-updated@gmail.com",
          first_name: "test-updated",
          last_name: "test-updated",
          password: "test123-updated",
        });

      expect(res.status).toEqual(200);
      expect(res.body.message).toEqual("User Updated!");
    });
    it("should get user byid", async () => {
      const res = await req
        .get("/api/users/1")
        .set("Content-type", "application/json")
        .set("Authorization", `Bearer ${token}`);
      expect(res.status).toBe(200);
    });
    it("should get list of users", async () => {
      const res = await req
        .get("/api/users")
        .set("Content-type", "application/json")
        .set("Authorization", `Bearer ${token}`);
      expect(res.statusCode).toBe(200);
    });
  });
});
