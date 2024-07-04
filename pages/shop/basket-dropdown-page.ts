import {Page} from "playwright";
import {Locator} from "@playwright/test";

export class BasketDropdownPage{
    constructor(private page:Page){
    }

    private basketItemsList = this.page.locator('.list-group');

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
}