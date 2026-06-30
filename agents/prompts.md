# AI Agent Prompts & Engineering Instructions

This document lists the engineered prompts used to direct the AI agent in generating the manual test cases and automated scripts for the InvenTree Parts module.

---

## Prompt 1: UI & Manual Test Case Generation

### Objective
Ingest requirements for the InvenTree Parts module and generate a comprehensive manual/UI test suite.

### Prompt Text
```text
Role: Principal QA Engineer / AI Test Case Generator
Context: We are testing the "Parts" module of InvenTree, an open-source inventory management system.
Requirements Source: https://docs.inventree.org/en/stable/part/ (including sub-pages like Creating Parts, Virtual Parts, Part Views, Tracking, Revisions, Templates, Tests, Pricing, Stocktake)

Task:
Generate a comprehensive set of UI and manual test cases covering at minimum:
1. Part creation (manual entry form and file import flows)
2. Part detail view — all tabs (Stock, BOM, Allocated, Build Orders, Parameters, Variants, Revisions, Attachments, Related Parts, Test Templates)
3. Part categories — hierarchy, filtering, parametric tables
4. Part attributes — Virtual, Template, Assembly, Component, Trackable, Purchaseable, Salable, Active/Inactive
5. Units of measure configuration (compatible units vs incompatible unit validation)
6. Part revisions — creation, constraints (circular references, unique codes, template restrictions)
7. Negative and boundary scenarios (e.g., duplicate IPN, inactive part restrictions, revision-of-revision prevention)

Format each test case with:
- ID (e.g., TC-UI-001)
- Category/Feature
- Description / Goal
- Preconditions
- Execution Steps
- Expected Result
- Boundary/Negative Check (Yes/No)

Ensure high coverage, including positive, negative, and edge cases. Make sure the output is professional, detailed, and structured in Markdown.
```

---

## Prompt 2: API Specification Analysis & Manual Test Cases

### Objective
Ingest InvenTree Parts API Schema and generate manual API test cases.

### Prompt Text
```text
Role: Senior API QA Engineer
Context: We are analyzing the InvenTree API schema for the parts module (https://docs.inventree.org/en/stable/api/schema/part/).
Key Endpoints:
- /api/part/ (GET, POST, PUT, PATCH)
- /api/part/category/ (GET, POST, PUT, PATCH, DELETE)

Task:
Generate a detailed set of API manual test cases covering:
1. CRUD operations on Parts and Part Categories
2. Filtering, pagination, and search on the Parts list endpoint (GET /api/part/)
3. Field-level validation (required fields like 'name', max lengths like 'name' max 100, nullable constraints, read-only fields like 'pk', 'part_count')
4. Relational integrity (assigning parts to categories, category default locations, supplier linkage)
5. Edge and negative cases (invalid payloads, unauthorized access, conflict scenarios such as duplicate IPNs, invalid parent category loops)

Format each test case with:
- ID (e.g., TC-API-001)
- Endpoint & Method
- Goal
- Headers & Authentication details
- Request Body (JSON representation)
- Query Parameters (if filtering/paginating)
- Expected Response Code (e.g., 200, 201, 400, 403, 409)
- Expected Validation / Error message in JSON response
```

---

## Prompt 3: UI Automation Script Generation (Playwright & TS)

### Objective
Generate runnable UI automation scripts using Playwright and TypeScript for InvenTree Parts module.

### Prompt Text
```text
Role: Lead SDET / Test Automation Architect
Context: We need to write UI automation tests using Playwright and TypeScript for the InvenTree Parts module.
Target application: A running InvenTree instance (credentials: admin / admin12345).

Task:
Create a Playwright TypeScript test project that:
1. Covers core Part CRUD workflows (Create, Read, Update, Delete via UI).
2. Validates key UI elements, tabs, navigation, and form behaviour.
3. Includes a cross-functional flow:
   - Create a Part category
   - Create a Part under that category
   - Add parameters to that Part
   - Create stock for that Part
   - Verify that the Part is listed correctly in the category view and stock level is updated.
4. Handles waits, selectors, and assertions robustly (using locators, page.waitForSelector, expect assertions).

Write modular, clean code utilizing the Page Object Model (POM) design pattern where possible. Detail all setup steps in a configuration file.
```

---

## Prompt 4: API Automation Script Generation (Playwright & TS)

### Objective
Generate runnable API automation scripts using Playwright and TypeScript.

### Prompt Text
```text
Role: API Automation SDET
Context: We need to write automated API tests using Playwright's APIRequestContext and TypeScript.
Target Endpoint: InvenTree Parts API (/api/part/ and /api/part/category/).

Task:
Create a Playwright API test suite that:
1. Authenticates against the InvenTree instance (token or session based).
2. Tests CRUD operations on Part Category (create, verify, update, delete).
3. Tests CRUD operations on Part (create under category, verify details, update attributes, delete).
4. Validates API filtering and pagination (e.g., query params search, offset/limit).
5. Asserts positive and negative scenarios (e.g., missing required fields returns 400, duplicate IPN returns 400/400 validation, unauthorized access returns 401/403).
6. Validates response schemas and business logic assertions (e.g. check created fields match payload).
7. Demonstrates data-driven or parameterized testing for multiple part attribute configurations.
```
