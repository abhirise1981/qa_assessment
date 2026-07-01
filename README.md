# Enterprise Quality Engineering & Playwright Automation Core
> **Personal Engineering Showcase Project**

This repository serves as a production-grade reference architecture demonstrating advanced **Quality Engineering (QE)** methodologies, full-stack test automation patterns, and enterprise-level test strategy design. It showcases how to shift quality left, structure maintainable test suites, and enforce automated quality gates.

---

## 🛠️ Architecture & Design Patterns

The automation frameworks are structured to enforce clean separation of concerns and maximize code reuse:

### 1. UI Automation: Page Object Model (POM)
* Located under [automation/ui/](file:///Users/apple/Documents/qa_assessment/automation/ui).
* Implements the **POM pattern** via class files under [pages/](file:///Users/apple/Documents/qa_assessment/automation/ui/pages):
  * [LoginPage.ts](file:///Users/apple/Documents/qa_assessment/automation/ui/pages/LoginPage.ts) - Encapsulates authentication.
  * [CategoryPage.ts](file:///Users/apple/Documents/qa_assessment/automation/ui/pages/CategoryPage.ts) - Handles parent/child category selectors.
  * [PartPage.ts](file:///Users/apple/Documents/qa_assessment/automation/ui/pages/PartPage.ts) - Manages parts, custom parameters, and stock items.
* **Modern Locators**: Utilizes Playwright `Locator` instances instantiated in class constructors, combining resilient CSS fallback selectors with modern accessibility-first roles (`page.getByRole()`).

### 2. API Automation: Controller Pattern
* Located under [automation/api/](file:///Users/apple/Documents/qa_assessment/automation/api).
* Implements the **Controller pattern** under [controllers/](file:///Users/apple/Documents/qa_assessment/automation/api/controllers):
  * [CategoryController.ts](file:///Users/apple/Documents/qa_assessment/automation/api/controllers/CategoryController.ts) & [PartController.ts](file:///Users/apple/Documents/qa_assessment/automation/api/controllers/PartController.ts) wrap Playwright's `APIRequestContext`.
  * Isolates raw HTTP requests, endpoints, and headers from test specs.
  * Test files under `tests/` focus strictly on verifying status codes, schema schemas, and database relational integrity.

---

## ⚙️ Key Engineering Decisions

To keep this codebase production-style, several critical architectural decisions were made:

### 1. Test Isolation vs. State Dependencies
* **Sequential Workflows (`workers: 1`)**: The UI and API tests interact with a shared, live instance of the application. To prevent concurrent database collisions and ID overrides, execution is configured to run sequentially (`workers: 1`, `fullyParallel: false`).
* **Dynamic Data Lifecycle**: Test data is parameterized using dynamic timestamps (`Date.now()`) to guarantee uniqueness. An `afterAll` hook deletes created categories and parts, ensuring zero state pollution.

### 2. Flaky Test Mitigation (Quarantine Strategy)
* Instabilities are managed using a tag-based quarantine approach. Tests identified as unstable are tagged with `@flaky` (e.g., `test('Create Part @flaky', ...)`).
* In CI/CD build gates, flaky tests are excluded to protect the release pipeline:
  ```bash
  npx playwright test --grep-invert "@flaky"
  ```
* A separate, scheduled nightly runner executes only the quarantined tests (`--grep "@flaky"`) to isolate and fix root causes (e.g. environment latency, network drops).

### 3. Fail-Safe Triage & Reporting
* **Trace Viewer Enabled**: Playwright config is set to `trace: 'retain-on-failure'`, capturing complete DOM snapshots, network payloads, console logs, and action timings for every failure.
* **HTML Reports**: Generates standalone HTML dashboards and visual logs for quick debugging.

---

## 📂 Directory Structure

```text
qa_assessment/
├── .github/                           # CI/CD Infrastructure
│   └── workflows/
│       └── playwright.yml             # GitHub Actions continuous automation configuration
├── README.md                          # Main project guide (this file)
├── agents/                            # Agentic workflow & prompt engineering assets
│   ├── prompts.md                     # Engineering prompts used for generation
│   └── system-instructions.md         # Behavioral model definitions
├── test-cases/                        # Test Design Suites (Manual reference)
│   ├── ui-manual-tests.md             # 30 detailed UI test cases (A11y, Security, Edge cases)
│   └── api-manual-tests.md            # 18 detailed API test cases (SQLi, Rate-limiting, Boundaries)
├── automation/                        # Automated Testing Suites
│   ├── ui/                            # Playwright TypeScript UI Project
│   │   ├── package.json
│   │   ├── playwright.config.ts
│   │   └── pages/                     # Page Object Model (POM) Page Classes
│   │       ├── LoginPage.ts
│   │       ├── CategoryPage.ts
│   │       └── PartPage.ts
│   └── api/                           # Playwright TypeScript API Project
│       ├── package.json
│       ├── playwright.config.ts
│       └── controllers/               # API Controllers (Endpoint wrappers)
│           ├── CategoryController.ts
│           └── PartController.ts
├── case_study_2/                      # Enterprise Strategy Proposal
│   └── financial_test_strategy.md     # Pact contract testing, TDM, and SDET roadmap
└── video/
    └── README.md                      # Framework walkthrough script and demo outlines
```

---

## 🖥️ How to Run & Demo in VS Code

### Prerequisites
* [Node.js](https://nodejs.org/) (v16 or higher)
* Git

### 1. Setup & Installation
Clone the repository and install dependencies in the respective directories:
```bash
git clone https://github.com/abhirise1981/qa_assessment.git
cd qa_assessment
```

**For UI Project:**
```bash
cd automation/ui
npm install
npx playwright install chromium
```

**For API Project:**
```bash
cd automation/api
npm install
```

### 2. Run via Terminal (Command Line Demo)

* **To run UI Automation Tests**:
  ```bash
  cd automation/ui
  npx playwright test
  ```

* **To run API Automation Tests**:
  ```bash
  cd automation/api
  npx playwright test
  ```

### 3. Visual Demo via Playwright VS Code Extension
1. Open this repository in **VS Code**.
2. Install the official **Playwright Test** extension by Microsoft.
3. Open the **Testing (Beaker)** tab on the left sidebar.
4. Check **"Show browser"** to watch the browser run in real-time.
5. Click the play icon next to any UI or API test spec to run.

### 4. Interactive Trace & Reporting
Open execution logs, screenshot evidence, and API payloads in the browser:
```bash
npx playwright show-report
```

---

## 🚀 Strategic Proposals & Quality Shift-Left

This project highlights quality leadership beyond script writing:
* **Manual Design Audits**: Detailed [UI Manual Test Suite](file:///Users/apple/Documents/qa_assessment/test-cases/ui-manual-tests.md) and [API Manual Test Suite](file:///Users/apple/Documents/qa_assessment/test-cases/api-manual-tests.md) including accessibility (WCAG 2.1 Level AA) and vulnerability tests (XSS, Rate-Limiting, SQL Injection).
* **Enterprise Test Strategy Proposal**: A strategic proposal ([financial_test_strategy.md](file:///Users/apple/Documents/qa_assessment/case_study_2/financial_test_strategy.md)) to resolve data inconsistencies in FinTech microservices using **Consumer-Driven Contract Testing (Pact)**, dynamic **Test Data Management (TDM)** pipelines, and automated quality gates.
