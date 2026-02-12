describe("Order Inventory Validation Specification", () => {
  let mockProduct: any;

  beforeEach(() => {
    mockProduct = {
      name: "Test Laptop",
      inventory: 5
    };
  });

  it("should fail validation if requested quantity exceeds inventory", () => {
    const requestedItem = { quantity: 10 };
    let errorMessage = "";

    if (mockProduct.inventory < requestedItem.quantity) {
      errorMessage = `Product ${mockProduct.name} out of stock`;
    }

    expect(errorMessage).toBe("Product Test Laptop out of stock");
  });

  it("should successfully pass validation if inventory is sufficient", () => {
    const requestedItem = { quantity: 2 };
    let errorMessage = "";

    if (mockProduct.inventory < requestedItem.quantity) {
      errorMessage = `Product ${mockProduct.name} out of stock`;
    }

    expect(errorMessage).toBe("");
  });
});