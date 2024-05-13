import React, { useRef, useState, useEffect } from 'react'
import Landing from '../../components/Home/Landing'
import Splash from '../../components/Home/Splash'
import FeaturedWorks from '../../components/Home/FeaturedWorks'
import About from '../../components/Home/About'
import Cover from '../../components/Home/Cover'
import { Helmet } from 'react-helmet-async'
import styled from 'styled-components'

const Container = styled.div`
  position: relative;
  background: var(--black);
  overflow-y: hidden;
  @media (max-width: 1024px) {
    height: auto;
    overflow-y: auto;
    overflow-x: hidden;
  } 
`;

const Content = styled.div`
  display: flex;
  background: var(--offwhite);
  position: relative;
  overflow-y: hidden;
  @media (max-width: 1024px) {
    flex-direction: column;
    width: 100vw;
    overflow-y: auto;
    overflow-x: hidden;    
  }
  @media (max-width: 1024px) {
    padding-top: calc(var(--default-spacing));
  }
  @media (max-width: 768px) {
    padding-top: calc(var(--default-spacing) * 2);
  }
`;

const Noise = styled.div`
  background: url("Noise.png");
  background-repeat: repeat;
  opacity: 1;
  width: 100%;
  height: 100%;
  pointer-events: none;
  position: absolute;
  inset: 0;
  z-index: 1001;
  &::after {
    content: "";
    position: absolute;
    width: calc(100% - 40vw);
    height: 100%;
    pointer-events: none;
    opacity: 0.12;
    z-index: 5;
    mix-blend-mode: color-burn;
    background: url("paper.jpg");
    @media (max-width: 1024px) {
      width: 100%;
      height: ${({ $isFirefox }) => $isFirefox ? 'calc(100% - (100vh - var(--default-spacing) + 1px))' : 'calc(100% - (100svh - var(--default-spacing) + 1px))'};
    }
    @media (max-width: 768px) {
      height: ${({ $isFirefox }) => $isFirefox ? 'calc(100% - (100vh - var(--default-spacing) * 2 + 1px))' : 'calc(100% - (100svh - var(--default-spacing) * 2 + 1px))'};
    }
  }
`;

const BoxShadow = styled.div`
  box-shadow: 2px 3px 20px var(--black), 0 0 350px #8f5922 inset;
  position: absolute;
  width: 100%;
  height: calc(var(--vh) * 100);
  inset: 0;
  z-index: 10;
  pointer-events: none;
  mix-blend-mode: multiply;
  @media (max-width: 1024px) {
    height: ${({ $isFirefox }) => $isFirefox ? 'calc(100% - (100vh - var(--default-spacing) + 1px))' : 'calc(100% - (100svh - var(--default-spacing) + 1px))'};
    width: 100%;
    box-shadow: 0 0 100px #8f5922 inset;
  }
  @media (max-width: 768px) {
    height: ${({ $isFirefox }) => $isFirefox ? 'calc(100% - (100vh - var(--default-spacing) * 2 + 1px))' : 'calc(100% - (100svh - var(--default-spacing) * 2 + 1px))'};
  }
`;

export const CoverContext = React.createContext();

const Home = ({ $isMobile, $isFirefox }) => {
  const container = useRef(null);
  const [isInView, setIsInView] = useState(false);
  return (
    <Container
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    > 
        <Helmet>
          <title>Sumit Kukreja</title>
        </Helmet>
        <CoverContext.Provider value={[isInView, setIsInView]}></CoverContext.Provider>
        <Content id="content-container" ref={container}>
          <Noise $isFirefox={$isFirefox} />
          <BoxShadow />
          <Landing />
          <Splash $isMobile={$isMobile} />
          <FeaturedWorks $isMobile={$isMobile} $isFirefox={$isFirefox} />
          <About />
          <Cover $isMobile={$isMobile} $isFirefox={$isFirefox} />
        </Content>
    </Container>
  );
};

export default Home;