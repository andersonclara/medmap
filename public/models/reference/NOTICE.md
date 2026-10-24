# MedMap anatomical references

Both body variants use the same source combination: sex-specific BoneHub CT skeletons and Human Reference Atlas (HRA) v1.10 organs, based on the NLM Visible Human Project. These are two complementary projects, not one comprehensive atlas. No male skeleton was reused for the female reference.

## Sources and attribution

- **Seyed Hamidreza Alavi and Malte Asseln (2026). Visible-Human-3d-Models, BoneHub.** [Dataset and license](https://huggingface.co/datasets/BoneHub/visible-human-3d-models), [DOI 10.57967/hf/10464](https://doi.org/10.57967/hf/10464). CC BY 4.0. CT subjects 01_Male and 02_Female; revision `7d520ffe410b3f79d82991b8368b2d51844feb80`. [Educational atlas and manifest](https://github.com/BoneHub/Educational-Atlas).
- **Andreassen, Hume, Hamilton, Walker, Higinbotham, and Shelburne (2023).** Aligned Visible Human CT source data, Scientific Data 10, 34. [DOI 10.1038/s41597-022-01905-2](https://doi.org/10.1038/s41597-022-01905-2). CC BY 4.0.
- **Kristen Browne and Heidi Schlehlein. HuBMAP / Human Reference Atlas, United Male and United Female, v1.10.** CC BY 4.0. [HRA reference organs](https://humanatlas.io/3d-reference-library), [male source GLB](https://cdn.humanatlas.io/digital-objects/ref-organ/united-male/v1.10/assets/3d-vh-m-united.glb), [female source GLB](https://cdn.humanatlas.io/digital-objects/ref-organ/united-female/v1.10/assets/3d-vh-f-united.glb).
- Original reference specimens: [National Library of Medicine Visible Human Project](https://www.nlm.nih.gov/research/visible/visible_human.html).

[Creative Commons Attribution 4.0 International license](https://creativecommons.org/licenses/by/4.0/): retain attribution and indicate changes when redistributing these derived models or renders. Source authors do not endorse MedMap.

## Changes made for MedMap

CT coordinates were converted from millimetres, Z-up, into metres, Y-up. HRA node world transforms were baked into geometry. BoneHub supplies all displayed bones; overlapping HRA bone meshes, skin, and separate placental specimens were excluded. HRA organs were registered to each corresponding CT skeleton using uniform scale and translation fitted to shared vertebral bounding-box centers. Knee connective tissue uses a separate rigid similarity fit to shared limb-bone centers. No sex substitution or anatomical deformation was applied.

Both references were normalized to the same display height, split into seven anatomical layers, given shared tissue colors and searchable metadata, simplified using Meshoptimizer with relative error tolerance 0.0005, quantized (16-bit positions and 12-bit normals), and Meshopt-compressed. Measurement reports are in `male/registration.json` and `female/registration.json`; counts and byte sizes are in `manifest.json`. PNG artwork is rendered from these processed models.

## Coverage and limits

Male: 142 skeletal meshes. Female: 143 skeletal meshes. Mesh counts are not counts of individual bones. Some bones are grouped, some small bones/cartilage are absent, and elbow regions are truncated in the source scans. HRA soft-tissue coverage is incomplete; neither assembly includes a stomach, thyroid gland, or adrenal gland mesh. A thyroid cartilage mesh does not represent the thyroid gland. Source-specific knee posture requires separate alignment.

Vertebral registration RMS is approximately 5.9 mm for male and 3.9 mm for female, before display normalization. These residuals describe landmark alignment, not accuracy of every organ or clinical validation. Models illustrate reference anatomy and medication connections; they do not simulate drug distribution, dose response, interactions, or individual treatment outcomes.
