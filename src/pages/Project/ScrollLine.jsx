import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useLenis } from '@studio-freight/react-lenis';

const ScrollLineStyled = styled.div`
  height: 100px;
  width: 1px;
  background: linear-gradient(45deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.3) 25%, var(--black) 50%, rgba(0,0,0,0.3) 75%, rgba(0,0,0,0) 100%);
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
  bottom: 10px;
  z-index: 2;
  display: none;
  opacity: ${({ $isInvisible }) => ($isInvisible ? 0 : 1)};
  transition: opacity 0.5s ease;
  @media (max-width: 1024px) {
    display: block;
  }
`;

const ScrollLine = () => {
  const [isVisible, setVisible] = useState(true);

  useLenis(({ scroll }) => {
    setVisible((prevIsVisible) => {
      if (prevIsVisible && scroll > 10) {
        return false;
      } else if (!prevIsVisible && scroll <= 10) {
        return true;
      }
      return prevIsVisible;
    });
  });

  return <ScrollLineStyled $isInvisible={!isVisible} />;
};

export default ScrollLine;
