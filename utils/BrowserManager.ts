import { chromium, Browser, BrowserContext, Page } from '@playwright/test';

/**
 * BrowserManaer - Manages connection to an already-running Chrome instance
 * via the Chrome DevTools Protocal (CDP) on the remote debugging port.
 * Additionally, helps create a fully isolated BrowserContext which is generally used for parallel test runs
 */
export class BrowserManager {
    private static browser: Browser | null = null;
    private static context: BrowserContext | null = null;
    private static page: Page | null = null;

    /**
     * Manages connection to an already-running Chrome instance
     * via the Chrome DevTools Protocal (CDP) on the remote debugging port.
     * used for serial test runs
     */
    static async connectToRemoteBrowser(cdpUrl: string = 'http://localhost:9222'): Promise<Page> {
        this.browser = await chromium.connectOverCDP(cdpUrl);
        this.context = this.browser.contexts()[0];
        this.page = this.context.pages()[0];
        return this.page;
    }

    /**
     * BrowserManaer - create a fully isolated BrowserContext which is generally used for parallel test runs
     */
    static async createIsolatedPage(cdpUrl: string = 'http://localhost:9222'): Promise<{ context: BrowserContext; page: Page }> {
        const browser = await chromium.connectOverCDP(cdpUrl);
        const context = await browser.newContext();
        const page = await context.newPage();
        return { context, page };
    }

    static getBrowser(): Browser {
        if(!this.browser) {
            throw new Error('[BrowserContext] Browser not initialized. Call connectToRemoreBrowser() first.');
        }
        return this.browser;
    }

    static getBrowserContext(): BrowserContext {
        if(!this.context) {
            throw new Error('[BrowserContext] Context not initialized. Call connectToRemoreBrowser() first.');
        }
        return this.context;
    }

    static getPage(): Page {
        if(!this.page) {
            throw new Error('[BrowserContext] Page not initialized. Call connectToRemoreBrowser() first.');
        }
        return this.page;
    }
}
