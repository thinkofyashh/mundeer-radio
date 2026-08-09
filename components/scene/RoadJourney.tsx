"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { PerspectiveCamera, RoundedBox, useTexture } from "@react-three/drei";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";

type JourneyProps = {
  progress: React.MutableRefObject<number>;
  started: boolean;
  reducedMotion: boolean;
};

const lampPositions = Array.from({ length: 13 }, (_, index) => index);
const roadMarks = Array.from({ length: 26 }, (_, index) => index);

function wrapRoadPosition(index: number, spacing: number, travel: number) {
  const length = spacing * 26;
  return ((((index * -spacing + travel) % length) + length) % length) - length + 16;
}

function MovingRoad({ progress, started, reducedMotion }: JourneyProps) {
  const road = useRef<THREE.Group>(null);
  const lamps = useRef<Array<THREE.Group | null>>([]);
  const marks = useRef<Array<THREE.Mesh | null>>([]);
  const shops = useRef<Array<THREE.Group | null>>([]);
  const travel = useRef(0);

  const shopData = useMemo(
    () =>
      Array.from({ length: 18 }, (_, index) => ({
        side: index % 2 === 0 ? -1 : 1,
        width: 3.4 + (index % 4) * 0.55,
        height: 2.7 + (index % 3) * 0.75,
        color: ["#5a2f22", "#8a552b", "#274a56", "#6c3e29"][index % 4],
        sign: ["#d49a4b", "#e1c386", "#af6337"][index % 3],
      })),
    [],
  );

  useFrame((state, delta) => {
    const speed = started ? (reducedMotion ? 3.2 : 9.5) : 0.5;
    travel.current += delta * speed + Math.abs(progress.current - (road.current?.userData.lastProgress ?? 0)) * 90;
    if (road.current) road.current.userData.lastProgress = progress.current;

    marks.current.forEach((mark, index) => {
      if (mark) mark.position.z = wrapRoadPosition(index, 7, travel.current);
    });
    lamps.current.forEach((lamp, index) => {
      if (lamp) lamp.position.z = wrapRoadPosition(index, 14, travel.current);
    });
    shops.current.forEach((shop, index) => {
      if (shop) shop.position.z = wrapRoadPosition(index, 10.2, travel.current);
    });

    if (road.current && !reducedMotion) {
      road.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.34) * 0.006;
    }
  });

  return (
    <group ref={road}>
      <mesh rotation-x={-Math.PI / 2} position={[0, -0.72, -76]} receiveShadow>
        <planeGeometry args={[13, 190]} />
        <meshStandardMaterial color="#201a17" roughness={0.96} />
      </mesh>
      <mesh rotation-x={-Math.PI / 2} position={[-12.5, -0.74, -76]} receiveShadow>
        <planeGeometry args={[12, 190]} />
        <meshStandardMaterial color="#4a321f" roughness={1} />
      </mesh>
      <mesh rotation-x={-Math.PI / 2} position={[12.5, -0.74, -76]} receiveShadow>
        <planeGeometry args={[12, 190]} />
        <meshStandardMaterial color="#4a321f" roughness={1} />
      </mesh>

      {roadMarks.map((index) => (
        <mesh
          key={`mark-${index}`}
          ref={(node) => { marks.current[index] = node; }}
          rotation-x={-Math.PI / 2}
          position={[0, -0.695, -index * 7]}
        >
          <planeGeometry args={[0.18, 3.4]} />
          <meshBasicMaterial color="#d9c7a4" transparent opacity={0.68} />
        </mesh>
      ))}

      {lampPositions.map((index) => {
        const side = index % 2 === 0 ? -1 : 1;
        return (
          <group
            key={`lamp-${index}`}
            ref={(node) => { lamps.current[index] = node; }}
            position={[side * 7.3, -0.7, -index * 14]}
          >
            <mesh position={[0, 3, 0]}>
              <cylinderGeometry args={[0.05, 0.08, 6, 8]} />
              <meshStandardMaterial color="#221b17" />
            </mesh>
            <mesh position={[side * -0.35, 5.9, 0]} rotation-z={side * 0.75}>
              <cylinderGeometry args={[0.04, 0.04, 0.9, 8]} />
              <meshStandardMaterial color="#221b17" />
            </mesh>
            <mesh position={[side * -0.68, 6.25, 0]}>
              <sphereGeometry args={[0.13, 12, 8]} />
              <meshBasicMaterial color="#ffd287" />
            </mesh>
            {index < 6 && <pointLight position={[side * -0.68, 6.1, 0]} color="#ffb75a" intensity={2.2} distance={9} />}
          </group>
        );
      })}

      {shopData.map((shop, index) => (
        <group
          key={`shop-${index}`}
          ref={(node) => { shops.current[index] = node; }}
          position={[shop.side * (10.2 + (index % 3) * 1.5), -0.72, -index * 10.2]}
          rotation-y={shop.side < 0 ? Math.PI / 2 : -Math.PI / 2}
        >
          <mesh position={[0, shop.height / 2, 0]}>
            <boxGeometry args={[shop.width, shop.height, 4.2]} />
            <meshStandardMaterial color={shop.color} roughness={0.88} />
          </mesh>
          <mesh position={[shop.side * -0.01, shop.height * 0.62, 2.13]}>
            <planeGeometry args={[shop.width * 0.82, 0.72]} />
            <meshBasicMaterial color={shop.sign} />
          </mesh>
          <mesh position={[0, 0.92, 2.14]}>
            <planeGeometry args={[shop.width * 0.68, 1.25]} />
            <meshBasicMaterial color="#11191c" />
          </mesh>
          <pointLight position={[0, 1.2, 2.5]} color="#ff9e43" intensity={1.5} distance={6} />
        </group>
      ))}
    </group>
  );
}

