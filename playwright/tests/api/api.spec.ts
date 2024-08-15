import { test, expect } from "@playwright/test";
import path from "path";
import data from "./api.json";

data.forEach(function (data, i) {
  test(`healthplan-api: ${i}`, { tag: "@api" }, async ({ request }) => {
    const get = await test.step("Make request", async () => {
      return await request.fetch(path.join("https://www.simplyhealth.co.uk", data.endpoint), {
        method: data.method,
        params: JSON.parse(JSON.stringify(data.parameters)),
      });
    });

    await test.step("Assert response", async () => {
      expect(get.status()).toEqual(data.status);
    });
  });
});
