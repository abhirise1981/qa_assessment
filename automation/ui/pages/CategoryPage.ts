import { Page, Locator, expect } from '@playwright/test';

export class CategoryPage {
  private page: Page;
  private createCategoryButton: Locator;
  private categoryNameInput: Locator;
  private categoryDescInput: Locator;
  private saveButton: Locator;

  constructor(page: Page) {
    this.page = page;
    // Uses fallback OR dynamic text matching to prevent locator fragility
    this.createCategoryButton = page.locator('#btn-category-create').or(page.getByRole('button', { name: 'Create Category' }));
    this.categoryNameInput = page.locator('#id_name');
    this.categoryDescInput = page.locator('#id_description');
    this.saveButton = page.locator('#btn-modal-save').or(page.getByRole('button', { name: 'Save', exact: true }));
  }

  async navigateToList() {
    await this.page.goto('/part/');
    await expect(this.page).toHaveTitle(/Parts/);
  }

  async createCategory(name: string, description: string) {
    await this.createCategoryButton.click();
    await this.categoryNameInput.fill(name);
    await this.categoryDescInput.fill(description);
    await this.saveButton.click();

    // Wait for success alert/modal closure
    await this.page.waitForSelector('.alert-success, div:has-text("Category created")').catch(() => {});
  }

  async selectCategory(name: string) {
    await this.page.goto('/part/category/');
    await this.page.locator(`a:has-text("${name}")`).click();
  }
}
