import React from 'react';
import styled from 'styled-components';
import { m } from 'framer-motion'

const Header = styled(m.h1)`
  font-family: var(--display-font);
  font-size: var(--title-text);
  color: var(--black);
  display: flex;  
  white-space: nowrap;
  letter-spacing: 4px;
  position: relative;  
  z-index:2;
  height: auto;
  margin: 0;  
  width: 100%;
  margin-bottom: -1rem;
  @media (max-width: 1024px) {    
    margin-top: 0;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 0;
    &::before {
      content: "";
      position: absolute;
      opacity: 1;
      height: 200%;
      width: 100%;
      left: -10%;
      top: -10%;
      opacity: 1;
      background: -webkit-radial-gradient(var(--offwhite) 0%,transparent 69%), -webkit-radial-gradient(var(--offwhite) 0%,transparent 56%), -webkit-radial-gradient(var(--offwhite) 0%,transparent 66%), -webkit-radial-gradient(var(--offwhite) 0%,transparent 63%);
      background: radial-gradient(var(--offwhite) 0%,transparent 69%),radial-gradient(var(--offwhite) 0%,transparent 56%), radial-gradient(var(--offwhite) 0%,transparent 66%), radial-gradient(var(--offwhite) 0%,transparent 63%);
      z-index: -1;
    }
  }
`;

const ProjectTitle = ( { titleText } ) => {
    return (        
        <Header>{titleText}</Header>
    );
};

export default ProjectTitle;