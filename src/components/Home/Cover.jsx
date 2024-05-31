import React, { useContext } from 'react';
import use from '../../hooks/use';
import styled, { keyframes } from 'styled-components';
import { InView, useInView } from 'react-intersection-observer';
import { m } from 'framer-motion'
import ProfileImage from './ProfileImage';
import Socials from './Socials';
import WashedAwayText from './WashedAwayText';

const Container = styled(m.div)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 25vw;
  margin-left: 5vw;
  padding-left: 5vw;
  padding-right: 5vw;
  height: calc(var(--vh) * 100);
  position: relative;  
  background: var(--black);
  color: var(--offwhite);
  @media (max-width: 1024px) {
    height: ${({ $isFirefox }) => $isFirefox ? 'calc(100vh - var(--default-spacing) * 2 + 1px)' : 'calc(100svh - var(--default-spacing) * 2 + 1px)'};
    margin-left: 0;
    padding: 0;    
    padding-top: var(--default-spacing);
    width: 100%;
  }
  @media (max-width: 768px) {
    height: ${({ $isFirefox }) => $isFirefox ? 'calc(100vh - var(--default-spacing) * 3 + 1px)' : 'calc(100svh - var(--default-spacing) * 3 + 1px)'};
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
  z-index: 1001;
  max-width: 600px;
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
  justify-content: center;
  height: 100%;
  @media (max-width: 1024px) {
    margin-top: calc(var(--default-spacing) * -2);
  }
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
  z-index: 1001;
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

const Cover = ({ $isMobile, $isFirefox, socialData }) => {
  
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

  return (
    <Container $isFirefox={$isFirefox}>
      <InView>
        {({ inView, ref, entry }) => (
          <>
          <ProfileSection>
              <ProfileImage $imageUrl='/avatar.png' $isMobile={$isMobile} />
              <Bio ref={ref} className={`${inView ? 'active' : ''}`}>                          
                <Blurb
                  variants={fadeIn}
                  initial="hidden"
                  animate={inView ? 'visible' : 'hidden'}
                  custom={{ delay: 0.5 }}
                >
                  Please feel free to contact me by e-mail or find me on one of the platforms below.
                </Blurb>
                <Socials inView={inView} socialData={socialData} />
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