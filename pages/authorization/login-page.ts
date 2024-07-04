import {Page} from "playwright";
import userJson from '../../accounts.json'

export class LoginPage {
    constructor(private page:Page){
    }

    private loginInput = this.page.locator('#loginform-username');
    private passwordInput = this.page.locator('#loginform-password');
    private loginButton = this.page.locator('[name="login-button"]');

    /**
     * This method is used to log in into shop
     * @param username - username of the account
     */
    public async loginToShop(username: string) {

        await this.loginButton.waitFor({state:"visible"})
        await this.loginInput.type(userJson[username].login,{delay:50});
        await this.passwordInput.type(userJson[username].password,{delay:50});
        return this.loginButton.click();
    }
}