import { useState } from "react";
import { ArrowRight, RotateCcw, Wind } from "lucide-react";
import type { Medication } from "../data/medications";
export function MechanismAnimation({ med }: { med: Medication }) {
  const [after, setAfter] = useState(false);
  return (
    <section className="mechanism card">
      <div className="section-heading">
        <div>
          <span className="eyebrow">A CLOSER LOOK</span>
          <h3>
            {med.id === "albuterol"
              ? "A little more room to breathe"
              : med.id === "metformin"
                ? "A closer look at glucose"
                : "Turning down acid production"}
          </h3>
        </div>
        <span className="small-pill">Interactive</span>
      </div>
      <div className={`mechanism-scene ${after ? "after" : ""}`}>
        {med.id === "albuterol" ? (
          <>
            <div className="airway">
              <div className="airway-inner">
                <Wind size={38} />
                <div className="flow-line" />
                <div className="flow-line second" />
              </div>
              <span className="muscle-label">Airway smooth muscle</span>
            </div>
            <div className="scene-copy">
              <span className="state-number">
                0{after ? "2" : "1"} / THE AIRWAY
              </span>
              <h4>
                {after
                  ? "Muscles relax. Airways widen."
                  : "Tight muscles. Narrow airways."}
              </h4>
              <p>
                {after
                  ? "Relaxed smooth muscle creates more space for air to move through."
                  : "When the muscles around an airway tighten, the opening becomes smaller."}
              </p>
              <span className="scene-key">
                <i />
                {after ? "After bronchodilation" : "Before treatment"}
              </span>
            </div>
          </>
        ) : (
          <>
            <div className={`process-organ ${med.id}`}>
              <span>{med.organ}</span>
              <div className="particles">
                {Array.from({ length: after ? 3 : 9 }, (_, i) => (
                  <i key={i} style={{ animationDelay: `${i * 0.18}s` }} />
                ))}
              </div>
              <span className="output-label">
                {med.id === "metformin"
                  ? "Glucose → bloodstream"
                  : "Acid → stomach"}
              </span>
            </div>
            <div className="scene-copy">
              <span className="state-number">
                0{after ? "2" : "1"} / {med.organ.toUpperCase()}
              </span>
              <h4>
                {med.id === "metformin"
                  ? after
                    ? "Less glucose released."
                    : "The liver releases glucose."
                  : after
                    ? "Less acid secreted."
                    : "Proton pumps release acid."}
              </h4>
              <p>
                {med.id === "metformin"
                  ? "Metformin helps reduce glucose production in the liver."
                  : "Omeprazole inhibits proton pumps in the stomach lining, reducing acid secretion."}
              </p>
              <span className="scene-key">
                <i />
                {after ? "Mechanism illustrated" : "Before medication effect"}
              </span>
            </div>
          </>
        )}
      </div>
      <div className="mechanism-controls">
        <button className="primary" onClick={() => setAfter(!after)}>
          {after ? <RotateCcw size={16} /> : <ArrowRight size={16} />}{" "}
          {after
            ? "Reset illustration"
            : med.id === "albuterol"
              ? "Show bronchodilation"
              : "Show medication effect"}
        </button>
        <span>Explore the change at your own pace</span>
      </div>
      <p className="fine-print">
        Simplified mechanism, not a prediction of individual treatment results.
      </p>
    </section>
  );
}
