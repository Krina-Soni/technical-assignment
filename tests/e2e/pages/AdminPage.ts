import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class AdminPage extends BasePage {
  readonly dashboardHeading: Locator;

  constructor(page: Page) {
    super(page);
    this.dashboardHeading = page.getByRole("heading", {
      name: "Admin Dashboard",
    });
  }
}
