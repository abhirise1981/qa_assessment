import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CategoryPage extends BasePage {
  private createCategoryButton: Locator;
  private categoryNameInput: Locator;
  private categoryDescInput: Locator;
  private saveButton: Locator;

  constructor(page: Page) {
    super(page);
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
    // Wait for the button to settle visually before clicking (avoids click hijacking during render)
    await this.waitForDOMStability(this.createCategoryButton);
    await this.createCategoryButton.click();
    
    // Explicit wait for form input field to settle
    await this.waitForDOMStability(this.categoryNameInput);
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
