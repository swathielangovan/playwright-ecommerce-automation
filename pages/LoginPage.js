class LoginPage{
    constructor(page)
    {
        this.page = page;

        this.usernameField = page.getByPlaceholder('Username');

        this.passwordField = page.getByPlaceholder('Password');
        this.loginBtn = page.getByRole("button",{name: 'Login'});
    }

    async goto(){
        await this.page.goto('/');
    }

    async login() {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginBtn.click();
    }
}module.exports = { LoginPage };