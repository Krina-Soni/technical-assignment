import { When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { ProductsPage } from "../pages";

When("I search for {string}", async function (query: string) {
  const productsPage = new ProductsPage(this.page);
  await productsPage.search(query);
});

Then(
  "I should see only products containing {string}",
  async function (query: string) {
    const productsPage = new ProductsPage(this.page);
    const names = await productsPage.getAllProductNames();

    for (const name of names) {
      if (!name.toLowerCase().includes(query.toLowerCase())) {
        throw new Error(
          `Search failed to filter results. Found "${name}" when searching for "${query}"`,
        );
      }
    }
  },
);

Then("I should see {string} message", async function (message: string) {
  await expect(this.page.getByText(message)).toBeVisible();
});

Then(
  "the product count should be {int}",
  async function (expectedCount: number) {
    const productsPage = new ProductsPage(this.page);
    const actualCount = await productsPage.productCards.count();
    expect(actualCount).toBe(expectedCount);
  },
);
