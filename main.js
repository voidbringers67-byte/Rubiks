
import { OrbitControls } from 'https://esm.sh/three@0.150.1/examples/jsm/controls/OrbitControls.js';
// Import from the file you just created in your own repo
import * as THREE from './three.js';

console.log("Three.js is attempting to load...");
console.log("Three.js is loading from my own repository!");

// 1. Scene Setup
const scene = new THREE.Scene();
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

for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
        for (let z = -1; z <= 1; z++) {
            const geometry = new THREE.BoxGeometry(1, 1, 1);

            // MeshNormalMaterial gives each side a different color automatically
            const material = new THREE.MeshNormalMaterial(); 

            const cubie = new THREE.Mesh(geometry, material);

            // Position the cubie in the 3D grid
            cubie.position.set(x * spacing, y * spacing, z * spacing);

            scene.add(cubie);
            cubies.push(cubie);
                                        }    
                                    }
                                }

camera.position.z = 6;

// 4. Interactivity (Allows you to drag and rotate the view)
const controls = new OrbitControls(camera, renderer.domElement);

// 5. Animation Loop
function animate() {
requestAnimationFrame(animate);
controls.update();
renderer.render(scene, camera);
}

animate();
