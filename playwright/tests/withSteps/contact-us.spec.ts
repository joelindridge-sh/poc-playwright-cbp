import { test, expect, Page } from "@playwright/test";

function step(target: Function, context: ClassMethodDecoratorContext) {
  return function replacementMethod(...args: any) {
    const name = this.constructor.name + "." + (context.name as string);
    return test.step(name, async () => {
      return await target.call(this, ...args);
    });
  };
}

class LoginPage {
  constructor(readonly page: Page) {}

  @step
  async "Given I am logged in as a broker"() {
    await this.page.goto("https://green-pond-004309e03-982.westeurope.azurestaticapps.net/corporate-portal/");
    await this.page.locator("#onetrust-accept-btn-handler").click();
    await this.page.locator('[name="username"]').fill("e4a1b5a3-eacc-4a85-a685-1175290c11f5@mailslurp.com");
    await this.page.locator('[name="password"]').fill("Password@1");
    await this.page.locator("button").getByText("Sign in").click();
    await this.page.getByTestId("AgreeTermsOfUse_Button").click();
    await expect(this.page.locator("h1", { hasText: "Welcome" })).toBeVisible();
  }
}

class ContactUsPage {
  constructor(readonly page: Page) {}

  @step
  async "When I click the contact us button from the dashboard"() {
    await this.page.locator("[class*='DashboardButton'] a", { hasText: new RegExp("contact us", "i") }).click();
  }

  @step
  async "When I click the contact us button from the account menu"() {
    await this.page.getByRole("button", { name: new RegExp("account menu dropdown", "i") }).dispatchEvent("mouseover");
    await this.page.locator("[class*='HeaderDropdown'] a", { hasText: new RegExp("contact us", "i") }).click();
    await this.page.getByRole("img", { name: /simplyhealth logo/i }).click();
  }

  @step
  async "Then I should see 'heading' in the heading"(heading) {
    await expect(this.page.getByRole("heading", { name: new RegExp(heading, "i") })).toBeVisible();
  }
}

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage["Given I am logged in as a broker"]();
});

test("Navigating to contact us from the dashboard", { tag: "@ui" }, async ({ page }) => {
  const contactUsPage = new ContactUsPage(page);
  await contactUsPage["When I click the contact us button from the dashboard"]();
  await contactUsPage["Then I should see 'heading' in the heading"]("contact us");
});

test("Navigating to contact us from the account menu", { tag: "@ui" }, async ({ page }) => {
  const contactUsPage = new ContactUsPage(page);
  await contactUsPage["When I click the contact us button from the account menu"]();
  await contactUsPage["Then I should see 'heading' in the heading"]("contact us");
});
