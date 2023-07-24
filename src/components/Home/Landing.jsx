import * as THREE from 'three'
import React, { Suspense, useRef, useEffect, useState, useMemo } from 'react'
import { Canvas, extend, useThree, useLoader, useFrame } from '@react-three/fiber'
import { Effects, Image } from '@react-three/drei'
import { motion } from 'framer-motion'
import { Bloom, DepthOfField, EffectComposer, Noise } from '@react-three/postprocessing'
import { Water } from 'three-stdlib';
import { useInView } from 'react-intersection-observer'
import { BlendFunction, KernelSize } from 'postprocessing'
import styled, { keyframes, css } from 'styled-components';
import { Icons } from '../Common/Icons'
import { Link } from 'react-router-dom'

const Scene = styled(motion.div)`
  background: var(--black);
  width: 100%;
  height: 100vh;
  height: 100svh;
  position: relative;
  overflow: hidden;
  z-index: 0;
`;

const SceneCanvas = styled(Canvas)`
  z-index: 4;
  width: 100%;
  height: 100%;
  position: absolute;
  pointer-events: none;
  overflow-y: visible;
  left: 50%;
  top: 50%;
  translate: -50% -50%;
`;

const Name = styled.h1`
    font-family: 'Hind', 'Satoshi', sans-serif;
    font-weight: 700;
    width: 100%;
    font-size: 7vw;
    color: var(--offwhite);
    mix-blend-mode: difference;
    z-index: 10;
    display: block;
    margin-top: 0;
    margin-bottom: 0;
    margin-left: -0.2vw;
    @media (max-width: 1024px) {
      margin-left: 0;
      font-weight: 700;
      font-size: 9vw;
      color: var(--black);
    }
`;

const Intro = styled.h2`
  font-family: 'Satoshi', sans-serif;
  font-weight: 600;
  font-size: 1.3vw;
  margin-top: 0;
  margin-bottom: 0;
  color: var(--offwhite);
  @media (max-width: 1024px) {
    width: calc(var(--desktop-container-width) - var(--default-spacing));
    color: var(--black);
    margin-left: auto;
    margin-right: auto;
    display: block;
    font-size: 4vw;
    font-weight: 400;
    text-align: center;    
  }
`;

const SceneText = styled(motion.div)`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: var(--desktop-container-width);
  margin-left: auto;
  margin-right: auto;
  text-align: left;
  z-index: 10;
  pointer-events: none;
  display: flex;
  mix-blend-mode: difference;
  flex-direction: column;
  top: 20vh;
  top: 20svh;
  @media (max-width: 1024px) {
    top: 20vh;
    top: 20svh;
    text-align: center;
    color: var(--black);
    mix-blend-mode: darken;
  }
`;

const ActionButtons = styled.div`
  pointer-events: none;
  display: flex;
  width: 100%;
  mix-blend-mode: difference;
  justify-content: start;
  @media (max-width: 1024px) {
    margin-top: 30vh;
    margin-top: 30svh;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
  @media (max-width: 900px) {
    margin-top: 25vh;
    margin-top: 25svh;
  }
  @media (max-width: 768px) {
    margin-top: 27.5vh;
    margin-top: 27.5svh;
  }
  @media (max-width: 768px) {
    margin-top: 27.5vh;
    margin-top: 27.5svh;
  }

`;

const Button = styled(Link)`
  pointer-events: all;
  text-decoration: none;
  text-transform: uppercase;
  margin: var(--default-spacing);
  font-family: 'Satoshi', sans-serif;
  font-size: calc(var(--body-text) * 1.5);
  font-weight: 600;  
  color: white;
  opacity: 1;
  transition: all 0.5s ease;
  &:hover {
    transform: scale(1.1);
    opacity: 0.5;
    &:hover svg {
      margin-right: 1rem;
    }
  }
  & svg {
    margin-right: 0.5rem;
    transition: margin 0.5s ease;
  }
  & p {
    display: flex;
    align-items: center;  
  }
  @media (max-width: 1024px) {
    width: fit-content;
    justify-content: center;
    font-size: calc(var(--body-text) * 3);
    color: white;    
    margin: 0;    
    & p {
      background: rgba(0,0,6,0.9);
      padding: 1rem;
    }
  }
  @media (max-width: 900px) {    
    font-size: calc(var(--body-text) * 2);
  }
  @media (max-width: 768px) {    
    font-size: 1rem;
  }
`;

extend({ Water })

