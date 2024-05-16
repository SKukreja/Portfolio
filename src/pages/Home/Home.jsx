import React, { useRef, useState, useEffect } from 'react'
import Landing from '../../components/Home/Landing'
import Splash from '../../components/Home/Splash'
import FeaturedWorks from '../../components/Home/FeaturedWorks'
import About from '../../components/Home/About'
import { Helmet } from 'react-helmet-async'
import styled from 'styled-components'

const Container = styled.div`
  position: relative;

  overflow-y: hidden;
  @media (max-width: 1024px) {
    height: auto;
    overflow-y: auto;
    overflow-x: hidden;
  } 
`;

const Home = ({ $isMobile, $isFirefox }) => {
  return (
    <Container
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    > 
      <Helmet>
        <title>Sumit Kukreja</title>
      </Helmet>        
        <Landing />
        <Splash $isMobile={$isMobile} />
        <FeaturedWorks $isMobile={$isMobile} $isFirefox={$isFirefox} />
        <About />          
    </Container>
  );
};

export default Home;