import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class ProductsPage extends BasePage {
  readonly catalogHeading: Locator;
  readonly searchInput: Locator;
  readonly productCards: Locator;
  readonly productHeadings: Locator;

  constructor(page: Page) {
    super(page);
    this.catalogHeading = page.getByRole("heading", { name: "Catalog" });
    this.searchInput = page.getByPlaceholder("Search products...");
    this.productCards = page.locator(".rounded-lg.border.bg-card");
    this.productHeadings = this.productCards.locator("h3");
  }

  async getProductCount(): Promise<number> {
    return await this.productCards.count();
  }

  async navigateToDetails(productName: string) {
    const card = this.productCards.filter({ hasText: productName }).first();
    await card.getByRole("button", { name: "View Details" }).click();
  }

  async search(query: string) {
    await this.searchInput.fill(query);
    await this.page.keyboard.press("Enter");
  }

  async getAllProductNames(): Promise<string[]> {
    return await this.productHeadings.allTextContents();
  }
}
