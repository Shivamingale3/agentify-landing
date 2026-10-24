import * as THREE from "three";

export type PartMetrics = {
  /** world units per root-local unit (the Sketchfab wrapper scales ~0.005x) */
  unit: number;
  /** head centre, root-local */
  headCentre: THREE.Vector3;
  centres: Map<string, THREE.Vector3>;
  sizes: Map<string, number>;
};

/**
 * Measures every part's real bounding-box centre in the shared root space.
 * Node origins aren't visual centres: most sit at 0,0,0 with the offset baked
 * into the geometry.
 */
export function measureParts(parts: THREE.Object3D[]): PartMetrics {
  const root = parts[0].parent as THREE.Object3D;
  root.updateWorldMatrix(true, true);
  const rootInv = root.matrixWorld.clone().invert();
  const unit = root.getWorldScale(new THREE.Vector3()).x || 1;

  const box = new THREE.Box3();
  const span = new THREE.Vector3();
  const hull = new THREE.Box3().makeEmpty();
  const centres = new Map<string, THREE.Vector3>();
  const sizes = new Map<string, number>();

  for (const obj of parts) {
    box.setFromObject(obj);
    if (box.isEmpty()) continue;
    const c = box.getCenter(new THREE.Vector3()).applyMatrix4(rootInv);
    centres.set(obj.uuid, c);
    sizes.set(obj.uuid, box.getSize(span).length());
    hull.expandByPoint(c);
  }
  return { unit, headCentre: hull.getCenter(new THREE.Vector3()), centres, sizes };
}
