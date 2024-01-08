import React, { Suspense, lazy, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import styled from 'styled-components'
import { Icons } from '../Common/Icons'
import { Link } from 'react-router-dom'

const LandingCanvas = lazy(() => import('./LandingCanvas'));
// background-image: url('bg.png');
const Scene = styled(motion.div)`  
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 100%;
  height: 100vh;
  height: 100svh;
  position: relative;
  overflow: hidden;
  z-index: 0;
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
  transition: all 0.2s ease;
  &:hover {
    opacity: 0.5;
    &:hover svg {
    }
  }
  & svg {
    margin-right: 1rem;
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

const GraphicContainer = styled.div`
  position: relative;  
  width: 100vw;
  height: 100vh;  
`;

const Graphic = styled.img`
  position: absolute;
  inset: 0;
  max-width: 100vw;
  max-height: 100vh;
  object-fit: contain;
`;

const ColoredBG = styled.div`
  background-image: url('bg-coloured.png');
  background-repeat: no-repeat;
  background-size: contain;
  max-width: 100vw;
  max-height: 100vh;
  position: absolute;
  inset: 0;
  -webkit-mask-image: url('ink.png');
  -webkit-mask-size: cover;
  -webkit-mask-position: 0% 0%;
  transition:
    -webkit-mask-position 1.6s steps(24);
  &:hover {
    -webkit-mask-position: 100% 0%;
  }
`;

function Landing() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <Scene>
      {false ? (
      <Suspense fallback={null}>
        <LandingCanvas />
      </Suspense>
      ) : null}
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