import { BasePage } from './basePage.js';

export class PIMPage extends BasePage {
    constructor(page) {
        super(page);
        this.pimTab = '//span[normalize-space()="PIM"]';
        this.addBtn = 'button.oxd-icon.bi-plus.oxd-button-icon';
        this.txtFirstName = '[name="firstName"]';
        this.txtLastName = '[name="lastName"]';
        this.toggleBtn = '.oxd-switch-input--active';
        this.inputField = '(//input[contains(@class, "oxd-input") and contains(@class, "oxd-input--active")])[3]';
        this.passwordInput = '(//input[@type="password"])[1]';
        this.confirmPasswordInput = '(//input[@type="password"])[2]';
        this.txtEmployeeId = 'input.oxd-input.oxd-input--active:nth-of-type(2)';

        this.saveBtn = 'button[type="submit"]';
        this.searchBtn = '[type="submit"]';
    }

    async createEmployee(firstname, lastname, username, password, employeeId) {
        // Wait for the PIM tab to be visible and clickable
        await this.page.locator(this.pimTab).waitFor({ state: 'visible', timeout: 30000 });
        await this.page.locator(this.pimTab).click();
        
        // Wait for the "Add" button to be visible before clicking
        await this.page.locator(this.addBtn).waitFor({ state: 'visible', timeout: 10000 });
        await this.page.locator(this.addBtn).click();
    
        // // Wait for the First Name input field to be visible
        // await this.page.locator(this.txtFirstName).waitFor({ state: 'visible', timeout: 30000 });
        // await this.page.locator(this.txtFirstName).fill(firstname);
    
        // // Wait for the Last Name input field to be visible
        // await this.page.locator(this.txtLastName).waitFor({ state: 'visible', timeout: 30000 });
        // await this.page.locator(this.txtLastName).fill(lastname);
    
        // // Wait for the Employee ID field to be visible before filling it
        // const employeeIdField = this.page.locator(this.txtEmployeeId);
        // await employeeIdField.waitFor({ state: 'visible', timeout: 30000 });
        // await employeeIdField.fill(employeeId);
    
        // // Wait for the toggle button to be visible and clickable
        // await this.page.locator(this.toggleBtn).waitFor({ state: 'visible', timeout: 30000 });
        // await this.page.locator(this.toggleBtn).click();
    
        // // Wait for the Username input field to be visible before filling it
        // await this.page.locator(this.inputField).waitFor({ state: 'visible', timeout: 30000 });
        // await this.page.locator(this.inputField).fill(username);
    
        // // Wait for the Password input field to be visible before filling it
        // await this.page.locator(this.passwordInput).waitFor({ state: 'visible', timeout: 30000 });
        // await this.page.locator(this.passwordInput).fill(password);
    
        // // Wait for the Confirm Password input field to be visible before filling it
        // await this.page.locator(this.confirmPasswordInput).waitFor({ state: 'visible', timeout: 30000 });
        // await this.page.locator(this.confirmPasswordInput).fill(password);
    
        // // Wait for the Save button to be visible before clicking it
        // await this.page.locator(this.saveBtn).waitFor({ state: 'visible', timeout: 30000 });
        // await this.page.locator(this.saveBtn).click();
    }
    
    // async searchEmployeeById(userEmpId) {
    //     await this.page.locator(this.txtEmployeeId).nth(2).fill(userEmpId);
    //     await this.page.waitForTimeout(1000);
    //     await this.page.locator(this.searchBtn).click();
    // }

    // async searchEmployeeByName(employeeName) {
    //     await this.page.locator(this.txtInput).nth(1).fill(employeeName);
    //     await this.page.waitForTimeout(1000);
    //     await this.page.locator(this.searchBtn).click();
    // }
}
