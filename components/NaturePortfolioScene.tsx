"use client"

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Cloud, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { Group, Mesh } from 'three';

// Define interfaces for props and project data
interface ProjectData {
  title: string;
  description: string;
  link: string;
}

interface TreeProps {
  position: [number, number, number];
  scale?: number;
}

interface ProjectCardProps {
  position: [number, number, number];
  title: string;
  description: string;
  onClick: () => void;
}

interface NaturePortfolioSceneProps {
  projects: ProjectData[];
}

// Procedural Tree Component
const Tree: React.FC<TreeProps> = ({ position, scale = 1 }) => {
  const treeRef = useRef<Group>(null);
  
  const rotation = useMemo(() => [
    0,
    Math.random() * Math.PI * 2,
    0
  ], []);

  useFrame((state) => {
    if (treeRef.current) {
      treeRef.current.rotation.y = rotation[1] + Math.sin(state.clock.getElapsedTime() * 0.5) * 0.05;
    }
  });

  return (
    <group ref={treeRef} position={position} scale={scale}>
      <mesh position={[0, 2, 0]}>
        <cylinderGeometry args={[0.2, 0.4, 4]} />
        <meshStandardMaterial color="#4a3219" roughness={0.8} />
      </mesh>
      
      <mesh position={[0, 4, 0]}>
        <coneGeometry args={[1.5, 3, 8]} />
        <meshStandardMaterial color="#2d5a27" roughness={0.8} />
      </mesh>
      <mesh position={[0, 5, 0]}>
        <coneGeometry args={[1.2, 2.5, 8]} />
        <meshStandardMaterial color="#3a7034" roughness={0.8} />
      </mesh>
      <mesh position={[0, 6, 0]}>
        <coneGeometry args={[0.8, 2, 8]} />
        <meshStandardMaterial color="#4a8b43" roughness={0.8} />
      </mesh>
    </group>
  );
};

// Ground with procedural height variation
const Ground: React.FC = () => {
  const groundRef = useRef<Mesh>(null);
  
  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(100, 100, 32, 32);
    const pos = geo.attributes.position;
    
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);
      pos.setY(i, Math.sin(x * 0.3) * 0.5 + Math.sin(z * 0.2) * 0.5);
    }
    
    geo.computeVertexNormals();
    return geo;
  }, []);

  return (
    <mesh ref={groundRef} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <primitive object={geometry} />
      <meshStandardMaterial
        color="#2d5a27"
        roughness={0.8}
        metalness={0.2}
        vertexColors={true}
      />
    </mesh>
  );
};

// Floating Project Card
const ProjectCard: React.FC<ProjectCardProps> = ({ position, title, onClick }) => {
  const cardRef = useRef<Group>(null);

  useFrame((state) => {
    if (cardRef.current) {
      cardRef.current.position.y = position[1] + Math.sin(state.clock.getElapsedTime() + position[0]) * 0.3;
      cardRef.current.rotation.y += 0.005;
    }
  });

  return (
    <group
      ref={cardRef}
      position={position}
      onClick={onClick}
      onPointerOver={() => document.body.style.cursor = 'pointer'}
      onPointerOut={() => document.body.style.cursor = 'default'}
    >
      <mesh>
        <boxGeometry args={[3, 2, 0.2]} />
        <meshStandardMaterial 
          color="#1a1a1a"
          metalness={0.7}
          roughness={0.2}
          transparent
          opacity={0.8}
        />
      </mesh>
      <Text
        position={[0, 0, 0.15]}
        fontSize={0.2}
        color="white"
        anchorX="center"
        anchorY="middle"
        maxWidth={2}
      >
        {title}
      </Text>
    </group>
  );
};

const Forest: React.FC = () => {
  const treePositions = useMemo(() => {
    const positions: [number, number, number][] = [];
    for (let i = 0; i < 50; i++) {
      const x = (Math.random() - 0.5) * 50;
      const z = (Math.random() - 0.5) * 50;
      if (Math.sqrt(x * x + z * z) > 15) {
        positions.push([x, 0, z]);
      }
    }
    return positions;
  }, []);

  return (
    <>
      {treePositions.map((position, index) => (
        <Tree 
          key={index} 
          position={position}
          scale={0.8 + Math.random() * 0.4}
        />
      ))}
    </>
  );
};

const NaturePortfolioScene: React.FC<NaturePortfolioSceneProps> = ({ projects }) => {
  const handleProjectClick = (project: ProjectData) => {
    window.open(project.link, '_blank');
  };

  return (
    <div className="w-full h-[800px]">
      <Canvas 
        camera={{ position: [0, 15, 30], fov: 60 }}
        shadows
      >
        <color attach="background" args={['#87CEEB']} />
        <fog attach="fog" args={['#87CEEB', 30, 100]} />
        
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[10, 20, 10]}
          intensity={1.5}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />

        <Ground />
        <Forest />
        <Stars radius={100} depth={50} count={5000} factor={4} />
        <Cloud position={[-10, 15, -10]} speed={0.2} opacity={0.5} />
        <Cloud position={[10, 12, -15]} speed={0.2} opacity={0.5} />

        {projects?.map((project: ProjectData, index: number) => {
          const angle = (index / projects.length) * Math.PI * 2;
          return (
            <ProjectCard
              key={project.title}
              position={[
                Math.cos(angle) * 10,
                8,
                Math.sin(angle) * 10
              ]}
              title={project.title}
              description={project.description}
              onClick={() => handleProjectClick(project)}
            />
          );
        })}

        <OrbitControls
          enableZoom={true}
          enablePan={false}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 2.5}
          minDistance={15}
          maxDistance={50}
        />
      </Canvas>
    </div>
  );
};

export default NaturePortfolioScene;