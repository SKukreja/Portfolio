// globalStyles.js
import { createGlobalStyle } from 'styled-components';

import SatoshiRegularWoff from './assets/fonts/Satoshi-Regular.woff'
import SatoshiRegularWoff2 from './assets/fonts/Satoshi-Regular.woff2'
import SatoshiBoldWoff from './assets/fonts/Satoshi-Bold.woff'
import SatoshiBoldWoff2 from './assets/fonts/Satoshi-Bold.woff2'
import SatoshiBlackWoff from './assets/fonts/Satoshi-Black.woff'
import SatoshiBlackWoff2 from './assets/fonts/Satoshi-Black.woff2';

import HindRegularWoff from './assets/fonts/Hind-Regular.woff'
import HindRegularWoff2 from './assets/fonts/Hind-Regular.woff2'
import HindBoldWoff2 from './assets/fonts/Hind-Bold.woff2'

import PixelWoff from './assets/fonts/Pixel.woff'
import PixelWoff2 from './assets/fonts/pixelsix00.woff2'
 

const GlobalStyle = createGlobalStyle`
  :root {
    --offwhite: #FFFDF9;
    --accent-colour: #ec4359;
    --secondary-colour: #AD5893;
    --black: #000006;
    --body-text: 0.9vw;
    --article-spacing: 4rem;
    --desktop-container-width: 60vw;
    --default-spacing: 2rem;
    @media (max-width: 1920px) {      
      --article-spacing: 4rem;
      --desktop-container-width: 70vw;
    }
    @media (max-width: 1600px) {      
      --article-spacing: 4rem;
      --desktop-container-width: 80vw;
    }
    @media (max-width: 1440px) {      
      --article-spacing: 4rem;
      --desktop-container-width: 90vw;
    }
    @media (max-width: 1024px) {
      --body-text: 3vw;
      --desktop-container-width: 100vw;
    }
    @media (max-width: 768px) {
      --body-text: 4vw;
    }
  }

  @font-face {
    font-family: 'Hind';
    src: url(${PixelWoff2}) format('woff2'),
        url(${PixelWoff}) format('woff');
  }
  @font-face {
    font-family: 'Satoshi';
    src: url(${SatoshiRegularWoff2}) format('woff2'),
        url(${SatoshiRegularWoff}) format('woff');
    font-weight: 400;
  }
  @font-face {
    font-family: 'Satoshi';
    src: url(${SatoshiBoldWoff2}) format('woff2'),
        url(${SatoshiBoldWoff}) format('woff');
    font-weight: 600;
  }
  @font-face {
    font-family: 'Satoshi';
    src: url(${SatoshiBlackWoff2}) format('woff2'),
        url(${SatoshiBlackWoff}) format('woff');
    font-weight: 900;
  }
  @font-face {
    font-family: 'Hind';
    src: url(${HindRegularWoff2}) format('woff2'),
        url(${HindRegularWoff}) format('woff');
    font-weight: 400;
  }
  @font-face {
    font-family: 'Hind';
    src: url(${HindBoldWoff2}) format('woff2');
    font-weight: 600;
  }

  /* Firefox */
  * {
    scrollbar-width: thin;
    scrollbar-color: var(--accent-colour) transparent;
  }

  /* Chrome, Edge, and Safari */
  *::-webkit-scrollbar {
    width: 3px;
  }

  *::-webkit-scrollbar-track {
    background: transparent;
  }

  *::-webkit-scrollbar-thumb {
    background-color: var(--accent-colour);
    border-radius: 0px;
    border: 0px solid transparent;
  }

  .app {
    width: 100vw;    
    margin: 0 auto;
    box-sizing: border-box;
  }
  html, body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    overflow-x: hidden;
  }
  body {
    background: var(--black);
    color: var(--offwhite);
    box-sizing: border-box;
    transition: background 0.5s ease;
    display: flex;
    width: 100%;
    min-height: 100vh;
    justify-content: center;
    font-family: 'Satoshi', Open-Sans, Helvetica, Sans-Serif;
  }
  .inverted body {
    background: var(--offwhite);
  }
  .inverted nav {
    mix-blend-mode: normal;
    background: var(--offwhite);
  }
  .inverted nav a {
    color: var(--black);
  }
  .inverted .topic-header {
    opacity: 0;
  }
  .inverted nav .logo {
    filter: brightness(0) invert(0);    
  }
  .inverted .hamburger span{
    background: var(--black);
  }
  .no-scroll {
    overflow: hidden;
  }
`;
 
export default GlobalStyle;