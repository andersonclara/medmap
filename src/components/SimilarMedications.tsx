import { ArrowRight, GitCompareArrows } from "lucide-react";
import type { Medication } from "../types/medication";
import {
  comparisonHref,
  getSimilarMedications,
  relationshipLabels,
} from "../data/medicationRelationships";
export function SimilarMedications({ medication }: { medication: Medication }) {
  const suggestions = getSimilarMedications(medication.id);
  return (
    <section
      className="similar-medications card"
      aria-label="Similar medicines"
    >
      <div className="section-heading">
        <div>
          <span className="eyebrow">MAKE THE CONNECTION</span>
          <h3>Similar medicines, different stories.</h3>
        </div>
        <GitCompareArrows size={23} />
      </div>
      <p className="similar-intro">
        Explore related guides and see how their roles differ. These connections
        do not mean medicines are interchangeable.
      </p>
      {suggestions.length ? (
        <div className="similar-grid">
          {suggestions.map(({ medication: peer, relationships }) => (
            <article className="similar-card" key={peer.id}>
              <span className="relationship-badge">
                {relationshipLabels[relationships[0].kind]}
              </span>
              <h4>
                <a href={`#explore/${peer.id}`}>{peer.name}</a>
              </h4>
              <p className="similar-category">{peer.category}</p>
              <p className="similar-reason">{relationships[0].title}</p>
              <a
                className="compare-card-link"
                href={comparisonHref(medication.id, peer.id)}
                aria-label={`Compare ${medication.name} with ${peer.name}`}
              >
                Compare <ArrowRight size={15} />
              </a>
            </article>
          ))}
        </div>
      ) : (
        <div className="similar-empty">
          <p>
            No close related guides are currently recorded for {medication.name}{" "}
            in this library. Sharing an organ alone is not enough to suggest a
            medicine.
          </p>
        </div>
      )}
      <a className="comparison-text-link" href={comparisonHref(medication.id)}>
        Choose another medicine to compare <ArrowRight size={14} />
      </a>
    </section>
  );
}
