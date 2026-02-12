import request from "supertest";
import mongoose from "mongoose";
import Product from "../../server/models/Product";

const API_URL = "http://localhost:3001";

describe("API + DB Validation: Product Integrity", () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.DATABASE_URL || "mongodb://localhost:27017/qa-test-app");
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("should verify that API search results match Database entries", async () => {
    const dbProduct = await Product.findOne({ category: "Electronics" });
    const res = await request(API_URL).get(`/api/v1/products?search=${dbProduct?.name}`);
    expect(res.status).toBe(200);
    expect(res.body[0]._id.toString()).toBe(dbProduct?._id.toString());
    expect(res.body[0].price).toBe(dbProduct?.price);
  });
});