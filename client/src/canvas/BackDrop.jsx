import { useRef } from "react";
import { AccumulativeShadows, RandomizedLight } from "@react-three/drei";

const BackDrop = () => {
  const shadows = useRef();

  return (
    <AccumulativeShadows
      ref={shadows}
      temporal
      frames={60}
      alphaTest={0.85}
      scale={10}
      rotation={[Math.PI / 2, 0, 0]}
      position={[0, 0, -0.14]}
      color="white"
      opacity={0.8}
    >
      <RandomizedLight
        amount={4}
        radius={9}
        intensity={0.85}
        ambient={0.25}
        position={[5, 5, -10]}
      />

      <RandomizedLight
        amount={4}
        radius={9}
        intensity={0.75}
        ambient={0.55}
        //bias={-0.0005}
        position={[-5, 5, -9]}
      />
    </AccumulativeShadows>
  );
};

export default BackDrop;
