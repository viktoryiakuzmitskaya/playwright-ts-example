import { Page } from '@playwright/test';
import BasePage from './BasePage';

export default class HomePage extends BasePage {
    constructor(page: Page, name: string) {
        super(page, name);        
    }    
}