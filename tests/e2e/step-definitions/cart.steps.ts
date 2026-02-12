import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { HomePage, ProductsPage, CartPage } from "../pages";

Given("I click on the products link", async function () {
  const homePage = new HomePage(this.page);
  await homePage.productsLink.click();
});

When("I view details for {string}", async function (productName) {
  const productsPage = new ProductsPage(this.page);
  await productsPage.navigateToDetails(productName);
});

When("I view details for an out-of-stock product", async function () {
  const productsPage = new ProductsPage(this.page);
  const outOfStockCard = productsPage.productCards
    .filter({ hasText: "Stock: 0" })
    .first();
  await outOfStockCard.getByRole("button", { name: "View Details" }).click();
});

When("I add the item to the cart", async function () {
  const cartPage = new CartPage(this.page);
  await cartPage.addToCartButton.click({ force: true });
});

Then("the cart badge should show {string}", async function (expectedCount) {
  const cartPage = new CartPage(this.page);
  const actualCount = await cartPage.getCartCount();
  expect(actualCount).toBe(expectedCount);
});

Then("the Add to Cart button should be disabled", async function () {
  const cartPage = new CartPage(this.page);
  await expect(cartPage.addToCartButton).toBeDisabled();
});

When("I navigate to the cart page", async function () {
  const cartPage = new CartPage(this.page);
  await cartPage.navigateToCart();
});

Then("the cart badge count should be {int}", async function (expectedCount) {
  const cartPage = new CartPage(this.page);
  const actualCount = await cartPage.getCartBadgeCount();
  expect(actualCount).toBe(expectedCount);
});

When(
  "I view details for a product with {string}",
  async function (stockStatus: string) {
    const productsPage = new ProductsPage(this.page);
    const card = productsPage.productCards
      .filter({ hasText: stockStatus })
      .first();
    await card.getByRole("button", { name: "View Details" }).click();
  },
);

Then(
  "the product quantity in cart should be {int}",
  async function (expectedQty: number) {
    const cartPage = new CartPage(this.page);
    const actualQty = await cartPage.getProductQuantityInCart();
    expect(actualQty).toBe(expectedQty);
  },
);

When("I add the item to the cart {int} times", async function (times: number) {
  const cartPage = new CartPage(this.page);

  for (let i = 0; i < times; i++) {
    this.page.once("dialog", async (dialog) => {
      await dialog.accept();
    });

    await cartPage.clickAddToCart();
  }
});

Then(
  "the cart badge count should stay {int}",
  async function (expectedCount: number) {
    const cartPage = new CartPage(this.page);
    const actualCount = await cartPage.getCartBadgeCount();
    expect(actualCount).toBe(expectedCount);
  },
);

When(
  "I attempt to add the item again but expect {string}",
  async function (expectedMessage: string) {
    const cartPage = new CartPage(this.page);
    this.page.once("dialog", async (dialog) => {
      this.lastAlertMessage = dialog.message();
      await dialog.accept();
    });
    await cartPage.clickAddToCart();
    expect(this.lastAlertMessage).toContain(expectedMessage);
  },
);
