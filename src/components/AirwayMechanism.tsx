import { useId, useState } from "react";

export type AirwayMedicine = "albuterol" | "tiotropium";
export function AirwayCrossSection({ progress }: { progress: number }) {
  const uid = useId();
  const fraction = Math.max(0, Math.min(100, progress)) / 100;
  const radius = 25 + 20 * fraction;
  const lumen = Array.from({ length: 72 }, (_, i) => {
    const angle = i * Math.PI * 2 / 72;
    const r = radius + Math.cos(angle * 9) * (4.5 - 2.8 * fraction);
    return `${i ? "L" : "M"}${100 + Math.cos(angle) * r},${100 + Math.sin(angle) * r}`;
  }).join(" ") + "Z";
  return <figure className="airway-detail">
    <svg viewBox="0 0 200 200" role="img" aria-label={fraction < .5 ? "Illustrative narrowed airway with contracted smooth muscle" : "Illustrative wider airway with relaxed smooth muscle"}>
      <defs><radialGradient id={`${uid}-tissue`} cx="40%" cy="30%"><stop stopColor="#f0d7c8" /><stop offset=".7" stopColor="#d0a18f" /><stop offset="1" stopColor="#926157" /></radialGradient><radialGradient id={`${uid}-muscle`} cx="35%" cy="30%"><stop stopColor="#d9a294" /><stop offset=".7" stopColor="#ae7064" /><stop offset="1" stopColor="#7f4d48" /></radialGradient><radialGradient id={`${uid}-lumen`} cx="40%" cy="65%"><stop stopColor="#8dada6" /><stop offset=".75" stopColor="#415d5e" /><stop offset="1" stopColor="#263c40" /></radialGradient></defs>
      <circle cx="100" cy="100" r="84" fill={`url(#${uid}-tissue)`} stroke="#c49989" strokeWidth="1.5" />
      <circle cx="100" cy="100" r="70" fill={`url(#${uid}-muscle)`} stroke="#e6b9a9" strokeWidth="3" />
      {Array.from({ length: 32 }, (_, i) => <ellipse key={i} cx="100" cy="37" rx="1.6" ry="4.5" fill="#f4c7b4" opacity=".45" transform={`rotate(${i * 11.25} 100 100)`} />)}
      <path className="airway-lumen" data-testid="airway-lumen" d={lumen} fill={`url(#${uid}-lumen)`} stroke="#e7b6a5" strokeWidth={17 - 6 * fraction} strokeLinejoin="round" />
    </svg><figcaption>Magnified airway cross-section <span>Simplified illustration, not a measured airway</span></figcaption>
  </figure>;
}

const pathways = {
  albuterol: [
    { id: "receptor", title: "Beta-2 receptor", simple: "Albuterol activates a receptor on airway smooth muscle, starting a relaxation signal.", scientific: "Beta-2 adrenergic receptor activation stimulates adenylyl cyclase, increasing intracellular cyclic AMP (cAMP)." },
    { id: "signal", title: "cAMP signaling", simple: "A chemical messenger carries the signal inside the muscle cell.", scientific: "Increased cAMP participates in the signaling that relaxes bronchial smooth muscle. Individual cells and concentrations are not modeled here." },
    { id: "muscle", title: "Smooth muscle", simple: "When the muscle around an airway relaxes, the opening can become wider. Albuterol does not cure asthma or replace its broader management plan.", scientific: "Bronchial smooth-muscle relaxation produces bronchodilation. This illustration isolates that mechanism; airway inflammation and mucus are not fully represented." },
  ],
  tiotropium: [
    { id: "receptor", title: "Muscarinic M3 receptor", simple: "Tiotropium blocks a receptor involved in signals that tighten airway muscle.", scientific: "Tiotropium antagonizes muscarinic receptors, including M3 receptors on airway smooth muscle, reducing acetylcholine-mediated bronchoconstriction." },
    { id: "signal", title: "Acetylcholine signaling", simple: "Blocking this signal reduces one pathway that causes airway muscle to tighten.", scientific: "Muscarinic antagonism reduces cholinergic bronchoconstrictor signaling. This differs from albuterol's beta-2 receptor agonism." },
    { id: "muscle", title: "Smooth muscle", simple: "This contributes to keeping airways more open during maintenance treatment. Tiotropium is not a rescue treatment for sudden symptoms.", scientific: "Reduced muscarinic signaling contributes to bronchodilation. A similar schematic opening does not imply equal potency, onset, duration, or clinical role." },
  ],
};