function Layer({ url, z, scaleFactor, mobileScaling, offsetX, offsetY, posY }) {
  const { viewport, pointer } = useThree()
  const { width: w, height: h } = viewport
  const ref = useRef()
  const [deviceOrientation, setDeviceOrientation] = useState({ alpha: 0, beta: 0, gamma: 0 });

  useEffect(() => {
    function handleOrientation(event) {
        const { alpha, beta, gamma } = event;
        setDeviceOrientation({ alpha, beta, gamma });
    }
    window.addEventListener("deviceorientation", handleOrientation, true);
    return () => window.removeEventListener("deviceorientation", handleOrientation);
  }, []);

  useFrame(() => {    
    let mobileOffsetX, mobileOffsetY, mobileScalingFactor;
    if (w > 5) {
      mobileOffsetX = 0;
      mobileOffsetY = 0 + posY;
      mobileScalingFactor = 1;
    }
    else {
      mobileOffsetX = offsetX;
      mobileOffsetY = posY;
      mobileScalingFactor = mobileScaling;
    }
    if (typeof window.orientation !== "undefined") {
        ref.current.position.x = deviceOrientation.gamma * (0.000015 / (1.01 - z)) + mobileOffsetX
    } else {
        ref.current.position.x = pointer.x * (0.001 / (1.01 - z)) + mobileOffsetX
    }
  })

  return <Image ref={ref} url={url} transparent scale={[w * scaleFactor * mobileScaling, (w * scaleFactor * mobileScaling * 816/1456), 1]} position={[0 + offsetX, 0 + offsetY, z]} />
}



function Ocean({waterPos}) {
  const ref = useRef()
  const gl = useThree((state) => state.gl)
  const waterNormals = useLoader(THREE.TextureLoader, '/waternormals.jpeg')
  waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping
  const geom = new THREE.PlaneGeometry(100, 100); // Moved outside of useMemo
  const config = {
    textureWidth: 512,
    textureHeight: 512,
    waterNormals,
    sunDirection: new THREE.Vector3(0,-1,-1),
    sunColor: 0x47234d,
    waterColor: 0xec4359,
    distortionScale: 0.5,
    fog: true,
  }; // Moved outside of useMemo

  useFrame((state, delta) => (ref.current.material.uniforms.time.value += delta / 15))
  return <water ref={ref} args={[geom, config]} rotation-x={-Math.PI / 2} position={waterPos} />
}

function Layers() {
  const { camera, viewport, size, aspect } = useThree();
  const { width: w, height: h } = viewport
  const pixelWidth = size.width;
  const pixelHeight = size.height;
  const [difference, setDifference] = useState(0);
  const vFOV = camera.fov * Math.PI / 180; // convert vertical fov to radians
  const height = 2 * Math.tan(vFOV / 2) * camera.position.z; // visible height
  const bottom = -height / 2;
  const imageAspect = 816/1456; // replace with the actual aspect ratio of the image
  useEffect(() => {
    setDifference(-(816 - pixelWidth * 1456/816) / 1000);
  }, [size.width, size.height]);
  return (
    <>
    <Layer url="/assets/FG1.png" z={1} scaleFactor={1.1} mobileScaling={1} offsetX={0} posY={bottom + (w * 1.1 * imageAspect) / 2} offsetY={bottom + (w * 1.1 * imageAspect)/2 + 0.15} />
    <Layer url="/assets/FG2.png" z={0.95} scaleFactor={1.05} mobileScaling={1} offsetX={0} posY={0} offsetY={-0.2} />
    <Layer url="/assets/MG1.png" z={0.9} scaleFactor={1.05} mobileScaling={1} offsetX={0} posY={0} offsetY={0} />
    <Layer url="/assets/MG2.png" z={0.85} scaleFactor={1.05} mobileScaling={1} offsetX={0} posY={0} offsetY={-0.05} />
    <Layer url="/assets/Fog.png" z={0.825} scaleFactor={1.05} mobileScaling={3} offsetX={0} posY={0} offsetY={0.5} />
    <Layer url="/assets/MG3.png" z={0.8} scaleFactor={1.05} mobileScaling={1}  offsetX={0} posY={0} offsetY={0} />
    <Layer url="/assets/Moon.png" z={0} scaleFactor={1.1} mobileScaling={1} offsetX={0} posY={0} offsetY={0} />
    <Ocean waterPos={[0, bottom, -30]} />
    </>
  )
}


function Landing() {
  const { ref, inView } = useInView();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <Scene
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transition: 'opacity 4s ease'
      }}
    >
      <SceneCanvas dpr={[1, 2]}
        camera={{ position: [0, 0, 10], fov: 25, near: 0.01, far: 100 }}
      >
        <color attach="background" args={['#EC4359']} />
        <Suspense fallback={null}>
          <Layers />
        </Suspense>
        <EffectComposer>
          <Noise opacity={0.3} blendFunction={BlendFunction.OVERLAY} />
          <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} height={300} />
          <DepthOfField
            focusDistance={0} // where to focus
            focalLength={0.01} // focal length
            bokehScale={3} // bokeh size
          />
        </EffectComposer>
      </SceneCanvas>
      <SceneText>
        <Intro>Hi, my name is</Intro>
        <Name>SUMIT KUKREJA</Name>
        <Intro>I'm a full-stack web developer with a passion for creating unique digital experiences.</Intro>
        <ActionButtons>
          <Button to="/work"><p>{Icons["Arrow Right"]()} View my work</p></Button>
          <Button to="/about"><p>{Icons["Arrow Right"]()} More about me</p></Button>
        </ActionButtons>
      </SceneText>
    </Scene>
  );
}


export default Landing;