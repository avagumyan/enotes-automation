import {binding, when} from "cucumber-tsflow";
import {page} from "../../world";
import {config} from "../../config";
import {LoginPage} from "../../pages/authorization/login-page";

@binding()
class LoginSteps{
    private loginPage = new LoginPage(page);

    @when(/^I open Enotes login page$/)
    public async openEnotesLoginPage():Promise<void> {
        await page.goto(config.BASE_URL);
    }

    @when(/^I login to Shop using "([^"]*)" account credentials$/)
    public async loginToShopUsingAccountCredentials(
        username: string
    ): Promise<void> {
        return this.loginPage.loginToShop(username);
    }
}
export = LoginSteps