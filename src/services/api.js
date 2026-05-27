const metricsEndpoint = '/metrics';

export async function fetchFileMetrics(file) {
  const baseUrl = import.meta.env.VITE_API_BASE_URL?.trim();

  if (!baseUrl) {
    throw new Error('Backend API is not configured yet.');
  }

  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${baseUrl}${metricsEndpoint}`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Unable to fetch metrics from the backend.');
  }

  const payload = await response.json();

  return {
    triangleCount: payload.triangleCount ?? payload.triangles ?? null,
    vertexCount: payload.vertexCount ?? payload.vertices ?? null,
    volume: payload.volume ?? null,
  };
}
