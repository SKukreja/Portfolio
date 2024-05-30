// TransitionMask.jsx
import React from 'react';
import styled from 'styled-components';
import { m } from 'framer-motion';
import { useTransition } from './TransitionContext';

const Mask = styled(m.div)`
  position: fixed;
  inset: 0;
  background: var(--offwhite);
  z-index: 9; 
  pointer-events: none;
`;

const transitionVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const TransitionMask = () => {
  const { isTransitioning } = useTransition();

  return (
    <Mask
      initial="hidden"
      animate={isTransitioning ? "visible" : "hidden"}
      variants={transitionVariants}
      transition={{ duration: 0.5 }}
    />
  );
};

export default TransitionMask;
