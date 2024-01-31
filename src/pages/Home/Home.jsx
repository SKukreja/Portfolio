import React, { useRef } from 'react'
import Landing from '../../components/Home/Landing'
import Splash from '../../components/Home/Splash'
import FeaturedWorks from '../../components/Home/FeaturedWorks'
import About from '../../components/Home/About'
import Cover from '../../components/Home/Cover'
import Experience from '../../components/Home/Experience'
import { cubicBezier, motion, useScroll, useTransform } from 'framer-motion'
import useSmoothScroll from '../../hooks/useSmoothScroll'
import { Helmet } from 'react-helmet'
import styled, { keyframes } from 'styled-components'
import FootprintTracker from '../../components/Common/FootprintTracker'

const Content = styled(motion.div)`
  display: flex;  
  height: 100vh;
  height: 100svh;
  width: 1000vw;
  background: var(--offwhite);
  filter: url(#wavy2);
  position: sticky;
  overflow: hidden;
  top: 0;
`;

const HorizontalScrollContainer = styled(motion.div)`
  position: relative;
  background: var(--black);
  height: 1000vh; // Scroll speed
`;

const Filter = styled.svg`
  display: none;
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
  z-index: 7;
`;

const BoxShadow = styled.div`
  box-shadow: 2px 3px 20px black, 0 0 250px #8f5922 inset;
  position: absolute;
  inset: 0;
  z-index: 6;
  pointer-events: none;
`;

const Home = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // How do I make this linear interpolate so it smooth scrolls?

  const x = useSmoothScroll(scrollYProgress, 0, -600); 
  const splashScroll = useSmoothScroll(scrollYProgress, 0, 100); 
  const projectScroll = useSmoothScroll(scrollYProgress, 0, 30); 
  const projectTextScroll = useSmoothScroll(scrollYProgress, 10, -10); 
  const headerScroll = useSmoothScroll(scrollYProgress, 0, 50); 

  return (
    <motion.div
    initial={{ 
      opacity: 0,      
     }} 
    animate={{ 
      opacity: 1,      
    }} 
    exit={{ 
      opacity: 0,
     }} 
    transition={{ duration: 1 }}
    >
      <Helmet>
        <title>Sumit Kukreja</title>
      </Helmet>
      <Filter>
        <filter id="wavy">
          <feTurbulence x="0" y="0" baseFrequency="0.02" numOctaves="5" seed="1" />
          <feDisplacementMap in="SourceGraphic" scale="20" />
        </filter>
      </Filter>
      <HorizontalScrollContainer ref={targetRef}>
        <Content style={{ x: x + 'vw' }}>
          <Noise />
          <BoxShadow />
          <Landing />
          <Splash customScroll={{ x: splashScroll + 'vw'}} />
          <FeaturedWorks customScroll={{ x: projectScroll * 2 + 'vw'}} headerScroll={{marginLeft: headerScroll * 2 + 'vw'}} textScroll={projectTextScroll} />
          <About headerScroll={{ x: headerScroll + 'vw'}} treeScroll={{ x: -projectScroll * 8 + 'vw', y: 30 -projectScroll * 2 + 'vw', scale: 0.1 + projectScroll * 0.06}} bgScroll={{ x: -projectTextScroll * 0.5 + 'vw', scale: 1 - projectTextScroll * 0.05}} />
          <Experience headerScroll={{ x: headerScroll + 'vw'}} treeScroll={{ x: -projectScroll * 6 + 'vw', scale: projectScroll}} bgScroll={{ x: projectTextScroll + 'vw'}} />
          <Cover headerScroll={{ x: headerScroll + 'vw'}} treeScroll={{ x: -projectScroll * 6 + 'vw', scale: projectScroll}} bgScroll={{ x: projectTextScroll + 'vw'}} />
        </Content>    
      </HorizontalScrollContainer>      
    </motion.div>
  )
} 

export default Home