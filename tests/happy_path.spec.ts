import { test, expect } from '@playwright/test';

/**
 * Happy-path spec (per PM's requirements):
 * "On the deployed URL, test the full happy-path flow: valid login,
 *  redirect to team page, and all required content displaying correctly."
 *
 * TEST_USER must be a real, pre-existing account whose email is already
 * verified in the target environment — set via TEST_USER_EMAIL /
 * TEST_USER_PASSWORD env vars (see .env.example).
 */
const TEST_USER = {
  email: process.env.TEST_USER_EMAIL ?? '',
  password: process.env.TEST_USER_PASSWORD ?? '',
};

test('happy path: valid login redirects to team page with correct content', async ({ page }) => {
  test.skip(!TEST_USER.email || !TEST_USER.password, 'TEST_USER_EMAIL / TEST_USER_PASSWORD not set');

  await page.goto('/auth/signin');

  await page.getByLabel('Email').fill(TEST_USER.email);
  await page.getByLabel('Password').fill(TEST_USER.password);
  await page.getByRole('button', { name: 'Sign in' }).click();

  // Sign-in triggers a server round-trip (session cookie) + full page reload
  // before landing on /team-page, so give this more room than the default
  // 5s assertion timeout.
  await page.waitForURL(/\/team-page$/, { timeout: 15000 });
  await page.waitForLoadState('networkidle');

  // 2. Required content displays correctly
  await expect(page.getByRole('heading', { name: 'Team 2', exact: true })).toBeVisible();
  await expect(
    page.getByText(/Meet Team 2, a group of students working together/)
  ).toBeVisible();

  const members = [
    { name: 'Sidney Zeng', role: 'PROJECT MANAGER', initials: 'SZ' },
    { name: 'Ahmed Falulur Rahuman', role: 'BUSINESS ANALYST', initials: 'AR' },
    { name: 'Zac Clarkson', role: 'UX Designer', initials: 'ZC' },
    { name: 'Zafir Hasan', role: 'DEVELOPER', initials: 'ZH' },
    { name: 'Chirag Wadehra', role: 'DEVELOPER', initials: 'CW' },
  ];

  for (const member of members) {
    const heading = page.getByRole('heading', { name: member.name });
    await expect(heading).toBeVisible();

    // Scope role/initials checks to this member's row so duplicate role
    // text ("DEVELOPER" appears twice) can't accidentally match someone else.
    const row = page.locator('div', { has: heading }).last();
    await expect(row.getByText(member.role, { exact: true })).toBeVisible();
    await expect(row.getByText(member.initials, { exact: true })).toBeVisible();
  }
});