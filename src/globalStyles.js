// globalStyles.js
import { createGlobalStyle } from 'styled-components';

import ParchmentWoff2 from './assets/fonts/ParchmentPrint.woff2'
import ParchmentItalicWoff2 from './assets/fonts/ParchmentPrintItalic.woff2'
import WizardHandWoff2 from './assets/fonts/WizardHand.woff2'


const GlobalStyle = createGlobalStyle`
  :root {
    --vh: 1%;
    --offwhite: #F8F8F8;
    --accent-colour: #4F54D5;
    --secondary-colour: #9D282E;
    --black: #121518;
    --body-text: clamp(1rem,1.1vw,1.4rem);
    --title-text: clamp(6rem,5vw,10rem);
    --article-spacing: 4rem;
    --desktop-container-width: 60vw;
    --interact-hover-color: #9D282E;
    --default-spacing: 2rem;
    --content-margin-top: 25vh;
    --content-margin-top: 25svh;
    --body-font: 'Parchment', sans-serif;
    --body-weight: 400;
    --header-weight: 600;
    --display-font: 'WizardHand', sans-serif;
    @media (max-width: 1920px) {      
      --article-spacing: 4rem;
      --desktop-container-width: 70vw;
      --default-spacing: 1.5rem;
    }
    @media (max-width: 1600px) {      
      --article-spacing: 4rem;
      --desktop-container-width: 80vw;
    }
    @media (max-width: 1440px) {      
      --article-spacing: 4rem;
      --desktop-container-width: 90vw;
      --default-spacing: 1rem;
    }
    @media (max-width: 1024px) {
      --default-spacing: 4rem;
      --body-text: 3vw;
      --title-text: 15vw;   
    }    
    @media (max-width: 767px) {
      --title-text: 12vw;
      --body-text: 3.5vw;
      --default-spacing: 1.5rem;
      --desktop-container-width: 95vw;
    }
  }

  @font-face {
    font-family: 'Parchment';
    src: url(${ParchmentWoff2}) format('woff2');
    font-weight: 400;
    font-style: normal;
  }

  @font-face {
    font-family: 'Parchment';
    src: url(${ParchmentWoff2}) format('woff2');
    font-weight: 400;
    font-style: normal;
  }

  @font-face {
    font-family: 'Parchment';
    src: url(${ParchmentItalicWoff2}) format('woff2');
    font-weight: 400;
    font-style: italic;
  }

  @font-face {
    font-family: 'WizardHand';
    src: url(${WizardHandWoff2}) format('woff2');
    font-weight: 600;
  }

  html.lenis {
    height: auto;
    display: table;
  }
  
  .lenis.lenis-smooth {
    scroll-behavior: auto !important;
  }
  
  .lenis.lenis-smooth [data-lenis-prevent] {
    overscroll-behavior: contain;
  }
  
  .lenis.lenis-stopped {
    overflow: hidden;
  }
  
  .lenis.lenis-scrolling iframe {
    pointer-events: none;
  }

  /* Firefox */
  * {
    scrollbar-width: none;
    scrollbar-color: var(--black) transparent;
    -webkit-tap-highlight-color: transparent;
  }

  /* Chrome, Edge, and Safari */
  *::-webkit-scrollbar {
    width: 3px;
    background: transparent;
  }

  *::-webkit-scrollbar-track {
    background: transparent;
  }

  *::-webkit-scrollbar-thumb {
    background-color: var(--black);
    border-radius: 0px;
    border: 0px solid transparent;
  }

  *::selection {
    background: var(--interact-hover-color);
    color: var(--offwhite);
  }

  .app { 
    margin: 0 auto;
    box-sizing: border-box;
    overflow-y: hidden;
    height: calc(var(--vh, 1vh) * 100);
    @media (max-width: 1024px) {
      height: auto;
      overflow-y: auto;
      overflow-x: hidden;
    }
  }  

  html, body {
    margin: 0;
    padding: 0;    
    box-sizing: border-box;
    
  }
  body {
    background: var(--offwhite);
    color: var(--black);
    box-sizing: border-box;
    transition: background 0.5s ease;
    display: flex;
    justify-content: center;
    font-family: 'Garamond', Open-Sans, Helvetica, Sans-Serif;
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