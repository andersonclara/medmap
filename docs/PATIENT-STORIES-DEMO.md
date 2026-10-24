# Patient Stories demo

Run `npm install` if dependencies are absent, then `npm run dev`.
Open **http://localhost:5173/#demo** for a fresh, deterministic lesson. The app
uses bundled data and local anatomy assets; no account, backend, or medical API
is needed. Initial local model loading still depends on the device and browser.

## Three-minute walkthrough

1. **0:00–0:30:** Meet Maya, a fictional patient. Explain the learning objective
   and complete the two baseline questions. These record actual answers.
2. **0:30–1:00:** Explore the highlighted lungs. Rotate, zoom, switch body
   references, or expand the anatomy controls. Choose **Zoom into the airway**.
3. **1:00–1:45:** Drag the before/after slider. Open a numbered hotspot; switch
   to Scientific and follow beta-2 receptor → cAMP → smooth muscle. The slider
   controls a schematic, not dose, time, airflow, or an individual outcome.
4. **1:45–2:30:** Complete the two post-lesson questions. A wrong response has
   feedback and a retry. The summary separates baseline performance, post-lesson
   first attempts, and correct answers after practice. It does not claim proven
   educational effectiveness.
5. **2:30–3:00:** Follow **Compare medication roles** to the albuterol/tiotropium
   comparison. Move the synchronized illustration slider and explore the distinct
   receptors. Matching slider positions do not establish equal medicine effects.

Normal lesson: `/#stories/asthma`. Its optional checkbox saves completed-step
checkpoints in this tab's session storage. Fresh `/#demo` ignores those saved
checkpoints. Replay resets the active lesson.

## Implementation and changed files

- `src/App.tsx`: lazy-loaded story routes and landing/navigation demo entry.
- `src/components/PatientStory.tsx`: five-step orchestration, optional validated
  checkpoints, progress, deterministic demo, and summary.
- `src/data/asthmaLesson.ts`: authored questions, explanations, and references.
- `src/components/AirwayMechanism.tsx`: shared SVG cross-section, controlled
  slider, keyboard-accessible hotspots, and explanation modes.
- `src/components/AnatomyViewer.tsx` and `AnatomyScene.tsx`: automatic target
  focus, existing smooth camera movement, and medicine highlighting. Automatic
  camera focus is separate from explicit blue-outline user selection.
- `src/components/SimulationMode.tsx`: same-page explorer mechanism integration
  and persistent viewer instead of canvas remounts on playback stage changes.
- `src/components/MechanismAnimation.tsx`: reuses the shared airway artwork.
- `src/components/KnowledgeQuiz.tsx`: guide retries and reusable pre/post checks.
- `src/components/MedicationComparison.tsx`: target artwork and synchronized
  airway comparison for albuterol/tiotropium, retaining shareable URLs.
- `src/learning.css`: responsive story, assessment, hotspot, and comparison UI,
  with reduced-motion and visible keyboard-focus styles.
- `tests/patient-story.spec.ts` and `tests/learning-comparison.spec.ts`: desktop
  and mobile coverage for the new flows and existing-guide integration.

The story keeps one anatomy viewer mounted when moving between body and
mechanism; the browser tests verify canvas identity and no additional GLB
requests during that transition. Existing ailment-first filtering, condition
directory, guide quizzes, atlas interactions, fallback, and comparisons remain.

## Accuracy and scope

The lesson is **source-informed and not independently clinically reviewed**.
It is fictional education, not prescribing or personalized treatment guidance.
The smooth-muscle illustration deliberately omits other contributors such as
inflammation and mucus. Model attribution, licensing, and existing incomplete
anatomy notices remain visible. No missing meshes were fabricated.

References checked October 24, 2026:

- [MedlinePlus: albuterol inhalation](https://medlineplus.gov/druginfo/meds/a682145.html)
- [NHLBI: asthma treatment and action plans](https://www.nhlbi.nih.gov/health/asthma/treatment-action-plan)
- [NCI: albuterol sulfate](https://www.cancer.gov/publications/dictionaries/cancer-drug/def/albuterol-sulfate)
- [DailyMed: albuterol prescribing information](https://dailymed.nlm.nih.gov/dailymed/fda/fdaDrugXsl.cfm?setid=264e2145-c7d4-4f4f-aa5b-9fe48a7c5b47)
- [MedlinePlus: tiotropium inhalation](https://medlineplus.gov/druginfo/meds/a604018.html)

Only one complete story and this supported interactive comparison pair are
implemented. Other mechanisms retain their existing educational views.
Additional stories, expanded analytics, advanced effects, complete replacement
anatomy, and independent clinical review remain outside this MVP.

## Validation

Final validation: typecheck passed, production build passed, and all **72
Playwright tests passed** across desktop and mobile (1.7 minutes). Vite still
reports its bundle-size advisory for the main and Three.js chunks. Desktop and
mobile story/comparison screenshots were visually inspected. `git diff --check`
passed.

Run `npm run typecheck`, `npm run build`, and `npm test -- --workers=4`.
On this Windows machine, Playwright uses installed Chrome with
`PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=C:\Program Files\Google\Chrome\Application\chrome.exe`.
Tests cover real WebGL and forced WebGL fallback, reduced motion, keyboard
interaction, optional progress, retry scoring, target synchronization, shared
mechanisms, navigation, and existing features on desktop and mobile.
