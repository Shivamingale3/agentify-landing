/**
 * Meshopt-compressed. Don't run gltf-transform's blanket `optimize` on it:
 * its join/dedup passes rename nodes and break the PART_BUCKETS patterns.
 */
export const MODEL_URL = "/models/agentify-head.glb";
