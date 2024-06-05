import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useLenis } from '@studio-freight/react-lenis';

const ScrollLineStyled = styled.div`
  height: 60px;
  width: 1px;
  background: linear-gradient(45deg, rgba(0,0,0,0) 0%, var(--interact-hover-color) 50%, rgba(0,0,0,0) 100%);
  position: absolute;
  left: 50%;
  bottom: 10px;
  transform: translate(-50%, 0);
  z-index: 2;
  display: none;
  opacity: ${({ $isInvisible }) => ($isInvisible ? 0 : 1)};
  transition: opacity 0.5s ease;
  @media (max-width: 1024px) {
    display: flex;
  }
`;

const ScrollLine = () => {
  const scrollLineRef = useRef(null);

  useLenis(({ scroll }) => {
    if (scrollLineRef.current) {
      if (scroll <= 10) {
        scrollLineRef.current.style.opacity = '1';
      } else {
        scrollLineRef.current.style.opacity = '0';
      }
    }
  });

  return <ScrollLineStyled ref={scrollLineRef} />;
};

export default ScrollLine;
