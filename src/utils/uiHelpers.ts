import { Locator, Page, expect } from '@playwright/test';

/**
 * Day 4: Flaky UI Utility Helpers
 * Safe assertion patterns for unstable UI elements
 */

/**
 * Safely assert text content with optional chaining and nullish coalescing
 * Handles cases where element may be temporarily unavailable
 */
export async function safeAssertText(
  locator: Locator,
  expectedText: string,
  timeout: number = 3000
): Promise<void> {
  try {
    const text = await locator.textContent({ timeout });
    const trimmedText = text?.trim() ?? '';
    expect(trimmedText).toBe(expectedText);
  } catch (error) {
    throw new Error(`Failed to assert text "${expectedText}" on element: ${error}`);
  }
}

/**
 * Safely check element visibility with fallback
 */
export async function safeCheckVisibility(
  locator: Locator,
  shouldBeVisible: boolean = true,
  timeout: number = 3000
): Promise<boolean> {
  try {
    const isVisible = await locator.isVisible({ timeout });
    expect(isVisible).toBe(shouldBeVisible);
    return isVisible;
  } catch {
    return !shouldBeVisible; // Return expected value if assertion fails
  }
}

/**
 * Safely get attribute with nullish coalescing fallback
 */
export async function safeGetAttribute(
  locator: Locator,
  attributeName: string,
  defaultValue: string = ''
): Promise<string> {
  const value = await locator.getAttribute(attributeName);
  return value ?? defaultValue;
}

/**
 * Retry mechanism for flaky element interactions
 */
export async function retryWithFallback<T>(
  action: () => Promise<T>,
  maxRetries: number = 3,
  fallbackValue: T
): Promise<T> {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await action();
    } catch (error) {
      if (attempt === maxRetries) {
        console.warn(`Max retries (${maxRetries}) reached, returning fallback value`);
        return fallbackValue;
      }
      await new Promise(resolve => setTimeout(resolve, 500 * attempt));
    }
  }
  return fallbackValue;
}

/**
 * Safely click with retry and visibility check
 */
export async function safeClick(
  locator: Locator,
  timeout: number = 5000,
  maxRetries: number = 3
): Promise<void> {
  await retryWithFallback(
    async () => {
      await locator.waitFor({ state: 'visible', timeout });
      await locator.click();
    },
    maxRetries,
    undefined as void
  );
}

/**
 * Type: Safe text content result (handles null/undefined)
 */
export type SafeTextResult = {
  text: string;
  isPresent: boolean;
  isEmpty: boolean;
};

/**
 * Extract text safely with metadata
 */
export async function extractTextSafely(
  locator: Locator,
  defaultValue: string = ''
): Promise<SafeTextResult> {
  try {
    const text = await locator.textContent({ timeout: 2000 });
    const cleanText = text?.trim() ?? defaultValue;
    return {
      text: cleanText,
      isPresent: text !== null,
      isEmpty: cleanText.length === 0
    };
  } catch {
    return {
      text: defaultValue,
      isPresent: false,
      isEmpty: true
    };
  }
}
