# MedMap hackathon video: from medication name to understanding

**Target length: 8 minutes.** This is a spoken script and a screen-recording plan for the current product. The five-minute and ten-minute edits are below. Read the quoted passages aloud; actions and rehearsal notes are not narration. Leave space for clicking, loading, and the learner interactions rather than reading continuously.

## Before you record

1. Pull the latest code from your checkout and run `npm ci`, then `npm run dev`. If another server is running, use its URL or stop it with Control+C. Open the exact Local URL Vite prints; do not assume a port.
2. Use a desktop browser at roughly 1440 × 900, with readable text and notifications off. Record the browser window and microphone. Keep terminal output and unrelated tabs out of the frame.
3. Warm the anatomy assets by completing a rehearsal through the lungs view and comparison. Check rotation and the slider on the recording machine. Return to the landing page before the take.
4. Prepare tabs for the same local base URL plus `/#demo`, `/#compare/albuterol/tiotropium`, `/#explore/albuterol?condition=Asthma`, `/#conditions`, and `/#rankings`. Use these as recovery links, not as a substitute for showing the normal flow.
5. Enter `/#demo` from the landing page for each new take. If already inside the demo, use **Start this lesson over**. Demo mode ignores saved lesson checkpoints. Keep your own assessment answers honest; do not stage an incorrect answer and describe it as a real learning gain.
6. Rehearse with a stopwatch. Pre/post checks and story interactions must be completed to unlock later steps. At the mechanism, move the slider to at least 80% and open a hotspot or pathway; otherwise **Check understanding** stays disabled.

## Eight-minute script and screen plan

### 0:00–0:40 — The problem and the promise

**Show:** Landing page. Hold the MedMap logo and hero in view, then place the cursor over the main guided-demo button.

**Say:**

> “When someone receives a medication, knowing its name is only the beginning. What does it do inside the body? Why does it help? And how is it different from another medicine that sounds similar?
>
> MedMap makes those questions visible. It connects a condition, the body, and a medicine's mechanism in an interactive learning experience. Our goal is to help patients, caregivers, and students build understanding—and bring better questions to a conversation with a healthcare professional.”

**Action:** Click the main guided-demo call to action. Confirm the address ends in `/#demo`.

### 0:40–1:25 — Introduce Maya and record a starting point

**Show:** “A little more room to breathe,” Maya's fictional patient card, and the five-step progress navigation.

**Say:**

> “Let's follow Maya, a fictional 24-year-old cyclist with asthma. She knows the name of her inhaler, but wants to understand what it does. This lesson connects the lungs, airway muscle, and beta-2 signaling—and explains why opening an airway is not the same as curing asthma.
>
> Before teaching the mechanism, MedMap records a starting point with two questions. These are actual answers from this session.”

**Action:** Click **Start pre-lesson check**. Answer each question, use **Next question**, then **Record starting point**. Pause briefly on the score. Do not narrate a score before seeing it.

**Presenter reference:** Correct options are “The airway opening becomes narrower” and “It relaxes airway smooth muscle.” If you already know both answers, answer correctly and describe this as a demonstration of the assessment flow.

### 1:25–2:15 — Connect the medicine to anatomy

**Action:** Click **Explore Maya's lungs**. Wait for the model to settle. Make one gentle rotation; show **Back to full body**, then **Focus lungs**. Avoid spending the segment adjusting every layer.

**Say:**

> “We start with a whole person, then focus on the lungs. You can rotate the reference body, inspect structures, and explore the surrounding anatomy. The teal highlight connects the medication lesson to its representative target.
>
> These are reference models, not Maya's scan. They use attributed anatomy sources, and the app identifies missing coverage. The smooth muscle we want to understand is too small to explain at this scale, so the next step moves into a separate magnified illustration.”

**Action:** Click **Zoom into the airway**.

### 2:15–3:25 — The visual centerpiece

**Show:** The airway cross-section in Simple mode. Move **Before-and-after airway view** slowly from narrowed to relaxed. Open **Explore smooth muscle**, then switch to **Scientific** and open **Explore beta-2 receptor** or the **Beta-2 receptor** pathway button. Briefly open **cAMP signaling**.

