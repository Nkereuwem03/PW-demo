import { test, expect } from '@playwright/test';

test("Positive Login Test", async ({ page }) => {
    // Step1: Navigate to the login page
    await page.goto('https://practicetestautomation.com/practice-test-login/')

    // Step2: Fill in the username
    await page.locator('#username').fill('student')

    // Step3: Fill in the password
    await page.locator('#password').fill('Password123')

    // Step4: Click the login button
    await page.locator('#submit').click()

    // Step5: Verify new page URL contains practicetestautomation.com/logged-in-successfully/
    await expect(page).toHaveURL(/.*practicetestautomation.com\/logged-in-successfully\//)

    // Step6: Verify new page contains expected text ('Congratulations' or 'successfully logged in')
    await expect(page.locator('body')).toContainText(/Congratulations|successfully logged in/i)

    // Step7: Verify button Log out is displayed on the new page
    await expect(page.locator('a.wp-block-button__link')).toBeVisible()
})

test("Negative Login Test", async ({ page }) => {
    // Step1: Navigate to the login page
    await page.goto('https://practicetestautomation.com/practice-test-login/')

    // Step2: Fill in the username with incorrect value
    await page.locator('#username').fill('incorrectUser')

    // Step3: Fill in the password with incorrect value
    await page.locator('#password').fill('Password123')

    // Step4: Click the login button
    await page.locator('#submit').click()

    // Step5: Verify error message is displayed
    await expect(page.locator('#error')).toBeVisible()

    // Step6: Verify error message contains expected text ('Your username is invalid!' or similar)
    await expect(page.locator('#error')).toContainText(/Your username is invalid!/i)
})