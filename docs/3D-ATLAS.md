# Interactive anatomy atlas

Both male and female references use independently segmented BoneHub CT skeletons plus Human Reference Atlas v1.10 organs, based on NLM Visible Human specimens. The same source combination and rendering pipeline serve both references. This replaces the previous unmatched male and female sources. See [attribution and processing](../public/models/reference/NOTICE.md).

## Interaction

Click or tap a structure to focus it. Selection has a blue silhouette outline; hover previews in blue. Medication targets remain teal. Search organs supports aliases, keyboard navigation, and reference-specific availability. Selecting a result reveals its layer and frames it. Back to full body clears selection, search, and system isolation. Drag to rotate; wheel/trackpad zoom follows the pointer. Pinch, orientation buttons, and canvas keyboard shortcuts offer alternative navigation. Drag and multi-touch gestures do not select structures.

Both references share identical controls, seven layer groups, opacity sliders, system isolation, covering-tissue visibility, individual hiding/restoring, and presets. Switching reference preserves the camera, system, layers, and medication settings. The sex choice persists within the browser session. The former color key and organ button row are removed.

Medication guides retain their explanations, mechanisms, quizzes, condition directory, and sources. Anatomical highlights show representative organs or systems, not simulated drug response. Unavailable targets are labeled instead of highlighted. Medicines without mapped anatomical targets use an explicitly labeled pathway schematic.

## Assets and coverage

Local split assets live in public/models/reference/{male,female}. Each enabled layer loads independently with Meshopt decoding. Male has 142 skeletal meshes and female 143, including their own skull, rib cage, spine, pelvis, arms, hands, legs, and feet. Source elbow regions are truncated; some bones are grouped or absent. Soft-tissue coverage is partial. Neither HRA assembly includes stomach, thyroid gland, or adrenal gland meshes. Search only offers targets present in the chosen reference.

Registration reports and a generated manifest accompany the models. Global vertebral landmark RMS is 5.9 mm male and 3.9 mm female; knee connective tissue uses local rigid similarity registration. These are reference assemblies, not clinically validated patient-specific models. Do not interpret landmark RMS as whole-body anatomical accuracy.

Shared PNG artwork, including navigation, cards, mechanism panels and both WebGL fallbacks, is rendered from these same assets. Missing organs use a textual placeholder. Magnified airway and molecular pathway illustrations are labeled schematics.

## Rebuild

Install dependencies with npm install. Raw sources are ignored under assets-source/free-atlas. The pinned BoneHub manifest is checked in at scripts/sources/bonehub-manifest.json. Run:

    node scripts/download-free-atlas.mjs
    node scripts/download-hra-references.mjs
    node --max-old-space-size=8192 scripts/build-free-atlas.mjs

The skeleton downloader uses the revision pinned in the manifest. HRA downloads use the explicit v1.10 URLs. The builder exports all GLBs, metadata, registration reports, and src/data/referenceManifest.json. Preserve the NOTICE.md alongside generated outputs.

With Vite running, regenerate PNGs using node scripts/render-anatomy-assets.mjs. Set PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH if Chrome is not installed by Playwright. Run npm run build and npm test for production compilation and desktop/mobile interaction checks. WebGL failure presents matching static artwork; failed layer downloads can be retried.
