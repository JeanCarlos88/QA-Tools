/* eslint-disable react/no-unknown-property */
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

const AntigravityInner = ({
  count = 300,
  magnetRadius = 10,
  ringRadius = 10,
  waveSpeed = 0.4,
  waveAmplitude = 1,
  particleSize = 2,
  lerpSpeed = 0.1,
  color = '#FF9FFC',
  autoAnimate = false,
  particleVariance = 1,
  rotationSpeed = 0,
  depthFactor = 1,
  pulseSpeed = 3,
  particleShape = 'capsule',
  fieldStrength = 10
}) => {
  const meshRef = useRef(null);
  const { viewport } = useThree();
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const lastMousePos = useRef({ x: 0, y: 0 });
  const lastMouseMoveTime = useRef(0);
  const virtualMouse = useRef({ x: 0, y: 0 });

  const particles = useMemo(() => {
    return Array.from({ length: count }, () => {
      const angle = Math.random() * 2 * Math.PI;
      const radius = Math.random() * ringRadius;
      const x = radius * Math.cos(angle);
      const y = radius * Math.sin(angle);
      const z = (Math.random() - 0.5) * depthFactor;
      const size = particleSize * (1 + (Math.random() - 0.5) * particleVariance);
      return { x, y, z, originalX: x, originalY: y, originalZ: z, size };
    });
  }, [count, ringRadius, particleSize, particleVariance, depthFactor]);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    const mouse = state.mouse;

    if (mouse.x !== lastMousePos.current.x || mouse.y !== lastMousePos.current.y) {
      lastMouseMoveTime.current = time;
      lastMousePos.current = { x: mouse.x, y: mouse.y };
      virtualMouse.current = { x: mouse.x, y: mouse.y };
    } else {
      if (autoAnimate && time - lastMouseMoveTime.current > 0.5) {
        const pulse = Math.sin((time - lastMouseMoveTime.current) * pulseSpeed) * 0.1;
        virtualMouse.current.x = Math.sin(time * waveSpeed) * 0.5 + pulse;
        virtualMouse.current.y = Math.cos(time * waveSpeed * 0.7) * 0.5 + pulse;
      }
    }

    particles.forEach((particle, i) => {
      let { x, y, z, originalX, originalY, originalZ, size } = particle;

      const mouseX = virtualMouse.current.x * viewport.width / 2;
      const mouseY = virtualMouse.current.y * viewport.height / 2;

      const dx = mouseX - x;
      const dy = mouseY - y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      let force = 0;
      if (dist < magnetRadius) {
        force = (1 - dist / magnetRadius) * fieldStrength;
      }

      x += (originalX + dx / dist * force * size - x) * lerpSpeed;
      y += (originalY + dy / dist * force * size - y) * lerpSpeed;
      z += (originalZ - z) * lerpSpeed;

      if (waveAmplitude > 0) {
        const wave = Math.sin(time * waveSpeed + originalX * 0.5) * waveAmplitude * size * 0.3;
        y += wave;
      }

      particle.x = x;
      particle.y = y;
      particle.z = z;

      dummy.position.set(x, y, z);
      dummy.scale.set(size, size, size);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
    if (rotationSpeed > 0) meshRef.current.rotation.z += rotationSpeed * delta;
  });

  const geometry = useMemo(() => {
    switch (particleShape) {
      case 'box': return new THREE.BoxGeometry(1, 1, 1);
      case 'sphere': return new THREE.SphereGeometry(0.5, 16, 16);
      case 'cone': return new THREE.ConeGeometry(0.5, 1, 16);
      case 'torus': return new THREE.TorusGeometry(0.4, 0.2, 16, 32);
      case 'dodecahedron': return new THREE.DodecahedronGeometry(0.5);
      case 'capsule':
      default: return new THREE.CapsuleGeometry(0.35, 0.3, 4, 12);
    }
  }, [particleShape]);

  return (
    <instancedMesh ref={meshRef} args={[geometry, null, count]}>
      <meshStandardMaterial color={color} roughness={0.5} metalness={0.5} />
    </instancedMesh>
  );
};

const Antigravity = (props) => {
  return (
    <Canvas 
      camera={{ position: [0, 0, 15], fov: 30 }} 
      style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%', 
        zIndex: 0,
      }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <AntigravityInner {...props} />
    </Canvas>
  );
};

export default Antigravity;
