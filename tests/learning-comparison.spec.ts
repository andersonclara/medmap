import { test, expect } from "@playwright/test";
import { medications } from "../src/data/medications";

test("comparison synchronizes airway illustrations while distinguishing receptor mechanisms and roles", async ({ page }, testInfo) => {
  await page.goto("/#compare/albuterol/tiotropium");
  const visual = page.getByRole("region", { name: "Synchronized airway mechanisms", exact: true });
  const airways = visual.getByTestId("airway-lumen");
  await expect(airways).toHaveCount(2);
  const before = await airways.first().getAttribute("d");
  const slider = page.getByRole("slider", { name: "Synchronized before-and-after illustrations", exact: true });
  await slider.focus(); await slider.press("End");
  await expect(airways.first()).not.toHaveAttribute("d", before!);
  expect(await airways.first().getAttribute("d")).toBe(await airways.last().getAttribute("d"));
  await expect(visual).toContainText("not rescue");
  await expect(visual).toContainText("not potency, onset, duration");
  await page.getByRole("button", { name: "Scientific", exact: true }).click();
  const albuterol = visual.getByRole("region", { name: "Albuterol airway mechanism", exact: true });
  const tiotropium = visual.getByRole("region", { name: "Tiotropium airway mechanism", exact: true });
  await albuterol.getByRole("button", { name: "Explore beta-2 receptor", exact: true }).click();
  await tiotropium.getByRole("button", { name: "Explore muscarinic M3 receptor", exact: true }).click();
  await expect(albuterol.locator(".hotspot-explanation")).toContainText("cAMP");
  await expect(tiotropium.locator(".hotspot-explanation")).toContainText("acetylcholine");
  await page.reload();
  await expect(page.getByRole("combobox", { name: "First medicine" })).toHaveValue("albuterol");
  await expect(page.getByRole("combobox", { name: "Second medicine" })).toHaveValue("tiotropium");
  await visual.screenshot({ path: `test-results/comparison-mechanisms-${testInfo.project.name}.png` });
  await expect(page.locator("body")).toHaveJSProperty("scrollWidth", await page.evaluate(() => innerWidth));
});

test("guide quiz explains mistakes and allows practice without duplicate session credit", async ({ page }) => {
  await page.goto("/#explore/albuterol");
  const med = medications.find((entry) => entry.id === "albuterol")!;
  const quiz = page.locator(".quiz");
  await quiz.locator(".quiz-options button").nth((med.correct + 1) % med.choices.length).click();
  await expect(quiz.getByRole("status")).toContainText(med.simple);
  await quiz.getByRole("button", { name: "Try this question again", exact: true }).click();
  await quiz.locator(".quiz-options button").nth(med.correct).click();
  await expect(quiz.locator(".small-pill")).toHaveText(`Session score: 1/${medications.length}`);
  await expect(quiz.getByRole("status")).toContainText(/That.s right/);
  await page.goto("/#explore/metformin");
  await expect(page.locator(".med-heading h2")).toContainText("Metformin");
  await page.goto("/#explore/albuterol");
  await expect(page.locator(".med-heading h2")).toContainText("Albuterol");
  await quiz.locator(".quiz-options button").nth(med.correct).click();
  await expect(quiz.locator(".small-pill")).toHaveText(`Session score: 1/${medications.length}`);
});

test("explorer selection synchronizes the focused target, guide, and mechanism", async ({ page }) => {
  await page.goto("/#explore/albuterol");
  const scene = page.getByTestId("anatomy-scene");
  await expect(scene).toHaveAttribute("data-focused-structure", "Lungs", { timeout: 30_000 });
  await page.getByRole("combobox", { name: "Ailment", exact: true }).selectOption("Type 2 diabetes");
  await page.locator(".med-list").getByRole("button", { name: /^Metformin/ }).click();
  await expect(scene).toHaveAttribute("data-focused-structure", "Liver", { timeout: 30_000 });
  await expect(scene).toHaveAttribute("data-highlighted-structures", "29");
  await expect(page.locator(".med-heading h2")).toContainText("Metformin");
  await expect(page.locator(".mechanism h3")).toHaveText("A closer look at glucose");
  await expect(page.locator(".atlas-medication-key")).toContainText("Metformin");
});
