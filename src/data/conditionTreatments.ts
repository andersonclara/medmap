export interface ConditionTreatment {
  medicationIds: string[];
  context: string;
  role: string;
}

// Explicit coverage for every condition. An empty list is deliberate, never a missing guide.
export const conditionTreatments: Record<string, ConditionTreatment> = {
  Acne: {
    medicationIds: ["benzoyl-peroxide"],
    context:
      "A topical example for acne; severity and skin sensitivity affect the care plan.",
    role: "Condition-specific example",
  },
  "Attention-deficit/hyperactivity disorder (ADHD)": {
    medicationIds: ["methylphenidate"],
    context:
      "A prescription example for ADHD after diagnostic, cardiovascular, and mental-health assessment.",
    role: "Condition-specific example",
  },
  "Allergic rhinitis (hay fever)": {
    medicationIds: ["cetirizine"],
    context:
      "An antihistamine example for allergy symptoms; it does not address every cause of nasal symptoms.",
    role: "Condition-specific example",
  },
  "Alzheimer disease": {
    medicationIds: ["donepezil"],
    context:
      "An example for symptom management; it does not cure or reverse Alzheimer disease.",
    role: "Condition-specific example",
  },
  "Iron-deficiency anemia": {
    medicationIds: ["ferrous-sulfate"],
    context:
      "Replacement applies to confirmed iron deficiency. The cause of the deficiency also needs investigation.",
    role: "Replacement therapy",
  },
  Angina: {
    medicationIds: ["metoprolol"],
    context:
      "An example for selected stable-angina care. New or worsening chest pain can be an emergency.",
    role: "Condition-specific example",
  },
  "Anxiety disorders": {
    medicationIds: ["sertraline"],
    context:
      "An example for specific disorders such as social anxiety and panic disorder; this is not an approval for every anxiety diagnosis.",
    role: "Condition-specific example",
  },
  Asthma: {
    medicationIds: ["albuterol"],
    context:
      "A reliever example for bronchospasm, not a substitute for an individualized anti-inflammatory/controller plan.",
    role: "Symptom or reliever treatment",
  },
  "Atrial fibrillation": {
    medicationIds: ["apixaban"],
    context:
      "A stroke-prevention example for eligible nonvalvular atrial fibrillation; it does not directly correct the heart rhythm.",
    role: "Condition-specific example",
  },
  "Atopic dermatitis (eczema)": {
    medicationIds: ["triamcinolone"],
    context:
      "Selected topical corticosteroid products can reduce inflammation. Site, age, formulation, and infection status matter.",
    role: "Condition-specific example",
  },
  "Bacterial vaginosis": {
    medicationIds: ["metronidazole"],
    context:
      "A prescription example after evaluating the diagnosis; this is not a treatment for yeast infection.",
    role: "Condition-specific example",
  },
  "Benign prostatic hyperplasia (enlarged prostate)": {
    medicationIds: ["tamsulosin"],
    context:
      "An example for urinary symptoms; it relaxes outlet muscle rather than shrinking every enlarged prostate.",
    role: "Condition-specific example",
  },
  "Bipolar disorder": {
    medicationIds: ["lithium"],
    context:
      "A specialist-managed mood-stabilizer example requiring blood-level and organ-function monitoring.",
    role: "Condition-specific example",
  },
  "Bladder infection (cystitis)": {
    medicationIds: ["nitrofurantoin"],
    context:
      "An example for susceptible lower bacterial UTI, not kidney infection or systemic illness.",
    role: "Condition-specific example",
  },
  "Breast cancer": {
    medicationIds: ["tamoxifen"],
    context:
      "An example only for selected hormone-receptor-positive disease or risk-reduction settings. Other subtypes need different care.",
    role: "Subtype-specific / specialist example",
  },
  "Acute bronchitis": {
    medicationIds: ["acetaminophen"],
    context:
      "May relieve pain or fever; it does not cure bronchitis. Antibiotics are generally not useful for viral bronchitis.",
    role: "Symptom relief only",
  },
  "Chronic obstructive pulmonary disease (COPD)": {
    medicationIds: ["tiotropium"],
    context:
      "A maintenance bronchodilator example. It is not a rescue treatment for acute breathlessness.",
    role: "Condition-specific example",
  },
  "Celiac disease": {
    medicationIds: [],
    context:
      "There is no standard medication that replaces a strict gluten-free diet. Documented deficiencies may need replacement, but a supplement is not a treatment for the underlying disease.",
    role: "No general medication option",
  },
  Cellulitis: {
    medicationIds: ["cephalexin"],
    context:
      "An example for selected susceptible bacterial skin infections. Severe infection or resistant organisms may require different care.",
    role: "Condition-specific example",
  },
  "Chronic kidney disease": {
    medicationIds: ["empagliflozin"],
    context:
      "A kidney-protection example in eligible patients. Kidney function and the individual diagnosis determine suitability.",
    role: "Condition-specific example",
  },
  "Chronic pain": {
    medicationIds: ["duloxetine"],
    context:
      "An example for selected chronic pain disorders, not every cause of pain. Pain assessment and nonmedication care remain important.",
    role: "Condition-specific example",
  },
  "Common cold": {
    medicationIds: ["acetaminophen"],
    context: "May relieve fever or aches; it does not treat the cold virus.",
    role: "Symptom relief only",
  },
  Constipation: {
    medicationIds: ["polyethylene-glycol"],
    context:
      "An osmotic laxative example for occasional constipation after considering warning symptoms and causes.",
    role: "Condition-specific example",
  },
  "Coronary artery disease": {
    medicationIds: ["atorvastatin"],
    context:
      "A cardiovascular risk-reduction example, not a substitute for emergency care for chest pain.",
    role: "Condition-specific example",
  },
  "COVID-19": {
    medicationIds: ["nirmatrelvir-ritonavir"],
    context:
      "An antiviral combination for eligible higher-risk patients. Timing, kidney function, and serious interactions require prompt review.",
    role: "Eligibility-dependent example",
  },
  "Major depressive disorder": {
    medicationIds: ["sertraline"],
    context:
      "An antidepressant example used with individualized mental-health assessment, monitoring, and sometimes psychotherapy.",
    role: "Condition-specific example",
  },
  "Type 1 diabetes": {
    medicationIds: ["insulin-lispro"],
    context:
      "A rapid-acting component of an individualized insulin plan. Rapid-acting insulin by itself is not a complete basal-insulin replacement.",
    role: "Part of a complete treatment plan",
  },
  "Type 2 diabetes": {
    medicationIds: ["metformin"],
    context:
      "One glucose-lowering example. Heart, kidney, and other health factors affect the broader treatment plan.",
    role: "Condition-specific example",
  },
  "Acute diarrhea": {
    medicationIds: ["oral-rehydration-salts"],
    context:
      "Replaces lost fluid and electrolytes. It does not treat every cause of diarrhea or replace care for severe dehydration.",
    role: "Supportive care",
  },
  "Dry eye disease": {
    medicationIds: ["artificial-tears"],
    context:
      "A lubricant example for symptom relief. Persistent pain or vision changes need eye assessment.",
    role: "Condition-specific example",
  },
  Endometriosis: {
    medicationIds: ["norethindrone-acetate"],
    context:
      "A selected hormonal-treatment example. Formulations and reproductive goals require individual review.",
    role: "Condition-specific example",
  },
  Epilepsy: {
    medicationIds: ["levetiracetam"],
    context:
      "An antiseizure example; suitability depends on seizure type and patient factors.",
    role: "Condition-specific example",
  },
  "Erectile dysfunction": {
    medicationIds: ["sildenafil"],
    context:
      "A prescription example when cardiovascular status and interactions allow; combining it with nitrates is dangerous.",
    role: "Condition-specific example",
  },
  "Gastroesophageal reflux disease (GERD)": {
    medicationIds: ["omeprazole"],
    context:
      "An acid-suppressing example. Duration, warning symptoms, and the underlying diagnosis require review.",
    role: "Condition-specific example",
  },
  Glaucoma: {
    medicationIds: ["latanoprost"],
    context:
      "An eye-pressure-lowering example for selected open-angle disease. Eye-specialist monitoring remains essential.",
    role: "Condition-specific example",
  },
  Gout: {
    medicationIds: ["colchicine"],
    context:
      "An inflammation-control example for selected flares or prevention plans; it does not lower uric acid.",
    role: "Condition-specific example",
  },
  "Hearing loss": {
    medicationIds: [],
    context:
      "Most hearing loss has no general medication treatment. Care depends on the cause and may involve hearing devices or procedures. Sudden hearing loss needs urgent assessment; specific causes may have time-sensitive treatments.",
    role: "No general medication option",
  },
  "Heart failure": {
    medicationIds: ["metoprolol"],
    context:
      "Only specific extended-release formulations have a heart-failure indication. It is one part of selected stable heart-failure regimens, not a treatment to self-start in acute deterioration.",
    role: "Formulation-specific / combination care",
  },
  "Helicobacter pylori infection": {
    medicationIds: ["omeprazole"],
    context:
      "An acid-suppression component of eradication regimens. Omeprazole alone does not eradicate H. pylori; a clinician must select the full combination.",
    role: "Combination component \u2014 not alone",
  },
  Hemorrhoids: {
    medicationIds: ["hydrocortisone-rectal"],
    context:
      "Selected anorectal corticosteroid products can temporarily relieve inflammation. They do not remove hemorrhoids or explain persistent bleeding.",
    role: "Temporary symptom relief",
  },
  "Hepatitis B, chronic": {
    medicationIds: ["tenofovir-df"],
    context:
      "An antiviral example for patients who meet treatment criteria; monitoring is required even when not receiving treatment.",
    role: "Condition-specific example",
  },
  "Hepatitis C": {
    medicationIds: ["sofosbuvir-velpatasvir"],
    context:
      "A direct-acting antiviral combination example. Cirrhosis, previous treatment, hepatitis B status, and interactions affect planning.",
    role: "Condition-specific example",
  },
  "High blood pressure (hypertension)": {
    medicationIds: ["hydrochlorothiazide"],
    context:
      "A thiazide-diuretic example; other choices may be preferable based on health history and monitoring.",
    role: "Condition-specific example",
  },
  "High cholesterol": {
    medicationIds: ["atorvastatin"],
    context:
      "A statin example selected according to lipid levels, cardiovascular risk, and individual factors.",
    role: "Condition-specific example",
  },
  "HIV infection": {
    medicationIds: ["bictegravir-combination"],
    context:
      "A complete antiretroviral combination example for eligible patients. Resistance, coexisting hepatitis B, and interactions matter.",
    role: "Condition-specific example",
  },
  Hypothyroidism: {
    medicationIds: ["levothyroxine"],
    context:
      "Thyroid hormone replacement for diagnosed deficiency, with blood-test monitoring.",
    role: "Replacement therapy",
  },
  "Influenza (flu)": {
    medicationIds: ["oseltamivir"],
    context:
      "An antiviral example; prompt assessment is important, particularly for high-risk or severely ill people.",
    role: "Condition-specific example",
  },
  Insomnia: {
    medicationIds: ["ramelteon"],
    context:
      "An example for difficulty falling asleep. Cognitive behavioral therapy for insomnia and cause assessment remain important.",
    role: "Condition-specific example",
  },
  "Irritable bowel syndrome (IBS)": {
    medicationIds: ["linaclotide"],
    context:
      "An example for constipation-predominant IBS, not diarrhea-predominant IBS or every cause of abdominal pain.",
    role: "Subtype-specific example",
  },
  "Kidney stones": {
    medicationIds: ["tamsulosin"],
    context:
      "An off-label example sometimes considered for selected ureteral stones. Obstruction, infection, stone location, and size change management.",
    role: "Selected off-label use",
  },
  "Lung cancer": {
    medicationIds: ["osimertinib"],
    context:
      "A targeted example only for selected EGFR-mutated non-small cell lung cancers after molecular testing.",
    role: "Subtype-specific / specialist example",
  },
  "Lyme disease": {
    medicationIds: ["doxycycline"],
    context:
      "An antibiotic example for certain manifestations. Stage, neurologic or cardiac involvement, age, and pregnancy affect selection.",
    role: "Condition-specific example",
  },
  Malaria: {
    medicationIds: ["artemether-lumefantrine"],
    context:
      "A combination example for selected uncomplicated malaria. Severe malaria is an emergency and requires a different treatment approach.",
    role: "Species- and severity-dependent example",
  },
  Migraine: {
    medicationIds: ["sumatriptan"],
    context:
      "An acute-attack example for eligible patients; it is not a routine prevention treatment.",
    role: "Condition-specific example",
  },
  "Multiple sclerosis": {
    medicationIds: ["interferon-beta-1a"],
    context:
      "A disease-modifying example for selected relapsing forms, not a cure or a treatment for every disease course.",
    role: "Condition-specific example",
  },
  Osteoarthritis: {
    medicationIds: ["diclofenac-topical"],
    context:
      "A symptom-relief example for joints appropriate to the product. It does not rebuild cartilage.",
    role: "Condition-specific example",
  },
  Osteoporosis: {
    medicationIds: ["alendronate"],
    context:
      "A bone-resorption-reducing example selected after fracture-risk, kidney, swallowing, and dental assessment.",
    role: "Condition-specific example",
  },
  "Otitis media (middle ear infection)": {
    medicationIds: ["amoxicillin"],
    context:
      "An example when a clinician determines antibiotics are appropriate. Some middle-ear infections improve without antibiotics.",
    role: "Condition-specific example",
  },
  "Ovarian cancer": {
    medicationIds: ["carboplatin"],
    context:
      "A chemotherapy component in selected oncology regimens, commonly combined with other treatment.",
    role: "Specialist combination-treatment example",
  },
  "Panic disorder": {
    medicationIds: ["sertraline"],
    context:
      "An SSRI example; psychotherapy may also be part of the treatment plan.",
    role: "Condition-specific example",
  },
  "Parkinson disease": {
    medicationIds: ["carbidopa-levodopa"],
    context:
      "A combination example for movement symptoms; it does not cure Parkinson disease.",
    role: "Condition-specific example",
  },
  "Peptic ulcer disease": {
    medicationIds: ["omeprazole"],
    context:
      "An acid-suppression example. H. pylori-associated ulcers require eradication treatment, and other causes need assessment.",
    role: "Condition-specific example",
  },
  "Peripheral neuropathy": {
    medicationIds: ["duloxetine"],
    context:
      "An example for selected neuropathic pain, particularly diabetic peripheral neuropathic pain. It does not repair every nerve injury.",
    role: "Condition-specific example",
  },
  Pneumonia: {
    medicationIds: ["azithromycin"],
    context:
      "A component or selected antibiotic example for susceptible bacterial pneumonia, not all pneumonia. Severity, resistance, and other coverage determine the regimen.",
    role: "Cause- and regimen-dependent example",
  },
  "Polycystic ovary syndrome (PCOS)": {
    medicationIds: ["metformin"],
    context:
      "An off-label example used in selected patients for metabolic or reproductive goals. It does not treat all PCOS features.",
    role: "Selected off-label use",
  },
  Psoriasis: {
    medicationIds: ["calcipotriene"],
    context:
      "A topical example for plaque psoriasis. Extent, body site, and formulation affect suitability.",
    role: "Condition-specific example",
  },
  "Psoriatic arthritis": {
    medicationIds: ["methotrexate"],
    context:
      "An example for selected peripheral joint disease. Other disease-modifying treatment may be needed depending on disease pattern.",
    role: "Condition-specific example",
  },
  "Rheumatoid arthritis": {
    medicationIds: ["methotrexate"],
    context:
      "A disease-modifying example requiring a carefully verified schedule and blood monitoring; it is not simply a pain medicine.",
    role: "Condition-specific example",
  },
  Rosacea: {
    medicationIds: ["doxycycline"],
    context:
      "Selected dermatologic formulations target inflammatory lesions. These are not substitutes for antibiotic infection regimens.",
    role: "Formulation-specific example",
  },
  Schizophrenia: {
    medicationIds: ["risperidone"],
    context:
      "An antipsychotic example with individual metabolic, neurologic, and other monitoring needs.",
    role: "Condition-specific example",
  },
  "Seasonal affective disorder": {
    medicationIds: ["bupropion-xl"],
    context:
      "Selected XL products are used to prevent seasonal major depressive episodes. It is not suitable for every mood disorder.",
    role: "Formulation- and prevention-specific example",
  },
  "Shingles (herpes zoster)": {
    medicationIds: ["valacyclovir"],
    context:
      "An antiviral example; prompt assessment matters, especially with eye involvement or immunosuppression.",
    role: "Condition-specific example",
  },
  "Sinusitis, acute bacterial": {
    medicationIds: ["amoxicillin-clavulanate"],
    context:
      "An example only when bacterial infection and treatment eligibility are established. Most acute sinus symptoms do not require antibiotics.",
    role: "Condition-specific example",
  },
  "Sleep apnea, obstructive": {
    medicationIds: [],
    context:
      "There is no general medication that replaces airway-directed care. Selected adults with obesity and moderate-to-severe obstructive sleep apnea may qualify for specific weight-management medication, but this is not appropriate for everyone. A sleep clinician should guide evaluation and treatment.",
    role: "No general medication option",
  },
  "Strep throat": {
    medicationIds: ["amoxicillin"],
    context:
      "An antibiotic example for confirmed group A streptococcal infection; it is not a treatment for viral sore throat.",
    role: "Condition-specific example",
  },
  Stroke: {
    medicationIds: ["aspirin"],
    context:
      "A secondary-prevention example after selected ischemic strokes and clinician assessment. It is not an acute self-treatment and may be dangerous in hemorrhagic stroke. Sudden stroke symptoms require emergency services.",
    role: "Secondary prevention only \u2014 not acute treatment",
  },
  "Systemic lupus erythematosus": {
    medicationIds: ["hydroxychloroquine"],
    context:
      "An immunomodulator example used within an organ-specific lupus care plan, with eye and other monitoring.",
    role: "Condition-specific example",
  },
  "Tension-type headache": {
    medicationIds: ["acetaminophen"],
    context:
      "A temporary symptom-relief example. Frequent use can contribute to medication-overuse headache.",
    role: "Symptom relief only",
  },
  Tuberculosis: {
    medicationIds: ["isoniazid"],
    context:
      "A component of selected active-TB combination regimens or latent-TB regimens. Never use it alone for active tuberculosis.",
    role: "Combination component \u2014 not alone",
  },
  "Urinary incontinence": {
    medicationIds: ["mirabegron"],
    context:
      "An example for overactive bladder with urgency and urge incontinence, not every type of incontinence.",
    role: "Subtype-specific example",
  },
  "Urinary tract infection": {
    medicationIds: ["nitrofurantoin"],
    context:
      "An example for susceptible lower bacterial UTI only. Fever, flank pain, pregnancy, or systemic illness can require a different approach.",
    role: "Condition-specific example",
  },
  "Urticaria (hives)": {
    medicationIds: ["cetirizine"],
    context:
      "An antihistamine example for hives. Throat swelling, trouble breathing, or collapse requires emergency care, not reliance on an antihistamine.",
    role: "Condition-specific example",
  },
  "Vaginal yeast infection": {
    medicationIds: ["clotrimazole-vaginal"],
    context:
      "A local antifungal example for confirmed or appropriately assessed candidiasis, not every cause of vaginal symptoms.",
    role: "Condition-specific example",
  },
  "Varicose veins": {
    medicationIds: [],
    context:
      "Medicines do not remove varicose veins. Assessment may lead to compression, symptom measures, or procedures. New leg swelling or pain can have other causes and needs clinical evaluation.",
    role: "No general medication option",
  },
  "Viral gastroenteritis": {
    medicationIds: ["oral-rehydration-salts"],
    context:
      "Supports hydration during fluid loss; it does not kill viruses. Severe dehydration or inability to drink requires care.",
    role: "Supportive care",
  },
  "Vitamin B12 deficiency": {
    medicationIds: ["cyanocobalamin"],
    context:
      "A replacement example. The cause of deficiency, absorption, and neurologic symptoms determine route and follow-up.",
    role: "Replacement therapy",
  },
  "Whooping cough (pertussis)": {
    medicationIds: ["azithromycin"],
    context:
      "An antibiotic example for treatment or selected exposure management under clinical and public-health guidance.",
    role: "Condition-specific example",
  },
  "Yeast infection of the mouth (oral thrush)": {
    medicationIds: ["nystatin"],
    context:
      "A local oral antifungal example; persistent symptoms or immune compromise may need a different approach.",
    role: "Condition-specific example",
  },
  "Zoster neuralgia (postherpetic neuralgia)": {
    medicationIds: ["gabapentin"],
    context:
      "A nerve-pain example for pain after shingles; it does not eliminate the latent virus.",
    role: "Condition-specific example",
  },
  "Acute sinus headache": {
    medicationIds: ["acetaminophen"],
    context:
      "May temporarily relieve pain. Migraine, allergy, viral illness, and other causes can resemble sinus pain; this does not establish a diagnosis.",
    role: "Symptom relief only",
  },
  "Alopecia areata": {
    medicationIds: ["triamcinolone"],
    context:
      "A specialist example using selected local corticosteroid injections, not a general instruction to use topical steroid on hair loss.",
    role: "Route-specific / specialist example",
  },
  "Carpal tunnel syndrome": {
    medicationIds: ["triamcinolone"],
    context:
      "A local injection example in selected patients, not a cure for ongoing mechanical compression. Persistent nerve dysfunction needs assessment.",
    role: "Route-specific / specialist example",
  },
  Cataracts: {
    medicationIds: [],
    context:
      "No medication clears an established cataract. An eye specialist can assess vision, other causes, and whether surgery is appropriate.",
    role: "No general medication option",
  },
  Chlamydia: {
    medicationIds: ["doxycycline"],
    context:
      "An antibiotic example after diagnosis and individual assessment. Pregnancy, infection site, and partner care affect the plan.",
    role: "Condition-specific example",
  },
  "Chronic migraine": {
    medicationIds: ["onabotulinumtoxina"],
    context:
      "A clinician-administered prevention example for eligible chronic migraine patients, not an acute-attack treatment.",
    role: "Condition-specific example",
  },
  "Deep vein thrombosis": {
    medicationIds: ["apixaban"],
    context:
      "An anticoagulant example to prevent clot growth and complications. Suspected DVT or pulmonary embolism needs prompt or emergency assessment.",
    role: "Condition-specific example",
  },
  Diverticulitis: {
    medicationIds: ["amoxicillin-clavulanate"],
    context:
      "An example when antibiotics are indicated. Some uncomplicated cases are managed without antibiotics; complicated disease may require hospital care.",
    role: "Condition-specific example",
  },
  "Eczema, contact dermatitis": {
    medicationIds: ["triamcinolone"],
    context:
      "A topical anti-inflammatory example. Avoiding the trigger remains important, and infection can require different treatment.",
    role: "Condition-specific example",
  },
  "Fungal nail infection": {
    medicationIds: ["terbinafine"],
    context:
      "An oral antifungal example after confirming the diagnosis and reviewing liver risks and interactions.",
    role: "Condition-specific example",
  },
  Gastritis: {
    medicationIds: ["omeprazole"],
    context:
      "An acid-suppression example for selected causes. It does not eliminate H. pylori alone or treat every form of gastritis.",
    role: "Condition-specific example",
  },
};
