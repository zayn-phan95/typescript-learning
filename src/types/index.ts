export interface TestUser {
  username: string;
  password: string;
  email: string;
}

export interface TestConfig {
  baseUrl: string;
  timeout: number;
  headless: boolean;
}

export interface ApiResponse {
  status: number;
  body: Record<string, unknown>;
}
