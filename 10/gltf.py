"""
CS 460 Assignment 10
Ayah Aboelela
12/7/2020

I referred to the following link for some parts of the code: 
https://github.com/yylhyyw/cs460student/blob/master/10/my_obj2gltf_cow.py
(Thanks to github user @yylhyyw)

"""

import numpy as np
import base64


VERTICES = []
INDICES = []

objfile = open("c:/Users/Ayah/Desktop/Courses/cs460student/10/cube.obj", "r")
for line in objfile.readlines():
    line = line.split()
    if (len(line) > 0):
        if line[0] == 'v':
            for i in line[1:]:
                VERTICES += [i]
        if line[0] == 'f':
            for i in line[1:]:
                INDICES += [int(i[0])-1]

objfile.close()

VERTICES = np.array(VERTICES, dtype=np.float32)
INDICES = np.array(INDICES, dtype=np.ushort)

HOWMANY_V = int(VERTICES.size / 3) # a cube has 24 vertex point but only 8 vertices, 24/3=8
HOWMANY_I = int(INDICES.size)

xvertices = []
for i in range(0, len(VERTICES), 3):
    xvertices.append(VERTICES[i])


MAX_X = max(xvertices)
MIN_X = min(xvertices)

yvertices = []
for i in range(1, len(VERTICES), 3):
    yvertices.append(VERTICES[i])

MAX_Y = max(yvertices)
MIN_Y = min(yvertices)

zvertices = []
for i in range(2, len(VERTICES), 3):
    zvertices.append(VERTICES[i])

MAX_Z = max(zvertices)
MIN_Z = min(zvertices)

MAX = np.amax(INDICES)
MIN = np.amin(INDICES)


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
