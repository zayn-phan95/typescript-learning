import { test, expect } from '@playwright/test';
import { testUsers } from '@config/testData';
import { testUrls } from '@config/testData';

test.describe('Login Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(testUrls.login);
  });

  test('should login with valid credentials', async ({ page }) => {
    const user = testUsers.validUser;
    
    await page.fill('input[name="username"]', user.username);
    await page.fill('input[name="password"]', user.password);
    await page.click('button[type="submit"]');
    
    await page.waitForURL(`**${testUrls.dashboard}**`);
    expect(page.url()).toContain(testUrls.dashboard);
  });

  test('should show error with invalid credentials', async ({ page }) => {
    await page.fill('input[name="username"]', 'invaliduser');
    await page.fill('input[name="password"]', 'wrongpassword');
    await page.click('button[type="submit"]');
    
    const errorMessage = await page.textContent('.error-message');
    expect(errorMessage).toContain('Invalid credentials');
  });
});
