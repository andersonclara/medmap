export type Organ =
  "Brain" | "Lungs" | "Heart" | "Liver" | "Stomach" | "Kidneys";
export interface Medication {
  id: string;
  name: string;
  category: string;
  organ: Organ;
  system: string;
  uses: string;
  simple: string;
  scientific: string;
  definition: string;
  safety: string;
  questions: string[];
  source: string;
  quiz: string;
  choices: string[];
  correct: number;
}
export const medications: Medication[] = [
  {
    id: "albuterol",
    name: "Albuterol",
    category: "Bronchodilator",
    organ: "Lungs",
    system: "Respiratory system",
    uses: "Used to prevent and treat wheezing, difficulty breathing, chest tightness, and coughing caused by bronchospasm, including in asthma. It is also used to prevent breathing difficulties during exercise.",
    simple:
      "Albuterol relaxes the muscles wrapped around your airways. This helps the airways open up so air can move through more easily.",
    scientific:
      "Albuterol activates beta-2 adrenergic receptors in airway smooth muscle, increasing cyclic AMP. This relaxes smooth muscle and produces bronchodilation. It does not treat the underlying airway inflammation.",
    definition:
      "Bronchodilation means widening of the airways. Smooth muscle is the involuntary muscle surrounding them.",
    safety:
      "Albuterol can cause shakiness, nervousness, or a fast heartbeat. If breathing suddenly worsens after use, seek medical help immediately. If it is not helping as usual or is needed more often, contact your healthcare provider. Follow your prescribed asthma action plan.",
    questions: [
      "How can I check that I am using my inhaler correctly?",
      "What should I do if my usual medicine is not relieving my symptoms?",
      "How does my rescue inhaler fit into my asthma action plan?",
    ],
    source: "https://medlineplus.gov/druginfo/meds/a682145.html",
    quiz: "What does albuterol primarily do?",
    choices: [
      "Increases stomach acid",
      "Relaxes muscles around the airways",
      "Reduces glucose production",
      "Slows heart rate",
    ],
    correct: 1,
  },
  {
    id: "metformin",
    name: "Metformin",
    category: "Biguanide",
    organ: "Liver",
    system: "Metabolic system",
    uses: "Used along with diet and exercise to help manage blood glucose in people with type 2 diabetes. It is not used to treat type 1 diabetes.",
    simple:
      "Your liver makes and releases sugar for energy. Metformin helps it release less sugar and helps your body respond better to insulin.",
    scientific:
      "Metformin reduces hepatic glucose production and improves insulin sensitivity, increasing peripheral glucose uptake and utilization. It also decreases intestinal glucose absorption. Its actions involve multiple pathways and are simplified here.",
    definition:
      "Hepatic means related to the liver. Insulin sensitivity describes how well cells respond to insulin.",
    safety:
      "Digestive symptoms such as nausea or diarrhea can occur. Metformin has a warning for rare but serious lactic acidosis; kidney problems and some medical procedures can affect its safety. Tell your care team about kidney disease and planned imaging or surgery. Do not change your treatment on your own.",
    questions: [
      "How will we monitor my blood glucose and kidney function?",
      "Which side effects should I report?",
      "What should I know before an imaging test or surgery?",
    ],
    source: "https://medlineplus.gov/druginfo/meds/a696005.html",
    quiz: "Which liver process does metformin help reduce?",
    choices: [
      "Production of glucose",
      "Production of air",
      "Pumping of blood",
      "Secretion of stomach acid",
    ],
    correct: 0,
  },
  {
    id: "omeprazole",
    name: "Omeprazole",
    category: "Proton pump inhibitor",
    organ: "Stomach",
    system: "Digestive system",
    uses: "Used for conditions involving excess stomach acid, including gastroesophageal reflux disease (GERD) and some ulcers. It may be combined with other medicines to treat H. pylori infection.",
    simple:
      "Tiny pumps in your stomach lining release acid. Omeprazole blocks some of these pumps, so your stomach makes less acid.",
    scientific:
      "Omeprazole suppresses gastric acid secretion by inhibiting the H+/K+-ATPase enzyme system (the proton pump) at the secretory surface of gastric parietal cells. This blocks the final step of acid production.",
    definition:
      "Parietal cells are acid-producing cells in the stomach lining. A proton pump transports hydrogen ions to help form stomach acid.",
    safety:
      "Omeprazole is not intended for immediate relief of heartburn. It can interact with other medicines, and longer use has specific risks. Discuss the intended duration with your provider. Seek medical assessment for difficulty swallowing, unexplained weight loss, or bloody or black stools.",
    questions: [
      "What is the intended duration of my treatment?",
      "Could it interact with my other medicines?",
      "Which symptoms should prompt a medical assessment?",
    ],
    source: "https://medlineplus.gov/druginfo/meds/a693050.html",
    quiz: "What does omeprazole inhibit?",
    choices: [
      "Airway muscles",
      "Liver glucose release",
      "Gastric proton pumps",
      "The heartbeat",
    ],
    correct: 2,
  },
];
export const organInfo: Record<Organ, string> = {
  Brain:
    "Your brain coordinates thoughts, movement, and many automatic body functions.",
  Lungs:
    "Your lungs bring oxygen into your blood and remove carbon dioxide. Air travels through branching airways.",
  Heart:
    "Your heart pumps blood to deliver oxygen and nutrients throughout your body.",
  Liver:
    "Your liver processes nutrients and medicines and helps regulate the glucose in your blood.",
  Stomach:
    "Your stomach mixes food with digestive juices. Cells in its lining produce acid.",
  Kidneys:
    "Your kidneys filter your blood and help balance fluid and electrolytes.",
};
