/* eslint-disable react/no-unknown-property */
import { easing } from "maath";
import { useSnapshot } from "valtio";
import { useFrame } from "@react-three/fiber";
import { Decal, useGLTF, useTexture } from "@react-three/drei";

import state from "../store";

const Shirt = () => {
  const snap = useSnapshot(state);
  const { nodes, materials } = useGLTF("/shirt_baked.glb");

  const logoTexture = useTexture(snap.logoDecal);
  const fullTexture = useTexture(snap.fullDecal);

  useFrame((state, delta) =>
    //apply color to the shirt smoothly
    easing.dampC(materials.lambert1.color, snap.color, 0.25, delta)
  );

  //track state changes
  const stateString = JSON.stringify(snap);

  return (
    <group
      //By providing and setting up stateString above and here, react will re-render the component when the state changes, performance optimization
      key={stateString}
    >
      <mesh
        castShadow
        geometry={nodes.T_Shirt_male.geometry}
        material={materials.lambert1}
        material-roughness={1}
        dispose={null}
      >
        {/*If isFullTexture is true, then show the full texture*/}

        {snap.isFullTexture && (
          <Decal
            position={[0, 0, 0]}
            rotation={[0, 0, 0]}
            scale={1}
            map={fullTexture}
          />
        )}

        {/*If isLogoTexture is true, then show the logo*/}

        {snap.isLogoTexture && (
          <Decal
            position={[0, 0.04, 0.15]}
            rotation={[0, 0, 0]}
            scale={0.15}
            map={logoTexture}
            mapAnisotropy={16} //quality of texture
            depthTest={false} //texture behind the model
            depthWrite={true} //texture in front of the model
          />
        )}
      </mesh>
    </group>
  );
};

export default Shirt;
