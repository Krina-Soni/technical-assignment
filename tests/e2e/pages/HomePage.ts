import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class HomePage extends BasePage {
  readonly brandLogo: Locator;
  readonly productsLink: Locator;
  readonly cartLink: Locator;
  readonly cartBadge: Locator;
  readonly loginLink: Locator;
  readonly adminLink: Locator;

  readonly featuredCategoriesHeading: Locator;
  readonly electronicsHeading: Locator;
  readonly electronicsButton: Locator;
  readonly clothingHeading: Locator;
  readonly clothingButton: Locator;
  readonly homeHeading: Locator;
  readonly homeButton: Locator;

  readonly ctaHeading: Locator;
  readonly viewAllProductsButton: Locator;

  constructor(page: Page) {
    super(page);

    this.brandLogo = page.getByRole("link", { name: "QA E-Shop" });
    this.productsLink = page.getByRole("link", { name: "Products", exact: true });
    this.cartLink = page.locator('nav a[href="/cart"]');
    this.loginLink = page.locator('nav a[href="/login"]')
    this.featuredCategoriesHeading = page.getByRole("heading", { name: "Featured Categories" });
    this.electronicsHeading = page.getByRole("heading", { name: "Electronics" });
    this.electronicsButton = page.getByRole("button", { name: "Browse Electronics" });
    this.clothingHeading = page.getByRole("heading", { name: "Clothing" });
    this.clothingButton = page.getByRole("button", { name: "Browse Clothing" });
    this.homeHeading = page.getByRole("heading", { name: "Home" });
    this.homeButton = page.getByRole("button", { name: "Browse Home" });

    this.ctaHeading = page.getByRole("heading", { name: "Ready to shop?" });
    this.viewAllProductsButton = page.getByRole("button", { name: "View All Products" });
  }

  async open(): Promise<void> {
    await this.navigate("/");
  }
}
