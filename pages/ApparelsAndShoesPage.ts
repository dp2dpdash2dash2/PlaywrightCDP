import { Page, Locator, expect } from '@playwright/test';

/** 
 * ApparelsAndShoesPage
 */

export class ApparelsAndShoesPage {
    private readonly page: Page;
    private readonly pageContainer: Locator;

    constructor(page: Page) {
        this.page = page;
        this.pageContainer = page.locator('.page-title > h1:has-text("Apparel & Shoes")');
    }

    async verifyPageIsLoaded(): Promise<void> {
            await this.page.waitForLoadState('networkidle', {timeout: 30000});
            await expect(this.pageContainer).toBeVisible({timeout: 30000});
        }
    
    async selectItem(item: string): Promise<void> {
        if(await this.page.locator('.product-grid .item-box .product-title a[href]').filter({hasText: item}).first().isVisible()) {
            const productLink = this.page.locator('.product-grid .item-box .product-title a[href]').filter({hasText: item}).first();
            await productLink.waitFor({ state: 'visible', timeout: 10000 });
            await productLink.click();
        }
        
    }
}

