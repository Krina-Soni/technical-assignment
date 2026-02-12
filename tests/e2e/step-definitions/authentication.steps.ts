import { Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { LoginPage, HomePage } from "../pages";

Then("I should see a valid token in local storage", async function () {
  const loginPage = new LoginPage(this.page);
  const token = await loginPage.getLocalStorageItem("token");
  expect(token).not.toBeNull();
  expect(token?.length).toBeGreaterThan(0);
});

Then("the stored user role should be {string}", async function (expectedRole) {
  const loginPage = new LoginPage(this.page);
  const actualRole = await loginPage.getStoredUserRole();
  expect(actualRole).toBe(expectedRole);
});

Then("the header should NOT display Login", async function () {
  const homePage = new HomePage(this.page);
  await expect(homePage.loginLink).not.toBeVisible();
});

Then(
  "I should see an alert with message {string}",
  async function (expectedMessage) {
    const dialogPromise = this.page.waitForEvent("dialog", { timeout: 5000 });
    const dialog = await dialogPromise;
    expect(dialog.message()).toContain(expectedMessage);
    await dialog.dismiss();
  },
);

Then("I should not be authenticated", async function () {
  const loginPage = new LoginPage(this.page);
  const isAuth = await loginPage.isAuthenticated();
  expect(isAuth).toBeFalsy();
});
