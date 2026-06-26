import { Page, expect } from '@playwright/test';

export class LoginPage {
  private page: Page;
  private usernameInput = '#id_username';
  private passwordInput = '#id_password';
  private submitButton = 'button[type="submit"], #submit-id-login';

  constructor(page: Page) {
    this.page = page;
  }

  async navigate() {
    await this.page.goto('/accounts/login/');
  }

  async login() {
    const user = process.env.INVENTREE_USER || 'admin';
    const pass = process.env.INVENTREE_PASSWORD || 'admin12345';

    await this.page.fill(this.usernameInput, user);
    await this.page.fill(this.passwordInput, pass);
    await this.page.click(this.submitButton);

    // Wait for redirect to dashboard
    await this.page.waitForURL(/\/|dashboard/);
  }
}