export function AirwayMechanism({ medicine = "albuterol", progress, onProgressChange, scientific = false, showSlider = true, onExplore }: {
  medicine?: AirwayMedicine; progress?: number; onProgressChange?: (value: number) => void;
  scientific?: boolean; showSlider?: boolean; onExplore?: (id: string) => void;
}) {
  const uid = useId();
  const [localProgress, setLocalProgress] = useState(0);
  const [hotspot, setHotspot] = useState<string | null>(null);
  const value = progress ?? localProgress;
  const points = pathways[medicine];
  const selected = points.find((point) => point.id === hotspot);
  const change = (next: number) => { setLocalProgress(next); onProgressChange?.(next); };
  const explore = (id: string) => { setHotspot(id); onExplore?.(id); };
  return <section className="airway-interactive" aria-label={`${medicine === "albuterol" ? "Albuterol" : "Tiotropium"} airway mechanism`}>
    <div className="airway-interactive-heading"><span className="eyebrow">BIOLOGICAL MECHANISM</span><span className="small-pill">Simplified illustration</span></div>
    <div className="airway-interactive-visual"><AirwayCrossSection progress={value} />
      <button className="airway-hotspot hotspot-opening" aria-pressed={hotspot === "opening"} aria-controls={`${uid}-explanation`} onClick={() => explore("opening")} aria-label="Explore airway opening">1</button>
      <button className="airway-hotspot hotspot-muscle" aria-pressed={hotspot === "muscle"} aria-controls={`${uid}-explanation`} onClick={() => explore("muscle")} aria-label="Explore smooth muscle">2</button>
      <button className="airway-hotspot hotspot-receptor" aria-pressed={hotspot === "receptor"} aria-controls={`${uid}-explanation`} onClick={() => explore("receptor")} aria-label={`Explore ${medicine === "albuterol" ? "beta-2" : "muscarinic M3"} receptor`}>3</button>
    </div>
    {showSlider && <div className="airway-slider"><label htmlFor={`${uid}-range`}>Before-and-after airway view</label><input id={`${uid}-range`} type="range" min="0" max="100" step="1" value={value} aria-valuetext={value === 0 ? "Narrowed airway illustration" : value === 100 ? "Relaxed muscle illustration" : "Between narrowed and relaxed illustrations"} onChange={(event) => change(Number(event.target.value))} /><div><button onClick={() => change(0)}>Before: narrowed</button><button onClick={() => change(100)}>After: relaxed</button></div></div>}
    <div className="airway-pathway" aria-label="Explore the signaling pathway">{points.map((point, index) => <button key={point.id} aria-pressed={hotspot === point.id} aria-controls={`${uid}-explanation`} onClick={() => explore(point.id)}><small>0{index + 1}</small>{point.title}{index < 2 && <span aria-hidden="true"> →</span>}</button>)}</div>
    <div id={`${uid}-explanation`} className="hotspot-explanation" aria-live="polite"><h4>{hotspot === "opening" ? "The airway opening" : selected?.title ?? "Explore a structure or signal"}</h4><p>{hotspot === "opening" ? "Air passes through this opening, called the lumen. Muscle tightening is one contributor to narrowing; this cross-section leaves out many features of a real airway." : selected ? scientific ? selected.scientific : selected.simple : "Use the numbered hotspots or the pathway buttons. Each reveals one part of the mechanism."}</p></div>
    <p className="fine-print">Slider position is an illustration setting, not dose, elapsed time, airflow, or an expected treatment response.</p>
  </section>;
}
