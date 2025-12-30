import { TestUser } from '../types';

export const testUsers: Record<string, TestUser> = {
  validUser: {
    username: 'testuser',
    password: 'TestPassword123!',
    email: 'test@example.com',
  },
  adminUser: {
    username: 'admin',
    password: 'AdminPassword123!',
    email: 'admin@example.com',
  },
};

export const testUrls = {
  login: '/login',
  dashboard: '/dashboard',
  profile: '/profile',
};
