import React from 'react'
import { m } from 'framer-motion'
import styled from 'styled-components'
import { Icons } from '../Common/Icons';

const Container = styled(m.div)`
    margin-top: calc(var(--default-spacing) * 2);
    display: flex;
    flex-direction: column;
    text-align: left;
    z-index: 1001;    
`;
  
const SocialLink = styled(m.a)`
  font-family: var(--body-font);
  font-size: var(--body-text);
  font-weight: var(--body-weight);
  letter-spacing: 0.5px;
  color: var(--offwhite);
  text-decoration: none;
  margin-bottom: calc(var(--default-spacing) * 2);
  transition: color 0.2s ease-in-out;
  display: flex;
  align-items: center;
  &:hover {
    color: var(--interact-hover-color);
  }
  & svg {
    margin-right: 1rem;
    margin-bottom: 0.1rem;
    width: 1.5rem;
  }
  @media (max-width: 1024px) {
    margin-bottom: var(--default-spacing);
  }
`;

const Socials = ({inView, socialData}) => {

    const socialVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: ( {index} ) => ({      
          opacity: 1,
          x: 0,
          transition: {      
            delay: 0.5 + (0.2 * index),  
            duration: 2,
            type: 'spring',
            stiffness: 40,
          },
        }),
    }

    return (
        <Container as={m.div}>
        {socialData?.attributes.links.map((link, index) => (
        <SocialLink 
            key={link.id}
            href={link.url} target="_blank"
            variants={socialVariants}
            initial={'hidden'}
            animate={inView ? 'visible' : 'hidden'} 
            custom={{ index }}          
        >
            {Icons["Arrow Right"]} {link.name}
        </SocialLink>          
        ))}
        </Container>
    )
}

export default Socials