import { Page } from '@playwright/test';
import { SearchPage } from '../pages/SearchPage';
import { LandingPage } from '../pages/LandingPage';
import { ApparelsAndShoesPage } from '../pages/ApparelsAndShoesPage';
import { ReviewPage } from '../pages/ReviewPage';
import { ShoppingCartPage } from '../pages/ShoppingCartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

/*来
* PageObjectManager - Central lazy factory for all Page Objects. 
* Tests call pom.get*Page() rather than instantiating page objects directly.
*/
export class PageObjectManager {

private readonly page: Page;
private _searchPage: SearchPage | null= null;
private _landingPage: LandingPage | null= null;
private _apparelsAndShoesPage: ApparelsAndShoesPage | null= null;
private _reviewPage: ReviewPage | null= null;
private _shoppingCartPage: ShoppingCartPage | null= null;
private _checkoutPage: CheckoutPage | null= null;

 
    constructor(page: Page) {
        this.page = page;
    }

    getSearchPage(): SearchPage {
        if (!this._searchPage) this._searchPage = new SearchPage(this.page);
        return this._searchPage;
    }

    getLandingPage(): LandingPage {
        if (!this._landingPage) this._landingPage = new LandingPage(this.page);
        return this._landingPage;
    }

    getApparelsAndShoesPage(): ApparelsAndShoesPage {
        if (!this._apparelsAndShoesPage) this._apparelsAndShoesPage = new ApparelsAndShoesPage(this.page);
        return this._apparelsAndShoesPage;
    }

    getReviewPage(): ReviewPage {
        if (!this._reviewPage) this._reviewPage = new ReviewPage(this.page);
        return this._reviewPage;
    }

    getShoppingCartPage(): ShoppingCartPage {
        if (!this._shoppingCartPage) this._shoppingCartPage = new ShoppingCartPage(this.page);
        return this._shoppingCartPage;
    }

    getCheckoutPage(): CheckoutPage {
        if (!this._checkoutPage) this._checkoutPage = new CheckoutPage(this.page);
        return this._checkoutPage;
    }
}