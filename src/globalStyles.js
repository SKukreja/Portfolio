// globalStyles.js
import { createGlobalStyle } from 'styled-components';

import SatoshiRegularWoff from './assets/fonts/Satoshi-Regular.woff'
import SatoshiRegularWoff2 from './assets/fonts/Satoshi-Regular.woff2'
import SatoshiBoldWoff from './assets/fonts/Satoshi-Bold.woff'
import SatoshiBoldWoff2 from './assets/fonts/Satoshi-Bold.woff2'
import SatoshiBlackWoff from './assets/fonts/Satoshi-Black.woff'
import SatoshiBlackWoff2 from './assets/fonts/Satoshi-Black.woff2';

import PixelWoff from './assets/fonts/Pixel.woff'
import PixelWoff2 from './assets/fonts/pixelsix00.woff2'
 

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Pixel';
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

  /* Firefox */
  * {
    scrollbar-width: thin;
    scrollbar-color: #504CCF transparent;
  }

  /* Chrome, Edge, and Safari */
  *::-webkit-scrollbar {
    width: 3px;
  }

  *::-webkit-scrollbar-track {
    background: transparent;
  }

  *::-webkit-scrollbar-thumb {
    background-color: #504CCF;
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
    background: #080708;
    color: #F1E3F3;
    box-sizing: border-box;
    transition: background 0.5s ease;
    display: flex;
    width: 100%;
    min-height: 100vh;
    justify-content: center;
    font-family: 'Satoshi', Open-Sans, Helvetica, Sans-Serif;
  }
  .inverted body {
    background: #F1E3F3;
  }
  .inverted nav {
    background: linear-gradient(to bottom, #F1E3F3 33%, rgba(241, 227, 243, 0.25) 75%, transparent);
  }
  .inverted nav a {
    color: #080708;
  }
  .inverted nav .logo-dark {
    opacity: 1;
  }
  .inverted nav .logo-light {
    opacity: 0;
  }
  .inverted .hamburger span{
    background: #080708;
  }
  .no-scroll {
    overflow: hidden;
  }
`;
 
export default GlobalStyle;