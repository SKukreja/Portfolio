import React from 'react';
import styled, { keyframes } from 'styled-components';
import { InView, useInView } from 'react-intersection-observer';
import use from '../../hooks/use';
import { Icons } from './Icons';

const desktopContainerWidth = '75vw';

const hueRotate = keyframes`
    0% {
        filter: hue-rotate(10deg);
    }
    
    50% {
        filter: hue-rotate(-30deg);
    }
    
    100% {
        filter: hue-rotate(10deg);
    }
`;

const FooterContainer = styled.div`
  width: ${desktopContainerWidth};
  height: calc(50vh - 8rem);
  margin-left: auto;
  margin-right: auto;
  border-top: 5px solid #504CCF;
  animation: ${hueRotate} 18s linear infinite;
  overflow: visible;
  position: relative;
  padding: 4rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const Copyright = styled.span`
  font-family: 'Satoshi';
`;

const Name = styled.span`
  font-family: 'Poppins';
  font-weight: 900;
  font-size: 2rem;
`;

const Socials = styled.div`
  display: flex;
`;

const SocialLink = styled.a`
  color: white;  
  font-size: 1.5rem;
  background: #504CCF;
  animation: ${hueRotate} 18s linear infinite;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
  margin-right: 1rem;
  & svg {
    width: 3rem;
    height: 3rem;
  }
`;

const Email = styled.a`
  font-family: 'Satoshi';
  font-size: 1rem;
  font-weight: 400;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  & svg {
    margin-right: 0.5rem;
    width: 1.25rem;
    height: 1.25rem;
  }
`;

const Contact = styled.span`
  font-family: 'Satoshi';
  font-weight: 900;
  font-size: 2rem;
  text-transform: uppercase;
  margin-bottom: 1rem;
`;

const TopSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <FooterContainer>
      <TopSection>
        <Contact>Let's connect</Contact>
        <Socials>
          <SocialLink href="https://www.linkedin.com/in/sumit-kukreja-1b1b3b1b0/" target="_blank">{Icons['Envelope']()}</SocialLink>
          <SocialLink href="https://www.linkedin.com/in/sumit-kukreja-1b1b3b1b0/" target="_blank">{Icons['LinkedIn']()}</SocialLink>
          <SocialLink href="https://www.linkedin.com/in/sumit-kukreja-1b1b3b1b0/" target="_blank">{Icons['Github']()}</SocialLink>
          <SocialLink href="https://www.linkedin.com/in/sumit-kukreja-1b1b3b1b0/" target="_blank">{Icons['Code Sandbox']()}</SocialLink>
        </Socials>
      </TopSection>
      <Copyright>© S.Kukreja {currentYear}</Copyright>
    </FooterContainer>
  )
}

export default Footer