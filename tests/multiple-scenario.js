import { browser } from 'k6/browser';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { credentials } from '../data/data.js'; // Assuming credentials are stored separately
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
            vus: 2,
            iterations: 1,
            startTime: '15s', // Start after valid login ramp-up
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
            startTime: '20s', // Start after login tests
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
    const myInfoPage = new MyInfoPage(page);

    console.log("Navigating to login page...");
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

    console.log("Logging into the application...");
    await page.locator('input[name="username"]').fill(credentials.valid.username);
    await page.locator('input[name="password"]').fill(credentials.valid.password);
    await page.locator('button[type="submit"]').click();

    // Wait for the dashboard to load
    await page.locator('.oxd-topbar-header-title').waitFor({ state: 'visible', timeout: 30000 });

    if (__VU === 1) {
        console.log("Running Update Employee Info Scenario");
        await myInfoPage.navigateToMyInfo();
        await myInfoPage.updateEmployeeFullName("John", "Doe");
        console.log("Update Successful!");
    }
    
    await page.close();
}

export function handleSummary(data) {
    return {
        'reports/multiple_scenario_report.html': htmlReport(data),
    };
}
