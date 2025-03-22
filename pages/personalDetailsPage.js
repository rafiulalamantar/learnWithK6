import { BasePage } from './basePage.js';

export class PersonalDetailsPage extends BasePage {
    constructor(page) {
        super(page);
        this.radioBtn = '.oxd-radio-input';
        this.saveBtn = 'button';
        this.dropdownBlood = '.oxd-select-text-input';
        this.contactDetails = '.orangehrm-tabs-item';
        this.txtInput = 'input';
        this.selectCountry = '.oxd-select-text-input';
        this.submitBtn = '[type=submit]';
    }

    async selectGender(index = 0) {
        const genderRadio = await this.page.locator(this.radioBtn).nth(index);
        await genderRadio.click();
        await this.page.waitForTimeout(1000);
        await this.page.locator(this.saveBtn).nth(1).click();
    }

    async selectBloodGroup(index = 2) {
        const bloodDropdown = await this.page.locator(this.dropdownBlood).nth(index);
        await bloodDropdown.click();
        await this.page.waitForTimeout(1000);
        await this.page.locator(this.saveBtn).nth(2).click();
    }

    async openContactDetails() {
        await this.page.locator(this.contactDetails).nth(1).click();
    }
}
