class ProductsPage {
    constructor(page)
    {
        this.page = page;
        this.cartLink = page.locator('.shopping_cart_container');
    }

    // method to add products to cart
    async addToCart(productName)
    {
        const product = this.page.locator('.inventory_item')
                                    .filter({hasText: productName});

        await product.getByRole('button', {name: 'Add to cart'}).click();
    }

    // method to open cart section
    async openCart()
    {
        this.cartLink.click();
    }

}
module.exports = {ProductsPage}