import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class CheckoutPage extends BasePage {
  readonly fullNameInput: Locator;
  readonly addressInput: Locator;
  readonly cityInput: Locator;
  readonly zipInput: Locator;
  readonly cardInput: Locator;
  readonly payNowButton: Locator;

  constructor(page: Page) {
    super(page);
    this.fullNameInput = page.locator('input[name="name"]');
    this.addressInput = page.locator('input[name="address"]');
    this.cityInput = page.locator('input[name="city"]');
    this.zipInput = page.locator('input[name="zip"]');
    this.cardInput = page.locator('input[name="card"]');
    this.payNowButton = page.getByRole("button", { name: "Pay Now" });
  }

  async fillShippingDetails(details: {
    name: string;
    address: string;
    city: string;
    zip: string;
    card: string;
  }) {
    await this.fullNameInput.fill(details.name);
    await this.addressInput.fill(details.address);
    await this.cityInput.fill(details.city);
    await this.zipInput.fill(details.zip);
    await this.cardInput.fill(details.card);
  }

  async clickPayNow() {
    await this.payNowButton.click();
  }

  async getErrorMessage(fieldName: string): Promise<string | null> {
    const errorLocator = this.page.locator(
      `input[name="${fieldName}"] + p.text-red-500`,
    );
    return await errorLocator.textContent();
  }
}
