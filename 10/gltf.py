import numpy as np
import base64
## inspired by lorain franke.
file = open("sphere.ply", "r")
end_header = False
vertices_processed = 0
faces_processed = 0
vertices = []
faces = []


for line in file.readlines():
    if not line:
        continue
    if line.startswith('element vertex'):
        num_vertices = int(line.split(' ')[-1])
        continue
    if line.startswith('element face'):
        num_faces = line.split(' ')[-1]
        continue
    if 'end_header' in line:
        end_header = True
        continue
    if end_header and vertices_processed < num_vertices:
        parts = [float(e) for e in line.split(' ')[:3]]
        vertices.append(parts)
        vertices_processed += 1
        continue
    if end_header and vertices_processed == num_vertices:
        parts = [int(e) for e in line.split(' ')[1:-1]]
        faces.append(parts)
        faces_processed += 1
        continue

minx = miny = minz = float("inf")
maxx = maxy = maxz = float("-inf")
for vertex in vertices:
    minx = min(minx, vertex[0])
    miny = min(miny, vertex[1])
    minz = min(minz, vertex[2])
    maxx = max(maxx, vertex[0])
    maxy = max(maxy, vertex[1])
    maxz = max(maxz, vertex[2])

mini = float("inf")
maxi = float("-inf")
for face in faces:
    for index in face:
        mini = min(mini, index)
        maxi = max(maxi, index)

vertices_flat = []
for vertex in vertices:
    [vertices_flat.append(c) for c in vertex]

indices = []
for face in faces:
    [indices.append(i) for i in face]

VERTICES = np.array(vertices_flat, dtype=np.float32)
INDICES = np.array(indices, dtype=np.ushort)

HOWMANY_V = len(vertices)
HOWMANY_I = len(indices)
MAX_X = maxx
MAX_Y = maxy
MAX_Z = maxz
MIN_X = minx
MIN_Y = miny
MIN_Z = minz
MAX = maxi
MIN = mini

HOWMANYBYTES_V = VERTICES.nbytes
HOWMANYBYTES_I = INDICES.nbytes

B64_VERTICES = base64.b64encode(VERTICES)
B64_INDICES = base64.b64encode(INDICES)




gltf = {
    "asset": {
        "version": "2.0",
        "generator": "CS460 Magic Fingers"
    },

  "accessors": [
        {
            "bufferView": 0,
            "byteOffset": 0,
            "componentType": 5126,
            "count": HOWMANY_V,
            "type": "VEC3",
            "max": [MAX_X, MAX_Y, MAX_Z],
            "min": [MIN_X, MIN_Y, MIN_Z]
        },
        {
            "bufferView": 1,
            "byteOffset": 0,
            "componentType": 5123,
            "count": HOWMANY_I,
            "type": "SCALAR",
            "max": [MAX],
            "min": [MIN]
        }
    ], 

    "bufferViews": [
        {
            "buffer": 0,
            "byteOffset": 0,
            "byteLength": HOWMANYBYTES_V,
            "target": 34962
        },
        {
            "buffer": 1,
            "byteOffset": 0,
            "byteLength": HOWMANYBYTES_I,
            "target": 34963
        }
    ],
    
    "buffers": [
        {
            "uri": "data:application/octet-stream;base64,"+str(B64_VERTICES, 'utf-8'),
            "byteLength": HOWMANYBYTES_V
        },
        {
            "uri": "data:application/octet-stream;base64,"+str(B64_INDICES, 'utf-8'),
            "byteLength": HOWMANYBYTES_I
        }
    ],
  
    "meshes": [
        {
            "primitives": [{
                 "mode": 4,
                 "attributes": {
                     "POSITION": 0
                 },
                 "indices": 1
            }]
        }
    ],

    "nodes": [
        {
            "mesh": 0
        }
    ],

    "scenes": [
        {
            "nodes": [
                0
            ]
        }
    ],

    "scene": 0
}

str(gltf).replace("'", '"') # we need double quotes instead of single quotes

