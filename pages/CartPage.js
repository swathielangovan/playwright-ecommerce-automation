class CartPage{
    constructor(page) {
        this.page = page;

        // to locate a single cart item
        this.item = page.locator('.cart_item_label')

        //Locate all the products in cart
        this.cartItems = page.locator('.cart_item');

        // Locator for cart page title
        this.cartTitle = page.getByText('Your Cart',{exact:true});

        this.checkOutBtn = page.getByRole('button', {name: 'Checkout'});
    }

    // Verify that selected product is displayed in cart
    async checkSelectedItemCart(productName)
    {
        const cartItem = this.item.filter({hasText: productName});
        
        await cartItem.waitFor({state: 'visible'});
    }

    // return the number of prod in cart
    async getCartQuantity() {
        // Locate the cart list and get the quantity
        const cartQuantity = await this.cartItems.count();
        return cartQuantity;
    }

    async proceedToCheckout() {
        await this.checkOutBtn.click();
    }

    async proceedToRemove(productName)
    {
        const removeItem = await this.item.filter({hasText: productName});

        await removeItem.getByRole('button', {name: 'Remove'}).click();
    }

} module.exports = {CartPage};
