import * as THREE from "three";
import React, { useRef, useEffect, useState } from "react";
import { Canvas, extend, useFrame, useLoader } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";

const vertexShader = `
    uniform sampler2D uTexture;
    uniform vec2 uOffset;
    varying vec2 vUv;

    #define M_PI 3.1415926535897932384626433832795

    vec3 deformationCurve(vec3 position, vec2 uv, vec2 offset) {
    position.x = position.x + (sin(uv.y * M_PI) * offset.x);
    position.y = position.y + (sin(uv.x * M_PI) * offset.y);
    return position;
    }

    void main() {
    vUv = uv;
    vec3 newPosition = deformationCurve(position, uv, uOffset);
    gl_Position = projectionMatrix * modelViewMatrix * vec4( newPosition, 1.0 );
    }
`;

const fragmentShader = `
    uniform sampler2D uTexture;
    uniform float uAlpha;
    uniform vec2 uOffset;
    varying vec2 vUv;

    vec3 rgbShift(sampler2D textureImage, vec2 uv, vec2 offset) {
    float r = texture2D(textureImage,uv + offset).r;
    vec2 gb = texture2D(textureImage,uv).gb;
    return vec3(r,gb);
    }

    void main() {
    vec3 color = rgbShift(uTexture,vUv,uOffset);
    gl_FragColor = vec4(color,uAlpha);
    }
`;

const WaveShaderMaterial = shaderMaterial(
    {
      uTime: 0,
      uColor: new THREE.Color(0.0, 0.0, 0.0),
      uTexture: new THREE.Texture(),
      uDistortion: 0.0,
    },
    vertexShader,
    fragmentShader
);

extend({ WaveShaderMaterial });

const useScrollVelocity = () => {
  const [scrollVelocity, setScrollVelocity] = useState(0);
  let lastScrollTop = 0;

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const velocity = Math.abs(scrollTop - lastScrollTop);
      setScrollVelocity(velocity);
      lastScrollTop = scrollTop;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return scrollVelocity;
};

const Image = ({ path, position }) => {
  const ref = useRef();
  const scrollVelocity = useScrollVelocity();
  const [distortion, setDistortion] = useState(0);

  useEffect(() => {
    if (scrollVelocity > 0) {
      const sensitivity = 2;
      setDistortion(scrollVelocity * sensitivity);
    }
  }, [scrollVelocity]);

  useFrame(({ clock }) => {
    const minDamping = 0.001;
    const maxDamping = 0.005;
    const damping = scrollVelocity > 0.01 ? maxDamping : minDamping;

    ref.current.uTime = clock.getElapsedTime();
    let newDistortion = distortion - distortion * damping;
    setDistortion(newDistortion);
    ref.current.uDistortion = newDistortion;
  });

  const [image] = useLoader(THREE.TextureLoader, [path]);
  
  // calculate aspect ratio after image is loaded
  const aspectRatio = image.image ? image.image.width / image.image.height : 1;
  
  // set the dimensions of the plane based on the aspect ratio
  const dimensions = [aspectRatio, 1]; // change these values as needed

  // apply aspect ratio to position, if the images are still overlapping, 
  // you may need to adjust the scaling factor
  const finalPosition = [0,0,0];
    finalPosition[1] *= aspectRatio;
    finalPosition[1] += position[1];

  return (
    <mesh position={finalPosition}>
      <planeBufferGeometry attach="geometry" args={dimensions} />
      <waveShaderMaterial uColor={"hotpink"} ref={ref} uTexture={image} />
    </mesh>
  );
};

export default Image;