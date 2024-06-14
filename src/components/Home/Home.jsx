import React, { useState, useEffect, useMemo } from 'react';
import Landing from './Landing';
import FeaturedWorks from './FeaturedWorks';
import About from './About';
import Cover from '../Footer/Cover';
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components';
import { usePerformance } from '../Common/VideoContext'; // Ensure this import
import ReactGA from 'react-ga4';

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
const MemoizedFeaturedWorks = React.memo(FeaturedWorks);
const MemoizedAbout = React.memo(About);
const MemoizedCover = React.memo(Cover);

// Placeholder component
const PlaceholderComponent = styled.div`
  width: 100%;
  height: 300px; // Adjust as needed
  background: url('/placeholder-image.png'); // Replace with your placeholder image path
  background-size: cover;
  background-position: center;
`;

const Home = ({ $isMobile, $isFirefox, data, socialData, aboutData }) => {
  const { isVideoCapable } = usePerformance();
  const [Splash, setSplash] = useState(null);

  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: "/", title: "Home Page" });
  }, []);

  useEffect(() => {
    if (isVideoCapable) {
      import('./Splash').then((module) => {
        setSplash(() => module.default);
      });
    }
    else {
      import('./Simplified/Splash').then((module) => {
        setSplash(() => module.default);
      });
    }
  }, [isVideoCapable]);

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
      {Splash ? (
        <Splash $isMobile={$isMobile} />
      ) : null}
      {memoizedFeaturedWorks}
      {memoizedAbout}
      {memoizedCover}
    </Container>
  );
};

export default React.memo(Home);
