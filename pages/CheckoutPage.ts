import { Page, Locator, expect } from '@playwright/test';

/** 
 * CheoutPage
 */

export class CheckoutPage {
    private readonly page: Page;
    private readonly pageContainer: Locator;
    private readonly billingSectionContinueButton: Locator;
    private readonly firstNameRequiredValidationError: Locator;
    private readonly lastNameRequiredValidationError: Locator;
    private readonly emailRequiredValidationError: Locator;
    private readonly countryRequiredValidationError: Locator;
    private readonly cityRequiredValidationError: Locator;
    private readonly streetAddressRequiredValidationError: Locator;
    private readonly zipRequiredValidationError: Locator;
    private readonly phoneRequiredValidationError: Locator;

    constructor(page: Page) {
        this.page = page;
        this.pageContainer = page.locator('.page-title > h1:has-text("Checkout")');
        this.billingSectionContinueButton = page.locator('#billing-buttons-container > input[type="button"][value="Continue"]');
        this.firstNameRequiredValidationError = page.locator('.field-validation-error', { hasText: "First name is required."});
        this.lastNameRequiredValidationError = page.locator('.field-validation-error', { hasText: "Last name is required."});
        this.emailRequiredValidationError = page.locator('.field-validation-error', { hasText: "Email is required."});
        this.countryRequiredValidationError = page.locator('.field-validation-error', { hasText: "Country is required."});
        this.cityRequiredValidationError = page.locator('.field-validation-error', { hasText: "City is required"});
        this.streetAddressRequiredValidationError = page.locator('.field-validation-error', { hasText: "Street address is required"});
        this.zipRequiredValidationError = page.locator('.field-validation-error', { hasText: "Zip / postal code is required"});
        this.phoneRequiredValidationError = page.locator('.field-validation-error', { hasText: "Phone is required"});

    }

    async verifyPageIsLoaded(): Promise<void> {
            await this.page.waitForLoadState('networkidle', {timeout: 30000});
            await expect(this.pageContainer).toBeVisible({timeout: 30000});
        }
    
    async clickBillingSectionContinueButton(): Promise<void> {
        await this.billingSectionContinueButton.waitFor({state: 'visible', timeout: 10000});
        await this.billingSectionContinueButton.click();
    }

    async verifyFirstNameRequiredValidationErrorMessageIsDisplayed(): Promise<void> {
        await this.firstNameRequiredValidationError.waitFor({state: 'visible', timeout: 10000});
    }

    async verifyLastNameRequiredValidationErrorMessageIsDisplayed(): Promise<void> {
        await this.lastNameRequiredValidationError.waitFor({state: 'visible', timeout: 10000});
    }

    async verifyEmailRequiredValidationErrorMessageIsDisplayed(): Promise<void> {
        await this.emailRequiredValidationError.waitFor({state: 'visible', timeout: 10000});
    }

    async verifyCountryRequiredValidationErrorMessageIsDisplayed(): Promise<void> {
        await this.countryRequiredValidationError.waitFor({state: 'visible', timeout: 10000});
    }

    async verifyCityRequiredValidationErrorMessageIsDisplayed(): Promise<void> {
        await this.cityRequiredValidationError.waitFor({state: 'visible', timeout: 10000});
    }

    async verifyStreetAddressRequiredValidationErrorMessageIsDisplayed(): Promise<void> {
        await this.streetAddressRequiredValidationError.waitFor({state: 'visible', timeout: 10000});
    }

    async verifyZipRequiredValidationErrorMessageIsDisplayed(): Promise<void> {
        await this.zipRequiredValidationError.waitFor({state: 'visible', timeout: 10000});
    }

    async verifyPhoneRequiredValidationErrorMessageIsDisplayed(): Promise<void> {
        await this.phoneRequiredValidationError.waitFor({state: 'visible', timeout: 10000});
    }
}

