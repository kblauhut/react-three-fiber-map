import React, { useMemo, useState } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { MapControls } from "@react-three/drei";
import { Map } from "./map";

let a = 0;
export const MapView = () => {
  return (
    <Canvas
      camera={{ position: [0, 0, 10], up: [0, 0, 1], zoom: 1, far: 100 }}
      style={{ width: "100vw", height: "100vh" }}
    >
      <InnerMap />
    </Canvas>
  );
};

const InnerMap = () => {
  const [target, setTarget] = useState([0, 0]);
  const controls = useThree((state) => state.controls);

  useFrame(() => {
    // @ts-ignore
    const x = Math.floor(controls?.target.x ?? 0);
    // @ts-ignore
    const y = Math.floor(controls?.target.y ?? 0);

    if (x === target[0] && y === target[1]) return;
    setTarget([x, y]);
  });

  console.log(target);

  const maps = useMemo(() => {
    const maps = [];
    for (let i = target[0] - 8; i < target[0] + 8; i++) {
      for (let j = target[1] - 8; j < target[1] + 8; j++) {
        maps.push(<Map position={[i, j, 0]} key={`${i}-${j}`} />);
      }
    }
    return maps;
  }, [target[0], target[1]]);

  return (
    <>
      <group>{maps}</group>

      <MapControls makeDefault />
    </>
  );
};
