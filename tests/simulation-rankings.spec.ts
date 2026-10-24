import { test, expect } from "@playwright/test";
import rankings from "../src/data/usRankings.json" with { type: "json" };
import { medications } from "../src/data/medications";

test("national rankings retain reliable estimates without padding or invented precision", () => {
  expect(rankings.year).toBe(2024);
  expect(rankings.drugs.length).toBeGreaterThan(200);
  expect(rankings.conditions.length).toBeGreaterThan(100);
  for (const rows of [rankings.drugs, rankings.conditions]) {
    expect(rows.length).toBeLessThan(1000);
    expect(new Set(rows.map((row) => row.id)).size).toBe(rows.length);
    rows.forEach((row, index) => {
      expect(row.rank).toBe(index + 1);
      expect(row.samplePeople).toBeGreaterThanOrEqual(30);
      expect(row.relativeStandardError).toBeLessThanOrEqual(.3);
      expect(row.standardError).toBeGreaterThan(0);
      expect(row.lower95).toBeLessThan(row.estimate);
      expect(row.upper95).toBeGreaterThan(row.estimate);
      if (index) expect(rows[index - 1].estimate).toBeGreaterThanOrEqual(row.estimate);
    });
  }
  expect(rankings.drugs[0].name).toBe("ATORVASTATIN");
  expect(rankings.conditions[0].id).toBe("CIR007");
  expect(rankings.method).toContain("not prevalence of all disease");
});

test("rankings search, pagination, sources, and unsupported entries stay honest", async ({ page }, testInfo) => {
  await page.goto("/#rankings");
  await expect(page.getByRole("table")).toBeVisible();
  await expect(page.locator("tbody tr")).toHaveCount(25);
  await page.getByRole("button", { name: "Next page", exact: true }).click();
  await expect(page.locator("tbody tr").first().locator("td").first()).toHaveText("26");
  const unsupported = rankings.drugs.find((row) => !medications.some((med) => med.id === row.id) && rankings.drugs.filter((other) => other.name.includes(row.name)).length === 1)!;
  await page.getByRole("textbox", { name: "Search U.S. rankings" }).fill(unsupported.name);
  await expect(page.locator("tbody tr")).toHaveCount(1);
  await page.getByRole("link", { name: "Simulation coverage", exact: true }).click();
  await expect(page.getByRole("combobox", { name: "Ailment", exact: true })).toHaveValue("");
  await expect(page.locator(".med-list button")).toHaveCount(0);
  await expect(page.getByRole("button", { name: "Run simulation", exact: true })).toHaveCount(0);
  await page.goto("/#rankings?type=conditions");
  await expect(page.getByRole("table")).toHaveAccessibleName("Reported-condition ranking · 2024");
  await expect(page.locator("tbody tr").first()).toContainText("ESSENTIAL HYPERTENSION");
  await page.getByText("Sources, reliability, and ranking method", { exact: true }).click();
  await expect(page.getByRole("link", { name: "AHRQ medical conditions", exact: true })).toHaveAttribute("href", rankings.conditionsSource);
  await page.screenshot({ path: `test-results/rankings-${testInfo.project.name}.png`, fullPage: true });
  await expect(page.locator("body")).toHaveJSProperty("scrollWidth", await page.evaluate(() => innerWidth));
});

test("simulation playback changes mapped anatomy and resets cleanly", async ({ page }, testInfo) => {
  await page.goto("/#simulate/albuterol?condition=Asthma");
  const scene = page.getByTestId("anatomy-scene");
  await expect.poll(async () => Number(await scene.getAttribute("data-visible-structures")), { timeout: 30_000 }).toBeGreaterThan(300);
  await expect.poll(async () => Number(await scene.getAttribute("data-highlighted-structures"))).toBeGreaterThan(0);
  await page.getByRole("button", { name: "Run simulation", exact: true }).click();
  await expect(page.getByRole("button", { name: "Pause simulation", exact: true })).toBeVisible();
  await expect.poll(async () => Number(await scene.getAttribute("data-highlighted-structures"))).toBeGreaterThan(0);
  await page.getByRole("button", { name: "Pause simulation", exact: true }).click();
  await page.getByRole("button", { name: "Next stage", exact: true }).click();
  await expect(page.locator(".simulation-explanation h3")).toHaveText("Muscles relax. Airways widen.");
  await page.getByRole("button", { name: "Female", exact: true }).click();
  await expect(scene).toHaveAttribute("data-body-variant", "female");
  await expect.poll(async () => Number(await scene.getAttribute("data-highlighted-structures")), { timeout: 30_000 }).toBeGreaterThan(0);
  await page.getByRole("button", { name: "Reset simulation", exact: true }).click();
  await expect(scene).toHaveAttribute("data-highlighted-structures", "0");
  await expect(page.locator(".simulation-explanation h3")).toHaveText("Tight muscles. Narrow airways.");
  await page.getByRole("combobox", { name: "Ailment", exact: true }).selectOption("Type 2 diabetes");
  await expect(page.getByRole("button", { name: "Run simulation", exact: true })).toHaveCount(0);
  await expect(page.locator(".med-list button")).toHaveCount(1);
  await expect(page.locator(".med-list").getByRole("button", { name: /^Albuterol/ })).toHaveCount(0);
  await page.locator(".med-list").getByRole("button", { name: /^Metformin/ }).click();
  await expect(page.getByRole("button", { name: "Run simulation", exact: true })).toBeEnabled();
  await page.getByRole("button", { name: "Next stage", exact: true }).click();
  await expect(scene).toHaveAttribute("data-highlighted-structures", "29", { timeout: 30_000 });
  await page.locator(".atlas-viewport").screenshot({ path: `test-results/simulation-target-${testInfo.project.name}.png` });
  await page.screenshot({ path: `test-results/simulation-${testInfo.project.name}.png`, fullPage: true });
  await expect(page.locator("body")).toHaveJSProperty("scrollWidth", await page.evaluate(() => innerWidth));
});
