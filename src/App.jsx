import React, { useRef, useEffect, useState, memo, useCallback, useMemo } from 'react';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import { LazyMotion, MotionConfig, domAnimation } from 'framer-motion';
import { ModalProvider } from './components/Navbar/ModalContext.jsx';
import use from './components/Common/use.js';
import { ReactLenis, useLenis } from '@studio-freight/react-lenis';
import ParchmentWoff2 from './assets/fonts/ParchmentPrint.woff2';
import ParchmentItalicWoff2 from './assets/fonts/ParchmentPrintItalic.woff2';
import ReactGA from 'react-ga4';
import WizardHandWoff2 from './assets/fonts/WizardHand.woff2';
import LoadingScreen, { loadingVariants } from './components/Common/LoadingScreen.jsx';
import { TransitionProvider } from './components/Common/TransitionContext.jsx';
import { VideoProvider, usePerformance } from './components/Common/VideoContext.jsx';
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

const AppContent = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const [loadedSocialData, setLoadedSocialData] = useState(null);
  const [loadedAboutData, setLoadedAboutData] = useState(null);
  const [loadedNavigationData, setLoadedNavigationData] = useState(null);
  const lenisRef = useRef();
  const { isVideoCapable } = usePerformance();
  const { data: apiData, loading: apiLoading, error } = use('/works?populate=deep&sort=year:desc');
  const { data: socialData, loading: socialApiLoading, sError } = use('/social?populate=deep');
  const { data: aboutData, loading: aboutApiLoading, aError } = use('/about?populate=deep');
  const { data: navigationData, loading: navigationApiLoading, nError } = use('/navigation?populate=deep');

  /*
  useEffect(() => {
    console.log('isVideoCapable:', isVideoCapable); 
  }, [isVideoCapable]);
  */

  const options = useMemo(() => {
    const opts = {
      lerp: 0.04,
      smoothWheel: true,
      syncTouch: isVideoCapable ? true : false,
      orientation: isMobile ? 'vertical' : 'horizontal',
      gestureOrientation: 'both',
    };
    //console.log('Lenis options:', opts);
    return opts;
  }, [isVideoCapable, isMobile]);

  const setVh = useCallback(() => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    ReactGA.initialize(import.meta.env.VITE_GTAG_ID);    
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
  }, []);

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
    <ReactLenis key={`${isVideoCapable}-${isMobile}`} root ref={lenisRef} options={options}>
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
  );
};

const App = () => (
  <VideoProvider>
    <AppContent />
  </VideoProvider>
);

export default App;
