import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class ProductsPage extends BasePage {
  readonly catalogHeading: Locator;
  readonly searchInput: Locator;
  readonly productCards: Locator;

  constructor(page: Page) {
    super(page);
    this.catalogHeading = page.getByRole("heading", { name: "Catalog" });
    this.searchInput = page.getByPlaceholder("Search products...");
    this.productCards = page.locator(".rounded-lg.border.bg-card");
  }

  async getProductCount(): Promise<number> {
    return await this.productCards.count();
  }
}