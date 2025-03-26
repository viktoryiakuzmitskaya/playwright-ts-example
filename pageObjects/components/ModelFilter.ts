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
        await this.fillPriceFromInput(from);
        await this.fillPriceToInput(to);
        await this.priceFromInput.press('Tab');
        await this.showProductsButton.click();
        Logger.info('Clicked the "Показать" button');
    }

    async fillPriceFromInput(value: string): Promise<void> {
        await this.priceFromInput.scrollIntoViewIfNeeded();
        await this.priceFromInput.fill(value);
        Logger.info(`Filling "Цена, р., от" input with value: "${value}"`);
    }

    async fillPriceToInput(value: string): Promise<void> {
        await this.priceToInput.fill(value);
        Logger.info(`Filling "Цена, р., до" input with value: "${value}"`);
    }


}