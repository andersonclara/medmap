import { test, expect } from "@playwright/test";
import { medications } from "../src/data/medications";
import {
  getSimilarMedications,
  getRelationships,
  medicationRelationships,
} from "../src/data/medicationRelationships";

test("relationships are explicit, reference real guides, and do not match by organ alone", () => {
  const ids = new Set(medications.map((m) => m.id));
  for (const relationship of medicationRelationships) {
    expect(relationship.medicationIds.length).toBeGreaterThan(1);
    expect(new Set(relationship.medicationIds).size).toBe(
      relationship.medicationIds.length,
    );
    for (const id of relationship.medicationIds)
      expect(ids.has(id), `${relationship.id}: ${id}`).toBe(true);
  }
  expect(
    getSimilarMedications("albuterol").map((m) => m.medication.id),
  ).toContain("tiotropium");
  expect(getRelationships("albuterol", "tiotropium")[0].kind).toBe(
    "related-mechanism",
  );
  expect(getSimilarMedications("amoxicillin")[0].medication.id).toBe(
    "amoxicillin-clavulanate",
  );
  expect(getSimilarMedications("amoxicillin")[0].relationships).toHaveLength(1);
  expect(getRelationships("donepezil", "methylphenidate")).toEqual([]);
  expect(getSimilarMedications("omeprazole")).toEqual([]);
  expect(getSimilarMedications("not-a-medication")).toEqual([]);
  for (const med of medications) {
    const peers = getSimilarMedications(med.id);
    expect(peers.length).toBeLessThanOrEqual(3);
    expect(peers.some((peer) => peer.medication.id === med.id)).toBe(false);
  }
});

test.beforeEach(async ({ page }) => {
  // Exercise guide/comparison content on devices without WebGL; actual mesh
  // interactions remain covered by the dedicated anatomy tests.
  await page.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext;
    Object.defineProperty(HTMLCanvasElement.prototype, "getContext", {
      value: function (kind: string, ...args: unknown[]) {
        if (kind.includes("webgl")) return null;
        return Reflect.apply(original, this, [kind, ...args]);
      },
    });
  });
});

test("suggestion opens a complete comparison with different roles and explanation modes", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/#explore/albuterol");
  await expect(
    page.getByRole("region", { name: "Interactive body atlas" }),
  ).toHaveCount(1);
  const similar = page.getByRole("region", { name: "Similar medicines" });
  await expect(similar).toContainText("Airway relaxation");
  await similar
    .getByRole("link", { name: "Compare Albuterol with Tiotropium" })
    .click();
  await expect(page).toHaveURL(/#compare\/albuterol\/tiotropium$/);
  await expect(
    page.getByRole("heading", { name: "Two medicines. A clearer picture." }),
  ).toBeVisible();
  await expect(
    page.getByRole("region", { name: "Why these medicines are connected" }),
  ).toContainText("not a rescue medicine");
  const mechanism = page.getByRole("region", {
    name: "How does it work?",
    exact: true,
  });
  await expect(mechanism).toContainText("Albuterol relaxes the muscles");
  const scientific = page.getByRole("button", {
    name: "Scientific",
    exact: true,
  });
  await scientific.focus();
  await page.keyboard.press("Enter");
  await expect(scientific).toHaveAttribute("aria-pressed", "true");
  await expect(mechanism).toContainText("beta-2 adrenergic receptors");
  await expect(mechanism).toContainText("muscarinic receptors");
  const safety = page.getByRole("region", {
    name: "What should I know?",
    exact: true,
  });
  await expect(safety).toContainText("breathing suddenly worsens");
  await expect(safety).toContainText("urinary retention");
  await expect(
    page
      .getByRole("region", { name: "Questions for your provider" })
      .locator("li"),
  ).toHaveCount(6);
  await expect(
    page.getByRole("link", { name: "MedlinePlus — Albuterol" }),
  ).toHaveAttribute(
    "href",
    "https://medlineplus.gov/druginfo/meds/a682145.html",
  );
  await expect(page.locator(".comparison-notice")).toContainText(
    "Do not start, stop, combine, or switch",
  );
  await expect(page.locator("body")).toHaveJSProperty(
    "scrollWidth",
    await page.evaluate(() => innerWidth),
  );
  expect(errors).toEqual([]);
});

