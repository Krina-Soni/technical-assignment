import { admin } from "../../server/middleware/auth";

describe("Admin Middleware Specification", () => {
  let mockRequest: any;
  let mockResponse: any;
  let nextFunction: jest.Mock;

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    nextFunction = jest.fn();
  });

  it("should allow access if user role is admin", () => {
    mockRequest.user = { role: "admin" };
    admin(mockRequest, mockResponse, nextFunction);
    expect(nextFunction).toHaveBeenCalled();
  });

  it("should deny access with 403 if user is a customer", () => {
    mockRequest.user = { role: "customer" };
    admin(mockRequest, mockResponse, nextFunction);
    expect(mockResponse.status).toHaveBeenCalledWith(403);
    expect(mockResponse.json).toHaveBeenCalledWith({ message: "Not authorized as admin" });
  });

  it("should deny access if req.user is missing", () => {
    mockRequest.user = undefined;
    admin(mockRequest, mockResponse, nextFunction);
    expect(mockResponse.status).toHaveBeenCalledWith(403);
  });
});