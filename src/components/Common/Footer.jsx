import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { m, stagger } from "framer-motion";
import { useLocation } from 'react-router-dom';
import use from '../../hooks/use';
import { Icons } from './Icons';

const desktopContainerWidth = 'var(--desktop-container-width)';

const FooterContainer = styled(m.div)`
  width: ${desktopContainerWidth};
  height: calc(50vh - 8rem);
  margin-left: auto;
  margin-right: auto;
  border-top: 5px solid var(--accent-colour);
  overflow: visible;
  position: relative;
  padding: 4rem 0;
  transition: opacity 1s ease 2s;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  @media (max-width: 1024px) {
    border-top: 3px solid var(--accent-colour);
    padding: 2rem 0;
    width: 90%;
  }
`;

const Copyright = styled.span`
  font-family: 'Satoshi';
`;

const Socials = styled(m.div)`
  display: flex;
  @media (max-width: 1024px) {
    width: 100%;
    justify-content: space-between;
  }
`;

const SocialLink = styled(m.a)`
  color: white;  
  font-size: 1.5rem;
  background: var(--accent-colour);
  padding: 1.5rem;
  display: flex;
  align-items: center;
  margin: 0.5rem;
  justify-content: center;
  border-radius: 15px;
  transition: all 0.5s ease;
  & svg {
    width: 3rem;
    height: 3rem;
  }
  &:hover {
    background: var(--offwhite);
    color: var(--black);    
  }
  @media (max-width: 1024px) {
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
  @media (max-width: 1024px) {
    width: 100%;
  }
`;

const usePath = () => {
  const location = useLocation();
  const [path, setPath] = useState(location.pathname);

  useEffect(() => {
    setPath(location.pathname);
  }, [location]);

  return path;
};

const Footer = () => {
  const { data, loading, error } = use('/social?populate=deep');  
  const currentYear = new Date().getFullYear();
  const [onHomePage, setOnHomePage] = useState(false);
  const path = usePath(); 

  useEffect(() => {
    if(path === '/') {
      setOnHomePage(true);
    } else {
      setOnHomePage(false);
    }
  }, [onHomePage, path]);

  const variants = {
    initial: { x: "-10rem" },
    animate: {
      x: 0,
      transition: { staggerChildren: 0.05, ease: "easeInOut", duration: 1 },
    },
  }

  return (
    <FooterContainer initial={{ 
      opacity: 0,      
     }} 
    animate={{ 
      opacity: 1,      
    }} 
    exit={{ 
      opacity: 0,
     }} 
    transition={{ duration: 2 }} onHome={onHomePage}>
      <TopSection>
        <Contact>Let's connect</Contact>
        <Socials>
        {data?.attributes.links.map((link, index) => (
          <SocialLink 
          key={link.id}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }} 
          delay={stagger(0.3)} href={link.url} target="_blank">{Icons[link.icon]}</SocialLink>          
        ))}
        </Socials>
      </TopSection>
      <Copyright>© S.Kukreja {currentYear}</Copyright>
    </FooterContainer>
  )
}

export default Footer