**Say:**

> “Here, I can move between a narrowed opening and a relaxed-muscle illustration. I can explore a structure directly, instead of trying to decode a paragraph in isolation.
>
> In Simple mode, the explanation describes a relaxation signal. In Scientific mode, the same idea becomes more precise: albuterol activates beta-2 receptors, increasing cAMP signaling that contributes to bronchial smooth-muscle relaxation.
>
> The learner can choose the level of detail and investigate each connection. The slider controls an illustration. It is not a dose control, a biological clock, or a prediction of how much a person's breathing will improve.”

**Action:** Leave the slider near the relaxed end and ensure at least one hotspot or pathway has been opened. Point out the “Interaction complete” message, then click **Check understanding**.

### 3:25–4:15 — Apply the idea and show honest feedback

**Show:** Both post-lesson questions. Answer, then click **See learning summary**. Pause on all three result columns.

**Say:**

> “The follow-up asks the learner to apply the mechanism and recognize its limits. If an answer is incorrect, MedMap explains why and offers practice.
>
> The summary keeps the starting point, post-lesson first attempts, and correct answers after practice separate. A retry does not become extra first-attempt credit. These results show what happened in this lesson; they do not prove that the product improves learning outcomes. Evaluating that is a next step.”

**Presenter reference:** Correct post answers are “Beta-2 activation, cAMP signaling, then smooth muscle relaxation” and “Albuterol can relieve bronchospasm; ongoing asthma management still matters.” If you demonstrate a wrong answer, explicitly call it a deliberate demonstration of feedback, click **Retry question**, and then answer correctly. Budget another 15 seconds.

### 4:15–5:15 — Similar medicines, different roles

**Action:** Click **Compare medication roles**. Show albuterol and tiotropium headings and the connection explanation. Scroll to **Follow both pathways.** Move **Synchronized before-and-after illustrations** once; open the receptor pathway on each side. Briefly show the comparison rows below.

**Say:**

> “Understanding one medicine also creates a useful question: how does a related medicine differ? MedMap explains the connection before presenting a comparison.
>
> Albuterol and tiotropium both affect airway muscle, but through different receptors. Albuterol is a short-acting reliever example; tiotropium is maintenance treatment and is not a rescue medicine. The synchronized illustration lets us explore both pathways together. Matching slider positions do not mean equal clinical effects.
>
> Below, we can compare uses, mechanisms, safety context, and questions to ask a provider. This is an educational comparison, not advice to switch or combine treatments.”

### 5:15–6:15 — Show the broader product

**Action:** Open **Medication explorer** in the navigation. Show the initial ailment-first prompt. In **Find an ailment**, search “Asthma,” choose **Asthma** in **Ailment**, then select **Albuterol** from the filtered medicines. Scroll to **Run simulation**. Click it, pause, and select a stage directly. Prefer direct stage buttons for predictable recording pace.

**Say:**

> “The guided story is one entry point. The explorer starts with an ailment, then offers documented medication examples for that condition. It does not infer treatment options just because two medicines act on the same organ.
>
> Selecting a medicine opens its guide and anatomy on the same page. This four-stage walkthrough connects baseline, site of action, mechanism, and wider effects and limits. Playback controls the pace of an explanation; it does not model a patient's response.
>
> The library contains 69 authored medication guides, with simple and scientific explanations, source links, safety context, and provider questions.”

**Action:** Briefly show **Condition directory** and search “Asthma.” If time allows, clear the search to show the directory count. Do not read the full condition card aloud.

### 6:15–7:05 — Breadth with transparent evidence

**Action:** Open **U.S. rankings**. Show the two tabs, one table row with its interval, then expand **Sources, reliability, and ranking method**. Switch to **Reported conditions** briefly.

**Say:**

