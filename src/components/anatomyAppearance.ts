import * as THREE from "three";
import type { Layer } from "../data/anatomy";
import type { Organ } from "../data/medications";

/** Consistent medical-illustration materials for the independent female reference. */
export function femaleAnatomicalColor(name: string, layer: Layer, organ: Organ | null, original: THREE.Color) {
  const palette: Partial<Record<Organ, string>> = {
    Brain: "#d1a292", Lungs: "#cd9793", Heart: "#b65548", Liver: "#753b25", Kidneys: "#975446",
  };
  let color = organ ? palette[organ] : undefined;
  if (!color && layer === "skeletal") color = "#d9c9ad";
  if (!color && layer === "joints") color = "#d0c8b9";
  if (!color && layer === "muscular") color = "#b66154";
  if (!color && /artery|arteries|aorta/i.test(name)) color = "#ba554c";
  if (!color && /vein|venous/i.test(name)) color = "#637a9d";
  if (!color && /colon|intestin|jejun|ileum|duoden/i.test(name)) color = "#c78e83";
  if (!color && /pancrea/i.test(name)) color = "#c6a080";
  if (!color && /uterus|uterine|cervix|vagina|ovary|ovaries/i.test(name)) color = "#c58f89";
  if (!color && /urinary bladder/i.test(name)) color = "#c4a89a";
  return color ? new THREE.Color(color).lerp(original, .12) : original.clone();
}

/** Keep the real body silhouette for context without glazing over the dissection. */
export function contourSurface(material: THREE.MeshStandardMaterial) {
  material.color.set("#5c645f");
  material.onBeforeCompile = (shader) => {
    shader.fragmentShader = shader.fragmentShader.replace("#include <opaque_fragment>", `
      float bodyRim = pow(clamp(1.0 - abs(dot(normalize(normal), normalize(vViewPosition))), 0.0, 1.0), 2.2);
      diffuseColor.a *= 0.012 + 0.988 * bodyRim;
      #include <opaque_fragment>
    `);
  };
  material.customProgramCacheKey = () => "medmap-body-contour-v2";
}

export function isCoveringTissue(name: string) {
  return /omentum|pleura|fascia|mesocolon|meso-appendix|peritoneum|peritoneal membrane|mesentery|mesenterium|adipose|fat tissue/i.test(name);
}

// The source assembly also contains a standalone placental reference specimen.
// It is not part of the non-pregnant whole-body cutaway.
export function isSeparateObstetricReference(name: string) {
  return /placenta|chorionic|amnion/i.test(name);
}
