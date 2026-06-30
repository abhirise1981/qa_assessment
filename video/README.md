# Framework Walkthrough Script (First-Person Spoken Guide)

This guide provides a professional presentation script and talking points for demonstrating this test automation repository. It is written in a natural, conversational, and technical speaking voice, suitable for code walkthroughs, tech talks, or system demos.

---

## ⏱️ Video Timeline & Speaking Script

### Section 1: Intro & Project Overview (0:00 - 1:00)
* **What to show on screen**: Open VS Code with the root `README.md` file displayed.
* **What to say**:
  > *"Hi everyone, thanks for tuning in. In this video, I'm going to walk you through my Playwright test automation framework and quality engineering reference architecture. 
  > 
  > I've structured this repository into two main parts: first, a robust end-to-end automation suite for UI and APIs using Playwright and TypeScript; and second, a comprehensive, enterprise-level test strategy proposal designed for a distributed FinTech platform. 
  > 
  > Let's dive into the code and architecture!"*

---

### Section 2: Manual Test Design & Shift-Left (1:00 - 2:30)
* **What to show on screen**: Click on the file `test-cases/ui-manual-tests.md` in VS Code and scroll down slowly.
* **What to say**:
  > *"Before writing any automated scripts, I designed structured test suites for both UI and API layers. 
  > 
  > In `ui-manual-tests.md`, I've documented 26 detailed scenarios covering core workflows, boundary cases, and error handling. Crucially, I've shifted quality left by adding non-functional checks, such as WCAG 2.1 accessibility keyboard tab orders, and security checks like client-side XSS injection inputs.
  > 
  > If we switch over to `api-manual-tests.md` [click and open `test-cases/api-manual-tests.md`], you'll see 18 backend validation scenarios. These cover standard CRUD API flows, parameter bounds, and security-focused validation like checking for SQL injection vulnerability handling and API rate-limiting thresholds. This ensures our strategy covers quality from the browser down to the database layers."*

---

### Section 3: Playwright Automation Architecture (2:30 - 4:30)
* **What to show on screen**: Open the file `automation/api/tests/parts-api.spec.ts` in VS Code.
* **What to say**:
  > *"For automation, I selected Playwright with TypeScript because it supports both UI and API automation natively in a single runner.
  > 
  > Let's look at the API suite first. I structured the tests using the **API Controller Pattern**. By placing HTTP request methods inside controllers like `CategoryController` and `PartController`, the actual test scripts remain clean and focused on assertions. I also implemented parameterized, data-driven test loops that run identical validation across multiple test configurations.
  > 
  > Now, looking at the UI suite [click and open `automation/ui/tests/parts-ui.spec.ts`], I implemented the **Page Object Model** pattern. Locators and user actions are encapsulated inside page classes like `LoginPage` and `PartPage` under the `pages/` directory. This keeps the test scripts highly readable and isolates locators from test logic. 
  > 
  > An example is this end-to-end integration flow that logs in, creates a category, creates a part under that category, adds a stock item, and verifies that the stock level is reflected correctly in the UI."*

---

### Section 4: Live Execution & Reporting (4:30 - 6:30)
* **What to show on screen**: Click the **Testing (Beaker) icon** on the left sidebar in VS Code. Click the Play button next to `parts-api.spec.ts` and watch them pass.
* **What to say**:
  > *"Let's run the automated tests. In VS Code, we can run them using the Playwright extension. I'm going to run the API tests. 
  > 
  > The tests run against our target application sandbox, executing synchronously. As you can see, all tests execute in milliseconds and pass successfully.
  > 
  > We can also generate Playwright's interactive HTML report [run `npx playwright show-report` in terminal], which gives us a complete breakdown of every network request, payload exchange, step execution time, and screenshots or videos of any failures."*

---

### Section 5: Strategic Proposal (6:30 - 8:00)
* **What to show on screen**: Open `case_study_2/financial_test_strategy.md`.
* **What to say**:
  > *"Finally, let's look at the Enterprise Test Strategy proposal. This strategy addresses high defect rates in complex microservices by introducing three modern quality pillars:
  > 
  > 1. **Consumer-Driven Contract Testing** using Pact to catch API schema drifts before integration.
  > 2. An automated **Test Data Management (TDM)** pipeline with dynamic data masking for compliance.
  > 3. A structured **SDET Transition Roadmap** to scale team coding capabilities over 12 months.
  > 
  > This reference architecture demonstrates how we can scale quality engineering, decrease testing cycle times, and build resilient, automated release pipelines. Thanks for walking through this framework with me!"*
