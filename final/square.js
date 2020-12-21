import * as THREE from "three";

export const createSphere = () => {
    const sphereGeometry = new THREE.SphereGeometry(10, 32, 32);
    const sphereMaterial = new THREE.MeshBasicMaterial({
        color: 0xffff00,
        size: 10,
    });
    return new THREE.Mesh(sphereGeometry, sphereMaterial);
}


export const addBall = (parent, camera, updatables) => {
    const ball = createSphere(), lengh = 100;

    const conner = [
        [-lengh, 0, lengh],
        [lengh, 0, lengh],
        [lengh, 0, -lengh],
        [-lengh, 0, -lengh],
    ];

    ball.position.fromArray(conner[0]);
    camera.position.fromArray(conner[0]);

    ball.long = 0;

    ball.update = (delta) => {
        ball.long = (ball.long + delta * 10) % (4 * lengh * 2);
        let a = Math.floor(ball.long / (lengh * 2)),
            b = ball.long % (lengh * 2),
            p = [], cp = [], n = 5;
        if (a == 0) {
            p = [b - lengh, 0, lengh];
            cp = [b - lengh, 0, lengh * n];
        }
        if (a == 1) {
            p = [lengh, 0, lengh - b];
            cp = [lengh * n, 0, lengh - b];
        }
        if (a == 2) {
            p = [lengh - b, 0, lengh];
            cp = [lengh - b, 0, lengh*n];
        }
        if (a == 3) {
            p = [-lengh, 0, b - lengh];
            cp = [-lengh*n, 0, b - lengh];
        }
        ball.position.fromArray(p);
        camera.position.fromArray(cp);
        camera.lookAt(ball.position);
    }
    parent.add(ball);
    updatables.push(ball);
    return ball;}