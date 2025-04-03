import { Page, Locator } from '@playwright/test';
import Logger from '../../utils/Logger';

export default class ModelFilter {
    readonly page: Page;
    readonly wordsInNameInput: Locator;
    readonly priceFromInput: Locator;
    readonly priceToInput: Locator;
    readonly showProductsButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.wordsInNameInput = page.locator('input[id="type_find"]');
        this.priceFromInput = page.locator('input[id="minnum_45"]');
        this.priceToInput = page.locator('input[id="maxnum_45"]');
        this.showProductsButton = page.getByText('Показать', { exact: true });
    }

    async searchByWordsInName(value: string): Promise<void> {
        await this.fillWordsInNameInput(value);
        await this.page.keyboard.press('Enter');
        Logger.info('Pressing "Enter" key');
    }

    async fillWordsInNameInput(value: string): Promise<void> {
        await this.wordsInNameInput.scrollIntoViewIfNeeded();
        await this.wordsInNameInput.fill(value);
        Logger.info(`Filling "Слова в названии" input with value: "${value}"`);
    }

    async searchByPriceRange(from: string, to: string): Promise<void> {
        await this.typeMinPrice(from);
        await this.typeMaxPrice(to);
        await this.showProductsButton.click();
        Logger.info('Clicked the "Показать" button');
    }

    async typeMinPrice(value: string): Promise<void> {
        await this.priceFromInput.scrollIntoViewIfNeeded();
        await this.priceFromInput.pressSequentially(value);
        Logger.info(`Typing "Цена, р., от" in the input with value: "${value}"`);
    }

    async typeMaxPrice(value: string): Promise<void> {
        await this.priceFromInput.scrollIntoViewIfNeeded();
        await this.priceToInput.pressSequentially(value);
        Logger.info(`Typing "Цена, р., до" in the input with value: "${value}"`);
    }


}