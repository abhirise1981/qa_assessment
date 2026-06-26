import { Page, expect } from '@playwright/test';

export class PartPage {
  private page: Page;
  
  // Locators
  private createPartButton = '#btn-part-create, button:has-text("Create Part")';
  private partNameInput = '#id_name';
  private partIPNInput = '#id_IPN';
  private partDescInput = '#id_description';
  private activeCheckbox = '#id_active';
  private assemblyCheckbox = '#id_assembly';
  private componentCheckbox = '#id_component';
  private testableCheckbox = '#id_testable';
  private saveButton = '#btn-modal-save, button[type="submit"]:has-text("Save")';
  private editPartButton = '#btn-part-edit, button:has-text("Edit Part")';
  
  // Parameters
  private parametersTab = 'a[href="#parameters"], #parameters-tab';
  private addParameterButton = '#btn-parameter-create, button:has-text("Add Parameter")';
  private parameterTemplateSelect = '#id_template';
  private parameterDataInput = '#id_data';
  private parameterTable = 'table#parameter-table';
  
  // Stock
  private stockTab = 'a[href="#stock"], #stock-tab';
  private addStockButton = '#btn-stock-create, button:has-text("Add Stock Item")';
  private stockQuantityInput = '#id_quantity';
  private stockLocationSelect = '#id_location';

  constructor(page: Page) {
    this.page = page;
  }

  async createPart(name: string, ipn: string, description: string, options: { assembly?: boolean; testable?: boolean } = {}) {
    await this.page.click(this.createPartButton);
    await this.page.fill(this.partNameInput, name);
    await this.page.fill(this.partIPNInput, ipn);
    await this.page.fill(this.partDescInput, description);
    
    await this.page.check(this.activeCheckbox);
    if (options.assembly) await this.page.check(this.assemblyCheckbox);
    if (options.testable) await this.page.check(this.testableCheckbox);
    
    await this.page.click(this.saveButton);
    await this.page.waitForURL(/\/part\/\d+/);
  }

  async navigateToFirstPart() {
    await this.page.goto('/part/');
    await this.page.locator('table#part-table tbody tr').first().locator('a').first().click();
  }

  async editPartAssemblyAndComponent(assembly: boolean, component: boolean) {
    await this.page.click(this.editPartButton);
    
    if (assembly) {
      await this.page.check(this.assemblyCheckbox);
    } else {
      await this.page.uncheck(this.assemblyCheckbox);
    }

    if (component) {
      await this.page.check(this.componentCheckbox);
    } else {
      await this.page.uncheck(this.componentCheckbox);
    }

    await this.page.click(this.saveButton);
    await this.page.waitForSelector('.alert-success, div:has-text("Part updated")').catch(() => {});
  }

  async addParameter(templateIndex: number, value: string) {
    await this.page.click(this.parametersTab);
    await this.page.click(this.addParameterButton);
    await this.page.selectOption(this.parameterTemplateSelect, { index: templateIndex });
    await this.page.fill(this.parameterDataInput, value);
    await this.page.click(this.saveButton);
  }

  async addStockItem(quantity: string, locationIndex: number) {
    await this.page.click(this.stockTab);
    await this.page.click(this.addStockButton);
    await this.page.fill(this.stockQuantityInput, quantity);
    await this.page.selectOption(this.stockLocationSelect, { index: locationIndex });
    await this.page.click(this.saveButton);
    await this.page.waitForSelector('.alert-success, div:has-text("Stock item created")').catch(() => {});
  }

  async verifyPartTitleAndIPN(name: string, ipn: string) {
    await expect(this.page.locator('h2')).toContainText(name);
    await expect(this.page.locator('.part-info')).toContainText(ipn);
  }

  async verifyBOMTabVisible(visible: boolean) {
    const bomTab = this.page.locator('#part-bom-tab, a[href="#bom"]');
    if (visible) {
      await expect(bomTab).toBeVisible();
    } else {
      await expect(bomTab).not.toBeVisible();
    }
  }

  async verifyParameterValue(value: string) {
    await expect(this.page.locator(this.parameterTable)).toContainText(value);
  }
}
