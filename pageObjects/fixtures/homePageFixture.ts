import { test as baseTest, expect } from '@playwright/test';
import HomePage from '../pages/HomePage';

type HomePageFixture = {
    homePage: HomePage;
};

const test = baseTest.extend<HomePageFixture>({
    homePage: async ({ page }, use) => {
        const homePage = new HomePage(page, 'Home Page');
        await homePage.open('/');
        await use(homePage);
    },
});

export { test, expect };
