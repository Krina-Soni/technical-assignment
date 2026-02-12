import request from "supertest";
import mongoose from "mongoose";
import User from "../../server/models/User";

const API_URL = "http://localhost:3001";

describe("RBAC Security: Privilege Escalation Check", () => {
  let customerToken: string;
  let customerId: string;

  beforeAll(async () => {
    await mongoose.connect(process.env.DATABASE_URL || "mongodb://localhost:27017/qa-test-app");

    const res = await request(API_URL).post("/api/v1/auth/login").send({
      email: "user@test.com",
      password: "user123",
    });
    customerToken = res.body.token;

    const user = await User.findOne({ email: "user@test.com" });
    customerId = user?._id.toString() || "";
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("should block a customer from upgrading their own role to admin", async () => {
    const res = await request(API_URL)
      .put(`/api/v1/users/${customerId}`)
      .set("Authorization", `Bearer ${customerToken}`)
      .send({
        role: "admin"
      });

    const updatedUser = await User.findById(customerId);
    expect(updatedUser?.role).not.toBe("admin");
    expect(updatedUser?.role).toBe("customer");
  });
});