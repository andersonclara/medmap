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

The anatomy suites exercise real 3D meshes, organ search, camera controls, layer visibility, reference variants, and retry behavior. The exhaustive content traversals also verify the no-WebGL fallback without repeatedly decoding every model for every guide.

The browser suite validates all 100 condition mappings, opens every one of the 95 medication links, and exercises every medication’s explanation toggle, mechanism/reset controls, and correct quiz feedback on desktop and mobile. It also tests explicit nonmedication exceptions, condition context, reload/back navigation, source destinations, and horizontal overflow. The original demo checks cover: search, selection, organ information, all medication mechanism illustrations, explanation levels, quiz feedback, empty search, keyboard anatomy, navigation, and horizontal overflow.

## Brand assets

MedMap’s clinical education logo combines an open medical atlas with a capsule, in navy, teal, and muted mint. The header and footer share `src/components/BrandLogo.tsx`; the icon also serves as the favicon.

- `public/branding/medmap-mark.svg`: scalable, transparent icon.
- `public/branding/medmap-logo.svg`: transparent full logo and tagline.
- `public/branding/medmap-preview.png`: white-background preview for slides or sharing.

## Similar medicines and comparison

Medication guides show up to three related guides, with a reason for each connection. Explicit groups in `src/data/medicationRelationships.ts` distinguish shared drug families, related mechanisms, some shared uses, and broader treatment areas. A shared organ or a matching keyword alone never creates a suggestion. Guides with no recorded relationship show a clear empty state and still offer manual comparison.

Click **Compare** on a suggestion, or **Compare medicines** beside a guide heading to choose any second medicine. The comparison shows categories, target areas, uses, simple/scientific mechanisms, safety summaries, provider questions, and original source links. Change either selection, swap the pair, and share/reload URLs such as `#compare/albuterol/tiotropium`. Mobile layouts stack labeled cards. Invalid or duplicate selections show a correction prompt.

Related guides are educational connections, not a ranking, dosing guide, interaction checker, or recommendation to replace, combine, or switch treatment. Condition, formulation, route, and role differences are displayed explicitly (for example, albuterol is a reliever and tiotropium is maintenance treatment). Comparison content retains the library’s existing clinical-review limitations.

## Three-minute demo

1. Show the landing page and click **Explore Medications**.
2. Search for albuterol, then click or keyboard-focus and activate the lungs.
3. Click **Show bronchodilation**, then switch the explanation to **Scientific**.
4. Answer the optional knowledge check.
5. Clear the search and select metformin; demonstrate its liver mechanism.
6. Select omeprazole to show the stomach mechanism and provider questions.

## Structure

- `src/types/medication.ts`: shared medication and mechanism contracts. A null organ means the target is not represented by the six-organ SVG.
- `src/data/medications.ts`: original medication guides, combined library, organ facts, and type re-exports.
- `src/data/extendedMedications.ts`: additional medication guides with individual scientific content, safety information, glossary definitions, and pathway illustrations.
- `src/data/conditionTreatments.ts`: explicit mappings and context for all 100 conditions; an empty medication list is a deliberate exception. Add or update the mapping whenever the directory changes.
- `src/data/conditions.ts`: 100 alphabetized condition summaries with general medication examples and MedlinePlus topic-search links. This is not a prevalence ranking or a prescribing guide.
- `src/data/mechanisms.ts`: typed mechanism descriptions and before/after pathway labels. Add a matching guide when introducing a mechanism key.
- `src/components/AnatomyViewer.tsx`: original, simplified front-facing SVG schematic, keyboard-operable organs, and selected organ information.
- `src/components/MechanismAnimation.tsx`: interactive local mechanism illustrations; supports both shared mechanisms and individual typed pathway guides.
- `src/components/SimilarMedications.tsx`: related-guide cards and comparison entry points.
- `src/components/MedicationComparison.tsx`: accessible, responsive comparison with native selectors and shareable hash routes.
- `src/data/medicationRelationships.ts`: explicit educational relationships and deterministic suggestion ordering; validate member IDs when editing groups.
- `src/components/TargetRegion.tsx`: clearly labeled context for targets not depicted in the human SVG.
- `src/components/KnowledgeQuiz.tsx`: session score and immediate feedback.
- `src/App.tsx`: landing page, explorer, education cards, and hash navigation.
- `src/index.css`: responsive design and reduced-motion support.

## Scope and medical content

Open **Condition directory**, search by condition or medication name, then click a medication chip to open its guide. Links such as `#explore/carbidopa-levodopa?condition=Parkinson%20disease` work on reload and with browser back/forward navigation. The full medication explorer supports search and a scrollable library; the landing page shows a small selection.

The interactive 3D atlas provides organ search, body references, layers, and rotation. It highlights represented medication targets. See [3D atlas](docs/3D-ATLAS.md) and [reference imports](docs/PAIRED-ATLAS-IMPORT.md) for source and processing details. Medicines acting on skin, eyes, bones, blood, or other unrepresented targets use a labeled target panel; no unrelated organ is highlighted. Pathway controls distinguish inhibition, activation, support, and other modification.

Supports 69 medication guides with general uses, simple/scientific explanations, safety summaries, three provider questions each, and authoritative reference links. The original seven guides retain their MedlinePlus links; expanded guides use explicitly labeled DailyMed label searches rather than invented direct label URLs. These links are discovery references; current labels and the content still need clinical review. Search by medication, organ, or condition (for example, hypertension, diabetes, or depression).

| Original guide      | Example conditions                                          | Anatomy focus |
| ------------------- | ----------------------------------------------------------- | ------------- |
| Albuterol           | Asthma, exercise-induced bronchospasm                       | Lungs         |
| Metformin           | Type 2 diabetes                                             | Liver         |
| Omeprazole          | Acid reflux (GERD), ulcers                                  | Stomach       |
| Atorvastatin        | High cholesterol, cardiovascular risk reduction             | Liver         |
| Metoprolol          | Hypertension, angina, certain heart failure formulations    | Heart         |
| Hydrochlorothiazide | Hypertension, edema                                         | Kidneys       |
| Sertraline          | Depression, OCD, panic disorder, PTSD, social anxiety, PMDD | Brain         |

The condition directory now links 95 of its 100 conditions directly into medication guides. Reusing a medicine across conditions avoids duplicate guides. Each link includes a role and condition-specific caveat, preserved on the detail page. Examples include symptom relief, a selected off-label use, a subtype-specific treatment, or one component of a larger regimen—not an automatic treatment recommendation.

Five conditions have explicit explanations instead of a forced medication assignment: cataracts, celiac disease, hearing loss, obstructive sleep apnea, and varicose veins. These explanations acknowledge selected cause-specific or eligibility-dependent treatments where relevant.

The directory is alphabetized, not ranked by prevalence, and has not had clinical review. Source-page access remains restricted in this cloud environment; external reference availability and current labeling have not been verified here.

These are educational examples, not a treatment-selection guide. Approved uses can depend on formulation, age, and individual circumstances. The illustrations show simplified mechanisms, not anatomical precision or individual treatment results. No doses or personalized treatment recommendations are provided. Source links should be reviewed alongside the content before use beyond a hackathon; clinical review has not been performed. This resource does not replace professional medical advice.

Quiz scores last while the app is open; refreshing starts a new session. Authentication, databases, prescribing, and clinical decision support are intentionally outside this MVP.
