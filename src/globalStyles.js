// globalStyles.js
import { createGlobalStyle } from 'styled-components';
import PoppinsBlackWoff from './assets/fonts/Poppins-Black.woff';
import PoppinsBlackWoff2 from './assets/fonts/Poppins-Black.woff2';
import PoppinsExtraBoldWoff from './assets/fonts/Poppins-ExtraBold.woff';
import PoppinsExtraBoldWoff2 from './assets/fonts/Poppins-ExtraBold.woff2';
import PoppinsBoldWoff from './assets/fonts/Poppins-Bold.woff';
import PoppinsBoldWoff2 from './assets/fonts/Poppins-Bold.woff2';
import PoppinsSemiBoldWoff from './assets/fonts/Poppins-SemiBold.woff';
import PoppinsSemiBoldWoff2 from './assets/fonts/Poppins-SemiBold.woff2';
import PoppinsThinWoff from './assets/fonts/Poppins-Thin.woff';
import PoppinsThinWoff2 from './assets/fonts/Poppins-Thin.woff2';
import PoppinsRegularWoff from './assets/fonts/Poppins-Regular.woff';
import PoppinsRegularWoff2 from './assets/fonts/Poppins-Regular.woff2';
 
const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Poppins';
    src: url(${PoppinsBlackWoff2}) format('woff2'),
        url(${PoppinsBlackWoff}) format('woff');
    font-weight: 900;
  }
  @font-face {
    font-family: 'Poppins';
    src: url(${PoppinsExtraBoldWoff2}) format('woff2'),
        url(${PoppinsExtraBoldWoff}) format('woff');
    font-weight: 700;
  }
  @font-face {
    font-family: 'Poppins';
    src: url(${PoppinsBoldWoff2}) format('woff2'),
        url(${PoppinsBoldWoff}) format('woff');
    font-weight: 600;
  }
  @font-face {
    font-family: 'Poppins';
    src: url(${PoppinsSemiBoldWoff2}) format('woff2'),
        url(${PoppinsSemiBoldWoff}) format('woff');
    font-weight: 500;
  }
  @font-face {
    font-family: 'Poppins';
    src: url(${PoppinsRegularWoff2}) format('woff2'),
        url(${PoppinsRegularWoff}) format('woff');
    font-weight: 400;
  }
  @font-face {
    font-family: 'Poppins';
    src: url(${PoppinsThinWoff2}) format('woff2'),
        url(${PoppinsThinWoff}) format('woff');
    font-weight: 200;
  }
  body {
    margin: 0;
    padding: 0;
    background: #080708;
    color: white;
    font-family: Open-Sans, Helvetica, Sans-Serif;
  }
`;
 
export default GlobalStyle;