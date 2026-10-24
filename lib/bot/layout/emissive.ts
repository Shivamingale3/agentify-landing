import type * as THREE from "three";

/**
 * Clone and tint a part's materials so it can glow on its own. The GLB shares
 * one material across all meshes, so tinting in place would light the whole head.
 * Returns the clones so the frame loop doesn't have to re-traverse.
 */
export function cloneEmissive(obj: THREE.Object3D, accent: THREE.Color) {
  const out: THREE.MeshStandardMaterial[] = [];
  obj.traverse((child) => {
    const mesh = child as THREE.Mesh;
    if (!mesh.isMesh) return;
    const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
    const cloned = mats.map((m) => {
      const mat = (m as THREE.MeshStandardMaterial).clone();
      mat.emissive = accent;
      mat.emissiveIntensity = 0;
      out.push(mat);
      return mat;
    });
    mesh.material = Array.isArray(mesh.material) ? cloned : cloned[0];
  });
  return out;
}
