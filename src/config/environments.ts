import dotenv from 'dotenv';

dotenv.config();

export const config = {
  baseUrl: process.env.BASE_URL || 'http://localhost:3000',
  headless: process.env.HEADLESS !== 'false',
  timeout: parseInt(process.env.TIMEOUT || '30000', 10),
  screenshotOnFailure: process.env.SCREENSHOT_ON_FAILURE === 'true',
};

export default config;
