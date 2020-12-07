import numpy as np
import base64

# Airplane Geometry obtained here: https://people.sc.fsu.edu/~jburkardt/data/ply/ply.html

VERTICES = []
INDICES = []

MAX_X = np.NInf
MAX_Y = np.NInf
MAX_Z = np.NInf
MIN_X = np.Inf
MIN_Y = np.Inf
MIN_Z = np.Inf
MAX = np.NInf
MIN = 0
#open the file
file = open("airplane.ply", "r")
counter = 1
for one_line in file:
    if (counter <= 9): # Header 12 lines long
        counter+=1
        continue
    values = one_line.split()
    values_read = []
    check = 0
    for val in values:
        values_read.append(float(val))
        check+=1
    if (check == 3):    # Line is a vertex
        MAX_X = max(MAX_X, values_read[0])
        MAX_Y = max(MAX_Y, values_read[1])
        MAX_Z = max(MAX_X, values_read[2])
        MIN_X = max(MIN_X, values_read[0])
        MIN_Y = max(MIN_X, values_read[1])
        MIN_Z = max(MIN_X, values_read[2])
        VERTICES.append(values_read)
    else:               # Line is an index
        MAX = max(MAX, values_read[1], values_read[2], values_read[3])
        INDICES.append(values_read[1:])

    VERTICES = np.array(VERTICES, dtype=np.float32)
    INDICES = np.array(INDICES, dtype=np.ushort)


HOWMANY_V = len(VERTICES)
HOWMANY_I = len(INDICES) * 3 # Each vertex is of length 3 this we multiply the indicies length by 3  
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

print ( str(gltf).replace("'", '"') ) # we need double quotes instead of single quotes

