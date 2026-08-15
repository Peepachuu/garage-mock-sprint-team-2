import { defineConfig, devices } from '@playwright/test';

// Native Node .env loading (Node 20.6+). No dotenv package needed.
try {
  process.loadEnvFile('.env');
} catch {
  // .env not found — fine if vars are already set another way (CI secrets, shell export, etc.)
}

// TEMP DEBUG — remove after confirming values are correct
console.log('DEBUG email:', JSON.stringify(process.env.TEST_USER_EMAIL));
console.log('DEBUG password length:', process.env.TEST_USER_PASSWORD?.length);
console.log('DEBUG password (masked):', process.env.TEST_USER_PASSWORD?.replace(/./g, '*'));

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  retries: 1,
  reporter: 'html',

  use: {
    baseURL: 'https://garage-mock-sprint-team-2-frontend.vercel.app',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',

    // Bypasses Vercel Deployment Protection so the test runner can reach
    // the preview URL. Requires "Protection Bypass for Automation" to be
    // enabled in Vercel > Project Settings > Deployment Protection.
    // TEMP: disabled to test whether this header is breaking a cross-origin
    // auth request via CORS preflight.
    // extraHTTPHeaders: process.env.VERCEL_AUTOMATION_BYPASS_SECRET
    //   ? { 'x-vercel-protection-bypass': process.env.VERCEL_AUTOMATION_BYPASS_SECRET }
    //   : {},
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});