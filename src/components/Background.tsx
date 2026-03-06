import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";

function Stars() {
  const count = 3000;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 50;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 50;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 50;
    }
    return pos;
  }, []);

  const starRef = useRef<THREE.Points>(null!);

  useFrame((state) => {
    const time = state.clock.getElapsedTime() * 0.05;
    starRef.current.rotation.y = time;
    starRef.current.rotation.x = time * 0.5;
  });

  return (
    <points ref={starRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial size={0.02} color="#ffffff" transparent opacity={0.6} />
    </points>
  );
}

export function Background() {
  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10 bg-[#0a0a0a]">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <color attach="background" args={["#0a0a0a"]} />
        <ambientLight intensity={0.5} />
        <Stars />
      </Canvas>
    </div>
  );
}
