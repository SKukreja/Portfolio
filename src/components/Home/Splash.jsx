import * as THREE from 'three';
import React, { Suspense, useRef, useEffect, useContext } from 'react';
import styled, { keyframes } from 'styled-components';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Bloom, EffectComposer, GodRays } from '@react-three/postprocessing';
import { BlendFunction, GodRaysEffect, KernelSize } from 'postprocessing';
import WebGLPerformanceContext from '../../WebGLPerformanceContext';
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
    z-index: 0;
    animation: ${hueRotate} 18s linear infinite;
`;

const Light = styled.div`
    width: 100vw;
    height: 100vh;
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
    overflow-y: visible;
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
    @media (max-width: 768px) {
        top: 45%;
        height: 50vh;
        width: auto;
    }
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
    @media (max-width: 768px) {
        width: 100%;
        height: calc(100% - 6rem);
        top: 50%;        
        margin-top: 2rem;
        border: none;
    }
}
`;

const Name = styled.h1`
    font-family: 'Poppins';
    font-weight: 900;
    text-transform: uppercase;
    font-size: 8vmin;
    text-shadow: 0 0 5px #504CCF;
    color: #504CCF;
    margin: 0;

    @media (max-width: 768px) {
        font-size: 11vw;
    }
`;

const Caption = styled.h2`
    font-family: 'Poppins';
    font-weight: 500;
    margin: 0;
    text-shadow: 0 0 5px #f1e3f3;
    font-size: 3.45vmin;
    margin-top: -1.5rem;
    @media (max-width: 768px) {
        margin-top: -0.5rem;
        font-size: 4.70vw;
    }
`;

const Scroll = styled.h2`
    font-family: 'Poppins';
    font-weight: 400;
    font-size: 9.5vmin;
    margin: 0;
    position: absolute;
    bottom: 0rem;
    color: rgba(80, 76, 207, 0.1);
    -webkit-background-clip: text;
    text-transform: uppercase;
    filter: drop-shadow(0 0 1px rgba(80, 76, 207,0.1));
    @media (max-width: 768px) {
        position: fixed;
        font-size: 13vw;
        bottom: 6rem;
    }
`;

const spriteLoader = new THREE.TextureLoader();

const sprites = {
  star: spriteLoader.load('/star.png'),
  star2: spriteLoader.load('/star2.png'),
  star3: spriteLoader.load('/star3.png'),
  star4: spriteLoader.load('/star4.png'),
};

const Stars = (props) => {
    const geometry = new THREE.BufferGeometry()
    const vertices = []
    const velocities = []
    const accelerations = []
    const star = useRef();
    const sprite = sprites[props.type];
    const stars = props.count;
  
    for (let count = 0; count < stars; count++) {
      const x = Math.random() * 2000 - 300
      const y = Math.random() * 2000 - 300
      const z = Math.random() * 600 - 300  
      vertices.push(x, y, z)
      velocities.push(0.05)
      accelerations.push(0)
    }
  
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))
    geometry.setAttribute('velocity', new THREE.Float32BufferAttribute(velocities, 1))
    geometry.setAttribute('acceleration', new THREE.Float32BufferAttribute(accelerations, 1))
  
    useFrame(() => {
      for (let i = 0; i < stars; i++) {
        geometry.getAttribute('velocity').array[i] += geometry.getAttribute('acceleration').array[i]
        geometry.getAttribute('position').array[i * 3 + 2] += geometry.getAttribute('velocity').array[i]

  
        if (geometry.getAttribute('position').array[i * 3 + 2] > 200) {
          geometry.getAttribute('position').array[i * 3 + 2] = -100
          geometry.getAttribute('velocity').array[i] = 0
        }
      }
      star.current.rotation.z += 0.0002
      geometry.attributes.position.needsUpdate = true
      geometry.attributes.velocity.needsUpdate = true
      geometry.attributes.acceleration.needsUpdate = true
    })
  
    return (
        <points ref={star} args={[geometry]}>
          <pointsMaterial
            opacity={Math.random() * 2.5 + 0.5}
            size={Math.random() * 1 + 1}
            sizeAttenuation={true}
            map={sprite}
            depthWrite={false}
            transparent={true}
            blending={THREE.AdditiveBlending}
          />
        </points>
      );
}

const Rig = () => {
    const { camera, mouse } = useThree();
    const [orientation, setOrientation] = React.useState({ alpha: 0, beta: 0, gamma: 0 });
    const lastMousePosition = React.useRef({ x: 0, y: 0 });
  
    React.useEffect(() => {
      const handleOrientation = (e) => {
        setOrientation({ alpha: e.alpha, beta: e.beta, gamma: e.gamma });
      };
  
      window.addEventListener('deviceorientation', handleOrientation, true);
      return () => window.removeEventListener('deviceorientation', handleOrientation);
    }, []);
  
    useFrame(() => {
      const dx = (mouse.x - lastMousePosition.current.x) * 0.03;
      const dy = (mouse.y - lastMousePosition.current.y) * 0.03;

      if(orientation.gamma || orientation.beta) {
        camera.position.x += -camera.position.x + orientation.gamma/5;
        camera.position.y += -camera.position.y + orientation.beta/5;
      }
      else if (Math.abs(dx) < 0.02 && Math.abs(dy) < 0.02) {
        camera.position.x += dx * 50;  // Adjust multiplier as needed
        camera.position.y += dy * 50;  // Adjust multiplier as needed
      }

      lastMousePosition.current = { x: mouse.x, y: mouse.y };
    });
  
    return (
      <>
        <CameraShake maxYaw={0.05} maxPitch={0.05} maxRoll={0.05} yawFrequency={0.05} pitchFrequency={0.05} rollFrequency={0.05} />
      </>
    )
  }
  
  

const Splash = () => {
    const container = useRef()
    const astronaut = useRef()
    const scroll = useRef()
    const performanceLevel = useContext(WebGLPerformanceContext);
    const stars = performanceLevel === 'high' ? 6000 : 1000;

    useEffect(() => {
        window.addEventListener('mousemove', moveAstronaut);
        window.addEventListener('deviceorientationabsolute', moveAstronautMobile);
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('mousemove', moveAstronaut);
            window.removeEventListener('deviceorientationabsolute', moveAstronautMobile);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    

    const moveAstronaut = (event) => {
        astronaut.current.animate({
            transform: `translate(${-event.clientX/75}px, ${-event.clientY/75}px)`
        }, { duration: 200, fill: "forwards"})
    }

    const moveAstronautMobile = (event) => {
        const { alpha, beta, gamma } = event;

        astronaut.current.animate({
            transform: `translate(${-gamma/3}px, ${beta/3}px)`
        }, { duration: 200, fill: "forwards"})
    }

    const handleScroll = (event) => {
        scroll.current.animate({
            opacity: (1 - window.scrollY/500)
        }, {duration: 0, fill: "forwards"})
    } 

    return (
        <Container ref={container}>
            <Light />
            <Blur />
            <Shadow />
            <Scene
            linear
            dpr={[1, 2]}
            gl={{ webgl2: true, webgl1: true }}
            camera={{ fov: -100, position: [0, 0, 0] }}
            >
                <Suspense fallback={null}>
                <Stars type="star" count={stars} />
                <Stars type="star2" count={stars} />
                <Stars type="star3" count={stars} />
                <Stars type="star4" count={stars} />
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