import numpy as np
import base64
from itertools import islice


# Part 2: load mesh
file=open("motor.ply")

# Part 3: create the VERTICES array --------------------------------
# define vertices array and boundary
VERTICES = []
MAX_X = -np.inf
MAX_Y = -np.inf
MAX_Z = -np.inf
MIN_X = np.inf
MIN_Y = np.inf
MIN_Z = np.inf

# ispired by Fangda to use islice to grab information from the file
for item in islice(file,9,6915): 
    v = [float(item.strip()) for item in item.strip().split(' ')]
    # boundaries
    MAX_X = max(MAX_X, v[0])
    MAX_Y = max(MAX_Y, v[1])
    MAX_Z = max(MAX_Z, v[2])
    MIN_X = min(MIN_X, v[0])
    MIN_Y = min(MIN_Y, v[1])
    MIN_Z = min(MIN_Z, v[2])
    VERTICES.append(v)
VERTICES = np.array(VERTICES, dtype=np.float32)


# Part 4:  create the INDICES array --------------------------------
# define indices array and boundary
file2=open("motor.ply")
INDICES = []
MAX = -np.inf
MIN = 0  

for item in islice(file2, 6915, 20509): 
    w = [int(item.strip()) for item in item.strip().split(' ')[1:]]
    MAX = max(MAX, w[0],w[1],w[2])
    INDICES.append(w)
INDICES = np.array(INDICES, dtype=np.ushort)



HOWMANY_V = len(VERTICES)
HOWMANY_I = len(INDICES) * 3

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

    #bonus 1,  inspired by Fangda --------------------------------
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
                 "materials": 0  # Used in Bonus 1
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

