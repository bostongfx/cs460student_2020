import numpy as np
import base64

# Reads the header of a given .ply file, returning an
# object with 2 entries: format and elements
def readHeader(f):
    elements = []
    line = f.readline().decode('ascii').rstrip()
    if (line != 'ply'):
        raise IOError('Invalid .ply file. Does not begin with \"ply\n\"')
    line = f.readline().decode('ascii').rstrip()
    while (line != 'end_header'):
        words = line.split(' ')
        if (words[0] == 'format'):
            format = words[1]
            version = words[2]
#        elif (words[0] == 'comment'): # gltf doesn't have comment area, so discard
        elif (words[0] == 'element'):
            element = str(words[1])
            count = int(words[2])
            properties = []
            line = f.readline().decode('ascii').rstrip()
            words = line.split(' ')
            while (words[0] == 'property'):
                if (words[1] == 'list'):
                    properties.append([str(words[1]), str(words[2]), str(words[3]), str(words[4])])
                else:
                    properties.append([str(words[1]), str(words[2])])
                line = f.readline().decode('ascii').rstrip()
                words = line.split(' ')
            elements.append({ 'element': element, 'count': count, 'properties': properties })
            # Inner while loop read a line, so skip the readline below
            continue
        line = f.readline().decode('ascii').rstrip()
        
    return {
        "format": format + " " + version,
        "elements": elements,
    }

# A dictionary of numpy types, which includes their byte size and letter-code
# There are two versions of most types because I ran into different .ply files
# with different values for the same type.
types = {
    "int8"      : { "size": 1, "code": "i1" },
    "uint8"     : { "size": 1, "code": "u1" },
    "char"      : { "size": 1, "code": "i1" },
    "uchar"     : { "size": 1, "code": "u1" },
    "int16"     : { "size": 2, "code": "i2" },
    "uint16"    : { "size": 2, "code": "u2" },
    "short"     : { "size": 2, "code": "i2" },
    "ushort"    : { "size": 2, "code": "u2" },
    "int32"     : { "size": 4, "code": "i4" },
    "uint32"    : { "size": 4, "code": "u4" },
    "int"       : { "size": 4, "code": "i4" },
    "uint"      : { "size": 4, "code": "u4" },
    "float"     : { "size": 4, "code": "f4" },
    "float32"   : { "size": 4, "code": "f4" },
    "float64"   : { "size": 8, "code": "f8" },
    "double"    : { "size": 8, "code": "f8" }
}

# reads the header format string and returns whether the
# file format is binary/ascii and big/little endian flag for numpy
def getFormat(format):
    if ('binary' in format):
        isBinary = True
        if ('big_endian' in format):
            end = '>'
        else:
            end = '<'
    elif('ascii' in format):
        isBinary = False
        end = ''
    else:
        raise IOError('Invalid .ply format. Must be ascii or binary')
    return isBinary, end

# Scans the properties and returns if any property is a list
# If so, reading of input must be handled differently.
def elementHasListProperty(props):
    noList = True
    for property in props:
        if (property[0] == 'list'):
            noList = False
    return noList

# Reads all properties for an element, given that no
# property for the element contains a list of values.
def readNoListProperties(isBinary, end, rowCount, props):
    dtype = ''
    dtypeArray = []
    for property in props:
        dtype += end + types[property[0]]['code'] + ", "
        dtypeArray.append(end + types[property[0]]['code'])
    dtype = dtype.rstrip(", ")
    allSame = False
    if dtypeArray.count(dtypeArray[0]) == len(dtypeArray):
        allSame = True
    if (isBinary):
        data = np.fromfile(f, dtype=dtype, count=rowCount)
        if (allSame):
            data = data.astype(dtype).view(dtype=dtypeArray[0]).reshape(data.shape[0], len(dtypeArray))
        return data
    else:
        data = np.loadtxt(f, dtype=dtype, max_rows=rowCount, encoding='ascii')
        if (allSame):
            data = data.astype(dtype).view(dtype=dtypeArray[0]).reshape(data.shape[0], len(dtypeArray))
        return data

