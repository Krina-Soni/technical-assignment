import { Then, When } from "@cucumber/cucumber";
import { CartPage, CheckoutPage } from "../pages";
import { TEST_DATA } from "../utils/testData";
import { expect } from "@playwright/test";

When("I click the checkout button", async function () {
  const cartPage = new CartPage(this.page);
  await cartPage.clickCheckout();
});

When("I fill the shipping and payment details", async function () {
  const checkoutPage = new CheckoutPage(this.page);
  await checkoutPage.fillShippingDetails(TEST_DATA.checkout);
});

When("I click the pay now button", async function () {
  const checkoutPage = new CheckoutPage(this.page);
  this.page.once(
    "dialog",
    async (dialog: { message: () => any; accept: () => any }) => {
      this.lastAlertMessage = dialog.message();
      await dialog.accept();
    },
  );

  await checkoutPage.clickPayNow();
});

When(
  "I fill the shipping details with invalid data:",
  async function (dataTable) {
    const checkoutPage = new CheckoutPage(this.page);
    const data = dataTable.rowsHash();

    await checkoutPage.fullNameInput.fill(data.name);
    await checkoutPage.addressInput.fill(data.addr);
    await checkoutPage.cardInput.fill(data.card);
  },
);

Then(
  "I should see a validation error {string} for {string}",
  async function (expectedError, fieldName) {
    const checkoutPage = new CheckoutPage(this.page);
    const actualError = await checkoutPage.getErrorMessage(fieldName);
    expect(actualError).toContain(expectedError);
  },
);
