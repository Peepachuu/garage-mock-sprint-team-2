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

  // Wait for real content instead of "networkidle" (unreliable — many apps
  // never go fully network-idle due to polling/analytics/etc). Waiting for
  // the heading itself is the actual thing we care about being ready.
  await expect(page.getByRole('heading', { name: 'Team 2', exact: true })).toBeVisible({ timeout: 15000 });
  await expect(
    page.getByText(/Meet Team 2, a group of students working together/)
  ).toBeVisible();

  const members = [
    { name: 'Sidney Zeng', role: 'PROJECT MANAGER' },
    { name: 'Ahmed Falulur Rahuman', role: 'BUSINESS ANALYST' },
    { name: 'Zac Clarkson', role: 'UX Designer' },
    { name: 'Zafir Hasan', role: 'DEVELOPER' },
    { name: 'Chirag Wadehra', role: 'DEVELOPER' },
  ];

  for (const member of members) {
    const heading = page.getByRole('heading', { name: member.name });
    await expect(heading).toBeVisible();

    // Position-based .first()/.last() alone is unreliable here — the heading
    // has several matching ancestor <div>s (page wrapper > card > row > text
    // column), and which one is "correct" depends on exact nesting depth.
    // Instead, require the div to contain BOTH the heading and this member's
    // own image, then take the innermost (.last()) match satisfying both —
    // that's reliably this member's row, regardless of wrapper depth.
    const row = page
      .locator('div', { has: heading })
      .filter({ has: page.getByRole('img', { name: `${member.name} profile` }) })
      .last();
    await expect(row.getByText(member.role, { exact: true })).toBeVisible();

    // TeamMemberCard shows the member's photo when it loads successfully,
    // and only falls back to initials text if the image fails to load.
    // Asserting the image (via its alt text) is the correct "normal path" check.
    await expect(row.getByRole('img', { name: `${member.name} profile` })).toBeVisible();
  }
});