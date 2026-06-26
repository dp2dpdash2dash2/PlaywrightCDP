import { Page, Locator, expect } from '@playwright/test';

/** 
 * LandingPage - Consumer Landing screen
 */
export class LandingPage {
    private readonly page: Page;
    private readonly bannerOnSearchPage: Locator;
    private readonly letterCheckbox: Locator;
    private readonly createButton: Locator;
    private readonly booksLink: Locator;
    private readonly computersLink: Locator;
    private readonly apparelsAndShoesLink:Locator;

    constructor(page: Page) {
        this.page = page;
        this.bannerOnSearchPage = page.locator('a[href="https://academy.tricentis.com"]');
        this.letterCheckbox = page.locator("").first();
        this.createButton = page.locator("").first();
        this.booksLink = page.locator('ul > li > a[href="/books"]').first();
        this.computersLink = page.locator('ul > li > a[href="/books"]');
        this.apparelsAndShoesLink = page.locator('ul > li > a[href="/apparel-shoes"]').first();
    }

    async verifyPageIsLoaded(): Promise<void> {
        await this.page.waitForLoadState('networkidle', {timeout: 30000});
        await this.bannerOnSearchPage.waitFor({state: 'visible', timeout: 30000});
        await expect(this.bannerOnSearchPage).toBeVisible({timeout: 30000});
    }

    async selectLetterCheckbox(): Promise<void> {
        await this.letterCheckbox.waitFor({state: 'visible', timeout: 30000});
        const isLetterCheckboxChecked = await this.letterCheckbox.isChecked();
        if (!isLetterCheckboxChecked){
            await this.letterCheckbox.check();
        }
    }

    async clickBooksLink(): Promise<void> {
        await this.booksLink.waitFor({state: 'visible', timeout: 10000});
        await this.booksLink.click();
    }

    async clickComputersLink(): Promise<void> {
        await this.computersLink.waitFor({state: 'visible', timeout: 10000});
        await this.computersLink.click();
    }

    async clickApparelsAndShoesLink(): Promise<void> {
        await this.apparelsAndShoesLink.waitFor({state: 'visible', timeout: 10000});
        await this.apparelsAndShoesLink.click();
    }

    async clickCreateButton(): Promise<void> {
        await this.createButton.waitFor({state: 'visible', timeout: 10000});
        await this.createButton.click();
    }

}