// Import from the file you just created in your own repo
import * as THREE from './three.js';
// Import OrbitControls from a reliable CDN
import { OrbitControls } from 'https://unpkg.com/three@0.150.1/examples/jsm/controls/OrbitControls.js';

console.log("Three.js is loading from my own repository!");

// 1. Scene Setup
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x9bf7fa);
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 2. Add Lighting (So we can see the 3D shapes)
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);
const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

// 3. Create the Rubik's Cube Grid
const cubies = [];
const spacing = 1.05; // Slightly larger than 1 to see the gaps between cubies

// Define the 6 Rubik's colors
const colors = [
    0xffffff, // Right (White)
    0xffff00, // Left (Yellow)
    0xff0000, // Top (Red)
    0xffa500, // Bottom (Orange)
    0x0000ff, // Front (Blue)
    0x008000  // Back (Green)
];

// Create an array of 6 materials
const faceMaterials = colors.map(color => new THREE.MeshPhongMaterial({ color }));

for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
        for (let z = -1; z <= 1; z++) {
            const geometry = new THREE.BoxGeometry(0.95, 0.95, 0.95); // Slightly smaller for gaps
            
            // Apply the 6 materials to the cube
            const cubie = new THREE.Mesh(geometry, faceMaterials);
            
            cubie.position.set(x * spacing, y * spacing, z * spacing);
            scene.add(cubie);
            cubies.push(cubie);
        }
    }
}

camera.position.z = 6;

// 4. Interactivity (Allows you to drag and rotate the view)
// Add a check to make sure OrbitControls is loaded
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Makes the movement feel "smooth"


// 5. Animation Loop
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

animate();
