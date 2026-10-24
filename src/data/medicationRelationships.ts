import { medications } from "./medications";
import type { Medication } from "../types/medication";

export type RelationshipKind =
  "same-class" | "related-mechanism" | "shared-use" | "treatment-area";
export interface MedicationRelationship {
  id: string;
  kind: RelationshipKind;
  title: string;
  medicationIds: string[];
  context: string;
}
export const relationshipLabels: Record<RelationshipKind, string> = {
  "same-class": "Shared drug family",
  "related-mechanism": "Related mechanism",
  "shared-use": "Some shared uses",
  "treatment-area": "Related treatment area",
};
// Explicit educational connections, not therapeutic equivalence or substitutions.
// A shared organ, an antibiotic label, or a search keyword alone is not a match.
export const medicationRelationships: MedicationRelationship[] = [
  {
    id: "penicillins",
    kind: "same-class",
    title: "Penicillin antibiotics",
    medicationIds: ["amoxicillin", "amoxicillin-clavulanate"],
    context:
      "Both contain amoxicillin; the combination also contains clavulanate. Organism susceptibility, infection site, allergy history, and adverse effects affect selection. They are not automatically interchangeable.",
  },
  {
    id: "beta-lactams",
    kind: "related-mechanism",
    title: "Bacterial cell-wall synthesis",
    medicationIds: ["amoxicillin", "amoxicillin-clavulanate", "cephalexin"],
    context:
      "These beta-lactam antibiotics interfere with bacterial cell-wall synthesis. Penicillins and cephalosporins have different coverage and allergy considerations; sharing a mechanism does not establish suitability for the same infection.",
  },
  {
    id: "local-corticosteroids",
    kind: "same-class",
    title: "Local corticosteroids",
    medicationIds: ["triamcinolone", "hydrocortisone-rectal"],
    context:
      "Both reduce inflammatory signaling through glucocorticoid receptors. The guides describe different tissues, routes, and formulations. A skin or injectable product must not be substituted for a rectal product.",
  },
  {
    id: "serotonin-reuptake",
    kind: "related-mechanism",
    title: "Serotonin reuptake",
    medicationIds: ["sertraline", "duloxetine"],
    context:
      "Both reduce serotonin reuptake, but sertraline is an SSRI and duloxetine is an SNRI with additional norepinephrine effects. Their indications, interactions, and discontinuation plans differ.",
  },
  {
    id: "depression",
    kind: "shared-use",
    title: "Depression",
    medicationIds: ["sertraline", "duloxetine", "bupropion-xl"],
    context:
      "These medicines can be used in selected depressive disorders, through different mechanisms. Diagnosis, seizure risk, other conditions, interactions, and monitoring determine suitability; this is not a treatment ranking.",
  },
  {
    id: "neuropathic-pain",
    kind: "shared-use",
    title: "Selected nerve-pain conditions",
    medicationIds: ["duloxetine", "gabapentin"],
    context:
      "Both have roles in selected nerve-pain conditions, but their labeled uses and mechanisms differ. A shared pain-related use does not mean they treat every neuropathy or can be exchanged.",
  },
  {
    id: "migraine",
    kind: "treatment-area",
    title: "Migraine care",
    medicationIds: ["sumatriptan", "onabotulinumtoxina"],
    context:
      "These guides cover different roles: sumatriptan is an acute-attack medicine; onabotulinumtoxinA is a clinician-administered prevention option for eligible chronic migraine. Prevention and acute treatment are not substitutes for each other.",
  },
  {
    id: "constipation",
    kind: "shared-use",
    title: "Selected constipation conditions",
    medicationIds: ["polyethylene-glycol", "linaclotide"],
    context:
      "Both can be used in selected constipation settings. Polyethylene glycol is an osmotic laxative; linaclotide acts at intestinal receptors and has indication- and age-specific restrictions. Neither is suitable for every bowel symptom.",
  },
  {
    id: "antifungals",
    kind: "treatment-area",
    title: "Fungal infections",
    medicationIds: ["clotrimazole-vaginal", "nystatin", "terbinafine"],
    context:
      "These medicines target fungi at different sites: vaginal tissue, the mouth, or nails. Their chemical classes, routes, organisms covered, and safety requirements differ. Products for one site are not substitutes for another.",
  },
  {
    id: "bronchodilation",
    kind: "related-mechanism",
    title: "Airway relaxation",
    medicationIds: ["albuterol", "tiotropium"],
    context:
      "Both affect airway muscle through different receptors. Albuterol is used as a reliever for bronchospasm; tiotropium is maintenance treatment and is not a rescue medicine. Product and condition-specific uses differ.",
  },
  {
    id: "glucose",
    kind: "shared-use",
    title: "Blood glucose management in type 2 diabetes",
    medicationIds: ["metformin", "empagliflozin", "insulin-lispro"],
    context:
      "These medicines can play different roles in type 2 diabetes. They affect different pathways and differ in low-glucose risk, kidney considerations, and delivery. Type 1 diabetes requires an insulin plan; the non-insulin medicines shown do not replace it.",
  },
  {
    id: "heart-failure",
    kind: "shared-use",
    title: "Selected heart-failure care",
    medicationIds: ["metoprolol", "empagliflozin"],
    context:
      "Both may be components of selected heart-failure regimens, with different roles. Only specific extended-release metoprolol formulations have a heart-failure indication. This connection does not imply they should replace one another.",
  },
  {
    id: "hypertension",
    kind: "shared-use",
    title: "High blood pressure",
    medicationIds: ["metoprolol", "hydrochlorothiazide"],
    context:
      "Both have blood-pressure uses, but one changes beta-adrenergic signaling and the other changes kidney salt handling. Heart rate, kidney function, electrolytes, and other conditions affect their roles.",
  },
  {
    id: "cardiovascular-risk",
    kind: "treatment-area",
    title: "Selected cardiovascular prevention",
    medicationIds: ["atorvastatin", "aspirin"],
    context:
      "These medicines have different prevention roles in eligible patients: atorvastatin lowers LDL cholesterol; aspirin reduces platelet aggregation. Aspirin has bleeding risks and is not appropriate for everyone. They are not alternatives for the same mechanism.",
  },
  {
    id: "seizures",
    kind: "treatment-area",
    title: "Selected seizure indications",
    medicationIds: ["levetiracetam", "gabapentin"],
    context:
      "Both have selected seizure indications, but seizure types, formulations, and broader uses differ. Gabapentin’s nerve-pain role does not make it a substitute for another antiseizure medicine.",
  },
];
const kindPriority: Record<RelationshipKind, number> = {
  "same-class": 4,
  "related-mechanism": 3,
  "shared-use": 2,
  "treatment-area": 1,
};
export function getRelationships(
  firstId: string,
  secondId: string,
): MedicationRelationship[] {
  if (firstId === secondId) return [];
  const matches = medicationRelationships.filter(
    (group) =>
      group.medicationIds.includes(firstId) &&
      group.medicationIds.includes(secondId),
  );
  // A shared family already conveys a shared mechanism; avoid repeating the same connection.
  return matches
    .filter(
      (group) =>
        group.kind !== "related-mechanism" ||
        !matches.some((match) => match.kind === "same-class"),
    )
    .sort(
      (a, b) =>
        kindPriority[b.kind] - kindPriority[a.kind] ||
        a.title.localeCompare(b.title),
    );
}
export function getSimilarMedications(
  id: string,
  limit = 3,
): { medication: Medication; relationships: MedicationRelationship[] }[] {
  if (!medications.some((m) => m.id === id)) return [];
  return medications
    .filter((m) => m.id !== id)
    .map((m) => ({ medication: m, relationships: getRelationships(id, m.id) }))
    .filter((match) => match.relationships.length > 0)
    .sort(
      (a, b) =>
        kindPriority[b.relationships[0].kind] -
          kindPriority[a.relationships[0].kind] ||
        a.medication.name.localeCompare(b.medication.name),
    )
    .slice(0, Math.max(0, limit));
}
export function comparisonHref(firstId: string, secondId = "") {
  return `#compare/${encodeURIComponent(firstId)}${secondId ? "/" + encodeURIComponent(secondId) : ""}`;
}
