import React, { useRef, useEffect, useState, memo, useCallback } from 'react';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import { LazyMotion, MotionConfig, domAnimation } from 'framer-motion';
import { ModalProvider } from './components/Navbar/ModalContext.jsx';
import use from './components/Common/use.js';
import { ReactLenis, useLenis } from '@studio-freight/react-lenis';
import ParchmentWoff2 from './assets/fonts/ParchmentPrint.woff2';
import ParchmentItalicWoff2 from './assets/fonts/ParchmentPrintItalic.woff2';
import WizardHandWoff2 from './assets/fonts/WizardHand.woff2';
import LoadingScreen, { loadingVariants } from './components/Common/LoadingScreen.jsx';
import { TransitionProvider } from './components/Common/TransitionContext.jsx';
import { VideoProvider } from './components/Common/VideoContext.jsx';
import Layout from './Layout.jsx';

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
      console.error("Error loading image:", error, url);
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
    '/avatar.avif',
    '/bg.avif',
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
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const [loadedSocialData, setLoadedSocialData] = useState(null);
  const [loadedAboutData, setLoadedAboutData] = useState(null);
  const [loadedNavigationData, setLoadedNavigationData] = useState(null);
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



  useEffect(() => {
    setVh();
    window.addEventListener('resize', setVh);
    return () => {
      window.removeEventListener('resize', setVh);
    };
  }, [setVh]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 1024px)');

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
    <VideoProvider>
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
                      <Layout $isMobile={isMobile} data={data} socialData={loadedSocialData} navigationData={loadedNavigationData} aboutData={loadedAboutData} />
                    </>
                  )}
                </Router>
              </TransitionProvider>
            </ModalProvider>
          </MotionConfig>
        </LazyMotion>
      </ReactLenis>
    </VideoProvider>
  );
};

export default App;
