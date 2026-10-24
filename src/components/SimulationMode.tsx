import { useEffect, useState } from "react";
import { medications } from "../data/medications";
import { conditionTreatments } from "../data/conditionTreatments";
import { medicinesForAilment } from "../data/ailments";
import { medicineMaps } from "../data/anatomy";
import { mechanismGuides } from "../data/mechanisms";
import { AnatomyViewer } from "./AnatomyViewer";
import { AirwayMechanism } from "./AirwayMechanism";

const stages = ["Baseline", "Site of action", "Mechanism", "Wider effects & limits"];
export function SimulationMode({ medicationId, ailment }: { medicationId: string; ailment: string }) {
  const [stage, setStage] = useState(0);
  const [running, setRunning] = useState(false);
  const [active, setActive] = useState(false);
  const [viewRevision, setViewRevision] = useState(0);
  const [mechanismProgress, setMechanismProgress] = useState(0);
  useEffect(() => { setMechanismProgress(active && stage >= 2 ? 100 : 0); }, [stage, active]);
  const med = medications.find((entry) => entry.id === medicationId);
  const eligible = medicinesForAilment(ailment).some((entry) => entry.id === medicationId);
  const profile = medicineMaps.find((entry) => entry.id === medicationId);
  const guide = med ? typeof med.mechanism === "string" ? mechanismGuides[med.mechanism] : med.mechanism : null;
  useEffect(() => {
    if (!running || !eligible) return;
    const timer = window.setTimeout(() => { if (stage < 3) setStage(stage + 1); else setRunning(false); }, 2400);
    return () => window.clearTimeout(timer);
  }, [running, stage, eligible]);
  if (!eligible || !med || !profile || !guide) return null;
  const reset = () => { setRunning(false); setActive(true); setStage(0); setViewRevision((value) => value + 1); };
  return <section className="simulation-embedded" aria-label="Medication simulation">
    <div className="section-heading"><div><span className="eyebrow">3. RUN THE SIMULATION</span><h3>Follow {med.name}'s mechanism.</h3><p>{ailment} &middot; documented educational example</p></div></div>
    <p className="simulation-scope">An educational walkthrough, not a prediction of your response. No dose, treatment timing, interactions, or individual outcomes are modeled. Playback time is illustration pacing.</p>
    <div className="simulation-controls"><button className="primary" onClick={() => { if (!active) setViewRevision((value) => value + 1); setActive(true); if (stage === 3) setStage(0); setRunning(!running); }}>{running ? "Pause simulation" : "Run simulation"}</button><button disabled={active && stage === 3} onClick={() => { if (!active) setViewRevision((value) => value + 1); setActive(true); setRunning(false); setStage(Math.min(stage + 1, 3)); }}>Next stage</button><button onClick={reset}>Reset simulation</button><span role="status">{!active ? "Anatomy preview" : running ? "Playing" : stage === 3 ? "Walkthrough complete" : "Paused"}{active && <> &middot; Stage {stage + 1} of 4</>}</span></div>
    {active && <><ol className="simulation-timeline" aria-label="Simulation stages">{stages.map((label, index) => <li key={label} aria-current={index === stage ? "step" : undefined}><button onClick={() => { setRunning(false); setStage(index); }}><span>{index + 1}</span>{label}</button></li>)}</ol>
      <section className="simulation-explanation card" aria-live="polite"><span className="eyebrow">{stages[stage]}</span><h3>{stage === 0 ? guide.before : stage === 1 ? guide.target : stage === 2 ? guide.after : "The whole person matters."}</h3><p>{stage === 0 ? `${guide.input}. The diagram shows the reference before highlighting mapped connections.` : stage === 1 ? `${med.simple} ${profile.organs.length || profile.systems.length ? "Mapped structures highlight where geometry is available; microscopic targets may not be visible." : "This target is not mapped in the current body reference."}` : stage === 2 ? guide.explanation : med.safety}</p><p>{conditionTreatments[ailment].context}</p><a href={med.source} target="_blank" rel="noreferrer">{med.sourceLabel ?? "MedlinePlus"}: {med.name}</a></section></>}
    <div className={active && stage >= 2 && (med.id === "albuterol" || med.id === "tiotropium") ? "explorer-mechanism-connection" : ""}>
      <AnatomyViewer medicineProfile={profile} showMedicineControls={!active} showMedicineSelector={false} autoFocusTarget focusSignal={viewRevision} simulationStage={active ? stage > 0 ? "target" : "baseline" : undefined} />
      {active && stage >= 2 && (med.id === "albuterol" || med.id === "tiotropium") && <AirwayMechanism medicine={med.id} progress={mechanismProgress} onProgressChange={(value) => { setRunning(false); setMechanismProgress(value); }} />}
    </div>
  </section>;
}
