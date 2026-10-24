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
  await page
    .getByRole("button", { name: "Explore Lungs", exact: true })
    .locator("path")
    .first()
    .click();
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
  await expect(page.getByText("Session score: 1/7")).toBeVisible();
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
  await expect(page.getByRole("status")).toContainText("No medications found");
  await expect(page.locator("body")).toHaveJSProperty(
    "scrollWidth",
    await page.evaluate(() => window.innerWidth),
  );
  expect(errors).toEqual([]);
});
test("anatomy supports keyboard and browser navigation", async ({ page }) => {
  await page.goto("/#explore");
  const lungs = page.getByRole("button", {
    name: "Explore Lungs",
    exact: true,
  });
  await lungs.focus();
  await page.keyboard.press("Enter");
  await expect(lungs).toHaveAttribute("aria-pressed", "true");
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

test("common-condition guides have distinct mechanisms and complete education", async ({
  page,
}) => {
  await page.goto("/#explore");
  const guides = [
    {
      name: "Atorvastatin",
      condition: "high cholesterol",
      organ: "Liver",
      scientific: "Atorvastatin inhibits HMG-CoA reductase",
      after: "Less cholesterol synthesized.",
      answer: "It inhibits cholesterol synthesis in the liver",
      source: "a600045",
    },
    {
      name: "Metoprolol",
      condition: "high blood pressure",
      organ: "Heart",
      scientific: "Metoprolol preferentially blocks beta-1",
      after: "Beta-1 signals are blocked.",
      answer: "It reduces the effect of beta-1 stress signals",
      source: "a682864",
    },
    {
      name: "Hydrochlorothiazide",
      condition: "edema",
      organ: "Kidneys",
      scientific: "Hydrochlorothiazide inhibits the sodium-chloride",
      after: "Less salt is reabsorbed.",
      answer: "Remove more salt and water in urine",
      source: "a682571",
    },
    {
      name: "Sertraline",
      condition: "depression",
      organ: "Brain",
      scientific: "Sertraline is a selective serotonin reuptake inhibitor",
      after: "Serotonin reuptake is reduced.",
      answer: "Serotonin reuptake",
      source: "a697048",
    },
  ];
  for (const [index, guide] of guides.entries()) {
    await page
      .getByRole("textbox", { name: "Search medications" })
      .fill(guide.condition);
    await page
      .locator(".med-list")
      .getByRole("button", { name: new RegExp("^" + guide.name) })
      .click();
    await expect(page.locator(".med-heading h2")).toContainText(guide.name);
    await expect(
      page.getByRole("button", { name: "Explore " + guide.organ, exact: true }),
    ).toHaveClass(/active/);
    await expect(
      page.getByRole("button", { name: "Simple", exact: true }),
    ).toHaveAttribute("aria-pressed", "true");
    await page.getByRole("button", { name: "Scientific", exact: true }).click();
    await expect(
      page
        .locator(".explanation")
        .getByText(guide.scientific, { exact: false }),
    ).toBeVisible();
    await expect(page.locator(".provider li")).toHaveCount(3);
    await expect(
      page.getByRole("link", { name: "MedlinePlus — " + guide.name }),
    ).toHaveAttribute(
      "href",
      `https://medlineplus.gov/druginfo/meds/${guide.source}.html`,
    );
    await page
      .getByRole("button", { name: "Show medication effect", exact: true })
      .click();
    await expect(
      page.getByRole("heading", { name: guide.after, exact: true }),
    ).toBeVisible();
    await expect(page.locator(".pathway")).toHaveAccessibleName(
      new RegExp("Medication inhibits"),
    );
    await page.getByRole("button", { name: "Reset illustration" }).click();
    await expect(
      page.getByRole("button", { name: "Show medication effect" }),
    ).toHaveAttribute("aria-pressed", "false");
    await page
      .locator(".quiz")
      .getByRole("button", { name: new RegExp(guide.answer) })
      .click();
    await expect(page.getByText(`Session score: ${index + 1}/7`)).toBeVisible();
    await expect(page.locator("body")).toHaveJSProperty(
      "scrollWidth",
      await page.evaluate(() => innerWidth),
    );
  }
  // Revisiting a guide must not credit the same medication twice.
  await page
    .getByRole("textbox", { name: "Search medications" })
    .fill("atorvastatin");
  await page
    .locator(".med-list")
    .getByRole("button", { name: /^Atorvastatin/ })
    .click();
  await page
    .locator(".quiz")
    .getByRole("button", { name: /It inhibits cholesterol synthesis/ })
    .click();
  await expect(page.getByText("Session score: 4/7")).toBeVisible();
  await page
    .getByRole("textbox", { name: "Search medications" })
    .fill("   HYPERTENSION   ");
  await expect(page.locator(".med-list button")).toHaveCount(2);
});

test("condition directory lists 100 guides and searches medication examples", async ({
  page,
}) => {
  await page.goto("/#conditions");
  await expect(
    page.getByRole("heading", {
      name: "Common conditions, treatment context.",
    }),
  ).toBeVisible();
  await expect(page.getByText("Showing 100 of 100 conditions")).toBeVisible();
  await expect(page.getByTestId("condition-guide")).toHaveCount(100);
  await page
    .getByRole("textbox", { name: "Search conditions or medicines" })
    .fill("levodopa");
  await expect(page.getByText("Showing 1 of 100 conditions")).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Parkinson disease" }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", {
      name: "Read about Parkinson disease on MedlinePlus",
    }),
  ).toHaveAttribute("href", /medlineplus\.gov\/search\//);
});
