import React, { useEffect, useState } from 'react';
import use from '../../hooks/use';
import styled, { keyframes } from 'styled-components';
import { InView, useInView } from 'react-intersection-observer';
import { m } from 'framer-motion'
import Footer from '../Common/Footer';
import ProfileImage from './ProfileImage';
import Socials from './Socials';
import WashedAwayText from './WashedAwayText';



const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100vw;
  margin-left: 35vw;
  padding-left: 5vw;
  padding-right: 5vw;
  padding-top: var(--default-spacing);
  z-index: 11;
  position: relative;
  background: var(--black);
  color: var(--offwhite);
  @media (max-width: 768px) {
    height: ${({ isFirefox }) => isFirefox ? 'calc(100vh - 3rem - var(--default-spacing) + 5px)' : 'calc(100svh - 3rem - var(--default-spacing) + 5px)'};
    margin-left: 0;
    padding: 0;    
    padding-top: var(--default-spacing);
    width: 100%;
  }
`;

const Bio = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  max-width: calc(100% - var(--default-spacing) * 2);
  align-items: center;  
`;

const Blurb = styled.div`
  font-family: var(--body-font);
  letter-spacing: 1px;    
  font-size: var(--body-text);
  width: 100%;
  overflow: visible;
  font-weight: var(--body-weight);    
  @media (max-width: 768px) {
    font-size: 1rem;
  }
  & > p {
    margin: 0;
  }
`;

const ProfileSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;    
  flex-wrap: nowrap;
  position: relative;
`;

const Cover = () => {
  const { data, loading, error } = use(
    `/about?populate=deep`
  );

  const [isFirefox, setIsFirefox] = useState(false);

  const isFirefoxAndroid = navigator.userAgent.includes('Firefox') && navigator.userAgent.includes('Android');

  useEffect(() => {    
    setIsFirefox(isFirefoxAndroid);

    let vh = window.innerHeight * 0.01;
    // Set the --vh custom property
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    
    window.addEventListener('resize', () => {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    });
  }, []);

  return (
    <Container as={ m.div} isFirefox={isFirefox}>
      <ProfileSection>
        <ProfileImage imageUrl='avatar.png' />
        <InView>
        {({ inView, ref, entry }) => (
          <Bio ref={ref} className={`${inView ? 'active' : ''}`}>            
            <Blurb>
              Please feel free to contact me by e-mail or find me on one of the platforms below.
            </Blurb>
            <Socials />
          </Bio>
        )}
        </InView>
      </ProfileSection>
    </Container>
  )
}

export default Cover