# UI Automation Project Setup

This project automates key UI workflows for the InvenTree Parts module using **Playwright and TypeScript**.

## Prerequisites
- Node.js (v18+)
- Running InvenTree instance (default: `http://localhost:8000`)

## Getting Started
1. Install dependencies:
   ```bash
   npm install
   ```
2. Install Playwright browsers:
   ```bash
   npx playwright install chromium
   ```
3. Run tests:
   ```bash
   npm test
   ```
4. View HTML test report:
   ```bash
   npx playwright show-report
   ```

## Configuration
To point tests to a different server or use specific admin credentials, set the following environment variables:
- `INVENTREE_URL`: Application base URL (e.g. `http://localhost:8000`)
- `INVENTREE_USER`: Username (default: `admin`)
- `INVENTREE_PASSWORD`: Password (default: `admin12345`)
