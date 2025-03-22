import { BasePage } from './basePage.js';

export class DashboardPage extends BasePage {
    constructor(page) {
        super(page);
        this.btnProfileTab = '.oxd-userdropdown-name';
        this.linkLogout = 'a[href*="logout"]';  // Adjusted to use a CSS selector (e.g., `href*="logout"`)
        this.menus = '.oxd-text--span';
        this.dropdown = '.oxd-select-text-input';
        this.employeeName = 'input';
        this.clientBrandBanner = "img[alt='client brand banner']";
       
    }

    async doLogout() {
        await this.page.locator(this.btnProfileTab).click();
        await this.page.locator(this.linkLogout).click();
        await this.page.waitForLoadState('networkidle');
    }
}
