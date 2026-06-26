import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { CategoryPage } from '../pages/CategoryPage';
import { PartPage } from '../pages/PartPage';

test.describe('InvenTree Parts UI Automation Suite (Page Object Model)', () => {
  let loginPage: LoginPage;
  let categoryPage: CategoryPage;
  let partPage: PartPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    categoryPage = new CategoryPage(page);
    partPage = new PartPage(page);

    await loginPage.navigate();
    await loginPage.login();
  });

  test('TC-UI-CRUD-01: Category and Part Creation & Verification', async ({ page }) => {
    const categoryName = `Category_UI_${Date.now()}`;
    const partName = `Part_UI_${Date.now()}`;
    const partIPN = `IPN-UI-${Date.now()}`;

    // 1. Navigate and Create Category
    await categoryPage.navigateToList();
    await categoryPage.createCategory(categoryName, 'Category created by Playwright UI automation test');

    // 2. Select the Category
    await categoryPage.selectCategory(categoryName);

    // 3. Create a Part in the Category
    await partPage.createPart(
      partName,
      partIPN,
      'Part created by Playwright UI automation test',
      { assembly: true }
    );

    // 4. Verify Part Title & IPN
    await partPage.verifyPartTitleAndIPN(partName, partIPN);
  });

  test('TC-UI-CRUD-02: Edit Part Attributes & Verify Tab Visibility', async ({ page }) => {
    // 1. Navigate to a part detail page
    await partPage.navigateToFirstPart();

    // 2. Edit attributes: toggle assembly off (should hide BOM) and component on
    await partPage.editPartAssemblyAndComponent(false, true);

    // 3. Verify BOM tab is hidden
    await partPage.verifyBOMTabVisible(false);
  });

  test('TC-UI-FLOW-03: Cross-Functional Flow - Create Category -> Add Part -> Add Parameter -> Create Stock', async ({ page }) => {
    const timestamp = Date.now();
    const categoryName = `Flow_Category_${timestamp}`;
    const partName = `Flow_Part_${timestamp}`;
    const partIPN = `IPN-FLOW-${timestamp}`;

    // 1. Create Category
    await categoryPage.navigateToList();
    await categoryPage.createCategory(categoryName, 'Flow category created by UI automation');

    // 2. Navigate to and Select the Category
    await categoryPage.selectCategory(categoryName);

    // 3. Create Part under this Category (marked as testable)
    await partPage.createPart(
      partName,
      partIPN,
      'Flow part created by UI automation',
      { testable: true }
    );

    // 4. Add a Parameter to the Part (Template Index 1, Value "100")
    await partPage.addParameter(1, '100');
    await partPage.verifyParameterValue('100');

    // 5. Add a Stock Item (Quantity "50", Location Index 1)
    await partPage.addStockItem('50', 1);

    // 6. Verify in Category View
    await categoryPage.selectCategory(categoryName);
    
    // Check that part listing in Category displays the created part
    await expect(page.locator(`a:has-text("${partName}")`)).toBeVisible();
  });
});
