import { test, expect } from "@playwright/test";
import { readFile } from "node:fs/promises";
import catalog from "../src/data/referenceManifest.json" with { type: "json" };
import { NodeIO } from "@gltf-transform/core";
import { ALL_EXTENSIONS } from "@gltf-transform/extensions";
import { MeshoptDecoder } from "meshoptimizer";
import * as THREE from "three";

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
      expect(entries.every((entry: any) => entry.source === (layer === "skeletal" && entry.name !== "hyoid bone" ? "BoneHub" : "HRA"))).toBe(true);
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

test("both poses have outward thumbs and anterior feet without mirrored or scaled limb segments", async () => {
  await MeshoptDecoder.ready;
  const io = new NodeIO().registerExtensions(ALL_EXTENSIONS).registerDependencies({ "meshopt.decoder": MeshoptDecoder });
  for (const sex of ["male", "female"] as const) {
    const document = await io.read(`public/models/reference/${sex}/skeletal.glb`);
    const centers = new Map<string, THREE.Vector3>();
    for (const node of document.getRoot().listNodes()) {
      const mesh = node.getMesh(); if (!mesh) continue;
      const positions = mesh.listPrimitives()[0].getAttribute("POSITION")!;
      const transform = new THREE.Matrix4().fromArray(node.getWorldMatrix());
      const bounds = new THREE.Box3(), point = new THREE.Vector3(), element: number[] = [];
      for (let i = 0; i < positions.getCount(); i++) { positions.getElement(i, element); bounds.expandByPoint(point.fromArray(element).applyMatrix4(transform)); }
      centers.set(node.getName(), bounds.getCenter(new THREE.Vector3()));
    }
    for (const [side, sign] of [["left", 1], ["right", -1]] as const) {
      const thumb = centers.get(`Metacarpal 1 ${side}`)!, little = centers.get(`Metacarpal 5 ${side}`)!;
      expect((thumb.x - little.x) * sign).toBeGreaterThan(.015);
      const fingers = centers.get(`Metacarpal 3 ${side}`)!, wrist = centers.get(`Capitate ${side}`)!;
      expect(fingers.y).toBeLessThan(wrist.y);
      const toes = centers.get(`Metatarsal 3 ${side}`)!, heel = centers.get(`Calcaneus ${side}`)!;
      expect(toes.z - heel.z).toBeGreaterThan(.06);
      expect(Math.abs(toes.x - heel.x)).toBeLessThan(.02);
    }
    const report = JSON.parse(await readFile(`public/models/reference/${sex}/registration.json`, "utf8"));
    for (const segment of report.pose.segments) for (const name of ["upperArm", "forearm", "hand", "foot"]) {
      const matrix = new THREE.Matrix4().fromArray(segment[name]);
      expect(matrix.determinant()).toBeCloseTo(1, 8);
      const scale = new THREE.Vector3().setFromMatrixScale(matrix);
      for (const axis of scale.toArray()) expect(axis).toBeCloseTo(1, 8);
    }
    expect(catalog[sex].coverage.complete).toBe(false);
    for (const organ of ["Stomach", "Esophagus", "Thyroid gland", "Adrenal glands"]) expect(catalog[sex].coverage.missing).toContain(organ);
  }
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
