import numpy as np
import base64, os, sys


def obj2gltf(file_path):
  ind = [] # indices
  ver = [] # vertex
  nor = [] # vertex normals

  MAX = float('-inf')
  MIN = float('inf')
  
  MAX_X = float('-inf')
  MAX_Y = float('-inf')
  MAX_Z = float('-inf')
  MIN_X = float('inf')
  MIN_Y = float('inf')
  MIN_Z = float('inf')

  MAX_X_N = float('-inf')
  MAX_Y_N = float('-inf')
  MAX_Z_N = float('-inf')
  MIN_X_N = float('inf')
  MIN_Y_N = float('inf')
  MIN_Z_N = float('inf')

  with open(file_path, "r") as file:
    for line in file:
      tokens = line.split()
      if len(tokens) >= 4:
        if tokens[0] == 'v':
          x = float(tokens[1])
          y = float(tokens[2])
          z = float(tokens[3])
          if x > MAX_X: MAX_X = x
          if x < MIN_X: MIN_X = x
          if y > MAX_Y: MAX_Y = y
          if y < MIN_Y: MIN_Y = y
          if z > MAX_Z: MAX_Z = z
          if z < MIN_Z: MIN_Z = z
          ver.append(x)
          ver.append(y)
          ver.append(z)
        elif tokens[0] == 'vn':
          x = float(tokens[1])
          y = float(tokens[2])
          z = float(tokens[3])
          if x > MAX_X_N: MAX_X_N = x
          if x < MIN_X_N: MIN_X_N = x
          if y > MAX_Y_N: MAX_Y_N = y
          if y < MIN_Y_N: MIN_Y_N = y
          if z > MAX_Z_N: MAX_Z_N = z
          if z < MIN_Z_N: MIN_Z_N = z
          nor.append(x)
          nor.append(y)
          nor.append(z)
        elif tokens[0] == 'f':
          for token in tokens[1:4]:
            # -1 b/c obj indices are 1-based and we want 0-based
            i = int(token)-1
            if i > MAX: MAX = i
            if i < MIN: MIN = i
            ind.append(i)

  HOWMANY_I = len(ind)
  HOWMANY_V = len(ver) / 3
  HOWMANY_N = len(nor) / 3
  
  INDICES = np.array(ind, dtype=np.ushort)
  VERTICES = np.array(ver, dtype=np.float32)
  
  HOWMANYBYTES_I = INDICES.nbytes
  HOWMANYBYTES_V = VERTICES.nbytes
  
  B64_INDICES = base64.b64encode(INDICES)
  B64_VERTICES = base64.b64encode(VERTICES)

  gltf = {}
  if HOWMANY_V == HOWMANY_N:
    NORMALS = np.array(nor, dtype=np.float32)
    HOWMANYBYTES_N = NORMALS.nbytes
    B64_NORMALS = base64.b64encode(NORMALS)
    gltf = {
      "asset": {
        "version": "2.0",
        "generator": "CS460 Magic Fingers"
      },

      "accessors": [ 
        {
          "bufferView": 0,
          "byteOffset": 0,
          "componentType": 5123,    # UNSIGNED_SHORT
          "count": HOWMANY_I,
          "type": "SCALAR",
          "max": [MAX],
          "min": [MIN]
        },
        {
          "bufferView": 1,
          "byteOffset": 0,
          "componentType": 5126,    # FLOAT
          "count": HOWMANY_V,
          "type": "VEC3",
          "max": [MAX_X, MAX_Y, MAX_Z],
          "min": [MIN_X, MIN_Y, MIN_Z]
        },
        {
          "bufferView": 2,
          "byteOffset": 0,
          "componentType": 5126,    # FLOAT
          "count": HOWMANY_N,
          "type": "VEC3",
          "max": [MAX_X_N, MAX_Y_N, MAX_Z_N],
          "min": [MIN_X_N, MIN_Y_N, MIN_Z_N]
        }
      ], 

      "bufferViews": [
        {
          "buffer": 0,
          "byteOffset": 0,
          "byteLength": HOWMANYBYTES_I,
          "target": 34963   # ELEMENT_ARRAY_BUFFER
        },
        {
          "buffer": 1,
          "byteOffset": 0,
          "byteLength": HOWMANYBYTES_V,
          "target": 34962   # ARRAY_BUFFER
        },
        {
          "buffer": 2,
          "byteOffset": 0,
          "byteLength": HOWMANYBYTES_N,
          "target": 34962   # ARRAY_BUFFER
        }
      ],
      
      "buffers": [
        {
          "uri": "data:application/octet-stream;base64,"+str(B64_INDICES, 'utf-8'),
          "byteLength": HOWMANYBYTES_I
        },
        {
          "uri": "data:application/octet-stream;base64,"+str(B64_VERTICES, 'utf-8'),
          "byteLength": HOWMANYBYTES_V
        },
        {
          "uri": "data:application/octet-stream;base64,"+str(B64_NORMALS, 'utf-8'),
          "byteLength": HOWMANYBYTES_N
        }
      ],

      "materials": [
         {
          "pbrMetallicRoughness": {
          "baseColorFactor":
            [ 1.0, 0.75, 0.35, 1.0 ]
          }
        }
      ],
    
      "meshes": [
        {
          "primitives": [{
            "mode": 4,   # TRIANGLES
            "material": 0,
            "indices": 0,
            "attributes": {
              "POSITION": 1,
              "NORMAL": 2
            }
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
          "nodes": [ 0 ]
        }
      ],

      "scene": 0
    }
    
  else:
    gltf = {
      "asset": {
        "version": "2.0",
        "generator": "CS460 Magic Fingers"
      },

      "accessors": [ 
        {
          "bufferView": 0,
          "byteOffset": 0,
          "componentType": 5123,    # UNSIGNED_SHORT
          "count": HOWMANY_I,
          "type": "SCALAR",
          "max": [MAX],
          "min": [MIN]
        },
        {
          "bufferView": 1,
          "byteOffset": 0,
          "componentType": 5126,    # FLOAT
          "count": HOWMANY_V,
          "type": "VEC3",
          "max": [MAX_X, MAX_Y, MAX_Z],
          "min": [MIN_X, MIN_Y, MIN_Z]
        }
      ], 

      "bufferViews": [
        {
          "buffer": 0,
          "byteOffset": 0,
          "byteLength": HOWMANYBYTES_I,
          "target": 34963   # ELEMENT_ARRAY_BUFFER
        },
        {
          "buffer": 1,
          "byteOffset": 0,
          "byteLength": HOWMANYBYTES_V,
          "target": 34962   # ARRAY_BUFFER
        }
      ],
      
      "buffers": [
        {
          "uri": "data:application/octet-stream;base64,"+str(B64_INDICES, 'utf-8'),
          "byteLength": HOWMANYBYTES_I
        },
        {
          "uri": "data:application/octet-stream;base64,"+str(B64_VERTICES, 'utf-8'),
          "byteLength": HOWMANYBYTES_V
        }
      ],

      "materials": [
         {
          "pbrMetallicRoughness": {
          "baseColorFactor":
            [ 1.0, 0.75, 0.35, 1.0 ]
          }
        }
      ],
    
      "meshes": [
        {
          "primitives": [{
            "mode": 4,   # TRIANGLES
            "material": 0,
            "indices": 0,
            "attributes": {
              "POSITION": 1
            }
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
          "nodes": [ 0 ]
        }
      ],

      "scene": 0
    }
  
  # we need double quotes instead of single quotes
  return str(gltf).replace("'", '"')



def main():
  if len(sys.argv) < 2:
    print("Error: no file path.")
    return

  file_path = sys.argv[1]
  # file_path =os.path.dirname(os.path.realpath(__file__)) + "/../model_samples/triangle.obj"

  print(obj2gltf(file_path))
  return



if __name__ == "__main__":
    main()