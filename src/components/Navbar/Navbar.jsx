import React, { useContext, useState, useRef, useEffect, memo, useMemo } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { useLocation } from 'react-router-dom';
import { Icons } from '../Common/Icons.jsx';
import { useLenis } from '@studio-freight/react-lenis';
import { ModalContext } from './ModalContext.jsx';
import CustomLink from '../Common/CustomLink.jsx';
import ContactButton from './ContactButton.jsx';

// Keyframes for slide-in animation
const slideInFromRight = keyframes`
  0% {
    transform: translateX(-50px);
    filter: blur(5px);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    filter: blur(0);
    opacity: 1;
  }
`;

// Styled components
const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  height: calc(var(--vh) * 100);
  width: 80px;
  padding-top: calc(var(--default-spacing) * 0.5);
  padding-bottom: calc(var(--default-spacing) * 0.5);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  transition: background 0.5s ease;
  background: var(--black);
  z-index: 1002;
  &::after {
    content: "";
    background: url("/Noise.png");
    background-repeat: repeat;
    opacity: 1;
    width: 100%;
    height: 100%;
    pointer-events: none;
    position: absolute;
    inset: 0;
  }
  opacity: 1;
  & .logo {
    filter: ${({ $isNavSolid, $isMobile }) => $isNavSolid && !$isMobile ? 'brightness(0) invert(1)' : 'brightness(0) invert(0)'};
    transition: transform 0.5s ease, filter 0.5s ease;
  }
  & .logo:hover {
    transform: scale(1.1);
  }
  @media (max-width: 1024px) {
    top: 0;
    left: 0;
    height: var(--default-spacing);
    width: 100vw;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: calc(var(--default-spacing) / 2) var(--default-spacing);
  }
  @media (max-width: 768px) {
    padding: var(--default-spacing);
  }
`;

const Left = styled.div`
  width: 200px;
`;

const Center = styled.div`
  margin-left: auto;
  margin-right: auto;
  display: flex;
  @media (max-width: 1024px) {
    margin-left: 0;
    margin-right: 0;
  }
`;

const Noise = styled.div`
  background: url("/Noise.png");
  background-repeat: repeat;
  opacity: 1;
  width: 100%;
  height: 100%;
  pointer-events: none;
  position: absolute;
  inset: 0;
  z-index: 1000;
`;

const SocialLink = styled.a`
  font-size: 1.2rem;
  width: 1.5rem;
  margin-bottom: 1rem;
  margin-left: auto;
  margin-right: auto;
  color: ${({ $isNavSolid, $isMobile }) => !$isNavSolid ? ($isMobile ? 'black' : 'black') : ($isMobile ? 'var(--black)' : 'var(--offwhite)')};
  transition: color 0.5s ease;
  & svg {
    width: 1.5rem;
  }
  &:hover {
    color: ${({ $isNavSolid, $isMobile }) => !$isNavSolid ? ($isMobile ? 'white' : 'white') : 'var(--interact-hover-color)'};
  }
`;

const Branding = styled.img`
  width: 50px;
  pointer-events: auto;
  cursor: pointer;
  user-select: none;
  transition: opacity 0.5s ease;
  opacity: 1;
  z-index: 50;
  position: absolute;
  @media (max-width: 1024px) {
    width: 40px;
  }
`;

const Right = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  width: 100%;
  @media (max-width: 1024px) {
    display: none;
  }
`;

const LogoContainer = styled(CustomLink)`
  position: relative;
  display: flex;
  width: 100%;
  height: 50px;
  justify-content: center;
  align-items: center;
  @media (max-width: 1024px) {
    justify-content: flex-start;
  }
`;

const Overlay = styled.div.attrs(({ $isVisible }) => ({
  style: {
    visibility: $isVisible ? 'visible' : 'hidden',
    opacity: $isVisible ? 1 : 0,
  }
}))`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: calc(var(--vh) * 100);
  width: 100%;
  flex-direction: column;
  background: linear-gradient(to bottom right, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5));
  z-index: 10;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    background: url("/Noise.png");
    background-repeat: repeat;
    right: 0;
    left: 0;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(20px) saturate(180%) contrast(1.2);
    z-index: -1;
  }
  &::after {
    content: "";
    background: url("/paper.avif");
    background-repeat: repeat;
    opacity: 0.4;
    width: 100%;
    height: 100%;
    pointer-events: none;
    mix-blend-mode: color-burn;
    position: absolute;
    inset: 0;
  }
`;

const OverlayLink = styled(CustomLink)`
  color: var(--black);
  text-decoration: none;
  letter-spacing: 2px;
  font-size: 2rem;
  background: transparent;
  text-shadow: 0 0 2px var(--black);
  pointer-events: auto;
  padding: 2rem;
  user-select: none;
  opacity: 0;
  &:hover {
    color: var(--interact-hover-color);
  }
  animation: ${({ $isVisible, index }) => 
    $isVisible
      ? css`${slideInFromRight} 0.4s ease-out ${(index + 1) * 0.05}s forwards`
      : 'none'};
`;

