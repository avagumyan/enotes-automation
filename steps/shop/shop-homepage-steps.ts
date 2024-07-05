import {binding, when} from "cucumber-tsflow";
import {ShopHomepagePage} from "../../pages/shop/shop-homepage-page";
import {page} from "../../world";
import {expect as playwrightExpect} from "@playwright/test";

@binding()
class ShopHomepageSteps{
    private shopHomepagePage = new ShopHomepagePage(page);

    @when(/^I fill (\d+) value in the count field of "([^"]*)" item$/)
    public async fillValueInQuantityFieldOfItem(count:number,itemName:string):Promise<void> {
        return this.shopHomepagePage.fillItemCount(count,itemName);
    }

    @when(/^I click on the buy button of "([^"]*)" item$/)
    public async clickOnBuyButtonOfTheItem(itemName:string):Promise<void> {
        return this.shopHomepagePage.clickBuyItem(itemName);
    }

    @when(/^The basket icon should display (\d+) items$/)
    public async theBasketIconShouldDisplayItems(count:number):Promise<void> {
        return playwrightExpect(await this.shopHomepagePage.getBasketItemsCount()).toEqual(count);
    }

    @when(/^I click on the basket icon$/)
    public async clickOnTheBasketIcon():Promise<void> {
        return this.shopHomepagePage.clickOnTheBasket();
    }

    @when(/^I go to (\d+) page$/)
    public async goToPage(page:number):Promise<void> {
        return this.shopHomepagePage.goToPage(page);
    }
}
export = ShopHomepageSteps