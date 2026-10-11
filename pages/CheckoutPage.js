
class CheckoutPage {
    constructor(page)
    {
        this.page = page;
        // UI Elements displayed
        this.checkoutPageTitle = page.getByText('Checkout: Your Information', {exact:true});
        this.checkoutInfo = page.locator('.checkout_info');
        this.checkoutBtns = page.locator('.checkout_buttons');

        // Customer Info Fields
        this.firstNameField = page.getByPlaceholder('First Name');
        this.lastNameField = page.getByPlaceholder('Last Name');
        this.zipPostalField = page.getByPlaceholder('Zip/Postal Code');

        // Order confirmation
        this.summaryInfo = page.locator('.summary_info');
        this.completeHeader = page.getByText('Thank you for your order!',{exact:true});

        // Error message in Checkout 2 
        this.errorMessage = page.locator('[data-test="error"]');
        
        // buttons in Checkout-2 Page
        this.cancelCheckoutProducts = page.locator('#cancel');

    }

    async enterCustomerInfo(fName, lName, postalCode) {
        await this.firstNameField.fill(fName);
        await this.lastNameField.fill(lName);
        await this.zipPostalField.fill(postalCode);
    }

    async continueToOverview() {
        await this.checkoutBtns.getByRole('button',{name:'Continue'}).click();
    }

    async clickCancel() {
        await this.checkoutBtns.getByRole('button',{name:'Cancel'}).click();
    }
    
    async checkoutOverview() {
        const cartItemsOverview = this.page.locator('.cart_item');
        const totalItems = await cartItemsOverview.count();

        const totalPriceLocator = this.page.locator('.summary_total_label');
        const totalPrice = await totalPriceLocator.textContent();

        const summaryDetails = [
            this.summaryInfo.getByText('Payment Information:', { exact: true }),
            this.summaryInfo.getByText('Shipping Information:', { exact: true }),
            totalPriceLocator
        ];

        return {
            totalItems,
            totalPrice,
            summaryDetails
        };
    }

    async finishCheckout() {
        await this.page.locator('#finish').click();
    }

    async cancelCheckout() {
        await this.cancelCheckoutProducts.click();
    }
} module.exports = {CheckoutPage};