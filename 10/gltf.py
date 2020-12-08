import numpy as np
import base64

obj_file = 'teapot.obj'


VERTICES, INDICES = [], []

with open(obj_file, 'r') as f:
    for line in f.readlines():
        if line[0] == 'v':
            VERTICES.extend([float(i) for i in line.split()[1:]])
        else:
            INDICES.extend([int(i) - 1 for i in line.split()[1:]])


VERTICES = np.array(VERTICES, dtype=np.float32)
INDICES = np.array(INDICES, dtype=np.int16)
VERTICES_3d = VERTICES.reshape((-1, 3))

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
            "count": len(VERTICES_3d),
            "type": "VEC3",
            "max": np.amax(VERTICES_3d, axis=0).tolist(),
            "min": np.amin(VERTICES_3d, axis=0).tolist()
        },
        {
            "bufferView": 1,
            "byteOffset": 0,
            "componentType": 5123,
            "count": len(INDICES),
            "type": "SCALAR",
            "max": [max(INDICES)],
            "min": [min(INDICES)]
        }
    ],

    "bufferViews": [
        {
            "buffer": 0,
            "byteOffset": 0,
            "byteLength": VERTICES.nbytes,
            "target": 34962
        },
        {
            "buffer": 1,
            "byteOffset": 0,
            "byteLength": INDICES.nbytes,
            "target": 34963
        }
    ],

    "buffers": [
        {
            "uri": "data:application/octet-stream;base64,"+str(B64_VERTICES, 'utf-8'),
            "byteLength": VERTICES.nbytes
        },
        {
            "uri": "data:application/octet-stream;base64,"+str(B64_INDICES, 'utf-8'),
            "byteLength": INDICES.nbytes
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
with open(obj_file.split('.')[0] + '.gltf', 'w') as f:
    f.write(str(gltf).replace("'", '"'))
