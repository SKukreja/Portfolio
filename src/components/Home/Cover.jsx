import React, { useEffect, useState } from 'react';
import use from '../../hooks/use';
import styled, { keyframes } from 'styled-components';
import { InView, useInView } from 'react-intersection-observer';
import { m } from 'framer-motion'
import ProfileImage from './ProfileImage';
import Socials from './Socials';
import WashedAwayText from './WashedAwayText';



const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: calc(25vw);
  padding-left: 5vw;
  height: calc(var(--vh) * 100);
  padding-right: 5vw;  
  z-index: 1001;  
  position: relative;  
  background: var(--black);
  color: var(--offwhite);
  &::after {
    content: "";
    background: url("Noise.png");
    background-repeat: repeat;
    opacity: 1;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 1002;
    position: absolute;
    inset: 0;
  }
  @media (max-width: 1024px) {
    height: ${({ isFirefox }) => isFirefox ? 'calc(100vh - calc(var(--default-spacing) * 2))' : 'calc(100svh - calc(var(--default-spacing) * 2))'};
    margin-left: 0;
    padding: 0;    
    padding-top: var(--default-spacing);
    width: 100%;
  }
  @media (max-width: 768px) {
    height: ${({ isFirefox }) => isFirefox ? 'calc(100vh - calc(var(--default-spacing) * 3))' : 'calc(100svh - calc(var(--default-spacing) * 3))'};
  }
`;

const Bio = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  max-width: calc(100% - var(--default-spacing) * 2);
  align-items: center;  
`;

const Blurb = styled(m.div)`
  font-family: var(--body-font);
  letter-spacing: 1px;    
  font-size: var(--body-text);
  width: 100%;
  overflow: visible;
  font-weight: var(--body-weight);    
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
  justify-content: flex-start;
  height: calc(var(--vh) * 100);
`;

const Footer = styled(m.div)`
  display: flex;
  position: absolute;
  bottom: var(--default-spacing);
  left: 0;
  right: 0;
  margin-left: calc(var(--default-spacing) * -1);
  width: 100%;
  justify-content: flex-end;
  font-size: var(--body-text);
  font-family: var(--display-font);
  vertical-align: middle;
  align-items: center;
`;

const CopyrightSymbol = styled.span`
  font-size: calc(var(--body-text) * 2);
  line-height: 1;
  height: 1rem;
  margin-right: 0.5rem;
`;

const CopyrightText = styled.span`
`;

const Cover = () => {
  const { data, loading, error } = use(
    `/about?populate=deep`
  );

  const [isFirefox, setIsFirefox] = useState(false);

  const isFirefoxAndroid = navigator.userAgent.includes('Firefox') && navigator.userAgent.includes('Android');

  const fadeIn = {
    hidden: { opacity: 0, },
    visible: ({delay}) => ({      
      opacity: 1,
      transition: {      
        delay: 0.3 * delay,  
        duration: 3,
        type: 'spring',
        stiffness: 10,
      },
    }),
  };

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
    <Container as={m.div} isFirefox={isFirefox}>
      <InView>
        {({ inView, ref, entry }) => (
          <>
          <ProfileSection>
            <ProfileImage imageUrl='avatar.png' />
              <Bio ref={ref} className={`${inView ? 'active' : ''}`}>            
                <Blurb
                  variants={fadeIn}
                  initial="hidden"
                  animate={inView ? 'visible' : 'hidden'}
                  custom={{ delay: 0.5 }}
                >
                  Please feel free to contact me by e-mail or find me on one of the platforms below.
                </Blurb>
                <Socials inView={inView} />
              </Bio>
          </ProfileSection>
          <Footer
            variants={fadeIn}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            custom={{ delay: 1.5 }}
          >
            <CopyrightSymbol>©</CopyrightSymbol>        
            <CopyrightText>S.Kukreja {new Date().getFullYear()}</CopyrightText>
          </Footer>
          </>
        )}
      </InView>
    </Container>
  )
}

export default Cover