// basePage.js
export class BasePage {
    constructor(page) {
      this.page = page;
      this.loginUrl = 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login';  // Define URL in BasePage class
    }
  
    // Navigate method will use the URL defined in the class
    async navigate() {
      console.log(`Navigating to: ${this.loginUrl}`);  // Log the URL for debugging purposes
      await this.page.goto(this.loginUrl);
    }
  
    async login(username, password) {
      await this.page.fill('input[name="username"]', username);
      await this.page.fill('input[name="password"]', password);
      await this.page.click("button[type='submit']");
      await this.page.waitForLoadState('networkidle');
    }
  }
  