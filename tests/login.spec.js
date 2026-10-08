const {test, expect} = require('@playwright/test')

test('Standard login test - Positive Scenario',async({page})=>{

    // navigate to saucedemo 
    await page.goto("https://www.saucedemo.com");

    await page
        .getByPlaceholder('Username')
        .fill('standard_user');

    await page
        .getByPlaceholder('Password')
        .fill('secret_sauce');

    await page
        .getByRole('button', { name: 'Login' })
        .click();

    // assert successful login lands here
    await expect(page).toHaveURL(/inventory/);
})