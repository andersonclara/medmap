import fs from "node:fs/promises";
import path from "node:path";
import * as THREE from "three";
import { STLLoader } from "three/addons/loaders/STLLoader.js";
import { mergeVertices } from "three/addons/utils/BufferGeometryUtils.js";
import { Document, NodeIO, Logger } from "@gltf-transform/core";
import { ALL_EXTENSIONS } from "@gltf-transform/extensions";
import { meshopt } from "@gltf-transform/functions";
import { MeshoptEncoder, MeshoptDecoder, MeshoptSimplifier } from "meshoptimizer";

const source = "assets-source/free-atlas";
const output = "public/models/reference";
const manifest = JSON.parse(await fs.readFile(`${source}/bonehub-manifest.json`, "utf8"));
await Promise.all([MeshoptEncoder.ready, MeshoptDecoder.ready, MeshoptSimplifier.ready]);
const io = new NodeIO().registerExtensions(ALL_EXTENSIONS).registerDependencies({ "meshopt.encoder": MeshoptEncoder, "meshopt.decoder": MeshoptDecoder });
const logger = new Logger(Logger.Verbosity.WARN);
const boneLoader = new STLLoader();
const layers = ["skeletal", "joints", "muscular", "visceral", "cardiovascular", "nervous", "lymphatic"];
const organPatterns = { Brain: /brain|cerebr|cerebell|pons|medulla oblongata|thalam|gyrus|gyri|sulcus|sulci|lobule|hippocamp/i, Lungs: /lung|bronch|trachea/i, Heart: /heart|atrium|ventricle|aortic valve|mitral|tricuspid/i, Liver: /liver/i, Stomach: /stomach/i, Kidneys: /kidney|renal pelvis/i };
const organColors = { Brain: "#d1a292", Lungs: "#cd9793", Heart: "#b65548", Liver: "#753b25", Kidneys: "#975446", Stomach: "#c88e87" };
function boneKey(text) {
  const match = text.match(/(cervical|thoracic|lumbar)_vertebra_(\d+)(?:\D|$)/i);
  if (match) return `VERTEBRA_${{ cervical: "C", thoracic: "T", lumbar: "L" }[match[1].toLowerCase()]}${match[2]}`;
  if (/\bsacrum\b/i.test(text.replace(/_/g, " "))) return "SACRUM";
  return null;
}
function simplifyGeometry(input, ratio = .3, error = .0005) {
  input.deleteAttribute("normal");
  const geometry = mergeVertices(input, .00001);
  input.dispose();
  const indices = new Uint32Array(geometry.index.array);
  const positions = geometry.attributes.position.array;
  const target = Math.max(12, Math.floor(indices.length * ratio / 3) * 3);
  const [simplified] = MeshoptSimplifier.simplify(indices, positions, 3, target, error, ["LockBorder"]);
  const [remap, count] = MeshoptSimplifier.compactMesh(simplified);
  const compact = new Float32Array(count * 3);
  for (let i = 0; i < remap.length; i++) if (remap[i] !== 0xffffffff) compact.set(positions.subarray(i * 3, i * 3 + 3), remap[i] * 3);
  geometry.setAttribute("position", new THREE.BufferAttribute(compact, 3));
  geometry.setIndex(new THREE.BufferAttribute(simplified, 1));
  geometry.computeVertexNormals(); geometry.computeBoundingBox();
  return geometry;
}
function boundsOf(entries) { const box = new THREE.Box3(); for (const entry of entries) box.union(entry.geometry.boundingBox); return box; }
function fitUniform(pairs) {
  const from = new THREE.Vector3(), to = new THREE.Vector3();
  for (const pair of pairs) { from.add(pair.from); to.add(pair.to); }
  from.divideScalar(pairs.length); to.divideScalar(pairs.length);
  let numerator = 0, denominator = 0;
  for (const pair of pairs) { const a = pair.from.clone().sub(from), b = pair.to.clone().sub(to); numerator += a.dot(b); denominator += a.lengthSq(); }
  const scale = numerator / denominator;
  const translation = to.clone().addScaledVector(from, -scale);
  const matrix = new THREE.Matrix4().makeScale(scale, scale, scale).setPosition(translation);
  const errors = pairs.map((pair) => ({ bone: pair.key, residualMm: pair.from.clone().applyMatrix4(matrix).distanceTo(pair.to) * 1000 }));
  return { matrix, scale, translation: translation.toArray(), errors, rmsMm: Math.sqrt(errors.reduce((sum, item) => sum + item.residualMm ** 2, 0) / errors.length), maxMm: Math.max(...errors.map((item) => item.residualMm)) };
}
function classify(text, name) {
  let layer = "visceral", system = "digestive";
  if (/nervous_system/i.test(text)) { layer = "nervous"; system = "nervous"; }
  else if (/muscular_system/i.test(text)) { layer = "muscular"; system = "musculoskeletal"; }
  else if (/skeletal_system/i.test(text)) { layer = "joints"; system = "musculoskeletal"; }
  else if (/circulatory_system/i.test(text)) { layer = "cardiovascular"; system = "cardiovascular"; }
  else if (/lymphatic_system/i.test(text)) { layer = "lymphatic"; system = "lymphatic"; }
  else if (/reproductive_system/i.test(text)) system = "reproductive";
  else if (/urinary_system/i.test(text)) system = "urinary";
  else if (/respiratory_system/i.test(text)) system = "respiratory";
  else if (/integumentary_system/i.test(text)) system = "integumentary";
  else if (/pancrea|thyroid|suprarenal/i.test(text)) system = "endocrine";
  let organ = null;
  for (const [key, pattern] of Object.entries(organPatterns)) {
    if (key === "Brain" && layer !== "nervous" || key === "Heart" && layer !== "cardiovascular" || !["Brain", "Heart"].includes(key) && layer !== "visceral") continue;
    if (pattern.test(text)) { organ = key; break; }
  }
  const covering = system === "integumentary" || /omentum|pleura|fascia|mesocolon|peritoneum|mesentery|adipose/i.test(name);
  return { layer, system, organ, covering };
}
function colorFor(meta, text, original) {
  if (meta.organ) return organColors[meta.organ];
  if (meta.layer === "skeletal") return "#d9c9ad";
  if (meta.layer === "joints") return "#d0c8b9";
  if (meta.layer === "muscular") return "#b66154";
  if (/artery|arteries|aorta/i.test(text)) return "#ba554c";
  if (/vein|venous/i.test(text)) return "#637a9d";
  if (/colon|intestin|jejun|ileum|duoden/i.test(text)) return "#c78e83";
  if (/pancrea/i.test(text)) return "#c6a080";
  if (/uterus|uterine|cervix|vagina|ovary|ovaries/i.test(text)) return "#c58f89";
  return original ?? "#b99386";
}
function sourceGeometry(node, primitive) {
  const position = primitive.getAttribute("POSITION");
  const array = new Float32Array(position.getCount() * 3);
  const matrix = new THREE.Matrix4().fromArray(node.getWorldMatrix());
  const point = new THREE.Vector3(), element = [];
  for (let i = 0; i < position.getCount(); i++) { position.getElement(i, element); point.fromArray(element).applyMatrix4(matrix).toArray(array, i * 3); }
  const geometry = new THREE.BufferGeometry().setAttribute("position", new THREE.BufferAttribute(array, 3));
  const indices = primitive.getIndices();
  if (indices) geometry.setIndex(new THREE.BufferAttribute(new Uint32Array(indices.getArray()), 1));
  geometry.computeBoundingBox();
  return geometry;
}
await fs.mkdir(output, { recursive: true });
const catalog = {};
for (const subject of manifest.subjects) {
  const sex = subject.gender;
  console.log(`${sex}: reading BoneHub skeleton`);
  const bones = [];
  for (const region of manifest.regions) for (const bone of region.bones) {
    if (!bone.files[subject.id]?.stl) continue;
    const file = bone.files[subject.id].file;
    const buffer = await fs.readFile(`${source}/bones/${subject.id}/${region.id}/${file}.stl`);
    let geometry = boneLoader.parse(buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength));
    geometry.rotateX(-Math.PI / 2); geometry.scale(.001, .001, .001); geometry.computeBoundingBox();
    const name = bone.id.replace(/_/g, " ").toLowerCase().replace(/^./, (char) => char.toUpperCase());
    const center = geometry.boundingBox.getCenter(new THREE.Vector3());
    geometry = simplifyGeometry(geometry);
    bones.push({ geometry, center, key: bone.id, name, layer: "skeletal", system: "musculoskeletal", organ: null, source: "BoneHub", region: region.id, color: "#d9c9ad" });
  }
  const skeletonBounds = boundsOf(bones);
  const skeletonCenter = skeletonBounds.getCenter(new THREE.Vector3());
  const displayScale = 1.72 / skeletonBounds.getSize(new THREE.Vector3()).y;
  const display = new THREE.Matrix4().makeScale(displayScale, displayScale, displayScale).setPosition(-skeletonCenter.x * displayScale, -skeletonBounds.min.y * displayScale, -skeletonCenter.z * displayScale);
  console.log(`${sex}: reading HRA v1.10 organs`);
  const hra = await io.read(`${source}/hra-${sex}.glb`);
  const entries = [];
  const landmarks = new Map();
  for (const node of hra.getRoot().listNodes()) {
    const mesh = node.getMesh(); if (!mesh) continue;
    const ancestry = []; let parent = node;
    while (parent) { ancestry.push(parent.getName()); parent = parent.getParentNode(); }
    const text = ancestry.join(" ");
    const rawName = node.getName() || ancestry.find(Boolean) || "Unnamed structure";
    const label = node.getExtras().label;
    const name = label && label !== "-" ? String(label) : rawName.replace(/^VH_[FM]_/, "").replace(/_/g, " ");
    for (const primitive of mesh.listPrimitives()) {
      if (!primitive.getAttribute("POSITION") || primitive.getMode() !== 4) continue;
      const geometry = sourceGeometry(node, primitive);
      const key = boneKey(text);
      if (/skeletal_system/i.test(text) && key) { if (!landmarks.has(key)) landmarks.set(key, new THREE.Box3()); landmarks.get(key).union(geometry.boundingBox); }
      // BoneHub supplies the entire skeleton; keep only HRA connective tissue here.
      if (/skeletal_system/i.test(text) && !/cartilage|ligament|meniscus/i.test(text) || /placenta|chorionic|amnion|VH_[FM]_skin\b/i.test(text)) { geometry.dispose(); continue; }
      const meta = classify(text, name);
      if (meta.system === "integumentary") { geometry.dispose(); continue; }
      const color = primitive.getMaterial()?.getBaseColorFactor();
      const original = color ? new THREE.Color().setRGB(...color.slice(0, 3)).getStyle() : undefined;
      entries.push({ ...meta, geometry, name, searchText: `${name} ${text}`, source: "HRA", color: colorFor(meta, text, original) });
    }
  }
  const pairs = bones.filter((bone) => landmarks.has(bone.key)).map((bone) => ({ key: bone.key, from: landmarks.get(bone.key).getCenter(new THREE.Vector3()), to: bone.center }));
  if (pairs.length < 12) throw new Error(`${sex}: too few shared registration landmarks (${pairs.length})`);
  const fit = fitUniform(pairs);
  console.log(`${sex}: ${pairs.length} vertebral landmarks, RMS ${fit.rmsMm.toFixed(1)} mm, max ${fit.maxMm.toFixed(1)} mm, scale ${fit.scale.toFixed(4)}`);
  if (fit.rmsMm > 45) throw new Error(`${sex}: registration requires review; RMS ${fit.rmsMm.toFixed(1)} mm`);
  const organTransform = display.clone().multiply(fit.matrix);
  for (const entry of bones) entry.geometry.applyMatrix4(display);
  for (const entry of entries) { entry.geometry.applyMatrix4(organTransform); entry.geometry = simplifyGeometry(entry.geometry, .55, .0005); }
  const all = [...bones, ...entries];
  const report = { sex, sources: { skeleton: "BoneHub/visible-human-3d-models", skeletonRevision: manifest.revision, organs: "Human Reference Atlas united v1.10" }, boneCount: bones.length, registration: { method: "Uniform scale and translation using shared vertebral bounding-box centers; known patient axes converted from CT millimetres Z-up to glTF metres Y-up. No anatomy deformation.", scale: fit.scale, translation: fit.translation, landmarks: fit.errors, rmsMm: fit.rmsMm, maxMm: fit.maxMm }, limitations: ["Reference assembly registration, not a patient-specific or clinically validated model.", "BoneHub elbow regions are truncated in the source CT; some bones are grouped or absent.", "HRA organ, muscle, and nerve coverage is incomplete."] };
  const extraSearch = { pancreas: ["visceral", /pancrea/i], bladder: ["visceral", /urinary bladder|urinary_bladder/i], gallbladder: ["visceral", /gallbladder|gall bladder/i], "small-intestine": ["visceral", /jejun|ileum|small intestine|duoden/i], "large-intestine": ["visceral", /colon|large intestine/i], trachea: ["visceral", /trachea/i], thyroid: ["visceral", /thyroid gland/i], adrenal: ["visceral", /suprarenal gland/i], prostate: ["visceral", /prostate/i], uterus: ["visceral", /uterus|uterine/i], ovaries: ["visceral", /ovary|ovaries|ovarian/i], spleen: ["lymphatic", /spleen/i] };
  const availableTargets = [...new Set(all.filter((entry) => entry.organ).map((entry) => entry.organ.toLowerCase()))];
  for (const [id, [layer, pattern]] of Object.entries(extraSearch)) if (all.some((entry) => entry.layer === layer && pattern.test(entry.searchText ?? entry.name))) availableTargets.push(id);
  const info = { sex, boneCount: bones.length, source: "BoneHub + HRA / Visible Human", availableTargets, organs: {}, layers: {}, registrationRmsMm: fit.rmsMm };
  await fs.mkdir(`${output}/${sex}`, { recursive: true });
  for (const layer of layers) {
    const selected = all.filter((entry) => entry.layer === layer);
    const document = new Document().setLogger(logger);
    const buffer = document.createBuffer(); const scene = document.createScene("Matched Visible Human reference");
    for (const [index, entry] of selected.entries()) {
      const geometry = entry.geometry;
      const position = document.createAccessor().setType("VEC3").setArray(geometry.attributes.position.array).setBuffer(buffer);
      const normal = document.createAccessor().setType("VEC3").setArray(geometry.attributes.normal.array).setBuffer(buffer);
      const indices = document.createAccessor().setType("SCALAR").setArray(geometry.index.array).setBuffer(buffer);
      const color = new THREE.Color(entry.color);
      const material = document.createMaterial().setBaseColorFactor([color.r, color.g, color.b, 1]).setRoughnessFactor(layer === "skeletal" ? .65 : .48).setMetallicFactor(0).setDoubleSided(true);
      const primitive = document.createPrimitive().setAttribute("POSITION", position).setAttribute("NORMAL", normal).setIndices(indices).setMaterial(material);
      const mesh = document.createMesh(entry.name).addPrimitive(primitive);
      scene.addChild(document.createNode(entry.name).setMesh(mesh).setExtras({ medmap: { id: `${sex}:${layer}:${index}`, name: entry.name, layer, system: entry.system, organ: entry.organ, source: entry.source, searchText: entry.searchText ?? entry.name, covering: !!entry.covering } }));
      if (entry.organ) info.organs[entry.organ] = (info.organs[entry.organ] ?? 0) + 1;
    }
    if (selected.length) await document.transform(meshopt({ encoder: MeshoptEncoder, level: "medium", quantizePosition: 16, quantizeNormal: 12 }));
    await io.write(`${output}/${sex}/${layer}.glb`, document);
    const bytes = (await fs.stat(`${output}/${sex}/${layer}.glb`)).size;
    info.layers[layer] = { structures: selected.length, bytes };
    console.log(`${sex}/${layer}: ${selected.length} structures, ${(bytes / 1e6).toFixed(2)} MB`);
  }
  await fs.writeFile(`${output}/${sex}/registration.json`, JSON.stringify(report, null, 2));
  catalog[sex] = info;
  for (const entry of all) entry.geometry.dispose();
}
await fs.writeFile(`${output}/manifest.json`, JSON.stringify(catalog, null, 2));
await fs.writeFile("src/data/referenceManifest.json", JSON.stringify(catalog, null, 2));
console.log("Matched free atlas exported.");
