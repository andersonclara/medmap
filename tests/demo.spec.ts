import { test, expect } from "@playwright/test";
test("complete medication education demo", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: /Understand your medication/ }),
  ).toBeVisible();
  await expect(page.locator("body")).toHaveJSProperty(
    "scrollWidth",
    await page.evaluate(() => window.innerWidth),
  );
  await page
    .getByRole("link", { name: "Explore Medications", exact: true })
    .click();
  await page
    .getByRole("textbox", { name: "Search medications" })
    .fill("albuterol");
  await expect(page.getByRole("button", { name: /^Albuterol/ })).toBeVisible();
  await page.getByRole("combobox", { name: "Search organs" }).fill("lung");
  await page.getByRole("option", { name: /Lungs/ }).click();
  await expect(
    page.getByText("Your lungs bring oxygen", { exact: false }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Show bronchodilation" }).click();
  await expect(
    page.getByRole("heading", { name: "Muscles relax. Airways widen." }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Scientific", exact: true }).click();
  await expect(page.getByText(/Albuterol activates beta-2/)).toBeVisible();
  await page
    .getByRole("button", {
      name: "Relaxes muscles around the airways",
      exact: false,
    })
    .click();
  await expect(page.getByText("Session score: 1/3")).toBeVisible();
  await page.getByRole("button", { name: "Clear search" }).click();
  await page.getByRole("button", { name: /^Metformin/ }).click();
  await expect(
    page.getByRole("heading", { name: "Metformin Biguanide" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Show medication effect" }).click();
  await expect(
    page.getByRole("heading", { name: "Less glucose released." }),
  ).toBeVisible();
  await page.getByRole("button", { name: /^Omeprazole/ }).click();
  await page.getByRole("button", { name: "Show medication effect" }).click();
  await expect(
    page.getByRole("heading", { name: "Less acid secreted." }),
  ).toBeVisible();
  await page
    .getByRole("textbox", { name: "Search medications" })
    .fill("unlisted");
  await expect(page.getByRole("status").filter({ hasText: "No medications found" })).toBeVisible();
  await expect(page.locator("body")).toHaveJSProperty(
    "scrollWidth",
    await page.evaluate(() => window.innerWidth),
  );
  expect(errors).toEqual([]);
});
test("anatomy supports keyboard and browser navigation", async ({ page }) => {
  await page.goto("/#explore");
  const search = page.getByRole("combobox", { name: "Search organs" });
  await search.fill("pulmonary");
  await search.press("ArrowDown");
  await search.press("Enter");
  await expect.poll(async () => Number(await page.getByTestId("anatomy-scene").getAttribute("data-selected-structures")), { timeout: 30_000 }).toBeGreaterThan(0);
  await page.getByRole("button", { name: "Simple", exact: true }).click();
  await expect(
    page.getByRole("button", { name: "Simple", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  await page.getByRole("link", { name: "MedMap home" }).click();
  await expect(
    page.getByRole("heading", { name: /Understand your medication/ }),
  ).toBeVisible();
  await page.goBack();
  await expect(page.getByRole("heading", { name: /^Albuterol/ })).toBeVisible();
});
