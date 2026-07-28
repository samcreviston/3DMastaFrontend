const metricsEndpoint = '/metrics';

export async function fetchFileMetrics(file) {
  const baseUrl = import.meta.env.VITE_API_BASE_URL?.trim() || 'http://localhost:8000';

  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${baseUrl}${metricsEndpoint}?include_boundary_edges=true`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new Error(body.detail || 'Unable to fetch metrics from the backend.');
  }

  const payload = await response.json();
  const boundingBox = payload.bounding_box ?? payload.boundingBox ?? {};

  return {
    triangleCount: payload.triangle_count ?? payload.triangleCount ?? payload.triangles ?? null,
    vertexCount: payload.vertex_count ?? payload.vertexCount ?? payload.vertices ?? null,
    surfaceArea: payload.surface_area ?? payload.surfaceArea ?? null,
    volume: payload.volume ?? null,
    isWatertight: payload.is_watertight ?? payload.isWatertight ?? null,
    boundaryEdgeCount: payload.boundary_edge_count ?? payload.boundaryEdgeCount ?? null,
    boundaryEdges: payload.boundary_edges ?? payload.boundaryEdges ?? null,
    nonManifoldEdgeCount: payload.non_manifold_edge_count ?? payload.nonManifoldEdgeCount ?? null,
    isWindingConsistent: payload.is_winding_consistent ?? payload.isWindingConsistent ?? null,
    triangleDensity: payload.triangle_density ?? null,
    triangleDensityLevel: payload.triangle_density_level ?? null,
    height: boundingBox.height ?? null,
    width: boundingBox.width ?? null,
    depth: boundingBox.depth ?? null,
  };
}
