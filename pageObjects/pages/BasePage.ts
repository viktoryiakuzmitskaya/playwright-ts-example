import { Page } from '@playwright/test';
import Navigation from '../components/Navigation';
import Logger from '../../utils/Logger';

export default abstract class BasePage {
    readonly page: Page;
    readonly name: string;
    readonly navigation: Navigation;

    constructor(page: Page, pageName: string) {
        this.page = page;
        this.name = pageName;
        this.navigation = new Navigation(page);
    }

    async open(url: string): Promise<void> {        
        await this.page.goto(url);
        Logger.info(`Opening "${this.name}"`);
    }
}







