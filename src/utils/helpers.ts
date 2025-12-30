import { Page } from '@playwright/test';

export class TestHelpers {
  static async delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  static async waitForNavigation(page: Page, callback: () => Promise<void>): Promise<void> {
    await Promise.all([
      page.waitForNavigation(),
      callback(),
    ]);
  }

  static generateRandomString(length: number): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  static generateEmailAddress(): string {
    const randomString = this.generateRandomString(8);
    return `test_${randomString}@example.com`;
  }
}