function WhiteHatchback({ started, reducedMotion }: Omit<JourneyProps, "progress">) {
  const car = useRef<THREE.Group>(null);
  const wheels = useRef<Array<THREE.Group | null>>([]);

  useFrame((state, delta) => {
    if (!car.current) return;
    const t = state.clock.elapsedTime;
    car.current.position.y = -0.14 + (reducedMotion ? 0 : Math.sin(t * 7.5) * 0.017);
    car.current.rotation.z = reducedMotion ? 0 : Math.sin(t * 0.85) * 0.016;
    car.current.rotation.y = reducedMotion ? 0 : Math.sin(t * 0.38) * 0.026;
    if (started) {
      wheels.current.forEach((wheel) => {
        if (wheel) wheel.rotation.x -= delta * 10;
      });
    }
  });

  const wheelAt = (x: number, z: number, index: number) => (
    <group key={`${x}-${z}`} ref={(node) => { wheels.current[index] = node; }} position={[x, -0.34, z]}>
      <mesh rotation-z={Math.PI / 2} castShadow>
        <cylinderGeometry args={[0.43, 0.43, 0.28, 24]} />
        <meshStandardMaterial color="#08090a" roughness={0.72} />
      </mesh>
      <mesh position={[x > 0 ? 0.15 : -0.15, 0, 0]} rotation-z={Math.PI / 2}>
        <cylinderGeometry args={[0.23, 0.23, 0.022, 8]} />
        <meshStandardMaterial color="#1f2327" metalness={0.82} roughness={0.28} />
      </mesh>
    </group>
  );

  return (
    <group ref={car} position={[0, -0.14, 3.2]} rotation-y={Math.PI}>
      <RoundedBox args={[2.45, 0.72, 3.85]} radius={0.28} smoothness={5} position={[0, 0.26, 0]} castShadow>
        <meshStandardMaterial color="#ece9df" metalness={0.18} roughness={0.44} />
      </RoundedBox>
      <RoundedBox args={[2.06, 0.9, 2.12]} radius={0.32} smoothness={5} position={[0, 0.9, -0.18]} castShadow>
        <meshStandardMaterial color="#e8e5dc" metalness={0.15} roughness={0.42} />
      </RoundedBox>
      <mesh position={[0, 0.92, 0.91]} rotation-x={-0.14}>
        <planeGeometry args={[1.72, 0.57]} />
        <meshStandardMaterial color="#10191e" metalness={0.45} roughness={0.18} />
      </mesh>
      <mesh position={[-1.04, 0.9, -0.22]} rotation-y={-Math.PI / 2}>
        <planeGeometry args={[1.33, 0.48]} />
        <meshStandardMaterial color="#142229" metalness={0.38} roughness={0.2} />
      </mesh>
      <mesh position={[1.04, 0.9, -0.22]} rotation-y={Math.PI / 2}>
        <planeGeometry args={[1.33, 0.48]} />
        <meshStandardMaterial color="#142229" metalness={0.38} roughness={0.2} />
      </mesh>
      <mesh position={[0, 0.37, 1.94]}>
        <boxGeometry args={[1.66, 0.18, 0.05]} />
        <meshStandardMaterial color="#d7d3c8" />
      </mesh>
      <mesh position={[0, 0.13, 1.97]}>
        <boxGeometry args={[0.72, 0.22, 0.04]} />
        <meshStandardMaterial color="#e4d29f" roughness={0.75} />
      </mesh>
      <mesh position={[-0.85, 0.43, 1.98]}>
        <boxGeometry args={[0.42, 0.24, 0.05]} />
        <meshBasicMaterial color="#a8231f" />
      </mesh>
      <mesh position={[0.85, 0.43, 1.98]}>
        <boxGeometry args={[0.42, 0.24, 0.05]} />
        <meshBasicMaterial color="#a8231f" />
      </mesh>
      <pointLight position={[-0.78, 0.4, 2.25]} color="#ff2b18" intensity={1.7} distance={4} />
      <pointLight position={[0.78, 0.4, 2.25]} color="#ff2b18" intensity={1.7} distance={4} />
      {wheelAt(-1.15, -1.18, 0)}
      {wheelAt(1.15, -1.18, 1)}
      {wheelAt(-1.15, 1.15, 2)}
      {wheelAt(1.15, 1.15, 3)}
    </group>
  );
}

