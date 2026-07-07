import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class PartPage extends BasePage {
  // Locators
  private createPartButton: Locator;
  private partNameInput: Locator;
  private partIPNInput: Locator;
  private partDescInput: Locator;
  private activeCheckbox: Locator;
  private assemblyCheckbox: Locator;
  private componentCheckbox: Locator;
  private testableCheckbox: Locator;
  private saveButton: Locator;
  private editPartButton: Locator;
  
  // Parameters
  private parametersTab: Locator;
  private addParameterButton: Locator;
  private parameterTemplateSelect: Locator;
  private parameterDataInput: Locator;
  private parameterTable: Locator;
  
  // Stock
  private stockTab: Locator;
  private addStockButton: Locator;
  private stockQuantityInput: Locator;
  private stockLocationSelect: Locator;

  constructor(page: Page) {
    super(page);
    
    this.createPartButton = page.locator('#btn-part-create').or(page.getByRole('button', { name: 'Create Part' }));
    this.partNameInput = page.locator('#id_name');
    this.partIPNInput = page.locator('#id_IPN');
    this.partDescInput = page.locator('#id_description');
    this.activeCheckbox = page.locator('#id_active');
    this.assemblyCheckbox = page.locator('#id_assembly');
    this.componentCheckbox = page.locator('#id_component');
    this.testableCheckbox = page.locator('#id_testable');
    this.saveButton = page.locator('#btn-modal-save').or(page.getByRole('button', { name: 'Save', exact: true }));
    this.editPartButton = page.locator('#btn-part-edit').or(page.getByRole('button', { name: 'Edit Part' }));
    
    // Sub-modules & Tabs
    this.parametersTab = page.locator('a[href="#parameters"], #parameters-tab');
    this.addParameterButton = page.locator('#btn-parameter-create').or(page.getByRole('button', { name: 'Add Parameter' }));
    this.parameterTemplateSelect = page.locator('#id_template');
    this.parameterDataInput = page.locator('#id_data');
    this.parameterTable = page.locator('table#parameter-table');
    
    this.stockTab = page.locator('a[href="#stock"], #stock-tab');
    this.addStockButton = page.locator('#btn-stock-create').or(page.getByRole('button', { name: 'Add Stock Item' }));
    this.stockQuantityInput = page.locator('#id_quantity');
    this.stockLocationSelect = page.locator('#id_location');
  }

  async createPart(name: string, ipn: string, description: string, options: { assembly?: boolean; testable?: boolean } = {}) {
    await this.waitForDOMStability(this.createPartButton);
    await this.createPartButton.click();

    await this.waitForDOMStability(this.partNameInput);
    await this.partNameInput.fill(name);
    await this.partIPNInput.fill(ipn);
    await this.partDescInput.fill(description);
    
    await this.activeCheckbox.check();
    if (options.assembly) await this.assemblyCheckbox.check();
    if (options.testable) await this.testableCheckbox.check();
    
    await this.saveButton.click();
    await this.page.waitForURL(/\/part\/\d+/);
  }

  async navigateToFirstPart() {
    await this.page.goto('/part/');
    await this.page.locator('table#part-table tbody tr').first().locator('a').first().click();
  }

  async editPartAssemblyAndComponent(assembly: boolean, component: boolean) {
    await this.waitForDOMStability(this.editPartButton);
    await this.editPartButton.click();
    
    await this.waitForDOMStability(this.assemblyCheckbox);
    if (assembly) {
      await this.assemblyCheckbox.check();
    } else {
      await this.assemblyCheckbox.uncheck();
    }

    if (component) {
      await this.componentCheckbox.check();
    } else {
      await this.componentCheckbox.uncheck();
    }

    await this.saveButton.click();
    await this.page.waitForSelector('.alert-success, div:has-text("Part updated")').catch(() => {});
  }

  async addParameter(templateIndex: number, value: string) {
    await this.parametersTab.click();
    await this.waitForDOMStability(this.addParameterButton);
    await this.addParameterButton.click();
    await this.parameterTemplateSelect.selectOption({ index: templateIndex });
    await this.parameterDataInput.fill(value);
    await this.saveButton.click();
  }

  async addStockItem(quantity: string, locationIndex: number) {
    await this.stockTab.click();
    await this.waitForDOMStability(this.addStockButton);
    await this.addStockButton.click();
    await this.stockQuantityInput.fill(quantity);
    await this.stockLocationSelect.selectOption({ index: locationIndex });
    await this.saveButton.click();
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
    await expect(this.parameterTable).toContainText(value);
  }
}
