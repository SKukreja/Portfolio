import React, { useContext, useEffect, useRef, useState, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { LazyMotion, AnimatePresence, MotionConfig, domAnimation } from 'framer-motion';
import GlobalStyle from './globalStyles';
import Navbar from './components/Common/Navbar';
import Home from './pages/Home/Home';
import Work from './pages/Work/Work';
import Contact from './pages/Contact/Contact';
import ReactGA from 'react-ga';
import { Curtains, useCurtains } from 'react-curtains';
import { ModalProvider } from './components/Common/ModalContext';
import styled from 'styled-components';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import use from './hooks/use';
import { ReactLenis, useLenis } from '@studio-freight/react-lenis';
import ModalContext from './components/Common/ModalContext.jsx';
import ParchmentWoff2 from './assets/fonts/ParchmentPrint.woff2';
import ParchmentItalicWoff2 from './assets/fonts/ParchmentPrintItalic.woff2';
import WizardHandWoff2 from './assets/fonts/WizardHand.woff2';
import { m } from 'framer-motion';
import LoadingScreen, { loadingVariants } from './components/Common/LoadingScreen';
import { TransitionProvider } from './components/Common/TransitionContext';
import TransitionMask from './components/Common/TransitionMask.jsx';

const Project = lazy(() => import('./pages/Project/Project'));

const AppContainer = styled.div`
  & .curtains-canvas {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
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
  @media (max-width: 1024px) {
    flex-direction: column;
    width: 100vw;
    min-height: 100vh;
    overflow-y: auto;
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
    mix-blend-mode: color-burn;
    background: url('/paper.jpg');
    @media (max-width: 1024px) {
      width: 100%;
      height: ${({ $isWorkPage, $isFirefox }) =>
        $isWorkPage ? '100%' : $isFirefox ? 'calc(100% - (100vh - var(--default-spacing) + 1px))' : 'calc(100% - (100svh - var(--default-spacing) + 1px))'};
    }
    @media (max-width: 768px) {
      height: ${({ $isWorkPage, $isFirefox }) =>
        $isWorkPage ? '100%' : $isFirefox ? 'calc(100% - (100vh - var(--default-spacing) * 2 + 1px))' : 'calc(100% - (100svh - var(--default-spacing) * 2 + 1px))'};
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
    height: ${({ $isWorkPage, $isFirefox }) =>
        $isWorkPage ? '100%' : $isFirefox ? 'calc(100% - (100vh - var(--default-spacing) + 1px))' : 'calc(100% - (100svh - var(--default-spacing) + 1px))'};
    width: 100%;
    box-shadow: 0 0 100px #8f5922 inset;
  }
  @media (max-width: 768px) {
    height: ${({ $isWorkPage, $isFirefox }) =>
        $isWorkPage ? '100%' : $isFirefox ? 'calc(100% - (100vh - var(--default-spacing) * 2 + 1px))' : 'calc(100% - (100svh - var(--default-spacing) * 2 + 1px))'};
  }
`;

const LenisCurtainsSync = ({ $isMobile }) => {
  const [curtainsRef, setCurtainsRef] = useState(null);

  useCurtains((curtains) => {
    setCurtainsRef(curtains);
  });

  useLenis(({ scroll }) => {
    if (curtainsRef === null) return;
    if ($isMobile) curtainsRef.updateScrollValues(0, scroll);
    else curtainsRef.updateScrollValues(scroll, 0);
  });
};

const ScrollToTop = (props) => {
  const location = useLocation();
  const lenis = useLenis();
  useEffect(() => {
    if (!location.hash) {
      lenis?.scrollTo(0, 0);
    }
  }, [location]);

  return <>{props.children}</>;
};

const Layout = ({ $isMobile, $isFirefox, data, socialData, aboutData }) => {
  const location = useLocation();

  const isWorkPage = location.pathname.includes('/work');

  return (
    <AppContainer className='app'>
      <HelmetProvider>
        <GlobalStyle />
        <Navbar socialData={socialData} />
        <Helmet>
          <title>Sumit Kukreja</title>
          <link rel='icon' type='image/png' href='/favicon.ico' />
        </Helmet>
        <Curtains
          className='curtains-canvas'
          pixelRatio={Math.min(1.5, window.devicePixelRatio)}
          antialias={true}
          watchScroll={false}
          premultipliedAlpha={true}
        >
          <LenisCurtainsSync $isMobile={$isMobile} />
          <Root $isMobile={$isMobile} $isFirefox={$isFirefox} isWorkPage={isWorkPage} data={data} socialData={socialData} aboutData={aboutData} />
        </Curtains>
      </HelmetProvider>
    </AppContainer>
  );
};

const Root = ({ $isMobile, $isFirefox, isWorkPage, data, socialData, aboutData }) => {
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

  return (
    <Content id='content-container' ref={container}>
      <Noise $isFirefox={$isFirefox} className={'noise'} $isWorkPage={isWorkPage} />
      <BoxShadow $isWorkPage={isWorkPage} />
      <TransitionMask />
      <AnimatePresence mode="wait">
        <Suspense fallback={<LoadingScreen variants={loadingVariants} initial='hidden' animate='visible' exit='exit' $isFirefox={$isFirefox} />}>
          <Routes location={location} key={location.pathname}>
            <Route path='/' element={<Home $isMobile={$isMobile} $isFirefox={$isFirefox} data={data} socialData={socialData} aboutData={aboutData} />} />
            <Route path='/project/:id' element={<Project $isMobile={$isMobile} data={data} socialData={socialData} $isFirefox={$isFirefox} />} />
            <Route path='/work' element={<Work projectData={data} />} />
            <Route path='/contact' element={<Contact />} />
          </Routes>
        </Suspense>
      </AnimatePresence>
    </Content>
  );
};

export const CoverContext = React.createContext();

const preloadFonts = (fontUrls) => {
  const promises = fontUrls.map((url) => {
    const font = new FontFace('FontName', `url(${url})`);
    return font.load().then((loadedFont) => {
      document.fonts.add(loadedFont);
    });
  });
  return Promise.all(promises);
};

const preloadImages = (imageUrls) => {
  const promises = imageUrls.map((url) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = url;
      img.onload = resolve;
      img.onerror = reject;
    });
  });
  return Promise.all(promises);
};

