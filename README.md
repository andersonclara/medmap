# MedMap

**See how your medicine works.** An interactive medication education prototype built with React, TypeScript, Vite, Tailwind CSS, Lucide icons, and original SVG illustrations. No backend, API keys, paid services, or personal health data.

## Run locally

Use Node.js 22.12+ (Node 24 tested).

```sh
npm ci
npm run dev
```

Open the URL Vite prints. Use **Explore Medications** to open the searchable library. All application content and illustrations run locally after dependencies are installed; source reference links require internet access.

```sh
npm run typecheck
npm run build
npm run preview
```

If your environment restricts the default npm cache, add `--cache /tmp/medmap-npm` to `npm ci`.

## Browser tests

```sh
npx playwright install chromium
npm test
```

For an installed system Chromium, skip the download and run:

```sh
PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium npm test
```

The browser suite exercises the demo on desktop and mobile: search, selection, organ information, all seven mechanism illustrations, explanation levels, quiz feedback, empty search, keyboard anatomy, navigation, and horizontal overflow.

## Three-minute demo

1. Show the landing page and click **Explore Medications**.
2. Search for albuterol, then click or keyboard-focus and activate the lungs.
3. Click **Show bronchodilation**, then switch the explanation to **Scientific**.
4. Answer the optional knowledge check.
5. Clear the search and select metformin; demonstrate its liver mechanism.
6. Select omeprazole to show the stomach mechanism and provider questions.

## Structure

- `src/data/medications.ts`: typed medication content, source references, organ facts, and quiz questions. Add new medication entries here with condition names and a typed mechanism key.
- `src/data/mechanisms.ts`: typed mechanism descriptions and before/after pathway labels. Add a matching guide when introducing a mechanism key.
- `src/components/AnatomyViewer.tsx`: original, simplified front-facing SVG schematic, keyboard-operable organs, and selected organ information.
- `src/components/MechanismAnimation.tsx`: interactive local mechanism illustrations.
- `src/components/KnowledgeQuiz.tsx`: session score and immediate feedback.
- `src/App.tsx`: landing page, explorer, education cards, and hash navigation.
- `src/index.css`: responsive design and reduced-motion support.

## Scope and medical content

Supports seven medications with general uses, simple/scientific explanations, safety summaries, three provider questions each, and MedlinePlus references. Search by medication, organ, or condition (for example, hypertension, diabetes, or depression).

| Medication          | Example conditions                                          | Anatomy focus |
| ------------------- | ----------------------------------------------------------- | ------------- |
| Albuterol           | Asthma, exercise-induced bronchospasm                       | Lungs         |
| Metformin           | Type 2 diabetes                                             | Liver         |
| Omeprazole          | Acid reflux (GERD), ulcers                                  | Stomach       |
| Atorvastatin        | High cholesterol, cardiovascular risk reduction             | Liver         |
| Metoprolol          | Hypertension, angina, certain heart failure formulations    | Heart         |
| Hydrochlorothiazide | Hypertension, edema                                         | Kidneys       |
| Sertraline          | Depression, OCD, panic disorder, PTSD, social anxiety, PMDD | Brain         |

These are educational examples, not a treatment-selection guide. Approved uses can depend on formulation, age, and individual circumstances. The illustrations show simplified mechanisms, not anatomical precision or individual treatment results. No doses or personalized treatment recommendations are provided. Source links should be reviewed alongside the content before use beyond a hackathon; clinical review has not been performed. This resource does not replace professional medical advice.

Quiz scores last while the app is open; refreshing starts a new session. Authentication, databases, prescribing, and clinical decision support are intentionally outside this MVP.
