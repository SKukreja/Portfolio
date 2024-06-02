import React, { forwardRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTransition } from './TransitionContext';
import { useLenis } from '@studio-freight/react-lenis';

const CustomLink = forwardRef(({ to, children, preloadData, ...props }, ref) => {
  const { setIsTransitioning } = useTransition();
  const navigate = useNavigate();
  const lenis = useLenis();
  const location = useLocation();

  const handleClick = async (e) => {
    e.preventDefault();
    if (location.pathname === to) {
      lenis?.scrollTo(0, 0);
    } else {
      setIsTransitioning(true);
      lenis?.scrollTo(0, 0);

      setTimeout(() => {
        navigate(to);
        setIsTransitioning(false);
      }, 2000);
    }
  };

  return (
    <>
      <Link ref={ref} to={to} onClick={handleClick} {...props}>
        {children}
      </Link>
    </>
  );
});

export default CustomLink;
