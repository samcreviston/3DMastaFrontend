# 3DMasta Frontend

3DMasta is a browser-based 3D mesh analyzer. Upload an STL, GLB, GLTF, OBJ, or 3MF file to preview the model and retrieve geometry metrics from my personal API.

## Tech stack

- **React 19** for the user interface and stateful upload flow
- **Vite 6** for local development and production builds
- **react-dropzone** for drag-and-drop and file-picker uploads
- **Three.js** for in-browser mesh rendering, loaders, lighting, and orbit controls
- **CSS Modules** and shared CSS variables for component-scoped styling

## Getting started

Prerequisites: Node.js 18+

```bash
npm install
npm run dev
```

The development server starts at the URL printed by Vite (normally `http://localhost:5173`).

### API configuration

By default, the app sends requests to `http://localhost:8000`, which is the backend's local default. To point the frontend at another API deployment, create a `.env.local` file:

```env
VITE_API_BASE_URL=https://your-api.example.com
```

The API must allow requests from the frontend origin (CORS).

## Mesh metrics API

The frontend uploads the selected file as multipart form data to the backend:

```http
POST {VITE_API_BASE_URL}/metrics
Content-Type: multipart/form-data

file: <3D model file>
```

The backend supports `.stl`, `.obj`, `.glb`, `.gltf`, and `.3mf` files. A successful response has the following shape:

```json
{
  "file_name": "model.stl",
  "triangle_count": 15432,
  "vertex_count": 7718,
  "detail_ratio": 1.9992,
  "surface_area": 126.52,
  "volume": 43.87,
  "is_watertight": true,
  "bounding_box": {
    "width": 32.1,
    "height": 48.5,
    "depth": 27.9
  }
}
```

| Field | Description | Displayed by frontend |
| --- | --- | --- |
| `file_name` | Uploaded model's filename. | No |
| `triangle_count` | Number of mesh triangles. | Yes |
| `vertex_count` | Number of mesh vertices. | Yes |
| `detail_ratio` | Backend-calculated mesh detail ratio. | No |
| `surface_area` | Total surface area. | Yes, as mm² |
| `volume` | Enclosed mesh volume. `null` when the mesh is not watertight. | Yes, as mm³ |
| `is_watertight` | Whether the mesh is closed/watertight. | Yes |
| `bounding_box.width` | Bounding-box width. | Yes, as mm |
| `bounding_box.height` | Bounding-box height. | Yes, as mm |
| `bounding_box.depth` | Bounding-box depth. | Yes, as mm |

For the backend implementation, interactive API docs, and server setup, see [samcreviston/3DMasta_API](https://github.com/samcreviston/3DMasta_API).

## Available scripts

```bash
npm run dev      # Start the Vite development server
npm run build    # Create a production build in dist/
npm run preview  # Preview the production build locally
```
