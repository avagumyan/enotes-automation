import {Page} from "playwright";
import {Locator} from "@playwright/test";

export class ShopHomepagePage{
    constructor(private page:Page){
    }

    private basketItemsCountLocator = this.page.locator('.basket-count-items');
    private basketIcon = this.page.locator('#dropdownBasket');

    /**
     * This method returns the shop item block
     * @param itemName - name of the item
     * @private
     */
    private async getItemBlock(itemName:string):Promise<Locator>{
        await this.page.locator('.product_name',{hasText:itemName}).waitFor({state:"visible"});
        let itemNameLocator = this.page.locator('.product_name',{hasText:itemName});
        return this.page.locator('.note-item',{has:itemNameLocator});
    }

    /**
     * This method fills given value in the item quantity field in shop
     * @param quantity - quantity to fill
     * @param itemName - the name of the item
     */
    public async fillItemQuantity(quantity:number,itemName:string){
        let itemBlock = await this.getItemBlock(itemName);
        return itemBlock.locator('[name="product-enter-count"]').fill(quantity.toString());
    }

    /**
     * This method clicks on the buy button of the item
     * @param itemName - the name of the item
     */
    public async clickBuyItem(itemName:string):Promise<void>{
        let itemBlock = await this.getItemBlock(itemName);
        return itemBlock.locator('.actionBuyProduct').click();
    }

    /**
     * This method returns items count in the basket
     */
    public async getBasketItemsCount():Promise<number>{
        let count = await this.basketItemsCountLocator.innerText();
        return parseInt(count,10);
    }

    public async clickOnTheBasket():Promise<void>{

    }
}