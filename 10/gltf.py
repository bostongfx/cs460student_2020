import numpy as np
import base64

# Used the following link to better understand the format and structure of a ply file.
# https://people.math.sc.edu/Burkardt/data/ply/ply.txt
arrow = open("arrow.ply","r")
end_header = False
vertex_total = 0
vertex_count = 0
face_count = 0
vertex_array = []
faces = []

while not end_header:
	line = arrow.readline()
	if "element vertex" in line:
		vertex_total = int(line.split()[-1])
	if "element face" in line:
		face_count = int(line.split()[-1])
	if "end_header" in line:
		end_header = True

#print("loop 1 complete")

line = arrow.readline()
while line:
	if vertex_count < vertex_total:
		ver = []
		for v in line.split():
			ver.append(v)
		vertex_array.append(ver)
		vertex_count = vertex_count + 1
	elif vertex_count == vertex_total:
		fac = []
		for f in line.split():
			fac.append(f)
		faces.append(fac)
	line = arrow.readline()

#print("loop 2 complete")

minVx = minVy = minVz = minI = float("inf")
maxVx = maxVy = maxVz = maxI = float("-inf")
for v  in vertex_array:
	minVx = v[0] if v[0] < minVx else minVx
	#print(str(v[0]) + "    " + str(minVx) + "    " + str(min(v[0], minVx)))
	minVy = v[1] if v[1] < minVy else minVy
	minVz = v[2] if v[2] < minVz else minVz
	maxVx = v[0] if v[0] > maxVx else maxVx
	maxVy = v[1] if v[1] > maxVy else maxVy
	maxVz = v[2] if v[2] > maxVz else maxVz
	#print(str(v[0]) + " " + str(v[1]) + " " + str(v[2]))
	#print(str(minVx) + " " + str(minVy) + " " + str(minVz))
	#print(str(maxVx) + " " + str(maxVy) + " " + str(maxVz))

for f in faces:
	for i in f:
		minI = i if v[0] < minI else minI
		maxI = i if v[0] > maxI else maxI

vertices = []
indices = []
for ver in vertex_array:
	for v in ver:
		vertices.append(v)

for fac in faces:
	for f in fac:
		indices.append(f)


VERTICES = np.array(vertices, dtype=np.float32)
INDICES = np.array(indices, dtype=np.ushort)

# my updates for min werent working at all so I adapted this block of code for min variables from a student in the class, username:nehagoyal1994
# from here
MIN_X = int(float(min(map(lambda x: x[0], vertex_array))))
MIN_Y = int(float(min(map(lambda x: x[1], vertex_array))))
MIN_Z = int(float(min(map(lambda x: x[2], vertex_array))))
MIN = np.min(INDICES)
# to here

# print(str(MAX_X) + "	  " + str(MAX_Y) + "   " + str(MAX_Z))
# print(str(MAX))


HOWMANY_vers = len(vertex_array)
HOWMANY_inds = len(faces)
MAX_X = int(float(maxVx))
MAX_Y = int(float(maxVy))
MAX_Z = int(float(maxVz))
# MIN_X = ((minVx))
# MIN_Y = ((minVy))
# MIN_Z = ((minVz))
MAX = int((maxI))
# MIN = ((minI))

# print(str(MAX_X) + "	  " + str(MAX_Y) + "   " + str(MAX_Z))
# print(str(MAX))
# print(str(MIN))

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

dest = open("arrow.gltf", "w") 
dest.write( str(gltf).replace("'", '"') ) # we need double quotes instead of single quotes

