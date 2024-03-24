import { useContext, useEffect, useRef, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { LazyMotion, AnimatePresence, MotionConfig, domAnimation } from "framer-motion";
import GlobalStyle from './globalStyles';
import Navbar from './components/Common/Navbar';
import Home from './pages/Home/Home';
import Work from './pages/Work/Work';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import Project from './pages/Project/Project';
import ReactGA from 'react-ga';
import { ModalProvider } from './components/Common/ModalContext';
import styled from 'styled-components';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import use from './hooks/use';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ReactLenis, useLenis } from '@studio-freight/react-lenis'
import ModalContext from './components/Common/ModalContext.jsx';

gsap.ticker.lagSmoothing(0);

gsap.registerPlugin(ScrollTrigger);

const Blur = styled.div`
  ${({ isModalOpen }) =>
    isModalOpen
      ? `
    filter: blur(10px);
    transition: filter 0.3s ease-in-out;    
  `
      : ''};
`;

function initializeAnalytics() {
  ReactGA.initialize(import.meta.env.GTAG_ID);
  ReactGA.pageview(window.location.pathname + window.location.search);
}

const Layout = ({ isMobile }) => {
  const { data, loading, error } = use('/social?populate=deep');  
  const { isModalOpen } = useContext(ModalContext);
  const location = useLocation();

  useEffect(() => {
    initializeAnalytics();
  }, []);

  useEffect(() => {
    ReactGA.initialize(import.meta.env.GTAG_ID);
    ReactGA.pageview(location.pathname + location.search);
  }, [location]);

  useEffect(() => {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
      loadingScreen.style.opacity = '0';      
    }
  }, []);

  return (
    <div className="app">
      <HelmetProvider>
        <GlobalStyle />
        <Navbar socialData={data} />
        <Helmet>      
          <title>Sumit Kukreja</title>                
          <link rel="icon" type="image/png" href="/favicon.ico" />         
        </Helmet>
        <Blur isModalOpen={isModalOpen}>
            <AnimatePresence mode='wait'>
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home isMobile={isMobile} />} />
              <Route path="/project/:id" element={<Project />} />
              <Route path="/work" element={<Work />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </AnimatePresence>
        </Blur>
      </HelmetProvider>
    </div>
  );
};

const App = () => {  
  const [isMobile, setIsMobile] = useState(false);
  const lenisRef = useRef()  



  const options = {
    lerp: 0.1,
    duration: 1.5,
    smoothWheel: true,
    smoothTouch: false, //smooth scroll for touch devices
    syncTouch: true,
    syncTouchLerp: 0.04,
    touchInertiaMultiplier: 10,
    smooth: true,
    orientation: isMobile ? "vertical" : "horizontal", 
    gestureOrientataion: isMobile ? "vertical" : "horizontal"
  }

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)');

    // Handler to set state based on the media query
    function handleResize(e) {
      // Update state based on the media query result
      setIsMobile(e.matches);     
    }

    // Register event listener
    mediaQuery.addEventListener('change', handleResize);

    // Initial check
    handleResize(mediaQuery);

    // Cleanup function to remove the event listener   
    return () => {
      mediaQuery.removeEventListener('change', handleResize);
    }
  }, [isMobile])
  
  useEffect(() => {
    function update(time) {
      lenisRef.current?.lenis?.raf(time * 1000)
    }
  
    gsap.ticker.add(update)
  
    return () => {
      gsap.ticker.remove(update)
    }
  })

  return (
    <ReactLenis root ref={lenisRef} autoRaf={false} options={options}>
     <LazyMotion features={domAnimation}>
        <MotionConfig reducedMotion="user">
          <ModalProvider>
            <Router>
              <Layout isMobile={isMobile} />
            </Router>
          </ModalProvider> 
        </MotionConfig>
      </LazyMotion>
    </ReactLenis>
  );
}

export default App;
