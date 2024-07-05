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

    @when(/^The total basket price should be the sum of the individual item prices$/)
    public async theTotalBasketPriceShouldBeTheSumOfTheIndividualItemPrices():Promise<void> {
        return playwrightExpect(await this.basketDropdownPage.getTotalPrice()).toEqual(await this.basketDropdownPage.sumBasketItemPrices());
    }

    @when(/^I click on the Go to basket button$/)
    public async clickOnTheGoToBasketButton(): Promise<void> {
        return this.basketDropdownPage.clickOnGoToBasket();
    }

    @when(/^I should be navigated to the basket page$/)
    public async shouldBeNavigatedToTheBasketPage(): Promise<void> {
        let url = page.url()
        return playwrightExpect(url).toEqual("https://enotes.pointschool.ru/basket");
    }
}
export = BasketDropdownSteps;