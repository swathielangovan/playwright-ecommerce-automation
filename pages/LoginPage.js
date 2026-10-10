class LoginPage{
    constructor(page)
    {
        this.page = page;
        this.usernameField = page.getByPlaceholder('Username');
        this.passwordField = page.getByPlaceholder('Password');
        this.loginBtn = page.getByRole("button",{name: 'Login'});
    }

    // Navigate to base saucedemo url
    async goto(){
        await this.page.goto('/');
    }

    // to login using given cred
    async login(username, password) {
        await this.usernameField.fill(username);
        await this.passwordField.fill(password);
        await this.loginBtn.click();
    }
}module.exports = { LoginPage };