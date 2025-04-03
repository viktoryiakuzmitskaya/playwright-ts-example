import { test, expect } from '../pageObjects/fixtures/pagesFixtures';

test('should search for smartphones and apply filters', async ({ page, homePage, categoryPage }) => {
    await expect(homePage.page, 'Home page is opened').toHaveURL('/');
    await homePage.navigation.openCategory('Смартфоны');
    await expect(categoryPage.categoryTitle, '"Смартфоны" page is opened').toHaveText('Смартфоны');
    await categoryPage.modelFilter.searchByWordsInName('iPhone');
    const productCards = await categoryPage.getAllProductCards();
    expect(productCards.length, 'List of found products is not empty').toBeGreaterThan(0);
    await categoryPage.iterateOverProductCards(productCards, async (productCard) => {
        await expect(productCard.title, 'Product title is visible').toBeVisible();
        const productTitle = await productCard.getTitle();
        //expect(productTitle, 'Product title contains "iPhone"').toContain('iPhone');
        await expect(productCard.price, 'Product price is visible').toBeVisible();
        await expect(productCard.photo, 'Product photo is visible').toBeVisible();
    });
    await categoryPage.sorting.sortBy('С дешевых');
    const productCardsAfterSorting = await categoryPage.getAllProductCards();
    const pricesAfterSorting = await categoryPage.getProductsPrices(productCardsAfterSorting);
    const isSorted = pricesAfterSorting.every((price, index) => index === 0 || price >= pricesAfterSorting[index - 1]);
    expect(isSorted, 'Prices are sorted in ascending order').toBe(true);
    await categoryPage.modelFilter.searchByPriceRange('6300', '6400');
    const productCardsAfterFiltering = await categoryPage.getAllProductCards();
    const pricesAfterFiltering =  await categoryPage.getProductsPrices(productCardsAfterFiltering);
    const isFiltered = pricesAfterFiltering.every((price) => price >= 6300 && price <= 6400);
    expect(isFiltered, 'Prices are within the specified range').toBe(true);
});