# Reads a row of property values formatted as binary. Returns up to two things:
# A numpy array of values (either vertex of index), and/or an array with other data
def readBinaryListProp(end, props):
    row = []
    indexRow = []
    for property in props:
        if (property[0] != 'list'):
            dtype = end + types[property[0]]['code']
            row.append(np.fromfile(f, dtype=dtype, count=1)[0])
        else:
            dtype = end + types[property[1]]['code']
            count = np.fromfile(f, dtype=dtype, count=1)[0]
            dtype = end + types[property[2]]['code']
            # np.frombuffer() is a bit faster with binary data. When testing with
            # armadillo.ply, frombuffer ran in ~28 seconds vs ~31 with fromfile
            bts = types[property[2]]['size']
            if (len(property) == 4 and property[3] == 'vertex_indices'):
                indexRow = np.frombuffer(f.read(count*bts), dtype=dtype, count=count)
            else:
                row.append(np.frombuffer(f.read(count*bts), dtype=dtype, count=count))
    return indexRow, row

# Reads a row of property values formatted as ascii. Returns up to two things:
# A numpy array of values (either vertex of index), and/or an object with other data
def readAsciiListProp(end, props):
    row = []
    indexRow = []
    line = np.loadtxt(f, dtype='U', max_rows=1, encoding='ascii')
    # Offset is used to handle list values, ensuring they get indexed correctly.
    offset = 0
    for i in range(len(props)):
        property = props[i]
        if (property[0] != 'list'):
            row.append(np.cast[types[property[0]]['code']](line[i+offset]))
        else:
            count = np.cast[types[property[1]]['code']](line[i+offset])
            offset += 1
            listVals = np.empty([count], dtype=types[property[2]]['code'])
            for j in range(count):
                listVals[j] = line[i+offset]
                offset += 1
            if (len(property) == 4 and property[3] == 'vertex_indices'):
                indexRow = listVals
            else:
                row.append(listVals)
    return indexRow, row

# Reads all properties for an element, given that at least
# one property of the element contains a list of values.
def readListProperties(isBinary, end, rowCount, props):
    otherRows = []
    indexRows = []
    for i in range(rowCount):
        if (isBinary):
            indexRow, otherRow = readBinaryListProp(end, props)
            indexRows.append(indexRow)
            otherRows.append(otherRow)
        else:
            indexRow, otherRow = readAsciiListProp(end, props)
            indexRows.append(indexRow)
            otherRows.append(otherRow)
    return indexRows, otherRows

# Reads all elements from the given file and returns three things:
# vertex and index numpy arrays, and an object containing any other read data
def readElements(f, header):
    elements = {}
    isBinary, end = getFormat(header['format'])
    for element in header['elements']:
        if (elementHasListProperty(element['properties'])):
            args = (isBinary, end, element['count'], element['properties'])
            elements[element['element']] = readNoListProperties(*args)
        else:
            elements[element['element']] = []
            cols = len(element['properties'])
            args = (isBinary, end, element['count'], element['properties'])
            vertex_indices, otherData = readListProperties(*args)
            if (len(vertex_indices) > 0):
                elements['indices'] = np.array(vertex_indices)
            if (len(otherData) > 0):
                elements[element['element']] = otherData
    try:
        return elements['vertex'], elements['indices']
    except KeyError:
        raise IOError('Unknown ply format')

filename = "teapot"
f = open(filename + ".ply", mode='rb')
VERTICES, INDICES = readElements(f, readHeader(f))
f.close()

HOWMANY = len(VERTICES)
MAX_X, MAX_Y, MAX_Z = np.max(VERTICES, axis=0)
MIN_X, MIN_Y, MIN_Z = np.min(VERTICES, axis=0)

VERTICES = VERTICES.flatten().astype(np.float32)
INDICES = INDICES.flatten().astype(np.int32)
MAX = np.max(INDICES)
MIN = np.min(INDICES)

HOWMANYBYTES_V = VERTICES.nbytes
HOWMANYBYTES_I = INDICES.nbytes

B64_VERTICES = base64.b64encode(VERTICES)
B64_INDICES = base64.b64encode(INDICES)
        
gltf = {
    "asset": {
        "version": "2.0",
        "generator": "CS460 JEMerator"
    },
    
    "accessors": [
        {
            "bufferView": 0,
            "byteOffset": 0,
            "componentType": 5126,
            "count": HOWMANY,
            "type": "VEC3",
            "max": [MAX_X, MAX_Y, MAX_Z],
            "min": [MIN_X, MIN_Y, MIN_Z]
        },
        {
            "bufferView": 1,
            "byteOffset": 0,
            "componentType": 5125,
            "count": HOWMANY,
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

f = open(filename + ".gltf", "w")
f.write(str(gltf).replace("'", '"'))
f.close()
#print ( str(gltf).replace("'", '"') ) # we need double quotes instead of single quotes

