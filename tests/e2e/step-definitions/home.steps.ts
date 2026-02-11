import { Given, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { HomePage } from "../pages";

Given("I open the homepage", async function () {
  const homePage = new HomePage(this.page);
  await homePage.open();
});

Then("I should see the header links", async function () {
  const homePage = new HomePage(this.page);
  await expect(homePage.brandLogo).toHaveAttribute("href", "/");
  await expect(homePage.productsLink).toHaveAttribute("href", "/products");
  await expect(homePage.cartLink).toHaveAttribute("href", "/cart");
  await expect(homePage.loginLink).toHaveAttribute("href", "/login");
});

Then("I should see featured categories", async function () {
  const homePage = new HomePage(this.page);
  await expect(homePage.featuredCategoriesHeading).toBeVisible();
  await expect(homePage.electronicsHeading).toBeVisible();
await expect(homePage.electronicsButton).toHaveText(/Browse Electronics/);
  await expect(homePage.clothingHeading).toBeVisible();
  await expect(homePage.clothingButton).toHaveText(/Browse Clothing/);
  await expect(homePage.homeHeading).toBeVisible();
  await expect(homePage.homeButton).toHaveText(/Browse Home/)
});

Then("I should see the call to action", async function () {
  const homePage = new HomePage(this.page);
  await expect(homePage.ctaHeading).toBeVisible();
  await expect(homePage.viewAllProductsButton).toBeVisible()
});