const ContactLink = styled(ContactButton)`
  color: var(--black);
  text-decoration: none;
  letter-spacing: 2px;
  font-size: 2rem;
  background: transparent;
  text-shadow: 0 0 2px var(--black);
  pointer-events: auto;
  padding: 2rem;
  user-select: none;
  opacity: 0;
  &:hover {
    color: var(--interact-hover-color);
  }
  animation: ${({ $isVisible, index }) => 
    $isVisible
      ? css`${slideInFromRight} 0.4s ease-out ${(index + 1) * 0.05}s forwards`
      : 'none'};
`;

const OverlayMenu = styled.nav`
  display: none;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  font-family: var(--body-font);
  font-weight: 500;
  @media (max-width: 1024px) {
    display: flex;
  }
`;

const HamburgerButton = styled.button`
  display: none;
  position: relative;
  z-index: 11;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  user-select: none;
  outline: none;
  & span {
    display: block;
    width: 22px;
    height: 2px;
    background: ${({ $isNavSolid, $isMobile }) => !$isNavSolid ? ($isMobile ? 'var(--black)' : 'var(--black)') : ($isMobile ? 'var(--black)' : 'var(--offwhite)')};  
    margin: 5px 0;
    transition: transform 0.3s ease, background 0.5s ease;
  }
  @media (max-width: 1024px) {
    display: block;
  }
  &.buttonActive {
    span:nth-child(1) {
      transform: rotate(45deg) translate(5px, 5px);
    }
    span:nth-child(2) {
      opacity: 0;
    }
    span:nth-child(3) {
      transform: rotate(-45deg) translate(5px, -5px);
    }
  }
`;

const BoxShadow = styled.div`
  box-shadow: 2px 3px 20px var(--black), 0 0 350px #8f5922 inset;
  position: absolute;
  width: 100%;
  height: calc(var(--vh) * 100);
  inset: 0;
  z-index: 1003;
  pointer-events: none;
  mix-blend-mode: multiply;
  @media (max-width: 1024px) {
    height: auto;
    width: 100%;
    box-shadow: 2px 3px 10px var(--black), 0 0 100px #8f5922 inset;
  }
`;

// Custom hook to get the current path
const usePath = () => {
  const location = useLocation();
  const [path, setPath] = useState(location.pathname);

  useEffect(() => {
    setPath(location.pathname);
  }, [location]);

  return path;
};

// Navbar component
const Navbar = memo(({ socialData, navigationData }) => {
  const [data, setData] = useState(null);
  const socials = socialData;
  const { isModalOpen, setIsModalOpen } = useContext(ModalContext);
  const [isSolid, setIsSolid] = useState(false);
  const [onHomePage, setOnHomePage] = useState(false);
  const path = usePath();
  const isSolidRef = useRef(isSolid);
  const lenis = useLenis();

  useEffect(() => {
    if (!navigationData) return;
    setData(navigationData);
  }, [navigationData]);

  useEffect(() => {
    isSolidRef.current = isSolid;
  }, [isSolid]);

  const toggleOverlay = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleClick = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (path === '/') {
      setOnHomePage(true);
      setIsSolid(true);
    } else {
      setOnHomePage(false);
      setIsSolid(true);
    }
  }, [onHomePage, path]);

  useEffect(() => {
    if (isModalOpen) {
      lenis?.stop();
      return () => {
        lenis?.start();
      };
    }
  }, [isModalOpen]);

  if (!data) {
    return null; // or a fallback component
  }

  return (
    <>
      <Nav $isNavSolid={isSolid} $isMobile={isModalOpen}>
        <Left>
          <LogoContainer to="/" aria-label="Home">
            <Branding className="logo" src="/logo.svg" alt="Logo" $isDark={isModalOpen} />
          </LogoContainer>
        </Left>
        <Center>
          <HamburgerButton
            onClick={toggleOverlay}
            className={isModalOpen ? 'hamburger buttonActive' : 'hamburger'}
            $isNavSolid={isSolid}
            $isMobile={isModalOpen}
            aria-label="Menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </HamburgerButton>
        </Center>
        <Right>
          {socials?.attributes.links.map((link) => (
            <SocialLink key={link.id} href={link.url} $isNavSolid={isSolid} target="_blank">{Icons[link.icon]}</SocialLink>
          ))}
        </Right>
        <Overlay $isVisible={isModalOpen}>
          <Noise />
          <BoxShadow />
          <OverlayMenu>
            {data?.attributes.links.map((link, index) => (
              link.text === 'Contact' ? (
                <ContactLink
                  key={link.id}
                  to={link.url}
                  $isVisible={isModalOpen}
                  index={index}
                  aria-label={link.text}
                >
                  {link.text}
                </ContactLink>
              ) : (
                <OverlayLink
                  key={link.id}
                  onClick={handleClick}
                  to={link.url}
                  $isVisible={isModalOpen}
                  index={index}
                  aria-label={link.text}
                >
                  {link.text}
                </OverlayLink>
              )
            ))}
          </OverlayMenu>
        </Overlay>
      </Nav>
    </>
  );
});

export default Navbar;
