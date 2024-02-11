import React, { useRef, useState, useEffect } from 'react'
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
import gsap from 'gsap'
import { ReactLenis, useLenis } from '@studio-freight/react-lenis'
import FootprintTracker from '../../components/Common/FootprintTracker'


const Content = styled(motion.div)`
  display: flex;
  height: 100vh;
  width: 1000vw;
  background: var(--offwhite);
  position: sticky;
  overflow: hidden;
  will-change: transform;
  top: 0;
  @media (max-width: 1024px) {
    padding-top: calc(var(--default-spacing) * 2);
    flex-direction: column;
    width: 100vw;
    height: auto;
    min-height: 1000vh;
    min-height: 1000svh;
  }
`;

const HorizontalScrollContainer = styled(motion.div)`
  position: relative;
  background: var(--black);
  height: 1000vh;
  height: 1000svh; 
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

// Helper function to debounce a function call
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

const Home = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024); // Adjusted to 1024px for consistency with your media query
  const lenisRef = useRef()
  
  useEffect(() => {
    function update(time) {
      lenisRef.current?.lenis?.raf(time * 1000)
    }
  
    gsap.ticker.add(update)
  
    return () => {
      gsap.ticker.remove(update)
    }
  })
  



  // General horizontal scroll for the Content component on desktop
  const contentScroll = useSmoothScroll(scrollYProgress, 0, -900, 0.1);
  // Ensure the content style dynamically switches between horizontal and vertical based on the viewport
  const contentStyle = isMobile ? {} : { transform: `translateX(${contentScroll}vw)` };

  // Scroll calculations
  const splashScroll = useSmoothScroll(scrollYProgress, 0, 100);
  const projectScroll = useSmoothScroll(scrollYProgress, 0, 50);
  const projectTextScroll = useSmoothScroll(scrollYProgress, 0, 100);
  const headerScroll = useSmoothScroll(scrollYProgress, 0, 100);

  // Conditional prop logic for vertical/horizontal scrolling
  const getScrollProps = (scrollValue, multiplier = 1) => {
    return isMobile
      ? { y: scrollValue * multiplier + 'vh' }
      : { x: scrollValue * multiplier + 'vw' };
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    > 
      <ReactLenis root ref={lenisRef} autoRaf={true} options={{smoothWheel: true, lerp: 0.1, wheelMultiplier: 0.5, touchMultiplier: 0.1}}>
        <Helmet>
          <title>Sumit Kukreja</title>
        </Helmet>
        <HorizontalScrollContainer ref={targetRef}>
        <Content style={contentStyle}>
            <Noise />
            <BoxShadow />
            <Landing />
            <Splash customScroll={scrollYProgress} />
            <FeaturedWorks customScroll={getScrollProps(headerScroll, 1/2)} scrollYProgress={scrollYProgress} headerScroll={getScrollProps(headerScroll)} textScroll={getScrollProps(headerScroll)} />
            <About headerScroll={getScrollProps(headerScroll)} treeScroll={getScrollProps(projectScroll, -8)} bgScroll={getScrollProps(projectTextScroll, -0.5)} />
            <Experience headerScroll={getScrollProps(headerScroll)} treeScroll={getScrollProps(projectScroll, -6)} bgScroll={getScrollProps(projectTextScroll)} />
            <Cover headerScroll={getScrollProps(headerScroll)} treeScroll={getScrollProps(projectScroll, -6)} bgScroll={getScrollProps(projectTextScroll)} />
          </Content>
        </HorizontalScrollContainer>
      </ReactLenis>
    </motion.div>
  );
};

export default Home;