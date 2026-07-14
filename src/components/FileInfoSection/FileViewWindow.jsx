import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { ThreeMFLoader } from 'three/examples/jsm/loaders/3MFLoader.js';
import styles from './FileViewWindow.module.css';

function fitCameraToObject(camera, object, controls) {
  const box = new THREE.Box3().setFromObject(object);
  const size = box.getSize(new THREE.Vector3());
  const center = box.getCenter(new THREE.Vector3());
  const maxDim = Math.max(size.x, size.y, size.z);
  const fov = camera.fov * (Math.PI / 180);
  const distance = Math.abs(maxDim / (2 * Math.tan(fov / 2))) * 1.6;
  camera.position.set(center.x + distance * 0.6, center.y + distance * 0.4, center.z + distance);
  camera.near = distance / 100;
  camera.far = distance * 100;
  camera.updateProjectionMatrix();
  controls.target.copy(center);
  controls.update();
}

function loadFileIntoScene(file, scene, camera, controls) {
  const ext = file.name.split('.').pop().toLowerCase();
  const url = URL.createObjectURL(file);
  const revoke = () => URL.revokeObjectURL(url);

  const defaultMaterial = new THREE.MeshStandardMaterial({
    color: 0x7c4dff,
    metalness: 0.15,
    roughness: 0.55,
  });

  if (ext === 'stl') {
    const loader = new STLLoader();
    loader.load(url, (geometry) => {
      geometry.computeVertexNormals();
      const mesh = new THREE.Mesh(geometry, defaultMaterial);
      scene.add(mesh);
      fitCameraToObject(camera, mesh, controls);
      revoke();
    });
  } else if (ext === 'glb' || ext === 'gltf') {
    const loader = new GLTFLoader();
    loader.load(url, (gltf) => {
      scene.add(gltf.scene);
      fitCameraToObject(camera, gltf.scene, controls);
      revoke();
    });
  } else if (ext === 'obj') {
    const loader = new OBJLoader();
    loader.load(url, (object) => {
      object.traverse((child) => {
        if (child instanceof THREE.Mesh) child.material = defaultMaterial;
      });
      scene.add(object);
      fitCameraToObject(camera, object, controls);
      revoke();
    });
  } else if (ext === '3mf') {
    const loader = new ThreeMFLoader();
    loader.load(url, (object) => {
      scene.add(object);
      fitCameraToObject(camera, object, controls);
      revoke();
    });
  }
}

function FileViewWindow({ selectedFile, metricsReady }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!metricsReady || !selectedFile || !containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth || 480;
    const height = container.clientHeight || 300;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.01, 10000);
    camera.position.set(0, 0, 5);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);
    const keyLight = new THREE.DirectionalLight(0xffffff, 1.0);
    keyLight.position.set(2, 4, 3);
    scene.add(keyLight);
    const fillLight = new THREE.DirectionalLight(0x9988ff, 0.4);
    fillLight.position.set(-3, -1, -2);
    scene.add(fillLight);

    loadFileIntoScene(selectedFile, scene, camera, controls);

    let animFrameId;
    const animate = () => {
      animFrameId = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    const resizeObserver = new ResizeObserver(() => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    });
    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(animFrameId);
      resizeObserver.disconnect();
      controls.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [selectedFile, metricsReady]);

  return (
    <section className={styles.fileView} aria-label="File view">
      <span className={styles.fileViewLabel}>File View</span>
      <div className={styles.fileViewCard}>
        {!metricsReady ? (
          <p className={styles.fileViewText}>click "get metrics" to view the file</p>
        ) : (
          <div ref={containerRef} className={styles.fileViewCanvas} />
        )}
      </div>
    </section>
  );
}

export default FileViewWindow;
