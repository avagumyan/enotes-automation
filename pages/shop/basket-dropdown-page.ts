import {Page} from "playwright";
import {Locator} from "@playwright/test";

export class BasketDropdownPage{
    constructor(private page:Page){
    }

    private basketItemsList = this.page.locator('.list-group');
    private basketPrice = this.page.locator('.basket_price');
    private goToBasket = this.page.locator('[aria-labelledby="dropdownBasket"]').locator('.btn-primary');

    /**
     * This method returns the list of items in basket with price and count
     */
    public async getBasketItemsList(): Promise<Array<Array<string>>> {
        let allItemsArray: Array<Array<string>> = [];

        const basketItems: Locator[] = await this.basketItemsList.locator('li').all();

        for (const item of basketItems) {
            let itemArray: string[] = [];

            const itemTitle = await item.locator('.basket-item-title').textContent();
            const itemPrice = await item.locator('.basket-item-price').textContent();
            const itemCount = await item.locator('.basket-item-count').textContent();
            itemArray.push(itemTitle ? itemTitle.trim() : '');
            itemArray.push(itemPrice ? itemPrice.trim() : '');
            itemArray.push(itemCount ? itemCount.trim() : '');

            allItemsArray.push(itemArray);
        }

        return allItemsArray;
    }

    /**
     * This method returns total price of basket
     */
    public async getTotalPrice():Promise<string>{
        const basketPrice = await this.basketPrice.textContent();
        if(basketPrice == null){
            throw new Error('Basket price is not visible');
        }
        return basketPrice;
    }

    /**
     * This method sums all items prices in basket and returns total
     */
    public async sumBasketItemPrices():Promise<string>{
        const basketItemsPrices: Locator[] = await this.basketItemsList.locator('.basket-item-price').all();

        let total = 0;

        for (const item of basketItemsPrices) {
            const priceText = await item.textContent();
            if (priceText) {
                const match = priceText.match(/(\d+)/);
                if (match) {
                    total += parseInt(match[1], 10);
                } else {
                    console.error('Unable to extract numeric value from basket item price:', priceText);
                }
            } else {
                console.error('Basket item price is not visible or empty');
            }
        }
        return total.toString();
    }

    /**
     * This method clicks on go to basket button
     */
    public async clickOnGoToBasket():Promise<void>{
        return this.goToBasket.click();
    }
}