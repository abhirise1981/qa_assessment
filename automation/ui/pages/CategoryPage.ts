import { Page, expect } from '@playwright/test';

export class CategoryPage {
  private page: Page;
  private createCategoryButton = '#btn-category-create, button:has-text("Create Category")';
  private categoryNameInput = '#id_name';
  private categoryDescInput = '#id_description';
  private saveButton = '#btn-modal-save, button[type="submit"]:has-text("Save")';

  constructor(page: Page) {
    this.page = page;
  }

  async navigateToList() {
    await this.page.goto('/part/');
    await expect(this.page).toHaveTitle(/Parts/);
  }

  async createCategory(name: string, description: string) {
    await this.page.click(this.createCategoryButton);
    await this.page.fill(this.categoryNameInput, name);
    await this.page.fill(this.categoryDescInput, description);
    await this.page.click(this.saveButton);

    // Wait for success alert/modal closure
    await this.page.waitForSelector('.alert-success, div:has-text("Category created")').catch(() => {});
  }

  async selectCategory(name: string) {
    await this.page.goto('/part/category/');
    await this.page.click(`a:has-text("${name}")`);
  }
}
