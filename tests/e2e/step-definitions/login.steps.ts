import { Given, When } from "@cucumber/cucumber";
import { LoginPage } from "../pages";
import { TEST_DATA } from "../utils/testData";


Given("I am on the login page", async function () {
  const loginPage = new LoginPage(this.page);
  await loginPage.navigateToLogin();
});

When("I enter valid admin credentials", async function () {
  const loginPage = new LoginPage(this.page);
  await loginPage.fillCredentials(TEST_DATA.admin.email, TEST_DATA.admin.password);
});

When("I enter valid user credentials", async function () {
  const loginPage = new LoginPage(this.page);
  await loginPage.fillCredentials(TEST_DATA.user.email, TEST_DATA.user.password);
});

When("I enter invalid credentials", async function () {
  const loginPage = new LoginPage(this.page);
  await loginPage.fillCredentials(TEST_DATA.invalidUser.email, TEST_DATA.invalidUser.password);
});


When("I click the Sign In button", async function () {
  const loginPage = new LoginPage(this.page);
  await loginPage.clickSignIn();
});

Given("I am not logged in", async function () {
  await this.page.context().clearCookies();
  await this.page.evaluate(() => window.localStorage.clear());
});

When("I navigate directly to {string}", async function (path) {
  const loginPage = new LoginPage(this.page);
  await loginPage.navigateToPath(path);
});
