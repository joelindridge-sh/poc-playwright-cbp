import { test, expect } from "@playwright/test";

test("healthplan-ui", { tag: "@ui" }, async ({ page }) => {
  await test.step("User visits Simplyhealth", async () => {
    await page.goto("https://www.simplyhealth.co.uk/");
    await page.locator("button[id='onetrust-accept-btn-handler']").getByText("Accept All Cookies").click();
    await expect(page).toHaveTitle(/Simplyhealth | Health & Dental Plans to cover you/);
  });

  await test.step("User clicks Get a health plan", async () => {
    await page.getByText("Get a health plan").first().click();
    await expect(page).toHaveTitle(/1-2-3 Health Plan | Health cover from Simplyhealth/);
  });

  await test.step("User clicks Build your plan", async () => {
    await page.getByText("Build your plan").first().click();
    await expect(page).toHaveTitle(/1-2-3 Health Plan | Health cover from Simplyhealth/);
  });

  await test.step("User chooses health plan options", async () => {
    await page.getByRole("link", { name: "Add your family" }).click();
    await expect(page.getByRole("heading", { name: "Add your family to your plan" })).toBeVisible();
    await page.getByRole("button", { name: "Yes" }).click();
    await page.getByRole("button", { name: "2", exact: true }).click();
    await page.getByRole("button", { name: "Save and Close" }).click();
    await expect(page.locator("#sh-coverage-text")).toContainText("You, your partner and 2 children");
    await page.locator("#sh-premiums button[value='4']").click();
    await expect(page.locator("#sh-total-monthly").textContent).toEqual(page.locator("#sh-premiums button[value='4']").textContent);
    await page.getByRole("link", { name: "Choose this plan" }).click();
    await expect(page).toHaveTitle(/About You - Simplyhealth - Path to Purchase/);
  });

  await test.step("User completes step 1: name", async () => {
    await expect(page.getByText("Step 1 of 10")).toBeVisible();
    await page.getByLabel("firstName").fill("Me");
    await page.getByLabel("lastName").fill("Name");
    await page.getByLabel("Next page: Date of birth").click();
  });

  await test.step("User completes step 2: dob", async () => {
    await expect(page.getByText("Step 2 of 10")).toBeVisible();
    await expect(page.locator("#DateOfBirth_Title_Text")).toContainText("Hi Me, when were you born?");
    await page.getByPlaceholder("DD").fill("01");
    await page.getByPlaceholder("MM").fill("01");
    await page.getByPlaceholder("YYYY").fill("1990");
    await page.getByLabel("Next page: Contact details").click();
  });
});
