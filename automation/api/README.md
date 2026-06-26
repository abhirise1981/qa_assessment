# API Automation Project Setup

This project automates API testing for InvenTree Parts and Categories using **Playwright and TypeScript**.

## Prerequisites
- Node.js (v18+)
- Running InvenTree instance (default: `http://localhost:8000`)

## Getting Started
1. Install dependencies:
   ```bash
   npm install
   ```
2. Run tests:
   ```bash
   npm test
   ```
3. View HTML test report:
   ```bash
   npx playwright show-report
   ```

## Configuration
To point tests to a different server or use specific admin credentials, set the following environment variables:
- `INVENTREE_URL`: Application base URL (e.g. `http://localhost:8000`)
- `INVENTREE_USER`: Username (default: `admin`)
- `INVENTREE_PASSWORD`: Password (default: `admin12345`)
