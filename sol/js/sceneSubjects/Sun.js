function SunLight(scene) {

    const light = new THREE.PointLight("#ffface", 1);
    scene.add(light);

    this.update = function(time) {
        light.intensity = ((Math.sin(time) / 16) + 1);
    }
}