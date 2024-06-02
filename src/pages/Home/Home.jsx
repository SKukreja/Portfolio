import React from 'react'
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

const Home = ({ $isMobile, $isFirefox, data, socialData, aboutData }) => {
  return (
    <Container> 
      <Helmet>
        <title>Sumit Kukreja</title>
      </Helmet>        
        <Landing $isMobile={$isMobile} />
        <Splash $isMobile={$isMobile} />
        <FeaturedWorks $isMobile={$isMobile} $isFirefox={$isFirefox} data={data} />
        <About $isMobile={$isMobile} aboutData={aboutData} />
        <Cover $isMobile={$isMobile} $isFirefox={$isFirefox} socialData={socialData} />
    </Container>
  );
};

export default Home;