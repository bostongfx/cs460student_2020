import numpy as np
import base64

# works for one triangle
""" VERTICES = np.array([0.,0.,0.,  0.,1.,0., 1.,0.,0.,], dtype=np.float32)
INDICES = np.array([0,1,2], dtype=np.ushort)
HOWMANY_V = 3
HOWMANY_I = 3
MAX_X = 1. 
MAX_Y = 1.
MAX_Z = 0.
MIN_X = 0.
MIN_Y =  0.
MIN_Z = 0.
MAX = 2
MIN = 0 """

# a few sides of a cube, works
"""VERTICES = np.array([-0.5, -0.5, 0.5,
            0.5, -0.5, 0.5,
            -0.5, 0.5, 0.5,
            0.5, 0.5, 0.5,
            -0.5, 0.5, -0.5,
            0.5, 0.5, -0.5,
            -0.5, -0.5, -0.5,
            0.5, -0.5, -0.5], dtype=np.float32)
INDICES = np.array([0,1,2,3,4,5,6,7], dtype=np.ushort)
HOWMANY_V = 8
HOWMANY_I = 8
MAX_X = 0.5
MAX_Y = 0.5
MAX_Z = 0.5
MIN_X = -0.5
MIN_Y =  -0.5
MIN_Z = -0.5
MAX = 7
MIN = 0 """

# a few more sides of a cube, works but incomplete
VERTICES = np.array([
    -0.5, -0.5, 0.5,
    0.5, -0.5, 0.5,
    -0.5, 0.5, 0.5,
    0.5, 0.5, 0.5,
    -0.5, 0.5, -0.5,
    0.5, 0.5, -0.5,
    -0.5, -0.5, -0.5,
    0.5, -0.5, -0.5,

    -0.5, -0.5, 0.5,
    0.5, -0.5, 0.5,
    -0.5, 0.5, 0.5,
    0.5, 0.5, 0.5,
    -0.5, 0.5, -0.5,
    0.5, 0.5, -0.5,
    -0.5, -0.5, -0.5,
    0.5, -0.5, -0.5,

    -0.5, -0.5, 0.5,
     0.5, -0.5, 0.5,
    -0.5, 0.5, 0.5,
    0.5, 0.5, 0.5,
    -0.5, 0.5, -0.5,
    0.5, 0.5, -0.5,
    -0.5, -0.5, -0.5,
    0.5, -0.5, -0.5
    ], dtype=np.float32)
INDICES = np.array([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23], dtype=np.ushort)
HOWMANY_V = 24
HOWMANY_I = 24
MAX_X = 0.5
MAX_Y = 0.5
MAX_Z = 0.5
MIN_X = -0.5
MIN_Y =  -0.5
MIN_Z = -0.5
MAX = 23
MIN = 0  

# based on the cube from blend, triangles are messed up and incomplete
"""VERTICES = np.array([1.000000, 1.000000, -1.000000,
 1.000000, -1.000000, -1.000000,
 1.000000, 1.000000, 1.000000,
 1.000000, -1.000000, 1.000000,
 -1.000000, 1.000000, -1.000000,
 -1.000000, -1.000000, -1.000000,
 -1.000000, 1.000000, 1.000000,
 -1.000000, -1.000000, 1.000000], dtype=np.float32)
INDICES = np.array([0,1,2,3,4,5,6,7], dtype=np.ushort)
HOWMANY_V = 8
HOWMANY_I = 8
MAX_X =1
MAX_Y = 1
MAX_Z = 1
MIN_X = -1
MIN_Y =  -1
MIN_Z = -1
MAX = 7
MIN = 0 """

# correct gltf, wildly incorrect triangles tho
"""VERTICES = np.array([1.000000, 1.000000, -1.000000,
 1.000000, -1.000000, -1.000000,
 1.000000, 1.000000, 1.000000,
 1.000000, -1.000000, 1.000000,
 -1.000000, 1.000000, -1.000000,
 -1.000000, -1.000000, -1.000000,
 -1.000000, 1.000000, 1.000000,
 -1.000000, -1.000000, 1.000000,

  0.0000, 1.0000, 0.0000,
 0.0000, 0.0000, 1.0000,
 -1.0000, 0.0000, 0.0000,
 0.0000, -1.0000, 0.0000,
 1.0000, 0.0000, 0.0000,
 0.0000, 0.0000, -1.0000 
 ], dtype=np.float32)
INDICES = np.array([0,1,2,3,4,5,6,7,8,9,10,11,12,13], dtype=np.ushort)
HOWMANY_V = 14
HOWMANY_I = 14
MAX_X =1
MAX_Y = 1
MAX_Z = 1
MIN_X = -1
MIN_Y = -1
MIN_Z = -1
MAX = 13
MIN = 0 """

HOWMANYBYTES_V = VERTICES.nbytes
HOWMANYBYTES_I = INDICES.nbytes
b64vertices = base64.b64encode(VERTICES)
b64indices = base64.b64encode(INDICES) 


gltf = {
    "asset" : {
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
            "uri": "data:application/octet-stream;base64," + str(b64vertices, 'utf-8'),
            "byteLength": HOWMANYBYTES_V
        },
        {
            "uri": "data:application/octet-stream;base64," + str(b64indices, 'utf-8'),
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

print(str(gltf).replace("'", '"'))