"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const PARTICLE_COUNT = 360;

export default function CinematicLayer() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, 1, 1, 1200);
    camera.position.set(0, 0, 220);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: false,
      powerPreference: "high-performance"
    });

    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6));
    mount.appendChild(renderer.domElement);

    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const colors = new Float32Array(PARTICLE_COUNT * 3);
    const sizes = new Float32Array(PARTICLE_COUNT);
    const phases = new Float32Array(PARTICLE_COUNT);
    const speeds = new Float32Array(PARTICLE_COUNT);
    const basePositions = new Float32Array(PARTICLE_COUNT * 3);

    const warm = new THREE.Color("#ff9f43");
    const white = new THREE.Color("#fff2dc");
    const blue = new THREE.Color("#86b7ff");

    for (let i = 0; i < PARTICLE_COUNT; i += 1) {
      const i3 = i * 3;
      const depth = Math.random();
      const radius = 180 + Math.random() * 360;
      const angle = Math.random() * Math.PI * 2;

      basePositions[i3] = Math.cos(angle) * radius;
      basePositions[i3 + 1] = (Math.random() - 0.5) * 420;
      basePositions[i3 + 2] = -120 - depth * 620;

      positions[i3] = basePositions[i3];
      positions[i3 + 1] = basePositions[i3 + 1];
      positions[i3 + 2] = basePositions[i3 + 2];

      const color = Math.random() > 0.82 ? blue : warm.clone().lerp(white, Math.random() * 0.7);
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;

      sizes[i] = 2.2 + Math.random() * 6.8;
      phases[i] = Math.random() * Math.PI * 2;
      speeds[i] = 0.18 + Math.random() * 0.42;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const texture = createParticleTexture();
    const material = new THREE.PointsMaterial({
      size: 4.8,
      map: texture,
      vertexColors: true,
      transparent: true,
      opacity: 0.72,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    const mouse = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };
    let frameId = 0;
    let width = 1;
    let height = 1;

    const resize = () => {
      width = mount.clientWidth || window.innerWidth;
      height = mount.clientHeight || window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };

    const onPointerMove = (event: PointerEvent) => {
      target.x = (event.clientX / window.innerWidth - 0.5) * 34;
      target.y = (event.clientY / window.innerHeight - 0.5) * 24;
    };

    const animate = (time: number) => {
      const seconds = time * 0.001;

      mouse.x += (target.x - mouse.x) * 0.035;
      mouse.y += (target.y - mouse.y) * 0.035;

      camera.position.x += (mouse.x - camera.position.x) * 0.025;
      camera.position.y += (-mouse.y - camera.position.y) * 0.025;
      camera.lookAt(0, 0, -180);

      for (let i = 0; i < PARTICLE_COUNT; i += 1) {
        const i3 = i * 3;
        const drift = seconds * speeds[i] + phases[i];
        positions[i3] = basePositions[i3] + Math.sin(drift * 0.72) * sizes[i] * 3.6;
        positions[i3 + 1] = basePositions[i3 + 1] + Math.cos(drift) * sizes[i] * 4.8;
        positions[i3 + 2] = basePositions[i3 + 2] + Math.sin(drift * 0.45) * 22;
      }

      geometry.attributes.position.needsUpdate = true;
      points.rotation.y = Math.sin(seconds * 0.08) * 0.08;
      points.rotation.x = Math.cos(seconds * 0.06) * 0.035;

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    frameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      mount.removeChild(renderer.domElement);
      geometry.dispose();
      material.dispose();
      texture.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} aria-hidden="true" style={{ position: "absolute", inset: 0 }} />;
}

function createParticleTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 96;
  canvas.height = 96;

  const context = canvas.getContext("2d");
  if (!context) {
    return new THREE.CanvasTexture(canvas);
  }

  const gradient = context.createRadialGradient(48, 48, 0, 48, 48, 48);
  gradient.addColorStop(0, "rgba(255, 247, 226, 1)");
  gradient.addColorStop(0.18, "rgba(255, 180, 96, 0.78)");
  gradient.addColorStop(0.48, "rgba(255, 138, 66, 0.18)");
  gradient.addColorStop(1, "rgba(255, 138, 66, 0)");

  context.fillStyle = gradient;
  context.fillRect(0, 0, 96, 96);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}
