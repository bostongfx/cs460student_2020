import numpy as np
import base64
from plyfile import PlyData, PlyElement

plydata = PlyData.read('poly.ply')
vertices_count = plydata['vertex'].count
face_count = plydata['face'].count
vertices = plydata['vertex'].data
faces = plydata['face'].data
vert = []
face = []
for v in vertices:
    vert+=list(v)[:3]
for f in faces:
    face+=list(f[0])[:3]

VERTICES = np.array(vert, dtype=np.float32)
INDICES = np.array(face, dtype=np.int32)

HOWMANY_V = vertices_count
HOWMANY_I = face_count
MAX_X = max(VERTICES[::3])
MAX_Y = max(VERTICES[1::3])
MAX_Z = max(VERTICES[2::3])
MIN_X = min(VERTICES[::3])
MIN_Y = min(VERTICES[1::3])
MIN_Z = min(VERTICES[2::3])
MAX = max(INDICES)
MIN = min(INDICES)

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
            "componentType": 5125,
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

print ( str(gltf).replace("'", '"') ) # we need double quotes instead of single quotes
