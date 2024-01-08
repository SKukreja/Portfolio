import * as THREE from 'three'
import { useEffect, useRef, useState } from 'react'
import { Water } from 'three-stdlib';
import { Canvas, extend, useThree, useLoader, useFrame } from '@react-three/fiber'
import { Image } from '@react-three/drei'
import styled from 'styled-components'

extend({ Water })

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

function LandingCanvas() {
  return (
    <SceneCanvas dpr={[1, 2]}
      gl={{ antialias: false, alpha: false }}
      camera={{ position: [0, 0, 10], fov: 25, near: 0.01, far: 100 }}
    >
        <color attach="background" args={['#EC4359']} />
        <Layers />
    </SceneCanvas>
  )
}

export default LandingCanvas;