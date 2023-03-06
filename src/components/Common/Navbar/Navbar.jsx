import React, {useEffect, useState} from 'react'
import styled, { keyframes } from 'styled-components'
import use from '../../../hooks/use';

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

const Nav = styled.div`
  width: calc(100% - 4rem);
  position: fixed;
  top: 0;
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
  color: white;
  text-decoration: none;
  letter-spacing: 1px;
  font-size: 1rem;
  text-shadow: 0 0 2px #f1e3f3;
  pointer-events: auto;
  padding: 1rem;
  &:hover {
    color: #504CCF;
    text-shadow: 0 0 2px #504CCF;
  }
`;

const Navbar = () => {
  const { data, loading, error } = use(
    `/navigation?populate=deep`
  );

  return (
    <Nav>
      <Left>
        <Branding src='/logo.png' />
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