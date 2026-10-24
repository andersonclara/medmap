import { lazy, Suspense, useId, useRef, useState } from "react";
import { ChevronDown, Info, Layers, RotateCcw, Rotate3D, ZoomIn, ZoomOut } from "lucide-react";
import { layerNames, medicineMaps, systemNames, type BodySystem, type BodyVariant, type Layer } from "../data/anatomy";
import { organInfo, type Organ } from "../data/medications";
import type { ViewAction } from "./AnatomyScene";
import { OrganSearch } from "./OrganSearch";
import type { OrganSearchEntry } from "../data/organSearch";
import { hasReferenceOrgan, referenceAtlas } from "../data/referenceAtlas";

const AnatomyScene = lazy(() => import("./AnatomyScene"));
const initialLayers: Record<Layer, number> = { skeletal: .5, joints: 0, muscular: 0, visceral: 1, cardiovascular: 1, nervous: 1, lymphatic: 0 };
const presets: { name: string; layers: Partial<Record<Layer, number>> }[] = [
  { name: "Internal organs", layers: { skeletal: .5, visceral: 1, cardiovascular: 1, nervous: 1 } },
  { name: "Muscle & bone", layers: { skeletal: 1, muscular: .45, joints: 1 } },
  { name: "Circulation", layers: { skeletal: .12, cardiovascular: 1 } },
  { name: "Nervous system", layers: { skeletal: .12, nervous: 1 } },
];
function savedBodyVariant(): BodyVariant {
  try { return sessionStorage.getItem("medmap-body-variant") === "female" ? "female" : "male"; }
  catch { return "male"; }
}

