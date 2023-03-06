import * as THREE from 'three'
import React, { Suspense, useRef, useEffect } from 'react'
import styled, { keyframes } from 'styled-components';
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Bloom, EffectComposer, GodRays } from '@react-three/postprocessing'
import { BlendFunction, GodRaysEffect, KernelSize } from 'postprocessing'
import { CameraShake } from '@react-three/drei'

const hueRotate = keyframes`
    0% {
        filter: hue-rotate(10deg);
    }
    
    50% {
        filter: hue-rotate(-30deg);
    }
    
    100% {
        filter: hue-rotate(10deg);
    }
`;

const Container = styled.div`
    background: #080708;
    width: 100%;
    height: 100vh;
    position: relative;
    overflow: hidden;
    animation: ${hueRotate} 18s linear infinite;
`;

const Light = styled.div`
    width: 100vw;
    aspect-ratio: 1;
    background: linear-gradient(to right, #050829, #504CCF);
    position: absolute;
    left: 50%;
    top: 50%;
    translate: -50% -50%;
    z-index: 1;
`;

const Blur = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 2;
`;

const Shadow = styled.div`
    background: radial-gradient(rgba(8, 7, 8, 0.5), rgba(8, 7, 8, 1) 70%);
    position: absolute;
    left: 50%;
    top: 50%;
    translate: -50% -50%;
    width: 100%;
    height: 100%;
    z-index: 3;
`;

const Scene = styled(Canvas)`
    z-index: 4;
    width: 100vw;
    height: 100vh;
    position: absolute;
    pointer-events: none;
    left: 50%;
    top: 50%;
    translate: -50% -50%;
`;

const ShadowTransition = styled.div`
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 200px;
    pointer-events: none;
    z-index: 5;
    background: linear-gradient(to top, rgba(8, 7, 8, 1) 30%, transparent)
`;

const Astronaut = styled.img`
    width: 30vmin;
    height: auto;
    position: absolute;
    left: 50%;
    top: 55%;
    pointer-events: none;
    z-index: 6;
    translate: -50% -50%;
    filter: blur(0.5px) saturate(1.2) contrast(1.4) sepia(0.3) drop-shadow(0 0 5px rgba(5, 8, 41, 0.7));
`;

const Frame = styled.div`
    width: calc(75vmin - 2rem);
    aspect-ratio: 1;
    border: 5px solid #504CCF;
    pointer-events: none;
    position: absolute;
    left: 50%;
    top: 50%;
    translate: -50% -50%;
    z-index: 6;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
}
`;

const Name = styled.h1`
    font-family: 'Poppins';
    font-weight: 900;
    text-transform: uppercase;
    font-size: 6.5rem;
    text-shadow: 0 0 5px #504CCF;
    color: #504CCF;
    margin: 0;
`;

const Caption = styled.h2`
    font-family: 'Poppins';
    font-weight: 500;
    margin: 0;
    text-shadow: 0 0 5px #f1e3f3;
    font-size: 2.8rem;
    margin-top: -1.5rem;
`;

const Scroll = styled.h2`
    font-family: 'Poppins';
    font-weight: 400;
    font-size: 7.6rem;
    margin: 0;
    position: absolute;
    bottom: 0rem;
    color: rgba(80, 76, 207, 0.1);
    -webkit-background-clip: text;
    text-transform: uppercase;
    filter: drop-shadow(0 0 1px rgba(80, 76, 207,0.1));
`;

const Stars = (props) => {
    const geometry = new THREE.BufferGeometry()
    const vertices = []
    const velocities = []
    const accelerations = []
    const star = useRef();
    const sprite = new THREE.TextureLoader().load(props.path)
  
    for (let count = 0; count < 6000; count++) {
      const x = Math.random() * 2000 - 300
      const y = Math.random() * 2000 - 300
      const z = Math.random() * 600 - 300  
      vertices.push(x, y, z)
      velocities.push(0)
      accelerations.push(0.0001)
    }
  
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))
    geometry.setAttribute('velocity', new THREE.Float32BufferAttribute(velocities, 1))
    geometry.setAttribute('acceleration', new THREE.Float32BufferAttribute(accelerations, 1))
  
    useFrame(() => {
      for (let i = 0; i < 6000; i++) {
        geometry.getAttribute('velocity').array[i] += geometry.getAttribute('acceleration').array[i]
        geometry.getAttribute('position').array[i * 3 + 2] += geometry.getAttribute('velocity').array[i]

  
        if (geometry.getAttribute('position').array[i * 3 + 2] > 200) {
          geometry.getAttribute('position').array[i * 3 + 2] = -200
          geometry.getAttribute('velocity').array[i] = 0
        }
      }
      star.current.rotation.z += 0.001
      geometry.attributes.position.needsUpdate = true
      geometry.attributes.velocity.needsUpdate = true
      geometry.attributes.acceleration.needsUpdate = true
    })
  
    return (
      <points ref={star} args={[geometry]}>
        <pointsMaterial opacity={Math.random() * 2.5 + 0.5} size={Math.random() * 1 + 1} sizeAttenuation={true} map={sprite} depthWrite={false} transparent={true} blending={THREE.AdditiveBlending} />
      </points>
    )
}

const Rig = () => {
    const { camera, mouse } = useThree()
    useFrame(() => {
      camera.position.x += -mouse.x * 5 - camera.position.x
      camera.position.y += -mouse.y * 5 - camera.position.y
    })
    return (
      <>
        <CameraShake maxYaw={0.1} maxPitch={0.1} maxRoll={0.1} yawFrequency={0.05} pitchFrequency={0.05} rollFrequency={0.05} />
      </>
    )
}

const Splash = () => {
    const container = useRef()
    const astronaut = useRef()
    const scroll = useRef()

    useEffect(() => {
        container.current.addEventListener("mousemove", moveAstronaut)
        window.addEventListener("scroll", handleScroll)
        return () => {
            container.current.removeEventListener("mousemove", moveAstronaut)
            window.removeEventListener("scroll", handleScroll)
        };
    }, []);

    const moveAstronaut = (event) => {
        astronaut.current.animate({
            transform: `translate(${-event.clientX/50}px, ${-event.clientY/50}px)`
        }, { duration: 200, fill: "forwards"})
    }

    const handleScroll = (event) => {
        scroll.current.animate({
            transform: `translate(0, ${-window.scrollY/15}px)`,
            opacity: (1 - window.scrollY/500)
        }, {duration: 0, fill: "forwards"})
    } 

    return (
        <Container ref={container}>
            <Light />
            <Blur />
            <Shadow />
            <Scene linear dpr={[1, 2]} camera={{ fov: -100, position: [0, 0, 0] }}>
                <Suspense fallback={null}>
                <Stars path='/star.png' />
                <Stars path='/star2.png' />
                <Stars path='/star3.png' />
                <Stars path='/star4.png' />
                <Rig />
                </Suspense>
                <EffectComposer multisampling={0}>
                    <Bloom kernelSize={KernelSize.LARGE} blendFunction={BlendFunction.SCREEN} />
                </EffectComposer>
            </Scene>
            <Frame>
                <Name>Sumit Kukreja</Name>
                <Caption>Full Stack Developer based in Toronto</Caption>
                <Astronaut ref={astronaut} src='/astronaut.png' />
                <Scroll ref={scroll}>Scroll Down</Scroll>
            </Frame>
            <ShadowTransition />
        </Container>
    )
}

export default Splash