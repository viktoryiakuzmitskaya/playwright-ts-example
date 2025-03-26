import { Locator } from '@playwright/test';
import Logger from '../../utils/Logger';

export default class ProductCard {
    readonly root: Locator;
    readonly title: Locator;
    readonly price: Locator;
    readonly photo: Locator;

    constructor(root: Locator) {
        this.root = root;
        this.title = root.locator('span.ModelList__NameBlock');
        this.price = root.locator('span.PriceBlock__PriceValue');
        this.photo = root.locator('img[alt*="фото"]');
    }

    async getTitle(): Promise<string> {
        const titleText = await this.title.textContent();
        Logger.debug(`Product title: "${titleText}"`);
        return titleText || '';
    }

    async getPrice(): Promise<number> {
        const priceText = await this.price.textContent();
        Logger.debug(`Raw product price text: "${priceText}"`);
        const price = parseFloat(priceText?.replace('от', '').replace(/\s|р\./g, '').replace(',', '.') || '0');
        Logger.debug(`Parsed product price as number: ${price}`);    
        return price;
    }

}