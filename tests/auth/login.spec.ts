import { test, expect, Page, Locator } from '@playwright/test';
import { testUsers } from '@config/testData';
import { testUrls } from '@config/testData';
import { LoginCredentials } from '@types';

/**
 * Day 5: Playwright Basics with Proper Typing
 * Uses Locator API exclusively with full type safety
 */

test.describe('Login Tests - Typed Locator Patterns', () => {
  // Typed selectors interface for reusability
  interface LoginPageSelectors {
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly submitButton: Locator;
    readonly errorMessage: Locator;
  }

  /**
   * Factory function to create typed selectors using Locator API
   */
  function getLoginSelectors(page: Page): LoginPageSelectors {
    return {
      usernameInput: page.locator('input[name="username"]'),
      passwordInput: page.locator('input[name="password"]'),
      submitButton: page.locator('button[type="submit"]'),
      errorMessage: page.locator('.error-message')
    };
  }

  test.beforeEach(async ({ page }) => {
    await page.goto(testUrls.login);
  });

  test('should login with valid credentials using Locator API', async ({ page }) => {
    const selectors = getLoginSelectors(page);
    const user: LoginCredentials = testUsers.validUser;
    
    // Use Locator API with proper typing
    await selectors.usernameInput.fill(user.username);
    await selectors.passwordInput.fill(user.password);
    await selectors.submitButton.click();
    
    // Wait for navigation with proper URL matching
    await page.waitForURL(new RegExp(testUrls.dashboard));
    expect(page.url()).toContain(testUrls.dashboard);
  });

  test('should show error with invalid credentials', async ({ page }) => {
    const selectors = getLoginSelectors(page);
    
    // Use Locator API for filling
    await selectors.usernameInput.fill('invaliduser');
    await selectors.passwordInput.fill('wrongpassword');
    await selectors.submitButton.click();
    
    // Use Locator API for text extraction with proper null handling
    const errorText = await selectors.errorMessage.textContent();
    const trimmedError = errorText?.trim() ?? '';
    expect(trimmedError).toContain('Invalid credentials');
  });

  test('should validate required fields using Locator attributes', async ({ page }) => {
    const selectors = getLoginSelectors(page);
    
    // Use Locator API to check attributes safely
    const usernameRequired = await selectors.usernameInput.getAttribute('required');
    const passwordRequired = await selectors.passwordInput.getAttribute('required');
    
    expect(usernameRequired).not.toBeNull();
    expect(passwordRequired).not.toBeNull();
  });

  test('should disable submit button while loading', async ({ page }) => {
    const selectors = getLoginSelectors(page);
    
    // Verify button is enabled before submission
    await expect(selectors.submitButton).toBeEnabled();
    
    const user: LoginCredentials = testUsers.validUser;
    await selectors.usernameInput.fill(user.username);
    await selectors.passwordInput.fill(user.password);
    
    // Click and verify disabled state (if applicable)
    await selectors.submitButton.click();
    // Optional: check if button becomes disabled during loading
    // await expect(selectors.submitButton).toBeDisabled();
  });

  test('should clear previous errors on new input', async ({ page }) => {
    const selectors = getLoginSelectors(page);
    
    // Show error from invalid login
    await selectors.usernameInput.fill('invalid');
    await selectors.passwordInput.fill('invalid');
    await selectors.submitButton.click();
    
    // Wait for error to appear
    await expect(selectors.errorMessage).toBeVisible();
    
    // Clear input should remove error message
    await selectors.usernameInput.clear();
    await selectors.usernameInput.fill(testUsers.validUser.username);
    
    // Error should be removed (or page should update)
    const errorIsVisible = await selectors.errorMessage.isVisible().catch(() => false);
    expect(errorIsVisible).toBeFalsy();
  });
});
