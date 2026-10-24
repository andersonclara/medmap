import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { MeshoptDecoder } from "three/addons/libs/meshopt_decoder.module.js";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { OutlinePass } from "three/addons/postprocessing/OutlinePass.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";
import type { OrganSearchEntry } from "../data/organSearch";
import { layerNames, structureSystem, type BodySystem, type BodyVariant, type Layer, type MedicineMap } from "../data/anatomy";
import type { Organ } from "../data/medications";
import { AnatomicalGraphic } from "./AnatomicalGraphic";
import { isCoveringTissue } from "./anatomyAppearance";

export type ViewAction = "front" | "back" | "left" | "right" | "zoomIn" | "zoomOut" | "reset";
export interface SceneProps {
  layers: Record<Layer, number>;
  system: BodySystem;
  medicine: MedicineMap | null;
  selected: Organ | null;
  selectedStructure: string | null;
  hoveredOrgan?: Organ | null;
  bodyVariant: BodyVariant;
  focusRequest: { target: OrganSearchEntry; sequence: number } | null;
  hiddenStructures: string[];
  membranes: boolean;
  command: { action: ViewAction; sequence: number };
  onSelect: (name: string, organ: Organ | null) => void;
  onDeselect: () => void;
}
type AnatomyMesh = THREE.Mesh<THREE.BufferGeometry, THREE.MeshStandardMaterial>;
interface Structure { mesh: AnatomyMesh; name: string; layer: Layer; organ: Organ | null; color: THREE.Color; system?: BodySystem; surface?: boolean; searchText?: string; referenceOnly?: boolean; covering?: boolean; }

