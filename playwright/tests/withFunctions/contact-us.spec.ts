import { test, expect, Page } from "@playwright/test";

class LoginPage {
  constructor(readonly page: Page) {}

  async loginAsBroker() {
    await this.page.goto("https://green-pond-004309e03-982.westeurope.azurestaticapps.net/corporate-portal/");
    await this.page.locator("#onetrust-accept-btn-handler").click();
    await this.page.locator('[name="username"]').fill(process.env["cognito-broker-username"]);
    await this.page.locator('[name="password"]').fill(process.env["cognito-broker-password"]);
    await this.page.locator("button").getByText("Sign in").click();
    await this.page.getByTestId("AgreeTermsOfUse_Button").click();
    await expect(this.page.locator("h1", { hasText: "Welcome" })).toBeVisible();
  }
}

class ContactUsPage {
  constructor(readonly page: Page) {}

  async goToContactUsFromDashboard() {
    await this.page.locator("[class*='DashboardButton'] a", { hasText: new RegExp("contact us", "i") }).click();
  }

  async goToContactUsFromAccountMenu() {
    await this.page.getByRole("button", { name: new RegExp("account menu dropdown", "i") }).dispatchEvent("mouseover");
    await this.page.locator("[class*='HeaderDropdown'] a", { hasText: new RegExp("contact us", "i") }).click();
    await this.page.getByRole("img", { name: /simplyhealth logo/i }).click();
  }

  async expectHeading(heading) {
    await expect(this.page.getByRole("heading", { name: new RegExp(heading, "i") })).toBeVisible();
  }
}

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.loginAsBroker();
});

test("Navigating to contact us from the dashboard", { tag: "@ui" }, async ({ page }) => {
  const contactUsPage = new ContactUsPage(page);
  await contactUsPage.goToContactUsFromDashboard();
  await contactUsPage.expectHeading("contact us");
});

test("Navigating to contact us from the account menu", { tag: "@ui" }, async ({ page }) => {
  const contactUsPage = new ContactUsPage(page);
  await contactUsPage.goToContactUsFromAccountMenu();
  await contactUsPage.expectHeading("contact us");
});
