# U.S. rankings and educational simulation

The user selected strict source-backed rankings, allowing fewer than 1,000 entries. The current catalog contains **315 prescription-name entries** and **169 reported-condition groups**, derived from 2024 AHRQ MEPS public-use data. These are additional searchable reference entries, not 484 new authored clinical guides. Existing detailed guides and the 100-condition directory remain available.

## Source and scope

- [HC-254A: 2024 Prescribed Medicines](https://meps.ahrq.gov/data_stats/download_data_files_detail.jsp?cboPufNumber=HC-254A), released July 2026.
- [HC-255: 2024 Medical Conditions](https://meps.ahrq.gov/data_stats/download_data_files_detail.jsp?cboPufNumber=HC-255), released August 2026. CCSR descriptions come from its official documentation.
- [HC-256: 2024 Full-Year Consolidated](https://meps.ahrq.gov/data_stats/download_data_files_detail.jsp?cboPufNumber=HC-256), released August 2026, provides the full positive-weight survey population and variance design.

Population: U.S. civilian noninstitutionalized people in 2024. These are app-derived estimates, not an AHRQ-published league table or a universal list of America's most prevalent diseases. MEPS excludes institutionalized and active-duty military populations. Prescription-event data excludes nonprescription purchases and medicines administered in hospitals/provider offices. RXDRGNAM includes masked therapeutic classes used in confidentiality editing; individual medicines cannot be recovered from those groups.

Drug entries are ordered by weighted prescription-purchase events, using the person weight once per event. Other diabetic equipment/supplies and invalid names are excluded. Repeated purchases count toward annual use; they are not interpreted as unique patients or treatment efficacy.

Condition groups are ordered by weighted unique people with a household-reported CCSR condition associated with medical care. All four available CCSR fields are considered; repeated mentions of a category for a person count once. Categories can overlap, and are not restricted to named diseases: some describe injuries or symptoms. FAC/EXT categories, unmapped entries, and zero-placeholder categories are excluded. This is care-associated reported-condition frequency, **not prevalence of every disease** or lifetime diagnosis prevalence.

Reliability filter: at least 30 distinct unweighted people and relative standard error no greater than 30%, evaluated before display rounding. This is an explicit app reporting rule, not a claim of AHRQ endorsement. Taylor stratified-PSU variance of weighted totals includes zero-contribution PSUs from the full person sample. Approximate 95% intervals use estimate ± 1.96 standard errors, with a lower bound of zero. Point-estimate rank is not proof of a statistically significant ordering; confidence intervals overlap. Entries are not padded to reach 1,000.

## Reproduce

Run `node scripts/download-us-rankings.mjs`, then `node scripts/build-us-rankings.mjs`. Raw public-use files remain ignored in `assets-source/us-rankings/`; they are not shipped with the app. The builder writes `src/data/usRankings.json` and the downloadable `public/data/us-rankings.json`, including input SHA-256 hashes, source URLs, population, method, estimates, unweighted people, standard errors, intervals, and ranks. It publishes aggregate data only, with no respondent identifiers.

The downloader handles only expected flat DAT filenames in the source ZIPs. It can be rerun on Node without Python or a statistical software installation. The rankings route provides search, 25-row pagination, source links, intervals, and download access.

## Simulation behavior

Simulation is embedded in the medication explorer. The flow is ailment first, then a documented medicine, then simulation on the same page. A bare `#explore` route shows no medication choices until an ailment is selected. The sidebar filters strictly through explicit condition-treatment mappings; it never falls back to all medicines. Changing the ailment clears the medicine, search, active playback, and diagram. Unmapped ailments show an empty state. Incompatible deep links cannot start a simulation. Ranked-group crosswalks resolve to canonical ailments, and legacy `#simulate` links are converted to `#explore` links.

Selecting a medicine opens its guide and one shared anatomy diagram, with no unrestricted medicine-class selector. The diagram starts as the ordinary medication-target preview. Run simulation starts a qualitative four-stage walkthrough: baseline, site of action, mechanism, and wider effects/limits. It supports play, pause, next stage, direct stage selection, reset, and both reference bodies. Anatomical highlights are off at simulation baseline and turn on for mapped sites in later stages. Reset clears playback and remounts the diagram while retaining the reference-sex preference.

A playable scenario requires an existing authored medication guide and an explicit medicine-condition relationship from `conditionTreatments.ts`. Generic organ similarity is never used as evidence of a treatment relationship. Exact-scope crosswalks from selected ranked CCSR categories point to existing condition guides; broader groups remain unsupported. The rank catalog itself supplies no mechanism, indication, or safety information. Unsupported medicines remain reference entries in the rankings, and do not appear as medication options in the ailment-first explorer. DailyMed and MedlinePlus links provide source reference access. Documented examples are not an exhaustive list of treatment options or an individualized prescribing recommendation.

The simulation does not model dose, drug concentrations, pharmacokinetics, elapsed biological time, disease severity, drug interactions, comorbidity, efficacy probabilities, or individual outcomes. Its timer controls illustration pacing only. It cannot tell a user how treatment will affect them personally or whether a combination is safe.

## Anatomy decision

The user chose to retain free sources and clearly mark missing anatomy. No claim of complete musculature or organs is made. Male muscular layer: 27 meshes; female: 16, including tendons and selected eye/thigh structures. The male reference also contains selected laryngeal muscles. Entire muscle regions and several organs remain absent. The All available anatomy preset reveals existing layers without fabricating missing geometry. The coverage panel and source inventories document the gaps.

Additional paired lower-extremity muscle meshes were identified in the University of Denver Visible Human collection (CC BY 4.0), but its public download endpoint returned an anti-bot 403 during this task. No meshes from that archive were imported, and no male anatomy was substituted into the female model. See [current anatomy sources and processing](3D-ATLAS.md).
