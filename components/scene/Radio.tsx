"use client";

import { Float, RoundedBox, Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Group, Mesh } from "three";
import { useMusic } from "@/components/player/MusicProvider";

function SpeakerGrille() {
  return (
    <group position={[-1.65, 0.15, 0.42]}>
      <mesh>
        <cylinderGeometry args={[1.05, 1.05, 0.11, 48]} />
        <meshStandardMaterial color="#181713" roughness={0.7} metalness={0.3} />
      </mesh>
      {Array.from({ length: 8 }).map((_, index) => (
        <mesh key={index} position={[0, 0.04, 0.08 + index * 0.005]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.16 + index * 0.1, 0.013, 6, 48]} />
          <meshStandardMaterial color="#6f6959" roughness={0.4} metalness={0.55} />
        </mesh>
      ))}
    </group>
  );
}

export function RadioModel() {
  const group = useRef<Group>(null);
  const tuner = useRef<Mesh>(null);
  const { volume, currentStation, isPlaying, isTuning } = useMusic();
  useFrame((state) => {
    if (!group.current) return;
    const target = (state.pointer.x * 0.06);
    group.current.rotation.y += (target - group.current.rotation.y) * 0.04;
    group.current.rotation.x = -0.06 + state.pointer.y * 0.025;
    if (tuner.current && isTuning) tuner.current.rotation.z += 0.12;
  });

  return (
    <Float speed={1.1} floatIntensity={0.05} rotationIntensity={0.02}>
      <group ref={group} rotation={[-0.06, -0.03, 0]}>
        <RoundedBox args={[5.7, 3.05, 1.05]} radius={0.22} smoothness={5}>
          <meshStandardMaterial color="#292822" roughness={0.78} metalness={0.15} />
        </RoundedBox>
        <RoundedBox args={[5.35, 2.68, 0.2]} radius={0.18} smoothness={4} position={[0, 0, 0.53]}>
          <meshStandardMaterial color="#3a382f" roughness={0.55} metalness={0.22} />
        </RoundedBox>
        <mesh position={[0, 1.88, -0.05]}>
          <torusGeometry args={[1.65, 0.11, 10, 28, Math.PI]} />
          <meshStandardMaterial color="#171713" roughness={0.52} metalness={0.35} />
        </mesh>
        <SpeakerGrille />
        <RoundedBox args={[2.4, 1.02, 0.16]} radius={0.09} smoothness={3} position={[1.42, 0.55, 0.65]}>
          <meshStandardMaterial color="#151712" emissive={isPlaying ? "#7c5b1e" : "#1c1b15"} emissiveIntensity={isPlaying ? 0.8 : 0.1} />
        </RoundedBox>
        <Text position={[1.42, 0.61, 0.76]} fontSize={0.26} color={isPlaying ? "#ffc56a" : "#655b44"} anchorX="center">
          {isTuning ? "— — . —" : `${currentStation.frequency.toFixed(1)} FM`}
        </Text>
        <Text position={[1.42, 0.31, 0.76]} fontSize={0.11} color="#9c8060" anchorX="center">
          MAFIA MUNDEER RADIO
        </Text>
        <mesh position={[0.82, -0.72, 0.7]} rotation={[Math.PI / 2, 0, -volume * 0.025]}>
          <cylinderGeometry args={[0.43, 0.47, 0.22, 32]} />
          <meshStandardMaterial color="#181814" roughness={0.55} metalness={0.3} />
        </mesh>
        <mesh ref={tuner} position={[1.97, -0.72, 0.7]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.43, 0.47, 0.22, 32]} />
          <meshStandardMaterial color="#181814" roughness={0.55} metalness={0.3} />
        </mesh>
        <Text position={[0.82, -1.28, 0.7]} fontSize={0.1} color="#9a8f77">VOLUME</Text>
        <Text position={[1.97, -1.28, 0.7]} fontSize={0.1} color="#9a8f77">TUNING</Text>
        <mesh position={[2.43, 1.32, 0.52]} rotation={[0, 0, -0.55]}>
          <cylinderGeometry args={[0.025, 0.035, 2.6, 10]} />
          <meshStandardMaterial color="#8f8c80" metalness={0.9} roughness={0.25} />
        </mesh>
      </group>
    </Float>
  );
}
