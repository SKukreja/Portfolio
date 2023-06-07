import React from 'react';
import styled, { keyframes } from 'styled-components';
import { motion, useAnimate, stagger } from "framer-motion"
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

const growBorder = keyframes`
  from {
    width: 0;
  }
  to {
    width: 100%;
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
  @media (max-width: 768px) {
    border-top: 3px solid #504CCF;
    padding: 2rem 0;
    width: 90%;
  }
`;

const Copyright = styled.span`
  font-family: 'Satoshi';
`;

const Socials = styled(motion.div)`
  display: flex;
  @media (max-width: 768px) {
    width: 100%;
    justify-content: space-between;
  }
`;

const SocialLink = styled(motion.a)`
  color: white;  
  font-size: 1.5rem;
  background: #504CCF;
  animation: ${hueRotate} 18s linear infinite ${({ delay }) => delay || 0}s;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  margin: 0.5rem;
  justify-content: center;
  border-radius: 15px;
  & svg {
    width: 3rem;
    height: 3rem;
  }
  &:hover {
    background: #C2BBF0;
    color: #080708;    
  }
  @media (max-width: 768px) {
    padding: 1.25rem;
    margin: 0;
    width: calc(90vw/4 - 3rem);
    height: calc(90vw/4 - 3rem);
    & svg {
      width: 2rem;
      height: 2rem;
    }    
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
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Footer = () => {
  const { data, loading, error } = use('/social?populate=deep');
  const currentYear = new Date().getFullYear();
  const variants = {
    initial: { x: "-10rem" },
    animate: {
      x: 0,
      transition: { staggerChildren: 0.05, ease: "easeInOut", duration: 1 },
    },
  }

  return (
    <FooterContainer>
      <TopSection>
        <Contact>Let's connect</Contact>
        <Socials>
        {data?.attributes.links.map((link, index) => (
          <SocialLink 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }} 
          delay={stagger(0.3)} href={link.url} target="_blank">{Icons[link.icon]()}</SocialLink>          
        ))}
        </Socials>
      </TopSection>
      <Copyright>© S.Kukreja {currentYear}</Copyright>
    </FooterContainer>
  )
}

export default Footer