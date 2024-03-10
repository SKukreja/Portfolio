// globalStyles.js
import { createGlobalStyle } from 'styled-components';

import ChristopherRobinWoff2 from './assets/fonts/ChristopherRobin.woff2'

const GlobalStyle = createGlobalStyle`
  :root {
    --offwhite: #F8F8F8;
    --accent-colour: #4F54D5;
    --secondary-colour: #AD5893;
    --black: #121518;
    --body-text: clamp(1rem,1.3vw,2rem);
    --title-text: clamp(1.5rem,10vw,6rem);
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
      --title-text: 12vw;
      --body-text: 4vw;
      --default-spacing: 1.5rem;
    }
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

  .app { 
    margin: 0 auto;
    box-sizing: border-box;    
  }
  html, body {
    margin: 0;
    padding: 0;    
    box-sizing: border-box;
    max-height: 100vh;
    max-height: 100svh;
    overflow-y: hidden;
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