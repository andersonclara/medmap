# Interactive 3D body atlas

The medication explorer and homepage both include a directly interactive mesh-based atlas. The homepage starts with its layer controls collapsed.

Click or tap a visible structure to select it and automatically frame it for a closer look. The camera keeps its current viewing direction, and a **Back to full body** button restores the overview. Selected structures have a blue silhouette outline, preserving their anatomical or medication color. Hovered structures have a blue preview tint, and medicine targets remain teal. The color legend and fixed organ-selection buttons have been removed. Drag with a mouse or one finger to orbit. Trackpad and wheel zoom follow the pointer; pinch gestures also zoom. Rotation gestures and multi-touch gestures do not select structures. Front, back, left, right, zoom, and reset buttons provide alternatives. A focused canvas supports arrow keys, `+`, `-`, and `Home`.

The **Search organs** field above the diagram filters organs available in the selected reference. It supports common names and aliases such as “renal” for kidneys, arrow keys to navigate results, Enter to select, and Escape to close. Selecting a result reveals the appropriate layer, restores any hidden target structures, isolates its system, and frames the organ with a blue outline. It also waits for a newly required model layer to load before focusing. Search includes model-specific organs such as the uterus and ovaries in the female reference. The female source does not contain the stomach; that result is available in the male reference, and the female medication label reports its absence rather than claiming it is highlighted.

Seven independently loaded model groups cover bones, joints and ligaments, muscles, viscera, blood vessels, nerves and brain, and lymphatics. Each group has a visibility checkbox and opacity slider. System isolation filters actual structures; covering membranes and fascia can be revealed separately. Clicking a mesh shows its anatomical name and lets the user hide it individually. Reset restores hidden structures as well as layer settings.

The atlas has 13 representative medicine previews. The original albuterol, metformin, and omeprazole guides retain their mechanism animations and quizzes. Additional previews cover an ACE inhibitor, beta blocker, diuretic, statin, SSRI, insulin, NSAID, corticosteroid, antibiotic, and anticoagulant. Each preview links to its MedlinePlus reference. The preview selector is separate from the full guide library; selecting one of the three full-guide medicines also selects that guide.

Highlights indicate representative anatomical locations only. They do not simulate pharmacokinetics, concentration, clinical outcomes, dose response, interactions, or all adverse effects. Antibiotics target bacteria, so their preview intentionally does not highlight a human organ. It is not an exhaustive drug database.

The **Male / Female** selector switches between independent reference datasets using the same layout, system menu, layer controls, presets, search interaction, hover treatment, selection outline, and zoom/orbit controls. Switching preserves the camera viewpoint, body-system filter, layer opacity settings, and medication-highlight setting. The reference choice is retained within the browser session across guide and page changes. There are no female-only controls or coverage messages in the main workspace; model-specific details live in the shared credits panel.

The male atlas is the detailed Z-Anatomy dataset. The female atlas uses the HuBMAP female reference assembly, with actual female pelvis and reproductive anatomy, a translucent body surface, and selected organs. Its bone, muscle, and nerve coverage is partial; missing structures are not filled with male geometry. The female contextual body surface follows the shared bone-layer visibility and opacity rather than adding a separate control. Models show reference anatomy rather than all individual variation.

The female display uses a cutaway rendering profile: the body surface is reduced to a faint contour, covering breast tissue and membranes are hidden by default, and organ materials use the same medical-illustration palette as the male atlas. Covering tissues remain accessible through the existing membrane toggle. A separate placental specimen included in the upstream assembly is excluded from the whole-body view, so it does not obscure the abdominal organs. Mesh geometry and female anatomical relationships are preserved. The same appearance helpers generate the female fallback image.

## Implementation and validation

- `src/components/AnatomyScene.tsx`: Three.js renderer, OrbitControls, blue OutlinePass selection, local model decoding, lazy loading, visibility, raycast selection, search focus, and GPU cleanup.
- `src/components/AnatomyViewer.tsx`: accessible controls, layer presets, organ selection, dissection controls, medicine previews, and credits.
- `src/components/anatomyAppearance.ts`: female anatomical material palette, contextual body contour, and covering-tissue/reference-specimen visibility rules.
- `src/data/anatomy.ts`: system classification and sourced medicine mappings.
- `src/components/OrganSearch.tsx` and `src/data/organSearch.ts`: accessible organ autocomplete, common-name aliases, model availability, and anatomical search targets.
- `public/models/`: approximately 19 MB of male anatomical geometry, fetched only for enabled groups. The approximately 31.5 MB female reference is downloaded only when selected. Both models and decoders are served locally; no external API or account is required at runtime.
- `tests/anatomy.spec.ts`: verifies real geometry loads, rotation changes the rendered canvas, keyboard navigation, layer opacity, isolation, medicine selection, and responsive layout on desktop and mobile.
- `tests/anatomy-interactions.spec.ts`: verifies hover/selection highlights, pointer-dependent wheel zoom, independent female anatomy, persistence of the model choice across medicine guides, and organ search with keyboard navigation and empty results.

Run `npm run build` and `npm test`. WebGL is required for 3D. If WebGL is unavailable, an illustrated fallback explains the limitation. Failed layer downloads can be retried.

## Model licensing

Models were exported by [3D Anatomy](https://github.com/nqwrc/3d-anatomy) from Z-Anatomy / BodyParts3D. Geometry is redistributed unmodified; visibility, materials, and highlighting are applied at runtime. The original license documents are preserved in `public/models/LICENSE`, `public/models/NOTICE`, and `public/models/License.txt`, with links and required attribution strings visible in the atlas credits.

The male model collection includes noncommercial components, including the kidney and inner ear, and is distributed under CC BY-NC-SA 4.0. Preserve the upstream attribution and share-alike terms when redistributing these assets; these male assets cannot be used commercially under the supplied license. Three.js is MIT licensed; its bundled Draco decoder is Apache-2.0 licensed. These asset notices do not assert a new license over unrelated project files.

The separate female geometry is HuBMAP Consortium / Human Reference Atlas, **3D Reference Organ Set for Female v1.5**, [DOI 10.48539/HBM352.BTSQ.586](https://doi.org/10.48539/HBM352.BTSQ.586), CC BY 4.0. The optimized web export comes from [Femora Atlas](https://github.com/zer01dollars/female-body-atlas). Its upstream attribution is preserved in `public/models/female/ATTRIBUTION.md`. MedMap retains the geometry, normalizes its position and scale at runtime, and assigns its structures to the existing layer controls. Meshopt decoding is provided by the decoder bundled with Three.js.

Required attribution:

BodyParts3D - The Database Center for Life Science - CC-BY-SA 2.1 Japan

Z-Anatomy - The open source atlas of anatomy - CC-BY-SA 4.0

## Shared anatomical artwork

`src/components/AnatomicalGraphic.tsx` supplies the shared male artwork for the WebGL fallback, brand heart, medication cards, and mechanism panels. Seven male PNGs and a separate female body fallback in `public/images/atlas/` are rendered from their respective mesh files with atlas lighting and materials. Their attribution and license terms follow their source meshes. The airway cross-section is an original magnified schematic in matching tissue colors; its caption distinguishes it from the mesh-derived organ artwork.

To regenerate the images, start Vite with `npm run dev`, then run `node scripts/render-anatomy-assets.mjs`. The script uses Playwright Chromium; set `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` to use an installed Chrome/Chromium executable. `ATLAS_URL` optionally overrides `http://127.0.0.1:5173/`. The generation script writes all eight PNGs and closes its browser. No image generation service is involved.
