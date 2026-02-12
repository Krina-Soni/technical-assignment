import { Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { ProductsPage } from "../pages";

Then("I should see the products catalog page", async function () {
  const productsPage = new ProductsPage(this.page);
  await expect(productsPage.catalogHeading).toBeVisible();
  const count = await productsPage.getProductCount();
  expect(count).toBeGreaterThan(0);
});