function IllustratedHorizon() {
  const texture = useTexture("/assets/scene1-street.jpg");
  return (
    <mesh position={[0, 8.5, -74]}>
      <planeGeometry args={[52, 29]} />
      <meshBasicMaterial map={texture} color="#a17852" fog={false} />
    </mesh>
  );
}

function CameraRide({ progress, started, reducedMotion }: JourneyProps) {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const { scene, gl } = useThree();
  const dusk = useMemo(() => new THREE.Color("#8f5837"), []);
  const midnight = useMemo(() => new THREE.Color("#07192d"), []);
  const color = useMemo(() => new THREE.Color(), []);

  useFrame((state) => {
    const camera = cameraRef.current;
    if (!camera) return;
    const t = state.clock.elapsedTime;
    const chapterNight = Math.min(1, progress.current * 1.18);
    color.copy(dusk).lerp(midnight, chapterNight);
    gl.setClearColor(color, 1);
    if (scene.fog instanceof THREE.Fog) scene.fog.color.copy(color);

    const pointerX = reducedMotion ? 0 : state.pointer.x * 0.22;
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, pointerX, 0.035);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, 2.8 + (started && !reducedMotion ? Math.sin(t * 1.5) * 0.025 : 0), 0.06);
    camera.lookAt(pointerX * 0.18, 0.55, -8);
  });
  return <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 2.8, 8.2]} fov={52} near={0.1} far={220} />;
}

function JourneyWorld(props: JourneyProps) {
  return (
    <>
      <fog attach="fog" args={["#8f5837", 18, 116]} />
      <ambientLight intensity={1.25} color="#f1c687" />
      <directionalLight position={[-8, 12, 4]} intensity={2.1} color="#ffba68" castShadow />
      <Suspense fallback={null}><IllustratedHorizon /></Suspense>
      <MovingRoad {...props} />
      <WhiteHatchback started={props.started} reducedMotion={props.reducedMotion} />
      <CameraRide {...props} />
    </>
  );
}

export function RoadJourney(props: JourneyProps) {
  return (
    <div className="road-canvas" aria-hidden="true">
      <Canvas shadows dpr={[1, 1.6]} camera={{ position: [0, 2.8, 8.2], fov: 52, near: 0.1, far: 220 }} gl={{ antialias: true, powerPreference: "high-performance" }}>
        <JourneyWorld {...props} />
      </Canvas>
    </div>
  );
}
