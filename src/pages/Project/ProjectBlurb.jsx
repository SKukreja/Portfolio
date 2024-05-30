import React from 'react';
import styled, { keyframes } from 'styled-components';
import { m } from 'framer-motion'

const Text = styled(m.p)`
  font-family: var(--body-font);
  letter-spacing: 0.5px;
  position: relative;  
  text-align: justify;
  font-size: var(--body-text);
  font-weight: var(--body-weight);
  z-index: 2;
  max-width: 500px;
  @media (max-width: 1024px) {    
    margin-top: 0;
    margin-left: auto;
    margin-right: auto;    
  }
`;
const ProjectBlurb = ( { blurbText } ) => {
    return (        
        <Text>{blurbText}</Text>
    );
};

export default ProjectBlurb;