import { test, expect } from "@playwright/test";
import { conditions } from "../src/data/conditions";
import { conditionTreatments } from "../src/data/conditionTreatments";
import { medications } from "../src/data/medications";
import { mechanismGuides } from "../src/data/mechanisms";

// Content and navigation must also work on devices without WebGL. Actual mesh,
// camera, layer and pointer interactions are exercised by the anatomy suites.
async function useStaticAtlasFallback(page: import("@playwright/test").Page) {
  await page.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext;
    Object.defineProperty(HTMLCanvasElement.prototype, "getContext", {
      value: function (kind: string, ...args: unknown[]) {
        if (kind.startsWith("webgl") || kind === "experimental-webgl")
          return null;
        return Reflect.apply(original, this, [kind, ...args]);
      },
    });
  });
}

test("directory coverage is complete and does not invent medication options", () => {
  expect(conditions).toHaveLength(100);
  expect(new Set(conditions.map((c) => c.name)).size).toBe(100);
  expect(Object.keys(conditionTreatments).sort()).toEqual(
    conditions.map((c) => c.name).sort(),
  );
  expect(new Set(medications.map((m) => m.id)).size).toBe(medications.length);
  const exceptions = conditions
    .filter((c) => conditionTreatments[c.name].medicationIds.length === 0)
    .map((c) => c.name);
  expect(exceptions.sort()).toEqual(
    [
      "Cataracts",
      "Celiac disease",
      "Hearing loss",
      "Sleep apnea, obstructive",
      "Varicose veins",
    ].sort(),
  );
  for (const condition of conditions) {
    const treatment = conditionTreatments[condition.name];
    expect(treatment.context.length, condition.name).toBeGreaterThan(50);
    for (const id of treatment.medicationIds)
      expect(
        medications.some((m) => m.id === id),
        `${condition.name}: ${id}`,
      ).toBe(true);
  }
  for (const med of medications) {
    expect(
      Object.values(conditionTreatments).some((t) =>
        t.medicationIds.includes(med.id),
      ),
      med.name,
    ).toBe(true);
    expect(med.questions, med.name).toHaveLength(3);
    expect(med.choices[med.correct], med.name).toBeTruthy();
    expect(new URL(med.source).protocol).toBe("https:");
    const guide =
      typeof med.mechanism === "string"
        ? mechanismGuides[med.mechanism]
        : med.mechanism;
    expect(guide.before, med.name).not.toEqual(guide.after);
  }
});

test("every linked condition opens the correct contextual guide", async ({
  page,
}) => {
  test.setTimeout(120_000);
  await useStaticAtlasFallback(page);
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/#conditions");
  await expect(page.getByTestId("condition-guide")).toHaveCount(100);
  const rows = page.getByTestId("condition-guide");
  await expect(rows.locator(".condition-medication-link")).toHaveCount(95);
  const links = await rows
    .locator(".condition-medication-link")
    .evaluateAll((nodes) =>
      nodes.map((node) => ({
        href: node.getAttribute("href")!,
        name: node.textContent!,
      })),
    );
  for (const link of links) {
    // Navigate through the actual href emitted by the directory, including its condition context.
    await page.goto("/" + link.href);
    await expect(page.locator(".med-heading h2")).toContainText(link.name);
    const condition = new URLSearchParams(link.href.split("?")[1]).get(
      "condition",
    )!;
    await expect(
      page.getByRole("complementary", { name: "Condition-specific context" }),
    ).toContainText(conditionTreatments[condition].context);
    await expect(page.locator(".education")).toHaveCount(2);
    if (await page.locator(".anatomy-explorer").count())
      await expect(page.locator(".scene-fallback")).toContainText(
        "3D is unavailable",
      );
    await expect(page.locator(".provider li")).toHaveCount(3);
    await expect(page.locator(".sources a")).toHaveAttribute(
      "href",
      /^https:\/\//,
    );
    await expect(page.locator("body")).toHaveJSProperty(
      "scrollWidth",
      await page.evaluate(() => innerWidth),
    );
  }
  expect(errors).toEqual([]);
});

