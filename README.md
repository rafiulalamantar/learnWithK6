# k6 Performance Testing Framework

## Overview
This is a generic k6 performance testing framework designed to test the performance of various APIs. The framework utilizes the k6 library to send HTTP requests and validate responses under different load conditions.

## Features
- Load testing using k6
- Page Object Model (POM) design for structured test cases
- Supports multiple test scenarios
- Generates detailed reports
- Customizable configurations

## Prerequisites
To use this framework, ensure you have the following installed on your machine:
- [Node.js](https://nodejs.org/)
- [k6](https://k6.io/docs/get-started/installation/)

## Getting Started

### Clone the Repository
```sh
git clone https://github.com/farhanlabib/k6-performance-testing-framework.git
cd k6-performance-testing-framework
npm install
```

### Install k6
Follow the installation guide for your OS: [k6 Installation](https://k6.io/docs/get-started/installation/)

## Project Structure
```
project-root/
│── tests/
│   │── loginTest.js
│   │── myInfoTest.js
│   │── multiple-scenarioTest.js
│
│── pages/
│   │── loginPage.js
│   │── dashboardPage.js
│   │── myInfoPage.js
│
│── data/
│   │── data.js
│
│── reports/
│   │── report.html
│   │── multiple_scenario_report.html
│   │── employee_info_update_report.html
│
│── utils/
│   │── helper.js
│   │── config.js
│
│── k6-config/
│   │── options.js
│
│── .gitignore
│── package.json
│── README.md
```

## Writing Test Scripts
The test scripts are JavaScript files that use the k6 library. Each test imports the `http` module and `check` function from k6, defines the test stages, and makes API requests with assertions.

### Sample Test Script (`tests/sample.js`)
```javascript
import http from 'k6/http';
import { check } from 'k6';

export let options = {
    stages: [
        { duration: '30s', target: 50 },
        { duration: '1m', target: 100 },
        { duration: '30s', target: 0 }
    ]
};

export default function () {
    let res = http.post('https://api.example.com/login', JSON.stringify({ username: 'user', password: 'pass' }), {
        headers: { 'Content-Type': 'application/json' }
    });

    check(res, {
        'response code was 200': (r) => r.status === 200
    });
}
```

## Running Tests

### Basic Test Execution
```sh
npm test specs/sample.js
```
This command runs the test and displays the results in the console.

### Saving Test Results to CSV
```sh
npm test -- --log-format raw specs/sample.js --console-output=./test.csv
```
This command runs the test and saves detailed logs to a CSV file.

## Customization
You can modify the framework to suit your needs by:
- Changing `k6-config/options.js` for different test scenarios
- Editing or adding new test scripts in the `tests/` folder
- Updating `pages/` to implement more structured API interactions

## Reporting
Test execution reports are stored in the `reports/` directory and can be reviewed to analyze test results.

## Contribution
Feel free to fork the repository and submit a pull request for any improvements or additional features.

## License
This project is open-source and licensed under the [MIT License](LICENSE).
