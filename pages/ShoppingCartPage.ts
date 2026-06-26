import { Page, Locator, expect } from '@playwright/test';

/** 
 * ShoppingCartPage
 */

export class ShoppingCartPage {
    private readonly page: Page;
    private readonly pageContainer: Locator;
    private readonly countryDropdown: Locator;
    private readonly stateDropdown: Locator;
    private readonly zipCode: Locator;
    private readonly termsOfServiceCheckbox: Locator;
    private readonly checkoutButton: Locator;
    private readonly termOfServiceModal: Locator;
    private readonly checkoutAsGuestButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.pageContainer = page.locator('.page-title > h1:has-text("Shopping cart")');
        this.countryDropdown = page.locator('select[class="country-input"]');
        this.stateDropdown = page.locator('select[class="state-input"]');
        this.zipCode = page.locator('#ZipPostalCode');
        this.termsOfServiceCheckbox = page.locator('input[id="termsofservice"][type="checkbox"]');
        this.checkoutButton = page.locator('button[type="submit"][name="checkout"]');
        this.termOfServiceModal = page.locator('button[title="close"]');
        this.checkoutAsGuestButton = page.locator('input[type="button"][value="Checkout as Guest"]');
    }

    async verifyPageIsLoaded(): Promise<void> {
            await this.page.waitForLoadState('networkidle', {timeout: 30000});
            await expect(this.pageContainer).toBeVisible({timeout: 30000});
        }
    
    async selectCountryFromDropdownMenu(country: string) : Promise<void> {
        await this.countryDropdown.waitFor({state: 'visible', timeout: 10000});
        await this.countryDropdown.selectOption({ label: country });
    }

    async selectStateFromDropdownMenu(state: string) : Promise<void> {
        await this.stateDropdown.waitFor({state: 'visible', timeout: 10000});
        await this.stateDropdown.selectOption({ label: state });
    }

    async enterZipcode(zipCode: string) : Promise<void> {
        await this.zipCode.waitFor({state: 'visible', timeout: 10000});
        await this.zipCode.clear();
        await this.zipCode.fill(zipCode);
    }

    async selectTermsOfServicesCheckbox(): Promise<void> {
        await this.termsOfServiceCheckbox.waitFor({state: 'visible', timeout: 10000});
        await this.termsOfServiceCheckbox.check();
    }

    async clickCheckoutButton(): Promise<void> {
        await this.checkoutButton.waitFor({state: 'visible', timeout: 10000});
        await this.checkoutButton.click();
        if(await this.termOfServiceModal.isVisible()) {
            this.termOfServiceModal.click();
            this.termsOfServiceCheckbox.check();
            this.checkoutButton.click();
        }
    }

    async clickCheckoutAsGuestButton(): Promise<void> {
        await this.checkoutAsGuestButton.waitFor({state: 'visible', timeout: 10000});
        await this.checkoutAsGuestButton.click();
    }
}

