import { test, expect } from '@playwright/test';
import { BrowserManager } from '../utils/BrowserManager';
import { PageObjectManager } from '../utils/PageObjectManager';
import testData from './data/testData.json';

// ================RUN FROM CMD================
// #1. Verify TypeScript compilation (no errors)
// npx tsc --allowedNodeEnvironmentFlags

// #2. Run the test in headed mode against the CDP project
// npx playwright test tests/shopping.spec.ts --project=cdp-chrome --headed

// #3. Open the HTML report after the run compressDeflateSync
// npx playwright show-report

// ================DATA FILE================
// Parameterized values are sources from: tests/data/letterTestData.json
// Set "enabled": false on any row to skip it without deleting it

const CDP_URL = 'http://localhost:9222';
const APP_URL = 'https://demowebshop.tricentis.com/';

//Only run rows explicitly enabled in the data file
const enabledScenarios = testData.filter((row) => row.enabled);

test.describe('Letter End-to-End Workflow', () => {
    test.describe.configure({ mode: 'parallel' });
    for (const scenario of enabledScenarios) {
        test(`${scenario.tcId}: Create and submit letter for [${scenario.itemName}] and [${scenario.quantity}] quantity`, async () => {
            
            //STEP 1: Connect to Chrome via CDP for parallel test runs
            const { context, page } = await BrowserManager.createIsolatedPage(CDP_URL);
            const pom = new PageObjectManager(page);
            //The connection with the above lines will be there in changed code in BrowserManager.ts and changed configuration in playwright.config.ts

            //STEP 1: Connect to Chrome via CDP for serial test runs
            // const page = await BrowserManager.connectToRemoteBrowser(CDP_URL);
            // const pom = new PageObjectManager(page);
            //The connection with the above lines will be there in changed code in BrowserManager.ts and changed configuration in playwright.config.ts

            //STEP 2: Navigate to application and search
            const searchPage = pom.getSearchPage();
            await searchPage.navigateToApplication(APP_URL);

            //STEP 3: Verify Landing Page is loaded; select letter checkbox and click Create button
            const landingPage = pom.getLandingPage();
            await landingPage.verifyPageIsLoaded();
            await landingPage.clickApparelsAndShoesLink();

            //STEP 4: Verify Apparels & Shoes Page is loaded; select letter checkbox and click Create button
            const apparelsAndShoesPage = pom.getApparelsAndShoesPage();
            await apparelsAndShoesPage.verifyPageIsLoaded();

            //STEP 5: Select item from the list of products
            await apparelsAndShoesPage.selectItem(scenario.itemName);

            //STEP 6: Verify category and type for letter and click Submit button
            const reviewPage = pom.getReviewPage();
            await reviewPage.verifyPageIsLoaded();
            await reviewPage.enterQuantityOfItem(scenario.quantity);
            await reviewPage.clickAddToCartButton();
            await reviewPage.itemAddedToCartMessageIsDisplayed();
            await reviewPage.clickShoppingCartLink();

            //STEP 7: Verify Shopping Cart Page is loaded
            const shoppingCartPage = pom.getShoppingCartPage();
            await shoppingCartPage.verifyPageIsLoaded();
            await shoppingCartPage.selectCountryFromDropdownMenu(scenario.country);
            await shoppingCartPage.selectStateFromDropdownMenu(scenario.state);
            await shoppingCartPage.enterZipcode(scenario.zipCode);
            await shoppingCartPage.selectTermsOfServicesCheckbox();
            await shoppingCartPage.clickCheckoutButton();
            await shoppingCartPage.clickCheckoutAsGuestButton();

            //STEP 7: Verify Checkout Page is loaded and verify the validation messages are displayed for billing form
            const checkoutPage = pom.getCheckoutPage();
            await checkoutPage.verifyPageIsLoaded();
            await checkoutPage.clickBillingSectionContinueButton();
            await checkoutPage.verifyFirstNameRequiredValidationErrorMessageIsDisplayed();
            await checkoutPage.verifyLastNameRequiredValidationErrorMessageIsDisplayed();
            await checkoutPage.verifyEmailRequiredValidationErrorMessageIsDisplayed();
            await checkoutPage.verifyCountryRequiredValidationErrorMessageIsDisplayed();
            await checkoutPage.verifyCityRequiredValidationErrorMessageIsDisplayed();
            await checkoutPage.verifyStreetAddressRequiredValidationErrorMessageIsDisplayed();
            await checkoutPage.verifyZipRequiredValidationErrorMessageIsDisplayed();
            await checkoutPage.verifyPhoneRequiredValidationErrorMessageIsDisplayed();

            //STEP 8: Capture all the data in the automation report
            const reportData = {
                testCase:       scenario.tcId,
                itemName:       scenario.itemName,
                quantity:       scenario.quantity,
                country:        scenario.country,
                state:          scenario.state,
                zipCode:        scenario.zipCode,
                // orderNumner,
                status:         'PASSED',
                timeStamp:      new Date().toISOString(),
            };

            //Embed all captured data into the Playwright HTML report as annotations
            test.info().annotations.push(
                { type: 'Test Case ID',         description: scenario.tcId },
                { type: 'itemName',             description: scenario.itemName },
                { type: 'quantity',             description: scenario.quantity },
                { type: 'country',              description: scenario.country },
                { type: 'state',                description: scenario.state },
                { type: 'zipCode',              description: scenario.zipCode },
                // { type: 'Order Number',         description: orderNumner },
                { type: 'Timestamp',            description: reportData.timeStamp },
            );

            expect(scenario.tcId, `[${scenario.tcId}] Validation messages`).toBeTruthy();

            //Note: DO NOT call browser.close() - CDP-connected browser must stay open

        })
    }
})

    