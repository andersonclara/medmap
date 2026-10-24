import rankings from "./usRankings.json";
import { conditions } from "./conditions";
import { conditionTreatments } from "./conditionTreatments";
import { medications } from "./medications";
import { rankedConditionGuide } from "./rankingLinks";

export const ailments = [
  ...conditions.map((condition) => ({ id: condition.name, name: condition.name })),
  ...rankings.conditions.filter((row) => !rankedConditionGuide(row.id, row.name)).map((row) => ({ id: row.id, name: row.name })),
].sort((a, b) => a.name.localeCompare(b.name));

export function resolveAilment(value: string) {
  const ranked = rankings.conditions.find((row) => row.id === value);
  const canonical = ranked ? rankedConditionGuide(ranked.id, ranked.name)?.name ?? value : value;
  return ailments.find((entry) => entry.id === canonical);
}
export function medicinesForAilment(value: string) {
  const ailment = resolveAilment(value);
  const ids = ailment ? conditionTreatments[ailment.id]?.medicationIds ?? [] : [];
  return medications.filter((med) => ids.includes(med.id));
}
export function firstAilmentForMedicine(id: string) {
  return conditions.find((condition) => conditionTreatments[condition.name].medicationIds.includes(id))?.name ?? "";
}
