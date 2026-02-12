import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class CartPage extends BasePage {
  readonly addToCartButton: Locator;
  readonly quantityInput: Locator;
  readonly cartBadge: Locator;
  readonly cartItemQuantity: Locator;
  readonly stockLabel: Locator;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    super(page);
    this.addToCartButton = page.getByRole("button", { name: "Add to Cart" });
    this.quantityInput = page.locator('input[type="number"]');
    this.cartBadge = page.locator('a[href="/cart"] span');
    this.cartItemQuantity = page.locator("p.text-sm.text-muted-foreground");
    this.stockLabel = page.locator('p:has-text("Stock:")');
    this.checkoutButton = page.getByRole("button", { name: "Checkout" });
  }

  async getCartCount(): Promise<string> {
    return (await this.cartBadge.textContent()) || "0";
  }

  async clickAddToCart() {
    await this.addToCartButton.click();
  }

  async getCartBadgeCount(): Promise<number> {
    const isVisible = await this.cartBadge.isVisible();
    if (!isVisible) return 0;
    const text = await this.cartBadge.textContent();
    return text ? parseInt(text) : 0;
  }

  async getProductQuantityInCart(): Promise<number> {
    const text = await this.cartItemQuantity.first().textContent();
    const match = text?.match(/x\s*(\d+)/);
    return match ? parseInt(match[1]) : 0;
  }

  async navigateToCart() {
    await this.page.locator('a[href="/cart"]').click();
  }

  async clickCheckout() {
    await this.checkoutButton.click();
  }
}
