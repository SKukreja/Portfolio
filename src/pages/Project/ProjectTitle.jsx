import React from 'react';
import styled, { keyframes } from 'styled-components';
import { m } from 'framer-motion'

const Header = styled(m.h1)`
  font-family: var(--display-font);
  font-size: var(--title-text);
  color: var(--black);
  display: flex;  
  white-space: nowrap;
  letter-spacing: 4px;
  position: relative;  
  z-index: 4;
  height: auto;
  margin: 0;  
  width: 100%;
  margin-bottom: -1rem;
  @media (max-width: 1024px) {    
    margin-top: 0;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 0;
  }
`;

const ProjectTitle = ( { titleText } ) => {
    return (        
        <Header>{titleText}</Header>
    );
};

export default ProjectTitle;