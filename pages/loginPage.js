import { BasePage } from './basePage.js';

export class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.usernameInput = 'input[name="username"]';
    this.passwordInput = 'input[name="password"]';
    this.loginButton = "button[type='submit']";
  }

  // Optionally, you could create additional methods to interact with these elements:
  async fillUsername(username) {
    await this.page.fill(this.usernameInput, username);
  }

  async fillPassword(password) {
    await this.page.fill(this.passwordInput, password);
  }

  async clickLoginButton() {
    await this.page.click(this.loginButton);
  }
}
