
const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { ProductsPage } = require('../pages/ProductsPage');
const { CartPage } = require('../pages/CartPage');
const { CheckoutPage } = require('../pages/CheckoutPage');

test.describe('Checkout functionality', () => {
     /** @type {import('../pages/ProductsPage').ProductsPage} */
    let productsPage;
    /** @type {import('../pages/LoginPage').LoginPage} */
    let loginPage;
    /** @type {import('../pages/CartPage').CartPage} */
    let cartPage;
    /** @type {import('../pages/CheckoutPage').CheckoutPage} */
    let checkoutPage;


    test.beforeEach(async({ page }) => {
        loginPage = new LoginPage(page);
        productsPage = new ProductsPage(page);
        cartPage = new CartPage(page);
        checkoutPage = new CheckoutPage(page);

        // Step 1: Login
        await loginPage.goto();
        await loginPage.login('standard_user', 'secret_sauce');
        await expect(page).toHaveURL(/inventory/);

    })

    test('User can complete a purchase successfully', async ({ page }) => {
        
        // Step 2: Add a product and open the cart
        await productsPage.addToCart('Sauce Labs Backpack');
        await productsPage.openCart();
        await expect(page).toHaveURL(/cart/);

        // Step 3: Start checkout
        await cartPage.proceedToCheckout();
        await expect(page).toHaveURL(/checkout-step-one/);

        // Step 4: Enter customer information
        await checkoutPage.enterCustomerInfo('Swathi','Tester','600001');

        await checkoutPage.continueToOverview();
        await expect(page).toHaveURL(/checkout-step-two/);

        // Step 5: Check the overview page
       const { totalItems, totalPrice, summaryDetails } =
        await checkoutPage.checkoutOverview();

        expect(totalItems).toBe(1);
        expect(totalPrice).toContain('Total:');

        for (const summaryField of summaryDetails) {
        await expect(summaryField).toBeVisible();
        }

        // Step 6: Finish the purchase
        await checkoutPage.finishCheckout();

        // Step 7: Verify successful order completion
        await expect(page).toHaveURL(/checkout-complete/);
        await expect(checkoutPage.completeHeader).toBeVisible();
    });

    test('Checkout Error Message when FirstName is missing', async({ page }) => {
        await productsPage.addToCart('Sauce Labs Backpack');
        await productsPage.openCart();

        await cartPage.checkSelectedItemCart('Sauce Labs Backpack');
        await cartPage.proceedToCheckout();

        await checkoutPage.enterCustomerInfo('','Tester','600043');
        await checkoutPage.continueToOverview();

        // Validate error message
        await expect(checkoutPage.errorMessage).toBeVisible();
        await expect(checkoutPage.errorMessage).toContainText('First Name is required');

        await expect(page).toHaveURL('/checkout-step-one.html')
    });

    test.only('Checkout Cancel should return to the Products Page', async({ page })=> {
        await productsPage.addToCart('Sauce Labs Bike Light');
        await productsPage.openCart();

        await cartPage.checkSelectedItemCart('Sauce Labs Bike Light');
        await cartPage.proceedToCheckout();

        await checkoutPage.enterCustomerInfo('Tester','Pro','654321');
        await checkoutPage.continueToOverview();

        const {totalItems, totalPrice, summaryDetails} = await checkoutPage.checkoutOverview();
        expect(totalItems).toBe(1);
        expect(totalPrice).toContain('Total: ');
        for(const summaryField of summaryDetails)
        {
            expect(summaryField).toBeVisible();
        }

        //Validate the user navigated to Checkout 2 page and click Cancel
        await expect(page).toHaveURL(/checkout-step-two/);
        await checkoutPage.cancelCheckout();
        expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");

        
    })

})
