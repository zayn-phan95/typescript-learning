import { Page, Locator } from '@playwright/test';

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

  async getText(selector: string): Promise<string | null> {
    return this.page.textContent(selector);
  }

  async isVisible(selector: string): Promise<boolean> {
    return this.page.isVisible(selector);
  }

  async waitForSelector(selector: string, timeout?: number): Promise<Locator> {
    return this.page.locator(selector).or(this.page.locator('body')); // Update with actual wait logic
  }

  async screenshot(name: string): Promise<Buffer> {
    return this.page.screenshot({ path: `./reports/${name}.png` });
  }
}
