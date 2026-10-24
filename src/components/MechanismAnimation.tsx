import { useState } from "react";
import { ArrowRight, Ban, CheckCircle2, RotateCcw, Wind } from "lucide-react";
import type { Medication } from "../data/medications";
import { AnatomicalGraphic } from "./AnatomicalGraphic";
import { mechanismGuides } from "../data/mechanisms";
import { AirwayCrossSection } from "./AirwayMechanism";

function AirwayDetail({ after }: { after: boolean }) { return <AirwayCrossSection progress={after ? 100 : 0} />; }

function AnatomicalMechanism({ med }: { med: Medication }) {
  const [after, setAfter] = useState(false);
  const airway = med.id === "albuterol";
  const liver = med.id === "metformin";
  return <section className="mechanism card">
    <div className="section-heading"><div><span className="eyebrow">A CLOSER LOOK</span><h3>{airway ? "A little more room to breathe" : liver ? "A closer look at glucose" : "Turning down acid production"}</h3></div><span className="small-pill">Interactive</span></div>
    <div className={`mechanism-scene anatomical-mechanism ${after ? "after" : ""}`}>
      <div className={`mechanism-anatomy ${airway ? "with-airway-detail" : ""}`}>
        <div className="mechanism-organ-render"><AnatomicalGraphic organ={med.organ!} /><span>{med.organ} <small>Anatomical atlas</small></span></div>
        {airway ? <AirwayDetail after={after} /> : <div className="mechanism-output" aria-label={`${after ? "Reduced" : "Baseline"} ${liver ? "glucose release" : "acid secretion"}`}>
          <span className="mechanism-output-label">{liver ? "Glucose → bloodstream" : "Acid → stomach lumen"}</span>
          <div className="mechanism-output-particles" aria-hidden="true">{Array.from({ length: 9 }, (_, i) => <i key={i} className={after && i > 2 ? "reduced" : ""} style={{ animationDelay: `${i * .18}s` }} />)}</div>
          <span className="mechanism-output-caption">{after ? "Reduced output" : "Baseline output"} · illustrative</span>
        </div>}
      </div>
      <div className="scene-copy" aria-live="polite"><span className="state-number">0{after ? "2" : "1"} / {airway ? "THE AIRWAY" : med.organ!.toUpperCase()}</span>
        <h4>{airway ? after ? "Muscles relax. Airways widen." : "Tight muscles. Narrow airways." : liver ? after ? "Less glucose released." : "The liver releases glucose." : after ? "Less acid secreted." : "Proton pumps release acid."}</h4>
        <p>{airway ? after ? "Relaxed smooth muscle creates more space for air to move through." : "When the muscles around an airway tighten, the opening becomes smaller." : liver ? "Metformin helps reduce glucose production in the liver." : "Omeprazole inhibits proton pumps in the stomach lining, reducing acid secretion."}</p>
        <span className="scene-key"><i />{after ? airway ? "After bronchodilation" : "Mechanism illustrated" : airway ? "Before treatment" : "Before medication effect"}</span>
      </div>
    </div>
    <div className="mechanism-controls"><button className="primary" onClick={() => setAfter(!after)}>{after ? <RotateCcw size={16} /> : <ArrowRight size={16} />}{" "}{after ? "Reset illustration" : airway ? "Show bronchodilation" : "Show medication effect"}</button><span>Explore the change at your own pace</span></div>
    <p className="fine-print">Organ artwork matches the 3D atlas. Magnified details and output markers illustrate the mechanism, not individual treatment results or relative effect sizes.</p>
  </section>;
}

