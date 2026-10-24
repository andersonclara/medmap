import catalog from "./referenceManifest.json";
import type { BodyVariant } from "./anatomy";
import type { Organ } from "./medications";

export const referenceAtlas = catalog;
export function hasReferenceOrgan(variant: BodyVariant, organ: Organ) {
  return ((catalog[variant].organs as Partial<Record<Organ, number>>)[organ] ?? 0) > 0;
}
export function hasReferenceTarget(variant: BodyVariant, id: string) {
  return catalog[variant].availableTargets.includes(id);
}
