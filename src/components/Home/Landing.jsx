import * as THREE from 'three'
import React, { Suspense, useRef, useEffect, useState, useMemo } from 'react'
import { Canvas, extend, useThree, useLoader, useFrame } from '@react-three/fiber'
import { Effects, Image } from '@react-three/drei'
import { Bloom, EffectComposer, Noise } from '@react-three/postprocessing'
import { Water } from 'three-stdlib';
import { useInView } from 'react-intersection-observer'
import { BlendFunction, KernelSize } from 'postprocessing'
import styled, { keyframes, css } from 'styled-components';

const bounce = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: translate(-10px, -10px);
  }
`;

const Scene = styled.div`
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
  width: 100vw;
  height: 100vh;
  position: absolute;
  pointer-events: none;
  overflow-y: visible;
  left: 50%;
  top: 50%;
  translate: -50% -50%;
`;

const Name = styled.h1`
    font-family: 'Hind', 'Satoshi', sans-serif;
    font-weight: 400;
    font-size: 7vw;
    color: white;
    z-index: 10;
    pointer-events: none;
    position: absolute;
    left: 0;
    right: 0;
    width: var(--desktop-container-width);
    margin-left: auto;
    margin-right: auto;
    top: 16vh;
    top: 16svh;
    mix-blend-mode: difference;    
    @media (max-width: 768px) {
      display: block;
      font-weight: 700;
      font-size: 9vw;
      text-align: center;
      color: var(--black);
      mix-blend-mode: normal;
    }
`;

const Caption = styled.h2`
  font-family: 'Satoshi', sans-serif;
  font-weight: 700;
  font-size: 1.6vw;
  letter-spacing: 0.3vw;
  text-align: left;
  color: white;
  z-index: 10;
  pointer-events: none;
  position: absolute;
  left: 0;
  right: 0;
  width: var(--desktop-container-width);
  margin-left: auto;
  margin-right: auto;
  top: 40vh;
  top: 40svh;
  mix-blend-mode: difference;
  @media (max-width: 768px) {
    display: block;
    font-size: 5vw;
    font-weight: 400;
    top 25vh;
    top: 25svh;
    text-align: center;
    color: var(--black);
    mix-blend-mode: normal;
  }
`;

const Seal = styled.div`
  width: 60px;
  height: 60px;
  padding: 0;
  border-radius: 50%;
  display: flex;
  z-index: 10;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 1rem;
  opacity: 1;
`;

const Arrow = styled.div`
  width: 30px;
  height: 30px;
  top: 40%;
  margin: -15px 0 0 -15px;
  -webkit-transform: rotate(45deg);
  border-left: none;
  border-top: none;
  z-index: 10;
  border-right: 2px #a0536e solid;
  border-bottom: 2px #a0536e solid;
  position: absolute;
  left: 50%;
  &::before {
    position: absolute;
    left: 50%;
    content: '';
    width: 15px;
    height: 15px;
    top: 50%;
    margin: -7.5px 0 0 -7.5px;
    border-left: none;
    border-top: none;
    border-right: 1px #a0536e solid;
    border-bottom: 1px #a0536e solid;
    animation: ${bounce} 0.5s infinite alternate;
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
    sunDirection: new THREE.Vector3(0,0,0),
    sunColor: 0x47234d,
    waterColor: 0xec4359,
    distortionScale: 0.3,
    fog: true,
  }; // Moved outside of useMemo

  useFrame((state, delta) => (ref.current.material.uniforms.time.value += delta / 20))
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

const DisableRender = () => useFrame(() => null, 1000)

function Landing() {
  const { ref, inView } = useInView()
  const isLowEndDevice = /iPad|iPhone|iPod|android/i.test(navigator.userAgent); // Add a check for low-end devices

  return (
    <Scene ref={ref}>
      <SceneCanvas dpr={[1, 2]} camera={{ position: [0, 0, 10], fov: 25, near: 0.01, far: 100 }}>
        {!inView && <DisableRender />}
        <color attach="background" args={['#EC4359']} />
        <Suspense fallback={null}>
          <Layers />
        </Suspense>
        <EffectComposer>
          <Noise opacity={0.5} blendFunction={BlendFunction.OVERLAY} />
          <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} height={300} />
        </EffectComposer>
      </SceneCanvas>
      <Name>SUMIT KUKREJA</Name>
      <Caption>DIGITAL DREAM WEAVER</Caption>
      <Seal>
        <Arrow />      
      </Seal>
    </Scene>
  )
}

export default Landing;