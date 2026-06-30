# Enterprise Quality Engineering & Playwright Automation Showcase

This repository serves as a reference architecture demonstrating modern **Quality Engineering (QE)** methodologies, advanced test automation patterns, and enterprise-level test strategy design. It is built to showcase how organizations can shift quality left, scale automation efficiently, and implement robust quality gates in CI/CD pipelines.

---

## 🛠️ Architecture & Technical Stack

The repository is divided into two primary sections:
1. **Automation & Test Design Framework**: A fully structured, modular Playwright and TypeScript framework testing both UI and API layers using industry-standard design patterns.
2. **Enterprise Test Strategy Proposal**: A strategic blueprint to resolve high defect rates in complex, multi-product financial microservices architectures.

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
│   │   ├── tsconfig.json
│   │   ├── pages/                     # Page Object Model (POM) Page Classes
│   │   │   ├── LoginPage.ts
│   │   │   ├── CategoryPage.ts
│   │   │   └── PartPage.ts
│   │   └── tests/
│   │       └── parts-ui.spec.ts
│   └── api/                           # Playwright TypeScript API Project
│       ├── package.json
│       ├── playwright.config.ts
│       ├── tsconfig.json
│       ├── controllers/               # API Controllers (Endpoint wrappers)
│       │   ├── CategoryController.ts
│       │   └── PartController.ts
│       └── tests/
│           └── parts-api.spec.ts
├── case_study_2/                      # Enterprise Strategy Proposal
│   └── financial_test_strategy.md     # Pact contract testing, TDM, and SDET roadmap
└── video/
    └── README.md                      # Framework walkthrough script and demo outlines
```

---

## 🖥️ How to Run & Demo in VS Code

This project has been pre-configured with all dependencies and browser installations completed. Follow these steps to demo the codebase:

### 1. Open in VS Code
- Open **VS Code**.
- Select **File > Open Folder...** and select this directory (`qa_assessment`).

### 2. Run via the Playwright VS Code Extension (Visual Demo)
1. Install the official **Playwright Test** extension by Microsoft from the Extensions Marketplace (`Cmd + Shift + X`).
2. Click the **Testing (Beaker)** icon on the left sidebar.
3. Check the **"Show browser"** checkbox at the bottom of the Testing panel to watch the execution live.
4. Click the **Play button** next to any test (e.g. `parts-api.spec.ts`) to watch the test run in real-time.

### 3. Run via Terminal (Command Line Demo)

Open the VS Code Terminal and run:

* **To run UI Automation Tests**:
  ```bash
  cd automation/ui
  npm install
  npx playwright install
  npx playwright test
  ```

* **To run API Automation Tests**:
  ```bash
  cd automation/api
  npm install
  npx playwright install
  npx playwright test
  ```

### 4. Show the Interactive HTML Report
To showcase the visual reports containing execution videos, screenshots, and API payload traces, execute:
```bash
npx playwright show-report
```

---

## 🚀 Key Framework Highlights

### 1. Unified Test Automation (Playwright + TypeScript)
* **Page Object Model (POM)**: Enforced strict separation of concerns for the UI project. Pages under `automation/ui/pages/` encapsulate element locators and actions, making test scripts readable and easily maintainable.
* **API Controller Pattern**: The API project uses `CategoryController` and `PartController` to handle HTTP requests, headers, and payloads, keeping the test specs focused entirely on schema and status assertions.
* **Data-Driven Loops**: Leveraged parameterized tests to run identical validation logic dynamically across multiple configuration objects, maximizing coverage while reducing code duplication.
* **State Management**: Built configurations to handle session tokens and authentication states dynamically, bypassing UI logins for subsequent tests.

### 2. Shift-Left Strategy & Test Design
* Built comprehensive manual suites for both UI and API, highlighting:
  * **Non-Functional Testing**: WCAG 2.1 Level AA accessibility checks (tab orders, focus states, ARIA roles).
  * **Vulnerability Testing**: SQL Injection (SQLi) parameters validation, client-side Cross-Site Scripting (XSS) input sanitization, and API Rate-Limiting/throttling checks.

### 3. Enterprise Quality Strategy (FinTech Showcase)
* Designed a unified strategic roadmap to resolve a 30% production defect rate in a distributed multi-product architecture.
* Details the setup of **Consumer-Driven Contract (CDC) Testing using Pact** to catch API version schema drifts early.
* Outlines a secure **Test Data Management (TDM) pipeline** with dynamic data masking for compliance, automated CI/CD release gates, and a phased SDET upskilling roadmap.
