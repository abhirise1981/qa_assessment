import { Page, Locator } from '@playwright/test';

export class LoginPage {
  private page: Page;
  private usernameInput: Locator;
  private passwordInput: Locator;
  private submitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('#id_username');
    this.passwordInput = page.locator('#id_password');
    this.submitButton = page.locator('button[type="submit"], #submit-id-login');
  }

  async navigate() {
    await this.page.goto('/accounts/login/');
  }

  async login() {
    const user = process.env.INVENTREE_USER || 'admin';
    const pass = process.env.INVENTREE_PASSWORD || 'admin12345';

    await this.usernameInput.fill(user);
    await this.passwordInput.fill(pass);
    await this.submitButton.click();

    // Wait for redirect to dashboard
    await this.page.waitForURL(/\/|dashboard/);
  }
}
