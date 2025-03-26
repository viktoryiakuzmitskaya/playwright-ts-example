import { Page, Locator } from '@playwright/test';
import Logger from '../../utils/Logger';

export default class Navigation {
    readonly page: Page;
    readonly headerContentBlockLinks: Locator;

    constructor(page: Page) {
        this.page = page;
        this.headerContentBlockLinks = page.locator('div.Header__ContentBlockLinks');
    }

    async openCategory(linkText: string): Promise<void> {
        const link = this.headerContentBlockLinks.locator(`a:has-text("${linkText}")`);
        Logger.info(`Opening category: "${linkText}"`);
        await link.click();
    }
}