import { test, expect, Page, Locator } from '@playwright/test';
import { testUsers } from '@config/testData';
import { testUrls } from '@config/testData';
import { TestUser, LoginCredentials } from '@types';

/**
 * Day 6: Test Refactoring
 * Apply TypeScript concepts to real tests using typed test data
 * Demonstrates: Typed test data, no `any`, clear assertions, reusable patterns
 */

test.describe('Basic Authentication Tests - Refactored with Type Safety', () => {
  /**
   * Typed selector interface for better maintainability
   */
  interface LoginPageElements {
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly errorAlert: Locator;
    readonly successMessage: Locator;
  }

  /**
   * Factory to create typed element references
   * Ensures all selectors are centralized and strongly typed
   */
  function createPageElements(page: Page): LoginPageElements {
    return {
      usernameInput: page.locator('input[name="username"]'),
      passwordInput: page.locator('input[name="password"]'),
      loginButton: page.locator('button[type="submit"]'),
      errorAlert: page.locator('[data-testid="error-alert"]'),
      successMessage: page.locator('[data-testid="success-message"]'),
    };
  }

  /**
   * Helper to perform login using typed LoginCredentials
   * Encapsulates login workflow with proper type safety
   */
  async function performLogin(
    elements: LoginPageElements,
    credentials: LoginCredentials
  ): Promise<void> {
    await elements.usernameInput.fill(credentials.username);
    await elements.passwordInput.fill(credentials.password);
    await elements.loginButton.click();
  }

  test.beforeEach(async ({ page }) => {
    // Navigate to login page before each test
    await page.goto(testUrls.login);
  });

  /**
   * Test 1: Valid user login with typed TestUser data
   * Demonstrates usage of typed test data from testUsers configuration
   */
  test('should successfully login with valid testUser credentials', async ({ page }) => {
    // Get typed test user from configuration
    const validUser: TestUser = testUsers.validUser;
    const credentials: LoginCredentials = {
      username: validUser.username,
      password: validUser.password,
    };

    // Create typed page elements
    const elements = createPageElements(page);

    // Perform login with typed credentials
    await performLogin(elements, credentials);

    // Assert successful navigation with proper URL matching
    await page.waitForURL(new RegExp(testUrls.dashboard));
    expect(page.url()).toContain(testUrls.dashboard);

    // Verify success message exists (safe null handling)
    const successText = await elements.successMessage.textContent();
    expect(successText?.trim()).toBeTruthy();
  });

  /**
   * Test 2: Invalid credentials error handling with typed data
   * Demonstrates proper error assertion without magic strings
   */
  test('should display error message with invalid credentials', async ({ page }) => {
    // Use typed credentials for invalid login
    const invalidCredentials: LoginCredentials = {
      username: 'invalid.user@example.com',
      password: 'WrongPassword123!',
    };

    const elements = createPageElements(page);

    // Attempt login with invalid credentials
    await performLogin(elements, invalidCredentials);

    // Assert error message appears with safe null handling
    await expect(elements.errorAlert).toBeVisible();
    const errorText = await elements.errorAlert.textContent();
    const trimmedError = errorText?.trim() ?? '';

    expect(trimmedError).toContain('Invalid credentials');
    expect(trimmedError.length).toBeGreaterThan(0);
  });

  /**
   * Test 3: Admin user login with typed TestUser interface
   * Demonstrates using specific typed user from testUsers configuration
   */
  test('should login admin user and verify admin dashboard access', async ({ page }) => {
    // Get typed admin user
    const adminUser: TestUser = testUsers.adminUser;
    const adminCredentials: LoginCredentials = {
      username: adminUser.username,
      password: adminUser.password,
    };

    const elements = createPageElements(page);

    // Login with admin credentials
    await performLogin(elements, adminCredentials);

    // Navigate to admin dashboard after successful login
    await page.waitForURL(new RegExp(testUrls.dashboard));

    // Verify admin-specific content or role (safe attribute access)
    const userRoleAttr = await page.locator('[data-user-role]').getAttribute('data-user-role');
    const userRole = userRoleAttr ?? 'guest';

    expect(userRole).toBe('admin');
    expect(page.url()).toContain(testUrls.dashboard);
  });
});

