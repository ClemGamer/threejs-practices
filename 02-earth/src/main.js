import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import { getFresnelMat } from "./getFresnelMat";

const scene = new THREE.Scene();

const fov = 75;
const w = window.innerWidth;
const h = window.innerHeight;
const aspect = w / h;
const near = 0.1;
const far = 1000;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);

// const axes = new THREE.AxesHelper(5);
// scene.add(axes);
// new OrbitControls(camera, renderer.domElement);

const hemiLight = new THREE.HemisphereLight(0x222222, 0x222222);
scene.add(hemiLight);
const sunLight = new THREE.DirectionalLight(0xffffff, .8);
sunLight.position.set(-5, 0.5, 5);
scene.add(sunLight);

const loader = new THREE.TextureLoader();
const earthTex = await loader.loadAsync("2k_earth_daymap.jpg");
const earthGeo = new THREE.IcosahedronGeometry(1, 12);
const earthMat = new THREE.MeshStandardMaterial({
  map: earthTex,
});
const earthMesh = new THREE.Mesh(earthGeo, earthMat);

const earthGroup = new THREE.Group();
earthGroup.add(earthMesh);

const earthLightsTex = await loader.loadAsync("2k_earth_nightmap.jpg");
const earthLightsMat = new THREE.MeshStandardMaterial({
  map: earthLightsTex,
  blending: THREE.AdditiveBlending,
});
const earthLightsMesh = new THREE.Mesh(earthGeo, earthLightsMat);
earthGroup.add(earthLightsMesh);

const earthCloudsTex = await loader.loadAsync("2k_earth_clouds.jpg");
const earthCloudsMat = new THREE.MeshStandardMaterial({
  map: earthCloudsTex,
  transparent: true,
  opacity: 0.6,
  blending: THREE.AdditiveBlending,
});
const earthCloudsMesh = new THREE.Mesh(earthGeo, earthCloudsMat);
earthCloudsMesh.scale.setScalar(1.005);
earthGroup.add(earthCloudsMesh);

const earthGlowMat = getFresnelMat();
const earthGlowMesh = new THREE.Mesh(earthGeo, earthGlowMat);
earthGlowMesh.scale.setScalar(1.01);
earthGroup.add(earthGlowMesh);

scene.add(earthGroup);
earthGroup.rotation.z = (-23.5 * Math.PI) / 180;

function animate(t = 0) {
  requestAnimationFrame(animate);
  earthMesh.rotation.y += 0.002;
  earthLightsMesh.rotation.y += 0.002;
  earthCloudsMesh.rotation.y += 0.0023;
  renderer.render(scene, camera);
}

animate();
