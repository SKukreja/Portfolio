import React, { useMemo } from 'react';
import Landing from '../../components/Home/Landing';
import Splash from '../../components/Home/Splash';
import FeaturedWorks from '../../components/Home/FeaturedWorks';
import About from '../../components/Home/About';
import Cover from '../../components/Home/Cover';
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components';

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

const MemoizedLanding = React.memo(Landing);
const MemoizedSplash = React.memo(Splash);
const MemoizedFeaturedWorks = React.memo(FeaturedWorks);
const MemoizedAbout = React.memo(About);
const MemoizedCover = React.memo(Cover);

const Home = ({ $isMobile, $isFirefox, data, socialData, aboutData }) => {
  const memoizedFeaturedWorks = useMemo(() => (
    <MemoizedFeaturedWorks $isMobile={$isMobile} $isFirefox={$isFirefox} data={data} />
  ), [$isMobile, $isFirefox, data]);

  const memoizedAbout = useMemo(() => (
    <MemoizedAbout $isMobile={$isMobile} aboutData={aboutData} />
  ), [$isMobile, aboutData]);

  const memoizedCover = useMemo(() => (
    <MemoizedCover $isMobile={$isMobile} $isFirefox={$isFirefox} socialData={socialData} />
  ), [$isMobile, $isFirefox, socialData]);

  return (
    <Container> 
      <Helmet>
        <title>Sumit Kukreja</title>
      </Helmet>        
      <MemoizedLanding $isMobile={$isMobile} />
      <MemoizedSplash $isMobile={$isMobile} />
      {memoizedFeaturedWorks}
      {memoizedAbout}
      {memoizedCover}
    </Container>
  );
};

export default React.memo(Home);