function PathwayMechanism({ med }: { med: Medication }) {
  const [after, setAfter] = useState(false);
  const guide =
    typeof med.mechanism === "string"
      ? mechanismGuides[med.mechanism]
      : med.mechanism;
  const action = guide.action ?? "inhibits";
  const stateLabel = {
    inhibits: "Inhibited by medication",
    supports: "Supported by medication",
    activates: "Activated by medication",
    modifies: "Modified by medication",
  }[action];
  const particleDiagram =
    med.mechanism === "glucose" || med.mechanism === "acid";
  return (
    <section className="mechanism card">
      <div className="section-heading">
        <div>
          <span className="eyebrow">A CLOSER LOOK</span>
          <h3>{guide.title}</h3>
        </div>
        <span className="small-pill">Interactive</span>
      </div>
      <div
        className={`mechanism-scene ${med.mechanism === "airway" || particleDiagram ? "anatomical-mechanism" : ""} ${after ? "after" : ""}`}
      >
        {med.mechanism === "airway" ? (
          <div className="mechanism-anatomy with-airway-detail">
            <div className="mechanism-organ-render">
              <AnatomicalGraphic organ="Lungs" />
              <span>
                Lungs <small>Anatomical atlas</small>
              </span>
            </div>
            <AirwayDetail after={after} />
          </div>
        ) : particleDiagram ? (
          <div className="mechanism-anatomy">
            <div className="mechanism-organ-render">
              <AnatomicalGraphic organ={med.organ!} />
              <span>
                {med.organ}
                <small>Anatomical atlas</small>
              </span>
            </div>
            <div
              className="mechanism-output"
              aria-label={guide.output[after ? 1 : 0]}
            >
              <span className="mechanism-output-label">
                {guide.output[after ? 1 : 0]}
              </span>
              <div className="mechanism-output-particles" aria-hidden="true">
                {Array.from({ length: 9 }, (_, i) => (
                  <i
                    key={i}
                    className={after && i > 2 ? "reduced" : ""}
                    style={{ animationDelay: `${i * 0.18}s` }}
                  />
                ))}
              </div>
              <span className="mechanism-output-caption">
                Illustrative output, not measured quantities
              </span>
            </div>
          </div>
        ) : (
          <div
            className={`pathway ${typeof med.mechanism === "string" ? med.mechanism : "custom"}`}
            role="img"
            aria-label={`${guide.input}. ${after ? "Medication " + action : "Baseline"} ${guide.target}. ${guide.output[after ? 1 : 0]}.`}
          >
            <span className="pathway-input">{guide.input}</span>
            <div className="signal-track" aria-hidden="true">
              {Array.from({ length: 4 }, (_, i) => (
                <i key={i} style={{ animationDelay: `${i * 0.3}s` }} />
              ))}
            </div>
            <div className="pathway-target">
              <span className="target-glyph" aria-hidden="true">
                {after ? (
                  action === "inhibits" ? (
                    <Ban size={30} />
                  ) : (
                    <CheckCircle2 size={30} />
                  )
                ) : (
                  <ArrowRight size={30} />
                )}
              </span>
              <strong>{guide.target}</strong>
              <span>{after ? stateLabel : "Baseline pathway"}</span>
            </div>
            <div className="pathway-arrow" aria-hidden="true">
              <ArrowRight size={20} />
            </div>
            <span className="pathway-output">
              {guide.output[after ? 1 : 0]}
            </span>
          </div>
        )}
        <div className="scene-copy" aria-live="polite">
          <span className="state-number">
            0{after ? "2" : "1"} / {guide.focus.toUpperCase()}
          </span>
          <h4>{after ? guide.after : guide.before}</h4>
          <p>
            {med.mechanism === "airway" && !after
              ? "When the muscles around an airway tighten, the opening becomes smaller."
              : guide.explanation}
          </p>
          <span className="scene-key">
            <i />
            {after
              ? med.mechanism === "airway"
                ? "After bronchodilation"
                : "Mechanism illustrated"
              : med.mechanism === "airway"
                ? "Before treatment"
                : "Before medication effect"}
          </span>
        </div>
      </div>
      <div className="mechanism-controls">
        <button
          className="primary"
          aria-pressed={after}
          onClick={() => setAfter(!after)}
        >
          {after ? <RotateCcw size={16} /> : <ArrowRight size={16} />}{" "}
          {after
            ? "Reset illustration"
            : med.mechanism === "airway"
              ? "Show bronchodilation"
              : "Show medication effect"}
        </button>
        <span>Explore the change at your own pace</span>
      </div>
      <p className="fine-print">
        Simplified mechanism, not a prediction of individual treatment results.
        Particle counts and animation speeds do not represent measured amounts
        or treatment timing.
      </p>
    </section>
  );
}

export function MechanismAnimation({med}: {med: Medication}) { return ["albuterol", "metformin", "omeprazole"].includes(med.id) ? <AnatomicalMechanism med={med}/> : <PathwayMechanism med={med}/>; }
