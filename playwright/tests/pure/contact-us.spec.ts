import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  // Given I am logged in as a broker
  await page.goto(".");
  await page.locator("#onetrust-accept-btn-handler").click();
  await page.locator('[name="username"]').fill(process.env["cognito-broker-username"]);
  await page.locator('[name="password"]').fill(process.env["cognito-broker-password"]);
  await page.locator("button").getByText("Sign in").click();
  await page.getByTestId("AgreeTermsOfUse_Button").click();
  await expect(page.locator("h1", { hasText: "Welcome" })).toBeVisible();
});

// Scenario: Navigating to contact us from the dashboard
test("Navigating to contact us from the dashboard", { tag: "@ui" }, async ({ page }) => {
  // When I click the contact us button from the dashboard
  await page.locator("[class*='DashboardButton'] a", { hasText: new RegExp("contact us", "i") }).click();
  // Then I should see "contact us" in the heading
  await expect(page.getByRole("heading", { name: new RegExp("contact us", "i") })).toBeVisible();
});

// Scenario: Navigating to contact us from the account menu
test("Navigating to contact us from the account menu", { tag: "@ui" }, async ({ page }) => {
  // When I click the contact us button from the account menu
  await page.getByRole("button", { name: new RegExp("account menu dropdown", "i") }).dispatchEvent("mouseover");
  await page.locator("[class*='HeaderDropdown'] a", { hasText: new RegExp("contact us", "i") }).click();
  await page.getByRole("img", { name: /simplyhealth logo/i }).click();
  // Then I should see "contact us" in the heading
  await expect(page.getByRole("heading", { name: new RegExp("contact us", "i") })).toBeVisible();
});
