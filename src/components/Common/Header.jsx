import React, {useContext, useState, useRef, useEffect} from 'react'
import styled, { keyframes, css } from 'styled-components';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import use from '../../hooks/use';
import { Icons } from './Icons';
import { ModalContext } from './ModalContext.jsx';

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

const Nav = styled.nav`
  width: 100vw;
  padding-left: calc((100vw - var(--desktop-container-width))/2);
  padding-right: calc((100vw - var(--desktop-container-width))/2);
  position: fixed;
  box-sizing: border-box;
  top: 0;
  padding-top: 1rem;
  padding-bottom: 1rem;
  transform: ${({ scrollPos }) =>
    scrollPos === 'down' ? 'translateY(-100%)' : 'translateY(0)'};
  transition: transform 0.5s ease, background 0.5s ease;
  background: ${({ isNavSolid, isMobile }) => !isNavSolid ? isMobile ? 'transparent' : 'transparent' : 'var(--black)'};
  display: flex;
  z-index: 20;
  left: 0;
  margin-right: auto;
  margin-left: auto;  
  right: 0;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;  
  opacity: 1;
  & .logo {
    filter: ${({ isNavSolid, isMobile }) => !isNavSolid ? (isMobile ? 'brightness(0) invert(0)' : 'brightness(0) invert(0)') : (isMobile ? 'brightness(0) invert(0)' : 'brightness(0) invert(1)')};
    transition: transform 0.5s ease, filter 0.5s ease;
  }
  & .logo:hover {
    transform: scale(1.1);
  }
  @media (max-width: 768px) {
    padding-top: 0;
    padding-bottom: 0;
    padding-left: 1rem;
    padding-right: 1rem;    
  }

`

const Left = styled.div`
  width: 200px;
`;

const Center = styled.div`
  margin-left: auto;
  margin-right: auto;
  display: flex;
  @media (max-width: 768px) {
    margin-left: 0;
    margin-right: 0;
  }
`;

const SocialLink = styled.a`
  font-size: 1.5rem;
  margin-left: 1rem;
  color: ${({ isNavSolid, isMobile }) => !isNavSolid ? (isMobile ? 'black' : 'black') : (isMobile ? 'var(--black)' : 'var(--offwhite)')};
  transition: color 0.5s ease;
  &:hover {
    color: ${({ isNavSolid, isMobile }) => !isNavSolid ? (isMobile ? 'white' : 'white') : 'var(--accent-colour)'};
  }
`;

const Branding = styled.img`
  width: 80px;
  pointer-events: auto;  
  cursor: pointer;
  user-select: none;
  transition: opacity 0.5s ease;
  opacity: 1;
  z-index: 50;
  position: absolute;
  @media (max-width: 768px) {
    width: 60px;
  }
`;

const Right = styled.div`
  text-align: right;
  width: 200px;
  @media (max-width: 768px) {
    display: none;
  }
`;

const Menu = styled.nav`
  font-family: var(--body-font);
  font-weight: 600;
  text-transform: uppercase;
  transition: background 0.5s ease;
  background: ${({ isNavSolid, isMobile }) => !isNavSolid ? isMobile ? 'transparent' : 'transparent' : 'var(--black)'};
  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  color: ${({ isNavSolid, isMobile }) => !isNavSolid ? (isMobile ? 'var(--black)' : 'var(--black)') : 'var(--offwhite)'};
  text-decoration: none;
  letter-spacing: 1px;
  font-size: var(--body-text);
  font-family: var(--body-font);
  user-select: none;
  will-change: color;
  transition: color 0.5s ease;
  pointer-events: auto;
  padding: 1rem;
  &:hover {
    color: ${({ isNavSolid, isMobile }) => !isNavSolid ? (isMobile ? 'var(--offwhite)' : 'var(--offwhite)') : 'var(--accent-colour)'};  
  }
`;

const LogoContainer = styled(Link)`
  position: relative;
  display: flex;
  height: 80px;
  width: fit-content;
  align-items: center;  
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100vh;
  width: 100%;
  visibility: ${({ isVisible }) => (isVisible ? 'visible' : 'hidden')};
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transition: visibility 0s ${({ isVisible }) => (isVisible ? '0s' : '0.3s')}, opacity 0.3s ease-out;
  flex-direction: column;
  background: linear-gradient(to bottom right, rgba(255, 255, 243, 0.6), rgba(255, 155, 168, 0.6));
  z-index: 10;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(5px) saturate(180%) contrast(1.2);
    z-index: -1;
  }
`;

