import type { Medication } from "../types/medication";

// Educational examples. Label-search links are discovery references, not a clinical review.
export const extendedMedications: Medication[] = [
  {
    id: "benzoyl-peroxide",
    name: "Benzoyl peroxide",
    category: "Topical acne treatment",
    target: "Skin",
    organ: null,
    system: "Skin education",
    conditions: ["Acne"],
    uses: "Used on the skin for acne. Product strengths and combinations differ.",
    simple:
      "Benzoyl peroxide reduces acne-associated bacteria and helps clear blocked pores.",
    scientific:
      "Benzoyl peroxide releases reactive oxygen species with bactericidal activity against Cutibacterium acnes and has keratolytic effects.",
    definition:
      "Cutibacterium acnes is one of the bacteria associated with acne. Keratolytic effects help loosen material in blocked pores.",
    safety:
      "Dryness, peeling, and irritation can occur. Avoid eyes and mucous membranes; it can bleach fabrics. Stop use and seek urgent help for trouble breathing, faintness, or facial swelling.",
    questions: [
      "What role would this medicine have in my overall care plan?",
      "Which side effects, interactions, or warning signs should I know about?",
      "What monitoring and follow-up would be needed?",
    ],
    source:
      "https://dailymed.nlm.nih.gov/dailymed/search.cfm?query=Benzoyl%20peroxide",
    sourceLabel: "DailyMed label search",
    quiz: "Which statement describes Benzoyl peroxide?",
    choices: [
      "It replaces an individualized care plan.",
      "Benzoyl peroxide reduces acne-associated bacteria and helps clear blocked pores.",
      "It treats every cause of this condition.",
      "It is safe for everyone without monitoring.",
    ],
    correct: 1,
    mechanism: {
      title: "Inside the mechanism: Benzoyl peroxide",
      before: "Acne-associated bacteria are active.",
      after: "Bacterial activity is reduced.",
      explanation:
        "Benzoyl peroxide reduces acne-associated bacteria and helps clear blocked pores.",
      focus: "Skin",
      input: "Acne-associated bacteria",
      target: "Bacterial activity",
      output: [
        "Acne-associated bacteria are active.",
        "Bacterial activity is reduced.",
      ],
      action: "inhibits",
    },
  },
  {
    id: "methylphenidate",
    name: "Methylphenidate",
    category: "Stimulant",
    target: "Brain",
    organ: "Brain",
    system: "Brain education",
    conditions: ["Attention-deficit/hyperactivity disorder (ADHD)"],
    uses: "Used for ADHD; some formulations also treat narcolepsy. Formulations have different uses and release patterns.",
    simple:
      "Methylphenidate changes dopamine and norepinephrine signaling in brain circuits involved in attention.",
    scientific:
      "Methylphenidate inhibits dopamine and norepinephrine transporters, increasing extracellular availability of these neurotransmitters.",
    definition:
      "Reuptake transports a chemical messenger back into a nerve cell. Transporters are proteins that carry out this recycling.",
    safety:
      "A controlled medicine with risks of misuse, addiction, overdose, and diversion. It can raise pulse and blood pressure and affect appetite, sleep, or mood. Cardiac and psychiatric history require assessment. Never share it.",
    questions: [
      "What role would this medicine have in my overall care plan?",
      "Which side effects, interactions, or warning signs should I know about?",
      "What monitoring and follow-up would be needed?",
    ],
    source:
      "https://dailymed.nlm.nih.gov/dailymed/search.cfm?query=Methylphenidate",
    sourceLabel: "DailyMed label search",
    quiz: "Which statement describes Methylphenidate?",
    choices: [
      "It is safe for everyone without monitoring.",
      "It replaces an individualized care plan.",
      "Methylphenidate changes dopamine and norepinephrine signaling in brain circuits involved in attention.",
      "It treats every cause of this condition.",
    ],
    correct: 2,
    mechanism: {
      title: "Inside the mechanism: Methylphenidate",
      before: "Transporters recycle signaling chemicals.",
      after: "Reuptake is reduced.",
      explanation:
        "Methylphenidate changes dopamine and norepinephrine signaling in brain circuits involved in attention.",
      focus: "Brain",
      input: "Dopamine and norepinephrine",
      target: "Neurotransmitter reuptake",
      output: [
        "Transporters recycle signaling chemicals.",
        "Reuptake is reduced.",
      ],
      action: "inhibits",
    },
  },
  {
    id: "cetirizine",
    name: "Cetirizine",
    category: "Antihistamine",
    target: "Allergic response",
    organ: null,
    system: "Allergic response education",
    conditions: ["Allergic rhinitis (hay fever)", "Urticaria (hives)"],
    uses: "Used for allergy symptoms and hives. It does not treat anaphylaxis.",
    simple:
      "Cetirizine blocks a histamine signal involved in itching, sneezing, and hives.",
    scientific:
      "Cetirizine selectively antagonizes peripheral histamine H1 receptors, reducing histamine-mediated allergic symptoms.",
    definition:
      "Histamine is a messenger involved in allergic symptoms. H1 receptors are one of the sites where it acts.",
    safety:
      "Drowsiness can occur; alcohol and other sedatives may increase it. Kidney function can affect use. Rare severe itching has been reported after stopping long-term daily use. Breathing difficulty or throat swelling needs emergency care.",
    questions: [
      "What role would this medicine have in my overall care plan?",
      "Which side effects, interactions, or warning signs should I know about?",
      "What monitoring and follow-up would be needed?",
    ],
    source: "https://dailymed.nlm.nih.gov/dailymed/search.cfm?query=Cetirizine",
    sourceLabel: "DailyMed label search",
    quiz: "Which statement describes Cetirizine?",
    choices: [
      "It treats every cause of this condition.",
      "It is safe for everyone without monitoring.",
      "It replaces an individualized care plan.",
      "Cetirizine blocks a histamine signal involved in itching, sneezing, and hives.",
    ],
    correct: 3,
    mechanism: {
      title: "Inside the mechanism: Cetirizine",
      before: "Histamine activates H1 receptors.",
      after: "Histamine signaling is blocked.",
      explanation:
        "Cetirizine blocks a histamine signal involved in itching, sneezing, and hives.",
      focus: "Allergic response",
      input: "Histamine",
      target: "H1 receptor",
      output: [
        "Histamine activates H1 receptors.",
        "Histamine signaling is blocked.",
      ],
      action: "inhibits",
    },
  },
  {
    id: "donepezil",
    name: "Donepezil",
    category: "Cholinesterase inhibitor",
    target: "Brain",
    organ: "Brain",
    system: "Brain education",
    conditions: ["Alzheimer disease"],
    uses: "Used to manage symptoms of Alzheimer disease. It does not cure or reverse the disease.",
    simple:
      "Donepezil slows the breakdown of acetylcholine, a chemical used by nerve cells to communicate.",
    scientific:
      "Donepezil reversibly inhibits acetylcholinesterase, increasing acetylcholine availability at cholinergic synapses.",
    definition:
      "Acetylcholinesterase is an enzyme that breaks down the nerve messenger acetylcholine.",
    safety:
      "Nausea, diarrhea, fainting, or a slow heartbeat can occur. Gastrointestinal bleeding and interactions are important concerns. A clinician should review heart rhythm, weight, and other medicines.",
    questions: [
      "What role would this medicine have in my overall care plan?",
      "Which side effects, interactions, or warning signs should I know about?",
      "What monitoring and follow-up would be needed?",
    ],
    source: "https://dailymed.nlm.nih.gov/dailymed/search.cfm?query=Donepezil",
    sourceLabel: "DailyMed label search",
    quiz: "Which statement describes Donepezil?",
    choices: [
      "It treats every cause of this condition.",
      "It is safe for everyone without monitoring.",
      "It replaces an individualized care plan.",
      "Donepezil slows the breakdown of acetylcholine, a chemical used by nerve cells to communicate.",
    ],
    correct: 3,
    mechanism: {
      title: "Inside the mechanism: Donepezil",
      before: "An enzyme breaks down acetylcholine.",
      after: "Acetylcholine breakdown is reduced.",
      explanation:
        "Donepezil slows the breakdown of acetylcholine, a chemical used by nerve cells to communicate.",
      focus: "Brain",
      input: "Acetylcholine",
      target: "Acetylcholinesterase",
      output: [
        "An enzyme breaks down acetylcholine.",
        "Acetylcholine breakdown is reduced.",
      ],
      action: "inhibits",
    },
  },
  {
    id: "ferrous-sulfate",
    name: "Ferrous sulfate",
    category: "Iron replacement",
    target: "Blood and bone marrow",
    organ: null,
    system: "Blood and bone marrow education",
    conditions: ["Iron-deficiency anemia"],
    uses: "Used for iron deficiency, including iron-deficiency anemia, while its cause is assessed. It is not suitable for every type of anemia.",
    simple:
      "Iron gives your body material needed to make hemoglobin, the oxygen-carrying protein in red blood cells.",
    scientific:
      "Absorbed iron is incorporated into heme and supports erythropoiesis when iron availability is insufficient.",
    definition:
      "Hemoglobin is the iron-containing protein in red blood cells that carries oxygen. Erythropoiesis means production of red blood cells.",
    safety:
      "Constipation and stomach upset can occur. Iron interacts with several medicines. Accidental overdose can be fatal, especially in children; store securely and get urgent poison-control help for suspected overdose.",
    questions: [
      "What role would this medicine have in my overall care plan?",
      "Which side effects, interactions, or warning signs should I know about?",
      "What monitoring and follow-up would be needed?",
    ],
    source:
      "https://dailymed.nlm.nih.gov/dailymed/search.cfm?query=Ferrous%20sulfate",
    sourceLabel: "DailyMed label search",
    quiz: "Which statement describes Ferrous sulfate?",
    choices: [
      "Iron gives your body material needed to make hemoglobin, the oxygen-carrying protein in red blood cells.",
      "It treats every cause of this condition.",
      "It is safe for everyone without monitoring.",
      "It replaces an individualized care plan.",
    ],
    correct: 0,
    mechanism: {
      title: "Inside the mechanism: Ferrous sulfate",
      before: "Iron supply is insufficient.",
      after: "Iron is supplied for red blood cell production.",
      explanation:
        "Iron gives your body material needed to make hemoglobin, the oxygen-carrying protein in red blood cells.",
      focus: "Blood and bone marrow",
      input: "Iron availability",
      target: "Hemoglobin production",
      output: [
        "Iron supply is insufficient.",
        "Iron is supplied for red blood cell production.",
      ],
      action: "supports",
    },
  },
  {
    id: "apixaban",
    name: "Apixaban",
    category: "Anticoagulant",
    target: "Blood clotting",
    organ: null,
    system: "Blood clotting education",
    conditions: ["Atrial fibrillation", "Deep vein thrombosis"],
    uses: "Used to prevent stroke in eligible people with nonvalvular atrial fibrillation and to treat or prevent certain blood clots, including DVT. Eligibility depends on the situation.",
    simple:
      "Apixaban blocks one step in clot formation. It helps prevent clots from forming or growing; it does not directly dissolve an existing clot.",
    scientific:
      "Apixaban directly inhibits factor Xa, reducing thrombin generation and fibrin clot formation.",
    definition:
      "Factor Xa is an enzyme in the clotting cascade that helps produce thrombin. Thrombin helps form fibrin, a structural part of a clot.",
    safety:
      "Serious or fatal bleeding can occur. Premature discontinuation increases thrombotic risk. Procedures, spinal anesthesia, kidney or liver disease, and interactions require review. Seek urgent help for uncontrolled bleeding or signs of stroke.",
    questions: [
      "What role would this medicine have in my overall care plan?",
      "Which side effects, interactions, or warning signs should I know about?",
      "What monitoring and follow-up would be needed?",
    ],
    source: "https://dailymed.nlm.nih.gov/dailymed/search.cfm?query=Apixaban",
    sourceLabel: "DailyMed label search",
    quiz: "Which statement describes Apixaban?",
    choices: [
      "It replaces an individualized care plan.",
      "Apixaban blocks one step in clot formation. It helps prevent clots from forming or growing; it does not directly dissolve an existing clot.",
      "It treats every cause of this condition.",
      "It is safe for everyone without monitoring.",
    ],
    correct: 1,
    mechanism: {
      title: "Inside the mechanism: Apixaban",
      before: "Factor Xa supports thrombin generation.",
      after: "Thrombin generation is reduced.",
      explanation:
        "Apixaban blocks one step in clot formation. It helps prevent clots from forming or growing; it does not directly dissolve an existing clot.",
      focus: "Blood clotting",
      input: "Coagulation cascade",
      target: "Factor Xa",
      output: [
        "Factor Xa supports thrombin generation.",
        "Thrombin generation is reduced.",
      ],
      action: "inhibits",
    },
  },
  {
    id: "triamcinolone",
    name: "Triamcinolone",
    category: "Corticosteroid",
    target: "Skin and local inflammation",
    organ: null,
    system: "Skin and local inflammation education",
    conditions: [
      "Atopic dermatitis (eczema)",
      "Alopecia areata",
      "Carpal tunnel syndrome",
      "Eczema, contact dermatitis",
    ],
    uses: "Selected topical formulations treat inflammatory skin conditions. Clinicians may use local injections for some conditions such as alopecia areata or carpal tunnel syndrome. Route and formulation matter.",
    simple:
      "Triamcinolone reduces inflammatory signals. Topical and injected products act differently and are not interchangeable.",
    scientific:
      "Triamcinolone binds intracellular glucocorticoid receptors and alters transcription of inflammation-related genes. Local absorption and systemic effects depend on formulation and exposure.",
    definition:
      "Glucocorticoid receptors are proteins inside cells that alter gene activity in response to corticosteroids.",
    safety:
      "Skin thinning, irritation, infection masking, and systemic steroid effects can occur. Injections have procedure-specific risks. Avoid using it for an undiagnosed rash or infection without advice; a clinician must select the formulation and site.",
    questions: [
      "What role would this medicine have in my overall care plan?",
      "Which side effects, interactions, or warning signs should I know about?",
      "What monitoring and follow-up would be needed?",
    ],
    source:
      "https://dailymed.nlm.nih.gov/dailymed/search.cfm?query=Triamcinolone",
    sourceLabel: "DailyMed label search",
    quiz: "Which statement describes Triamcinolone?",
    choices: [
      "It replaces an individualized care plan.",
      "Triamcinolone reduces inflammatory signals. Topical and injected products act differently and are not interchangeable.",
      "It treats every cause of this condition.",
      "It is safe for everyone without monitoring.",
    ],
    correct: 1,
    mechanism: {
      title: "Inside the mechanism: Triamcinolone",
      before: "Inflammatory signals are active.",
      after: "Inflammatory signaling is modified.",
      explanation:
        "Triamcinolone reduces inflammatory signals. Topical and injected products act differently and are not interchangeable.",
      focus: "Skin and local inflammation",
      input: "Inflammatory signals",
      target: "Glucocorticoid signaling",
      output: [
        "Inflammatory signals are active.",
        "Inflammatory signaling is modified.",
      ],
      action: "modifies",
    },
  },
  {
    id: "metronidazole",
    name: "Metronidazole",
    category: "Antimicrobial",
    target: "Infection site",
    organ: null,
    system: "Infection site education",
    conditions: ["Bacterial vaginosis"],
    uses: "Used for bacterial vaginosis and certain other susceptible bacterial or protozoal infections. It does not treat viral illness or yeast infection.",
    simple:
      "In susceptible organisms, metronidazole forms compounds that damage their DNA.",
    scientific:
      "Reduction of the nitro group in susceptible anaerobic organisms generates intermediates that disrupt DNA and inhibit nucleic acid synthesis.",
    definition:
      "DNA contains genetic instructions. Anaerobic organisms can grow in environments with little or no oxygen.",
    safety:
      "Nausea and a metallic taste can occur. Numbness, neurologic symptoms, and interactions warrant review. Follow product and pharmacist advice about alcohol and other medicines; oral and vaginal products are not interchangeable.",
    questions: [
      "What role would this medicine have in my overall care plan?",
      "Which side effects, interactions, or warning signs should I know about?",
      "What monitoring and follow-up would be needed?",
    ],
    source:
      "https://dailymed.nlm.nih.gov/dailymed/search.cfm?query=Metronidazole",
    sourceLabel: "DailyMed label search",
    quiz: "Which statement describes Metronidazole?",
    choices: [
      "It is safe for everyone without monitoring.",
      "It replaces an individualized care plan.",
      "In susceptible organisms, metronidazole forms compounds that damage their DNA.",
      "It treats every cause of this condition.",
    ],
    correct: 2,
    mechanism: {
      title: "Inside the mechanism: Metronidazole",
      before: "Susceptible organisms maintain DNA.",
      after: "Microbial DNA is damaged.",
      explanation:
        "In susceptible organisms, metronidazole forms compounds that damage their DNA.",
      focus: "Infection site",
      input: "Susceptible organisms",
      target: "Microbial DNA integrity",
      output: [
        "Susceptible organisms maintain DNA.",
        "Microbial DNA is damaged.",
      ],
      action: "modifies",
    },
  },
  {
    id: "tamsulosin",
    name: "Tamsulosin",
    category: "Alpha-1 blocker",
    target: "Prostate and bladder outlet",
    organ: null,
    system: "Prostate and bladder outlet education",
    conditions: [
      "Benign prostatic hyperplasia (enlarged prostate)",
      "Kidney stones",
    ],
    uses: "Used for urinary symptoms of an enlarged prostate. Use to help passage of selected ureteral stones is off-label and requires clinical assessment.",
    simple:
      "Tamsulosin relaxes smooth muscle around the prostate and bladder outlet, making it easier for urine to pass.",
    scientific:
      "Tamsulosin antagonizes alpha-1 adrenergic receptors in prostatic and bladder-neck smooth muscle, reducing outlet tone.",
    definition:
      "Smooth muscle is involuntary muscle. The bladder neck and prostate contain muscle that can affect urine flow.",
    safety:
      "Dizziness, fainting, and ejaculation changes can occur. Tell an eye surgeon about current or past use before cataract surgery. Stone-associated fever, inability to urinate, or severe pain needs prompt assessment.",
    questions: [
      "What role would this medicine have in my overall care plan?",
      "Which side effects, interactions, or warning signs should I know about?",
      "What monitoring and follow-up would be needed?",
    ],
    source: "https://dailymed.nlm.nih.gov/dailymed/search.cfm?query=Tamsulosin",
    sourceLabel: "DailyMed label search",
    quiz: "Which statement describes Tamsulosin?",
    choices: [
      "Tamsulosin relaxes smooth muscle around the prostate and bladder outlet, making it easier for urine to pass.",
      "It treats every cause of this condition.",
      "It is safe for everyone without monitoring.",
      "It replaces an individualized care plan.",
    ],
    correct: 0,
    mechanism: {
      title: "Inside the mechanism: Tamsulosin",
      before: "Outlet muscle tone restricts flow.",
      after: "Outlet muscle tone is reduced.",
      explanation:
        "Tamsulosin relaxes smooth muscle around the prostate and bladder outlet, making it easier for urine to pass.",
      focus: "Prostate and bladder outlet",
      input: "Alpha-1 signals",
      target: "Outlet smooth muscle",
      output: [
        "Outlet muscle tone restricts flow.",
        "Outlet muscle tone is reduced.",
      ],
      action: "inhibits",
    },
  },
  {
    id: "lithium",
    name: "Lithium",
    category: "Mood stabilizer",
    target: "Brain",
    organ: "Brain",
    system: "Brain education",
    conditions: ["Bipolar disorder"],
    uses: "Used for bipolar disorder, including mania and maintenance treatment, under specialist-guided monitoring.",
    simple:
      "Lithium changes several signaling systems in the brain. Its mood-stabilizing effects are complex and not fully explained by one pathway.",
    scientific:
      "Lithium modulates intracellular signaling, including inositol-related pathways and glycogen synthase kinase-3; its therapeutic mechanism is not fully established.",
    definition:
      "Intracellular means inside a cell. Inositol signaling and GSK-3 are among several pathways affected by lithium.",
    safety:
      "Lithium has a narrow safety margin and needs blood-level, kidney, and thyroid monitoring. Dehydration and interactions can cause toxicity. Vomiting, coarse tremor, confusion, or unsteadiness require urgent assessment. Do not change salt or fluid intake based on this site.",
    questions: [
      "What role would this medicine have in my overall care plan?",
      "Which side effects, interactions, or warning signs should I know about?",
      "What monitoring and follow-up would be needed?",
    ],
    source: "https://dailymed.nlm.nih.gov/dailymed/search.cfm?query=Lithium",
    sourceLabel: "DailyMed label search",
    quiz: "Which statement describes Lithium?",
    choices: [
      "It replaces an individualized care plan.",
      "Lithium changes several signaling systems in the brain. Its mood-stabilizing effects are complex and not fully explained by one pathway.",
      "It treats every cause of this condition.",
      "It is safe for everyone without monitoring.",
    ],
    correct: 1,
    mechanism: {
      title: "Inside the mechanism: Lithium",
      before: "Mood-related signaling involves many pathways.",
      after: "Cell signaling is modified.",
      explanation:
        "Lithium changes several signaling systems in the brain. Its mood-stabilizing effects are complex and not fully explained by one pathway.",
      focus: "Brain",
      input: "Cellular signaling",
      target: "Multiple intracellular pathways",
      output: [
        "Mood-related signaling involves many pathways.",
        "Cell signaling is modified.",
      ],
      action: "modifies",
    },
  },
  {
    id: "nitrofurantoin",
    name: "Nitrofurantoin",
    category: "Antibiotic",
    target: "Bladder",
    organ: null,
    system: "Bladder education",
    conditions: ["Bladder infection (cystitis)", "Urinary tract infection"],
    uses: "Used for susceptible bacterial lower urinary tract infections. It is not appropriate for kidney infection or systemic infection.",
    simple:
      "Nitrofurantoin is concentrated in urine and damages several systems inside susceptible bacteria.",
    scientific:
      "Bacterial enzymes reduce nitrofurantoin to reactive intermediates that damage microbial proteins and nucleic acids.",
    definition:
      "Reactive intermediates are short-lived chemical products that can damage microbial proteins or genetic material.",
    safety:
      "Lung, liver, nerve, and blood-cell reactions can occur. Kidney function, pregnancy timing, and G6PD deficiency affect suitability. Fever with flank pain or feeling severely unwell may indicate an infection needing different treatment.",
    questions: [
      "What role would this medicine have in my overall care plan?",
      "Which side effects, interactions, or warning signs should I know about?",
      "What monitoring and follow-up would be needed?",
    ],
    source:
      "https://dailymed.nlm.nih.gov/dailymed/search.cfm?query=Nitrofurantoin",
    sourceLabel: "DailyMed label search",
    quiz: "Which statement describes Nitrofurantoin?",
    choices: [
      "Nitrofurantoin is concentrated in urine and damages several systems inside susceptible bacteria.",
      "It treats every cause of this condition.",
      "It is safe for everyone without monitoring.",
      "It replaces an individualized care plan.",
    ],
    correct: 0,
    mechanism: {
      title: "Inside the mechanism: Nitrofurantoin",
      before: "Bacteria maintain cellular functions.",
      after: "Bacterial cellular components are damaged.",
      explanation:
        "Nitrofurantoin is concentrated in urine and damages several systems inside susceptible bacteria.",
      focus: "Bladder",
      input: "Susceptible urinary bacteria",
      target: "Bacterial cellular systems",
      output: [
        "Bacteria maintain cellular functions.",
        "Bacterial cellular components are damaged.",
      ],
      action: "modifies",
    },
  },
  {
    id: "tamoxifen",
    name: "Tamoxifen",
    category: "Selective estrogen receptor modulator",
    target: "Breast tissue",
    organ: null,
    system: "Breast tissue education",
    conditions: ["Breast cancer"],
    uses: "Used for selected hormone-receptor-positive breast cancers and risk reduction in certain people. It is not appropriate for every breast cancer.",
    simple:
      "Tamoxifen blocks estrogen signals in breast tissue that can support growth of some breast cancers.",
    scientific:
      "Tamoxifen and its active metabolites modulate estrogen receptors, exerting predominantly antagonistic effects in breast tissue and tissue-dependent effects elsewhere.",
    definition:
      "Hormone-receptor-positive cancers have receptors that can respond to hormones such as estrogen. Receptor testing helps guide care.",
    safety:
      "Blood clots, stroke, and uterine cancer are important risks. Abnormal vaginal bleeding, clot symptoms, and pregnancy require prompt attention. Drug interactions and tumor receptor status must be reviewed by the cancer team.",
    questions: [
      "What role would this medicine have in my overall care plan?",
      "Which side effects, interactions, or warning signs should I know about?",
      "What monitoring and follow-up would be needed?",
    ],
    source: "https://dailymed.nlm.nih.gov/dailymed/search.cfm?query=Tamoxifen",
    sourceLabel: "DailyMed label search",
    quiz: "Which statement describes Tamoxifen?",
    choices: [
      "It replaces an individualized care plan.",
      "Tamoxifen blocks estrogen signals in breast tissue that can support growth of some breast cancers.",
      "It treats every cause of this condition.",
      "It is safe for everyone without monitoring.",
    ],
    correct: 1,
    mechanism: {
      title: "Inside the mechanism: Tamoxifen",
      before: "Estrogen can stimulate receptor-positive cells.",
      after: "Estrogen signaling in breast tissue is blocked.",
      explanation:
        "Tamoxifen blocks estrogen signals in breast tissue that can support growth of some breast cancers.",
      focus: "Breast tissue",
      input: "Estrogen",
      target: "Estrogen receptor in breast tissue",
      output: [
        "Estrogen can stimulate receptor-positive cells.",
        "Estrogen signaling in breast tissue is blocked.",
      ],
      action: "inhibits",
    },
  },
  {
    id: "acetaminophen",
    name: "Acetaminophen (paracetamol)",
    category: "Pain and fever medicine",
    target: "Pain and temperature signaling",
    organ: "Brain",
    system: "Pain and temperature signaling education",
    conditions: [
      "Acute bronchitis",
      "Common cold",
      "Tension-type headache",
      "Acute sinus headache",
    ],
    uses: "Used for temporary relief of pain or fever, including symptoms accompanying some infections. It does not cure infections or treat the underlying cause of chronic pain.",
    simple:
      "Acetaminophen acts mainly in the central nervous system to reduce pain and fever. Its full mechanism is not completely understood.",
    scientific:
      "Central modulation of prostaglandin-related and other pain pathways is implicated; the precise mechanism remains incompletely established.",
    definition:
      "The central nervous system includes the brain and spinal cord. Prostaglandins are signaling chemicals involved in pain and temperature regulation.",
    safety:
      "Too much acetaminophen can cause severe liver injury. Many combination products contain it, creating accidental duplication. Liver disease and alcohol use require review. Suspected overdose needs immediate medical or poison-control help even without symptoms.",
    questions: [
      "What role would this medicine have in my overall care plan?",
      "Which side effects, interactions, or warning signs should I know about?",
      "What monitoring and follow-up would be needed?",
    ],
    source:
      "https://dailymed.nlm.nih.gov/dailymed/search.cfm?query=Acetaminophen%20%28paracetamol%29",
    sourceLabel: "DailyMed label search",
    quiz: "Which statement describes Acetaminophen (paracetamol)?",
    choices: [
      "It is safe for everyone without monitoring.",
      "It replaces an individualized care plan.",
      "Acetaminophen acts mainly in the central nervous system to reduce pain and fever. Its full mechanism is not completely understood.",
      "It treats every cause of this condition.",
    ],
    correct: 2,
    mechanism: {
      title: "Inside the mechanism: Acetaminophen (paracetamol)",
      before: "Pain and fever pathways are active.",
      after: "Pain and fever signaling is modified.",
      explanation:
        "Acetaminophen acts mainly in the central nervous system to reduce pain and fever. Its full mechanism is not completely understood.",
      focus: "Pain and temperature signaling",
      input: "Pain and fever signaling",
      target: "Central signaling pathways",
      output: [
        "Pain and fever pathways are active.",
        "Pain and fever signaling is modified.",
      ],
      action: "modifies",
    },
  },
  {
    id: "tiotropium",
    name: "Tiotropium",
    category: "Long-acting muscarinic antagonist",
    target: "Lungs",
    organ: "Lungs",
    system: "Lungs education",
    conditions: ["Chronic obstructive pulmonary disease (COPD)"],
    uses: "Used for maintenance treatment of COPD; selected formulations also have an asthma indication. It is not a rescue treatment for sudden breathing difficulty.",
    simple:
      "Tiotropium blocks signals that tighten airway muscles, helping keep airways open during maintenance treatment.",
    scientific:
      "Tiotropium antagonizes muscarinic receptors, particularly airway M3 receptors, reducing cholinergic bronchoconstriction.",
    definition:
      "Muscarinic receptors respond to acetylcholine. Their activation in airway smooth muscle can promote constriction.",
    safety:
      "Dry mouth, urinary retention, and worsening narrow-angle glaucoma can occur. Sudden breathing difficulty needs the prescribed rescue plan or urgent help. Inhaler technique and device-specific instructions matter.",
    questions: [
      "What role would this medicine have in my overall care plan?",
      "Which side effects, interactions, or warning signs should I know about?",
      "What monitoring and follow-up would be needed?",
    ],
    source: "https://dailymed.nlm.nih.gov/dailymed/search.cfm?query=Tiotropium",
    sourceLabel: "DailyMed label search",
    quiz: "Which statement describes Tiotropium?",
    choices: [
      "It is safe for everyone without monitoring.",
      "It replaces an individualized care plan.",
      "Tiotropium blocks signals that tighten airway muscles, helping keep airways open during maintenance treatment.",
      "It treats every cause of this condition.",
    ],
    correct: 2,
    mechanism: {
      title: "Inside the mechanism: Tiotropium",
      before: "Muscarinic signals tighten airway muscle.",
      after: "Muscarinic bronchoconstriction signals are blocked.",
      explanation:
        "Tiotropium blocks signals that tighten airway muscles, helping keep airways open during maintenance treatment.",
      focus: "Lungs",
      input: "Acetylcholine",
      target: "Airway muscarinic receptor",
      output: [
        "Muscarinic signals tighten airway muscle.",
        "Muscarinic bronchoconstriction signals are blocked.",
      ],
      action: "inhibits",
    },
  },
  {
    id: "cephalexin",
    name: "Cephalexin",
    category: "Cephalosporin antibiotic",
    target: "Infection site",
    organ: null,
    system: "Infection site education",
    conditions: ["Cellulitis"],
    uses: "Used for selected susceptible bacterial infections, including some skin infections such as cellulitis. It does not cover every organism or severity.",
    simple:
      "Cephalexin interferes with construction of susceptible bacteria’s protective cell wall.",
    scientific:
      "Cephalexin binds penicillin-binding proteins and inhibits bacterial peptidoglycan cross-linking during cell wall synthesis.",
    definition:
      "Peptidoglycan forms a mesh in many bacterial cell walls. Cross-linking connects this mesh and helps make the wall stable.",
    safety:
      "Allergic reactions and severe antibiotic-associated diarrhea can occur. Allergy history, kidney function, and infection severity affect selection. Rapidly spreading redness, fever, or severe pain needs prompt evaluation.",
    questions: [
      "What role would this medicine have in my overall care plan?",
      "Which side effects, interactions, or warning signs should I know about?",
      "What monitoring and follow-up would be needed?",
    ],
    source: "https://dailymed.nlm.nih.gov/dailymed/search.cfm?query=Cephalexin",
    sourceLabel: "DailyMed label search",
    quiz: "Which statement describes Cephalexin?",
    choices: [
      "It treats every cause of this condition.",
      "It is safe for everyone without monitoring.",
      "It replaces an individualized care plan.",
      "Cephalexin interferes with construction of susceptible bacteria’s protective cell wall.",
    ],
    correct: 3,
    mechanism: {
      title: "Inside the mechanism: Cephalexin",
      before: "Bacteria construct a cell wall.",
      after: "Bacterial cell wall construction is inhibited.",
      explanation:
        "Cephalexin interferes with construction of susceptible bacteria’s protective cell wall.",
      focus: "Infection site",
      input: "Bacterial wall construction",
      target: "Cell wall cross-linking",
      output: [
        "Bacteria construct a cell wall.",
        "Bacterial cell wall construction is inhibited.",
      ],
      action: "inhibits",
    },
  },
  {
    id: "empagliflozin",
    name: "Empagliflozin",
    category: "SGLT2 inhibitor",
    target: "Kidneys",
    organ: "Kidneys",
    system: "Kidneys education",
    conditions: ["Chronic kidney disease"],
    uses: "Used in selected people with type 2 diabetes, heart failure, or chronic kidney disease. Eligibility and benefits depend on the clinical situation. It is not used to treat type 1 diabetes.",
    simple:
      "Empagliflozin reduces how much glucose the kidneys take back into the blood. More glucose leaves in urine; its heart and kidney effects involve more than this simple pathway.",
    scientific:
      "Empagliflozin inhibits SGLT2 in the proximal renal tubule, reducing glucose and sodium reabsorption. Cardiorenal effects involve additional hemodynamic and metabolic mechanisms.",
    definition:
      "SGLT2 is a protein in the kidney that reabsorbs glucose along with sodium from filtered fluid.",
    safety:
      "Ketoacidosis can occur even without very high glucose. Dehydration, genital infections, and serious urinary infections are concerns. Surgery, fasting, acute illness, and kidney function need a clinician-directed plan.",
    questions: [
      "What role would this medicine have in my overall care plan?",
      "Which side effects, interactions, or warning signs should I know about?",
      "What monitoring and follow-up would be needed?",
    ],
    source:
      "https://dailymed.nlm.nih.gov/dailymed/search.cfm?query=Empagliflozin",
    sourceLabel: "DailyMed label search",
    quiz: "Which statement describes Empagliflozin?",
    choices: [
      "It treats every cause of this condition.",
      "It is safe for everyone without monitoring.",
      "It replaces an individualized care plan.",
      "Empagliflozin reduces how much glucose the kidneys take back into the blood. More glucose leaves in urine; its heart and kidney effects involve more than this simple pathway.",
    ],
    correct: 3,
    mechanism: {
      title: "Inside the mechanism: Empagliflozin",
      before: "The kidney reabsorbs glucose.",
      after: "Glucose reabsorption is reduced.",
      explanation:
        "Empagliflozin reduces how much glucose the kidneys take back into the blood. More glucose leaves in urine; its heart and kidney effects involve more than this simple pathway.",
      focus: "Kidneys",
      input: "Filtered glucose",
      target: "SGLT2 transporter",
      output: [
        "The kidney reabsorbs glucose.",
        "Glucose reabsorption is reduced.",
      ],
      action: "inhibits",
    },
  },
  {
    id: "duloxetine",
    name: "Duloxetine",
    category: "SNRI",
    target: "Brain and spinal pain pathways",
    organ: "Brain",
    system: "Brain and spinal pain pathways education",
    conditions: ["Chronic pain", "Peripheral neuropathy"],
    uses: "Used for selected depressive or anxiety disorders and certain chronic pain conditions, including diabetic peripheral neuropathic pain. It does not treat every cause of chronic pain.",
    simple:
      "Duloxetine changes serotonin and norepinephrine signaling involved in mood and the body’s pain-control pathways.",
    scientific:
      "Duloxetine inhibits serotonin and norepinephrine reuptake. Effects on descending inhibitory pain pathways contribute to analgesic activity.",
    definition:
      "Reuptake transports a chemical messenger back into a nerve cell. Transporters are proteins that carry out this recycling.",
    safety:
      "Antidepressant suicidality warnings, serotonin syndrome, liver injury, and discontinuation symptoms are important. Blood pressure, interactions, alcohol use, and liver or kidney disease require review. Do not stop suddenly without advice.",
    questions: [
      "What role would this medicine have in my overall care plan?",
      "Which side effects, interactions, or warning signs should I know about?",
      "What monitoring and follow-up would be needed?",
    ],
    source: "https://dailymed.nlm.nih.gov/dailymed/search.cfm?query=Duloxetine",
    sourceLabel: "DailyMed label search",
    quiz: "Which statement describes Duloxetine?",
    choices: [
      "It treats every cause of this condition.",
      "It is safe for everyone without monitoring.",
      "It replaces an individualized care plan.",
      "Duloxetine changes serotonin and norepinephrine signaling involved in mood and the body’s pain-control pathways.",
    ],
    correct: 3,
    mechanism: {
      title: "Inside the mechanism: Duloxetine",
      before: "Transporters recycle signaling chemicals.",
      after: "Serotonin and norepinephrine reuptake is reduced.",
      explanation:
        "Duloxetine changes serotonin and norepinephrine signaling involved in mood and the body’s pain-control pathways.",
      focus: "Brain and spinal pain pathways",
      input: "Serotonin and norepinephrine",
      target: "Neurotransmitter reuptake",
      output: [
        "Transporters recycle signaling chemicals.",
        "Serotonin and norepinephrine reuptake is reduced.",
      ],
      action: "inhibits",
    },
  },
  {
    id: "polyethylene-glycol",
    name: "Polyethylene glycol 3350",
    category: "Osmotic laxative",
    target: "Intestines",
    organ: null,
    system: "Intestines education",
    conditions: ["Constipation"],
    uses: "Used for occasional constipation. Persistent symptoms and warning signs need assessment.",
    simple:
      "Polyethylene glycol holds water in the bowel, helping soften stool.",
    scientific:
      "Poorly absorbed polyethylene glycol exerts an osmotic effect that retains water in the intestinal lumen.",
    definition:
      "An osmotic substance draws or holds water in a space. The intestinal lumen is the space inside the bowel.",
    safety:
      "Bloating, cramping, and diarrhea can occur. Severe abdominal pain, vomiting, rectal bleeding, or suspected bowel obstruction needs assessment rather than self-treatment. Product and age-specific directions matter.",
    questions: [
      "What role would this medicine have in my overall care plan?",
      "Which side effects, interactions, or warning signs should I know about?",
      "What monitoring and follow-up would be needed?",
    ],
    source:
      "https://dailymed.nlm.nih.gov/dailymed/search.cfm?query=Polyethylene%20glycol%203350",
    sourceLabel: "DailyMed label search",
    quiz: "Which statement describes Polyethylene glycol 3350?",
    choices: [
      "It treats every cause of this condition.",
      "It is safe for everyone without monitoring.",
      "It replaces an individualized care plan.",
      "Polyethylene glycol holds water in the bowel, helping soften stool.",
    ],
    correct: 3,
    mechanism: {
      title: "Inside the mechanism: Polyethylene glycol 3350",
      before: "Stool may contain too little water.",
      after: "More water is retained in stool.",
      explanation:
        "Polyethylene glycol holds water in the bowel, helping soften stool.",
      focus: "Intestines",
      input: "Bowel water",
      target: "Water retention in the bowel",
      output: [
        "Stool may contain too little water.",
        "More water is retained in stool.",
      ],
      action: "supports",
    },
  },
  {
    id: "nirmatrelvir-ritonavir",
    name: "Nirmatrelvir / ritonavir",
    category: "Antiviral combination",
    target: "Viral replication",
    organ: null,
    system: "Viral replication education",
    conditions: ["COVID-19"],
    uses: "Used for eligible people with COVID-19 at increased risk of progression. Timing, age, kidney or liver function, and drug interactions determine suitability.",
    simple:
      "Nirmatrelvir blocks a viral enzyme needed for replication. Ritonavir slows its breakdown so it remains available longer.",
    scientific:
      "Nirmatrelvir inhibits the SARS-CoV-2 main protease. Ritonavir inhibits CYP3A-mediated metabolism, increasing nirmatrelvir exposure.",
    definition:
      "A protease cuts proteins into smaller working pieces. SARS-CoV-2 needs its main protease to process proteins for replication.",
    safety:
      "Ritonavir can cause serious or life-threatening drug interactions. A clinician must review every medicine and supplement, kidney function, and liver disease. Do not stop other medicines on your own to take this combination.",
    questions: [
      "What role would this medicine have in my overall care plan?",
      "Which side effects, interactions, or warning signs should I know about?",
      "What monitoring and follow-up would be needed?",
    ],
    source:
      "https://dailymed.nlm.nih.gov/dailymed/search.cfm?query=Nirmatrelvir%20/%20ritonavir",
    sourceLabel: "DailyMed label search",
    quiz: "Which statement describes Nirmatrelvir / ritonavir?",
    choices: [
      "Nirmatrelvir blocks a viral enzyme needed for replication. Ritonavir slows its breakdown so it remains available longer.",
      "It treats every cause of this condition.",
      "It is safe for everyone without monitoring.",
      "It replaces an individualized care plan.",
    ],
    correct: 0,
    mechanism: {
      title: "Inside the mechanism: Nirmatrelvir / ritonavir",
      before: "Viral protease processes proteins.",
      after: "Viral protein processing is inhibited.",
      explanation:
        "Nirmatrelvir blocks a viral enzyme needed for replication. Ritonavir slows its breakdown so it remains available longer.",
      focus: "Viral replication",
      input: "SARS-CoV-2 replication",
      target: "Viral main protease",
      output: [
        "Viral protease processes proteins.",
        "Viral protein processing is inhibited.",
      ],
      action: "inhibits",
    },
  },
  {
    id: "insulin-lispro",
    name: "Insulin lispro",
    category: "Rapid-acting insulin",
    target: "Glucose regulation",
    organ: null,
    system: "Glucose regulation education",
    conditions: ["Type 1 diabetes"],
    uses: "Used to help manage blood glucose in diabetes. Type 1 diabetes requires an individualized insulin plan; rapid-acting insulin alone is not a complete basal-insulin replacement.",
    simple:
      "Insulin lispro activates insulin receptors so cells can use glucose and the liver can release less glucose.",
    scientific:
      "Insulin receptor activation promotes peripheral glucose uptake and suppresses hepatic glucose production. Lispro is a rapid-acting insulin analog.",
    definition:
      "An insulin receptor detects insulin and starts signals that regulate glucose use and storage.",
    safety:
      "Low blood glucose can be life-threatening. Product mix-ups, pump or device failures, and potassium changes are risks. Insulin type, timing, monitoring, and sick-day plans must be individualized; never share injection devices.",
    questions: [
      "What role would this medicine have in my overall care plan?",
      "Which side effects, interactions, or warning signs should I know about?",
      "What monitoring and follow-up would be needed?",
    ],
    source:
      "https://dailymed.nlm.nih.gov/dailymed/search.cfm?query=Insulin%20lispro",
    sourceLabel: "DailyMed label search",
    quiz: "Which statement describes Insulin lispro?",
    choices: [
      "It is safe for everyone without monitoring.",
      "It replaces an individualized care plan.",
      "Insulin lispro activates insulin receptors so cells can use glucose and the liver can release less glucose.",
      "It treats every cause of this condition.",
    ],
    correct: 2,
    mechanism: {
      title: "Inside the mechanism: Insulin lispro",
      before: "Insulin signaling may be insufficient.",
      after: "Insulin receptors are activated.",
      explanation:
        "Insulin lispro activates insulin receptors so cells can use glucose and the liver can release less glucose.",
      focus: "Glucose regulation",
      input: "Insulin signal",
      target: "Insulin receptor",
      output: [
        "Insulin signaling may be insufficient.",
        "Insulin receptors are activated.",
      ],
      action: "activates",
    },
  },
  {
    id: "oral-rehydration-salts",
    name: "Oral rehydration salts",
    category: "Glucose-electrolyte replacement",
    target: "Intestines",
    organ: null,
    system: "Intestines education",
    conditions: ["Acute diarrhea", "Viral gastroenteritis"],
    uses: "Used to replace fluid and electrolytes lost with diarrhea or vomiting. It supports hydration rather than curing infection or stopping all diarrhea.",
    simple:
      "A balanced glucose-and-salt solution helps the intestine absorb water and electrolytes.",
    scientific:
      "Sodium-glucose cotransport via SGLT1 supports intestinal sodium absorption, with water following osmotically.",
    definition:
      "Cotransport moves two substances together across a cell membrane. SGLT1 carries sodium and glucose and supports water absorption.",
    safety:
      "Prepare the specific product exactly as directed; an incorrect concentration can be harmful. Inability to keep fluids down, severe dehydration, blood in stool, or serious illness needs medical care. Young children and people with kidney or fluid restrictions need tailored guidance.",
    questions: [
      "What role would this medicine have in my overall care plan?",
      "Which side effects, interactions, or warning signs should I know about?",
      "What monitoring and follow-up would be needed?",
    ],
    source:
      "https://dailymed.nlm.nih.gov/dailymed/search.cfm?query=Oral%20rehydration%20salts",
    sourceLabel: "DailyMed label search",
    quiz: "Which statement describes Oral rehydration salts?",
    choices: [
      "It is safe for everyone without monitoring.",
      "It replaces an individualized care plan.",
      "A balanced glucose-and-salt solution helps the intestine absorb water and electrolytes.",
      "It treats every cause of this condition.",
    ],
    correct: 2,
    mechanism: {
      title: "Inside the mechanism: Oral rehydration salts",
      before: "Fluid and electrolytes are being lost.",
      after: "Water and electrolyte absorption is supported.",
      explanation:
        "A balanced glucose-and-salt solution helps the intestine absorb water and electrolytes.",
      focus: "Intestines",
      input: "Glucose and sodium",
      target: "Intestinal cotransport",
      output: [
        "Fluid and electrolytes are being lost.",
        "Water and electrolyte absorption is supported.",
      ],
      action: "supports",
    },
  },
  {
    id: "artificial-tears",
    name: "Carboxymethylcellulose eye drops",
    category: "Ocular lubricant",
    target: "Eyes",
    organ: null,
    system: "Eyes education",
    conditions: ["Dry eye disease"],
    uses: "Used for temporary relief of dry-eye symptoms. Persistent pain, redness, discharge, or vision changes need eye assessment.",
    simple:
      "These eye drops help lubricate the eye surface and supplement the tear film.",
    scientific:
      "Carboxymethylcellulose increases tear-film viscosity and ocular surface lubrication without treating every underlying cause of dry eye.",
    definition:
      "The tear film is a thin fluid layer over the eye surface. Lubrication helps reduce friction and dryness.",
    safety:
      "Temporary blur or irritation can occur. Avoid contaminating the tip, sharing drops, or using products subject to recalls. Contact lens compatibility and preservatives vary. Eye pain or vision loss needs prompt assessment.",
    questions: [
      "What role would this medicine have in my overall care plan?",
      "Which side effects, interactions, or warning signs should I know about?",
      "What monitoring and follow-up would be needed?",
    ],
    source:
      "https://dailymed.nlm.nih.gov/dailymed/search.cfm?query=Carboxymethylcellulose%20eye%20drops",
    sourceLabel: "DailyMed label search",
    quiz: "Which statement describes Carboxymethylcellulose eye drops?",
    choices: [
      "It is safe for everyone without monitoring.",
      "It replaces an individualized care plan.",
      "These eye drops help lubricate the eye surface and supplement the tear film.",
      "It treats every cause of this condition.",
    ],
    correct: 2,
    mechanism: {
      title: "Inside the mechanism: Carboxymethylcellulose eye drops",
      before: "The tear film is insufficient or unstable.",
      after: "Surface lubrication is supported.",
      explanation:
        "These eye drops help lubricate the eye surface and supplement the tear film.",
      focus: "Eyes",
      input: "Eye surface moisture",
      target: "Tear film lubrication",
      output: [
        "The tear film is insufficient or unstable.",
        "Surface lubrication is supported.",
      ],
      action: "supports",
    },
  },
  {
    id: "norethindrone-acetate",
    name: "Norethindrone acetate",
    category: "Progestin",
    target: "Reproductive tissues",
    organ: null,
    system: "Reproductive tissues education",
    conditions: ["Endometriosis"],
    uses: "Selected formulations are used for endometriosis and certain bleeding disorders. This guide is not about every norethindrone product.",
    simple:
      "This progestin changes hormonal signaling and can suppress growth and activity of endometrial tissue.",
    scientific:
      "Progestational effects alter endometrial development and suppress gonadotropin-mediated ovarian activity, depending on regimen and formulation.",
    definition:
      "Progestins act like progesterone at its receptors. Endometrial tissue normally lines the uterus; endometriosis involves similar tissue outside it.",
    safety:
      "Blood clots, liver disease, pregnancy, and unexplained vaginal bleeding require review. Mood changes and irregular bleeding can occur. Do not assume this endometriosis formulation provides contraception.",
    questions: [
      "What role would this medicine have in my overall care plan?",
      "Which side effects, interactions, or warning signs should I know about?",
      "What monitoring and follow-up would be needed?",
    ],
    source:
      "https://dailymed.nlm.nih.gov/dailymed/search.cfm?query=Norethindrone%20acetate",
    sourceLabel: "DailyMed label search",
    quiz: "Which statement describes Norethindrone acetate?",
    choices: [
      "It replaces an individualized care plan.",
      "This progestin changes hormonal signaling and can suppress growth and activity of endometrial tissue.",
      "It treats every cause of this condition.",
      "It is safe for everyone without monitoring.",
    ],
    correct: 1,
    mechanism: {
      title: "Inside the mechanism: Norethindrone acetate",
      before: "Hormonal signals support endometrial tissue.",
      after: "Endometrial hormonal signaling is modified.",
      explanation:
        "This progestin changes hormonal signaling and can suppress growth and activity of endometrial tissue.",
      focus: "Reproductive tissues",
      input: "Hormonal signaling",
      target: "Progestin-responsive tissues",
      output: [
        "Hormonal signals support endometrial tissue.",
        "Endometrial hormonal signaling is modified.",
      ],
      action: "modifies",
    },
  },
  {
    id: "levetiracetam",
    name: "Levetiracetam",
    category: "Antiseizure medicine",
    target: "Brain",
    organ: "Brain",
    system: "Brain education",
    conditions: ["Epilepsy"],
    uses: "Used for selected seizure types; treatment choice depends on seizure classification and patient factors.",
    simple:
      "Levetiracetam binds a protein involved in nerve-cell chemical release and helps regulate seizure-related signaling.",
    scientific:
      "Levetiracetam binds synaptic vesicle protein SV2A; its full antiseizure mechanism is not completely defined.",
    definition:
      "SV2A is a protein on synaptic vesicles, the small packages that store and release nerve-cell messengers.",
    safety:
      "Sleepiness, behavioral changes, aggression, and suicidal thoughts can occur. Kidney function affects use. Abrupt discontinuation may worsen seizures; treatment changes require guidance. New severe rash or significant mood changes need prompt attention.",
    questions: [
      "What role would this medicine have in my overall care plan?",
      "Which side effects, interactions, or warning signs should I know about?",
      "What monitoring and follow-up would be needed?",
    ],
    source:
      "https://dailymed.nlm.nih.gov/dailymed/search.cfm?query=Levetiracetam",
    sourceLabel: "DailyMed label search",
    quiz: "Which statement describes Levetiracetam?",
    choices: [
      "Levetiracetam binds a protein involved in nerve-cell chemical release and helps regulate seizure-related signaling.",
      "It treats every cause of this condition.",
      "It is safe for everyone without monitoring.",
      "It replaces an individualized care plan.",
    ],
    correct: 0,
    mechanism: {
      title: "Inside the mechanism: Levetiracetam",
      before: "Seizure-related signaling can be excessive.",
      after: "Synaptic release signaling is modified.",
      explanation:
        "Levetiracetam binds a protein involved in nerve-cell chemical release and helps regulate seizure-related signaling.",
      focus: "Brain",
      input: "Nerve-cell transmitter release",
      target: "SV2A-associated signaling",
      output: [
        "Seizure-related signaling can be excessive.",
        "Synaptic release signaling is modified.",
      ],
      action: "modifies",
    },
  },
  {
    id: "sildenafil",
    name: "Sildenafil",
    category: "PDE-5 inhibitor",
    target: "Penile blood vessels",
    organ: null,
    system: "Penile blood vessels education",
    conditions: ["Erectile dysfunction"],
    uses: "Used for erectile dysfunction when suitable. Different products and indications exist; this guide focuses on erectile dysfunction.",
    simple:
      "With sexual stimulation, sildenafil helps a relaxation signal last longer in penile blood vessels.",
    scientific:
      "Sildenafil inhibits phosphodiesterase type 5, reducing cGMP breakdown and enhancing nitric-oxide-mediated smooth muscle relaxation.",
    definition:
      "cGMP is a messenger involved in smooth muscle relaxation. PDE-5 is an enzyme that breaks it down.",
    safety:
      "Never combine with nitrates or riociguat because of dangerous hypotension. Cardiovascular status and interactions need review. An erection lasting more than four hours or sudden vision or hearing loss requires urgent care.",
    questions: [
      "What role would this medicine have in my overall care plan?",
      "Which side effects, interactions, or warning signs should I know about?",
      "What monitoring and follow-up would be needed?",
    ],
    source: "https://dailymed.nlm.nih.gov/dailymed/search.cfm?query=Sildenafil",
    sourceLabel: "DailyMed label search",
    quiz: "Which statement describes Sildenafil?",
    choices: [
      "It replaces an individualized care plan.",
      "With sexual stimulation, sildenafil helps a relaxation signal last longer in penile blood vessels.",
      "It treats every cause of this condition.",
      "It is safe for everyone without monitoring.",
    ],
    correct: 1,
    mechanism: {
      title: "Inside the mechanism: Sildenafil",
      before: "PDE-5 breaks down cGMP.",
      after: "cGMP breakdown is reduced.",
      explanation:
        "With sexual stimulation, sildenafil helps a relaxation signal last longer in penile blood vessels.",
      focus: "Penile blood vessels",
      input: "cGMP signaling",
      target: "PDE-5 enzyme",
      output: ["PDE-5 breaks down cGMP.", "cGMP breakdown is reduced."],
      action: "inhibits",
    },
  },
  {
    id: "latanoprost",
    name: "Latanoprost",
    category: "Prostaglandin analog",
    target: "Eyes",
    organ: null,
    system: "Eyes education",
    conditions: ["Glaucoma"],
    uses: "Used to lower eye pressure in open-angle glaucoma or ocular hypertension under eye-specialist care.",
    simple: "Latanoprost helps fluid leave the eye through an outflow pathway.",
    scientific:
      "Latanoprost activates prostanoid FP receptors, increasing aqueous humor outflow primarily through the uveoscleral route.",
    definition:
      "Aqueous humor is fluid inside the front of the eye. Uveoscleral outflow is one route through which it drains.",
    safety:
      "Iris color, eyelid skin, and eyelash changes can occur. Eye inflammation and macular edema are concerns in selected people. Pain or sudden vision change needs assessment. Avoid contaminating the bottle.",
    questions: [
      "What role would this medicine have in my overall care plan?",
      "Which side effects, interactions, or warning signs should I know about?",
      "What monitoring and follow-up would be needed?",
    ],
    source:
      "https://dailymed.nlm.nih.gov/dailymed/search.cfm?query=Latanoprost",
    sourceLabel: "DailyMed label search",
    quiz: "Which statement describes Latanoprost?",
    choices: [
      "It replaces an individualized care plan.",
      "Latanoprost helps fluid leave the eye through an outflow pathway.",
      "It treats every cause of this condition.",
      "It is safe for everyone without monitoring.",
    ],
    correct: 1,
    mechanism: {
      title: "Inside the mechanism: Latanoprost",
      before: "Eye fluid outflow may be insufficient.",
      after: "An eye fluid outflow pathway is enhanced.",
      explanation:
        "Latanoprost helps fluid leave the eye through an outflow pathway.",
      focus: "Eyes",
      input: "Aqueous fluid outflow",
      target: "Prostanoid FP receptor",
      output: [
        "Eye fluid outflow may be insufficient.",
        "An eye fluid outflow pathway is enhanced.",
      ],
      action: "activates",
    },
  },
  {
    id: "colchicine",
    name: "Colchicine",
    category: "Anti-inflammatory",
    target: "Inflammatory cells",
    organ: null,
    system: "Inflammatory cells education",
    conditions: ["Gout"],
    uses: "Used to treat or prevent gout flares in appropriate people. It does not lower uric acid or treat every cause of a swollen joint.",
    simple:
      "Colchicine reduces inflammatory-cell activity triggered by urate crystals.",
    scientific:
      "Colchicine binds tubulin, disrupting microtubule-dependent neutrophil functions and inflammatory responses to monosodium urate crystals.",
    definition:
      "Microtubules are internal cell structures built from tubulin. Neutrophils are immune cells involved in gout inflammation.",
    safety:
      "Toxicity and overdose can be fatal. Kidney or liver disease and CYP3A4 or P-glycoprotein drug interactions are critical. Severe diarrhea, weakness, or unusual bleeding needs assessment. A fever with a hot swollen joint can indicate infection.",
    questions: [
      "What role would this medicine have in my overall care plan?",
      "Which side effects, interactions, or warning signs should I know about?",
      "What monitoring and follow-up would be needed?",
    ],
    source: "https://dailymed.nlm.nih.gov/dailymed/search.cfm?query=Colchicine",
    sourceLabel: "DailyMed label search",
    quiz: "Which statement describes Colchicine?",
    choices: [
      "It treats every cause of this condition.",
      "It is safe for everyone without monitoring.",
      "It replaces an individualized care plan.",
      "Colchicine reduces inflammatory-cell activity triggered by urate crystals.",
    ],
    correct: 3,
    mechanism: {
      title: "Inside the mechanism: Colchicine",
      before: "Urate crystals trigger inflammatory cells.",
      after: "Inflammatory-cell activity is reduced.",
      explanation:
        "Colchicine reduces inflammatory-cell activity triggered by urate crystals.",
      focus: "Inflammatory cells",
      input: "Crystal-triggered inflammation",
      target: "Microtubule-dependent cell activity",
      output: [
        "Urate crystals trigger inflammatory cells.",
        "Inflammatory-cell activity is reduced.",
      ],
      action: "inhibits",
    },
  },
  {
    id: "tenofovir-df",
    name: "Tenofovir disoproxil fumarate",
    category: "Antiviral nucleotide analog",
    target: "Liver",
    organ: "Liver",
    system: "Liver education",
    conditions: ["Hepatitis B, chronic"],
    uses: "Used for chronic hepatitis B in eligible people. It is also part of combination HIV treatment; HIV status and formulation matter.",
    simple:
      "Tenofovir interferes with viral DNA production needed for hepatitis B replication.",
    scientific:
      "Its active metabolite inhibits HBV polymerase/reverse transcriptase through competition with natural substrates and DNA chain termination.",
    definition:
      "A polymerase is an enzyme that copies genetic material. Chain termination interrupts construction of a new strand.",
    safety:
      "Kidney injury and reduced bone mineral density are concerns. Severe hepatitis flares may occur after stopping. HIV testing, liver and kidney monitoring, and interaction review are important; do not stop without supervision.",
    questions: [
      "What role would this medicine have in my overall care plan?",
      "Which side effects, interactions, or warning signs should I know about?",
      "What monitoring and follow-up would be needed?",
    ],
    source:
      "https://dailymed.nlm.nih.gov/dailymed/search.cfm?query=Tenofovir%20disoproxil%20fumarate",
    sourceLabel: "DailyMed label search",
    quiz: "Which statement describes Tenofovir disoproxil fumarate?",
    choices: [
      "It replaces an individualized care plan.",
      "Tenofovir interferes with viral DNA production needed for hepatitis B replication.",
      "It treats every cause of this condition.",
      "It is safe for everyone without monitoring.",
    ],
    correct: 1,
    mechanism: {
      title: "Inside the mechanism: Tenofovir disoproxil fumarate",
      before: "Viral DNA is copied.",
      after: "Viral DNA synthesis is inhibited.",
      explanation:
        "Tenofovir interferes with viral DNA production needed for hepatitis B replication.",
      focus: "Liver",
      input: "Hepatitis B replication",
      target: "Viral DNA polymerase",
      output: ["Viral DNA is copied.", "Viral DNA synthesis is inhibited."],
      action: "inhibits",
    },
  },
  {
    id: "sofosbuvir-velpatasvir",
    name: "Sofosbuvir / velpatasvir",
    category: "Hepatitis C antiviral combination",
    target: "Liver",
    organ: "Liver",
    system: "Liver education",
    conditions: ["Hepatitis C"],
    uses: "Used for hepatitis C in selected patients. Cirrhosis status, previous treatment, and interactions affect the complete regimen.",
    simple:
      "The two medicines block different proteins needed for hepatitis C replication.",
    scientific:
      "Sofosbuvir inhibits HCV NS5B RNA polymerase, while velpatasvir inhibits the HCV NS5A protein.",
    definition:
      "NS5B is the hepatitis C RNA-copying enzyme. NS5A is a viral protein involved in replication and virus assembly.",
    safety:
      "Hepatitis B reactivation can occur, so HBV screening and monitoring are important. Serious interactions, including with amiodarone and some acid medicines, require review. Liver disease stage affects treatment planning.",
    questions: [
      "What role would this medicine have in my overall care plan?",
      "Which side effects, interactions, or warning signs should I know about?",
      "What monitoring and follow-up would be needed?",
    ],
    source:
      "https://dailymed.nlm.nih.gov/dailymed/search.cfm?query=Sofosbuvir%20/%20velpatasvir",
    sourceLabel: "DailyMed label search",
    quiz: "Which statement describes Sofosbuvir / velpatasvir?",
    choices: [
      "It is safe for everyone without monitoring.",
      "It replaces an individualized care plan.",
      "The two medicines block different proteins needed for hepatitis C replication.",
      "It treats every cause of this condition.",
    ],
    correct: 2,
    mechanism: {
      title: "Inside the mechanism: Sofosbuvir / velpatasvir",
      before: "Viral proteins support RNA replication.",
      after: "Two viral replication functions are inhibited.",
      explanation:
        "The two medicines block different proteins needed for hepatitis C replication.",
      focus: "Liver",
      input: "Hepatitis C replication",
      target: "NS5B and NS5A viral functions",
      output: [
        "Viral proteins support RNA replication.",
        "Two viral replication functions are inhibited.",
      ],
      action: "inhibits",
    },
  },
  {
    id: "bictegravir-combination",
    name: "Bictegravir / emtricitabine / tenofovir alafenamide",
    category: "Combination antiretroviral",
    target: "HIV replication",
    organ: null,
    system: "HIV replication education",
    conditions: ["HIV infection"],
    uses: "A complete HIV treatment combination for eligible patients. Resistance history, other medicines, kidney function, and hepatitis B status affect suitability.",
    simple:
      "This combination blocks HIV from copying its genetic material and inserting it into human-cell DNA.",
    scientific:
      "Bictegravir inhibits HIV integrase strand transfer; emtricitabine and tenofovir metabolites inhibit reverse transcription through chain termination.",
    definition:
      "Reverse transcriptase copies HIV RNA into DNA. Integrase inserts that DNA into a human cell’s genetic material.",
    safety:
      "Adherence and interaction review are essential. Kidney or liver effects and immune reconstitution reactions can occur. Stopping can worsen coexisting hepatitis B. Mineral supplements and other medicines can alter absorption or effectiveness.",
    questions: [
      "What role would this medicine have in my overall care plan?",
      "Which side effects, interactions, or warning signs should I know about?",
      "What monitoring and follow-up would be needed?",
    ],
    source:
      "https://dailymed.nlm.nih.gov/dailymed/search.cfm?query=Bictegravir%20/%20emtricitabine%20/%20tenofovir%20alafenamide",
    sourceLabel: "DailyMed label search",
    quiz: "Which statement describes Bictegravir / emtricitabine / tenofovir alafenamide?",
    choices: [
      "This combination blocks HIV from copying its genetic material and inserting it into human-cell DNA.",
      "It treats every cause of this condition.",
      "It is safe for everyone without monitoring.",
      "It replaces an individualized care plan.",
    ],
    correct: 0,
    mechanism: {
      title:
        "Inside the mechanism: Bictegravir / emtricitabine / tenofovir alafenamide",
      before: "HIV copies and integrates genetic material.",
      after: "Viral copying and integration are inhibited.",
      explanation:
        "This combination blocks HIV from copying its genetic material and inserting it into human-cell DNA.",
      focus: "HIV replication",
      input: "HIV replication",
      target: "Integrase and reverse transcriptase",
      output: [
        "HIV copies and integrates genetic material.",
        "Viral copying and integration are inhibited.",
      ],
      action: "inhibits",
    },
  },
  {
    id: "levothyroxine",
    name: "Levothyroxine",
    category: "Thyroid hormone replacement",
    target: "Thyroid hormone signaling",
    organ: null,
    system: "Thyroid hormone signaling education",
    conditions: ["Hypothyroidism"],
    uses: "Used to replace insufficient thyroid hormone in hypothyroidism. It is not a weight-loss medicine.",
    simple:
      "Levothyroxine supplies T4, a thyroid hormone that the body can convert to active T3.",
    scientific:
      "Thyroxine is converted to triiodothyronine, which binds nuclear thyroid receptors and regulates gene expression and metabolism.",
    definition:
      "T4 (thyroxine) can be converted to T3, a more active thyroid hormone. These hormones regulate many metabolic processes.",
    safety:
      "Too much can cause heart rhythm problems and bone loss. Blood tests, heart disease, pregnancy, food timing, and interacting medicines require review. Products and formulations should not be changed without guidance.",
    questions: [
      "What role would this medicine have in my overall care plan?",
      "Which side effects, interactions, or warning signs should I know about?",
      "What monitoring and follow-up would be needed?",
    ],
    source:
      "https://dailymed.nlm.nih.gov/dailymed/search.cfm?query=Levothyroxine",
    sourceLabel: "DailyMed label search",
    quiz: "Which statement describes Levothyroxine?",
    choices: [
      "It is safe for everyone without monitoring.",
      "It replaces an individualized care plan.",
      "Levothyroxine supplies T4, a thyroid hormone that the body can convert to active T3.",
      "It treats every cause of this condition.",
    ],
    correct: 2,
    mechanism: {
      title: "Inside the mechanism: Levothyroxine",
      before: "Thyroid hormone supply is insufficient.",
      after: "Thyroid hormone is replaced.",
      explanation:
        "Levothyroxine supplies T4, a thyroid hormone that the body can convert to active T3.",
      focus: "Thyroid hormone signaling",
      input: "Thyroid hormone availability",
      target: "Thyroid hormone signaling",
      output: [
        "Thyroid hormone supply is insufficient.",
        "Thyroid hormone is replaced.",
      ],
      action: "supports",
    },
  },
  {
    id: "oseltamivir",
    name: "Oseltamivir",
    category: "Influenza antiviral",
    target: "Influenza replication",
    organ: null,
    system: "Influenza replication education",
    conditions: ["Influenza (flu)"],
    uses: "Used to treat or prevent influenza in selected situations. Eligibility and timing matter; it does not replace influenza vaccination.",
    simple:
      "Oseltamivir blocks an influenza enzyme that helps new virus particles leave infected cells.",
    scientific:
      "The active metabolite inhibits influenza A and B neuraminidase, reducing release of progeny virions.",
    definition:
      "Neuraminidase is an influenza enzyme that helps newly formed virus particles leave an infected cell.",
    safety:
      "Nausea and vomiting can occur. Kidney function affects use. Rare serious skin or neuropsychiatric reactions need attention. Worsening breathing or severe illness needs prompt assessment even during treatment.",
    questions: [
      "What role would this medicine have in my overall care plan?",
      "Which side effects, interactions, or warning signs should I know about?",
      "What monitoring and follow-up would be needed?",
    ],
    source:
      "https://dailymed.nlm.nih.gov/dailymed/search.cfm?query=Oseltamivir",
    sourceLabel: "DailyMed label search",
    quiz: "Which statement describes Oseltamivir?",
    choices: [
      "It replaces an individualized care plan.",
      "Oseltamivir blocks an influenza enzyme that helps new virus particles leave infected cells.",
      "It treats every cause of this condition.",
      "It is safe for everyone without monitoring.",
    ],
    correct: 1,
    mechanism: {
      title: "Inside the mechanism: Oseltamivir",
      before: "New influenza particles leave infected cells.",
      after: "Release of influenza particles is reduced.",
      explanation:
        "Oseltamivir blocks an influenza enzyme that helps new virus particles leave infected cells.",
      focus: "Influenza replication",
      input: "Influenza spread between cells",
      target: "Neuraminidase",
      output: [
        "New influenza particles leave infected cells.",
        "Release of influenza particles is reduced.",
      ],
      action: "inhibits",
    },
  },
  {
    id: "ramelteon",
    name: "Ramelteon",
    category: "Melatonin receptor agonist",
    target: "Brain",
    organ: "Brain",
    system: "Brain education",
    conditions: ["Insomnia"],
    uses: "Used for insomnia characterized by difficulty falling asleep. Cognitive behavioral therapy and evaluation of causes remain important.",
    simple:
      "Ramelteon activates melatonin receptors involved in the body’s sleep-wake timing.",
    scientific:
      "Ramelteon acts at MT1 and MT2 melatonin receptors in the suprachiasmatic nucleus and related circadian pathways.",
    definition:
      "Melatonin is a hormone involved in circadian timing. MT1 and MT2 are receptor types that respond to it.",
    safety:
      "Drowsiness and impaired alertness can occur. Avoid alcohol and review sedatives and interactions, especially fluvoxamine. Liver disease and unusual sleep behaviors require clinical attention.",
    questions: [
      "What role would this medicine have in my overall care plan?",
      "Which side effects, interactions, or warning signs should I know about?",
      "What monitoring and follow-up would be needed?",
    ],
    source: "https://dailymed.nlm.nih.gov/dailymed/search.cfm?query=Ramelteon",
    sourceLabel: "DailyMed label search",
    quiz: "Which statement describes Ramelteon?",
    choices: [
      "It replaces an individualized care plan.",
      "Ramelteon activates melatonin receptors involved in the body’s sleep-wake timing.",
      "It treats every cause of this condition.",
      "It is safe for everyone without monitoring.",
    ],
    correct: 1,
    mechanism: {
      title: "Inside the mechanism: Ramelteon",
      before: "Sleep-timing signals involve melatonin receptors.",
      after: "Melatonin receptors are activated.",
      explanation:
        "Ramelteon activates melatonin receptors involved in the body’s sleep-wake timing.",
      focus: "Brain",
      input: "Circadian sleep signaling",
      target: "MT1 and MT2 receptors",
      output: [
        "Sleep-timing signals involve melatonin receptors.",
        "Melatonin receptors are activated.",
      ],
      action: "activates",
    },
  },
  {
    id: "linaclotide",
    name: "Linaclotide",
    category: "Guanylate cyclase-C agonist",
    target: "Intestines",
    organ: null,
    system: "Intestines education",
    conditions: ["Irritable bowel syndrome (IBS)"],
    uses: "Used for constipation-predominant IBS and certain constipation indications, depending on age and product labeling. It is not a treatment for all IBS subtypes.",
    simple:
      "Linaclotide increases fluid secretion into the intestine and affects local pain signaling.",
    scientific:
      "Activation of intestinal guanylate cyclase-C increases cGMP, promotes chloride and bicarbonate secretion via CFTR, and modulates visceral pain signaling.",
    definition:
      "Guanylate cyclase-C is a receptor on intestinal cells. Its activation increases cGMP, which affects fluid secretion and local pain signaling.",
    safety:
      "Severe diarrhea and dehydration can occur. It is contraindicated in children younger than two years and in known or suspected bowel obstruction. Age-specific approved uses differ and require professional review.",
    questions: [
      "What role would this medicine have in my overall care plan?",
      "Which side effects, interactions, or warning signs should I know about?",
      "What monitoring and follow-up would be needed?",
    ],
    source:
      "https://dailymed.nlm.nih.gov/dailymed/search.cfm?query=Linaclotide",
    sourceLabel: "DailyMed label search",
    quiz: "Which statement describes Linaclotide?",
    choices: [
      "It is safe for everyone without monitoring.",
      "It replaces an individualized care plan.",
      "Linaclotide increases fluid secretion into the intestine and affects local pain signaling.",
      "It treats every cause of this condition.",
    ],
    correct: 2,
    mechanism: {
      title: "Inside the mechanism: Linaclotide",
      before: "Fluid secretion may be insufficient.",
      after: "Intestinal fluid secretion is increased.",
      explanation:
        "Linaclotide increases fluid secretion into the intestine and affects local pain signaling.",
      focus: "Intestines",
      input: "Intestinal fluid signaling",
      target: "Guanylate cyclase-C",
      output: [
        "Fluid secretion may be insufficient.",
        "Intestinal fluid secretion is increased.",
      ],
      action: "activates",
    },
  },
  {
    id: "osimertinib",
    name: "Osimertinib",
    category: "Targeted cancer therapy",
    target: "EGFR-mutated cancer cells",
    organ: null,
    system: "EGFR-mutated cancer cells education",
    conditions: ["Lung cancer"],
    uses: "Used for selected EGFR-mutated non-small cell lung cancers after molecular testing. It is not suitable for every lung cancer.",
    simple:
      "Osimertinib blocks an abnormal EGFR signal that supports growth in certain lung cancers.",
    scientific:
      "Osimertinib irreversibly inhibits selected mutant EGFR tyrosine kinases, including common sensitizing mutations and T790M.",
    definition:
      "EGFR is a cell-surface signaling receptor. Some cancer-causing EGFR mutations keep growth signals active; molecular testing identifies them.",
    safety:
      "Serious lung inflammation, heart rhythm changes, cardiomyopathy, and skin or eye reactions can occur. Cancer mutation testing and ongoing monitoring are essential. Pregnancy risks and interactions require oncology review.",
    questions: [
      "What role would this medicine have in my overall care plan?",
      "Which side effects, interactions, or warning signs should I know about?",
      "What monitoring and follow-up would be needed?",
    ],
    source:
      "https://dailymed.nlm.nih.gov/dailymed/search.cfm?query=Osimertinib",
    sourceLabel: "DailyMed label search",
    quiz: "Which statement describes Osimertinib?",
    choices: [
      "It treats every cause of this condition.",
      "It is safe for everyone without monitoring.",
      "It replaces an individualized care plan.",
      "Osimertinib blocks an abnormal EGFR signal that supports growth in certain lung cancers.",
    ],
    correct: 3,
    mechanism: {
      title: "Inside the mechanism: Osimertinib",
      before: "Mutant EGFR supports cancer-cell growth signals.",
      after: "Selected mutant EGFR signals are inhibited.",
      explanation:
        "Osimertinib blocks an abnormal EGFR signal that supports growth in certain lung cancers.",
      focus: "EGFR-mutated cancer cells",
      input: "Mutant EGFR signaling",
      target: "EGFR tyrosine kinase",
      output: [
        "Mutant EGFR supports cancer-cell growth signals.",
        "Selected mutant EGFR signals are inhibited.",
      ],
      action: "inhibits",
    },
  },
  {
    id: "doxycycline",
    name: "Doxycycline",
    category: "Tetracycline antibiotic",
    target: "Infection site and skin",
    organ: null,
    system: "Infection site and skin education",
    conditions: ["Lyme disease", "Rosacea", "Chlamydia"],
    uses: "Used for selected susceptible infections, including some Lyme disease and chlamydia presentations. Selected formulations are used for inflammatory rosacea. It does not treat all causes or stages.",
    simple:
      "Doxycycline blocks bacterial protein production. Some skin uses also rely on anti-inflammatory effects.",
    scientific:
      "Doxycycline binds the bacterial 30S ribosomal subunit and inhibits aminoacyl-tRNA binding; lower-exposure dermatologic formulations can have anti-inflammatory activity.",
    definition:
      "A ribosome makes proteins. The 30S subunit is one part of a bacterial ribosome.",
    safety:
      "Sun sensitivity, esophageal irritation, and antibiotic-associated diarrhea can occur. Pregnancy, age, and interactions with mineral supplements require review. Formulations for rosacea are not substitutes for infection treatment.",
    questions: [
      "What role would this medicine have in my overall care plan?",
      "Which side effects, interactions, or warning signs should I know about?",
      "What monitoring and follow-up would be needed?",
    ],
    source:
      "https://dailymed.nlm.nih.gov/dailymed/search.cfm?query=Doxycycline",
    sourceLabel: "DailyMed label search",
    quiz: "Which statement describes Doxycycline?",
    choices: [
      "It replaces an individualized care plan.",
      "Doxycycline blocks bacterial protein production. Some skin uses also rely on anti-inflammatory effects.",
      "It treats every cause of this condition.",
      "It is safe for everyone without monitoring.",
    ],
    correct: 1,
    mechanism: {
      title: "Inside the mechanism: Doxycycline",
      before: "Bacteria produce proteins.",
      after: "Bacterial protein synthesis is inhibited.",
      explanation:
        "Doxycycline blocks bacterial protein production. Some skin uses also rely on anti-inflammatory effects.",
      focus: "Infection site and skin",
      input: "Bacterial protein production",
      target: "30S ribosomal function",
      output: [
        "Bacteria produce proteins.",
        "Bacterial protein synthesis is inhibited.",
      ],
      action: "inhibits",
    },
  },
  {
    id: "artemether-lumefantrine",
    name: "Artemether / lumefantrine",
    category: "Antimalarial combination",
    target: "Malaria parasites",
    organ: null,
    system: "Malaria parasites education",
    conditions: ["Malaria"],
    uses: "Used for selected uncomplicated malaria infections, particularly P. falciparum. Severe malaria requires emergency treatment with a different approach. Species and resistance affect selection.",
    simple:
      "The combination damages malaria parasites through complementary effects involving parasite handling of heme.",
    scientific:
      "Artemether forms reactive intermediates following activation of its endoperoxide bridge; lumefantrine interferes with heme detoxification. Some mechanistic details remain incompletely established.",
    definition:
      "Heme is an iron-containing molecule released during hemoglobin digestion. Malaria parasites must handle it safely to survive.",
    safety:
      "Malaria can be life-threatening and needs urgent diagnosis. QT prolongation and interactions require review. It is not a general malaria-prevention medicine and is not appropriate for severe malaria.",
    questions: [
      "What role would this medicine have in my overall care plan?",
      "Which side effects, interactions, or warning signs should I know about?",
      "What monitoring and follow-up would be needed?",
    ],
    source:
      "https://dailymed.nlm.nih.gov/dailymed/search.cfm?query=Artemether%20/%20lumefantrine",
    sourceLabel: "DailyMed label search",
    quiz: "Which statement describes Artemether / lumefantrine?",
    choices: [
      "It is safe for everyone without monitoring.",
      "It replaces an individualized care plan.",
      "The combination damages malaria parasites through complementary effects involving parasite handling of heme.",
      "It treats every cause of this condition.",
    ],
    correct: 2,
    mechanism: {
      title: "Inside the mechanism: Artemether / lumefantrine",
      before: "Malaria parasites maintain survival pathways.",
      after: "Parasite survival processes are disrupted.",
      explanation:
        "The combination damages malaria parasites through complementary effects involving parasite handling of heme.",
      focus: "Malaria parasites",
      input: "Parasite survival processes",
      target: "Heme-related parasite processes",
      output: [
        "Malaria parasites maintain survival pathways.",
        "Parasite survival processes are disrupted.",
      ],
      action: "modifies",
    },
  },
  {
    id: "sumatriptan",
    name: "Sumatriptan",
    category: "Triptan",
    target: "Migraine signaling",
    organ: null,
    system: "Migraine signaling education",
    conditions: ["Migraine"],
    uses: "Used for acute migraine attacks in appropriate patients. It is not a general headache treatment or routine migraine-prevention medicine.",
    simple:
      "Sumatriptan activates serotonin receptors involved in migraine-related nerve signaling and cranial blood-vessel responses.",
    scientific:
      "Sumatriptan agonizes 5-HT1B and 5-HT1D receptors, modulating cranial vasculature and trigeminal neuropeptide release.",
    definition:
      "5-HT is another name for serotonin. Trigeminal nerves carry sensory signals involved in migraine.",
    safety:
      "Some cardiovascular and cerebrovascular conditions, uncontrolled hypertension, and interactions make it unsuitable. Chest pain, stroke symptoms, or serotonin-syndrome symptoms need urgent attention. Frequent use can contribute to medication-overuse headache.",
    questions: [
      "What role would this medicine have in my overall care plan?",
      "Which side effects, interactions, or warning signs should I know about?",
      "What monitoring and follow-up would be needed?",
    ],
    source:
      "https://dailymed.nlm.nih.gov/dailymed/search.cfm?query=Sumatriptan",
    sourceLabel: "DailyMed label search",
    quiz: "Which statement describes Sumatriptan?",
    choices: [
      "It is safe for everyone without monitoring.",
      "It replaces an individualized care plan.",
      "Sumatriptan activates serotonin receptors involved in migraine-related nerve signaling and cranial blood-vessel responses.",
      "It treats every cause of this condition.",
    ],
    correct: 2,
    mechanism: {
      title: "Inside the mechanism: Sumatriptan",
      before: "Migraine involves trigeminal signaling.",
      after: "Migraine-related receptor signaling is modified.",
      explanation:
        "Sumatriptan activates serotonin receptors involved in migraine-related nerve signaling and cranial blood-vessel responses.",
      focus: "Migraine signaling",
      input: "Migraine-related signaling",
      target: "5-HT1B and 5-HT1D receptors",
      output: [
        "Migraine involves trigeminal signaling.",
        "Migraine-related receptor signaling is modified.",
      ],
      action: "activates",
    },
  },
  {
    id: "interferon-beta-1a",
    name: "Interferon beta-1a",
    category: "MS disease-modifying therapy",
    target: "Immune signaling",
    organ: null,
    system: "Immune signaling education",
    conditions: ["Multiple sclerosis"],
    uses: "Used for selected relapsing forms of multiple sclerosis. It is not a cure or an immediate treatment for every acute relapse.",
    simple:
      "Interferon beta-1a changes immune signaling involved in multiple sclerosis.",
    scientific:
      "Interferon beta receptor activation alters transcription of immune-response genes. The full therapeutic mechanism in multiple sclerosis is not established.",
    definition:
      "Interferons are signaling proteins that influence immune responses. Gene transcription changes how cells produce proteins.",
    safety:
      "Flu-like symptoms, injection reactions, depression, liver injury, and blood-count changes can occur. Mood, liver tests, blood counts, and formulation-specific risks require monitoring.",
    questions: [
      "What role would this medicine have in my overall care plan?",
      "Which side effects, interactions, or warning signs should I know about?",
      "What monitoring and follow-up would be needed?",
    ],
    source:
      "https://dailymed.nlm.nih.gov/dailymed/search.cfm?query=Interferon%20beta-1a",
    sourceLabel: "DailyMed label search",
    quiz: "Which statement describes Interferon beta-1a?",
    choices: [
      "It is safe for everyone without monitoring.",
      "It replaces an individualized care plan.",
      "Interferon beta-1a changes immune signaling involved in multiple sclerosis.",
      "It treats every cause of this condition.",
    ],
    correct: 2,
    mechanism: {
      title: "Inside the mechanism: Interferon beta-1a",
      before: "Immune activity contributes to MS.",
      after: "Immune signaling is modified.",
      explanation:
        "Interferon beta-1a changes immune signaling involved in multiple sclerosis.",
      focus: "Immune signaling",
      input: "Immune responses",
      target: "Interferon-responsive pathways",
      output: [
        "Immune activity contributes to MS.",
        "Immune signaling is modified.",
      ],
      action: "modifies",
    },
  },
  {
    id: "diclofenac-topical",
    name: "Diclofenac topical gel",
    category: "Topical NSAID",
    target: "Joints",
    organ: null,
    system: "Joints education",
    conditions: ["Osteoarthritis"],
    uses: "Selected topical products relieve osteoarthritis pain in joints appropriate to the product. It does not reverse joint damage.",
    simple:
      "Diclofenac reduces prostaglandins that contribute to pain and inflammation.",
    scientific:
      "Diclofenac inhibits cyclooxygenase activity and decreases prostaglandin synthesis. Topical application reduces but does not eliminate systemic exposure.",
    definition:
      "Cyclooxygenase (COX) enzymes help make prostaglandins, chemical signals involved in inflammation and other body functions.",
    safety:
      "NSAIDs carry risks of serious cardiovascular events, gastrointestinal bleeding, and kidney injury, even with topical products. Avoid combining NSAIDs without review. Pregnancy stage, other medicines, and skin condition affect suitability.",
    questions: [
      "What role would this medicine have in my overall care plan?",
      "Which side effects, interactions, or warning signs should I know about?",
      "What monitoring and follow-up would be needed?",
    ],
    source:
      "https://dailymed.nlm.nih.gov/dailymed/search.cfm?query=Diclofenac%20topical%20gel",
    sourceLabel: "DailyMed label search",
    quiz: "Which statement describes Diclofenac topical gel?",
    choices: [
      "It treats every cause of this condition.",
      "It is safe for everyone without monitoring.",
      "It replaces an individualized care plan.",
      "Diclofenac reduces prostaglandins that contribute to pain and inflammation.",
    ],
    correct: 3,
    mechanism: {
      title: "Inside the mechanism: Diclofenac topical gel",
      before: "COX enzymes support prostaglandin synthesis.",
      after: "Prostaglandin synthesis is reduced.",
      explanation:
        "Diclofenac reduces prostaglandins that contribute to pain and inflammation.",
      focus: "Joints",
      input: "Prostaglandin production",
      target: "Cyclooxygenase",
      output: [
        "COX enzymes support prostaglandin synthesis.",
        "Prostaglandin synthesis is reduced.",
      ],
      action: "inhibits",
    },
  },
  {
    id: "alendronate",
    name: "Alendronate",
    category: "Bisphosphonate",
    target: "Bones",
    organ: null,
    system: "Bones education",
    conditions: ["Osteoporosis"],
    uses: "Used for selected osteoporosis indications and certain other bone conditions after fracture-risk assessment.",
    simple: "Alendronate slows the activity of cells that break down bone.",
    scientific:
      "Alendronate binds bone mineral and inhibits farnesyl pyrophosphate synthase in osteoclasts, impairing bone-resorbing activity.",
    definition:
      "Osteoclasts are bone-resorbing cells. Resorption is a normal part of bone remodeling but can contribute to bone loss when out of balance.",
    safety:
      "Esophageal injury, low calcium, and rare jaw or unusual femur problems are important. Kidney function, swallowing problems, dental history, and ability to follow administration instructions require review.",
    questions: [
      "What role would this medicine have in my overall care plan?",
      "Which side effects, interactions, or warning signs should I know about?",
      "What monitoring and follow-up would be needed?",
    ],
    source:
      "https://dailymed.nlm.nih.gov/dailymed/search.cfm?query=Alendronate",
    sourceLabel: "DailyMed label search",
    quiz: "Which statement describes Alendronate?",
    choices: [
      "It treats every cause of this condition.",
      "It is safe for everyone without monitoring.",
      "It replaces an individualized care plan.",
      "Alendronate slows the activity of cells that break down bone.",
    ],
    correct: 3,
    mechanism: {
      title: "Inside the mechanism: Alendronate",
      before: "Osteoclasts break down bone.",
      after: "Bone resorption is reduced.",
      explanation:
        "Alendronate slows the activity of cells that break down bone.",
      focus: "Bones",
      input: "Bone remodeling",
      target: "Osteoclast activity",
      output: ["Osteoclasts break down bone.", "Bone resorption is reduced."],
      action: "inhibits",
    },
  },
  {
    id: "amoxicillin",
    name: "Amoxicillin",
    category: "Penicillin antibiotic",
    target: "Infection site",
    organ: null,
    system: "Infection site education",
    conditions: ["Otitis media (middle ear infection)", "Strep throat"],
    uses: "Used for selected susceptible bacterial infections, such as confirmed strep throat and some middle-ear infections. Not all ear infections or sore throats require antibiotics.",
    simple:
      "Amoxicillin prevents susceptible bacteria from building a stable cell wall.",
    scientific:
      "Amoxicillin binds penicillin-binding proteins and inhibits peptidoglycan cross-linking during bacterial cell wall synthesis.",
    definition:
      "Peptidoglycan forms a mesh in many bacterial cell walls. Cross-linking connects this mesh and helps make the wall stable.",
    safety:
      "Serious allergy and antibiotic-associated diarrhea can occur. Allergy history, kidney function, and infection cause require review. A rash may occur with infectious mononucleosis. It does not treat viral illness.",
    questions: [
      "What role would this medicine have in my overall care plan?",
      "Which side effects, interactions, or warning signs should I know about?",
      "What monitoring and follow-up would be needed?",
    ],
    source:
      "https://dailymed.nlm.nih.gov/dailymed/search.cfm?query=Amoxicillin",
    sourceLabel: "DailyMed label search",
    quiz: "Which statement describes Amoxicillin?",
    choices: [
      "It treats every cause of this condition.",
      "It is safe for everyone without monitoring.",
      "It replaces an individualized care plan.",
      "Amoxicillin prevents susceptible bacteria from building a stable cell wall.",
    ],
    correct: 3,
    mechanism: {
      title: "Inside the mechanism: Amoxicillin",
      before: "Bacteria build a protective wall.",
      after: "Bacterial wall synthesis is inhibited.",
      explanation:
        "Amoxicillin prevents susceptible bacteria from building a stable cell wall.",
      focus: "Infection site",
      input: "Bacterial wall construction",
      target: "Cell wall cross-linking",
      output: [
        "Bacteria build a protective wall.",
        "Bacterial wall synthesis is inhibited.",
      ],
      action: "inhibits",
    },
  },
  {
    id: "carboplatin",
    name: "Carboplatin",
    category: "Platinum chemotherapy",
    target: "Cancer cells",
    organ: null,
    system: "Cancer cells education",
    conditions: ["Ovarian cancer"],
    uses: "Used in selected ovarian cancer regimens, commonly with other treatments. Cancer subtype, stage, and previous treatment guide use.",
    simple:
      "Carboplatin damages DNA in dividing cells, including cancer cells. It can also affect healthy cells.",
    scientific:
      "Carboplatin forms platinum-DNA adducts and cross-links that interfere with DNA replication and transcription.",
    definition:
      "A DNA cross-link connects parts of DNA in a way that can obstruct copying and reading of genetic instructions.",
    safety:
      "Severe bone-marrow suppression, bleeding or infection, allergic reactions, and kidney-related risks require specialist monitoring. Blood counts, kidney function, pregnancy risks, and combination-treatment toxicity are central to planning.",
    questions: [
      "What role would this medicine have in my overall care plan?",
      "Which side effects, interactions, or warning signs should I know about?",
      "What monitoring and follow-up would be needed?",
    ],
    source:
      "https://dailymed.nlm.nih.gov/dailymed/search.cfm?query=Carboplatin",
    sourceLabel: "DailyMed label search",
    quiz: "Which statement describes Carboplatin?",
    choices: [
      "It replaces an individualized care plan.",
      "Carboplatin damages DNA in dividing cells, including cancer cells. It can also affect healthy cells.",
      "It treats every cause of this condition.",
      "It is safe for everyone without monitoring.",
    ],
    correct: 1,
    mechanism: {
      title: "Inside the mechanism: Carboplatin",
      before: "Cells copy DNA to divide.",
      after: "DNA cross-links disrupt cell replication.",
      explanation:
        "Carboplatin damages DNA in dividing cells, including cancer cells. It can also affect healthy cells.",
      focus: "Cancer cells",
      input: "Cellular DNA",
      target: "DNA integrity",
      output: [
        "Cells copy DNA to divide.",
        "DNA cross-links disrupt cell replication.",
      ],
      action: "modifies",
    },
  },
  {
    id: "carbidopa-levodopa",
    name: "Carbidopa / levodopa",
    category: "Dopamine precursor combination",
    target: "Brain",
    organ: "Brain",
    system: "Brain education",
    conditions: ["Parkinson disease"],
    uses: "Used for movement symptoms of Parkinson disease. It does not cure the condition or treat every symptom.",
    simple:
      "Levodopa is converted to dopamine in the brain. Carbidopa limits conversion outside the brain so more levodopa can reach it.",
    scientific:
      "Levodopa crosses the blood-brain barrier and is decarboxylated to dopamine. Carbidopa inhibits peripheral aromatic L-amino acid decarboxylase.",
    definition:
      "Dopamine is a nerve-cell messenger involved in movement. A precursor is a substance the body can convert into another chemical.",
    safety:
      "Involuntary movements, low blood pressure, sleep attacks, hallucinations, and impulse-control changes can occur. Food and drug interactions and formulation differences matter. Abrupt changes can cause serious reactions.",
    questions: [
      "What role would this medicine have in my overall care plan?",
      "Which side effects, interactions, or warning signs should I know about?",
      "What monitoring and follow-up would be needed?",
    ],
    source:
      "https://dailymed.nlm.nih.gov/dailymed/search.cfm?query=Carbidopa%20/%20levodopa",
    sourceLabel: "DailyMed label search",
    quiz: "Which statement describes Carbidopa / levodopa?",
    choices: [
      "It is safe for everyone without monitoring.",
      "It replaces an individualized care plan.",
      "Levodopa is converted to dopamine in the brain. Carbidopa limits conversion outside the brain so more levodopa can reach it.",
      "It treats every cause of this condition.",
    ],
    correct: 2,
    mechanism: {
      title: "Inside the mechanism: Carbidopa / levodopa",
      before: "Dopamine signaling is reduced in Parkinson disease.",
      after: "A dopamine precursor is supplied.",
      explanation:
        "Levodopa is converted to dopamine in the brain. Carbidopa limits conversion outside the brain so more levodopa can reach it.",
      focus: "Brain",
      input: "Dopamine availability",
      target: "Dopamine synthesis in the brain",
      output: [
        "Dopamine signaling is reduced in Parkinson disease.",
        "A dopamine precursor is supplied.",
      ],
      action: "supports",
    },
  },
  {
    id: "methotrexate",
    name: "Methotrexate",
    category: "Disease-modifying antirheumatic drug",
    target: "Immune system",
    organ: null,
    system: "Immune system education",
    conditions: ["Psoriatic arthritis", "Rheumatoid arthritis"],
    uses: "Used for selected rheumatoid arthritis, psoriatic arthritis, and severe psoriasis cases, as well as distinct cancer regimens. Indications and schedules differ substantially.",
    simple:
      "For inflammatory disease, methotrexate changes immune activity through several pathways. Its actions are different from a simple pain reliever.",
    scientific:
      "Low-exposure anti-inflammatory effects involve increased extracellular adenosine and other immune pathways. Antifolate effects are important in oncology and toxicity.",
    definition:
      "Adenosine is a signaling molecule involved in inflammation. Folate is needed for cell processes including DNA production.",
    safety:
      "Medication errors can be fatal: inflammatory-disease regimens are generally weekly, not daily. Bone marrow, liver, lung, pregnancy, and serious infection risks require monitoring. Do not infer any schedule from this site; confirm the prescribed plan with the care team.",
    questions: [
      "What role would this medicine have in my overall care plan?",
      "Which side effects, interactions, or warning signs should I know about?",
      "What monitoring and follow-up would be needed?",
    ],
    source:
      "https://dailymed.nlm.nih.gov/dailymed/search.cfm?query=Methotrexate",
    sourceLabel: "DailyMed label search",
    quiz: "Which statement describes Methotrexate?",
    choices: [
      "For inflammatory disease, methotrexate changes immune activity through several pathways. Its actions are different from a simple pain reliever.",
      "It treats every cause of this condition.",
      "It is safe for everyone without monitoring.",
      "It replaces an individualized care plan.",
    ],
    correct: 0,
    mechanism: {
      title: "Inside the mechanism: Methotrexate",
      before: "Immune pathways drive inflammation.",
      after: "Inflammatory immune signaling is modified.",
      explanation:
        "For inflammatory disease, methotrexate changes immune activity through several pathways. Its actions are different from a simple pain reliever.",
      focus: "Immune system",
      input: "Inflammatory immune activity",
      target: "Adenosine and folate-related pathways",
      output: [
        "Immune pathways drive inflammation.",
        "Inflammatory immune signaling is modified.",
      ],
      action: "modifies",
    },
  },
  {
    id: "calcipotriene",
    name: "Calcipotriene",
    category: "Topical vitamin D analog",
    target: "Skin",
    organ: null,
    system: "Skin education",
    conditions: ["Psoriasis"],
    uses: "Used in selected topical formulations for plaque psoriasis. Location and product-specific restrictions matter.",
    simple:
      "Calcipotriene changes skin-cell growth and maturation in psoriasis plaques.",
    scientific:
      "Vitamin D receptor activation regulates keratinocyte proliferation and differentiation and influences local immune signaling.",
    definition:
      "Keratinocytes are the main cells in the outer skin layer. Differentiation is the process by which they mature.",
    safety:
      "Irritation and changes in calcium balance can occur, particularly with inappropriate exposure. Avoid using beyond product-specific instructions. Combination products have additional steroid-related risks.",
    questions: [
      "What role would this medicine have in my overall care plan?",
      "Which side effects, interactions, or warning signs should I know about?",
      "What monitoring and follow-up would be needed?",
    ],
    source:
      "https://dailymed.nlm.nih.gov/dailymed/search.cfm?query=Calcipotriene",
    sourceLabel: "DailyMed label search",
    quiz: "Which statement describes Calcipotriene?",
    choices: [
      "Calcipotriene changes skin-cell growth and maturation in psoriasis plaques.",
      "It treats every cause of this condition.",
      "It is safe for everyone without monitoring.",
      "It replaces an individualized care plan.",
    ],
    correct: 0,
    mechanism: {
      title: "Inside the mechanism: Calcipotriene",
      before: "Skin cells proliferate abnormally in plaques.",
      after: "Skin-cell differentiation is modified.",
      explanation:
        "Calcipotriene changes skin-cell growth and maturation in psoriasis plaques.",
      focus: "Skin",
      input: "Skin-cell turnover",
      target: "Vitamin D receptor",
      output: [
        "Skin cells proliferate abnormally in plaques.",
        "Skin-cell differentiation is modified.",
      ],
      action: "activates",
    },
  },
  {
    id: "risperidone",
    name: "Risperidone",
    category: "Atypical antipsychotic",
    target: "Brain",
    organ: "Brain",
    system: "Brain education",
    conditions: ["Schizophrenia"],
    uses: "Used for schizophrenia and certain other psychiatric indications depending on age and formulation.",
    simple:
      "Risperidone changes dopamine and serotonin receptor signaling involved in psychotic symptoms.",
    scientific:
      "Risperidone antagonizes dopamine D2 and serotonin 5-HT2A receptors, with additional receptor effects.",
    definition:
      "D2 receptors respond to dopamine; 5-HT2A receptors respond to serotonin. Both participate in brain signaling.",
    safety:
      "Movement disorders, metabolic changes, high prolactin, and neuroleptic malignant syndrome are concerns. Antipsychotics increase mortality in older adults with dementia-related psychosis and are not approved for that use. Clinical monitoring and formulation review are essential.",
    questions: [
      "What role would this medicine have in my overall care plan?",
      "Which side effects, interactions, or warning signs should I know about?",
      "What monitoring and follow-up would be needed?",
    ],
    source:
      "https://dailymed.nlm.nih.gov/dailymed/search.cfm?query=Risperidone",
    sourceLabel: "DailyMed label search",
    quiz: "Which statement describes Risperidone?",
    choices: [
      "It is safe for everyone without monitoring.",
      "It replaces an individualized care plan.",
      "Risperidone changes dopamine and serotonin receptor signaling involved in psychotic symptoms.",
      "It treats every cause of this condition.",
    ],
    correct: 2,
    mechanism: {
      title: "Inside the mechanism: Risperidone",
      before: "These receptors transmit nerve-cell signals.",
      after: "Selected receptor signals are blocked.",
      explanation:
        "Risperidone changes dopamine and serotonin receptor signaling involved in psychotic symptoms.",
      focus: "Brain",
      input: "Dopamine and serotonin",
      target: "D2 and 5-HT2A receptors",
      output: [
        "These receptors transmit nerve-cell signals.",
        "Selected receptor signals are blocked.",
      ],
      action: "inhibits",
    },
  },
  {
    id: "bupropion-xl",
    name: "Bupropion extended-release (XL)",
    category: "Antidepressant",
    target: "Brain",
    organ: "Brain",
    system: "Brain education",
    conditions: ["Seasonal affective disorder"],
    uses: "Used for depression; selected XL products prevent seasonal major depressive episodes in people with seasonal affective disorder. It is not appropriate for every mood disorder.",
    simple:
      "Bupropion changes norepinephrine and dopamine signaling. Its exact clinical mechanism is not fully understood.",
    scientific:
      "Bupropion inhibits neuronal norepinephrine and dopamine reuptake; the full relationship to antidepressant effects is incompletely defined.",
    definition:
      "Reuptake transports a chemical messenger back into a nerve cell. Transporters are proteins that carry out this recycling.",
    safety:
      "Antidepressant suicidality warnings, seizures, high blood pressure, and mood changes are important. Seizure disorders, certain eating disorders, and some withdrawal states make it unsuitable. Multiple bupropion-containing products should not be combined inadvertently.",
    questions: [
      "What role would this medicine have in my overall care plan?",
      "Which side effects, interactions, or warning signs should I know about?",
      "What monitoring and follow-up would be needed?",
    ],
    source:
      "https://dailymed.nlm.nih.gov/dailymed/search.cfm?query=Bupropion%20extended-release%20%28XL%29",
    sourceLabel: "DailyMed label search",
    quiz: "Which statement describes Bupropion extended-release (XL)?",
    choices: [
      "It replaces an individualized care plan.",
      "Bupropion changes norepinephrine and dopamine signaling. Its exact clinical mechanism is not fully understood.",
      "It treats every cause of this condition.",
      "It is safe for everyone without monitoring.",
    ],
    correct: 1,
    mechanism: {
      title: "Inside the mechanism: Bupropion extended-release (XL)",
      before: "Transporters recycle signaling chemicals.",
      after: "Norepinephrine and dopamine reuptake is reduced.",
      explanation:
        "Bupropion changes norepinephrine and dopamine signaling. Its exact clinical mechanism is not fully understood.",
      focus: "Brain",
      input: "Norepinephrine and dopamine",
      target: "Neurotransmitter reuptake",
      output: [
        "Transporters recycle signaling chemicals.",
        "Norepinephrine and dopamine reuptake is reduced.",
      ],
      action: "inhibits",
    },
  },
  {
    id: "valacyclovir",
    name: "Valacyclovir",
    category: "Antiviral",
    target: "Herpes virus replication",
    organ: null,
    system: "Herpes virus replication education",
    conditions: ["Shingles (herpes zoster)"],
    uses: "Used for shingles and selected herpes infections. It does not eliminate latent virus or directly treat established postherpetic neuralgia.",
    simple:
      "Valacyclovir becomes acyclovir in the body and interferes with copying viral DNA.",
    scientific:
      "Acyclovir triphosphate inhibits viral DNA polymerase and causes DNA chain termination after activation preferentially in infected cells.",
    definition:
      "A polymerase is an enzyme that copies genetic material. Chain termination interrupts construction of a new strand.",
    safety:
      "Kidney injury and neurologic reactions can occur, especially with reduced kidney function or unsuitable exposure. Immune status, hydration needs, and kidney function require review. Shingles near an eye needs prompt assessment.",
    questions: [
      "What role would this medicine have in my overall care plan?",
      "Which side effects, interactions, or warning signs should I know about?",
      "What monitoring and follow-up would be needed?",
    ],
    source:
      "https://dailymed.nlm.nih.gov/dailymed/search.cfm?query=Valacyclovir",
    sourceLabel: "DailyMed label search",
    quiz: "Which statement describes Valacyclovir?",
    choices: [
      "It replaces an individualized care plan.",
      "Valacyclovir becomes acyclovir in the body and interferes with copying viral DNA.",
      "It treats every cause of this condition.",
      "It is safe for everyone without monitoring.",
    ],
    correct: 1,
    mechanism: {
      title: "Inside the mechanism: Valacyclovir",
      before: "Herpes viruses copy DNA.",
      after: "Viral DNA copying is inhibited.",
      explanation:
        "Valacyclovir becomes acyclovir in the body and interferes with copying viral DNA.",
      focus: "Herpes virus replication",
      input: "Herpes viral replication",
      target: "Viral DNA polymerase",
      output: ["Herpes viruses copy DNA.", "Viral DNA copying is inhibited."],
      action: "inhibits",
    },
  },
  {
    id: "amoxicillin-clavulanate",
    name: "Amoxicillin / clavulanate",
    category: "Penicillin and beta-lactamase inhibitor",
    target: "Infection site",
    organ: null,
    system: "Infection site education",
    conditions: ["Sinusitis, acute bacterial", "Diverticulitis"],
    uses: "Used for selected bacterial infections, including some bacterial sinusitis and selected diverticulitis cases. Many sinus illnesses are viral, and not all diverticulitis needs antibiotics.",
    simple:
      "Amoxicillin blocks bacterial cell-wall building. Clavulanate protects it from some bacterial enzymes.",
    scientific:
      "Amoxicillin inhibits peptidoglycan cross-linking. Clavulanate inhibits selected beta-lactamases, extending activity against certain resistant organisms.",
    definition:
      "Beta-lactamases are bacterial enzymes that can break down some antibiotics. Clavulanate inhibits selected enzymes, but not every resistance mechanism.",
    safety:
      "Serious allergy, liver injury, and antibiotic-associated diarrhea can occur. Previous reactions, kidney function, other medicines, and the likely organism affect suitability. It is not active against every resistant bacterium.",
    questions: [
      "What role would this medicine have in my overall care plan?",
      "Which side effects, interactions, or warning signs should I know about?",
      "What monitoring and follow-up would be needed?",
    ],
    source:
      "https://dailymed.nlm.nih.gov/dailymed/search.cfm?query=Amoxicillin%20/%20clavulanate",
    sourceLabel: "DailyMed label search",
    quiz: "Which statement describes Amoxicillin / clavulanate?",
    choices: [
      "Amoxicillin blocks bacterial cell-wall building. Clavulanate protects it from some bacterial enzymes.",
      "It treats every cause of this condition.",
      "It is safe for everyone without monitoring.",
      "It replaces an individualized care plan.",
    ],
    correct: 0,
    mechanism: {
      title: "Inside the mechanism: Amoxicillin / clavulanate",
      before: "Bacterial walls and defense enzymes support survival.",
      after: "Cell wall synthesis is inhibited with enzyme protection.",
      explanation:
        "Amoxicillin blocks bacterial cell-wall building. Clavulanate protects it from some bacterial enzymes.",
      focus: "Infection site",
      input: "Bacterial wall construction",
      target: "Cell wall enzymes and beta-lactamases",
      output: [
        "Bacterial walls and defense enzymes support survival.",
        "Cell wall synthesis is inhibited with enzyme protection.",
      ],
      action: "inhibits",
    },
  },
  {
    id: "aspirin",
    name: "Aspirin",
    category: "Antiplatelet medicine",
    target: "Platelets and blood vessels",
    organ: null,
    system: "Platelets and blood vessels education",
    conditions: ["Stroke"],
    uses: "Used in selected cardiovascular prevention plans, including secondary prevention after certain ischemic strokes. It is not a treatment to self-start for suspected stroke or hemorrhagic stroke.",
    simple:
      "Aspirin makes platelets less able to stick together by reducing a chemical signal called thromboxane.",
    scientific:
      "Irreversible platelet COX-1 acetylation reduces thromboxane A2 synthesis and platelet aggregation for the life of the affected platelet.",
    definition:
      "Platelets are blood-cell fragments involved in clotting. Thromboxane A2 is a signal that promotes their aggregation.",
    safety:
      "Gastrointestinal and intracranial bleeding can occur. Suspected stroke is an emergency: do not self-treat with aspirin before stroke type is determined. Age, bleeding history, allergy, pregnancy, and interactions affect suitability. Aspirin is generally avoided in children with viral illness.",
    questions: [
      "What role would this medicine have in my overall care plan?",
      "Which side effects, interactions, or warning signs should I know about?",
      "What monitoring and follow-up would be needed?",
    ],
    source: "https://dailymed.nlm.nih.gov/dailymed/search.cfm?query=Aspirin",
    sourceLabel: "DailyMed label search",
    quiz: "Which statement describes Aspirin?",
    choices: [
      "Aspirin makes platelets less able to stick together by reducing a chemical signal called thromboxane.",
      "It treats every cause of this condition.",
      "It is safe for everyone without monitoring.",
      "It replaces an individualized care plan.",
    ],
    correct: 0,
    mechanism: {
      title: "Inside the mechanism: Aspirin",
      before: "Thromboxane supports platelet aggregation.",
      after: "Thromboxane production is reduced.",
      explanation:
        "Aspirin makes platelets less able to stick together by reducing a chemical signal called thromboxane.",
      focus: "Platelets and blood vessels",
      input: "Platelet activation",
      target: "Platelet COX-1",
      output: [
        "Thromboxane supports platelet aggregation.",
        "Thromboxane production is reduced.",
      ],
      action: "inhibits",
    },
  },
  {
    id: "hydroxychloroquine",
    name: "Hydroxychloroquine",
    category: "Immunomodulator",
    target: "Immune system",
    organ: null,
    system: "Immune system education",
    conditions: ["Systemic lupus erythematosus"],
    uses: "Used for systemic lupus erythematosus and selected other indications. It is not a treatment for every cause of fatigue or joint pain.",
    simple:
      "Hydroxychloroquine changes immune-cell signaling involved in inflammation.",
    scientific:
      "Effects include altered lysosomal function and endosomal toll-like receptor signaling; its full anti-inflammatory mechanism is not established.",
    definition:
      "Endosomes and lysosomes are compartments inside cells. They participate in processing material and coordinating immune signals.",
    safety:
      "Retinal toxicity, heart rhythm changes, cardiomyopathy, and low blood glucose can occur. Eye examinations, interactions, and other monitoring are important. It is not a self-directed treatment for viral infections.",
    questions: [
      "What role would this medicine have in my overall care plan?",
      "Which side effects, interactions, or warning signs should I know about?",
      "What monitoring and follow-up would be needed?",
    ],
    source:
      "https://dailymed.nlm.nih.gov/dailymed/search.cfm?query=Hydroxychloroquine",
    sourceLabel: "DailyMed label search",
    quiz: "Which statement describes Hydroxychloroquine?",
    choices: [
      "It is safe for everyone without monitoring.",
      "It replaces an individualized care plan.",
      "Hydroxychloroquine changes immune-cell signaling involved in inflammation.",
      "It treats every cause of this condition.",
    ],
    correct: 2,
    mechanism: {
      title: "Inside the mechanism: Hydroxychloroquine",
      before: "Immune pathways sustain inflammation.",
      after: "Immune-cell activation pathways are modified.",
      explanation:
        "Hydroxychloroquine changes immune-cell signaling involved in inflammation.",
      focus: "Immune system",
      input: "Immune-cell activation",
      target: "Endosomal and lysosomal signaling",
      output: [
        "Immune pathways sustain inflammation.",
        "Immune-cell activation pathways are modified.",
      ],
      action: "modifies",
    },
  },
  {
    id: "isoniazid",
    name: "Isoniazid",
    category: "Antituberculosis antibiotic",
    target: "Tuberculosis bacteria",
    organ: null,
    system: "Tuberculosis bacteria education",
    conditions: ["Tuberculosis"],
    uses: "One component of combination treatment for susceptible active tuberculosis; also used in selected latent-TB regimens. Active TB must not be treated with this medicine alone.",
    simple:
      "Isoniazid interferes with the protective mycolic-acid layer of susceptible tuberculosis bacteria.",
    scientific:
      "Following activation by mycobacterial KatG, isoniazid inhibits mycolic acid synthesis through targets including InhA.",
    definition:
      "Mycolic acids are fatty components of the mycobacterial cell envelope. They help protect tuberculosis bacteria.",
    safety:
      "Severe liver injury and peripheral neuropathy can occur. Drug interactions, alcohol use, infection susceptibility, and public-health follow-up require supervision. A clinician may prescribe vitamin supplementation when indicated.",
    questions: [
      "What role would this medicine have in my overall care plan?",
      "Which side effects, interactions, or warning signs should I know about?",
      "What monitoring and follow-up would be needed?",
    ],
    source: "https://dailymed.nlm.nih.gov/dailymed/search.cfm?query=Isoniazid",
    sourceLabel: "DailyMed label search",
    quiz: "Which statement describes Isoniazid?",
    choices: [
      "Isoniazid interferes with the protective mycolic-acid layer of susceptible tuberculosis bacteria.",
      "It treats every cause of this condition.",
      "It is safe for everyone without monitoring.",
      "It replaces an individualized care plan.",
    ],
    correct: 0,
    mechanism: {
      title: "Inside the mechanism: Isoniazid",
      before: "Tuberculosis bacteria build a mycolic-acid layer.",
      after: "Mycolic acid synthesis is inhibited.",
      explanation:
        "Isoniazid interferes with the protective mycolic-acid layer of susceptible tuberculosis bacteria.",
      focus: "Tuberculosis bacteria",
      input: "Mycobacterial wall production",
      target: "Mycolic acid synthesis",
      output: [
        "Tuberculosis bacteria build a mycolic-acid layer.",
        "Mycolic acid synthesis is inhibited.",
      ],
      action: "inhibits",
    },
  },
  {
    id: "mirabegron",
    name: "Mirabegron",
    category: "Beta-3 agonist",
    target: "Bladder",
    organ: null,
    system: "Bladder education",
    conditions: ["Urinary incontinence"],
    uses: "Used for overactive bladder with urgency and urge incontinence in suitable patients. It does not treat all forms of urinary incontinence.",
    simple:
      "Mirabegron relaxes bladder muscle during the storage phase so it can hold urine more comfortably.",
    scientific:
      "Beta-3 adrenergic receptor agonism relaxes detrusor smooth muscle during bladder filling.",
    definition:
      "Beta-3 adrenergic receptors are involved in relaxation of the detrusor, the muscle in the bladder wall.",
    safety:
      "Blood pressure increases, urinary retention, and interactions can occur. It is not recommended in severe uncontrolled hypertension. Bladder outlet obstruction, kidney or liver function, and other medicines require review.",
    questions: [
      "What role would this medicine have in my overall care plan?",
      "Which side effects, interactions, or warning signs should I know about?",
      "What monitoring and follow-up would be needed?",
    ],
    source: "https://dailymed.nlm.nih.gov/dailymed/search.cfm?query=Mirabegron",
    sourceLabel: "DailyMed label search",
    quiz: "Which statement describes Mirabegron?",
    choices: [
      "Mirabegron relaxes bladder muscle during the storage phase so it can hold urine more comfortably.",
      "It treats every cause of this condition.",
      "It is safe for everyone without monitoring.",
      "It replaces an individualized care plan.",
    ],
    correct: 0,
    mechanism: {
      title: "Inside the mechanism: Mirabegron",
      before: "Bladder storage muscle activity may be overactive.",
      after: "Bladder storage muscle relaxation is promoted.",
      explanation:
        "Mirabegron relaxes bladder muscle during the storage phase so it can hold urine more comfortably.",
      focus: "Bladder",
      input: "Bladder storage signaling",
      target: "Beta-3 receptor",
      output: [
        "Bladder storage muscle activity may be overactive.",
        "Bladder storage muscle relaxation is promoted.",
      ],
      action: "activates",
    },
  },
  {
    id: "clotrimazole-vaginal",
    name: "Clotrimazole vaginal",
    category: "Antifungal",
    target: "Vaginal tissue",
    organ: null,
    system: "Vaginal tissue education",
    conditions: ["Vaginal yeast infection"],
    uses: "Used for selected vaginal yeast infections. Symptoms can resemble other infections, so first-time, recurrent, or atypical symptoms need assessment.",
    simple:
      "Clotrimazole interferes with production of a component fungi need for their cell membranes.",
    scientific:
      "Clotrimazole inhibits fungal lanosterol 14-alpha-demethylase, reducing ergosterol synthesis and impairing membrane function.",
    definition:
      "Ergosterol is a structural component of fungal cell membranes. Human cell membranes use cholesterol instead.",
    safety:
      "Local burning or irritation can occur. Some formulations affect latex barrier contraception. Pregnancy, recurrent symptoms, fever, or pelvic pain require professional guidance. It does not treat bacterial vaginosis or sexually transmitted infections.",
    questions: [
      "What role would this medicine have in my overall care plan?",
      "Which side effects, interactions, or warning signs should I know about?",
      "What monitoring and follow-up would be needed?",
    ],
    source:
      "https://dailymed.nlm.nih.gov/dailymed/search.cfm?query=Clotrimazole%20vaginal",
    sourceLabel: "DailyMed label search",
    quiz: "Which statement describes Clotrimazole vaginal?",
    choices: [
      "It is safe for everyone without monitoring.",
      "It replaces an individualized care plan.",
      "Clotrimazole interferes with production of a component fungi need for their cell membranes.",
      "It treats every cause of this condition.",
    ],
    correct: 2,
    mechanism: {
      title: "Inside the mechanism: Clotrimazole vaginal",
      before: "Fungi produce ergosterol for membranes.",
      after: "Fungal membrane synthesis is disrupted.",
      explanation:
        "Clotrimazole interferes with production of a component fungi need for their cell membranes.",
      focus: "Vaginal tissue",
      input: "Fungal membrane production",
      target: "Ergosterol synthesis",
      output: [
        "Fungi produce ergosterol for membranes.",
        "Fungal membrane synthesis is disrupted.",
      ],
      action: "inhibits",
    },
  },
  {
    id: "cyanocobalamin",
    name: "Cyanocobalamin (vitamin B12)",
    category: "Vitamin replacement",
    target: "Blood and nervous system",
    organ: null,
    system: "Blood and nervous system education",
    conditions: ["Vitamin B12 deficiency"],
    uses: "Used for vitamin B12 deficiency. Route and formulation depend on the cause, absorption, and neurologic involvement.",
    simple:
      "Vitamin B12 supplies a nutrient needed for blood-cell production and normal nerve function.",
    scientific:
      "B12 acts as a cofactor in methionine synthase and methylmalonyl-CoA mutase pathways, supporting DNA synthesis and neurologic function.",
    definition:
      "A cofactor is a substance an enzyme needs to function. Vitamin B12 is a cofactor in pathways important for blood cells and nerves.",
    safety:
      "Deficiency can cause lasting nerve injury and needs cause assessment. Oral absorption and injectable-product risks differ. Treating presumed deficiency without evaluating anemia can miss other disease. Severe symptoms require prompt care.",
    questions: [
      "What role would this medicine have in my overall care plan?",
      "Which side effects, interactions, or warning signs should I know about?",
      "What monitoring and follow-up would be needed?",
    ],
    source:
      "https://dailymed.nlm.nih.gov/dailymed/search.cfm?query=Cyanocobalamin%20%28vitamin%20B12%29",
    sourceLabel: "DailyMed label search",
    quiz: "Which statement describes Cyanocobalamin (vitamin B12)?",
    choices: [
      "It is safe for everyone without monitoring.",
      "It replaces an individualized care plan.",
      "Vitamin B12 supplies a nutrient needed for blood-cell production and normal nerve function.",
      "It treats every cause of this condition.",
    ],
    correct: 2,
    mechanism: {
      title: "Inside the mechanism: Cyanocobalamin (vitamin B12)",
      before: "B12-dependent processes lack a needed cofactor.",
      after: "Vitamin B12 is supplied.",
      explanation:
        "Vitamin B12 supplies a nutrient needed for blood-cell production and normal nerve function.",
      focus: "Blood and nervous system",
      input: "Vitamin B12 availability",
      target: "B12-dependent enzyme pathways",
      output: [
        "B12-dependent processes lack a needed cofactor.",
        "Vitamin B12 is supplied.",
      ],
      action: "supports",
    },
  },
  {
    id: "azithromycin",
    name: "Azithromycin",
    category: "Macrolide antibiotic",
    target: "Infection site",
    organ: null,
    system: "Infection site education",
    conditions: ["Pneumonia", "Whooping cough (pertussis)"],
    uses: "Used for selected susceptible bacterial infections, including pertussis and some pneumonia regimens. Not all pneumonia is bacterial or suitable for this medicine alone.",
    simple: "Azithromycin interferes with bacterial protein production.",
    scientific:
      "Azithromycin binds bacterial 50S ribosomal subunits, inhibiting translocation during protein synthesis.",
    definition:
      "The 50S subunit is one part of a bacterial ribosome, the cell machinery that makes proteins.",
    safety:
      "QT prolongation, liver injury, serious allergy, and antibiotic-associated diarrhea can occur. Heart rhythm history, interactions, local resistance, and infection severity affect selection. Pertussis exposure may need public-health guidance.",
    questions: [
      "What role would this medicine have in my overall care plan?",
      "Which side effects, interactions, or warning signs should I know about?",
      "What monitoring and follow-up would be needed?",
    ],
    source:
      "https://dailymed.nlm.nih.gov/dailymed/search.cfm?query=Azithromycin",
    sourceLabel: "DailyMed label search",
    quiz: "Which statement describes Azithromycin?",
    choices: [
      "It treats every cause of this condition.",
      "It is safe for everyone without monitoring.",
      "It replaces an individualized care plan.",
      "Azithromycin interferes with bacterial protein production.",
    ],
    correct: 3,
    mechanism: {
      title: "Inside the mechanism: Azithromycin",
      before: "Bacteria assemble proteins.",
      after: "Bacterial protein production is inhibited.",
      explanation: "Azithromycin interferes with bacterial protein production.",
      focus: "Infection site",
      input: "Bacterial protein production",
      target: "50S ribosomal function",
      output: [
        "Bacteria assemble proteins.",
        "Bacterial protein production is inhibited.",
      ],
      action: "inhibits",
    },
  },
  {
    id: "nystatin",
    name: "Nystatin oral suspension",
    category: "Antifungal",
    target: "Mouth",
    organ: null,
    system: "Mouth education",
    conditions: ["Yeast infection of the mouth (oral thrush)"],
    uses: "Used for susceptible Candida infections in the mouth. Oral suspension is not a treatment for systemic fungal infection.",
    simple:
      "Nystatin binds fungal membrane components and makes the membrane leak.",
    scientific:
      "Nystatin binds ergosterol in susceptible fungal cell membranes, altering permeability and causing leakage of intracellular contents.",
    definition:
      "A cell membrane forms a boundary that controls what enters and leaves a cell. Ergosterol helps maintain many fungal membranes.",
    safety:
      "Local irritation, gastrointestinal symptoms, and allergy can occur. Persistent thrush may indicate another issue or need different treatment. Product route matters; skin products must not be substituted for oral products.",
    questions: [
      "What role would this medicine have in my overall care plan?",
      "Which side effects, interactions, or warning signs should I know about?",
      "What monitoring and follow-up would be needed?",
    ],
    source:
      "https://dailymed.nlm.nih.gov/dailymed/search.cfm?query=Nystatin%20oral%20suspension",
    sourceLabel: "DailyMed label search",
    quiz: "Which statement describes Nystatin oral suspension?",
    choices: [
      "Nystatin binds fungal membrane components and makes the membrane leak.",
      "It treats every cause of this condition.",
      "It is safe for everyone without monitoring.",
      "It replaces an individualized care plan.",
    ],
    correct: 0,
    mechanism: {
      title: "Inside the mechanism: Nystatin oral suspension",
      before: "An intact membrane supports fungal cells.",
      after: "Fungal membranes become permeable.",
      explanation:
        "Nystatin binds fungal membrane components and makes the membrane leak.",
      focus: "Mouth",
      input: "Candida membrane integrity",
      target: "Fungal membrane",
      output: [
        "An intact membrane supports fungal cells.",
        "Fungal membranes become permeable.",
      ],
      action: "modifies",
    },
  },
  {
    id: "gabapentin",
    name: "Gabapentin",
    category: "Nerve-pain and antiseizure medicine",
    target: "Brain and spinal pathways",
    organ: "Brain",
    system: "Brain and spinal pathways education",
    conditions: ["Zoster neuralgia (postherpetic neuralgia)"],
    uses: "Used for postherpetic neuralgia and selected seizure indications. Other nerve-pain uses may be off-label and depend on the situation.",
    simple:
      "Gabapentin binds a calcium-channel-associated protein and changes nerve signaling related to some pain states.",
    scientific:
      "Gabapentin binds the alpha-2-delta subunit of voltage-gated calcium channels. It does not act directly as a GABA receptor agonist.",
    definition:
      "Alpha-2-delta is an accessory protein associated with certain calcium channels. GABA is a different nerve messenger; gabapentin does not directly activate its receptors.",
    safety:
      "Dizziness, sleepiness, and serious breathing problems can occur, especially with opioids or other sedatives. Kidney function and mood changes require review. Do not abruptly stop without guidance.",
    questions: [
      "What role would this medicine have in my overall care plan?",
      "Which side effects, interactions, or warning signs should I know about?",
      "What monitoring and follow-up would be needed?",
    ],
    source: "https://dailymed.nlm.nih.gov/dailymed/search.cfm?query=Gabapentin",
    sourceLabel: "DailyMed label search",
    quiz: "Which statement describes Gabapentin?",
    choices: [
      "It treats every cause of this condition.",
      "It is safe for everyone without monitoring.",
      "It replaces an individualized care plan.",
      "Gabapentin binds a calcium-channel-associated protein and changes nerve signaling related to some pain states.",
    ],
    correct: 3,
    mechanism: {
      title: "Inside the mechanism: Gabapentin",
      before: "Nerve signaling contributes to neuropathic pain.",
      after: "Channel-associated signaling is modified.",
      explanation:
        "Gabapentin binds a calcium-channel-associated protein and changes nerve signaling related to some pain states.",
      focus: "Brain and spinal pathways",
      input: "Nerve-cell excitability",
      target: "Alpha-2-delta channel subunit",
      output: [
        "Nerve signaling contributes to neuropathic pain.",
        "Channel-associated signaling is modified.",
      ],
      action: "modifies",
    },
  },
  {
    id: "onabotulinumtoxina",
    name: "OnabotulinumtoxinA",
    category: "Botulinum toxin",
    target: "Peripheral nerve endings",
    organ: null,
    system: "Peripheral nerve endings education",
    conditions: ["Chronic migraine"],
    uses: "Used by trained clinicians for chronic migraine prevention and other product-specific indications. It is not a treatment for an acute migraine attack.",
    simple:
      "This medicine reduces chemical release from nerve endings. Migraine-prevention effects involve sensory signaling, not just muscle relaxation.",
    scientific:
      "OnabotulinumtoxinA cleaves SNAP-25, inhibiting vesicular neurotransmitter release; migraine effects involve modulation of peripheral nociceptive signaling.",
    definition:
      "SNAP-25 is part of the machinery that lets nerve-terminal vesicles release signaling chemicals.",
    safety:
      "Toxin effects can spread and cause serious swallowing, speaking, or breathing problems. Products are not interchangeable. Injection sites, contraindications, and follow-up require a trained clinician.",
    questions: [
      "What role would this medicine have in my overall care plan?",
      "Which side effects, interactions, or warning signs should I know about?",
      "What monitoring and follow-up would be needed?",
    ],
    source:
      "https://dailymed.nlm.nih.gov/dailymed/search.cfm?query=OnabotulinumtoxinA",
    sourceLabel: "DailyMed label search",
    quiz: "Which statement describes OnabotulinumtoxinA?",
    choices: [
      "It is safe for everyone without monitoring.",
      "It replaces an individualized care plan.",
      "This medicine reduces chemical release from nerve endings. Migraine-prevention effects involve sensory signaling, not just muscle relaxation.",
      "It treats every cause of this condition.",
    ],
    correct: 2,
    mechanism: {
      title: "Inside the mechanism: OnabotulinumtoxinA",
      before: "Nerve endings release signaling chemicals.",
      after: "Vesicular chemical release is reduced.",
      explanation:
        "This medicine reduces chemical release from nerve endings. Migraine-prevention effects involve sensory signaling, not just muscle relaxation.",
      focus: "Peripheral nerve endings",
      input: "Nerve-terminal release",
      target: "SNAP-25-dependent vesicle release",
      output: [
        "Nerve endings release signaling chemicals.",
        "Vesicular chemical release is reduced.",
      ],
      action: "inhibits",
    },
  },
  {
    id: "terbinafine",
    name: "Terbinafine oral",
    category: "Antifungal",
    target: "Nails",
    organ: null,
    system: "Nails education",
    conditions: ["Fungal nail infection"],
    uses: "Used for selected fungal nail infections after diagnosis. Oral and topical products have different indications and risks.",
    simple:
      "Terbinafine blocks an enzyme fungi use to build their cell membranes.",
    scientific:
      "Terbinafine inhibits squalene epoxidase, reducing ergosterol synthesis and causing squalene accumulation in susceptible fungi.",
    definition:
      "Squalene epoxidase is an enzyme in the pathway that produces ergosterol for fungal membranes.",
    safety:
      "Serious liver injury, taste or smell changes, skin reactions, and interactions can occur. Liver disease assessment and monitoring are important. Nail changes can have nonfungal causes and need confirmation.",
    questions: [
      "What role would this medicine have in my overall care plan?",
      "Which side effects, interactions, or warning signs should I know about?",
      "What monitoring and follow-up would be needed?",
    ],
    source:
      "https://dailymed.nlm.nih.gov/dailymed/search.cfm?query=Terbinafine%20oral",
    sourceLabel: "DailyMed label search",
    quiz: "Which statement describes Terbinafine oral?",
    choices: [
      "It replaces an individualized care plan.",
      "Terbinafine blocks an enzyme fungi use to build their cell membranes.",
      "It treats every cause of this condition.",
      "It is safe for everyone without monitoring.",
    ],
    correct: 1,
    mechanism: {
      title: "Inside the mechanism: Terbinafine oral",
      before: "Fungi synthesize membrane components.",
      after: "Fungal ergosterol production is inhibited.",
      explanation:
        "Terbinafine blocks an enzyme fungi use to build their cell membranes.",
      focus: "Nails",
      input: "Fungal membrane production",
      target: "Squalene epoxidase",
      output: [
        "Fungi synthesize membrane components.",
        "Fungal ergosterol production is inhibited.",
      ],
      action: "inhibits",
    },
  },
  {
    id: "hydrocortisone-rectal",
    name: "Hydrocortisone rectal",
    category: "Local corticosteroid",
    target: "Anorectal tissue",
    organ: null,
    system: "Skin and local inflammation education",
    conditions: ["Hemorrhoids"],
    uses: "Selected rectal products provide temporary relief of hemorrhoid-related inflammation or other product-specific anorectal symptoms. They do not correct the underlying veins or every cause of bleeding.",
    simple:
      "Hydrocortisone reduces local inflammatory signals, which can reduce itching and swelling.",
    scientific:
      "Hydrocortisone activates intracellular glucocorticoid receptors and modulates transcription of inflammation-related genes.",
    definition:
      "Glucocorticoid receptors change transcription of inflammation-related genes. Local steroid products have route-specific effects and risks.",
    safety:
      "Use only a product intended for its prescribed route. Prolonged use can cause local tissue effects, mask infection, or lead to systemic steroid exposure. Persistent or significant rectal bleeding, severe pain, or new bowel symptoms needs medical evaluation.",
    questions: [
      "What role would this medicine have in my overall care plan?",
      "Which side effects, interactions, or warning signs should I know about?",
      "What monitoring and follow-up would be needed?",
    ],
    source:
      "https://dailymed.nlm.nih.gov/dailymed/search.cfm?query=hydrocortisone%20rectal",
    sourceLabel: "DailyMed label search",
    quiz: "What is the role of hydrocortisone rectal products?",
    choices: [
      "Cure of every cause of rectal bleeding",
      "Treatment of every infection",
      "Temporary local inflammation relief",
      "Removal of all hemorrhoidal veins",
    ],
    correct: 2,
    mechanism: {
      title: "Reducing local inflammation",
      before: "Local inflammatory signals are active.",
      after: "Local inflammatory signaling is modified.",
      explanation:
        "Hydrocortisone reduces local inflammatory signals, which can reduce itching and swelling.",
      focus: "Anorectal tissue",
      input: "Inflammatory signals",
      target: "Glucocorticoid-responsive pathways",
      output: ["Local inflammation", "Modified inflammatory signaling"],
      action: "modifies",
    },
  },
];
