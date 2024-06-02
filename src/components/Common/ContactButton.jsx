import React, { useContext } from 'react';
import { useLenis } from '@studio-freight/react-lenis';
import { ModalContext } from './ModalContext';
import { useNavigate, Link, useLocation } from 'react-router-dom';

const ContactButton = ({ to, children, ...props }) => {
  const lenis = useLenis();
  const location = useLocation();
  const navigate = useNavigate();
  const { isModalOpen, setIsModalOpen } = useContext(ModalContext);
  const $isMobile = window.innerWidth < 1024;
  const handleClick = async (e) => {
    e.preventDefault();
    setIsModalOpen(false);        
    if (location.pathname === '/work') {
      navigate('/');
    }
    setTimeout(() => { // wait a second before scrolling
      const target = document.querySelector('#contact');
      if (target) { 
        let targetPosition;
        targetPosition = $isMobile ? document.body.offsetHeight : target.getBoundingClientRect().left - vwOffset;
        lenis?.scrollTo(targetPosition);
      }
    }, 500);
  };

  return (
    <Link onClick={handleClick} {...props}>
      {children}
    </Link>
  );
};

export default ContactButton;
