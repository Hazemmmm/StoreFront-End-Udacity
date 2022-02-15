import supertest from "supertest";
import app from "../server";

const req = supertest(app);

describe("Test Running Server", () => {
  it("should return Server is Running", async () => {
    const res = await req.get("/");
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe("Hello World!");
  });
});
