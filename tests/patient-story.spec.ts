import { test, expect, type Page } from "@playwright/test";

async function staticAnatomy(page: Page) {
  await page.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (kind: string, ...args: any[]) {
      if (kind.startsWith("webgl") || kind === "experimental-webgl") return null;
      return original.call(this, kind, ...args);
    } as typeof original;
  });
}
async function preCheck(page: Page) {
  await page.getByRole("button", { name: "Start pre-lesson check", exact: true }).click();
  await page.getByRole("button", { name: /The lungs grow larger/ }).click();
  await expect(page.getByRole("status").filter({ hasText: "A useful starting point" })).toBeVisible();
  await page.getByRole("button", { name: "Next question", exact: true }).click();
  await page.getByRole("button", { name: /It relaxes airway smooth muscle/ }).click();
  await page.getByRole("button", { name: "Record starting point", exact: true }).click();
  await expect(page.locator(".story-checkpoint")).toContainText("1 of 2 correct on the first attempt");
}
async function mechanism(page: Page) {
  await page.getByRole("button", { name: "Zoom into the airway", exact: false }).click();
  const slider = page.getByRole("slider", { name: "Before-and-after airway view", exact: true });
  const before = await page.getByTestId("airway-lumen").getAttribute("d");
  await slider.focus();
  await slider.press("End");
  await expect(slider).toHaveValue("100");
  await expect(page.getByTestId("airway-lumen")).not.toHaveAttribute("d", before!);
  await page.getByRole("button", { name: "Scientific", exact: true }).click();
  await page.getByRole("button", { name: "Explore beta-2 receptor", exact: true }).click();
  await expect(page.locator(".hotspot-explanation")).toContainText("cyclic AMP");
  await expect(page.getByRole("button", { name: "Check understanding", exact: true })).toBeEnabled();
}
async function postCheck(page: Page) {
  await page.getByRole("button", { name: "Check understanding", exact: true }).click();
  await page.getByRole("button", { name: /Bacteria are removed/ }).click();
  await expect(page.getByRole("status").filter({ hasText: "first attempt is recorded separately" })).toBeVisible();
  await page.getByRole("button", { name: "Retry question", exact: true }).click();
  await page.getByRole("button", { name: /Beta-2 activation, cAMP signaling/ }).click();
  await page.getByRole("button", { name: "Next question", exact: true }).click();
  await page.getByRole("button", { name: /Albuterol can relieve bronchospasm/ }).click();
  await page.getByRole("button", { name: "See learning summary", exact: true }).click();
}

test("guided demo connects anatomy, slider, hotspots, retry, and honest learning results", async ({ page }, testInfo) => {
  test.setTimeout(90_000);
  const errors: string[] = [], modelRequests: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("request", (request) => { if (/models\/reference\/.*\.glb/.test(request.url())) modelRequests.push(request.url()); });
  await page.goto("/#demo");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("A little more room to breathe.");
  await expect(page.locator(".content-review")).toContainText("not independently clinically reviewed");
  await preCheck(page);
  await page.getByRole("button", { name: "Explore Maya's lungs", exact: false }).click();
  const scene = page.getByTestId("anatomy-scene");
  await expect(scene).toHaveAttribute("data-focused-structure", "Lungs", { timeout: 30_000 });
  await expect.poll(async () => Number(await scene.getAttribute("data-highlighted-structures"))).toBeGreaterThan(0);
  const canvas = scene.locator("canvas");
  await canvas.evaluate((element) => element.setAttribute("data-lesson-instance", "kept"));
  const loaded = modelRequests.length;
  await page.getByRole("button", { name: "Back to full body", exact: true }).click();
  await expect(scene).toHaveAttribute("data-focused-structure", "");
  await page.getByRole("button", { name: "Focus lungs", exact: true }).click();
  await expect(scene).toHaveAttribute("data-focused-structure", "Lungs");
  await mechanism(page);
  await expect(canvas).toHaveAttribute("data-lesson-instance", "kept");
  expect(modelRequests.length).toBe(loaded);
  await page.locator(".story-visual-workspace").screenshot({ path: `test-results/story-mechanism-${testInfo.project.name}.png` });
  await postCheck(page);
  const results = page.locator(".learning-results > div");
  await expect(results.nth(0)).toContainText("1 / 2");
  await expect(results.nth(1)).toContainText("1 / 2");
  await expect(results.nth(2)).toContainText("2 / 2");
  await expect(page.getByRole("progressbar", { name: "Lesson progress" })).toHaveAttribute("aria-valuenow", "5");
  await expect(page.locator(".learning-results-note")).toContainText("not validated evidence");
  await page.screenshot({ path: `test-results/story-summary-${testInfo.project.name}.png`, fullPage: true });
  await expect(page.locator("body")).toHaveJSProperty("scrollWidth", await page.evaluate(() => innerWidth));
  await page.getByRole("link", { name: "Open the albuterol guide", exact: true }).click();
  await expect(page.getByRole("combobox", { name: "Ailment", exact: true })).toHaveValue("Asthma");
  await expect(page.locator(".med-heading h2")).toContainText("Albuterol");
  expect(errors).toEqual([]);
});

test("session checkpoints are optional and fresh demo works without WebGL under reduced motion", async ({ page }) => {
  await staticAnatomy(page);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/#stories/asthma");
  await page.getByRole("checkbox", { name: /Keep completed-step progress/ }).check();
  await preCheck(page);
  await page.getByRole("button", { name: "Explore Maya's lungs", exact: false }).click();
  await expect(page.getByText("3D is unavailable in this browser.", { exact: false })).toBeVisible();
  await page.getByRole("button", { name: "Female", exact: true }).click();
  await expect(page.getByRole("img", { name: "Female anatomical reference", exact: true })).toBeVisible();
  await page.reload();
  await expect(page.locator(".story-step-title")).toHaveText("Explore the body");
  await expect(page.getByText("Completed-step progress restored for this tab.", { exact: true })).toBeVisible();
  await page.goto("/#demo");
  await expect(page.getByRole("progressbar", { name: "Lesson progress" })).toHaveAttribute("aria-valuenow", "0");
  await preCheck(page);
  await page.getByRole("button", { name: "Explore Maya's lungs", exact: false }).click();
  await mechanism(page);
  expect(await page.locator(".story-magnification").evaluate((element) => getComputedStyle(element).animationName)).toBe("none");
  await postCheck(page);
  await expect(page.getByRole("region", { name: "Learning summary", exact: true })).toBeVisible();
  await page.getByRole("link", { name: "Compare medication roles", exact: false }).click();
  await expect(page).toHaveURL(/#compare\/albuterol\/tiotropium/);
});

test("landing demo entry is keyboard accessible and future story steps stay gated", async ({ page }) => {
  await staticAnatomy(page);
  await page.goto("/");
  const demo = page.getByRole("link", { name: "Start Interactive Demo", exact: true });
  await demo.focus();
  await demo.press("Enter");
  await expect(page).toHaveURL(/#demo$/);
  const steps = page.getByRole("navigation", { name: "Patient story steps" });
  await expect(steps.getByRole("button", { name: /Understand the mechanism/ })).toBeDisabled();
  await expect(steps.getByRole("button", { name: /Learning summary/ })).toBeDisabled();
  await expect(page.getByRole("button", { name: "Start pre-lesson check", exact: true })).toBeVisible();
});
