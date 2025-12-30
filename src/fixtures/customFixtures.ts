import { test as base } from '@playwright/test';
import { Logger } from '@utils/logger';

type CustomFixtures = {
  logger: Logger;
};

export const test = base.extend<CustomFixtures>({
  logger: async ({}, use) => {
    Logger.info('Test started');
    await use(Logger);
    Logger.info('Test completed');
  },
});

export { expect } from '@playwright/test';
