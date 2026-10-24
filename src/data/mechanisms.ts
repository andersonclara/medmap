import type { Mechanism } from "./medications";
interface MechanismGuide {
  title: string;
  before: string;
  after: string;
  explanation: string;
  focus: string;
  input: string;
  target: string;
  output: [string, string];
}
export const mechanismGuides: Record<Mechanism, MechanismGuide> = {
  airway: {
    title: "A little more room to breathe",
    before: "Tight muscles. Narrow airways.",
    after: "Muscles relax. Airways widen.",
    explanation:
      "Relaxed smooth muscle creates more space for air to move through.",
    focus: "Airway",
    input: "Air",
    target: "Airway smooth muscle",
    output: ["Restricted airflow", "More room for airflow"],
  },
  glucose: {
    title: "A closer look at glucose",
    before: "The liver releases glucose.",
    after: "Less glucose released.",
    explanation: "Metformin helps reduce glucose production in the liver.",
    focus: "Liver",
    input: "Glucose production",
    target: "Liver",
    output: ["Glucose → bloodstream", "Less glucose → bloodstream"],
  },
  acid: {
    title: "Turning down acid production",
    before: "Proton pumps release acid.",
    after: "Less acid secreted.",
    explanation:
      "Omeprazole inhibits proton pumps in the stomach lining, reducing acid secretion.",
    focus: "Stomach",
    input: "Acid production",
    target: "Proton pump",
    output: ["Acid → stomach", "Less acid → stomach"],
  },
  cholesterol: {
    title: "Slowing cholesterol production",
    before: "An enzyme helps make cholesterol.",
    after: "Less cholesterol synthesized.",
    explanation:
      "Atorvastatin inhibits HMG-CoA reductase in the liver. Liver cells also increase LDL receptors, helping remove LDL from the blood.",
    focus: "Liver",
    input: "Cholesterol-making pathway",
    target: "HMG-CoA reductase",
    output: ["Cholesterol synthesis", "Reduced cholesterol synthesis"],
  },
  "beta-blocker": {
    title: "Turning down stress signals",
    before: "Stress signals stimulate the heart.",
    after: "Beta-1 signals are blocked.",
    explanation:
      "Metoprolol reduces the effect of stress signals at cardiac beta-1 receptors. Heart rate and contraction force can decrease. This diagram shows receptor signaling, not a measured pulse.",
    focus: "Heart",
    input: "Stress signals",
    target: "Beta-1 receptor",
    output: ["Stronger stimulation", "Reduced stimulation"],
  },
  diuretic: {
    title: "Following salt through the kidney",
    before: "Salt is taken back into the blood.",
    after: "Less salt is reabsorbed.",
    explanation:
      "Hydrochlorothiazide inhibits a sodium-chloride transporter in a kidney tubule. More salt and water can leave in urine; the kidney does not stop filtering.",
    focus: "Kidney tubule",
    input: "Filtered sodium + chloride",
    target: "Salt transporter",
    output: ["Salt → blood", "More salt + water → urine"],
  },
  serotonin: {
    title: "A closer look at nerve-cell signaling",
    before: "Serotonin is taken back into the cell.",
    after: "Serotonin reuptake is reduced.",
    explanation:
      "Sertraline inhibits the serotonin transporter, leaving more serotonin available between nerve cells. Clinical benefits take time and are not predicted by the animation.",
    focus: "Nerve-cell connection",
    input: "Serotonin in the synapse",
    target: "Serotonin transporter",
    output: ["Reuptake into nerve cell", "Reduced reuptake"],
  },
};
