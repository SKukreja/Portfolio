import React, {useEffect, useState} from 'react'
import styled, { keyframes } from 'styled-components'
import use from '../../hooks/use';

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

const Nav = styled.nav`
  width: calc(100% - 4rem);
  position: fixed;
  top: 0;
  transition: all 0.5s ease;
  background: linear-gradient(to bottom, #080708 33%, rgba(8, 7, 8, 0.25) 75%, transparent);
  display: flex;
  z-index: 10;
  padding: 2rem;
  pointer-events: none;
  animation: ${hueRotate} 18s linear infinite;
  justify-content: space-between;
  align-items: center;
`

const Left = styled.div`

`;

const Branding = styled.img`
  width: 80px;
  pointer-events: auto;
  z-index: 2;
  position: relative;
  transition: opacity 0.5s ease;
  opacity: 1;
  &.logo-dark {
    opacity: 0;
    z-index: 1;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
  }
`;

const Right = styled.div`
  text-align: right;
`;

const Menu = styled.nav`
  font-family: 'Poppins';
  font-weight: 500;
  text-transform: uppercase;
`;

const Link = styled.a`
  color: #F1E3F3;
  text-decoration: none;
  letter-spacing: 1px;
  font-size: 1rem;
  background: transparent;
  text-shadow: 0 0 2px #f1e3f3;
  pointer-events: auto;
  padding: 1rem;
  &:hover {
    color: #504CCF;
    text-shadow: 0 0 2px #504CCF;
  }
`;

const LogoContainer = styled.div`
  position: relative;
`;

const Navbar = () => {
  const { data, loading, error } = use(
    `/navigation?populate=deep`
  );

  return (
    <Nav>
      <Left>
        <LogoContainer>
          <Branding className='logo-dark' src='/logo-dark.png' />
          <Branding className='logo-light' src='/logo.png' />
        </LogoContainer>
      </Left>
      <Right>
        <Menu>
          {data?.attributes.links.map((link) => (
            <Link key={link.id} href={link.url}>{link.text}</Link>
          ))}
        </Menu>
      </Right>
    </Nav>
  )
}

export default Navbar