export function AnatomyViewer({ target = "Lungs", compact = false, medicationId, onGuideSelect }: {
  target?: Organ; compact?: boolean; medicationId?: string; onGuideSelect?: (id: string) => void;
}) {
  const uid = useId();
  const [bodyVariant, setBodyVariant] = useState<BodyVariant>(savedBodyVariant);
  const [hoveredOrgan, setHoveredOrgan] = useState<Organ | null>(null);
  const searchSequence = useRef(0);
  const [searchReset, setSearchReset] = useState(0);
  const [focusRequest, setFocusRequest] = useState<{ target: OrganSearchEntry; sequence: number } | null>(null);
  const initialMedicine = medicineMaps.find((med) => med.id === medicationId) ?? medicineMaps.find((med) => med.organs.includes(target)) ?? medicineMaps[0];
  const interactive = true;
  const [expanded, setExpanded] = useState(!compact);
  const [layers, setLayers] = useState(() => ({ ...initialLayers, ...Object.fromEntries(initialMedicine.layers.map((layer) => [layer, 1])) }));
  const [system, setSystem] = useState<BodySystem>("all");
  const [medicineId, setMedicineId] = useState(medicationId ?? medicineMaps.find((med) => med.organs.includes(target))?.id ?? "albuterol");
  const [showEffects, setShowEffects] = useState(true);
  const [selected, setSelected] = useState<Organ | null>(null);
  const [structure, setStructure] = useState<string | null>(null);
  const [hiddenStructures, setHiddenStructures] = useState<string[]>([]);
  const [membranes, setMembranes] = useState(false);
  const [command, setCommand] = useState({ action: "front" as ViewAction, sequence: 0 });
  const medicine = medicineMaps.find((med) => med.id === medicineId)!;
  const missingTargets = medicine.organs.filter((organ) => !hasReferenceOrgan(bodyVariant, organ));
  const act = (action: ViewAction) => setCommand((value) => ({ action, sequence: value.sequence + 1 }));
  function chooseMedicine(id: string) {
    const next = medicineMaps.find((med) => med.id === id)!;
    setMedicineId(id); setSelected(null); setStructure(null); setFocusRequest(null); setSystem("all"); setShowEffects(true);
    setHiddenStructures([]); setMembranes(false); act("reset");
    setLayers({ ...initialLayers, ...Object.fromEntries(next.layers.map((layer) => [layer, 1])) });
    if (["albuterol", "metformin", "omeprazole"].includes(id)) onGuideSelect?.(id);
  }
  function inspectOrgan(entry: OrganSearchEntry) {
    setSelected(entry.organ ?? null); setStructure(null); setHoveredOrgan(null);
    setHiddenStructures([]); setMembranes(false);
    setLayers((current) => ({ ...current, [entry.layer]: 1 }));
    setSystem(entry.system);
    setFocusRequest({ target: entry, sequence: ++searchSequence.current });
  }
  return <section className={`anatomy anatomy-explorer ${compact ? "compact" : ""}`} aria-label="Interactive body atlas">
    <div className="anatomy-top"><span className="eyebrow">THE HUMAN BODY · 3D ATLAS</span><span className="live-dot">Interactive view</span></div>
    {!compact && <div className="atlas-heading"><h3>Explore beneath the surface.</h3><p>Rotate the body. Reveal a layer. Follow a medicine’s connection.</p></div>}
    <div className="atlas-body-selector" role="group" aria-label="Reference anatomy">
      <span>Reference anatomy</span>{(["male", "female"] as const).map((variant) => <button key={variant} aria-pressed={bodyVariant === variant} onClick={() => {
        if (variant === bodyVariant) return;
        setBodyVariant(variant); setSelected(null); setStructure(null); setFocusRequest(null); setHoveredOrgan(null); setHiddenStructures([]);
        try { sessionStorage.setItem("medmap-body-variant", variant); } catch { /* The selection still works without storage. */ }
      }}>{variant === "male" ? "Male" : "Female"}</button>)}
    </div>
    <OrganSearch key={`${bodyVariant}-${searchReset}`} variant={bodyVariant} onSelect={inspectOrgan} />
    <p className="atlas-source-summary">{referenceAtlas[bodyVariant].ctBoneCount} CT-derived skeletal meshes &middot; BoneHub + Human Reference Atlas</p>
    <details className="atlas-coverage">
      <summary>Partial anatomical reference &middot; model coverage</summary>
      <p>Arms and hands are reposed toward standard anatomical position, with thumbs outward and feet facing forward. The source scans have missing anatomy.</p>
      <p><strong>Included organs and structures:</strong> {referenceAtlas[bodyVariant].coverage.included.join(", ")}.</p>
      <p><strong>Not modeled:</strong> {referenceAtlas[bodyVariant].coverage.missing.join(", ")}.</p>
      <p><strong>Partial coverage:</strong> {referenceAtlas[bodyVariant].coverage.partial.join("; ")}. Skin and an enclosing body surface are omitted from this cutaway.</p>
      <p>A complete anatomical model requires additional source geometry. This checklist covers major structures, not every structure in the human body.</p>
    </details>
    <div className="atlas-workspace">
      <div className="atlas-viewport">
        <Suspense fallback={<div className="atlas-loading" role="status">Opening the 3D atlas…</div>}>
          <AnatomyScene layers={layers} system={system} medicine={showEffects ? medicine : null} selected={selected} selectedStructure={structure} command={command} hiddenStructures={hiddenStructures} membranes={membranes} hoveredOrgan={hoveredOrgan} bodyVariant={bodyVariant} focusRequest={focusRequest}
            onSelect={(name, organ) => { setFocusRequest(null); setStructure(name); setSelected(organ); }}
            onDeselect={() => { setSelected(null); setStructure(null); setFocusRequest(null); setHoveredOrgan(null); setSystem("all"); setSearchReset((value) => value + 1); }} />
        </Suspense>
        {interactive && <>
          <div className="atlas-views" aria-label="Body orientation">{(["front", "back", "left", "right"] as const).map((view) => <button key={view} onClick={() => act(view)} aria-label={`View body from ${view}`}>{view}</button>)}</div>
          <div className="atlas-zoom"><button aria-label="Zoom in on body" onClick={() => act("zoomIn")}><ZoomIn size={17} /></button><button aria-label="Zoom out of body" onClick={() => act("zoomOut")}><ZoomOut size={17} /></button><button aria-label="Reset body view" onClick={() => act("reset")}><RotateCcw size={16} /></button></div>
          <span className="atlas-gesture"><Rotate3D size={13} /> Click to look closer · Drag to rotate</span>
        </>}
        <span className="atlas-orientation">{systemNames[system]}</span>
        {showEffects && (medicine.organs.length > 0 || medicine.systems.length > 0) && <div className="atlas-medication-key" aria-live="polite"><i aria-hidden="true" /><span><strong>{medicine.name}</strong><small>{missingTargets.length ? `${missingTargets.join(", ")} not included in this reference` : `${medicine.organs.length ? medicine.organs.join(", ") : medicine.systems.map((name) => systemNames[name]).join(", ")} · medicine target`}</small></span></div>}
      </div>
      {interactive && <div className="atlas-controls">
        <button className="atlas-controls-toggle" aria-expanded={expanded} aria-controls={`${uid}-controls`} onClick={() => setExpanded(!expanded)}><Layers size={16} /> Layers & systems <ChevronDown size={15} /></button>
        {expanded && <div id={`${uid}-controls`}>
          <label className="atlas-select" htmlFor={`${uid}-system`}>Isolate a body system<select id={`${uid}-system`} value={system} onChange={(event) => {
            const next = event.target.value as BodySystem;
            setSystem(next); setSelected(null); setStructure(null); setFocusRequest(null);
            if (next !== "all") {
              const layer: Layer = ({ respiratory: "visceral", digestive: "visceral", urinary: "visceral", endocrine: "visceral", integumentary: "visceral", reproductive: "visceral", cardiovascular: "cardiovascular", nervous: "nervous", lymphatic: "lymphatic", musculoskeletal: "skeletal" } as const)[next];
              setLayers((current) => ({ ...current, [layer]: 1 }));
            }
          }}>{Object.entries(systemNames).filter(([value]) => value !== "integumentary").map(([value, name]) => <option key={value} value={value}>{name}</option>)}</select></label>
          <div className="atlas-presets" aria-label="Anatomical layer presets">{presets.map((preset) => <button key={preset.name} onClick={() => { setSystem("all"); setSelected(null); setStructure(null); setFocusRequest(null); setLayers({ skeletal: 0, joints: 0, muscular: 0, visceral: 0, cardiovascular: 0, nervous: 0, lymphatic: 0, ...preset.layers }); }}>{preset.name}</button>)}</div>
          <fieldset className="atlas-layers"><legend>Visible layers <span>Adjust transparency</span></legend>{Object.entries(layerNames).map(([key, name]) => {
            const layer = key as Layer;
            return <div className="atlas-layer" key={layer}>
              <label><input type="checkbox" checked={layers[layer] > 0} onChange={(event) => setLayers((current) => ({ ...current, [layer]: event.target.checked ? 1 : 0 }))} /><span>{name}</span></label>
              <input type="range" min="0" max="100" step="5" value={Math.round(layers[layer] * 100)} aria-label={`${name} opacity`} onChange={(event) => setLayers((current) => ({ ...current, [layer]: Number(event.target.value) / 100 }))} />
              <output>{Math.round(layers[layer] * 100)}%</output>
            </div>;
          })}</fieldset>
          <label className="atlas-membranes"><input type="checkbox" checked={membranes} onChange={(event) => setMembranes(event.target.checked)} /> Show covering membranes & fascia</label>
          {!!hiddenStructures.length && <button className="atlas-reset-layers" onClick={() => setHiddenStructures([])}>Restore hidden structures ({hiddenStructures.length})</button>}
          <button className="atlas-reset-layers" onClick={() => { setLayers(initialLayers); setSystem("all"); setSelected(null); setStructure(null); setFocusRequest(null); setHiddenStructures([]); setMembranes(false); act("reset"); }}>Reset layers & view</button>
        </div>}
      </div>}
    </div>
    {interactive && (!compact || expanded) && <>
      <div className="anatomy-caption" aria-live="polite"><Info size={15} /><span>{selected ? <><strong>{selected}.</strong> {organInfo[selected]}{structure && <small className="atlas-structure">Selected structure: {structure}</small>}</> : structure ? <><strong>{structure}.</strong> Use the layers to reveal nearby structures.</> : focusRequest ? <><strong>{focusRequest.target.label}.</strong> Selected in the 3D atlas.</> : "Search for an organ or click a structure in the 3D atlas to inspect it."}{structure && <button className="atlas-hide-structure" onClick={() => { setHiddenStructures((current) => [...current, structure]); setStructure(null); setSelected(null); }}>Hide this structure</button>}</span></div>
      <div className="atlas-medicine">
        <span className="eyebrow">MEDICINES ACROSS THE BODY</span>
        <label className="atlas-select" htmlFor={`${uid}-medicine`}>Preview a medicine class<select id={`${uid}-medicine`} value={medicineId} onChange={(event) => chooseMedicine(event.target.value)}>{medicineMaps.map((med) => <option key={med.id} value={med.id}>{med.category} · {med.name}</option>)}</select></label>
        <label className="atlas-highlight-toggle"><input type="checkbox" checked={showEffects} onChange={(event) => setShowEffects(event.target.checked)} /> Highlight representative sites of action</label>
        <div className="atlas-effect" aria-live="polite"><strong>{medicine.name} <span>{medicine.category}</span></strong><p>{medicine.effect}</p><p className="atlas-effect-context">{medicine.context}</p><button onClick={() => { setSystem("all"); setLayers({ ...initialLayers, ...Object.fromEntries(medicine.layers.map((layer) => [layer, 1])) }); setShowEffects(true); setSelected(null); setStructure(null); setFocusRequest(null); setHiddenStructures([]); setMembranes(false); act("front"); }}>Show medicine targets</button><a href={medicine.source} target="_blank" rel="noreferrer">Read the MedlinePlus guide ↗</a></div>
        <p className="atlas-scope">{medicineMaps.length} representative medicines. Highlights show anatomical connections, not drug distribution, dose response, or every possible effect.</p>
      </div>
      <details className="atlas-credits"><summary>Atlas sources & credits</summary><p>Both references use the same free pipeline: BoneHub CT-derived skeletons and Human Reference Atlas v1.10 organ sets, based on the NLM Visible Human Project. Male: 142 skeletal meshes. Female: 143 skeletal meshes. The female skeleton is independently segmented, not borrowed from the male model.</p><p>BoneHub: Seyed Hamidreza Alavi and Malte Asseln, Visible-Human-3d-Models (2026), CC BY 4.0. Source CT: Andreassen et al., Scientific Data 10, 34 (2023), CC BY 4.0.</p><p>Organs: Kristen Browne and Heidi Schlehlein, HuBMAP / Human Reference Atlas, United Male and Female v1.10, CC BY 4.0.</p><p>Known gaps: truncated elbow regions and some grouped bones in the CT source; incomplete soft-tissue coverage in HRA, including no stomach mesh. Models are registered reference assemblies, not clinically validated patient-specific anatomy.</p><p><a href={`${import.meta.env.BASE_URL}models/reference/NOTICE.md`} target="_blank" rel="noreferrer">Sources, licensing, and processing</a> ? <a href={`${import.meta.env.BASE_URL}models/reference/${bodyVariant}/registration.json`} target="_blank" rel="noreferrer">Alignment measurements</a></p></details>
    </>}
    <span className="schematic">Educational anatomical atlas · reference anatomy</span>
  </section>;

}
