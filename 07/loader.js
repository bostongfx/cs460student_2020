function nodes(ns, i, skeleton) {
    // loads a skeleton in gltf format and returns the list of nodes

    i = i || 0;
    skeleton = skeleton || [];

    var node = ns[i];
    var root = new THREE.Bone();
    root.position.set(0, 0, 0);
    skeleton[i] = root;

    if (node.name) {
        root.name = node.name
    }
    if (node.translation) {
      root.position.set(...node.translation);
    }
    if (node.rotation) {
      root.quaternion.set(...node.rotation);
    }
    if (node.scale) {
        root.scale.set(...node.scale)
    }
    if (node.children) {
        for (let ch of node.children) {
            nodes(ns, ch, skeleton);
            root.add(skeleton[ch]);
        }
    }

    return skeleton;
  }