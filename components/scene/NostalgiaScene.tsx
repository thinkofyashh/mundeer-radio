"use client";

import { Canvas } from "@react-three/fiber";
import { ContactShadows, Environment } from "@react-three/drei";
import { Suspense } from "react";
import { RadioModel } from "./Radio";

export function NostalgiaScene() {
  return (
    <div className="radio-canvas" aria-hidden="true">
      <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0.2, 7.8], fov: 38 }} gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}>
        <ambientLight intensity={0.75} color="#cbb79d" />
        <directionalLight position={[-4, 5, 6]} intensity={3.2} color="#ffbd69" />
        <pointLight position={[4, 0, 2]} intensity={7} distance={8} color="#ff8a38" />
        <Suspense fallback={null}>
          <RadioModel />
          <ContactShadows position={[0, -1.85, 0]} opacity={0.5} scale={8} blur={2.7} far={4} color="#100b07" />
          <Environment preset="warehouse" environmentIntensity={0.18} />
        </Suspense>
      </Canvas>
    </div>
  );
}
