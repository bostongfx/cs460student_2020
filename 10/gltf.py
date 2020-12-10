import sys
import numpy as np
import base64

vector_components = 3 # could do something with this in the future...

def ply_to_gltf(file):
    v = []
    i = []

    current_v_count = 0
    current_i_count = 0

    with open(file, 'r') as f:
        lines = f.read().split('end_header')
        header = lines[0].splitlines()
        data = lines[1].splitlines()[1:]

    if 'ply' not in header:
        print(f'{file}: invalid PLY file')
        return

    # credits to Loraine Franke (@lorifranke) for the vertex and index processing logic

    for h in header:
        if h.startswith('format'):
            if 'ascii' not in h:
                print(f'{file}: only ASCII PLY files are supported')
                return

        if h.startswith('element'):
            if 'vertex' in h:
                expected_v_count = int(h.split()[2])
            elif 'face' in h:
                expected_i_count = int(h.split()[2])

    for d in data:
        if current_v_count < expected_v_count:
            v.append([float(n) for n in d.split()])
            current_v_count += 1
            continue

        if current_i_count < expected_i_count:
            i.append([int(n) for n in d.split()[1:]])
            current_i_count += 1
            continue

    v_min_x = v_min_y = v_min_z = i_min = float('+inf')
    v_max_x = v_max_y = v_max_z = i_max = float('-inf')

    for vertex in v:
        v_min_x = min(v_min_x, vertex[0])
        v_min_y = min(v_min_y, vertex[1])
        v_min_z = min(v_min_z, vertex[2])
        v_max_x = max(v_max_x, vertex[0])
        v_max_y = max(v_max_y, vertex[1])
        v_max_z = max(v_max_z, vertex[2])

    for index in i:
        i_min = min(i_min, min(index))
        i_max = max(i_max, max(index))

    v = np.array(v, dtype=np.float32).flatten()
    i = np.array(i, dtype=np.ushort).flatten()

    v_bytes = v.nbytes
    i_bytes = i.nbytes

    v_base64 = base64.b64encode(v)
    i_base64 = base64.b64encode(i)

    gltf = {
        'asset': {
            'version': '2.0',
            'generator': 'CS460'
        },

        'accessors': [
            {
                'bufferView': 0,
                'byteOffset': 0,
                'componentType': 5126,
                'count': int(len(v) / vector_components),
                'type': 'VEC' + str(vector_components),
                'max': [v_max_x, v_max_y, v_max_z],
                'min': [v_min_x, v_min_y, v_min_z]
            },
            {
                'bufferView': 1,
                'byteOffset': 0,
                'componentType': 5123,
                'count': len(i),
                'type': 'SCALAR',
                'max': [i_max],
                'min': [i_min]
            }
        ],

        'bufferViews': [
            {
                'buffer': 0,
                'byteOffset': 0,
                'byteLength': v_bytes,
                'target': 34962
            },
            {
                'buffer': 1,
                'byteOffset': 0,
                'byteLength': i_bytes,
                'target': 34963
            }
        ],

        'buffers': [
            {
                'uri': 'data:application/octet-stream;base64,' + str(v_base64, 'utf-8'),
                'byteLength': v_bytes
            },
            {
                'uri': 'data:application/octet-stream;base64,' + str(i_base64, 'utf-8'),
                'byteLength': i_bytes
            }
        ],

        'meshes': [
            {
                'primitives': [{
                     'mode': 4,
                     'attributes': {
                         'POSITION': 0
                     },
                     'indices': 1
                }]
            }
        ],

        'nodes': [
            {
                'mesh': 0
            }
        ],

        'scenes': [
            {
                'nodes': [
                    0
                ]
            }
        ],

        'scene': 0
    }

    print(f'{file}: converted')
    return str(gltf).replace("'", '"')


if len(sys.argv) == 1:
    print(f'usage: {sys.argv[0]} <file 1> [file 2] ...')
else:
    for arg_file in sys.argv[1:]:
        converted = ply_to_gltf(arg_file)
        if converted != None:
            with open(arg_file + '.gltf', 'w') as f:
                f.write(converted)