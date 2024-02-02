// globalStyles.js
import { createGlobalStyle } from 'styled-components';

import ChristopherRobinWoff2 from './assets/fonts/ChristopherRobin.woff2'

import SatoshiRegularWoff from './assets/fonts/Satoshi-Regular.woff'
import SatoshiRegularWoff2 from './assets/fonts/Satoshi-Regular.woff2'
import SatoshiBoldWoff from './assets/fonts/Satoshi-Bold.woff'
import SatoshiBoldWoff2 from './assets/fonts/Satoshi-Bold.woff2'
import SatoshiBlackWoff from './assets/fonts/Satoshi-Black.woff'
import SatoshiBlackWoff2 from './assets/fonts/Satoshi-Black.woff2';

import HindRegularWoff from './assets/fonts/Hind-Regular.woff'
import HindRegularWoff2 from './assets/fonts/Hind-Regular.woff2'
import HindBoldWoff2 from './assets/fonts/Hind-Bold.woff2' 

const GlobalStyle = createGlobalStyle`
  :root {
    --offwhite: #F8F8F8;
    --accent-colour: #4F54D5;
    --secondary-colour: #AD5893;
    --black: #121518;
    --body-text: clamp(1rem,1.3vw,2rem);
    --title-text: clamp(1.5rem,2vw,3rem);
    --article-spacing: 4rem;
    --desktop-container-width: 60vw;
    --default-spacing: 2rem;
    --content-margin-top: 25vh;
    --content-margin-top: 25svh;
    --body-font: 'adobe-garamond-pro', sans-serif;
    --body-weight: 400;
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
    @media (max-width: 900px) {
      --body-text: 1.5vw;
      --desktop-container-width: 95vw;
    }
    @media (max-width: 768px) {
      --body-text: 5vw;
    }
  }
  @font-face {
    font-family: 'Christopher Robin';
    src: url(${ChristopherRobinWoff2}) format('woff2');
    font-weight: 700;
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
    scrollbar-color: var(--black) transparent;
    -webkit-tap-highlight-color: transparent;
  }

  /* Chrome, Edge, and Safari */
  *::-webkit-scrollbar {
    width: 3px;
  }

  *::-webkit-scrollbar-track {
    background: transparent;
  }

  *::-webkit-scrollbar-thumb {
    background-color: var(--black);
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
    overflow-x: clip;
  }
  body {
    background: var(--offwhite);
    color: var(--black);
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
  .inverted nav, .inverted .nav-menu {
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