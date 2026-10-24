import { useState } from "react";
import {
  ArrowLeft,
  ArrowLeftRight,
  ArrowUpRight,
  GitCompareArrows,
  ShieldCheck,
} from "lucide-react";
import { medications } from "../data/medications";
import {
  comparisonHref,
  getRelationships,
  relationshipLabels,
} from "../data/medicationRelationships";
import type { Medication } from "../types/medication";
import { AirwayMechanism, type AirwayMedicine } from "./AirwayMechanism";
import { AnatomicalGraphic } from "./AnatomicalGraphic";

const sortedMedications = [...medications].sort((a, b) =>
  a.name.localeCompare(b.name),
);
export function MedicationComparison({ ids }: { ids: [string, string] }) {
  const [scientific, setScientific] = useState(false);
  const [illustration, setIllustration] = useState(0);
  const first = medications.find((m) => m.id === ids[0]);
  const second = medications.find((m) => m.id === ids[1]);
  const invalid = ids.some((id) => id && !medications.some((m) => m.id === id));
  const duplicate = Boolean(first && second && first.id === second.id);
  const pair = first && second && !duplicate ? [first, second] : null;
  const relationships = pair ? getRelationships(pair[0].id, pair[1].id) : [];
  function change(slot: number, value: string) {
    const next: [string, string] = [...ids];
    next[slot] = value;
    location.hash = comparisonHref(next[0], next[1]);
  }
  const rows: {
    title: string;
    render: (med: Medication) => React.ReactNode;
  }[] = [
    {
      title: "What is it used for?",
      render: (med) => (
        <>
          <p>{med.uses}</p>
          <div className="comparison-tags">
            {med.conditions.map((c) => (
              <span key={c}>{c}</span>
            ))}
          </div>
        </>
      ),
    },
    {
      title: "How does it work?",
      render: (med) => (
        <>
          <p>{scientific ? med.scientific : med.simple}</p>
          {scientific && (
            <div className="comparison-definition">
              <strong>A helpful definition</strong>
              <p>{med.definition}</p>
            </div>
          )}
        </>
      ),
    },
    { title: "What should I know?", render: (med) => <p>{med.safety}</p> },
    {
      title: "Questions for your provider",
      render: (med) => (
        <ol>
          {med.questions.map((q) => (
            <li key={q}>{q}</li>
          ))}
        </ol>
      ),
    },
    {
      title: "Keep learning",
      render: (med) => (
        <a
          className="comparison-source"
          href={med.source}
          target="_blank"
          rel="noreferrer"
        >
          {med.sourceLabel ?? "MedlinePlus"} — {med.name}
          <ArrowUpRight size={15} />
        </a>
      ),
    },
  ];
  return (
    <main className="comparison-page">
      <a
        className="comparison-back"
        href={first ? `#explore/${first.id}` : "#explore"}
      >
        <ArrowLeft size={15} /> Back to medication guide
      </a>
      <div className="comparison-heading">
        <div>
          <span className="eyebrow">A LITTLE PERSPECTIVE</span>
          <h1>Two medicines. A clearer picture.</h1>
          <p>Explore their roles side by side, at your own pace.</p>
        </div>
        <span className="comparison-heading-icon">
          <GitCompareArrows size={27} />
        </span>
      </div>
      <div className="comparison-notice">
        <ShieldCheck size={21} />
        <p>
          <strong>Compare to understand, not to choose a replacement.</strong>{" "}
          Shared uses or mechanisms do not make medicines interchangeable.
          Formulation, diagnosis, interactions, and individual risks matter. Do
          not start, stop, combine, or switch medicines based on this
          comparison.
        </p>
      </div>
      <section
        className="comparison-picker card"
        aria-label="Choose medicines to compare"
      >
        {[0, 1].map((slot) => (
          <label key={slot} htmlFor={`compare-medication-${slot}`}>
            <span>{slot === 0 ? "First medicine" : "Second medicine"}</span>
            <select
              id={`compare-medication-${slot}`}
              value={
                medications.some((m) => m.id === ids[slot]) ? ids[slot] : ""
              }
              onChange={(e) => change(slot, e.target.value)}
            >
              <option value="">Choose a medication</option>
              {sortedMedications.map((m) => (
                <option
                  key={m.id}
                  value={m.id}
                  disabled={m.id === ids[slot === 0 ? 1 : 0]}
                >
                  {m.name}
                </option>
              ))}
            </select>
          </label>
        ))}
        <button
          className="comparison-swap"
          aria-label="Swap compared medicines"
          disabled={!pair}
          onClick={() => {
            location.hash = comparisonHref(ids[1], ids[0]);
          }}
        >
          <ArrowLeftRight size={18} />
        </button>
      </section>
      {invalid ? (
        <p className="comparison-error" role="alert">
          A medicine in this comparison link was not found. Choose two medicines
          from the library above.
        </p>
      ) : duplicate ? (
        <p className="comparison-error" role="alert">
          Choose two different medicines to compare.
        </p>
      ) : !pair ? (
        <div className="comparison-empty card">
          <GitCompareArrows size={35} />
          <h2>
            Choose {first ? "a second medicine" : "two medicines"} to begin.
          </h2>
          <p>
            Compare any two guides, even if no similar medicine is listed. A
            comparison does not establish that they treat the same condition.
          </p>
        </div>
      ) : (
        <>
          <section
            className="comparison-connection"
            aria-label="Why these medicines are connected"
          >
            <span className="eyebrow">
              THE CONNECTION — AND THE DIFFERENCES
            </span>
            {relationships.length ? (
              relationships.map((r) => (
                <div key={r.id}>
                  <h2>
                    <span>{relationshipLabels[r.kind]}</span>
                    {r.title}
                  </h2>
                  <p>{r.context}</p>
                </div>
              ))
            ) : (
              <p>
                No curated clinical relationship is recorded for this pair in
                the library. You can still compare their different uses and
                mechanisms below.
              </p>
            )}
          </section>
          <div className="comparison-columns comparison-overview">
            {pair.map((med, index) => (
              <article className="card comparison-medicine" key={med.id}>
                <span className="eyebrow">MEDICINE 0{index + 1}</span>
                <h2>{med.name}</h2>
                <span className="small-pill">{med.category}</span>
                {med.organ && <div className="comparison-target-art"><AnatomicalGraphic organ={med.organ} /><span>Atlas-derived target reference</span></div>}
                <p>
                  <strong>Primary focus</strong>
                  {med.target ?? med.organ ?? "Multiple tissues"}
                </p>
                <a href={`#explore/${med.id}`}>
                  Open full guide <ArrowUpRight size={14} />
                </a>
              </article>
            ))}
          </div>
          <div className="comparison-level">
            <div>
              <h2>Your level of detail</h2>
              <p>Switch the mechanism explanations for both medicines.</p>
            </div>
            <div
              className="mode-toggle"
              aria-label="Comparison explanation level"
            >
              <button
                className={!scientific ? "active" : ""}
                aria-pressed={!scientific}
                onClick={() => setScientific(false)}
              >
                Simple
              </button>
              <button
                className={scientific ? "active" : ""}
                aria-pressed={scientific}
                onClick={() => setScientific(true)}
              >
                Scientific
              </button>
            </div>
          </div>
          {pair.every((med) => med.id === "albuterol" || med.id === "tiotropium") && <section className="comparison-interactive" aria-label="Synchronized airway mechanisms">
            <div className="section-heading"><div><span className="eyebrow">TWO RECEPTORS, DISTINCT ROLES</span><h2>Follow both pathways.</h2></div><span className="small-pill">Illustrative comparison</span></div>
            <p>Albuterol activates beta-2 receptors; tiotropium blocks muscarinic signaling. Both can contribute to bronchodilation, through different pathways. The shared slider aligns illustration positions, not potency, onset, duration, or expected benefit.</p>
            <label className="comparison-slider-label" htmlFor="comparison-airway-range">Synchronized before-and-after illustrations</label><input id="comparison-airway-range" className="comparison-airway-range" type="range" min="0" max="100" value={illustration} aria-valuetext={illustration < 50 ? "Closer to narrowed illustrations" : "Closer to relaxed illustrations"} onChange={(event) => setIllustration(Number(event.target.value))} />
            <div className="comparison-slider-ends"><button onClick={() => setIllustration(0)}>Before: narrowed</button><button onClick={() => setIllustration(100)}>After: relaxed</button></div>
            <div className="comparison-airway-visuals">{pair.map((med) => <article key={med.id}><h3>{med.name}</h3><p className="comparison-role">{med.id === "albuterol" ? "Short-acting reliever example" : "Maintenance bronchodilator example; not rescue"}</p><AirwayMechanism medicine={med.id as AirwayMedicine} progress={illustration} showSlider={false} scientific={scientific} /></article>)}</div>
            <p className="comparison-visual-limits">These roles are not interchangeable. Product and condition matter; this view does not establish suitability for Maya or recommend switching, combining, or discontinuing treatment. <a href="https://medlineplus.gov/druginfo/meds/a604018.html" target="_blank" rel="noreferrer">Tiotropium reference</a>.</p>
          </section>}
          {rows.map((row) => (
            <section
              className="comparison-section"
              aria-label={row.title}
              aria-live={
                row.title === "How does it work?" ? "polite" : undefined
              }
              key={row.title}
            >
              <h2>{row.title}</h2>
              <div className="comparison-columns">
                {pair.map((med) => (
                  <article
                    className="card comparison-cell"
                    key={med.id}
                    aria-label={`${row.title}: ${med.name}`}
                  >
                    <h3>{med.name}</h3>
                    {row.render(med)}
                  </article>
                ))}
              </div>
            </section>
          ))}
          <p className="comparison-footnote">
            Educational summaries are incomplete and have not had clinical
            review. Consult the current source information and your healthcare
            team for decisions. No personal health information is used.
          </p>
        </>
      )}
    </main>
  );
}
