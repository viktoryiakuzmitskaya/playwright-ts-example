import { Page, Locator } from '@playwright/test';
import BasePage from './BasePage';
import ModelFilter from '../components/ModelFilter';
import ProductCard from '../components/ProductCard';
import Sorting from '../components/Sorting';
import Logger from '../../utils/Logger';

export default class CategoryPage extends BasePage {
    readonly categoryTitle: Locator;
    readonly modelFilter: ModelFilter;
    readonly productsList: Locator;
    readonly sorting: Sorting;

    constructor(page: Page, name: string) {
        super(page, name);
        this.categoryTitle = page.locator('h1');
        this.modelFilter = new ModelFilter(page);
        this.productsList = page.locator('div.ModelList__ModelBlockItem');
        this.sorting = new Sorting(page);
    }

    async getAllProductCards(): Promise<ProductCard[]> {
        await this.productsList.first().waitFor();
        const productCount = await this.productsList.count();
        Logger.info(`Found ${productCount} product(s) on the page.`);
        const products: ProductCard[] = [];
        for (let i = 0; i < productCount; i++) {
            products.push(await this.getProductCard(i));
        }
        return products;
    }

    async iterateOverProductCards(
        productCards: ProductCard[],
        callback: (productCard: ProductCard) => Promise<void>
    ): Promise<void> {
        Logger.info(`Iterating over ${productCards.length} product(s).`);
        for (let i = 0; i < productCards.length; i++) {
            Logger.debug(`Processing product card at index: ${i}`);
            const productCard = await this.getProductCard(i);
            await callback(productCard);
        }
    }

    async getProductCard(index: number): Promise<ProductCard> {
        const productLocator = this.productsList.nth(index);
        return new ProductCard(productLocator);
    }

    async getProductsPrices(productCards: ProductCard[]): Promise<number[]> {
        const productCount = productCards.length;
        const prices: number[] = [];
        Logger.info(`Extracting prices from ${productCount} product(s).`);
    
        for (let i = 0; i < productCount; i++) {
            Logger.debug(`Processing product card at index: ${i}`);
            const productCard = await this.getProductCard(i);
            const productPrice = await productCard.getPrice();
            prices.push(productPrice);
        }
    
        Logger.info(`Extracted prices: ${prices.join(', ')}`);
        return prices;
    }
}