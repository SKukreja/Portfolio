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
import FootprintTracker from '../../components/Common/FootprintTracker'

const Content = styled(motion.div)`
  display: flex;
  height: 100vh;
  width: 1000vw;
  background: var(--offwhite);
  position: sticky;
  overflow: hidden;
  top: 0;
  @media (max-width: 1024px) {
    padding-top: calc(var(--default-spacing) * 2);
    flex-direction: column;
    width: 100vw;
    height: auto;
    min-height: 1000vh; // Adjust based on content
  }
`;

const HorizontalScrollContainer = styled(motion.div)`
  position: relative;
  background: var(--black);
  height: 1000vh; // Adjust based on content for vertical scrolling
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

const Home = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024); // Adjusted to 1024px for consistency with your media query

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024); // Ensure consistency with the media query
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // General horizontal scroll for the Content component on desktop
  const contentScroll = useSmoothScroll(scrollYProgress, 0, -900);
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
      <Helmet>
        <title>Sumit Kukreja</title>
      </Helmet>
      <HorizontalScrollContainer ref={targetRef}>
      <Content style={contentStyle}>
          <Noise />
          <BoxShadow />
          <Landing />
          <Splash customScroll={getScrollProps(splashScroll, 3.5)} />
          <FeaturedWorks customScroll={getScrollProps(headerScroll, 1/2)} headerScroll={getScrollProps(headerScroll)} textScroll={getScrollProps(headerScroll)} />
          <About headerScroll={getScrollProps(headerScroll)} treeScroll={getScrollProps(projectScroll, -8)} bgScroll={getScrollProps(projectTextScroll, -0.5)} />
          <Experience headerScroll={getScrollProps(headerScroll)} treeScroll={getScrollProps(projectScroll, -6)} bgScroll={getScrollProps(projectTextScroll)} />
          <Cover headerScroll={getScrollProps(headerScroll)} treeScroll={getScrollProps(projectScroll, -6)} bgScroll={getScrollProps(projectTextScroll)} />
        </Content>
      </HorizontalScrollContainer>
    </motion.div>
  );
};

export default Home;