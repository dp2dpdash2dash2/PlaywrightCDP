import { Page, Locator } from '@playwright/test';

/** 
 * SearchPage - Consumer Search screen * Handles SSN entry and triggering the search
 */

export class SearchPage {
    private readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigateToApplication(url: string): Promise<void> {
    // [SearchPage] Navigating to: $(url)
    await this.page.goto(url, { waitUntil: 'networkidle' });
    }
}

