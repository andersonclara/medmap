export type Organ =
  "Brain" | "Lungs" | "Heart" | "Liver" | "Stomach" | "Kidneys";
export type Mechanism =
  | "airway"
  | "glucose"
  | "acid"
  | "cholesterol"
  | "beta-blocker"
  | "serotonin"
  | "diuretic";
export interface MechanismGuide {
  title: string;
  before: string;
  after: string;
  explanation: string;
  focus: string;
  input: string;
  target: string;
  output: [string, string];
  action?: "inhibits" | "supports" | "activates" | "modifies";
}
export interface Medication {
  id: string;
  name: string;
  category: string;
  organ: Organ | null;
  target?: string;
  system: string;
  conditions: string[];
  mechanism: Mechanism | MechanismGuide;
  uses: string;
  simple: string;
  scientific: string;
  definition: string;
  safety: string;
  questions: string[];
  source: string;
  sourceLabel?: string;
  quiz: string;
  choices: string[];
  correct: number;
}
