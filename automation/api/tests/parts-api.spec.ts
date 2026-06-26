import { test, expect } from '@playwright/test';
import { CategoryController } from '../controllers/CategoryController';
import { PartController } from '../controllers/PartController';

// Configuration variables (Loaded from Environment with fallback to prevent hardcoding)
const USERNAME = process.env.INVENTREE_USER || 'admin';
const PASSWORD = process.env.INVENTREE_PASSWORD || 'inventree';
const AUTH_HEADER = 'Basic ' + Buffer.from(`${USERNAME}:${PASSWORD}`).toString('base64');

const apiHeaders = {
  'Authorization': AUTH_HEADER,
  'Content-Type': 'application/json',
};

test.describe('InvenTree Parts & Categories API Test Suite (Controller Pattern)', () => {
  let categoryId: number;
  let partId: number;
  
  let categoryController: CategoryController;
  let partController: PartController;

  test.beforeEach(({ request }) => {
    categoryController = new CategoryController(request, apiHeaders);
    partController = new PartController(request, apiHeaders);
  });

  // Cleanup block after all tests have completed
  test.afterAll(async ({ request }) => {
    const cleanCategory = new CategoryController(request, apiHeaders);
    const cleanPart = new PartController(request, apiHeaders);

    // Delete test part if it exists
    if (partId) {
      await cleanPart.delete(partId);
    }
    // Delete test category if it exists
    if (categoryId) {
      await cleanCategory.delete(categoryId);
    }
  });

  // ==========================================
  // 1. PART CATEGORY CRUD OPERATIONS
  // ==========================================

  test('TC-API-001: Create Part Category (POST)', async () => {
    const name = `API_Category_${Date.now()}`;
    const description = 'Category created via Playwright API test';

    const response = await categoryController.create(name, description);

    expect(response.status()).toBe(201);
    const body = await response.json();
    expect(body).toHaveProperty('pk');
    expect(body.name).toBe(name);
    expect(body.description).toBe(description);
    
    categoryId = body.pk; // Save for subsequent tests
  });

  test('TC-API-002: Retrieve Part Category Details (GET)', async () => {
    expect(categoryId).toBeDefined();

    const response = await categoryController.getDetails(categoryId);

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.pk).toBe(categoryId);
    expect(body.name).toContain('API_Category');
  });

  test('TC-API-003: Update Part Category Details (PATCH)', async () => {
    expect(categoryId).toBeDefined();

    const updatedDescription = 'Updated description via PATCH';
    const response = await categoryController.patch(categoryId, updatedDescription);

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.description).toBe(updatedDescription);
  });

  // ==========================================
  // 2. PART CRUD OPERATIONS
  // ==========================================

  test('TC-API-004: Create Part Linked to Category (POST)', async () => {
    expect(categoryId).toBeDefined();

    const payload = {
      name: `API_Part_${Date.now()}`,
      IPN: `IPN-API-${Date.now()}`,
      description: 'Part created via Playwright API test',
      category: categoryId,
      active: true,
      assembly: true,
      component: false,
    };

    const response = await partController.create(payload);

    expect(response.status()).toBe(201);
    const body = await response.json();
    expect(body).toHaveProperty('pk');
    expect(body.name).toBe(payload.name);
    expect(body.IPN).toBe(payload.IPN);
    expect(body.category).toBe(categoryId);
    expect(body.assembly).toBe(true);

    partId = body.pk; // Save for subsequent tests
  });

  test('TC-API-005: Retrieve Part Details (GET)', async () => {
    expect(partId).toBeDefined();

    const response = await partController.getDetails(partId);

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.pk).toBe(partId);
  });

  test('TC-API-006: Update Part Attributes (PUT)', async () => {
    expect(partId).toBeDefined();

    const payload = {
      name: `API_Part_Updated_${Date.now()}`,
      description: 'Fully updated description via PUT',
      category: categoryId,
      active: true,
      assembly: false,
      component: true,
    };

    const response = await partController.update(partId, payload);

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.name).toBe(payload.name);
    expect(body.description).toBe(payload.description);
    expect(body.assembly).toBe(false);
    expect(body.component).toBe(true);
  });

  // ==========================================
  // 3. FILTERING, PAGINATION, AND SEARCH
  // ==========================================

  test('TC-API-007: Filter, Paginate, and Search Parts (GET)', async () => {
    expect(partId).toBeDefined();

    const params = {
      category: categoryId,
      limit: 2,
      offset: 0,
      search: 'API_Part'
    };

    const response = await partController.list(params);

    expect(response.status()).toBe(200);
    const body = await response.json();
    
    if (body.results) {
      expect(body).toHaveProperty('count');
      expect(body.results).toBeInstanceOf(Array);
      expect(body.results.length).toBeGreaterThan(0);
      expect(body.results[0].category).toBe(categoryId);
    } else {
      expect(body).toBeInstanceOf(Array);
      expect(body.length).toBeGreaterThan(0);
      expect(body[0].category).toBe(categoryId);
    }
  });

  // ==========================================
  // 4. FIELD-LEVEL VALIDATION (NEGATIVE)
  // ==========================================

  test('TC-API-008: Validate POST Fails When Required Name Field is Missing', async () => {
    const payload = {
      IPN: 'IPN-FAIL-001',
      category: categoryId,
      description: 'Should fail due to missing name'
    };

    const response = await partController.create(payload);

    expect(response.status()).toBe(400);
    const body = await response.json();
    expect(body).toHaveProperty('name');
    expect(body.name[0]).toContain('This field is required');
  });

  test('TC-API-009: Validate POST Fails When Name Exceeds Max Length Limit', async () => {
    const longName = 'A'.repeat(101); // Exceeds 100 max chars
    const payload = {
      name: longName,
      category: categoryId,
      description: 'Should fail due to name too long'
    };

    const response = await partController.create(payload);

    expect(response.status()).toBe(400);
    const body = await response.json();
    expect(body).toHaveProperty('name');
    expect(body.name[0]).toContain('100 characters');
  });

  // ==========================================
  // 5. RELATIONAL INTEGRITY & AUTHORIZATION
  // ==========================================

  test('TC-API-010: Validate POST Fails on Non-Existent Category ID (Relational Integrity)', async () => {
    const payload = {
      name: 'Invalid Relational Part',
      category: 999999, // Invalid PK
    };

    const response = await partController.create(payload);

    expect(response.status()).toBe(400);
    const body = await response.json();
    expect(body).toHaveProperty('category');
    expect(body.category[0]).toContain('does not exist');
  });

  test('TC-API-011: Validate API Rejects Request Without Authorization Header', async ({ request }) => {
    const response = await request.get('/api/part/', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });

    expect([401, 403]).toContain(response.status());
  });

  // ==========================================
  // 6. PARAMETERIZED/DATA-DRIVEN TESTING
  // ==========================================

  const dataDrivenCases = [
    { type: 'Virtual', payload: { virtual: true, trackable: false, assembly: false } },
    { type: 'Trackable Assembly', payload: { virtual: false, trackable: true, assembly: true } },
    { type: 'Component', payload: { virtual: false, trackable: false, component: true } }
  ];

  for (const tc of dataDrivenCases) {
    test(`TC-API-012: Data-Driven - Create Part of Type [${tc.type}]`, async () => {
      expect(categoryId).toBeDefined();

      const payload = {
        name: `DD_Part_${tc.type.replace(/\s+/g, '')}_${Date.now()}`,
        IPN: `IPN-DD-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        category: categoryId,
        active: true,
        ...tc.payload
      };

      const response = await partController.create(payload);

      expect(response.status()).toBe(201);
      const body = await response.json();
      expect(body.virtual).toBe(payload.virtual);
      expect(body.trackable).toBe(payload.trackable);
      if (payload.assembly !== undefined) expect(body.assembly).toBe(payload.assembly);
      if (payload.component !== undefined) expect(body.component).toBe(payload.component);

      // Clean up the created part
      await partController.delete(body.pk);
    });
  }
});
