import { browser } from 'k6/browser';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { credentials } from '../data/data.js'; // Assuming credentials are stored separately
import { MyInfoPage } from '../pages/myInfoPage.js';

export const options = {
    scenarios: {
        updateEmployeeInfo: {
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
    const myInfoPage = new MyInfoPage(page);

    console.log("Navigating to login page...");
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

    console.log("Logging into the application...");
    await page.locator('input[name="username"]').fill(credentials.valid.username);
    await page.locator('input[name="password"]').fill(credentials.valid.password);
    await page.locator('button[type="submit"]').click();

    // Wait for the dashboard to load
    await page.locator('.oxd-topbar-header-title').waitFor({ state: 'visible', timeout: 30000 });

    // Navigate to My Info Page
    await myInfoPage.navigateToMyInfo();
    
    // Update Employee Name
    await myInfoPage.updateEmployeeFullName("John", "Doe");

    console.log("Update Successful!");
    await page.close();
}

export function handleSummary(data) {
    return {
        'reports/employee_info_update_report.html': htmlReport(data),
    };
}
