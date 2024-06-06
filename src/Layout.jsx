import React, { useRef, useEffect, Suspense, lazy, memo, useContext } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useLenis } from '@studio-freight/react-lenis';
import GlobalStyle from './globalStyles.js';
import Navbar from './components/Navbar/Navbar.jsx';
import Home from './components/Home/Home.jsx';
import Work from './components/Work/Work';
import styled from 'styled-components';
import { Curtains, useCurtains } from 'react-curtains';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import LoadingScreen, { loadingVariants } from './components/Common/LoadingScreen.jsx';
import TransitionMask from './components/Common/TransitionMask.jsx';
import { usePerformance } from './components/Common/VideoContext.jsx';

const Project = lazy(() => import('./components/Project/Project.jsx'));

const AppContainer = styled.div`
  position: relative;
  & .curtains-canvas {
    position: fixed; 
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    transform: translate3d(0, 0, 0);
    z-index: 1;
    pointer-events: none;
  }
`;

const Content = styled.div`
  display: flex;
  background: var(--offwhite);
  position: relative;
  overflow-y: hidden;
  min-width: 100vw;
  width: max-content;
  @media (max-width: 1024px) {
    flex-direction: column;
    width: 100vw;
    min-height: 100vh;
    overflow-y: visible;
    overflow-x: hidden;
    padding-top: calc(var(--default-spacing));
  }
  @media (max-width: 768px) {
    padding-top: calc(var(--default-spacing) * 2);
  }
`;

const Noise = styled.div`
  background: url('/Noise.png');
  background-repeat: repeat;
  opacity: 1;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: visible;
  pointer-events: none;
  position: absolute;
  inset: 0;
  z-index: 1001;
  &::after {
    content: '';
    position: absolute;
    width: ${({ $isWorkPage }) => ($isWorkPage ? '100%' : 'calc(100% - 35vw)')};
    height: 100%;
    pointer-events: none;
    opacity: 0.12;
    z-index: 5;
    background: url('/paper.avif');
    @media (max-width: 1024px) {
      width: 100%;
      height: ${({ $isWorkPage, $isFirefox }) =>
        $isWorkPage ? '100%' : $isFirefox ? 'calc(100% - (var(--vh) * 100 - var(--default-spacing) + 1px))' : 'calc(100% - (100svh - var(--default-spacing) + 1px))'};
    }
    @media (max-width: 768px) {
      height: ${({ $isWorkPage, $isFirefox }) =>
        $isWorkPage ? '100%' : $isFirefox ? 'calc(100% - (var(--vh) * 100 + 1px))' : 'calc(100% - (100svh - var(--default-spacing) * 2 + 1px))'};
    }
  }
`;

const BoxShadow = styled.div`
  box-shadow: 2px 3px 20px var(--black), 0 0 350px #8f5922 inset;
  position: absolute;
  width: 100%;
  height: calc(var(--vh) * 100);
  inset: 0;
  z-index: 2;
  pointer-events: none;
  mix-blend-mode: multiply;
  @media (max-width: 1024px) {
    height: ${({ $isWorkPage, $isFirefox }) =>
        $isWorkPage ? '100%' : $isFirefox ? 'calc(100% - (var(--vh) * 100 - var(--default-spacing) + 1px))' : 'calc(100% - (100svh - var(--default-spacing) + 1px))'};
    width: 100%;
    box-shadow: 0 0 100px #8f5922 inset;
  }
  @media (max-width: 768px) {
    height: ${({ $isWorkPage, $isFirefox }) =>
        $isWorkPage ? '100%' : $isFirefox ? 'calc(100% - (var(--vh) * 100 + 1px))' : 'calc(100% - (100svh - var(--default-spacing) * 2 + 1px))'};
  }
`;

const LenisCurtainsSync = memo(({ $isMobile }) => {
    const latestCurtainsRef = useRef(null);
  
    useCurtains((curtains) => {
      latestCurtainsRef.current = curtains;  // keep ref up-to-date
    });
  
    useLenis(({ scroll }) => { 
      if (!latestCurtainsRef.current) return;
  
      const curtains = latestCurtainsRef.current;
  
      if ($isMobile) {
        curtains.updateScrollValues(0, scroll);
      } else {
        curtains.updateScrollValues(scroll, 0);
      }
    });
  
    return null;
  });

const Layout = memo(({ $isMobile, $isFirefox, data, socialData, aboutData, navigationData }) => {
  const { isVideoCapable } = usePerformance();
  const location = useLocation();
  const isWorkPage = location.pathname.includes('/projects');

  console.log(isVideoCapable)
  // If the device is not video capable, render an empty component
/*   if (!isVideoCapable) {
    return (
        <>
        </>
    )
  }
 */
  return (
    <AppContainer className='app'>
      <HelmetProvider>
        <GlobalStyle />
        <Navbar navigationData={navigationData} socialData={socialData} />
        <Helmet>
          <title>Sumit Kukreja</title>
          <link rel='icon' type='image/png' href='/favicon.ico' />
        </Helmet>
        <Curtains
          className='curtains-canvas'
          pixelRatio={Math.min(1, window.devicePixelRatio)}
          antialias={false}
          watchScroll={false}
          premultipliedAlpha={true}
          production={true}
        >
          <LenisCurtainsSync $isMobile={$isMobile} />
          <Root $isMobile={$isMobile} $isFirefox={$isFirefox} isWorkPage={isWorkPage} data={data} socialData={socialData} aboutData={aboutData} />
        </Curtains>
      </HelmetProvider>
    </AppContainer>
  );
});

const Root = memo(({ $isMobile, $isFirefox, isWorkPage, data, socialData, aboutData }) => {
  const location = useLocation();
  const container = useRef(null);

  const curtains = useCurtains((curtains) => {
    curtains.resize();
    curtains.updateScrollValues(0, 0);
  });

  useEffect(() => {
    if (curtains) {
      curtains.updateScrollValues(0, 0);
    }
  }, [location, curtains]);

  useEffect(() => {
    function setVh() {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    }

    setVh();
    window.addEventListener('resize', setVh);

    return () => {
      window.removeEventListener('resize', setVh);
    };
  }, []);

  return (
    <Content id='content-container' ref={container}>
      <Noise $isFirefox={$isFirefox} className={'noise'} $isWorkPage={isWorkPage} />
      <BoxShadow $isFirefox={$isFirefox} $isWorkPage={isWorkPage} />
      <TransitionMask />
      <AnimatePresence mode="wait">
        <Suspense fallback={<LoadingScreen variants={loadingVariants} initial='hidden' animate='visible' exit='exit' $isFirefox={$isFirefox} />}>
          <Routes location={location} key={location.pathname}>
            <Route path='/' element={<Home $isMobile={$isMobile} $isFirefox={$isFirefox} data={data} socialData={socialData} aboutData={aboutData} />} />
            <Route path='/project/:id' element={<Project $isMobile={$isMobile} data={data} socialData={socialData} $isFirefox={$isFirefox} />} />
            <Route path='/projects' element={<Work projectData={data} />} />
          </Routes>
        </Suspense>
      </AnimatePresence>
    </Content>
  );
});

export default Layout;
