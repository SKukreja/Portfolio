// CustomLink.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTransition } from './TransitionContext';
import { useLenis } from '@studio-freight/react-lenis';

const CustomLink = ({ to, children, ...props }) => {
  const { setIsTransitioning } = useTransition();
  const navigate = useNavigate();
  const lenis = useLenis();
  const handleClick = (e) => {
    e.preventDefault();
    setIsTransitioning(true);
    lenis?.scrollTo(0, 0);
    setTimeout(() => {
      navigate(to);
      setIsTransitioning(false);
    }, 2000); // Match the duration of the fade-in transition
  };

  return (
    <Link to={to} onClick={handleClick} {...props}>
      {children}
    </Link>
  );
};

export default CustomLink;
