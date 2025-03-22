import { browser } from 'k6/browser';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { LoginPage } from '../pages/loginPage.js';
import { DashboardPage } from '../pages/dashboardPage.js';
import { credentials } from '../data/data.js';

export const options = {
  scenarios: {
    validLogin: {
      executor: 'per-vu-iterations',
      vus: 1,
      iterations: 1,
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
      startTime: '10s', // Delay this scenario by 10 seconds to run after valid login
      options: {
        browser: {
          type: 'chromium',
        },
      },
    },
  },
};

export default async function () {
  const page = await browser.newPage({ headless: false }); // Run in headful mode for observation
  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);

  // Handling valid login scenario
  if (__VU === 1) {  // Change to use the VU directly instead of modulo
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

  // Handling invalid login scenario
  if (__VU === 2) {  // Using __VU for invalid login scenario as well
    console.log("\n========== Running Invalid Login Scenario ==========");

    await loginPage.navigate();
    console.log("✅ Page navigated successfully");

    await loginPage.login(credentials.invalid.username, credentials.invalid.password);
    console.log("✅ Invalid login attempt completed");

    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000); // Wait for any UI updates

    try {
      // Assert: Check for error message after invalid login (Modify selector as needed)
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
}

export function handleSummary(data) {
  return {
    'reports/report.html': htmlReport(data),
  };
}
