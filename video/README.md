# Video Walkthrough Script (First-Person Spoken Guide)

## 🎥 Recorded Walkthrough Video
> [!IMPORTANT]
> **Video Link**: [Insert Your Loom Video Link Here] (e.g., https://www.loom.com/share/...)

---

Use this script as a word-for-word guide when recording your Loom or OBS screen walkthrough. It is written in a natural, conversational, and professional speaking voice.

---

## ⏱️ Video Timeline & Speaking Script

### Section 1: Intro & Project Overview (0:00 - 1:00)
* **What to show on screen**: Open VS Code with the root `README.md` file displayed.
* **What to say**:
  > *"Hi everyone, thanks for tuning in. In this video, I'm going to walk you through my submission for the Quality Engineering Assessment. 
  > 
  > I've developed two case studies: Case Study 1 focuses on end-to-end quality engineering on InvenTree's Parts module, where I did the manual test design, set up automated tests using Playwright and TypeScript, and documented my agent-assisted workflow. 
  > 
  > Case Study 2 is a strategic proposal for a unified test strategy and investment plan for a multi-product financial services platform. 
  > 
  > I've organized the entire codebase directly in my local Documents folder under 'qa_assessment' so it's clean and easy to navigate. Let's dive in!"*

---

### Section 2: Manual Test Suites (1:00 - 2:30)
* **What to show on screen**: Click on the file `test-cases/ui-manual-tests.md` in VS Code and scroll down slowly.
* **What to say**:
  > *"First, let's look at the manual test cases. For the UI, I've designed 26 comprehensive test cases covering parts creation, bulk import flows, and detailed tab verifications. I also focused heavily on negative scenarios like circular revisions and duplicate IPN blocks.
  > 
  > To make this submission stand out, I added non-functional tests for accessibility and security. For instance, I included WCAG 2.1 keyboard navigation testing, image alt text screen-reader checks, and client-side XSS injection validation on the UI inputs.
  > 
  > If we switch over to `api-manual-tests.md` [click and open `test-cases/api-manual-tests.md`], you'll see 18 manual API test cases covering full CRUD for parts and categories, query pagination, relational integrity checks, and security tests like SQL injection protection and API rate-limiting. This ensures we cover quality from both the front-end and the back-end."*

---

### Section 3: Playwright Code Walkthrough (2:30 - 4:30)
* **What to show on screen**: Open the file `automation/api/tests/parts-api.spec.ts` in VS Code.
* **What to say**:
  > *"For automation, I chose Playwright with TypeScript as my unified framework for both UI and API testing. 
  > 
  > Let's look at the API test codebase first. I've set up clean basic authentication headers and structured the tests sequentially. It covers creating categories, retrieving details, updating, and deleting. I also implemented a data-driven test loop at the bottom that dynamically runs the same test logic for multiple part configurations, like Virtual or Trackable assemblies.
  > 
  > Now, if we look at the UI test codebase [click and open `automation/ui/tests/parts-ui.spec.ts`], I implemented the Page Object Model (POM) pattern. I separated all elements and actions into modular page files under the `pages/` directory—specifically `LoginPage`, `CategoryPage`, and `PartPage`—which isolates locator changes and keeps the test scripts highly readable. 
  > 
  > I want to highlight the cross-functional flow test here, which automates a complete end-to-end scenario: it logs in, creates a category, creates a part under that category, adds a parameter, adds stock, and then navigates back to verify that the stock level updates correctly in the category table view."*

---

### Section 4: Live Execution Demo (4:30 - 6:30)
* **What to show on screen**: Click the **Testing (Beaker) icon** on the left sidebar in VS Code. Click the Play button next to `parts-api.spec.ts` and watch them pass.
* **What to say**:
  > *"Now, let's run the automated tests. In VS Code, I can run these directly using the Playwright extension. I'm going to run the API tests by clicking the play button. 
  > 
  > Because these tests are pointing to the live InvenTree online demo server, they run and connect instantly. As you can see, all 14 tests are passing successfully in real-time.
  > 
  > If I open the terminal [open terminal or run command] and run `npx playwright show-report`, we get Playwright's interactive HTML report, which lists every step, network request, and response payload in detail."*

---

### Section 5: Agentic Workflow & Strategy (6:30 - 8:00)
* **What to show on screen**: Open `agents/prompts.md` and then open `case_study_2/financial_test_strategy.md`.
* **What to say**:
  > *"Finally, in the `agents/` folder, I've documented my prompts and system instructions to show how I guided the AI agent to prepare the codebase.
  > 
  > For Case Study 2 [scroll through `case_study_2/financial_test_strategy.md`], I put together a strategic proposal for the financial platform. I addressed their 30% defect rate by recommending Consumer-Driven Contract testing using Pact, establishing automated release gates, designing a secure Test Data Management pipeline, and outlining a 12-month SDET transition budget.
  > 
  > That completes my walkthrough. Everything is zipped and ready to run. Thanks for your time!"*
