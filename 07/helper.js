HELPER = {};

/*/
 * This method returns [geometry, material, bones] to create a skeleton mesh based on a cylinder.
 *
 * @param howMany: number of bones
 * @param howWide: radius of the cylinder
 * @param color: color of the cylinder
 *
/*/
HELPER.cylinderSkeletonMesh = function(howMany, howWide, color) {
	// just a temporary value but it needs to match for geometry and bones
	var segmentHeight = 10;
	var height = segmentHeight * howMany;

	// inspired by https://threejs.org/docs/scenes/bones-browser.html

	// step 1: geometry
	var geometry = new THREE.CylinderBufferGeometry(
		howWide,		// radiusTop
		howWide,		// radiusBottom
		height,			// height
		8,				// radiusSegments
		howMany * 3,	// heightSegments
		true			// openEnded
	);

	var position = geometry.attributes.position;

	var vertex = new THREE.Vector3();

	var skinIndices = [];
	var skinWeights = [];

	for (var i = 0; i < position.count; i++) {
		vertex.fromBufferAttribute(position, i);

		var y = (vertex.y + height / 2);

		var skinIndex = Math.floor(y / segmentHeight);
		var skinWeight = (y % segmentHeight) / segmentHeight;

		skinIndices.push(skinIndex, skinIndex + 1, 0, 0);
		skinWeights.push(1 - skinWeight, skinWeight, 0, 0);
	}

	geometry.setAttribute('skinIndex', new THREE.Uint16BufferAttribute(skinIndices, 4));
	geometry.setAttribute('skinWeight', new THREE.Float32BufferAttribute(skinWeights, 4));

	// step 2: setup material
	var material = new THREE.MeshStandardMaterial({
		skinning: true, // IMPORTANT!
		color: color,
		side: THREE.DoubleSide,
		flatShading: true
	});

	// step 3: setup bones
	var bones = [];

	// we always need a dummy parent bone as the anchor point
	var parentBone = new THREE.Bone();
	// parentBone.position.y = -height / 2; // weeeeird
	bones.push(parentBone);

	for (var i = 0; i < howMany; i++) {
		var currentBone = new THREE.Bone();
		currentBone.position.y = segmentHeight;

		parentBone.add(currentBone);
		bones.push(currentBone);
		parentBone = currentBone;
	}

	return [geometry, material, bones];
};