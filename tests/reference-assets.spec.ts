import { test, expect } from "@playwright/test";
import { readFile } from "node:fs/promises";
import catalog from "../src/data/referenceManifest.json" with { type: "json" };

test("both references contain their own BoneHub skeleton and classified HRA layers", async () => {
  const skeletons = [];
  for (const sex of ["male", "female"] as const) {
    const names: string[] = [];
    for (const [layer, info] of Object.entries(catalog[sex].layers)) {
      const binary = await readFile(`public/models/reference/${sex}/${layer}.glb`);
      expect(binary.length).toBe(info.bytes);
      const gltf = JSON.parse(binary.subarray(20, 20 + binary.readUInt32LE(12)).toString());
      const entries = gltf.nodes.filter((node: any) => node.extras?.medmap).map((node: any) => node.extras.medmap);
      expect(entries).toHaveLength(info.structures);
      expect(entries.every((entry: any) => entry.layer === layer && entry.id.startsWith(`${sex}:`))).toBe(true);
      expect(entries.every((entry: any) => entry.source === (layer === "skeletal" ? "BoneHub" : "HRA"))).toBe(true);
      if (layer === "skeletal") {
        names.push(...entries.map((entry: any) => entry.name));
        skeletons.push(binary);
      }
      if (layer === "visceral") expect(entries.some((entry: any) => /^(femur|tibia|fibula|patella) [RL]$/i.test(entry.name))).toBe(false);
    }
    expect(names).toHaveLength(catalog[sex].boneCount);
    for (const name of ["Skull cranial maxilla", "Rib 12 left", "Humerus right", "Hip left", "Phalange hand 5 right", "Femur left", "Phalange foot 5 left"]) expect(names).toContain(name);
  }
  expect(skeletons[0].equals(skeletons[1])).toBe(false);
});

test("unavailable stomach geometry is disclosed in both references", async ({ page }) => {
  await page.goto("/#explore/omeprazole");
  const scene = page.getByTestId("anatomy-scene");
  for (const sex of ["Male", "Female"]) {
    await page.getByRole("button", { name: sex, exact: true }).click();
    await expect.poll(async () => Number(await scene.getAttribute("data-visible-structures")), { timeout: 30_000 }).toBeGreaterThan(300);
    await expect(scene).toHaveAttribute("data-highlighted-structures", "0");
    await expect(page.locator(".atlas-medication-key")).toContainText(/Stomach.*not|not.*Stomach/i);
    await page.getByRole("combobox", { name: "Search organs" }).fill("stomach");
    await expect(page.getByRole("listbox", { name: "Organ search results" }).getByRole("option")).toHaveCount(0);
    await expect(page.locator(".mechanism .unavailable-organ")).toContainText("Model unavailable");
  }
});
