import { Page, Locator } from '@playwright/test';

/**
 * Day 4: Flaky UI Handling
 * Enhanced with optional chaining (?.), nullish coalescing (??), and strictNullChecks
 */
export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateTo(url: string): Promise<void> {
    await this.page.goto(url);
  }

  async click(selector: string): Promise<void> {
    await this.page.click(selector);
  }

  async fill(selector: string, value: string): Promise<void> {
    await this.page.fill(selector, value);
  }

  /**
   * Safely reads text from element with fallback default value
   * Uses optional chaining (?.) and nullish coalescing (??) to handle unstable UI
   */
  async getText(selector: string, defaultValue: string = ''): Promise<string> {
    const text = await this.page.textContent(selector);
    return text?.trim() ?? defaultValue;
  }

  /**
   * Safely reads text from locator, handling null/undefined
   */
  async getLocatorText(locator: Locator, defaultValue: string = ''): Promise<string> {
    const text = await locator.textContent();
    return text?.trim() ?? defaultValue;
  }

  /**
   * Safely gets attribute value with fallback
   */
  async getAttribute(selector: string, attribute: string, defaultValue: string = ''): Promise<string> {
    const value = await this.page.getAttribute(selector, attribute);
    return value ?? defaultValue;
  }

  async isVisible(selector: string): Promise<boolean> {
    return this.page.isVisible(selector).catch(() => false);
  }

  /**
   * Wait for element with timeout handling
   */
  async waitForElement(selector: string, timeout: number = 5000): Promise<Locator | null> {
    try {
      const locator = this.page.locator(selector);
      await locator.waitFor({ timeout, state: 'visible' });
      return locator;
    } catch {
      return null;
    }
  }

  async screenshot(name: string): Promise<Buffer> {
    return this.page.screenshot({ path: `./reports/${name}.png` });
  }
}
