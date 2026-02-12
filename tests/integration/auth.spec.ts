import request from "supertest";

const API_URL = "http://localhost:3001";

describe("Auth Integration: Login & Token Validation", () => {
  it("should return a 200 and a JWT when valid admin credentials are used", async () => {
    const res = await request(API_URL)
      .post("/api/v1/auth/login")
      .send({
        email: "admin@test.com", 
        password: "admin123"
      });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("token");
  });

  it("should return 401 for invalid credentials", async () => {
    const res = await request(API_URL)
      .post("/api/v1/auth/login")
      .send({
        email: "admin@test.com",
        password: "admin12345"
      });

    expect(res.status).toBe(401);
    expect(res.body.message).toBe("Invalid email or password");
  });
});