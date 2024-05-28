// Root.jsx
import React, { useContext, useEffect, useRef, useState, Suspense, lazy } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import Home from './pages/Home/Home';
import Work from './pages/Work/Work';
import Project from './pages/Project/Project';
import Contact from './pages/Contact/Contact';
import LoadingScreen, { loadingVariants } from './components/Common/LoadingScreen';
import ModalContext from './components/Common/ModalContext.jsx';
import TransitionMask from './components/Common/TransitionMask.jsx';
import { useCurtains } from 'react-curtains';

const Content = styled.div`
  display: flex;
  background: var(--offwhite);
  position: relative;
  overflow-y: hidden;
  @media (max-width: 1024px) {
    flex-direction: column;
    width: 100vw;
    overflow-y: auto;
    overflow-x: hidden;
    padding-top: calc(var(--default-spacing));
  }
  @media (max-width: 768px) {
    padding-top: calc(var(--default-spacing) * 2);
  }
`;

const Noise = styled.div`
  background: url('/Noise.png');
  background-repeat: repeat;
  opacity: 1;
  width: 100%;
  height: 100%;
  pointer-events: none;
  position: absolute;
  inset: 0;
  z-index: 1001;
  &::after {
    content: '';
    position: absolute;
    width: calc(100% - 40vw);
    height: 100%;
    pointer-events: none;
    opacity: 0.12;
    z-index: 5;
    mix-blend-mode: color-burn;
    background: url('/paper.jpg');
    @media (max-width: 1024px) {
      width: 100%;
      height: ${({ $isFirefox }) =>
        $isFirefox ? 'calc(100% - (100vh - var(--default-spacing) + 1px))' : 'calc(100% - (100svh - var(--default-spacing) + 1px))'};
    }
    @media (max-width: 768px) {
      height: ${({ $isFirefox }) =>
        $isFirefox ? 'calc(100% - (100vh - var(--default-spacing) * 2 + 1px))' : 'calc(100% - (100svh - var(--default-spacing) * 2 + 1px))'};
    }
  }
`;

const BoxShadow = styled.div`
  box-shadow: 2px 3px 20px var(--black), 0 0 350px #8f5922 inset;
  position: absolute;
  width: 100%;
  height: calc(var(--vh) * 100);
  inset: 0;
  z-index: 10;
  pointer-events: none;
  mix-blend-mode: multiply;
  @media (max-width: 1024px) {
    height: ${({ $isFirefox }) =>
      $isFirefox ? 'calc(100% - (100vh - var(--default-spacing) + 1px))' : 'calc(100% - (100svh - var(--default-spacing) + 1px))'};
    width: 100%;
    box-shadow: 0 0 100px #8f5922 inset;
  }
  @media (max-width: 768px) {
    height: ${({ $isFirefox }) =>
      $isFirefox ? 'calc(100% - (100vh - var(--default-spacing) * 2 + 1px))' : 'calc(100% - (100svh - var(--default-spacing) * 2 + 1px))'};
  }
`;

const Root = ({ $isMobile, $isFirefox }) => {
  const { isModalOpen } = useContext(ModalContext);
  const location = useLocation();
  const container = useRef(null);
  const [curtainsRef, setCurtainsRef] = useState(null);

  useCurtains((curtains) => {
    setCurtainsRef(curtains);
  });

  useEffect(() => {
    if (curtainsRef) {
      curtainsRef.updateScrollValues(0, 0);
    }
  }, [location, curtainsRef]);

  return (
    <Content id='content-container' ref={container}>
      <Noise $isFirefox={$isFirefox} className={'noise'} />
      <BoxShadow />
      <TransitionMask />
      <AnimatePresence mode="wait">
        <Suspense fallback={<LoadingScreen variants={loadingVariants} initial='hidden' animate='visible' exit='exit' $isFirefox={$isFirefox} />}>
          <Routes location={location} key={location.pathname}>
            <Route path='/' element={<Home $isMobile={$isMobile} $isFirefox={$isFirefox} />} />
            <Route path='/project/:id' element={<Project $isMobile={$isMobile} $isFirefox={$isFirefox} />} />
            <Route path='/work' element={<Work />} />
            <Route path='/contact' element={<Contact />} />
          </Routes>
        </Suspense>
      </AnimatePresence>
    </Content>
  );
};

export default Root;
