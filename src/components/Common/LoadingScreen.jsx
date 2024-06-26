import React, { memo } from 'react';
import styled from 'styled-components';
import { m } from 'framer-motion';

// Styled component for the loading screen container
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

// Styled component for the container
const Container = styled.div`
  position: relative;
  display: flex;
  height: 100vh;
  width: 100%;
`;

// Styled component for the noise layer
const NoiseLayer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url("/Noise.avif");
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
    background: url('/paper.avif');
    @media (max-width: 1024px) {
      width: 100%;
      height: calc(100% - (100vh - var(--default-spacing) + 1px));
    }
    @media (max-width: 768px) {
      height: calc(100% - (100vh - var(--default-spacing) * 2 + 1px));
    }
  }
`;

// Styled component for the box shadow layer
const BoxShadow = styled.div`
  box-shadow: 
      2px 3px 20px var(--black), 
      inset 350px 0 350px -350px #8f5922,
      inset -350px 0 350px -350px #8f5922;
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

// Animation variants for loading screen
const loadingVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  enter: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 2 }
};

// Loading screen component
const LoadingScreen = memo(({ $isFirefox }) => {
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
});

export default LoadingScreen;
export { loadingVariants };
