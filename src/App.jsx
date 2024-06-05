import React, { createContext, useRef, useEffect, useState, Suspense, lazy, memo, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { LazyMotion, AnimatePresence, MotionConfig, domAnimation } from 'framer-motion';
import GlobalStyle from './globalStyles';
import Navbar from './components/Common/Navbar';
import Home from './pages/Home/Home';
import Work from './pages/Work/Work';
import { Curtains, useCurtains } from 'react-curtains';
import { ModalProvider } from './components/Common/ModalContext';
import styled from 'styled-components';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import use from './hooks/use';
import { ReactLenis, useLenis } from '@studio-freight/react-lenis';
import ParchmentWoff2 from './assets/fonts/ParchmentPrint.woff2';
import ParchmentItalicWoff2 from './assets/fonts/ParchmentPrintItalic.woff2';
import WizardHandWoff2 from './assets/fonts/WizardHand.woff2';
import LoadingScreen, { loadingVariants } from './components/Common/LoadingScreen';
import { TransitionProvider } from './components/Common/TransitionContext';
import TransitionMask from './components/Common/TransitionMask.jsx';

const Project = lazy(() => import('./pages/Project/Project'));

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

const ScrollToTop = memo((props) => {
  const location = useLocation();
  const lenis = useLenis();
  useEffect(() => {
    if (!location.hash) {
      lenis?.scrollTo(0, 0);
    }
  }, [location, lenis]);

  return <>{props.children}</>;
});

const Layout = memo(({ $isMobile, $isFirefox, data, socialData, aboutData, navigationData }) => {
  const location = useLocation();
  const isWorkPage = location.pathname.includes('/projects');

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

const iOSContext = createContext();

const preloadFonts = (fontUrls) => {
  const promises = fontUrls.map((url) => {
    const font = new FontFace('FontName', `url(${url})`);
    return font.load().then((loadedFont) => {
      document.fonts.add(loadedFont);
    }).catch((error) => {
      console.error("Error loading font:", error);
    });
  });
  return Promise.all(promises).catch((error) => {
    console.error("Error in preloadFonts:", error);
  });
};

const preloadImages = (imageUrls) => {
  const promises = imageUrls.map((url) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = url;
      img.onload = resolve;
      img.onerror = reject;
    }).catch((error) => {
      console.error("Error loading image:", error);
    });
  });
  return Promise.all(promises).catch((error) => {
    console.error("Error in preloadImages:", error);
  });
};

const extractImageUrlsFromData = (data) => {
  let imageUrls = [
    '/splash.avif',
    '/splashnoise.avif',
    '/profilenoise.avif',
    '/sumit.avif',
    '/bg-min.avif',
    '/paper.avif',
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
  const [loadedNavigationData, setLoadedNavigationData] = useState(null);
  const [isOldIOS, setIsOldIOS] = useState(false); // Add state for old iOS
  const lenisRef = useRef();
  const { data: apiData, loading: apiLoading, error } = use('/works?populate=deep&sort=year:desc');
  const { data: socialData, loading: socialApiLoading, sError } = use('/social?populate=deep');
  const { data: aboutData, loading: aboutApiLoading, aError } = use('/about?populate=deep');
  const { data: navigationData, loading: navigationApiLoading, nError } = use('/navigation?populate=deep');

  const options = {
    lerp: 0.05,
    smoothWheel: true,
    syncTouch: true,
    orientation: isMobile ? 'vertical' : 'horizontal',
    gestureOrientation: 'both',    
  };

  const setVh = useCallback(() => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }, []);

  const extractIOSVersion = (userAgent) => {
    const match = userAgent.match(/iPhone OS (\d+)_/);
    if (match && match[1]) {
      const version = parseInt(match[1], 10);
      return version < 16;
    }
    return false;
  };

  useEffect(() => {
    setVh();
    window.addEventListener('resize', setVh);
    return () => {
      window.removeEventListener('resize', setVh);
    };
  }, [setVh]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 1024px)');
    const isFirefoxAndroid = navigator.userAgent.includes('Firefox');
    const isOldIOS = extractIOSVersion(navigator.userAgent);

    setIsFirefox(isFirefoxAndroid);
    setIsOldIOS(isOldIOS); // Set state for old iOS
    console.log(isOldIOS)

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
    if (!apiLoading && !socialApiLoading && !aboutApiLoading && apiData && socialData && aboutData && navigationData && !navigationApiLoading) {
      const imageUrls = extractImageUrlsFromData(apiData);
      const fontUrls = [
        ParchmentWoff2,
        ParchmentItalicWoff2,
        WizardHandWoff2
      ];
      setData(apiData);
      setLoadedSocialData(socialData);
      setLoadedAboutData(aboutData);
      setLoadedNavigationData(navigationData);
      Promise.all([preloadImages(imageUrls), preloadFonts(fontUrls)]).then(() => {
        setIsLoading(false);
      });
    }
  }, [apiLoading, socialApiLoading, socialData, apiData, aboutApiLoading, aboutData, navigationData, navigationApiLoading]);

  useEffect(() => {
    if (isLoading) return;
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
      loadingScreen.style.opacity = '0';
    }
  }, [isLoading]);

  return (
    <iOSContext.Provider value={{ isOldIOS }}>
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
                      <Layout $isMobile={isMobile} $isFirefox={isFirefox} data={data} socialData={loadedSocialData} navigationData={loadedNavigationData} aboutData={loadedAboutData} />
                    </>
                  )}
                </Router>
              </TransitionProvider>
            </ModalProvider>
          </MotionConfig>
        </LazyMotion>
      </ReactLenis>
    </iOSContext.Provider>
  );
};

export default App;
