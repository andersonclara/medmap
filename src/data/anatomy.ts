import { medications, type Organ } from "./medications";

export const layerNames = {
  skeletal: "Bones", joints: "Joints & ligaments", muscular: "Muscles",
  visceral: "Organs", cardiovascular: "Blood vessels", nervous: "Nerves & brain", lymphatic: "Lymphatic",
} as const;
export type Layer = keyof typeof layerNames;
export type BodySystem = "all" | "respiratory" | "cardiovascular" | "digestive" | "urinary" | "nervous" | "musculoskeletal" | "endocrine" | "lymphatic" | "reproductive" | "integumentary";
export type BodyVariant = "male" | "female";
export const systemNames: Record<BodySystem, string> = {
  all: "All systems", respiratory: "Respiratory", cardiovascular: "Cardiovascular",
  digestive: "Digestive", urinary: "Urinary", nervous: "Nervous",
  musculoskeletal: "Musculoskeletal", endocrine: "Endocrine", lymphatic: "Lymphatic & immune", reproductive: "Reproductive", integumentary: "Skin & breast",
};
export const organPatterns: Record<Organ, RegExp> = {
  Brain: /cerebr|cerebell|brain|pons|medulla oblongata|thalam|gyrus|gyri|sulcus|sulci|lobule|hippocamp/i,
  Lungs: /lung|bronch|trachea/i, Heart: /heart|atrium|ventricle|aortic valve|mitral|tricuspid/i,
  Liver: /liver/i, Stomach: /stomach/i, Kidneys: /kidney|renal pelvis/i,
};
export function structureSystem(name: string, layer: Layer): BodySystem {
  if (layer === "cardiovascular") return "cardiovascular";
  if (layer === "nervous") return "nervous";
  if (layer === "lymphatic") return "lymphatic";
  if (["skeletal", "muscular", "joints"].includes(layer)) return "musculoskeletal";
  if (/lung|bronch|trachea|pleura|laryn|nasal|epiglottis/i.test(name)) return "respiratory";
  if (/thyroid|suprarenal|hypophysis|pineal|pancrea/i.test(name)) return "endocrine";
  if (/kidney|renal|ureter|urethra|urinary/i.test(name)) return "urinary";
  if (/penis|testis|prostate|epididym|deferens|ejaculatory|seminal/i.test(name)) return "reproductive";
  return "digestive";
}
export function organSystem(organ: Organ): BodySystem {
  return ({ Brain: "nervous", Lungs: "respiratory", Heart: "cardiovascular", Liver: "digestive", Stomach: "digestive", Kidneys: "urinary" } as const)[organ];
}
export interface MedicineMap {
  id: string;
  name: string;
  category: string;
  systems: BodySystem[];
  organs: Organ[];
  layers: Layer[];
  effect: string;
  context: string;
  source: string;
}
export const medicineMaps: MedicineMap[] = [
  ...medications.map((med) => ({
    id: med.id, name: med.name, category: med.category,
    systems: [organSystem(med.organ)], organs: [med.organ], layers: ["visceral"] as Layer[],
    effect: med.simple,
    context: med.id === "metformin" ? "The liver is one important site; metformin also acts through the gut and insulin-sensitive tissues." : med.id === "albuterol" ? "The highlight locates the lungs. The medicine acts on airway smooth muscle, which is too small to resolve in this atlas." : "The highlight locates the stomach. Proton pumps are microscopic and are not shown in the atlas.",
    source: med.source,
  })),
  { id: "lisinopril", name: "Lisinopril", category: "ACE inhibitor", systems: ["cardiovascular"], organs: [], layers: ["cardiovascular"], effect: "Reduces signals that tighten blood vessels, helping vessels relax and lowering blood pressure.", context: "The vessel network shows the system involved, rather than a single target organ. Kidney function and potassium are monitored during treatment.", source: "https://medlineplus.gov/druginfo/meds/a692051.html" },
  { id: "metoprolol", name: "Metoprolol", category: "Beta blocker", systems: ["cardiovascular"], organs: ["Heart"], layers: ["cardiovascular"], effect: "Slows the heart rate and reduces the heart’s workload. It is used for several cardiovascular conditions.", context: "The highlighted heart is a main site of action. This is an anatomical location map, not a simulated heart-rate response.", source: "https://medlineplus.gov/druginfo/meds/a682864.html" },
  { id: "furosemide", name: "Furosemide", category: "Loop diuretic", systems: ["urinary"], organs: ["Kidneys"], layers: ["visceral"], effect: "Helps the kidneys remove more salt and water in urine, reducing fluid buildup.", context: "The action takes place in microscopic kidney tubules. Fluid and electrolyte changes affect the whole body.", source: "https://medlineplus.gov/druginfo/meds/a682858.html" },
  { id: "atorvastatin", name: "Atorvastatin", category: "Statin", systems: ["digestive"], organs: ["Liver"], layers: ["visceral"], effect: "Reduces cholesterol production in the liver, helping lower cholesterol in the blood.", context: "The liver is highlighted as the main site of action; the cardiovascular benefits occur over time.", source: "https://medlineplus.gov/druginfo/meds/a600045.html" },
  { id: "sertraline", name: "Sertraline", category: "SSRI antidepressant", systems: ["nervous"], organs: ["Brain"], layers: ["nervous"], effect: "Changes serotonin signaling in the brain by reducing its reuptake. Therapeutic effects develop over time.", context: "The brain highlight locates the relevant organ. Synapses and neurotransmitter changes are not visible at this scale.", source: "https://medlineplus.gov/druginfo/meds/a697048.html" },
  { id: "insulin", name: "Human insulin", category: "Insulin replacement", systems: ["digestive", "musculoskeletal"], organs: ["Liver"], layers: ["visceral", "muscular"], effect: "Helps glucose move from the blood into cells and reduces glucose production by the liver.", context: "Muscle and liver are shown as representative tissues. Fat tissue also responds to insulin and is not separately modeled here.", source: "https://medlineplus.gov/druginfo/meds/a682611.html" },
  { id: "ibuprofen", name: "Ibuprofen", category: "NSAID", systems: ["musculoskeletal"], organs: [], layers: ["joints", "muscular", "skeletal"], effect: "Reduces production of substances involved in pain, fever, and inflammation.", context: "Muscles and joints illustrate common symptom locations, not exclusive sites of action. NSAIDs can also affect the stomach, kidneys, heart, and blood vessels.", source: "https://medlineplus.gov/druginfo/meds/a682159.html" },
  { id: "prednisone", name: "Prednisone", category: "Corticosteroid", systems: ["lymphatic"], organs: [], layers: ["lymphatic"], effect: "Reduces inflammation and changes immune activity in many tissues.", context: "Lymphatic structures represent part of the immune system. Immune cells are distributed throughout the body; the effect is not confined to these structures.", source: "https://medlineplus.gov/druginfo/meds/a601102.html" },
  { id: "amoxicillin", name: "Amoxicillin", category: "Penicillin antibiotic", systems: [], organs: [], layers: ["visceral"], effect: "Stops the growth of susceptible bacteria to treat certain bacterial infections.", context: "Its target is bacteria, not a human organ. No organ is highlighted because the infection site varies and bacteria are not modeled here.", source: "https://medlineplus.gov/druginfo/meds/a685001.html" },
  { id: "warfarin", name: "Warfarin", category: "Anticoagulant", systems: ["digestive", "cardiovascular"], organs: ["Liver"], layers: ["visceral", "cardiovascular"], effect: "Reduces the formation of certain clotting factors, decreasing the blood’s ability to clot.", context: "The liver makes clotting factors; the vessel network shows where blood circulates. The medicine does not dissolve an existing clot.", source: "https://medlineplus.gov/druginfo/meds/a682277.html" },
];
