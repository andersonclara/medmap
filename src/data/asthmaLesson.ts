export interface LearningQuestion {
  id: string; prompt: string; choices: string[]; correct: number; explanation: string;
}
export interface AssessmentResult {
  firstAnswers: number[]; finalAnswers: number[]; attempts: number[];
  firstScore: number; finalScore: number;
}
export const preQuestions: LearningQuestion[] = [
  { id: "airway-baseline", prompt: "What happens when the smooth muscle around an airway tightens?", choices: ["The airway opening becomes narrower", "The lungs grow larger", "Asthma permanently disappears"], correct: 0, explanation: "Contracting smooth muscle can narrow the airway opening. Inflammation and mucus can also contribute; this lesson isolates the muscle mechanism." },
  { id: "medicine-baseline", prompt: "What does albuterol do in this lesson?", choices: ["It treats a bacterial infection", "It eliminates every cause of asthma", "It relaxes airway smooth muscle"], correct: 2, explanation: "Albuterol is a bronchodilator. It relaxes airway smooth muscle; it does not cure asthma or provide every part of an asthma-management plan." },
];
export const postQuestions: LearningQuestion[] = [
  { id: "follow-signal", prompt: "Which sequence follows the mechanism you explored?", choices: ["Bacteria are removed, then the airway becomes rigid", "The thyroid is suppressed, then lungs grow", "Beta-2 activation, cAMP signaling, then smooth muscle relaxation"], correct: 2, explanation: "Albuterol activates beta-2 receptors. The resulting cAMP signaling contributes to bronchial smooth-muscle relaxation and bronchodilation." },
  { id: "apply-limits", prompt: "Maya thinks a wider opening means her asthma is cured. What is the better explanation?", choices: ["All asthma medicines are interchangeable", "Albuterol can relieve bronchospasm; ongoing asthma management still matters", "This diagram proves that asthma has disappeared"], correct: 1, explanation: "A bronchodilator can help relieve muscle-related narrowing. A schematic cannot demonstrate a cure or determine an individual's treatment plan." },
];
export const lessonSources = [
  { name: "MedlinePlus: albuterol inhalation", url: "https://medlineplus.gov/druginfo/meds/a682145.html" },
  { name: "NHLBI: asthma treatment and action plans", url: "https://www.nhlbi.nih.gov/health/asthma/treatment-action-plan" },
  { name: "NCI: albuterol receptor mechanism", url: "https://www.cancer.gov/publications/dictionaries/cancer-drug/def/albuterol-sulfate" },
  { name: "DailyMed: albuterol prescribing information", url: "https://dailymed.nlm.nih.gov/dailymed/fda/fdaDrugXsl.cfm?setid=264e2145-c7d4-4f4f-aa5b-9fe48a7c5b47" },
];
