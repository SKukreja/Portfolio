import React, {useContext, useEffect} from 'react'
import styled, { keyframes, css } from 'styled-components';
import { Link } from 'react-router-dom';
import use from '../../hooks/use';
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
  width: 100%;
  height: auto;
  position: fixed;
  box-sizing: border-box;
  top: 0;
  transition: all 0.5s ease;
  background: ${({ isDark }) => (isDark ? 
    'linear-gradient(to bottom, #f1e3f3 33%, rgba(241, 227, 243, 0.25) 75%, transparent)' : 
    'linear-gradient(to bottom, #080708 33%, rgba(8, 7, 8, 0.25) 75%, transparent)')};
  display: flex;
  z-index: 20;
  padding: 2rem;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;  
  @media (max-width: 768px) {
    padding: 1.5rem 5vw;
  }  
`

const Left = styled.div`

`;

const Branding = styled.img`
  width: 80px;
  pointer-events: auto;
  z-index: ${({ isDark }) => (isDark ? 1 : 50)};
  position: relative;
  cursor: pointer;
  user-select: none;
  transition: opacity 0.5s ease;
  opacity: ${({ isDark }) => (isDark ? 0 : 1)};
  &.logo-dark {
    z-index: 50;
    position: absolute;
  }
  @media (max-width: 768px) {
    width: 60px;
  }
`;

const Right = styled.div`
  text-align: right;
`;

const Menu = styled.nav`
  font-family: 'Satoshi';
  font-weight: 600;
  text-transform: uppercase;
  margin-right: -1rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  color: #F1E3F3;
  text-decoration: none;
  letter-spacing: 1px;
  font-size: 1rem;
  background: transparent;
  user-select: none;
  text-shadow: 0 0 2px #f1e3f3;
  pointer-events: auto;
  padding: 1rem;
  &:hover {
    color: #504CCF;
    text-shadow: 0 0 2px #504CCF;
  }
`;

const LogoContainer = styled(Link)`
  position: relative;
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
  background: linear-gradient(to bottom right, rgba(241, 227, 243, 0.6), rgba(80, 76, 207, 0.6));
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
  color: #080708;
  text-decoration: none;
  letter-spacing: 1px;
  font-size: 2rem;
  background: transparent;
  text-shadow: 0 0 2px #080708;
  pointer-events: auto;
  padding: 2rem;
  user-select: none;
  opacity: 0;
  &:hover {
    color: #504CCF;
    text-shadow: 0 0 2px #504CCF;
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

  span {
    display: block;
    width: 27px;
    height: 2px;
    background: ${({ isDark }) => (isDark ? '#080708' : '#f1e3f3')};
    margin: 7px 0;
    transition: all 0.3s ease;
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

const Navbar = () => {
  const { data, loading, error } = use('/navigation?populate=deep');
  const { isModalOpen, setIsModalOpen } = useContext(ModalContext);

  const toggleOverlay = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleClick = () => {
    setIsModalOpen(false);
  };

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
        window.scrollTo(0, originalScrollY);
      };
    }
  }, [isModalOpen]);

  return (
    <Nav>
      <Left>
        <LogoContainer to="/">
          <Branding className="logo-dark" src="/logo-dark.png" isDark={!isModalOpen} />
          <Branding className="logo-light" src="/logo.png" isDark={isModalOpen} />
        </LogoContainer>
      </Left>
      <Right>
        <HamburgerButton
          onClick={toggleOverlay}
          className={isModalOpen ? 'hamburger buttonActive' : 'hamburger'}
          isDark={isModalOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </HamburgerButton>
        <Menu className="nav-menu">
          {data?.attributes.links.map((link) => (
            <NavLink key={link.id} to={link.url}>
              {link.text}
            </NavLink>
          ))}
        </Menu>
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
  );
};

export default Navbar;