const OverlayLink = styled(Link)`
  color: var(--black);
  text-decoration: none;
  letter-spacing: 1px;
  font-size: 2rem;
  background: transparent;
  text-shadow: 0 0 2px var(--black);
  pointer-events: auto;
  padding: 2rem;
  user-select: none;
  opacity: 0;
  &:hover {
    color: #FF6281;
    text-shadow: 0 0 2px #FF6281;
  }
  animation: ${({ isVisible, index }) =>
    isVisible
      ? css`${slideInFromRight} 0.4s ease-out ${(index + 1) * 0.05}s forwards`
      : 'none'};
`;


const OverlayMenu = styled.nav`
  display: none;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  font-family: 'Poppins';
  font-weight: 500;
  text-transform: uppercase;

  @media (max-width: 768px) {
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
    width: 27px;
    height: 2px;    
    background: ${({ isNavSolid, isMobile }) => !isNavSolid ? (isMobile ? 'var(--black)' : 'var(--black)') :  (isMobile ? 'var(--black)' : 'var(--offwhite)')};  
    margin: 7px 0;
    transition: transform 0.3s ease, background 0.5s ease;
  }

  @media (max-width: 768px) {
    display: block;
  }

  &.buttonActive {
    span:nth-child(1) {
      transform: rotate(45deg) translate(6px, 7px);
    }

    span:nth-child(2) {
      opacity: 0;
    }

    span:nth-child(3) {
      transform: rotate(-45deg) translate(6px, -7px);
    }
  }
`;

const usePath = () => {
  const location = useLocation();
  const [path, setPath] = useState(location.pathname);

  useEffect(() => {
    console.log("Setting path:", location.pathname);
    setPath(location.pathname);
  }, [location]);

  return path;
};

function Navbar({ socialData }) {
  const { data, loading, error } = use('/navigation?populate=deep');
  const socials = socialData;
  const { isModalOpen, setIsModalOpen } = useContext(ModalContext);
  const [isSolid, setIsSolid] = useState(false);
  const [scrollPos, setScrollPos] = useState(0);
  const [onHomePage, setOnHomePage] = useState(false);
  const path = usePath(); 
  const isSolidRef = useRef(isSolid);

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
    if(path === '/') {
      setOnHomePage(true);
      setIsSolid(true);
    } else {
      setOnHomePage(false);
      setIsSolid(true);
    }
  }, [onHomePage, path]);

  useEffect(() => {    
    let prevScrollpos = window.pageYOffset;
    const onScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setScrollPos(prevScrollpos === 0 || prevScrollpos > currentScrollPos ? "up" : "down");
      prevScrollpos = currentScrollPos;
      // handle the path check within the scroll event listener
      if(path === '/') {
        setIsSolid(true);
      } else {
        setIsSolid(true);
      }
    };
  
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [path]); // remove the other scroll event listeners
  
  useEffect(() => {
    let originalScrollY = 0;
    if (isModalOpen) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      originalScrollY = window.scrollY;
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.top = `-${originalScrollY}px`;
  
      return () => {
        document.body.style.overflow = originalStyle;
        document.body.style.position = '';
        document.body.style.width = '';
        document.body.style.top = '';
        //window.scrollTo(0, originalScrollY);        
      };
    } 
  }, [isModalOpen]); 

  return (
    <>
      <Nav onHomePage={onHomePage} scrollPos={scrollPos} isNavSolid={isSolid} isMobile={isModalOpen}>
      <Left>
        <LogoContainer to="/">
          <Branding className="logo" src="/logo.png" isDark={isModalOpen} />
        </LogoContainer>
      </Left>
      <Center>
        <HamburgerButton
          onClick={toggleOverlay}
          className={isModalOpen ? 'hamburger buttonActive' : 'hamburger'}
          isNavSolid={isSolid}
          isMobile={isModalOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </HamburgerButton>
        <Menu className="nav-menu" isNavSolid={isSolid}
          isMobile={isModalOpen}>
          {data?.attributes.links.map((link) => {
            if(link.text !== 'Home') {
              return (<NavLink className='nav-link' key={link.id} to={link.url} isNavSolid={isSolid} onHome={onHomePage}>{link.text}</NavLink>);
            }
          })}
        </Menu>
      </Center>
      <Right>
        {socials?.attributes.links.map((link, index) => (
          <SocialLink key={link.id} href={link.url} isNavSolid={isSolid} onHome={onHomePage} target="_blank">{Icons[link.icon]()}</SocialLink>          
        ))}
      </Right>
      <Overlay isVisible={isModalOpen}>
        <OverlayMenu>
          {data?.attributes.links.map((link, index) => (
            <OverlayLink
              key={link.id}
              onClick={handleClick}
              to={link.url}
              isVisible={isModalOpen}
              index={index}
            >
              {link.text}
            </OverlayLink>
          ))}
        </OverlayMenu>
      </Overlay>
      </Nav>
    </>
  );
};

export default Navbar;