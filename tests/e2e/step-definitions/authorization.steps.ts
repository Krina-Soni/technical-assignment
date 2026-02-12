import { Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { AdminPage } from "../pages";


Then("I should be allowed to see the {string}", async function (headingText) {
  const adminPage = new AdminPage(this.page);
  await expect(adminPage.dashboardHeading).toBeVisible();
  await expect(adminPage.dashboardHeading).toHaveText(headingText);
});

Then("I should NOT see the {string}", async function (headingText) {
  const adminPage = new AdminPage(this.page);
  await expect(adminPage.dashboardHeading).not.toBeVisible();
});