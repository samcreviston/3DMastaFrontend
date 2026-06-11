//This file simply stores pseudocode and functions for 3D FIle metric and calculation parsing purposes in prep for project.

// Pseudocode for STL file validation to determin ASCII or Binary format and then parse accordingly
if !startsWith("Solid"):
    try binary parse with counting the triangles first and storing in a variable
    if invalid:
    try file-size verification based off of triangle count variable from above (for binary)
        if true warn the user and try ASCII parse
        if invalid:
            if file-size verification confirmed binary, return "invalid file error (binary)"
            if file-size verification did not return binary, return "invalid file error 1 (ASCII)"

else:
try ASCII parse
if invalid:
    return "invalid file error 2 (ASCII)"

file-size verification for binary STL files:
fileSize = 84 + (triangleCount * 50)

//Binary STL triangle count
//This is stored in bytes 80-83 of the file, so we can read those bytes and convert to an integer
function getTriangleCount(buffer) {
    return readUInt32LE(buffer, 80);
}


// Binary STL vertex counter format
//use a set as sets skip duplicates and we only care about unique vertices
create empty Set uniqueVertices
read triangle count
set offset = 84

for each triangle:
    skip normal vector
    read vertex1
    read vertex2
    read vertex3

    convert each vertex into a unique string key
        example:
        "x,y,z"

    add keys to Set
    skip attribute bytes

return size of Set

//ASCII STL Triangle count
triangleCount =
number of "facet normal" or "endfacet" entries




// Detecting Animations in GLB Files:
If Array titled “animations” exists and array is not empty
    return "Animation Detected"
else
    return "No Animation Detected"


//GLB Triangle count
//Triangles are defined at the primitive level, usually via an index buffer, only having the calculation differ light based on whether the primitive uses indices or not.
totalTriangles = 0

for each mesh in gltf.meshes:
    for each primitive in mesh.primitives:

        if primitive.indices exists:
            indexCount = primitive.indices.count
            totalTriangles += indexCount / 3

        else:
            positionCount = primitive.attributes.POSITION.count
            totalTriangles += positionCount / 3

return totalTriangles

//OBJ Triangle Count

//OBJ Raw Vertex count
/**
 * =========================================================
 * METRIC 1: VERTICES (RAW OBJ COUNT)
 * =========================================================
 *
 * UI Label: "Vertices"
 *
 * Definition:
 * Counts raw `v` position entries in the OBJ file.
 *
 * Notes:
 * - Does NOT deduplicate
 * - Does NOT consider faces
 * - Does NOT consider rendering expansion
 *
 * This is the most basic OBJ vertex metric.
 */
function getRawObjVertexCount(objText: string): number {
    let count = 0;

    const lines = objText.split(/\r?\n/);

    for (const line of lines) {
        const trimmed = line.trim();
        if (trimmed.startsWith("v ")) {
            count++;
        }
    }

    return count;
}

//OBJ Deduped geometry
/**
 * =========================================================
 * METRIC 2: UNIQUE POSITIONS (DEDUPLICATED GEOMETRY)
 * =========================================================
 *
 * UI Label: "Unique Positions"
 *
 * Definition:
 * Counts unique geometric XYZ positions from `v` entries.
 *
 * Notes:
 * - Deduplicates identical coordinates
 * - Ignores UVs and normals
 * - Pure geometry-based uniqueness
 *
 * Dependency:
 * - RELIES ON: Raw OBJ `v` parsing logic conceptually
 *   (but does NOT call getRawObjVertexCount)
 *
 * Used for:
 * - mesh optimization
 * - redundancy detection
 * - geometry analysis
 */
function getUniqueGeometricPositionCount(
    objText: string
): number {

    const uniquePositions = new Set<string>();

    const lines = objText.split(/\r?\n/);

    for (const line of lines) {
        const trimmed = line.trim();

        if (!trimmed.startsWith("v ")) continue;

        const parts = trimmed.split(/\s+/);
        if (parts.length < 4) continue;

        // normalize float precision for stable deduplication
        const x = Number(parts[1]).toFixed(6);
        const y = Number(parts[2]).toFixed(6);
        const z = Number(parts[3]).toFixed(6);

        uniquePositions.add(`${x}|${y}|${z}`);
    }

    return uniquePositions.size;
}

//OBJ Unique Rendered Vertices
/**
 * =========================================================
 * METRIC 3: RENDER VERTICES (EXPANDED)
 * =========================================================
 *
 * UI Label: "Render Vertices"
 *
 * Definition:
 * Counts unique vertex "signatures" used in faces:
 *   vertex/uv/normal combinations
 *
 * This approximates GPU-expanded vertex count.
 *
 * Notes:
 * - Accounts for UV seams
 * - Accounts for normal splits
 * - Accounts for vertex reuse differences
 * - Does NOT require full mesh reconstruction
 *
 * Dependency:
 * - RELIES ON: Face parsing logic (f lines)
 * - Independent of raw vertex count functions
 *
 * Important:
 * This is an approximation of GPU vertex expansion,
 * not a full triangulated mesh rebuild.
 */
function getExpandedRenderVertexCount(
    objText: string
): number {

    const renderVertexSet = new Set<string>();

    const lines = objText.split(/\r?\n/);

    for (const line of lines) {
        const trimmed = line.trim();

        if (!trimmed.startsWith("f ")) continue;

        const tokens = trimmed.split(/\s+/);

        for (let i = 1; i < tokens.length; i++) {
            const faceVertex = tokens[i];

            /**
             * Store full OBJ vertex reference:
             * - v
             * - v/vt
             * - v//vn
             * - v/vt/vn
             */
            renderVertexSet.add(faceVertex);
        }
    }

    return renderVertexSet.size;
}