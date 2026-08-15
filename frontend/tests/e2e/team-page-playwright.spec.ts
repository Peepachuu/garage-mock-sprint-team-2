import { test, expect, type Page } from '@playwright/test'

const testEmail = "wdgann123321@gmail.com"
const testPassword = "Wdgann123321"


// Reusable Login function 
async function login(page: Page) {

  // If there is no email or password set in the ENV, throw an error
  if (!testEmail || !testPassword) {
    throw new Error(
      'E2E_TEST_EMAIL and E2E_TEST_PASSWORD must be set before running authenticated tests.'
    )
  }

  // Else, go to the signin page
  await page.goto('/auth/signin')

  // fill the email and password
  await page.getByLabel(/email/i).fill(testEmail)
  await page.getByLabel(/password/i).fill(testPassword)

  // Click the sign in button
  await page.getByRole('button', { name: /sign in/i }).click()

  // Expect that the result is the team page
  await expect(page).toHaveURL(/\/team-page$/)

}


// Define test cases 
test.describe('Team-page edge cases', () => {

  // First test: Invalid Login is rejected
  test('invalid login is rejected', async ({ page }) => {
    await page.goto('/auth/signin')

    await page.getByLabel(/email/i).fill('invalid-user@example.com')
    await page.getByLabel(/password/i).fill('definitely-wrong-password')

    await page.getByRole('button', { name: /sign in/i }).click()

    await expect(page).toHaveURL(/\/auth\/signin/)
  })

  // Second test: Checks whether direct team-page access redirects to signin
  test('direct team-page access without login redirects to sign in', async ({
    page,
  }) => {
    await page.goto('/team-page')

    await expect(page).toHaveURL(/\/auth\/signin$/)
  })

  // Third test: Missing team-member photo displays the initials instead
  // test('missing team-member photo displays the team member initials', async ({
  //   page,
  // }) => {

  //   // Simulate sidney's image failing to load
  //   await page.route('**/*', async (route) => {
  //     const url = route.request().url()

  //     // deliberately causing the request to fail 
  //     if (url.includes('zac.jpeg')) {
  //       await route.abort()
  //     } else {
  //       await route.continue()
  //     }
  //   })

  //   // login
  //   await login(page)

  //   // Confirm we reached the team page
  //   await expect(page).toHaveURL(/\/team-page$/)

  //   // Confirm Sidney's initials (SZ) are displayed instead of the photo
  //   await expect(page.getByText('ZC', {exact: true})).toBeVisible()
  // })

  test('missing team-member photo displays the team member initials', async ({
  page,
}) => {
  // Intercept requests before opening the team page
  await page.route('**/*', async (route) => {
    const url = route.request().url()

    // Deliberately cause Chirag's image request to fail
    if (url.includes('zac.jpeg')) {
      await route.abort()
    } else {
      await route.continue()
    }
  })

  // Login
  await login(page)

  // Confirm we reached the team page
  await expect(page).toHaveURL(/\/team-page$/)

  // When the request fails, Chirag's initials should replace the image
  await expect(
    page.getByText('ZC', { exact: true })
  ).toBeVisible()
})


  // Fourth test: Checking if long-blurbs extend the layout instead of breaking the layout
  test('unusually long team-member blurb does not break layout', async ({
    page,
  }) => {
    //login
    await login(page) 
    
    // get the first team member blurb
    const blurb = page.getByTestId('team-member-blurb').first()

    //wait for the program to actually find the blurb
    await expect(blurb).toBeVisible()

    // a long blurb to test
    const longBlurb = 'This is an unusually long team member description used to test whether the team member card correctly handles large amounts of text without breaking the layout. '.repeat(15)

    // replace the original description with this long blurb
    await blurb.evaluate((element, text) => 
      {element.textContent = text},longBlurb)
    

    // ensure that the blurb is visible
    await expect(blurb).toBeVisible()

    //check if the blurb has overflowed horizontally
    const hasHorizontalOverflow = await page.evaluate(() => {
      return (
        document.documentElement.scrollWidth >
        document.documentElement.clientWidth
      )
    })

    // expect that this horizontal overflow is false
    expect(hasHorizontalOverflow).toBe(false)

    // check whether the blurb's length has decreased
    const isTextClipped = await blurb.evaluate((element) => {
      return element.scrollHeight > element.clientHeight
    })

    // expect the length to not be clipped
    expect(isTextClipped).toBe(false)

  })

  

})