> “For a wider population view, MedMap also includes a reference catalog derived from 2024 AHRQ MEPS survey data: 315 prescription-name entries and 169 reported-condition groups.
>
> We show the source, the measure, and uncertainty. Prescription purchase events are not unique patients. Care-associated condition reports are not a ranking of all disease prevalence. These entries add context; they are not hundreds of extra authored medication guides, and they do not automatically unlock a simulation.”

### 7:05–8:00 — How it works, next steps, and closing

**Show:** Return to the landing page or hold a clean view of the airway comparison. Optional closing slide: “Understand the body. Follow the mechanism. Ask better questions.” Put the repository URL on the slide: `github.com/andersonclara/medmap`.

**Say:**

> “MedMap is built with React, TypeScript, Three.js, and interactive SVG illustrations. Its content and reference assets are bundled locally, so the demo needs no account, backend, or live medical API. Automated browser tests cover desktop and mobile learning flows, anatomy interactions, comparisons, and navigation.
>
> Today, the prototype has one complete guided asthma story, a broader medication library, and transparent boundaries. It is source-informed and has not had independent clinical review. Next, we want to review the content with clinicians, test usability and learning outcomes, add more stories, and expand validated anatomy coverage.
>
> MedMap helps turn a medicine's name into a mechanism someone can explore, explain, and ask questions about. See how your medicine works.”

Hold the closing screen for three seconds before stopping the recording.

## Five-minute submission edit

Use the same story arc, with these exact time allocations. Remove material rather than speeding up the narration.

| Time | Show and cover |
| --- | --- |
| 0:00–0:25 | Landing page; medication name versus understanding; one-sentence product pitch. |
| 0:25–1:00 | Maya and the two baseline questions. |
| 1:00–1:30 | Focused lungs; one rotation; move into the airway. |
| 1:30–2:25 | Slider, one receptor hotspot, Simple/Scientific toggle. Explain the mechanism and illustration limits. |
| 2:25–3:05 | Two post questions and the honest results summary. Skip the deliberate wrong-answer demonstration. |
| 3:05–4:00 | Compare roles, synchronized slider, reliever versus maintenance. |
| 4:00–4:30 | Brief explorer/condition-directory view. Mention 69 guides and 100 conditions; omit rankings and the full simulation. |
| 4:30–5:00 | Technology, clinical-review/evaluation next steps, closing tagline and repository. |

## Ten-minute submission edit

Keep the eight-minute script and add only these two minutes:

- **After anatomy, +40 seconds:** switch reference body, open **Layers & systems**, reveal a layer, and show **Partial anatomical reference · model coverage**. Explain that visible gaps are documented. Return to lungs before continuing.
- **After the results, +20 seconds:** demonstrate one deliberate wrong response and retry during the post-check instead of rushing it. Explain first-attempt scoring as you do so; keep the overall assessment segment 20 seconds longer.
- **During the explorer, +30 seconds:** open the guide's provider questions and source reference label. Show how the user leaves with a question for a healthcare professional.
- **During rankings, +30 seconds:** search a name, point out the interval, and show the downloadable methodology. Explain that overlapping intervals limit interpretation of rank.

## Recording recovery and final check

- **Slow 3D load:** wait for loading to finish during rehearsal. During a take, explain the current screen or cut a pause transparently; do not present a loading screen as an interactive result. If WebGL is unavailable, the static fallback still supports the lesson, but describe it as a fallback.
- **Disabled lesson button:** move the mechanism slider near its relaxed end and open a hotspot/pathway. Complete both questions at each assessment stage.
- **Wrong quiz answer:** use the displayed feedback and retry. Narrate the result you actually obtained; never claim a staged score demonstrates learning gains.
- **Lost route:** use the prepared tabs. Reenter `/#demo` or restart the lesson for a fresh recording; normal story checkpoints can restore prior progress if enabled.
- **Before submitting:** watch the exported video end to end, confirm the actual duration fits the hackathon rules, check audio and text readability, remove private tabs/notifications, and verify any required team names, submission links, or credits. Add team details only when known.

Keep the source and review notices visible when they appear. Do not describe the product as clinically validated, the atlas as complete, the catalog as thousands of guides, or the simulation as a personalized prediction.
