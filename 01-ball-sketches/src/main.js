import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

(() => {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 5;
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // 可用滑鼠自由旋轉視角
  const controls = new OrbitControls(camera, renderer.domElement);

  // 三軸輔助線
  // const axes = new THREE.AxesHelper(20);
  // scene.add(axes);

  // 天空光與地面光
  const hemisLight = new THREE.HemisphereLight(0x00ffff, 0xff00ff);
  scene.add(hemisLight);

  // 圓球
  const geo = new THREE.IcosahedronGeometry(1, 1);
  const mat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    flatShading: true,
  });
  const mesh = new THREE.Mesh(geo, mat);
  scene.add(mesh);

  // 圓球邊線
  const wireMat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    wireframe: true,
  });
  const wireMesh = new THREE.Mesh(geo, wireMat);
  wireMesh.scale.setScalar(1.005);
  mesh.add(wireMesh);

  function animate(t = 0) {
    requestAnimationFrame(animate);
    mesh.rotation.y += 0.01;
    mesh.rotation.x += 0.01;
    renderer.render(scene, camera);
  }

  animate();

  // RWD
  window.addEventListener("resize", function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
})();
