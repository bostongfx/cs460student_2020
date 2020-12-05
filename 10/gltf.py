import numpy as np
import base64
from itertools import islice

VERTICES = []
MAX_X = -np.inf
MAX_Y = -np.inf
MAX_Z = -np.inf
MIN_X = np.inf
MIN_Y = np.inf
MIN_Z = np.inf

#for vertices
# load ply file
file=open("shark.ply")
for a in islice(file,9,477):  # 9 to 477 lines are vertices in shark. ply, 477,1211 are indices
    v = [float(a.strip()) for a in a.strip().split(' ')]
    MAX_X = max(MAX_X, v[0])
    MAX_Y = max(MAX_Y, v[1])
    MAX_Z = max(MAX_Z, v[2])
    MIN_X = min(MIN_X, v[0])
    MIN_Y = min(MIN_Y, v[1])
    MIN_Z = min(MIN_Z, v[2])
    VERTICES.append(v)
VERTICES = np.array(VERTICES, dtype=np.float32)


# for indices
files=open("shark.ply")
INDICES = []
MAX = -np.inf
MIN = 0  #MIN is 0

for b in islice(files,477,1211): 
    w = [int(b.strip()) for b in b.strip().split(' ')[1:]]
    MAX = max(MAX, w[0],w[1],w[2])
    INDICES.append(w)
INDICES = np.array(INDICES, dtype=np.ushort)

################################################################################################
#parameters: 
HOWMANY_V = len(VERTICES)
HOWMANY_I = len(INDICES) * 3   #because an array has length of 3. so the total number should be len(INDICES) multiply by 3


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
    
    #bonus 1,  get idea of how to add material from https://zhuanlan.zhihu.com/p/65565064
    "materials" : [
    {
      "pbrMetallicRoughness": {
        "baseColorFactor": [ 1.000, 0.766, 0.336, 1.0 ],
        "metallicFactor": 0.5,
        "roughnessFactor": 0.1
      }
    }
  ],

    "meshes": [
        {
            "primitives": [{
                 "mode": 4,
                 "attributes": {
                     "POSITION": 0 
                 },
                 "indices": 1,
                 "material": 0  # add material
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
