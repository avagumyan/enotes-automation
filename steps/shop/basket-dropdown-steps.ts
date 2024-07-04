import {binding, when} from "cucumber-tsflow";
import {DataTable} from "@cucumber/cucumber";
import {BasketDropdownPage} from "../../pages/shop/basket-dropdown-page";
import {page} from "../../world";
import {expect as playwrightExpect} from "@playwright/test";

@binding()
class BasketDropdownSteps{
    private basketDropdownPage = new BasketDropdownPage(page);

    @when(/^I should see the following items in the basket dropdown$/)
    public async shouldSeeFollowingItemsInTheBasket(basketItems: DataTable): Promise<void> {
        return playwrightExpect(await this.basketDropdownPage.getBasketItemsList()).toEqual(basketItems.raw());
    }
}
export = BasketDropdownSteps;