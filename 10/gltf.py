# Did this on Colab Notebook
import numpy as np
import base64

VERTICES_a = []
INDICE_a = []

fileObj = open("/content/drive/My Drive/Colab Notebooks/nefertiti.obj", "r")
for line in fileObj.readlines():
    vandf = line.split()
    if vandf[0] == 'v':
      VERTICES_a.append(vandf[1])
      VERTICES_a.append(vandf[2])
      VERTICES_a.append(vandf[3])

    if vandf[0] == 'f':
      INDICE_a.append((int)(vandf[1])-1)
      INDICE_a.append((int)(vandf[2])-1)
      INDICE_a.append((int)(vandf[3])-1)

fileObj.close()


VERTICES = np.array(VERICES_OUT_OF_PARSE, dtype=np.float32)
INDICES = np.array(INDICE_OUF_OF_PARSE, dtype=np.ushort)

HOWMANY_V = int(VERTICES.size / 3)
HOWMANY_I = int(INDICES.size)

MAX_X = -90000000000000
MIN_X = 90000000000000
MAX_Y = -90000000000000
MIN_Y = 90000000000000
MAX_Z = -90000000000000
MIN_Z = 90000000000000

x_i = 0
y_i = 1
z_i = 2

while x_i < VERTICES.size:
    MAX_X = max(VERTICES[x_i], MAX_X)
    MIN_X = min(VERTICES[x_i], MIN_X)
    x_i += 3

while y_i < VERTICES.size:
    MAX_Y = max(VERTICES[y_i], MAX_Y)
    MIN_Y = min(VERTICES[y_i], MIN_Y)
    y_i += 3

while z_i < VERTICES.size:
    MAX_Z = max(VERTICES[z_i], MAX_Z)
    MIN_Z = min(VERTICES[z_i], MIN_Z)
    z_i += 3


MAX = np.amax(INDICES)
MIN = np.amin(INDICES)


MAX = np.amax(INDICES)

MIN = np.amin(INDICES)


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
            "count": HOWMANY,
            "type": "VEC3",
            "max": [MAX_X, MAX_Y, MAX_Z],
            "min": [MIN_X, MIN_Y, MIN_Z]
        },
        {
            "bufferView": 1,
            "byteOffset": 0,
            "componentType": 5123,
            "count": HOWMANY,
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
