import User from "../../server/models/User";
import bcrypt from "bcryptjs";

jest.mock("bcryptjs");

describe("User Model Specification", () => {
  it("should default the user role to 'customer'", () => {
    const user = new User({
      name: "Krina Soni",
      email: "Krinasoni@test.com",
      password: "test1234"
    });

    expect(user.role).toBe("customer");
  });
});