import { Info, Crosshair } from "lucide-react";
export function TargetRegion({
  target,
  category,
}: {
  target: string;
  category: string;
}) {
  return (
    <section
      className="target-region card"
      aria-label={`Educational target: ${target}`}
    >
      <span className="eyebrow">TARGET IN FOCUS</span>
      <div className="target-schematic">
        <Crosshair size={72} strokeWidth={1} />
        <span>SCHEMATIC TARGET</span>
      </div>
      <h3>{target}</h3>
      <span className="small-pill">{category}</span>
      <p>
        This target is not represented by a specific organ in the current body
        map. Explore the pathway below for a simplified view of how the medicine
        acts.
      </p>
      <div className="target-region-note">
        <Info size={16} /> Target area, not an anatomical illustration.
      </div>
    </section>
  );
}
