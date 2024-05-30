import React, { useRef, useState, useEffect } from 'react'
import Landing from '../../components/Home/Landing'
import Splash from '../../components/Home/Splash'
import FeaturedWorks from '../../components/Home/FeaturedWorks'
import About from '../../components/Home/About'
import Cover from '../../components/Home/Cover'
import { Helmet } from 'react-helmet-async'
import styled from 'styled-components'

const Container = styled.div`
  position: relative;
  display: flex;
  padding-left: 80px;
  overflow-y: hidden;
  @media (max-width: 1024px) {
    height: auto;
    overflow-y: auto;
    overflow-x: hidden;
    padding-left: 0;
    flex-direction: column;
  } 
`;

const Home = ({ $isMobile, $isFirefox }) => {
  return (
    <Container> 
      <Helmet>
        <title>Sumit Kukreja</title>
      </Helmet>        
        <Landing $isMobile={$isMobile} />
        <Splash $isMobile={$isMobile} />
        <FeaturedWorks $isMobile={$isMobile} $isFirefox={$isFirefox} />
        <About $isMobile={$isMobile} />
        <Cover $isMobile={$isMobile} $isFirefox={$isFirefox} />
    </Container>
  );
};

export default Home;