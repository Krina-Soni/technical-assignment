import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class LoginPage extends BasePage {
  readonly loginHeading: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly signInButton: Locator;

  constructor(page: Page) {
    super(page);
    this.loginHeading = page.getByRole("heading", { name: "Login" });
    this.emailInput = page.getByPlaceholder("Email");
    this.passwordInput = page.getByPlaceholder("Password");
    this.signInButton = page.getByRole("button", { name: "Sign In" });
  }

  async navigateToLogin() {
    await this.navigate("/login");
  }

  async navigateToPath(path: string) {
    await this.navigate(path);
  }

  async fillCredentials(email: string, pass: string) {
    await expect(this.loginHeading).toBeVisible();
    await this.emailInput.fill(email);
    await this.passwordInput.fill(pass);
  }

  async clickSignIn() {
    await this.signInButton.click();
  }

  async getLocalStorageItem(key: string): Promise<string | null> {
    return await this.page.evaluate((k) => window.localStorage.getItem(k), key);
  }

  async getStoredUserRole(): Promise<string | null> {
    return await this.page.evaluate(() => {
      const userData = window.localStorage.getItem("user");
      if (!userData) return null;
      try {
        return JSON.parse(userData).role;
      } catch {
        return null;
      }
    });
  }

  async isAuthenticated(): Promise<boolean> {
    const token = await this.getLocalStorageItem("token");
    return token !== null && token.length > 0;
  }
}
