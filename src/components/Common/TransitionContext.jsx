// TransitionContext.jsx
import React, { createContext, useState, useContext } from 'react';

const TransitionContext = createContext();

export const TransitionProvider = ({ children }) => {
  const [isTransitioning, setIsTransitioning] = useState(false);

  return (
    <TransitionContext.Provider value={{ isTransitioning, setIsTransitioning }}>
      {children}
    </TransitionContext.Provider>
  );
};

export const useTransition = () => useContext(TransitionContext);