import { Page, Locator, expect } from '@playwright/test';

/**
 * BasePage serves as the foundation for all Page Objects.
 * It encapsulates our explicit wait governance and element resilience strategies
 * to prevent test flakiness beyond standard Playwright auto-waiting.
 */
export class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Resilience Layer: Custom retry-with-backoff mechanism for fragile elements
   * that may suffer from layout shifts or slow rendering.
   */
  async retryAction(action: () => Promise<void>, maxRetries = 3, delayMs = 500) {
    let lastError: Error | null = null;
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        await action();
        return; // Success
      } catch (error) {
        lastError = error as Error;
        if (attempt < maxRetries) {
          await this.page.waitForTimeout(delayMs * attempt); // Incremental backoff
        }
      }
    }
    throw new Error(`Action failed after ${maxRetries} attempts. Last error: ${lastError?.message}`);
  }

  /**
   * Explicit Wait Governance: Custom wait gate to ensure the DOM has completed
   * network-driven animations or transitions before proceeding.
   */
  async waitForDOMStability(locator: Locator, timeout = 5000) {
    // Wait until the element is attached and stable (not moving)
    await locator.waitFor({ state: 'attached', timeout });
    
    // Explicit bounding box stability check (forces waiting for transition CSS animations to end)
    let previousBox = await locator.boundingBox();
    const startTime = Date.now();
    
    while (Date.now() - startTime < timeout) {
      await this.page.waitForTimeout(100);
      const currentBox = await locator.boundingBox();
      if (
        previousBox && currentBox &&
        previousBox.x === currentBox.x &&
        previousBox.y === currentBox.y &&
        previousBox.width === currentBox.width &&
        previousBox.height === currentBox.height
      ) {
        return; // Element coordinates are completely stable
      }
      previousBox = currentBox;
    }
  }
}
