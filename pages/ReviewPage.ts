import { Page, Locator, expect } from '@playwright/test';

/** 
 * ReviewPage
 */

export class ReviewPage {
    private readonly page: Page;
    private readonly pageContainer: Locator;
    private readonly quantity: Locator;
    private readonly addToCartButton: Locator;
    private readonly addedToCartNotification: Locator;
    private readonly shoppingCartLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.pageContainer = page.locator('.breadcrumb > ul > li strong');
        this.quantity = page.locator('[class="qty-input"]');
        this.addToCartButton = page.locator('div[class="add-to-cart"] > div > input[type="button"][value="Add to cart"]');
        this.addedToCartNotification = page.locator('#bar-notification');
        this.shoppingCartLink = page.locator('.ico-cart').first();
    }

    async verifyPageIsLoaded(): Promise<void> {
            await this.page.waitForLoadState('networkidle', {timeout: 30000});
            await expect(this.pageContainer).toBeVisible({timeout: 30000});
        }

    async enterQuantityOfItem(qty: string): Promise<void> {
        await this.quantity.waitFor({state: 'visible', timeout: 10000});
        await this.quantity.clear();
        await this.quantity.fill(qty);
    }

    async clickAddToCartButton(): Promise<void> {
        await this.addToCartButton.waitFor({state: 'visible', timeout: 10000});
        await this.addToCartButton.click();
    }

    async itemAddedToCartMessageIsDisplayed(): Promise<void> {
        await this.addedToCartNotification.waitFor({state: 'visible', timeout: 10000});
    }

    async clickShoppingCartLink(): Promise<void> {
        await this.shoppingCartLink.waitFor({state: 'visible', timeout: 10000});
        await this.shoppingCartLink.click();
    }

    // async verifyOrderNumberIsGeneratedAndGetOrderNumber(): Promise<string> {
    //     await this.orderNumberContainer.waitFor({state: 'visible', timeout: 5000});
    //     const orderNumber = await this.orderNumberContainer.textContent();
    //     const cleanedorderNumber = orderNumber?.trim() ?? '';
    //     expect (cleanedorderNumber, "Should not be empty").toBeTruthy();
    //     expect (cleanedorderNumber.length, "should have content").toBeGreaterThan(0);
    //     return cleanedorderNumber;
    // }


}

