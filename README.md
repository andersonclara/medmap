<p align="center">
  <img src="public/branding/medmap-logo.svg" alt="MedMap — See how your medicine works." width="390" />
</p>

# Your medicine has a story. MedMap makes it visible.

Knowing a medication's name is different from understanding what it does. MedMap connects a condition, the body, and a medicine's mechanism in one interactive learning journey—helping people build the vocabulary to ask better questions about their care.

**Explore the body. Follow the mechanism. Check your understanding.**

Built for curious patients, caregivers, and students, this hackathon prototype turns medication education into something you can explore at your own pace: rotate reference anatomy, open a signaling pathway, move a before-and-after illustration, and explain what you learned.

Demo Video: https://youtu.be/r8PcAoWkBHs

Deployed site: https://medmap-health.vercel.app/


## Meet Maya. Make the mechanism click.

Maya is a fictional cyclist with asthma. She knows the name of her inhaler; she wants to understand what happens inside her airways.

In MedMap's flagship **Patient Story**, the learner:

1. Answers two questions to record a starting point.
2. Explores the lungs in an interactive 3D reference body.
3. Moves into a magnified airway illustration and follows beta-2 receptor activation, cAMP signaling, and smooth-muscle relaxation.
4. Switches between **Simple** and **Scientific** explanations and explores clickable hotspots.
5. Applies the lesson in two follow-up questions, with feedback and retries.
6. Compares albuterol and tiotropium to see why related mechanisms can serve different treatment roles.

The summary separates baseline answers, post-lesson first attempts, and correct answers after practice. It makes the learning process visible without claiming that a short quiz proves educational effectiveness.

**Try it:** run the app and open `/#demo` for a fresh lesson, or `/#stories/asthma` for the normal story with optional completed-step checkpoints in this tab.

## Beyond one story

| Experience | What the learner can do |
| --- | --- |
| **Ailment-first medication explorer** | Choose a condition, select a documented medication example, and follow a four-stage walkthrough: baseline, site of action, mechanism, and wider effects and limits. |
| **Interactive anatomy** | Rotate, zoom, search structures, switch male/female references, isolate systems, and reveal layers. Representative medication targets connect the guide to available anatomy. |
| **69 authored medication guides** | Explore general uses, simple/scientific explanations, safety context, provider questions, source links, and knowledge checks. |
| **100-condition directory** | Find condition-specific context. 95 conditions link to medication guides; five explain why no general medication example is assigned. |
| **Related medicines and comparison** | See explicit educational connections and compare targets, mechanisms, uses, safety, and questions. Albuterol/tiotropium also has synchronized interactive airway illustrations. |
| **U.S. population context** | Search 315 prescription-name entries and 169 reported-condition groups derived from 2024 AHRQ MEPS data, with uncertainty intervals, sources, and downloadable methodology. |

The rankings are a **reference catalog**, not hundreds of additional authored guides. Prescription ranking measures estimated purchase events; condition ranking measures care-associated reported-condition groups, not all disease prevalence. Only supported condition–medicine mappings unlock explorer walkthroughs.

## Why MedMap

MedMap brings the **where**, **how**, and **what did I understand?** into the same experience. The learner moves from a familiar human story to anatomy, from anatomy to a mechanism, and from a mechanism to an explanation they can practice giving back.

Two explanation levels support different starting points. Source links and provider questions help continue the conversation beyond the screen. The app runs without an account, backend, API key, or entry of personal health information.

## Built today, growing next

The current prototype includes **one complete guided asthma story**, 69 medication guides, the condition directory, ailment-first walkthroughs, comparisons, and the survey reference catalog. The synchronized airway comparison is implemented specifically for albuterol and tiotropium; other comparisons retain their guide-based views.

Next steps are independent clinical review, usability and learning-outcome evaluation, more guided patient stories, and expanded validated anatomy coverage. These are planned directions, not completed features or measured results.

## Try it locally

Use Node.js **22.12+**; Node 24 has been tested.

```sh
git clone https://github.com/andersonclara/medmap.git
cd medmap
npm ci
npm run dev
```

Open the exact **Local** URL printed by Vite, then choose the guided demo. Keep that terminal running. Use a new terminal tab for other commands, or press **Control+C** to stop the server.

Already have the repository? From its folder, run `git pull origin main`, then `npm ci` and `npm run dev`. If Git reports local changes, preserve them before pulling.

The bundled application content and anatomy assets need no live medical API. External reference links require internet access. Initial 3D loading depends on the device; a static reference image is available when WebGL is unavailable.

## Technology and verification

React 19 · TypeScript · Vite · Three.js · Tailwind CSS · Lucide · SVG mechanism illustrations · Playwright.

```sh
npm run typecheck
npm run build
npm run preview
```

For browser checks:

```sh
npx playwright install chromium
npm test
```

Tests cover guided learning and scoring, keyboard and mobile interactions, anatomy controls and fallback, condition links, comparison, ailment filtering, simulation, and rankings. For an existing Chromium installation, set `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` to its executable. Restricted npm caches can use `npm ci --cache /tmp/medmap-npm`.

## Education with clear boundaries

MedMap is a source-informed educational prototype and **has not had independent clinical review**. It provides no dosing or personalized treatment recommendations. Related medicines are educational connections, not substitutes, rankings, or an interaction check.

“Simulation” means a qualitative mechanism walkthrough. It does not model drug concentrations, biological timing, dose response, or individual outcomes. Matching illustration sliders do not imply equal drug effects. Quiz results describe one session, not validated clinical understanding.

The 3D atlas uses BoneHub CT skeletons and Human Reference Atlas organs. Both references have documented gaps; they are not complete or patient-specific models. Missing structures are identified rather than invented. Magnified airway drawings are simplified schematics, separate from the reference meshes.

Medication references include MedlinePlus and explicitly labeled DailyMed searches. A source link does not establish that every guide has been independently verified. Review current labeling and obtain clinical review before use beyond this prototype.

## Explore the project

- [U.S. rankings methodology and simulation boundaries](docs/US-RANKINGS-AND-SIMULATION.md)
- [3D atlas coverage and controls](docs/3D-ATLAS.md)
- [Anatomy source attribution and licensing](public/models/reference/NOTICE.md)
- [Reference import pipeline](docs/PAIRED-ATLAS-IMPORT.md)

Application routes live in `src/App.tsx`; learning experiences in `src/components/`; authored guides, condition mappings, and relationships in `src/data/`. Scalable logos and a slide-ready preview are in `public/branding/`.

**MedMap — see how your medicine works.**
