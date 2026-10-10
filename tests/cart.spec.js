const { LoginPage } = require('../pages/LoginPage');
const { CartPage } = require('../pages/CartPage');
const {test, expect} = require('@playwright/test');
const { ProductsPage } = require('../pages/ProductsPage');

test.describe('Shopping Cart functionality', async() => {
    /** @type {import('../pages/ProductsPage').ProductsPage} */
    let productsPage;

    /** @type {import('../pages/LoginPage').LoginPage} */
    let loginPage;
    /** @type {import('../pages/CartPage').CartPage} */
    let cartPage;

    test.beforeEach(async ({page}) => {
            loginPage = new LoginPage(page);
            productsPage = new ProductsPage(page);
            cartPage = new CartPage(page);
        // Perform login and verify products page opened
        await loginPage.goto();
        await loginPage.login('standard_user','secret_sauce');
        await expect(page).toHaveURL(/inventory/);

    })

    test('Add one product to the Cart', async({ page }) => {
        await productsPage.addToCart('Sauce Labs BackPack');

        await productsPage.openCart();

        await expect(page).toHaveURL(/cart/);
        await cartPage.checkSelectedItemCart('Sauce Labs BackPack');
        const noOfItems = await cartPage.getCartQuantity();
        expect(noOfItems).toBe(1);

        await cartPage.proceedToCheckout();
        await expect(page).toHaveURL(/checkout-step-one/);
    })

    test('Remove one product to the Cart', async({ page }) => {
        await productsPage.addToCart('Sauce Labs BackPack');
        await productsPage.openCart();

        expect(page).toHaveURL(/cart/);

        await cartPage.checkSelectedItemCart('Sauce Labs BackPack');
        const countBefore = await cartPage.getCartQuantity();
        expect(countBefore).toBe(1);

        await cartPage.proceedToRemove('Sauce Labs BackPack');
        const countAfter = await cartPage.getCartQuantity();
        expect(countAfter).toBe(0);
        
    })
})