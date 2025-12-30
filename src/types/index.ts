/**
 * Day 2: Type Modeling
 * Demonstrates interface vs type distinction with readonly and literal types
 */

/**
 * Interface: Use for object contracts and extensibility
 * Readonly: Prevents mutation, ensures immutability at compile time
 */
export interface TestUser {
  readonly username: string;
  readonly password: string;
  readonly email: string;
  readonly role?: 'admin' | 'user' | 'guest';
}

/**
 * Type alias: More flexible, better for union types and primitives
 * LoginCredentials: Minimal subset for authentication workflows
 */
export type LoginCredentials = {
  readonly username: string;
  readonly password: string;
};

/**
 * Union type: Represents different authentication states
 */
export type AuthState = 'authenticated' | 'unauthenticated' | 'expired' | 'blocked';

/**
 * Intersection type: Combines TestUser with admin-specific permissions
 */
export type AdminUser = TestUser & {
  readonly permissions: readonly string[];
  readonly department: string;
};

export interface TestConfig {
  readonly baseUrl: string;
  readonly timeout: number;
  readonly headless: boolean;
}

export interface ApiResponse {
  readonly status: number;
  readonly body: Record<string, unknown>;
}
