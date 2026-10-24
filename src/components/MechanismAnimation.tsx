import { useId, useState } from "react";
import { ArrowRight, RotateCcw } from "lucide-react";
import type { Medication } from "../data/medications";
import { AnatomicalGraphic } from "./AnatomicalGraphic";

function AirwayDetail({ after }: { after: boolean }) {
  const uid = useId();
  const radius = after ? 45 : 25;
  const lumen = Array.from({ length: 72 }, (_, i) => {
    const angle = i * Math.PI * 2 / 72;
    const r = radius + Math.cos(angle * 9) * (after ? 1.7 : 4.5);
    return `${i ? "L" : "M"}${100 + Math.cos(angle) * r},${100 + Math.sin(angle) * r}`;
  }).join(" ") + "Z";
  return <figure className="airway-detail">
    <svg viewBox="0 0 200 200" role="img" aria-label={after ? "Airway cross-section with relaxed smooth muscle and a wider opening" : "Airway cross-section with contracted smooth muscle and a narrow opening"}>
      <defs>
        <radialGradient id={`${uid}-tissue`} cx="40%" cy="30%"><stop stopColor="#f0d7c8" /><stop offset=".7" stopColor="#d0a18f" /><stop offset="1" stopColor="#926157" /></radialGradient>
        <radialGradient id={`${uid}-muscle`} cx="35%" cy="30%"><stop stopColor="#d9a294" /><stop offset=".7" stopColor="#ae7064" /><stop offset="1" stopColor="#7f4d48" /></radialGradient>
        <radialGradient id={`${uid}-lumen`} cx="40%" cy="65%"><stop stopColor="#8dada6" /><stop offset=".75" stopColor="#415d5e" /><stop offset="1" stopColor="#263c40" /></radialGradient>
      </defs>
      <circle cx="100" cy="100" r="84" fill={`url(#${uid}-tissue)`} stroke="#c49989" strokeWidth="1.5" />
      <circle cx="100" cy="100" r="70" fill={`url(#${uid}-muscle)`} stroke="#e6b9a9" strokeWidth="3" />
      {Array.from({ length: 32 }, (_, i) => <ellipse key={i} cx="100" cy="37" rx="1.6" ry="4.5" fill="#f4c7b4" opacity=".45" transform={`rotate(${i * 11.25} 100 100)`} />)}
      <path className="airway-lumen" d={lumen} fill={`url(#${uid}-lumen)`} stroke="#e7b6a5" strokeWidth={after ? 11 : 17} strokeLinejoin="round" />
      {Array.from({ length: 9 }, (_, i) => <path key={i} d="M100 20 Q104 25 101 31" stroke="#8c514d" opacity=".35" strokeWidth="1.5" fill="none" transform={`rotate(${i * 40} 100 100)`} />)}
    </svg>
    <figcaption>Airway smooth muscle <span>Magnified cross-section · schematic</span></figcaption>
  </figure>;
}

export function MechanismAnimation({ med }: { med: Medication }) {
  const [after, setAfter] = useState(false);
  const airway = med.id === "albuterol";
  const liver = med.id === "metformin";
  return <section className="mechanism card">
    <div className="section-heading"><div><span className="eyebrow">A CLOSER LOOK</span><h3>{airway ? "A little more room to breathe" : liver ? "A closer look at glucose" : "Turning down acid production"}</h3></div><span className="small-pill">Interactive</span></div>
    <div className={`mechanism-scene anatomical-mechanism ${after ? "after" : ""}`}>
      <div className={`mechanism-anatomy ${airway ? "with-airway-detail" : ""}`}>
        <div className="mechanism-organ-render"><AnatomicalGraphic organ={med.organ} /><span>{med.organ} <small>Anatomical atlas</small></span></div>
        {airway ? <AirwayDetail after={after} /> : <div className="mechanism-output" aria-label={`${after ? "Reduced" : "Baseline"} ${liver ? "glucose release" : "acid secretion"}`}>
          <span className="mechanism-output-label">{liver ? "Glucose → bloodstream" : "Acid → stomach lumen"}</span>
          <div className="mechanism-output-particles" aria-hidden="true">{Array.from({ length: 9 }, (_, i) => <i key={i} className={after && i > 2 ? "reduced" : ""} style={{ animationDelay: `${i * .18}s` }} />)}</div>
          <span className="mechanism-output-caption">{after ? "Reduced output" : "Baseline output"} · illustrative</span>
        </div>}
      </div>
      <div className="scene-copy" aria-live="polite"><span className="state-number">0{after ? "2" : "1"} / {airway ? "THE AIRWAY" : med.organ.toUpperCase()}</span>
        <h4>{airway ? after ? "Muscles relax. Airways widen." : "Tight muscles. Narrow airways." : liver ? after ? "Less glucose released." : "The liver releases glucose." : after ? "Less acid secreted." : "Proton pumps release acid."}</h4>
        <p>{airway ? after ? "Relaxed smooth muscle creates more space for air to move through." : "When the muscles around an airway tighten, the opening becomes smaller." : liver ? "Metformin helps reduce glucose production in the liver." : "Omeprazole inhibits proton pumps in the stomach lining, reducing acid secretion."}</p>
        <span className="scene-key"><i />{after ? airway ? "After bronchodilation" : "Mechanism illustrated" : airway ? "Before treatment" : "Before medication effect"}</span>
      </div>
    </div>
    <div className="mechanism-controls"><button className="primary" onClick={() => setAfter(!after)}>{after ? <RotateCcw size={16} /> : <ArrowRight size={16} />}{" "}{after ? "Reset illustration" : airway ? "Show bronchodilation" : "Show medication effect"}</button><span>Explore the change at your own pace</span></div>
    <p className="fine-print">Organ artwork matches the 3D atlas. Magnified details and output markers illustrate the mechanism, not individual treatment results or relative effect sizes.</p>
  </section>;
}