const extractImageUrlsFromData = (data) => {
  let imageUrls = [
    '/splash.png',
    '/splashnoise.png',
    '/profilenoise.png',
    '/avatar.png',
    '/bg-min.jpg',
    '/paper.jpg',
  ];
  data.map(project => {
    if (project.attributes.featured.data.attributes.url) {
      imageUrls.push(import.meta.env.VITE_APP_UPLOAD_URL + project.attributes.featured.data.attributes.url);
    }
  });
  return imageUrls;
};

const App = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isFirefox, setIsFirefox] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const [loadedSocialData, setLoadedSocialData] = useState(null);
  const [loadedAboutData, setLoadedAboutData] = useState(null);
  const lenisRef = useRef();
  const { data: apiData, loading: apiLoading, error } = use('/works?populate=deep&sort=year:desc');
  const { data: socialData, loading: socialApiLoading, sError } = use('/social?populate=deep');
  const { data: aboutData, loading: aboutApiLoading, aError } = use('/about?populate=deep');

  const options = {
    lerp: 0.05,
    smoothWheel: true,
    syncTouch: true,
    smoothTouch: false, // smooth scroll for touch devices
    orientation: isMobile ? 'vertical' : 'horizontal',
    gestureOrientataion: isMobile ? 'vertical' : 'horizontal',
  };

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

    function handleResize(e) {
      setIsMobile(e.matches);
    }

    mediaQuery.addEventListener('change', handleResize);

    handleResize(mediaQuery);

    return () => {
      mediaQuery.removeEventListener('change', handleResize);
    };
  }, [isMobile]);

  useEffect(() => {
    if (!apiLoading && !socialApiLoading && !aboutApiLoading && apiData && socialData && aboutData) {
      const imageUrls = extractImageUrlsFromData(apiData);
      const fontUrls = [
        ParchmentWoff2,
        ParchmentItalicWoff2,
        WizardHandWoff2
      ];
      setData(apiData);
      setLoadedSocialData(socialData);
      setLoadedAboutData(aboutData);
      Promise.all([preloadImages(imageUrls), preloadFonts(fontUrls)]).then(() => {
        setIsLoading(false);
      });
    }
  }, [apiLoading, socialApiLoading, socialData, apiData, aboutApiLoading, aboutData]);

  
  useEffect(() => {
    if (isLoading) return;
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
      loadingScreen.style.opacity = '0';
    }
  }, [isLoading]);

  return (
    <ReactLenis root ref={lenisRef} options={options}>
      <LazyMotion features={domAnimation}>
        <MotionConfig reducedMotion='user'>
          <ModalProvider>
            <TransitionProvider>
            <Router>
              {isLoading ? (
                <LoadingScreen variants={loadingVariants} initial='hidden' animate='visible' exit='exit' />
              ) : (
                <>
                  <ScrollToTop />
                  <Layout $isMobile={isMobile} $isFirefox={isFirefox} data={data} socialData={loadedSocialData} aboutData={loadedAboutData} />
                </>
              )}
            </Router>
            </TransitionProvider>
          </ModalProvider>
        </MotionConfig>
      </LazyMotion>
    </ReactLenis>
  );
};

export default App;
