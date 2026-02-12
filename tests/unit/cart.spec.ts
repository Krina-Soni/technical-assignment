describe("Cart Logic Specification", () => {
  let mockCart: any;

  beforeEach(() => {
    mockCart = {
      userId: "user123",
      items: [
        { productId: "prod_001", quantity: 2 }
      ],
      save: jest.fn().mockResolvedValue(true)
    };
  });

  it("should increment quantity if the product already exists in the cart", async () => {
    const newProductId = "prod_001";
    const additionalQuantity = 3;

    const itemIndex = mockCart.items.findIndex(
      (i: any) => i.productId === newProductId
    );

    if (itemIndex > -1) {
      mockCart.items[itemIndex].quantity += additionalQuantity;
    }

    expect(mockCart.items[0].quantity).toBe(5);
  });

  it("should add a new item if the product does not exist in the cart", async () => {
    const newProductId = "prod_002";
    const quantity = 1;

    const itemIndex = mockCart.items.findIndex(
      (i: any) => i.productId === newProductId
    );

    if (itemIndex === -1) {
      mockCart.items.push({ productId: newProductId, quantity });
    }

    expect(mockCart.items.length).toBe(2);
    expect(mockCart.items[1].productId).toBe("prod_002");
  });
});