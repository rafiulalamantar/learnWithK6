export class MyInfoPage {
    constructor(page) {
        this.page = page;
        this.myInfoTab = "//span[text()='My Info']";
        this.personalDetailsHeader = "//h6[text()='Personal Details']";
        this.firstNameField = "//input[@name='firstName']";
        this.lastNameField = "//input[@name='lastName']";
        this.saveButton = "//button[contains(@class, 'oxd-button') and text()='Save']";
    }

    async navigateToMyInfo() {
        console.log("Navigating to My Info...");
        await this.page.locator(this.myInfoTab).waitFor({ state: 'visible', timeout: 30000 });
        await this.page.locator(this.myInfoTab).click();
        await this.page.locator(this.personalDetailsHeader).waitFor({ state: 'visible', timeout: 30000 });
    }

    async updateEmployeeFullName(firstName, lastName) {
        console.log("Updating Employee Full Name...");
        await this.page.locator(this.firstNameField).waitFor({ state: 'visible', timeout: 30000 });
        await this.page.locator(this.firstNameField).fill(firstName);
        
        await this.page.locator(this.lastNameField).waitFor({ state: 'visible', timeout: 30000 });
        await this.page.locator(this.lastNameField).fill(lastName);
        
        console.log("Saving updated details...");
        await this.page.locator(this.saveButton).waitFor({ state: 'visible', timeout: 30000 });
        await this.page.locator(this.saveButton).click();
    }
}
