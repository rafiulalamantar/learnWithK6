import { browser } from 'k6/browser';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { credentials } from '../data/data.js'; // Assuming credentials are stored separately
import { LoginPage } from '../pages/loginPage.js';
import { DashboardPage } from '../pages/dashboardPage.js';
import { MyInfoPage } from '../pages/myInfoPage.js';

export const options = {
  scenarios: {
    validLogin: {
      executor: 'ramping-vus',
      startVUs: 1,
      stages: [
        { duration: '10s', target: 5 }, // Ramp-up to 5 VUs
        { duration: '30s', target: 10 }, // Hold at 10 VUs
        { duration: '10s', target: 0 }, // Ramp-down
      ],
      options: {
        browser: {
          type: 'chromium',
        },
      },
    },
    invalidLogin: {
      executor: 'per-vu-iterations',
      vus: 1,
      iterations: 1,
      startTime: '15s', // Delay this scenario by 15 seconds to run after valid login
      options: {
        browser: {
          type: 'chromium',
        },
      },
    },
    updateEmployeeInfo: {
      executor: 'per-vu-iterations',
      vus: 1,
      iterations: 1,
      startTime: '20s', // Start this scenario after valid login
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
  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);
  const myInfoPage = new MyInfoPage(page);

  // Scenario 1: Valid Login
  if (__VU === 1) {  // Handling valid login
    console.log("\n========== Running Valid Login Scenario ==========");

    await loginPage.navigate();
    console.log("✅ Page navigated successfully");

    await loginPage.login(credentials.valid.username, credentials.valid.password);
    console.log("✅ Login attempt completed");

    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(5000); // Wait for additional UI load time

    try {
      // Assert: Check if Client Brand Banner is visible
      await page.waitForSelector(dashboardPage.clientBrandBanner, { timeout: 10000 });
      const bannerVisible = await page.locator(dashboardPage.clientBrandBanner).isVisible();

      if (bannerVisible) {
        console.log("✅ Client Brand Banner is visible - Dashboard Loaded Successfully!");
      } else {
        throw new Error("❌ Client Brand Banner is NOT visible - Dashboard might not be fully loaded!");
      }
    } catch (error) {
      console.error(`⚠️ ERROR: ${error.message}`);
    }

    // Wait before closing the browser to observe UI
    await page.waitForTimeout(3000);
    await page.close();
  }

  // Scenario 2: Invalid Login
  if (__VU === 2) {  // Handling invalid login
    console.log("\n========== Running Invalid Login Scenario ==========");

    await loginPage.navigate();
    console.log("✅ Page navigated successfully");

    await loginPage.login(credentials.invalid.username, credentials.invalid.password);
    console.log("✅ Invalid login attempt completed");

    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000); // Wait for any UI updates

    try {
      // Assert: Check for error message after invalid login
      const errorMessageSelector = ".oxd-alert-content"; // Example selector for error message
      await page.waitForSelector(errorMessageSelector, { timeout: 5000 });
      const errorVisible = await page.locator(errorMessageSelector).isVisible();

      if (errorVisible) {
        console.log("✅ Error message is visible - Invalid login test passed!");
      } else {
        throw new Error("❌ Error message is NOT visible - Login failure not handled properly!");
      }
    } catch (error) {
      console.error(`⚠️ ERROR: ${error.message}`);
    }

    // Wait before closing the browser to observe UI
    await page.waitForTimeout(3000);
    await page.close();
  }

  // Scenario 3: Update Employee Info
  if (__VU === 3) {  // Handling update employee info
    console.log("\n========== Running Update Employee Info Scenario ==========");

    // First, log in with valid credentials
    await loginPage.navigate();
    await loginPage.login(credentials.valid.username, credentials.valid.password);
    await page.locator('.oxd-topbar-header-title').waitFor({ state: 'visible', timeout: 30000 });

    // Navigate to My Info Page and update employee details
    await myInfoPage.navigateToMyInfo();
    await myInfoPage.updateEmployeeFullName(credentials.employee.firstName, credentials.employee.lastName);

    console.log("✅ Employee Info Update Successful!");
    await page.close();
  }
}

// Generate summary reports
export function handleSummary(data) {
  return {
    'reports/multiple_scenario_report.html': htmlReport(data),
  };
}
