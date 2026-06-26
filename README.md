# QA Engineering Assessment Submission

This repository contains the complete deliverables for the Quality Engineering Assessment, consisting of two Case Studies:
1. **Case Study 1**: End-to-end Quality Engineering on InvenTree's Parts Module (Manual Test Cases, Playwright TypeScript UI/API Automation, Agentic Workflow prompts, and Video script).
2. **Case Study 2**: Strategic Proposal for a Unified Test Strategy & Investment Plan for a Multi-Product Financial Services Platform.

---

## Directory Structure

```text
submission/
├── .github/                           # CI/CD Workflows
│   └── workflows/
│       └── playwright.yml             # GitHub Actions CI Configuration
├── README.md                          # Main project guide (this file)
├── agents/                            # Agent prompts & instructions
│   ├── prompts.md                     # Prompts used for generation
│   └── system-instructions.md         # Persona definition
├── test-cases/                        # Manual Test Suites
│   ├── ui-manual-tests.md             # UI/Manual Parts test suite (26 test cases)
│   └── api-manual-tests.md            # API Manual Parts test suite (15 test cases)
├── automation/                        # Automated testing scripts
│   ├── ui/                            # Playwright TypeScript UI project
│   │   ├── package.json
│   │   ├── playwright.config.ts
│   │   ├── pages/                     # Page Object Model (POM) Page Classes
│   │   │   ├── LoginPage.ts
│   │   │   ├── CategoryPage.ts
│   │   │   └── PartPage.ts
│   │   └── tests/
│   │       └── parts-ui.spec.ts
│   └── api/                           # Playwright TypeScript API project
│       ├── package.json
│       ├── playwright.config.ts
│       ├── controllers/               # API Controllers (Endpoint wrappers)
│       │   ├── CategoryController.ts
│       │   └── PartController.ts
│       └── tests/
│           └── parts-api.spec.ts
├── case_study_2/                      # Case Study 2: Fintech Unified Test Strategy
│   └── financial_test_strategy.md     # Strategy & Investment Plan Proposal
└── video/
    └── README.md                      # Video recording outline, script, & talking points
```

---

## 🖥️ How to Run & Demo in VS Code (For Interviewers)

This project has been pre-configured with all dependencies and browser installations completed. Follow these steps to demo the codebase:

### 1. Open in VS Code
- Open **VS Code**.
- Select **File > Open Folder...** and select this directory (`/Users/apple/Documents/qa_assessment`).

### 2. Run via the Playwright VS Code Extension (Visual Demo)
1. Install the official **Playwright Test** extension by Microsoft from the Extensions Marketplace (`Cmd + Shift + X`).
2. Click the **Testing (Beaker)** icon on the left sidebar.
3. Check the **"Show browser"** checkbox at the bottom of the Testing panel to watch the execution live.
4. Click the **Play button** next to any test (e.g. `TC-UI-FLOW-03` under `parts-ui.spec.ts`) to watch the test run in a headed browser window.

### 3. Run via Terminal (Command Line Demo)

Open the VS Code Terminal and run:

* **To run UI Automation Tests (Headed Browser)**:
  ```bash
  cd automation/ui
  npx playwright test --headed
  ```

* **To run API Automation Tests**:
  ```bash
  cd automation/api
  npx playwright test
  ```

### 4. Show the Interactive HTML Report
To showcase the visual reports containing execution videos, screenshots, and API payload traces, execute:
```bash
npx playwright show-report
```

---

## Execution Summaries

### Case Study 1: InvenTree QE
- **Manual Test Coverage**: 26 UI and 15+ API scenarios covering parts creation, detail tabs (Stock, BOM, parameters), categories, units, and boundary/negative conditions.
- **Automation Tech Stack**: Playwright with TypeScript for both UI and API.
- **Agentic Workflow**: Configured agentic system-instructions and engineered prompts that guided the test case generation and script creation.
- **Video Walkthrough**: Contains a structured presentation script for explaining the agentic workflow, code logic, and demo executions in the [video script](file:///Users/apple/Documents/qa_assessment/video/README.md).

### Case Study 2: FinTech Unified Test Strategy
- A detailed strategic proposal to resolve a 30% defect rate stemming from customer data inconsistencies.
- **Key Frameworks Proposed**: Consumer-Driven Contract testing (Pact), CDC verification pipelines, Synthetic E2E transaction runs, and a self-service Test Data Management (TDM) platform.
- **Investment & ROI**: A phased 3-stage investment roadmap transforming QAs into SDETs and introducing automated release gates. Detailed in the [strategy document](file:///Users/apple/Documents/qa_assessment/case_study_2/financial_test_strategy.md).
