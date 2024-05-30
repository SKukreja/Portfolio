import React from 'react';
import styled, { keyframes } from 'styled-components';
import { m } from 'framer-motion';

const moveUp = keyframes`
    0% {
        transform: translateY(0);
    }
    100% { 
        transform: translateY(-100%); 
    }
`;

const StyledLoadingScreen = styled(m.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom right, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5));
  z-index: 100;
  overflow: visible;
  display: flex;
  align-items: center;
  justify-content: center;  
`;

const Container = styled.div`
  position: relative;
  display: flex;
  height: 100vh; /* Ensure it's twice the viewport height */
  width: 100%;
`;

const NoiseLayer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url("/Noise.png");
  background-repeat: repeat;
  width: 100%;
  height: 100%;
  z-index: 105;
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

const PaperLayer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url("/paper.jpg");
  background-repeat: repeat;
  opacity: 0.4;
  width: 100%;
  height: 100%;
  pointer-events: none;
  mix-blend-mode: color-burn;
  z-index: 104;
`;

const BoxShadow = styled.div`
    box-shadow: 
        2px 3px 20px var(--black), 
        inset 350px 0 350px -350px #8f5922,
        inset -350px 0 350px -350px #8f5922
    position: absolute;
    width: 100%;
    height: 200%;
    inset: 0;  
    z-index: 103;
    pointer-events: none;
    mix-blend-mode: multiply;  
    @media (max-width: 1024px) {
        height: 100%;
        width: 100%;
        box-shadow: 
        inset 100px 0 100px -100px #8f5922,
        inset -100px 0 100px -100px #8f5922;
    }
`;

const loadingVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  enter: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 2 }
};

const LoadingScreen = ( {$isFirefox} ) => {
    return (
        <StyledLoadingScreen
        variants={loadingVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        >
            <Container>
                <NoiseLayer $isFirefox={$isFirefox} />
                <BoxShadow />
            </Container>
        </StyledLoadingScreen>
    );
};

export default LoadingScreen;
export { loadingVariants };
