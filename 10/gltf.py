import numpy as np
import base64

arrow = open("arrow.ply","r")

n_Vertices = 0
v_parsed = 0
i_parsed = 0

end_header = False

verti = []
faces = []

while not end_header:
    line = arrow.readline()
    if "element vertex" in line:
        n_Vertices = int(line.split()[-1])
    if "element face" in line:
        i_parsed = int(line.split()[-1])
    if "end_header" in line:
        end_header = True

for line in arrow.readlines():
    if v_parsed < n_Vertices:
        ver = []
        for v in line.split():
            ver.append(v)
        verti.append(ver)
        v_parsed = v_parsed + 1
    elif v_parsed == n_Vertices:
        fac = []
        for f in line.split():
            fac.append(f)
        faces.append(fac)

max_Vx = max_Vy = max_Vz = maxI = float("-inf")
for v  in verti:
    max_Vx = v[0] if v[0] > max_Vx else max_Vx
    max_Vy = v[1] if v[1] > max_Vy else max_Vy
    max_Vz = v[2] if v[2] > max_Vz else max_Vz

for f in faces:
    for i in f:
        maxI = i if f[0] > maxI else maxI

v_flat = []
for ver in verti:
    for v in ver:
        v_flat.append(v)

i_flat = []
for fac in faces:
    for f in fac:
        i_flat.append(f)


VERTICES = np.array(v_flat, dtype=np.float32)
INDICES = np.array(i_flat, dtype=np.ushort)


HOWMANY_vers = len(verti)
HOWMANY_inds = len(faces)
MAX_X = int(float(max_Vx))
MAX_Y = int(float(max_Vy))
MAX_Z = int(float(max_Vz))
MIN_X = int(float(min(map(lambda x: x[0], verti))))
MIN_Y = int(float(min(map(lambda x: x[1], verti))))
MIN_Z = int(float(min(map(lambda x: x[2], verti))))
MIN = np.min(INDICES)
MAX = int((maxI))

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
            "count": HOWMANY_vers,
            "type": "VEC3",
            "max": [MAX_X, MAX_Y, MAX_Z],
            "min": [MIN_X, MIN_Y, MIN_Z]
        },
        {
            "bufferView": 1,
            "byteOffset": 0,
            "componentType": 5123,
            "count": HOWMANY_inds,
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
            #"uri": "data:application/octet-stream;base64,"+str(B64_VERTICES, 'utf-8'),
            "uri": "data:application/octet-stream;base64,"+str(B64_VERTICES).encode('utf-8'),
            "byteLength": HOWMANYBYTES_V
        },
        {
            #"uri": "data:application/octet-stream;base64,"+str(B64_INDICES, 'utf-8'),
            "uri": "data:application/octet-stream;base64,"+str(B64_INDICES).encode('utf-8'),
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
                 "i_flat": 1
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

dest = open("arrow.gltf", "w") 
dest.write( str(gltf).replace("'", '"') ) # we need double quotes instead of single quotes

