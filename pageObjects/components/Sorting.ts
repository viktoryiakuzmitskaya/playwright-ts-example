import { Page, Locator } from '@playwright/test';
import Logger from '../../utils/Logger';

export default class Sorting {
    readonly page: Page;
    readonly sortLinksContainer: Locator;

    constructor(page: Page) {
        this.page = page;
        this.sortLinksContainer = page.locator('div.PanelSetUp__ModelSortLinks');
    }

    async sortBy(linkText: string): Promise<void> {
        const link = this.sortLinksContainer.locator(`span:has-text("${linkText}")`);
        Logger.info(`Clicking on the sorting link with text: "${linkText}"`);
        await link.click();
    }
}