import { useState } from "react";
import { ArrowRight, Ban, CheckCircle2, RotateCcw, Wind } from "lucide-react";
import type { Medication } from "../data/medications";
import { mechanismGuides } from "../data/mechanisms";

export function MechanismAnimation({ med }: { med: Medication }) {
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
      <div className={`mechanism-scene ${after ? "after" : ""}`}>
        {med.mechanism === "airway" ? (
          <div className="airway">
            <div className="airway-inner">
              <Wind size={38} />
              <div className="flow-line" />
              <div className="flow-line second" />
            </div>
            <span className="muscle-label">Airway smooth muscle</span>
          </div>
        ) : particleDiagram ? (
          <div
            className={`process-organ ${med.id}`}
            aria-label={guide.output[after ? 1 : 0]}
          >
            <span>{med.organ}</span>
            <div className="particles" aria-hidden="true">
              {Array.from({ length: after ? 3 : 9 }, (_, i) => (
                <i key={i} style={{ animationDelay: `${i * 0.18}s` }} />
              ))}
            </div>
            <span className="output-label">{guide.output[after ? 1 : 0]}</span>
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
