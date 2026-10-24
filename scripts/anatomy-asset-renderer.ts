import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { MeshoptDecoder } from "three/addons/libs/meshopt_decoder.module.js";

// Static artwork uses only the same matched free reference assets as the viewer.
export async function renderAnatomyAssets() {
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, preserveDrawingBuffer: true });
  renderer.setClearColor(0, 0); renderer.setPixelRatio(1);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = .9;
  const loader = new GLTFLoader().setMeshoptDecoder(MeshoptDecoder);
  const output: Record<string, string> = {};
  for (const sex of ["male", "female"]) {
    const scene = new THREE.Scene();
    scene.add(new THREE.HemisphereLight(0xf5fbff, 0x766b65, 2));
    for (const [color, intensity, x, y, z] of [[0xffeee4, 3, -2, 3, 4], [0xc8e8ff, 2, 3, 2, -3], [0xffffff, 1.4, -2, 1, -3]]) {
      const light = new THREE.DirectionalLight(color, intensity); light.position.set(x, y, z); scene.add(light);
    }
    const entries: { mesh: THREE.Mesh; organ: string | null; layer: string; covering: boolean }[] = [];
    for (const layer of ["skeletal", "visceral", "cardiovascular", "nervous"]) {
      const gltf = await loader.loadAsync(`/models/reference/${sex}/${layer}.glb`);
      scene.add(gltf.scene);
      gltf.scene.traverse((object) => {
        if (!(object instanceof THREE.Mesh)) return;
        const meta = object.userData.medmap;
        const original = Array.isArray(object.material) ? object.material[0] : object.material;
        const material = new THREE.MeshStandardMaterial({ color: "color" in original ? original.color as THREE.Color : 0xd4b2a2, roughness: layer === "skeletal" ? .65 : .48, side: THREE.DoubleSide });
        if (layer === "skeletal") material.color.multiplyScalar(.65);
        object.material = material;
        entries.push({ mesh: object, organ: meta.organ, layer, covering: meta.covering });
      });
    }
    scene.updateMatrixWorld(true);
    for (const name of sex === "male" ? ["Body", "Brain", "Lungs", "Heart", "Liver", "Kidneys"] : ["Body"]) {
      const body = name === "Body";
      const bounds = new THREE.Box3();
      for (const entry of entries) {
        entry.mesh.visible = body ? entry.layer !== "nervous" && !entry.covering : entry.organ === name && !entry.covering;
        const material = entry.mesh.material as THREE.MeshStandardMaterial;
        material.opacity = body && entry.layer === "skeletal" ? .5 : 1;
        material.transparent = material.opacity < 1; material.depthWrite = !material.transparent;
        entry.mesh.renderOrder = material.transparent ? 2 : 0;
        if (entry.mesh.visible) bounds.union(new THREE.Box3().setFromObject(entry.mesh));
      }
      if (bounds.isEmpty()) throw new Error(`No source geometry for ${sex}: ${name}`);
      const width = body ? 640 : 512, height = body ? 960 : 512;
      renderer.setSize(width, height);
      const size = bounds.getSize(new THREE.Vector3()), center = bounds.getCenter(new THREE.Vector3());
      const camera = new THREE.PerspectiveCamera(35, width / height, .001, 20);
      const distance = Math.max(size.y, size.x / camera.aspect) / (2 * Math.tan(THREE.MathUtils.degToRad(17.5))) * (body ? 1.06 : 1.13) + size.z / 2;
      camera.position.set(center.x, center.y, center.z + distance); camera.lookAt(center); camera.updateProjectionMatrix();
      renderer.render(scene, camera);
      output[sex === "female" ? "female-body" : name.toLowerCase()] = renderer.domElement.toDataURL("image/png");
    }
    for (const entry of entries) { entry.mesh.geometry.dispose(); (entry.mesh.material as THREE.Material).dispose(); }
  }
  renderer.dispose(); return output;
}
