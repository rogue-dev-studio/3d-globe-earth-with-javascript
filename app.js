// Set up the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Set up the Earth texture
const textureLoader = new THREE.TextureLoader();
const earthTexture = textureLoader.load('https://raw.githubusercontent.com/jeromeetienne/threex.planets/master/images/earthmap1k.jpg');

// Create the Earth geometry and material
const earthGeometry = new THREE.SphereGeometry(1, 32, 32);
const earthMaterial = new THREE.MeshBasicMaterial({ map: earthTexture });

// Create the Earth object
const earth = new THREE.Mesh(earthGeometry, earthMaterial);
scene.add(earth);

// Position the camera
camera.position.z = 10;

// Set up rotation variables
let mouseX = 0;
let mouseY = 0;
let mouseZ = 0;
let rotateSpeed = 0.02;

// Animation loop
const animate = function () {
    requestAnimationFrame(animate);

    // Update Earth's rotation based on mouse position
    earth.rotation.y -= mouseX * rotateSpeed;
    earth.rotation.x -= mouseY * rotateSpeed;

    // Automatic rotation
    earth.rotation.y += rotateSpeed;

    // Zoom based on mouse wheel
    if (mouseZ !== 0) {
        camera.position.z -= mouseZ * 0.1;
        if (camera.position.z < 5) camera.position.z = 5;
    }

    renderer.render(scene, camera);
};

animate();

// Mouse move event listener
const onMouseMove = (event) => {
    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
};

document.addEventListener('mousemove', onMouseMove, false);

// Mouse wheel event listener
const onMouseWheel = (event) => {
    mouseZ = event.deltaY * -0.01;
};

document.addEventListener('wheel', onMouseWheel, false);

// Resize event listener
const onResize = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
};

window.addEventListener('resize', onResize, false);

// First render
onResize();
