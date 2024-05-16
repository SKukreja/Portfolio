import React from 'react';
import styled, { keyframes } from 'styled-components';
import { m } from 'framer-motion'

const Header = styled(m.h1)`
  font-family: var(--display-font);
  font-size: var(--title-text);
  color: var(--black);
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  letter-spacing: 4px;
  position: relative;  
  z-index: 4;
  height: auto;
  margin-top: 7.5rem;
  margin: 0;
  margin-left: 5rem;  
  text-align: center;
  width: 100%;
  @media (max-width: 1024px) {    
    margin-top: 0;
    margin-left: auto;
    margin-right: auto;    
  }
`;

const ProjectTitle = ( { titleText } ) => {
    return (        
        <Header>{titleText}</Header>
    );
};

export default ProjectTitle;