test("directory click, deep links and back navigation preserve context", async ({
  page,
}) => {
  await page.goto("/#conditions");
  await page
    .getByRole("textbox", { name: "Search conditions or medicines" })
    .fill("Parkinson");
  await page
    .getByRole("link", {
      name: "Explore Carbidopa / levodopa for Parkinson disease",
      exact: true,
    })
    .click();
  await expect(page.locator(".med-heading h2")).toContainText(
    "Carbidopa / levodopa",
  );
  await page.getByRole("button", { name: "Scientific", exact: true }).click();
  await expect(page.locator(".explanation")).toContainText(
    "blood-brain barrier",
  );
  await page.getByRole("button", { name: "Show medication effect" }).click();
  await expect(page.locator(".mechanism")).toContainText(
    "A dopamine precursor is supplied.",
  );
  await expect(page.locator(".pathway")).toHaveAccessibleName(
    /Medication supports/,
  );
  await page.reload();
  await expect(page.locator(".selected-condition-context")).toContainText(
    "Parkinson disease",
  );
  await page
    .getByRole("link", { name: "← Back to condition directory" })
    .click();
  await expect(
    page.getByRole("heading", {
      name: "Common conditions, treatment context.",
    }),
  ).toBeVisible();
  await page
    .getByRole("textbox", { name: "Search conditions or medicines" })
    .fill("cataracts");
  const card = page.getByTestId("condition-guide");
  await expect(card).toHaveCount(1);
  await expect(card.locator(".condition-medication-link")).toHaveCount(0);
  await expect(card).toContainText(
    "No medication clears an established cataract",
  );
});

test("unmapped body targets and supportive mechanisms are labeled accurately", async ({
  page,
}) => {
  await page.goto("/#explore/insulin-lispro?condition=Type%201%20diabetes");
  await expect(
    page.getByRole("region", {
      name: "Educational target: Glucose regulation",
    }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", {
      name: /^Explore (Brain|Lungs|Heart|Liver|Stomach|Kidneys)$/,
    }),
  ).toHaveCount(0);
  await page.getByRole("button", { name: "Show medication effect" }).click();
  await expect(page.locator(".pathway")).toHaveAccessibleName(
    /Medication activates Insulin receptor/,
  );
  await expect(page.locator(".mechanism")).toContainText(
    "Activated by medication",
  );
  await expect(page.locator(".selected-condition-context")).toContainText(
    "not a complete basal-insulin replacement",
  );
  await page.goto("/#explore/aspirin?condition=Stroke");
  await expect(page.locator(".selected-condition-context")).toContainText(
    "not an acute self-treatment",
  );
});

test("every medication has working explanations, mechanism controls and quiz feedback", async ({
  page,
}) => {
  test.setTimeout(120_000);
  await useStaticAtlasFallback(page);
  for (const [index, med] of medications.entries()) {
    await page.goto("/#explore/" + med.id);
    await page.getByRole("button", { name: "Scientific", exact: true }).click();
    await expect(page.locator(".explanation-content")).toContainText(
      med.scientific,
    );
    await expect(page.locator(".definition")).toContainText(med.definition);
    const guide =
      typeof med.mechanism === "string"
        ? mechanismGuides[med.mechanism]
        : med.mechanism;
    await page
      .getByRole("button", {
        name:
          med.mechanism === "airway"
            ? "Show bronchodilation"
            : "Show medication effect",
        exact: true,
      })
      .click();
    await expect(page.locator(".mechanism h4")).toHaveText(guide.after);
    await page.getByRole("button", { name: "Reset illustration" }).click();
    await expect(page.locator(".mechanism h4")).toHaveText(guide.before);
    await page.locator(".quiz-options button").nth(med.correct).click();
    await expect(page.locator('.quiz [role="status"]')).toContainText(
      "That’s right!",
    );
    await expect(page.locator(".quiz .small-pill")).toHaveText(
      `Session score: ${index + 1}/${medications.length}`,
    );
  }
});
