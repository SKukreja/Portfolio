import React, { useRef, useState, useEffect } from 'react'
import Landing from '../../components/Home/Landing'
import Splash from '../../components/Home/Splash'
import FeaturedWorks from '../../components/Home/FeaturedWorks'
import About from '../../components/Home/About'
import Cover from '../../components/Home/Cover'
import Experience from '../../components/Home/Experience'
import { cubicBezier,m, useScroll, useTransform } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import styled, { keyframes } from 'styled-components'
import FootprintTracker from '../../components/Common/FootprintTracker'


const Content = styled(m.div)`
  display: flex;
  height: fit-content;
  background: var(--offwhite);
  position: relative;
  will-change: transform;
  overflow-y: hidden;
  @media (max-width: 1024px) {
    padding-top: calc(var(--default-spacing) * 2);
    flex-direction: column;
    width: 100vw;
    height: auto;
    overflow-y: auto;
    overflow-x: hidden;    
  }
`;

const Container = styled(m.div)`
  position: relative;
  background: var(--black);
  height: 100vh;
  height: 100svh;
  overflow-y: hidden;
  @media (max-width: 1024px) {
    height: auto;
    overflow-y: auto;
    overflow-x: hidden;
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
  z-index: 1000;
`;

const BoxShadow = styled.div`
  box-shadow: 2px 3px 20px black, 0 0 250px #8f5922 inset;
  position: absolute;
  inset: 0;
  z-index: 6;
  pointer-events: none;
  @media (max-width: 1024px) {
    width: 100%;
  }
`;

const Home = ({ isMobile }) => {
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
        <Content id="content-container">
          <Noise />
          <BoxShadow />
          <Landing />
          <Splash isMobile={isMobile} />
          <FeaturedWorks isMobile={isMobile} />
  
          <Cover />
        </Content>
    </Container>
  );
};

export default Home;