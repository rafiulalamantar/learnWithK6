import { browser } from 'k6/browser';
import { check } from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export const options = {
  scenarios: {
    createEmployee: {
      executor: 'per-vu-iterations',
      vus: 1,
      iterations: 1,
      options: {
        browser: {
          type: 'chromium',
        },
      },
    },
  },
};

export default async function () {
  const page = await browser.newPage();

  // Navigate to the OrangeHRM login page
  console.log("Navigating to login page...");
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

  // Login to the application
  console.log("Logging into the application...");
  await page.locator('input[name="username"]').fill('Admin'); // Username field
  await page.locator('input[name="password"]').fill('admin123'); // Password field
  await page.locator('button[type="submit"]').click(); // Submit login form

  // Wait for the dashboard or a specific element after login to ensure successful login
  await page.locator('div.oxd-topbar-header-title').waitFor({ state: 'visible', timeout: 30000 });

  // Click on the PIM tab
  console.log("Clicking on PIM tab...");
  await page.locator('a[href="/web/index.php/pim/viewEmployeeList"]').click();

  // Wait for the PIM page to load
  await page.locator('button.oxd-icon.bi-plus.oxd-button-icon').waitFor({ state: 'visible', timeout: 30000 });

  // Click on the Add button to open the "Add Employee" form
  console.log("Clicking on Add button...");
  await page.locator('button.oxd-icon.bi-plus.oxd-button-icon').click();

  // Optionally, you can also fill in some fields on the Add Employee form here, if needed

  // End the session
  await page.close();
}

export function handleSummary(data) {
  return {
    'reports/OrangeHRM_test_report.html': htmlReport(data),
  };
}
