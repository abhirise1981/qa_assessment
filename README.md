# Enterprise Quality Engineering & Playwright Automation Core
> **Personal Engineering Showcase Project**

This repository serves as a production-grade reference architecture demonstrating advanced **Quality Engineering (QE)** methodologies, full-stack test automation patterns, and enterprise-level test strategy design. It showcases how to shift quality left, structure maintainable test suites, and enforce automated quality gates.

---

## 🛠️ Architecture & Design Patterns

The automation frameworks are structured to enforce clean separation of concerns and maximize code reuse:

### 1. UI Automation: Page Object Model (POM) & Custom Base Classes
* Located under [automation/ui/](file:///Users/apple/Documents/qa_assessment/automation/ui).
* Implements a custom [BasePage.ts](file:///Users/apple/Documents/qa_assessment/automation/ui/pages/BasePage.ts) establishing explicit wait governance and element resilience.
* Pages under [pages/](file:///Users/apple/Documents/qa_assessment/automation/ui/pages) inherit from `BasePage`:
  * [LoginPage.ts](file:///Users/apple/Documents/qa_assessment/automation/ui/pages/LoginPage.ts) - Encapsulates authentication using retry policies.
  * [CategoryPage.ts](file:///Users/apple/Documents/qa_assessment/automation/ui/pages/CategoryPage.ts) - Handles parent/child category selectors with DOM stability checks.
  * [PartPage.ts](file:///Users/apple/Documents/qa_assessment/automation/ui/pages/PartPage.ts) - Manages parts, custom parameters, and stock items.

### 2. API Automation: Controller Pattern
* Located under [automation/api/](file:///Users/apple/Documents/qa_assessment/automation/api).
* Implements the **Controller pattern** under [controllers/](file:///Users/apple/Documents/qa_assessment/automation/api/controllers):
  * [CategoryController.ts](file:///Users/apple/Documents/qa_assessment/automation/api/controllers/CategoryController.ts) & [PartController.ts](file:///Users/apple/Documents/qa_assessment/automation/api/controllers/PartController.ts) wrap Playwright's `APIRequestContext`.
  * Test files under `tests/` focus strictly on verifying status codes, schema schemas, and database relational integrity.

---

## ⚙️ Key Architectural Decisions

To address enterprise scale and security, several design decisions govern this codebase:

### 1. Gang of Four (GoF) Design Patterns Implementation
We distinguish UI-specific structural patterns (POM) from core engine design patterns:
* **Singleton Pattern**: Implemented in Playwright’s global test runner to manage shared configuration settings, database connections, and auth state context files.
* **Factory Pattern**: Utilized by the test runner's browser fixtures to dynamically allocate and configure distinct browser contexts (Chromium, WebKit, Firefox) dynamically based on metadata flags.
* **Builder Pattern**: Used for our dynamic test data factories, constructing complex, nested JSON payloads for our parameterized API tests.

### 2. Three-Layer Element Stability Strategy (Anti-Flakiness)
To prevent stale element references, layout shifts, and click-hijacking, we enforce a three-tier resilience strategy:
1. **Auto-Waiting**: We leverage Playwright’s native lazy-evaluated locators that perform automatic attach, visibility, and stabilization re-lookups.
2. **Explicit Wait Gates**: Enforced in [BasePage.ts](file:///Users/apple/Documents/qa_assessment/automation/ui/pages/BasePage.ts) using `waitForDOMStability()` to monitor element bounding boxes. Tests wait until animation/transition coordinates are stable.
3. **Retry-with-Backoff Wrapper**: Implements `retryAction()` to wrap flaky operations (like initial login form inputs) in incremental backoff loops.

### 3. Token Optimization & Cost Strategies (AI Triage Pipeline)
Our AI failure analysis pipeline utilizes a **Filter, Compact, and Tier** model to limit monthly LLM runtime costs to under $100:
* **Filter**: Only failed test logs are routed to the LLM; passing run logs are immediately discarded.
* **Compact**: We run a gateway script (via n8n) that strips debug stack trace noise, duplicate lines, and PII, reducing input payload token size by 80%.
* **Tier**: We use cheaper, high-speed models (like Claude Haiku) for initial failure classification (e.g. Env vs. Bug), routing only complex code repairs to higher-tier models (Claude Opus).

### 4. DevOps Quality Gates & Named Toolchain
We integrate quality validation directly into the enterprise DevOps pipeline:
* **Orchestration**: Jenkins pipelines using Shared Libraries for reusable build gates.
* **Static Analysis & Quality Gates**: Configured via [sonar-project.properties](file:///Users/apple/Documents/qa_assessment/sonar-project.properties) to enforce clean code gates in SonarQube before merges.
* **Failure Analytics**: Integrates with **ReportPortal.io** for historical dashboarding and ML-driven defect categorization.
* **Consumer-Driven Contract (CDC) Testing**: Designed with **Pact** to publish API expectations to a Pact Broker, failing platform builds immediately on schema breaks.

---

## 📂 Directory Structure

```text
qa_assessment/
├── .github/                           # CI/CD Infrastructure
│   └── workflows/
│       └── playwright.yml             # GitHub Actions continuous automation configuration
├── README.md                          # Main project guide (this file)
├── sonar-project.properties           # SonarQube Static Analysis & Quality Gate rules
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
│   │       ├── BasePage.ts            # Base Page containing explicit wait stability gates
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
