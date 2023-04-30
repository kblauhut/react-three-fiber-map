import React, { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const vertexShader = require("./shaders/vertexShader.glsl");
const fragmentShader = require("./shaders/fragmentShader.glsl");

export const Map = (props: any) => {
  const mesh: any = useRef();

  const uniforms = useMemo(
    () => ({
      u_time: {
        value: 0.0,
      },
      u_elevation_data: {
        value: new THREE.Texture(),
      },
      winResolution: {
        value: new THREE.Vector2(
          window.innerWidth,
          window.innerHeight
        ).multiplyScalar(Math.min(window.devicePixelRatio, 2)),
      },
    }),
    []
  );

  useEffect(() => {
    console.log("mount");

    new THREE.TextureLoader()
      .loadAsync(
        `https://s3.amazonaws.com/elevation-tiles-prod/terrarium/9/${
          267 + props.position[0]
        }/${180 - props.position[1]}.png`
      )
      .then((texture) => {
        uniforms.u_elevation_data.value = texture;
      });
  }, []);

  useFrame((state) => {
    const { clock } = state;
    mesh.current.material.uniforms.u_time.value = clock.getElapsedTime();
  });

  return (
    <mesh
      ref={mesh}
      {...props}
      // rotation={[-Math.PI / 2, 0, 0]}
    >
      <planeGeometry args={[1, 1, 128, 128]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        // @ts-ignore
        uniforms={uniforms}
      />
    </mesh>
  );
};
