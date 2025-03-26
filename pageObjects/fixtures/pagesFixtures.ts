import { test as baseTest } from '@playwright/test';
import HomePage from '../pages/HomePage';
import CategoryPage from '../pages/CategoryPage';

type PagesFixtures = {
    homePage: HomePage;
    categoryPage: CategoryPage;
}

export const test = baseTest.extend<PagesFixtures>({
    homePage: async ({ page }, use) => {
        const homePage = new HomePage(page, 'Home Page');
        await homePage.open('https://shop.by');
        await use(homePage);
    },
    categoryPage: async ({ page }, use) => {
        const categoryPage = new CategoryPage(page, 'Category Page');
        await use(categoryPage); 
    },
});


export { expect } from '@playwright/test';