"use client"

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text } from "@react-three/drei";
import { useRef, useState } from "react";
import * as THREE from "three";

interface TechSphere {
  position: [number, number, number];
  name: string;
  color: string;
  scale: number;
}

const techSpheres: TechSphere[] = [
  { position: [-3, 0, 0], name: "AI", color: "#ff4081", scale: 1 },
  { position: [3, 0, 0], name: "Games", color: "#7c4dff", scale: 1 },
  { position: [0, 3, 0], name: "Web", color: "#00bcd4", scale: 1 },
  { position: [0, -3, 0], name: "Database", color: "#64dd17", scale: 1 },
  { position: [0, 0, 3], name: "Mobile", color: "#ffd740", scale: 1 },
];

const FloatingSphere: React.FC<TechSphere> = ({
  position,
  name,
  color,
  scale,
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      // Smoother floating animation
      meshRef.current.position.y =
        position[1] + Math.sin(state.clock.getElapsedTime() * 0.5) * 0.3;
      meshRef.current.rotation.x =
        Math.sin(state.clock.getElapsedTime() * 0.3) * 0.2;
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <group>
      <mesh
        ref={meshRef}
        position={position}
        scale={clicked ? scale * 1.4 : hovered ? scale * 1.2 : scale}
        onClick={() => setClicked(!clicked)}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.8}
          metalness={0.5}
          roughness={0.2}
          wireframe={hovered}
        />
      </mesh>
      <Text
        position={[position[0], position[1] - 1.5, position[2]]}
        fontSize={0.5}
        color="white"
        anchorX="center"
        anchorY="middle"
        userData={{ keepAlive: true }}
      >
        {name}
      </Text>
    </group>
  );
};

const ConnectingLines: React.FC = () => {
  const lineRef = useRef<THREE.LineSegments>(null);

  useFrame(() => {
    if (lineRef.current) {
      lineRef.current.rotation.y += 0.001;
    }
  });

  const points: number[] = [];
  techSpheres.forEach((sphere, i) => {
    techSpheres.forEach((otherSphere, j) => {
      if (i < j) {
        points.push(...sphere.position);
        points.push(...otherSphere.position);
      }
    });
  });

  return (
    <lineSegments ref={lineRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={points.length / 3}
          array={new Float32Array(points)}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial color="#ffffff" opacity={0.2} transparent />
    </lineSegments>
  );
};

// Add a simple animation to the scene
const SceneContainer: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y =
        Math.sin(state.clock.getElapsedTime() * 0.1) * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      {techSpheres.map((sphere, index) => (
        <FloatingSphere key={index} {...sphere} />
      ))}
      <ConnectingLines />
    </group>
  );
};

export const PortfolioScene: React.FC = () => {
  return (
    <div className="w-full h-[600px] bg-black/20">
      <Canvas
        camera={{ position: [0, 0, 12], fov: 60 }}
        style={{ background: "transparent" }}
      >
        <color attach="background" args={["#000015"]} />

        {/* Lights */}
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <spotLight
          position={[0, 10, 0]}
          angle={0.5}
          penumbra={1}
          intensity={1}
          castShadow
        />

        {/* Controls */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 1.5}
          rotateSpeed={0.5}
        />

        {/* Scene Content */}
        <SceneContainer />

        {/* Subtle fog for depth */}
        <fog attach="fog" args={["#000015", 10, 25]} />
      </Canvas>
    </div>
  );
};

export default PortfolioScene;
