import type { Medication, Organ } from "../types/medication";
import { extendedMedications } from "./extendedMedications";
export type { Medication, Organ, Mechanism } from "../types/medication";
const originalMedications: Medication[] = [
  {
    id: "albuterol",
    mechanism: "airway",
    conditions: ["Asthma", "Exercise-induced bronchospasm"],
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
    mechanism: "glucose",
    conditions: ["Type 2 diabetes"],
    name: "Metformin",
    category: "Biguanide",
    organ: "Liver",
    system: "Metabolic system",
    uses: "Used along with diet and exercise to help manage blood glucose in people with type 2 diabetes. It is not used to treat type 1 diabetes. Selected off-label use in PCOS requires individual assessment of metabolic or reproductive goals.",
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
    mechanism: "acid",
    conditions: ["Acid reflux (GERD)", "Peptic ulcers"],
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

  {
    id: "atorvastatin",
    name: "Atorvastatin",
    category: "Statin",
    organ: "Liver",
    system: "Cardiovascular system",
    mechanism: "cholesterol",
    conditions: ["High cholesterol", "Cardiovascular risk reduction"],
    uses: "Used with diet to lower LDL cholesterol and other blood fats. It is also prescribed to reduce the risk of heart attack and stroke in certain people with cardiovascular disease or risk factors.",
    simple:
      "Atorvastatin slows an enzyme your liver uses to make cholesterol. Your liver also takes more LDL cholesterol out of the blood. LDL is often called ‘bad’ cholesterol.",
    scientific:
      "Atorvastatin inhibits HMG-CoA reductase, an enzyme in hepatic cholesterol synthesis. Reduced cholesterol within liver cells increases LDL receptor expression and LDL clearance from the circulation.",
    definition:
      "LDL carries cholesterol in the blood. LDL receptors on liver cells help remove these particles from circulation.",
    safety:
      "Report unexplained muscle pain, tenderness, or weakness, especially with fever or feeling unwell. Liver problems and drug interactions can occur. Discuss pregnancy, breastfeeding, all medicines, and grapefruit products with your healthcare provider. Do not change treatment based on this illustration.",
    questions: [
      "What are my cholesterol goals and how will we monitor them?",
      "Which muscle symptoms or other side effects should I report?",
      "Could any of my medicines or foods interact with atorvastatin?",
    ],
    source: "https://medlineplus.gov/druginfo/meds/a600045.html",
    quiz: "How does atorvastatin help lower LDL cholesterol?",
    choices: [
      "It opens the airways",
      "It inhibits cholesterol synthesis in the liver",
      "It blocks stomach acid pumps",
      "It increases salt reabsorption",
    ],
    correct: 1,
  },
  {
    id: "metoprolol",
    name: "Metoprolol",
    category: "Beta blocker",
    organ: "Heart",
    system: "Cardiovascular system",
    mechanism: "beta-blocker",
    conditions: [
      "High blood pressure (hypertension)",
      "Angina",
      "Heart failure",
    ],
    uses: "Used to treat high blood pressure and angina and to improve survival after a heart attack. Certain extended-release formulations are also used for heart failure. Uses depend on the formulation and clinical situation.",
    simple:
      "Metoprolol reduces the effect of stress signals on your heart. This can slow your heartbeat and reduce how hard your heart works.",
    scientific:
      "Metoprolol preferentially blocks beta-1 adrenergic receptors, reducing catecholamine-mediated increases in heart rate and contractility. Beta-1 selectivity is not absolute. It also reduces renin release from the kidneys.",
    definition:
      "Catecholamines, such as adrenaline, are signaling chemicals. Contractility describes the force of heart muscle contraction.",
    safety:
      "Dizziness, tiredness, and a slow heartbeat can occur. Suddenly stopping metoprolol can worsen heart problems; discuss any treatment changes with your prescriber. Tell your provider about asthma or other lung disease and diabetes, because it can affect breathing or mask some signs of low blood sugar. Formulations are not interchangeable without professional guidance.",
    questions: [
      "Which formulation am I taking, and what is it treating?",
      "What symptoms should I report about my pulse, dizziness, or breathing?",
      "What should I know before making any change to this medicine?",
    ],
    source: "https://medlineplus.gov/druginfo/meds/a682864.html",
    quiz: "Which effect does metoprolol have on the heart?",
    choices: [
      "It increases stomach acid",
      "It makes the liver produce glucose",
      "It reduces the effect of beta-1 stress signals",
      "It replaces insulin",
    ],
    correct: 2,
  },
  {
    id: "hydrochlorothiazide",
    name: "Hydrochlorothiazide",
    category: "Thiazide diuretic",
    organ: "Kidneys",
    system: "Renal and cardiovascular systems",
    mechanism: "diuretic",
    conditions: [
      "High blood pressure (hypertension)",
      "Fluid retention (edema)",
    ],
    uses: "Used to treat high blood pressure and fluid retention caused by certain medical conditions. It helps the kidneys remove more salt and water in the urine.",
    simple:
      "Your kidneys normally return some salt to your blood. Hydrochlorothiazide reduces how much salt is taken back in one part of the kidney. More salt and water leave in urine.",
    scientific:
      "Hydrochlorothiazide inhibits the sodium-chloride cotransporter in the distal convoluted tubule, reducing sodium and chloride reabsorption and increasing urinary excretion. Water follows these solutes. Its longer-term blood pressure effects also involve reduced peripheral vascular resistance.",
    definition:
      "Reabsorption means returning a filtered substance to the blood. A tubule is one of the small tubes inside a kidney’s filtering unit.",
    safety:
      "More frequent urination, dizziness, and changes in electrolytes such as sodium or potassium can occur. Your provider may monitor blood tests and kidney function. Tell your care team about gout, diabetes, and all medicines. Ask about sun protection and skin monitoring. Do not adjust salt, fluid, or supplements based on this site.",
    questions: [
      "Which blood tests and blood pressure checks will I need?",
      "What symptoms could signal dehydration or an electrolyte problem?",
      "Could this affect my other conditions or interact with my medicines?",
    ],
    source: "https://medlineplus.gov/druginfo/meds/a682571.html",
    quiz: "What does hydrochlorothiazide help the kidneys do?",
    choices: [
      "Remove more salt and water in urine",
      "Produce more stomach acid",
      "Increase cholesterol synthesis",
      "Open the airways",
    ],
    correct: 0,
  },
  {
    id: "sertraline",
    name: "Sertraline",
    category: "SSRI antidepressant",
    organ: "Brain",
    system: "Nervous system",
    mechanism: "serotonin",
    conditions: [
      "Depression",
      "Obsessive-compulsive disorder (OCD)",
      "Panic disorder",
      "Post-traumatic stress disorder (PTSD)",
      "Social anxiety disorder",
      "Premenstrual dysphoric disorder (PMDD)",
    ],
    uses: "Used to treat depression, obsessive-compulsive disorder, panic disorder, post-traumatic stress disorder, social anxiety disorder, and premenstrual dysphoric disorder. Approved uses vary by age and condition.",
    simple:
      "Sertraline slows the recycling of serotonin, a chemical that helps nerve cells communicate. This changes signaling between cells. Benefits can take several weeks; depression is not simply a lack of serotonin.",
    scientific:
      "Sertraline is a selective serotonin reuptake inhibitor (SSRI). It inhibits the serotonin transporter (SERT), reducing presynaptic reuptake and increasing serotonin availability in the synaptic space. Clinical effects involve adaptations over time; the full relationship between these changes and symptoms is complex.",
    definition:
      "A synapse is a communication point between nerve cells. Reuptake is the process that transports a signaling chemical back into the cell that released it.",
    safety:
      "Antidepressants carry a warning about increased suicidal thoughts and behaviors in children, adolescents, and young adults, particularly early in treatment or after changes. Seek urgent help for suicidal thoughts or severe behavioral changes. Serotonin syndrome, bleeding, and interactions with other medicines can occur. Do not stop suddenly; discuss changes with your prescriber.",
    questions: [
      "When should we review how I am feeling and any side effects?",
      "Which mood changes or other symptoms need urgent attention?",
      "Could my medicines or supplements interact with sertraline?",
    ],
    source: "https://medlineplus.gov/druginfo/meds/a697048.html",
    quiz: "Which process does sertraline inhibit?",
    choices: [
      "Stomach acid secretion",
      "Cholesterol synthesis",
      "Salt filtration",
      "Serotonin reuptake",
    ],
    correct: 3,
  },
];
export const medications: Medication[] = [
  ...originalMedications,
  ...extendedMedications,
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
