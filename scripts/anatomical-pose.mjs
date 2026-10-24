import * as THREE from "three";
import { Matrix, EigenvalueDecomposition } from "ml-matrix";

const V = (x = 0, y = 0, z = 0) => new THREE.Vector3(x, y, z);
const center = (entry) => entry.geometry.boundingBox.getCenter(V());
function longAxis(entry) {
  const points = entry.geometry.attributes.position;
  const mean = V();
  for (let i = 0; i < points.count; i++) mean.add(V().fromBufferAttribute(points, i));
  mean.divideScalar(points.count);
  const covariance = Matrix.zeros(3, 3);
  for (let i = 0; i < points.count; i++) {
    const p = V().fromBufferAttribute(points, i).sub(mean).toArray();
    for (let a = 0; a < 3; a++) for (let b = 0; b < 3; b++) covariance.set(a, b, covariance.get(a, b) + p[a] * p[b]);
  }
  const eigen = new EigenvalueDecomposition(covariance, { assumeSymmetric: true });
  const column = eigen.realEigenvalues.indexOf(Math.max(...eigen.realEigenvalues));
  const axis = V(...eigen.eigenvectorMatrix.getColumn(column)).normalize();
  if (axis.y > 0) axis.negate();
  let min = Infinity, max = -Infinity;
  for (let i = 0; i < points.count; i++) { const d = V().fromBufferAttribute(points, i).sub(mean).dot(axis); min = Math.min(min, d); max = Math.max(max, d); }
  return { axis, proximal: mean.clone().addScaledVector(axis, min), distal: mean.clone().addScaledVector(axis, max) };
}
function frame(direction, lateral) {
  const y = direction.clone().normalize();
  const x = lateral.clone().addScaledVector(y, -lateral.dot(y)).normalize();
  return new THREE.Matrix4().makeBasis(x, y, x.clone().cross(y).normalize());
}
function mapFrame(from, to, direction, lateral, targetDirection, targetLateral) {
  const rotation = frame(targetDirection, targetLateral).multiply(frame(direction, lateral).transpose());
  return rotation.setPosition(to.clone().sub(from.clone().applyMatrix4(rotation)));
}

/** Rigid segment articulation only; never reconstructs missing source bone. */
export function articulateAnatomicalPose(bones, entries) {
  const byKey = new Map(bones.map((entry) => [entry.key, entry]));
  const reports = [];
  for (const [side, sign] of [["LEFT", 1], ["RIGHT", -1]]) {
    const get = (name) => { const entry = byKey.get(`${name}_${side}`); if (!entry) throw new Error(`Missing pose landmark ${name}_${side}`); return entry; };
    const upper = longAxis(get("HUMERUS"));
    const radius = longAxis(get("RADIUS")), ulna = longAxis(get("ULNA"));
    const wrist = radius.distal.clone().add(ulna.distal).multiplyScalar(.5);
    const elbow = radius.proximal.clone().add(ulna.proximal).multiplyScalar(.5);
    const forearmDirection = wrist.clone().sub(elbow).normalize();
    const thumbDirection = center(get("METACARPAL_1")).sub(center(get("METACARPAL_5")));
    const targetDirection = V(sign * .10, -1, 0).normalize();
    const targetLateral = V(sign, 0, 0);
    const upperRotation = new THREE.Matrix4().makeRotationFromQuaternion(new THREE.Quaternion().setFromUnitVectors(upper.axis, targetDirection));
    upperRotation.setPosition(upper.proximal.clone().sub(upper.proximal.clone().applyMatrix4(upperRotation)));
    // Retain the source gap at the truncated elbow rather than fabricating an articulation.
    const targetElbow = elbow.clone().applyMatrix4(upperRotation);
    const forearm = mapFrame(elbow, targetElbow, forearmDirection, thumbDirection, targetDirection, targetLateral);
    const handDirection = center(get("METACARPAL_3")).sub(center(get("CAPITATE"))).normalize();
    const hand = mapFrame(wrist, wrist.clone().applyMatrix4(forearm), handDirection, thumbDirection, targetDirection, targetLateral);
    const carpal = /^(CAPITATE|HAMATE|LUNATE|PISIFORM|SCAPHOID|TRAPEZIUM|TRAPEZOID|TRIQUETRUM|METACARPAL_|PHALANGE_HAND_)/;
    for (const bone of bones.filter((entry) => entry.key.endsWith(`_${side}`))) {
      const transform = /^HUMERUS_/.test(bone.key) ? upperRotation : /^(RADIUS|ULNA)_/.test(bone.key) ? forearm : carpal.test(bone.key) ? hand : null;
      if (transform) bone.geometry.applyMatrix4(transform);
    }
    const heel = center(get("CALCANEUS")), forefoot = center(get("METATARSAL_3"));
    const medial = center(get("METATARSAL_1")).sub(center(get("METATARSAL_5")));
    const ankle = center(get("TALUS"));
    const foot = mapFrame(ankle, ankle, forefoot.clone().sub(heel), medial, V(0, -.12, 1).normalize(), V(-sign, 0, 0));
    const footPattern = /^(CALCANEUS|CUBOID|INTERMEDIATE_CUNEIFORM|LATERAL_CUNEIFORM|MEDIAL_CUNEIFORM|METATARSAL_|NAVICULAR|PHALANGE_FOOT_|TALUS)/;
    for (const bone of bones.filter((entry) => entry.key.endsWith(`_${side}`) && footPattern.test(entry.key))) bone.geometry.applyMatrix4(foot);
    reports.push({ side, upperArm: upperRotation.toArray(), forearm: forearm.toArray(), hand: hand.toArray(), foot: foot.toArray(), targetArmDirection: targetDirection.toArray(), thumbDirection: targetLateral.toArray() });
  }
  // Recompute bounds after articulation, preserving every retained mesh.
  for (const entry of [...bones, ...entries]) entry.geometry.computeBoundingBox();
  return { method: "Rigid upper-arm, forearm, hand, and foot articulation from bone principal axes and metacarpal landmarks. Arms extended slightly lateral, thumbs lateral, feet directed anteriorly. Truncated elbow gaps retained. Not a clinically validated rig.", segments: reports };
}
