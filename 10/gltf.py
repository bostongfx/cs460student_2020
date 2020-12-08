import numpy as np
import base64


# VERTICES = np.array([0.,0.,0.,    0.,1.,0.,    1.,0.,0.], dtype=np.float32)
# INDICES = np.array([0, 1, 2], dtype=np.ushort)


VERTICES, INDICES = [], []
with open('teddybear.obj', 'r') as f:
    for line in f.readlines():
        if line[0] == 'v':
            l = [float(i) for i in line.split()[1:]]
            VERTICES.extend(l)
        else:
            l = [int(i) - 1 for i in line.split()[1:]]
            INDICES.extend(l)


VERTICES = np.array(VERTICES, dtype=np.float32)
INDICES = np.array(INDICES, dtype=np.int16)


vs = np.reshape(VERTICES, (-1, 3))
maxes, mins = np.amax(vs, axis=0), np.amin(vs, axis=0)

HOWMANY = 3
MAX_X = maxes[0]
MAX_Y = maxes[1]
MAX_Z = maxes[2]
MIN_X = mins[0]
MIN_Y = mins[1]
MIN_Z = mins[2]
MAX = max(INDICES)
MIN = min(INDICES)

HOWMNAY_V = len(VERTICES) // 3
HOWMANY_I = len(INDICES)

HOWMANYBYTES_V = VERTICES.nbytes
HOWMANYBYTES_I = INDICES.nbytes

B64_VERTICES = base64.b64encode(VERTICES)
B64_INDICES = base64.b64encode(INDICES)

print(B64_VERTICES)

print(maxes)
print(mins)
print(MAX)
print(MIN)

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

# we need double quotes instead of single quotes
# print(str(gltf).replace("'", '"'))
with open('teddybear.gltf', 'w') as f:
    f.write(str(gltf).replace("'", '"'))
