import type { BodySystem, BodyVariant, Layer } from "./anatomy";
import type { Organ } from "./medications";

export interface OrganSearchEntry {
  id: string; label: string; aliases: string; layer: Layer; system: BodySystem;
  organ?: Organ; pattern?: string; variant?: BodyVariant;
}
export const organSearchEntries: OrganSearchEntry[] = [
  { id: "brain", label: "Brain", aliases: "cerebrum cerebellum nervous", layer: "nervous", system: "nervous", organ: "Brain" },
  { id: "lungs", label: "Lungs", aliases: "lung pulmonary breathing respiratory", layer: "visceral", system: "respiratory", organ: "Lungs" },
  { id: "heart", label: "Heart", aliases: "cardiac cardiovascular", layer: "cardiovascular", system: "cardiovascular", organ: "Heart" },
  { id: "liver", label: "Liver", aliases: "hepatic digestive", layer: "visceral", system: "digestive", organ: "Liver" },
  { id: "stomach", label: "Stomach", aliases: "gastric digestive", layer: "visceral", system: "digestive", organ: "Stomach", variant: "male" },
  { id: "kidneys", label: "Kidneys", aliases: "kidney renal urinary", layer: "visceral", system: "urinary", organ: "Kidneys" },
  { id: "pancreas", label: "Pancreas", aliases: "pancreatic endocrine insulin", layer: "visceral", system: "endocrine", pattern: "pancrea" },
  { id: "bladder", label: "Urinary bladder", aliases: "bladder urinary", layer: "visceral", system: "urinary", pattern: "urinary bladder|urinary_bladder" },
  { id: "gallbladder", label: "Gallbladder", aliases: "gall bladder bile digestive", layer: "visceral", system: "digestive", pattern: "gallbladder|gall bladder" },
  { id: "small-intestine", label: "Small intestine", aliases: "gut bowel duodenum jejunum ileum digestive", layer: "visceral", system: "digestive", pattern: "jejun|ileum|small intestine|duoden" },
  { id: "large-intestine", label: "Large intestine", aliases: "gut bowel colon digestive", layer: "visceral", system: "digestive", pattern: "colon|large intestine" },
  { id: "trachea", label: "Trachea", aliases: "windpipe airway respiratory", layer: "visceral", system: "respiratory", pattern: "trachea" },
  { id: "thyroid", label: "Thyroid gland", aliases: "thyroid endocrine neck", layer: "visceral", system: "endocrine", pattern: "^thyroid gland(?: |$)", variant: "male" },
  { id: "adrenal", label: "Adrenal glands", aliases: "adrenal suprarenal endocrine", layer: "visceral", system: "endocrine", pattern: "suprarenal gland", variant: "male" },
  { id: "prostate", label: "Prostate", aliases: "prostate reproductive", layer: "visceral", system: "reproductive", pattern: "prostate", variant: "male" },
  { id: "uterus", label: "Uterus", aliases: "uterus womb uterine reproductive", layer: "visceral", system: "reproductive", pattern: "uterus|uterine", variant: "female" },
  { id: "ovaries", label: "Ovaries", aliases: "ovary ovaries ovarian reproductive", layer: "visceral", system: "reproductive", pattern: "ovary|ovaries|ovarian", variant: "female" },
  { id: "spleen", label: "Spleen", aliases: "spleen splenic lymphatic", layer: "lymphatic", system: "lymphatic", pattern: "spleen", variant: "female" },
];