test("swap, selectors, reload and history preserve the compared pair", async ({
  page,
}) => {
  await page.goto("/#compare/sertraline/duloxetine");
  await expect(
    page.getByRole("combobox", { name: "First medicine" }),
  ).toHaveValue("sertraline");
  await page.getByRole("button", { name: "Swap compared medicines" }).click();
  await expect(
    page.getByRole("combobox", { name: "First medicine" }),
  ).toHaveValue("duloxetine");
  await expect(
    page.getByRole("combobox", { name: "Second medicine" }),
  ).toHaveValue("sertraline");
  await page.reload();
  await expect(
    page.getByRole("combobox", { name: "First medicine" }),
  ).toHaveValue("duloxetine");
  await page.goBack();
  await expect(
    page.getByRole("combobox", { name: "First medicine" }),
  ).toHaveValue("sertraline");
  await page
    .getByRole("combobox", { name: "Second medicine" })
    .selectOption("bupropion-xl");
  await expect(
    page.getByRole("region", { name: "Why these medicines are connected" }),
  ).toContainText("Depression");
  await expect(
    page
      .getByRole("combobox", { name: "Second medicine" })
      .locator('option[value="sertraline"]'),
  ).toHaveJSProperty("disabled", true);
  await page.getByRole("link", { name: "Back to medication guide" }).click();
  await expect(page.locator(".med-heading h2")).toContainText("Sertraline");
});

test("no-match guides allow a manual comparison without inventing a relationship", async ({
  page,
}) => {
  await page.goto("/#explore/omeprazole");
  await expect(
    page.getByRole("region", { name: "Similar medicines" }),
  ).toContainText("No close related guides");
  await page
    .getByRole("link", { name: "Choose another medicine to compare" })
    .click();
  await expect(
    page.getByRole("combobox", { name: "First medicine" }),
  ).toHaveValue("omeprazole");
  await expect(
    page.getByRole("heading", { name: "Choose a second medicine to begin." }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Swap compared medicines" }),
  ).toBeDisabled();
  await page
    .getByRole("combobox", { name: "Second medicine" })
    .selectOption("amoxicillin");
  await expect(
    page.getByRole("region", { name: "Why these medicines are connected" }),
  ).toContainText("No curated clinical relationship");
  await expect(
    page.getByRole("region", { name: "What is it used for?", exact: true }),
  ).toContainText("strep throat");
  await expect(
    page.getByRole("region", { name: "What is it used for?", exact: true }),
  ).toContainText("gastroesophageal reflux disease");
});

test("invalid and duplicate deep links can be corrected using the selectors", async ({
  page,
}) => {
  await page.goto("/#compare/missing/albuterol");
  await expect(page.getByRole("alert")).toContainText("was not found");
  await page
    .getByRole("combobox", { name: "First medicine" })
    .selectOption("tiotropium");
  await expect(page.getByRole("alert")).toHaveCount(0);
  await expect(page.locator(".comparison-medicine")).toHaveCount(2);
  await page.goto("/#compare/albuterol/albuterol");
  await expect(page.getByRole("alert")).toContainText(
    "two different medicines",
  );
  await page
    .getByRole("combobox", { name: "Second medicine" })
    .selectOption("tiotropium");
  await expect(page.getByRole("alert")).toHaveCount(0);
  await expect(
    page.getByRole("button", { name: "Swap compared medicines" }),
  ).toBeEnabled();
});

test("long medication names and source links fit on small screens", async ({
  page,
}) => {
  await page.goto("/#compare/bictegravir-combination/sofosbuvir-velpatasvir");
  await expect(page.locator(".comparison-medicine")).toHaveCount(2);
  await expect(
    page
      .getByRole("region", { name: "Keep learning", exact: true })
      .getByRole("link"),
  ).toHaveCount(2);
  await expect(page.locator("body")).toHaveJSProperty(
    "scrollWidth",
    await page.evaluate(() => innerWidth),
  );
});
