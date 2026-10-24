import { medications } from "./medications";
import { conditions } from "./conditions";
import { conditionTreatments } from "./conditionTreatments";

export function rankedMedicineGuide(id: string) {
  return medications.find((med) => med.id === id);
}
// Only exact diagnosis scopes are crosswalked. Broad categories do not imply a treatment indication.
export const conditionCrosswalk: Record<string, string> = {
  RSP009: "Asthma",
  END005: "Type 2 diabetes",
  CIR007: "High blood pressure (hypertension)",
};
export function rankedConditionGuide(id: string, name: string) {
  return conditions.find((condition) => condition.name === conditionCrosswalk[id] || condition.name.toLowerCase() === name.toLowerCase());
}
export function simulationHref(medicine = "albuterol", condition?: string) {
  const ailment = condition ?? conditions.find((entry) => conditionTreatments[entry.name].medicationIds.includes(medicine))?.name;
  return `#explore${ailment ? "/" + encodeURIComponent(medicine) + "?condition=" + encodeURIComponent(ailment) : ""}`;
}
export const dailyMedSearch = (name: string) => `https://dailymed.nlm.nih.gov/dailymed/search.cfm?query=${encodeURIComponent(name)}`;
