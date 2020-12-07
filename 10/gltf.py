import numpy as np
import base64

VERTICES_IN_FILE = []
INDICES_IN_FILE = []
fileObj = open("cube.obj", "r")

for line in fileObj.readlines():
    list = line.split()
    if list[0] == 'v':
        VERTICES_IN_FILE.append(float(list[1]))
        VERTICES_IN_FILE.append(float(list[2]))
        VERTICES_IN_FILE.append(float(list[3]))
    if list[0] == 'f':
        INDICES_IN_FILE.append(float(list[1]) - 1)
        INDICES_IN_FILE.append(float(list[2]) - 1)
        INDICES_IN_FILE.append(float(list[3]) - 1)

fileObj.close()

VERTICES = np.array(VERTICES_IN_FILE, dtype=np.float32)
INDICES = np.array(INDICES_IN_FILE, dtype=np.int16)

HOWMNAY_V = len(VERTICES_IN_FILE) // 3
HOWMANY_I = len(INDICES_IN_FILE)

MAX_X = -10000
MAX_Y = -10000
MAX_Z = -10000
MIN_X = 10000
MIN_Y = 10000
MIN_Z = 10000
MAX = -10000
MIN = 10000

indexX = 0
while indexX < len(VERTICES_IN_FILE):
    MAX_X = max(VERTICES_IN_FILE[indexX], MAX_X)
    MIN_X = min(VERTICES_IN_FILE[indexX], MIN_X)
    indexX += 3

indexY = 1
while indexY < len(VERTICES_IN_FILE):
    MAX_Y = max(VERTICES_IN_FILE[indexY], MAX_Y)
    MIN_Y = min(VERTICES_IN_FILE[indexY], MIN_Y)
    indexY += 3

indexZ = 2
while indexZ < len(VERTICES_IN_FILE):
    MAX_Z = max(VERTICES_IN_FILE[indexZ], MAX_Z)
    MIN_Z = min(VERTICES_IN_FILE[indexZ], MIN_Z)
    indexZ += 3

index = 0
while index < len(INDICES_IN_FILE):
    MAX = max(INDICES_IN_FILE[index], MAX)
    MIN = min(INDICES_IN_FILE[index], MIN)
    index += 1

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
            "count": HOWMNAY_V,
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
            "uri": "data:application/octet-stream;base64," + str(B64_VERTICES, 'utf-8'),
            "byteLength": HOWMANYBYTES_V
        },
        {
            "uri": "data:application/octet-stream;base64," + str(B64_INDICES, 'utf-8'),
            "byteLength": HOWMANYBYTES_I
        }
    ],

    "materials": [
         {
            "pbrMetallicRoughness": {
            "baseColorFactor":
                [1.0, 0, 1, 1]
            }
        }
      ],

    "meshes": [
        {
            "primitives": [{
                "mode": 4,
                "material": 0,
                "attributes": {
                    "POSITION": 0
                },
            "indices": 1,
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

print(str(gltf).replace("'", '"'))  # we need double quotes instead of single quotes

