import numpy as np
import base64

VERTICES = []
INDICES = []

HOWMANY = 3
MAX_X = np.NInf
MAX_Y = np.NInf
MAX_Z = np.NInf
MIN_X = np.Inf
MIN_Y = np.Inf
MIN_Z = np.Inf
MAX = np.NInf
MIN = 0
#open the file
file = open("armadillo.ply", "r")
counter = 1
for one_line in file:
    print(one_line)