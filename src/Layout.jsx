import React, { useEffect } from 'react';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import styled from 'styled-components';
import Navbar from './components/Common/Navbar';
import GlobalStyle from './globalStyles';
import { Curtains, useCurtains } from 'react-curtains';
import LenisCurtainsSync from './LenisCurtainsSync';
import Root from './Root';
import ParchmentWoff2 from './assets/fonts/ParchmentPrint.woff2';
import ParchmentItalicWoff2 from './assets/fonts/ParchmentPrintItalic.woff2';
import WizardHandWoff2 from './assets/fonts/WizardHand.woff2';
import use from './hooks/use';

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

const Layout = ({ $isMobile, $isFirefox }) => {
  const { data } = use('/social?populate=deep');

  useEffect(() => {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
      loadingScreen.style.opacity = '0';
    }
  }, []);

  return (
    <AppContainer className='app'>
      <HelmetProvider>
        <GlobalStyle />
        <Navbar socialData={data} />
        <Helmet>
          <title>Sumit Kukreja</title>
          <link rel='icon' type='image/png' href='/favicon.ico' />
          <link rel='preload' href={ParchmentWoff2} as='font' type='font/woff2' crossorigin='anonymous' />
          <link rel='preload' href={ParchmentItalicWoff2} as='font' type='font/woff2' crossorigin='anonymous' />
          <link rel='preload' href={WizardHandWoff2} as='font' type='font/woff2' crossorigin='anonymous' />
        </Helmet>
        <Curtains
          className='curtains-canvas'
          pixelRatio={Math.min(1.5, window.devicePixelRatio)}
          antialias={true}
          watchScroll={false}
          premultipliedAlpha={true}
        >
          <LenisCurtainsSync $isMobile={$isMobile} />
          <Root $isMobile={$isMobile} $isFirefox={$isFirefox} />
        </Curtains>
      </HelmetProvider>
    </AppContainer>
  );
};

export default Layout;
