import type { Organ } from "../data/medications";
import { hasReferenceOrgan } from "../data/referenceAtlas";

/** Static renders of the same licensed meshes, materials, and lights as the 3D atlas. */
export function AnatomicalGraphic({ organ, className = "", decorative = false, eager = false }: {
  organ: Organ | "Body"; className?: string; decorative?: boolean; eager?: boolean;
}) {
  if (organ !== "Body" && !hasReferenceOrgan("male", organ)) return <span className={`anatomical-graphic unavailable-organ ${className}`} role={decorative ? undefined : "img"} aria-label={decorative ? undefined : `${organ} model not included in this reference`} aria-hidden={decorative || undefined}><strong>{organ}</strong><small>Model unavailable</small></span>;
  return <img
    className={`anatomical-graphic ${className}`}
    src={`${import.meta.env.BASE_URL}images/atlas/${organ.toLowerCase()}.png`}
    alt={decorative ? "" : organ === "Body" ? "Anatomical view of the human body" : `Anatomical view of the ${organ.toLowerCase()}`}
    aria-hidden={decorative || undefined}
    width={organ === "Body" ? 640 : 512}
    height={organ === "Body" ? 960 : 512}
    loading={eager ? "eager" : "lazy"}
    decoding="async"
  />;
}
