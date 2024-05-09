import { useContext, useEffect, useRef, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { LazyMotion, AnimatePresence, MotionConfig, domAnimation } from "framer-motion";
import GlobalStyle from './globalStyles';
import Navbar from './components/Common/Navbar';
import Home from './pages/Home/Home';
import Work from './pages/Work/Work';
import Contact from './pages/Contact/Contact';
import Project from './pages/Project/Project';
import ReactGA from 'react-ga';
import { Curtains, useCurtains } from 'react-curtains';
import { ModalProvider } from './components/Common/ModalContext';
import styled from 'styled-components';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import use from './hooks/use';
import { ReactLenis, useLenis } from '@studio-freight/react-lenis'
import ModalContext from './components/Common/ModalContext.jsx';

const Blur = styled.div`
  ${({ $isModalOpen }) =>
    $isModalOpen
      ? `
    filter: blur(10px);
    transition: filter 0.3s ease-in-out;    
  `
      : ''};
`;
 
const Layout = ({ $isMobile, $isFirefox }) => {
  const { data, loading, error } = use('/social?populate=deep');  
  const { isModalOpen } = useContext(ModalContext);
  const location = useLocation();
  const [curtainsRef, setCurtainsRef] = useState(null)

  useCurtains((curtains) => {
    setCurtainsRef(curtains)
  });

  useLenis(({ scroll }) => {
    if (!curtainsRef) return
    if ($isMobile) curtainsRef.updateScrollValues(0, scroll)
    else curtainsRef.updateScrollValues(scroll, 0)
  });

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
        <Blur $isModalOpen={isModalOpen}>
            <AnimatePresence mode='wait'>
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home $isMobile={$isMobile} $isFirefox={$isFirefox} />} />
              <Route path="/project/:id" element={<Project />} />
              <Route path="/work" element={<Work />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </AnimatePresence>
        </Blur>
      </HelmetProvider>
    </div>
  );
};

const ScrollToTop = (props) => {
  const location = useLocation();
  const lenis = useLenis();
  useEffect(() => {
    if (!location.hash) {
      lenis?.scrollTo(0,0)
    }
  }, [location]);

  return <>{props.children}</>
};

const App = () => {  
  const [isMobile, setIsMobile] = useState(false);
  const [isFirefox, setIsFirefox] = useState(false);
  const lenisRef = useRef()  

  const options = {
    lerp: 0.05,
    smoothWheel: true,
    syncTouch: true,
    smoothTouch: false, //smooth scroll for touch devices            
    orientation: isMobile ? "vertical" : "horizontal", 
    gestureOrientataion: isMobile ? "vertical" : "horizontal"
  }
  
  useEffect(() => {    
    let vh = window.innerHeight * 0.01;
    // Set the --vh custom property
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    
    window.addEventListener('resize', () => {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    });
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 1024px)');
    const isFirefoxAndroid = navigator.userAgent.includes('Firefox') && navigator.userAgent.includes('Android');

    setIsFirefox(isFirefoxAndroid);

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

  return (
    <Curtains
      className="curtains-canvas"
      pixelRatio={Math.min(1.5, window.devicePixelRatio)}
      antialias={true}
      watchScroll={false}
      premultipliedAlpha={true}
    >
      <ReactLenis root ref={lenisRef} options={options}>
        <LazyMotion features={domAnimation}>
          <MotionConfig reducedMotion="user">
            <ModalProvider>
              <Router>
                <ScrollToTop />
                <Layout $isMobile={isMobile} $isFirefox={isFirefox} />
              </Router>
            </ModalProvider> 
          </MotionConfig>
        </LazyMotion>
      </ReactLenis>
    </Curtains>
  );
}

export default App;
