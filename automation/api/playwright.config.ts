import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  workers: 1, // Sequential execution to prevent ID collisions on shared state
  reporter: 'html',
  use: {
    baseURL: process.env.INVENTREE_URL || 'https://demo.inventree.org',
    trace: 'retain-on-failure',
    extraHTTPHeaders: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  },
});
