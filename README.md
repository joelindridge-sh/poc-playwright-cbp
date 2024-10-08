# poc-playwright-cbp

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

A POC for using [Playwright](https://playwright.dev/docs/intro) for the Corporate Broker Portal.

See also [poc-playwright-cucumber-cbp](https://github.com/joelindridge-sh/poc-playwright-cucumber-cbp).

##

The same test is written in three styles for comparison:

- Without functions - [playwright/tests/pure](playwright/tests/pure/contact-us.spec.ts)
- With functions - [playwright/tests/withFunctions](playwright/tests/withFunctions/contact-us.spec.ts)
- With [steps](https://playwright.dev/docs/api/class-test#test-step) - [playwright/tests/withSteps](playwright/tests/withSteps/contact-us.spec.ts)

## Installation

Requires [Node.js](https://nodejs.org/).

Dependencies can then be installed via the following command:

`npm i`

### Environment

This project makes use of [dotenv](https://github.com/motdotla/dotenv) to load environment variables, containing login details.

Add and ammend the following file to the root of the project:

`.env`

```properties
cognito-broker-username = "xxxxxxxxx"
cognito-broker-password = "xxxxxxxxx"
```

## VSCode

VSCode has a Playwright extension providing useful functionality such as running tests and picking locators.

### Extensions

Install:

- Playwright - `ms-playwright.playwright`
- Prettier - `esbenp.prettier-vscode` - code formatting

### Settings

Add the following file to the root of the project:

`.vscode/settings.json`

```JSON
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true
}
```

## Run Example Tests

Run in an interactive UI mode:
`npx playwright test --ui`

Run all - runs all of the tests in the command line:
`npx playwright test`

Run a tag - runs a subset of tests tagged in feature files:
`npx playwright test --grep "@ui"`

Run headed - runs tests in the browser:
`npx playwright test --grep "@ui" --headed`