export default function AnatomyScene(props: SceneProps) {
  const host = useRef<HTMLDivElement>(null);
  const savedView = useRef<{ position: THREE.Vector3; target: THREE.Vector3 } | null>(null);
  const latest = useRef(props);
  latest.current = props;
  const api = useRef<{ update: () => void; command: (action: ViewAction) => void; retry: () => void } | null>(null);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState<string[]>([]);
  const [unavailable, setUnavailable] = useState(false);
  const [count, setCount] = useState(0);
  const [boneCount, setBoneCount] = useState(0);
  const [highlightCount, setHighlightCount] = useState(0);
  const [focusedName, setFocusedName] = useState<string | null>(null);
  const [hoveredName, setHoveredName] = useState<string | null>(null);
  const [interactionCounts, setInteractionCounts] = useState({ selected: 0, hovered: 0 });

  useEffect(() => {
    setHoveredName(null); setFocusedName(null); setFailed([]); setUnavailable(false); setLoading(true); setCount(0); setBoneCount(0);
    const variant = latest.current.bodyVariant;
    const element = host.current!;
    let renderer: THREE.WebGLRenderer;
    try { renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); }
    catch { setUnavailable(true); setLoading(false); return; }
    let disposed = false;
    let focusFrame = 0;
    let hoverFrame = 0;
    const stopFocus = () => cancelAnimationFrame(focusFrame);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = .9;
    const canvas = renderer.domElement;
    canvas.tabIndex = 0;
    canvas.setAttribute("role", "img");
    canvas.setAttribute("aria-label", "Interactive 3D anatomy. Click or tap a structure to select it with a blue outline and look closer. Drag to rotate, pinch or scroll to zoom. Arrow keys rotate; plus and minus zoom. Use Search organs to find anatomy by name.");
    element.appendChild(canvas);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, 1, .01, 30);
    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    const outline = new OutlinePass(new THREE.Vector2(1, 1), scene, camera);
    outline.visibleEdgeColor.set("#1677ff"); outline.hiddenEdgeColor.set("#1677ff");
    outline.edgeStrength = 4; outline.edgeThickness = 1.5; outline.edgeGlow = .15;
    composer.addPass(outline);
    const output = new OutputPass(); composer.addPass(output);
    const controls = new OrbitControls(camera, canvas);
    controls.target.copy(savedView.current?.target ?? new THREE.Vector3(0, .86, 0));
    camera.position.copy(savedView.current?.position ?? new THREE.Vector3(0, .86, 3.25));
    controls.enableDamping = false;
    controls.enablePan = false;
    controls.minDistance = .08;
    controls.maxDistance = 5;
    controls.minPolarAngle = .15;
    controls.maxPolarAngle = Math.PI - .15;
    controls.zoomSpeed = .7;
    controls.zoomToCursor = true;
    scene.add(new THREE.HemisphereLight(0xf5fbff, 0x766b65, 2));
    const key = new THREE.DirectionalLight(0xffeee4, 3);
    key.position.set(-2, 3, 4); scene.add(key);
    const fill = new THREE.DirectionalLight(0xc8e8ff, 2);
    fill.position.set(3, 2, -3); scene.add(fill);
    const rim = new THREE.DirectionalLight(0xffffff, 1.4);
    rim.position.set(-2, 1, -3); scene.add(rim);

    const structures: Structure[] = [];
    let hovered: Structure | null = null;
    const models = new Map<Layer, THREE.Group>();
    const pending = new Set<Layer>();
    const errors = new Set<Layer>();
    const downloads = new AbortController();
    const loader = new GLTFLoader().setMeshoptDecoder(MeshoptDecoder);
    const render = () => { if (!disposed) composer.render(); };
    const resize = () => {
      const width = element.clientWidth;
      const height = element.clientHeight;
      if (!width || !height) return;
      renderer.setSize(width, height);
      composer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      render();
    };
    const observer = new ResizeObserver(resize);
    observer.observe(element);
    controls.addEventListener("change", render);
    controls.addEventListener("start", stopFocus);

    const apply = () => {
      const state = latest.current;
      let visibleCount = 0;
      let highlighted = 0;
      let selectedCount = 0;
      let hoveredCount = 0;
      const hasTargets = !!state.medicine && (state.medicine.organs.length > 0 || state.medicine.systems.length > 0);
      const outlined: THREE.Object3D[] = [];
      for (const item of structures) {
        const { mesh, name, layer, organ } = item;
        const opacity = item.surface ? Math.min(.3, state.layers.skeletal * .9) : state.layers[layer];
        const itemSystem = item.system ?? structureSystem(name, layer);
        const systemMatch = state.system === "all" || (!item.surface && itemSystem === state.system) || (state.system === "digestive" && /pancrea/i.test(name));
        const covering = item.covering ?? ((layer === "visceral" || layer === "muscular") && isCoveringTissue(item.searchText ?? name));
        mesh.visible = !item.referenceOnly && opacity > 0 && systemMatch && (state.membranes || !covering) && !state.hiddenStructures.includes(name);
        if (!mesh.visible) continue;
        visibleCount++;
        const medicineHit = !item.surface && state.medicine && (state.medicine.organs.length
          ? (organ !== null && state.medicine.organs.includes(organ)) || (state.medicine.id === "insulin" && layer === "muscular") || (state.medicine.id === "warfarin" && layer === "cardiovascular")
          : state.medicine.systems.includes(itemSystem));
        const searchTarget = state.focusRequest?.target;
        const searchMatch = searchTarget && !searchTarget.organ && layer === searchTarget.layer && new RegExp(searchTarget.pattern!, "i").test(item.searchText ?? name);
        const inspected = state.selectedStructure === name || (state.selected !== null && state.selected === organ) || !!searchMatch;
        const previewed = (state.hoveredOrgan != null && state.hoveredOrgan === organ) || (hovered?.organ ? hovered.organ === organ : hovered?.name === name);
        if (inspected) selectedCount++;
        else if (previewed) hoveredCount++;
        const material = mesh.material;
        material.color.copy(item.color);
        if (medicineHit) highlighted++;
        if (inspected) outlined.push(mesh);
        if (previewed && !inspected) {
          material.color.lerp(new THREE.Color("#54b7ff"), .78);
        } else if (medicineHit) {
          material.color.lerp(new THREE.Color("#16c9a3"), .78);
        } else if (hasTargets && !inspected) {
          material.color.lerp(new THREE.Color("#bac8c2"), .45);
        }
        material.emissive.set(previewed && !inspected ? "#2689d9" : medicineHit ? "#10b899" : "#000000");
        material.emissiveIntensity = previewed && !inspected ? .65 : medicineHit ? .55 : 0;
        material.opacity = hasTargets && !medicineHit && !inspected && !previewed ? Math.min(opacity, layer === "skeletal" ? .5 : .25) : opacity;
        const transparent = material.opacity < 1;
        if (material.transparent !== transparent) { material.transparent = transparent; material.needsUpdate = true; }
        material.depthWrite = !transparent;
        mesh.renderOrder = transparent ? 2 : 0;
      }
      setCount(visibleCount);
      setBoneCount(structures.filter((item) => item.layer === "skeletal").length);
      outline.selectedObjects = outlined;
      setHighlightCount(highlighted);
      setInteractionCounts({ selected: selectedCount, hovered: hoveredCount });
      render();
      focusSearchResult();
    };
    const release = (root: THREE.Object3D) => {
      root.traverse((object) => {
        if (!(object instanceof THREE.Mesh)) return;
        object.geometry.dispose();
        for (const material of Array.isArray(object.material) ? object.material : [object.material]) material.dispose();
      });
    };
    const load = (layer: Layer) => {
      if (pending.has(layer) || models.has(layer) || errors.has(layer)) return;
      pending.add(layer); setLoading(true);
      fetch(`${import.meta.env.BASE_URL}models/reference/${variant}/${layer}.glb`, { signal: downloads.signal })
      .then((response) => {
        if (!response.ok) throw new Error(`Model request failed: ${response.status}`);
        return response.arrayBuffer();
      }).then((buffer) => disposed ? null : loader.parseAsync(buffer, ""))
      .then((gltf) => {
        if (!gltf) return;
        if (disposed) { release(gltf.scene); return; }
        const group = new THREE.Group(); group.name = layer;
        gltf.scene.updateMatrixWorld(true);
        const meshes: THREE.Mesh[] = [];
        gltf.scene.traverse((object) => { if (object instanceof THREE.Mesh) meshes.push(object); });
        for (const object of meshes) {
          const metadata = object.userData.medmap as { name: string; layer: Layer; system: BodySystem; organ: Organ | null; source: string; searchText: string; covering: boolean } | undefined;
          if (!metadata) throw new Error("Reference mesh is missing anatomical metadata");
          const original = Array.isArray(object.material) ? object.material[0] : object.material;
          const material = new THREE.MeshStandardMaterial({ color: "color" in original ? original.color as THREE.Color : new THREE.Color("#d4b2a2"), roughness: layer === "skeletal" ? .65 : .48, metalness: 0, side: THREE.DoubleSide });
          if (layer === "skeletal") material.color.multiplyScalar(.65);
          const mesh = object as AnatomyMesh;
          group.attach(mesh); mesh.material = material;
          structures.push({ mesh, name: metadata.name, layer, organ: metadata.organ, color: material.color.clone(), system: metadata.system, searchText: metadata.searchText, covering: metadata.covering });
        }
        models.set(layer, group); scene.add(group);
        pending.delete(layer); setLoading(pending.size > 0); apply();
      }).catch(() => {
        if (disposed) return;
        pending.delete(layer); errors.add(layer);
        setFailed([...errors].map((name) => layerNames[name])); setLoading(pending.size > 0);
      });
    };
    const update = () => {
      for (const [layer, opacity] of Object.entries(latest.current.layers)) if (opacity > 0) load(layer as Layer);
      apply();
    };
    const command = (action: ViewAction) => {
      stopFocus();
      const distance = camera.position.distanceTo(controls.target);
      if (action === "zoomIn" || action === "zoomOut") {
        camera.position.sub(controls.target).multiplyScalar(action === "zoomIn" ? .8 : 1.25).add(controls.target);
      } else {
        const angle = { front: 0, back: Math.PI, left: -Math.PI / 2, right: Math.PI / 2, reset: 0 }[action];
        if (action === "reset") { controls.target.set(0, .86, 0); setFocusedName(null); }
        const radius = action === "reset" ? 3.25 : distance;
        camera.position.set(Math.sin(angle) * radius, controls.target.y, Math.cos(angle) * radius);
      }
      controls.update(); render();
    };
    const onKey = (event: KeyboardEvent) => {
      stopFocus();
      if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(event.key)) {
        event.preventDefault();
        const offset = camera.position.clone().sub(controls.target);
        const spherical = new THREE.Spherical().setFromVector3(offset);
        if (event.key === "ArrowLeft") spherical.theta -= .2;
        if (event.key === "ArrowRight") spherical.theta += .2;
        if (event.key === "ArrowUp") spherical.phi = Math.max(.15, spherical.phi - .15);
        if (event.key === "ArrowDown") spherical.phi = Math.min(Math.PI - .15, spherical.phi + .15);
        camera.position.copy(new THREE.Vector3().setFromSpherical(spherical).add(controls.target));
        controls.update(); render();
      } else if (["+", "=", "-", "Home"].includes(event.key)) {
        event.preventDefault(); command(event.key === "Home" ? "reset" : event.key === "-" ? "zoomOut" : "zoomIn");
      }
    };
    const raycaster = new THREE.Raycaster();
    const pick = (x: number, y: number) => {
      const bounds = canvas.getBoundingClientRect();
      raycaster.setFromCamera(new THREE.Vector2((x - bounds.left) / bounds.width * 2 - 1, -(y - bounds.top) / bounds.height * 2 + 1), camera);
      const selectable = structures.filter((item) => !item.surface && item.mesh.visible && latest.current.layers[item.layer] >= .1);
      const byMesh = new Map(selectable.map((item) => [item.mesh, item]));
      const hits = raycaster.intersectObjects(selectable.map((item) => item.mesh), false);
      const hit = hits.find((entry) => latest.current.layers[byMesh.get(entry.object as AnatomyMesh)!.layer] >= .5) ?? hits[0];
      return hit ? byMesh.get(hit.object as AnatomyMesh) ?? null : null;
    };
    const clearHover = () => {
      cancelAnimationFrame(hoverFrame);
      if (hovered) { hovered = null; setHoveredName(null); canvas.style.cursor = "grab"; apply(); }
    };
    const focus = (item: Structure, entries = structures.filter((entry) => entry.mesh.visible && (item.organ ? entry.organ === item.organ : entry === item))) => {
      stopFocus();
      const bounds = new THREE.Box3();
      for (const entry of entries) bounds.union(new THREE.Box3().setFromObject(entry.mesh));
      if (bounds.isEmpty()) return;
      const center = bounds.getCenter(new THREE.Vector3());
      const size = bounds.getSize(new THREE.Vector3());
      const fit = Math.max(size.y, size.x / camera.aspect, size.z) / (2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2))) * 1.4 + size.z / 2;
      const distance = THREE.MathUtils.clamp(fit, .12, 3.25);
      const direction = camera.position.clone().sub(controls.target).normalize();
      const destination = center.clone().addScaledVector(direction, distance);
      const fromPosition = camera.position.clone();
      const fromTarget = controls.target.clone();
      const started = performance.now();
      const duration = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 320;
      setFocusedName(item.organ ?? item.name);
      const frame = () => {
        if (disposed) return;
        const progress = duration ? Math.min(1, (performance.now() - started) / duration) : 1;
        const eased = 1 - Math.pow(1 - progress, 3);
        camera.position.lerpVectors(fromPosition, destination, eased);
        controls.target.lerpVectors(fromTarget, center, eased);
        controls.update(); render();
        if (progress < 1) focusFrame = requestAnimationFrame(frame);
      };
      frame();
    };
    let lastSearchFocus = -1;
    function focusSearchResult() {
      const request = latest.current.focusRequest;
      if (!request || lastSearchFocus === request.sequence) return;
      const matches = structures.filter((entry) => entry.mesh.visible && (request.target.organ ? entry.organ === request.target.organ : entry.layer === request.target.layer && new RegExp(request.target.pattern!, "i").test(entry.searchText ?? entry.name)));
      if (!matches.length) return;
      lastSearchFocus = request.sequence;
      focus(matches[0], matches);
      setFocusedName(request.target.label);
    }
    const pointers = new Set<number>();
    let down: { x: number; y: number; id: number; moved: boolean } | null = null;
    const onDown = (event: PointerEvent) => {
      clearHover();
      pointers.add(event.pointerId);
      down = pointers.size === 1 && event.button === 0 ? { x: event.clientX, y: event.clientY, id: event.pointerId, moved: false } : null;
    };
    const onMove = (event: PointerEvent) => {
      if (down && Math.hypot(event.clientX - down.x, event.clientY - down.y) > 5) down.moved = true;
      if (pointers.size || event.pointerType === "touch") return;
      cancelAnimationFrame(hoverFrame);
      hoverFrame = requestAnimationFrame(() => {
        const next = pick(event.clientX, event.clientY);
        if (next === hovered) return;
        hovered = next;
        setHoveredName(next ? next.organ ?? next.name : null);
        canvas.style.cursor = next ? "pointer" : "grab";
        apply();
      });
    };
    const onCancel = (event: PointerEvent) => { pointers.delete(event.pointerId); down = null; };
    const onUp = (event: PointerEvent) => {
      pointers.delete(event.pointerId);
      const start = down; down = null;
      if (!start || start.moved || event.pointerId !== start.id || pointers.size || Math.hypot(event.clientX - start.x, event.clientY - start.y) > 5) return;
      const item = pick(event.clientX, event.clientY);
      if (item) { latest.current.onSelect(item.name, item.organ); focus(item); }
    };
    canvas.addEventListener("keydown", onKey);
    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerup", onUp);
    canvas.addEventListener("pointercancel", onCancel);
    canvas.addEventListener("pointerleave", clearHover);
    const onLost = (event: Event) => { event.preventDefault(); setUnavailable(true); };
    canvas.addEventListener("webglcontextlost", onLost);
    api.current = { update, command, retry: () => { errors.clear(); setFailed([]); update(); } };
    controls.update(); resize(); update();
    return () => {
      savedView.current = { position: camera.position.clone(), target: controls.target.clone() };
      disposed = true; api.current = null; downloads.abort(); stopFocus();
      cancelAnimationFrame(hoverFrame);
      observer.disconnect(); controls.dispose();
      canvas.removeEventListener("keydown", onKey);
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("pointercancel", onCancel);
      canvas.removeEventListener("pointerleave", clearHover);
      canvas.removeEventListener("webglcontextlost", onLost);
      release(scene); outline.dispose(); output.dispose(); composer.dispose(); renderer.dispose(); canvas.remove();
    };
  }, [props.bodyVariant]);

  useEffect(() => { api.current?.update(); }, [props.layers, props.system, props.medicine, props.selected, props.selectedStructure, props.hiddenStructures, props.membranes, props.hoveredOrgan, props.focusRequest]);
  useEffect(() => { api.current?.command(props.command.action); }, [props.command]);

  return <div className="anatomy-scene-shell">
    <div ref={host} className="anatomy-scene" data-testid="anatomy-scene" data-body-variant={props.bodyVariant} data-skeletal-structures={boneCount} data-visible-structures={count} data-highlighted-structures={highlightCount} data-selected-structures={interactionCounts.selected} data-hovered-structures={interactionCounts.hovered} data-focused-structure={focusedName ?? ""} data-hovered-structure={hoveredName ?? ""} />
    {hoveredName && <span className="scene-hover-label">{hoveredName} · Click to look closer</span>}
    {focusedName && <div className="scene-focus-label"><span>Looking closer: <strong>{focusedName}</strong></span><button onClick={() => { props.onDeselect(); api.current?.command("reset"); }}>Back to full body</button></div>}
    {loading && !unavailable && <span className="scene-status" role="status">Loading anatomical layers…</span>}
    {unavailable && <div className="scene-fallback">{props.bodyVariant === "female" ? <img src={`${import.meta.env.BASE_URL}images/atlas/female-body.png`} alt="Female anatomical reference" /> : <AnatomicalGraphic organ="Body" eager />}<p>3D is unavailable in this browser. Enable WebGL to rotate and reveal layers.</p></div>}
    {!!failed.length && <div className="scene-error" role="alert">Could not load: {failed.join(", ")}. <button onClick={() => api.current?.retry()}>Retry layers</button></div>}
    {!loading && !unavailable && !failed.length && count === 0 && <span className="scene-status">No structures visible. Enable a layer or choose All systems.</span>}
  </div>;
}
