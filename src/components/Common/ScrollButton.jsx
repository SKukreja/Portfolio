import React from 'react';
import { useLenis } from '@studio-freight/react-lenis';

const ScrollButton = ({ to, children, ...props }) => {
  const lenis = useLenis();
  const $isMobile = window.innerWidth < 1024;
  const handleClick = (e) => {
    e.preventDefault();
    const target = document.querySelector(to);
    //console.log(target)
    if (target) {
        const vwOffset = $isMobile ? window.innerHeight * 0.1 : window.innerWidth * 0.05; // 5vw offset        
        let targetPosition;
        targetPosition = $isMobile ? target.getBoundingClientRect().top - vwOffset : target.getBoundingClientRect().left - vwOffset;
     
        lenis?.scrollTo(targetPosition);
    }
  };

  return (
    <a href={to} onClick={handleClick} {...props}>
      {children}
    </a>
  );
};

export default ScrollButton;
