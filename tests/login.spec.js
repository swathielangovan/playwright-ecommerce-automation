const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { loginData } = require('../test-data/logindata');

test('standard user can login successfully', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(loginData.validUsername, loginData.validPassword);

    await expect(page).toHaveURL(/inventory/);
});