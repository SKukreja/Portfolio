import React, { useRef } from 'react'
import { cubicBezier, motion, useScroll, useTransform } from 'framer-motion'
import styled, { keyframes } from 'styled-components'
import use from '../../hooks/use';

const Container = styled(motion.div)`
    margin-top: 4rem;
    display: flex;
    flex-direction: column;
    text-align: left;
`;
  
const SocialLink = styled.a`
  font-family: var(--body-font);
  font-size: var(--body-text);
  font-weight: var(--body-weight);
  letter-spacing: 0.5px;
  color: var(--offwhite);
  text-decoration: none;
  margin-bottom: 2rem;
  transition: color 0.2s ease-in-out;
  &:hover {
    color: var(--primary);
  }
`;

const Socials = ({treeScroll = 0, headerScroll = 0, bgScroll = 0}) => {
    const { data, loading, error } = use(
        `/social?populate=deep`
    );

    return (
        <Container as={motion.div}>
        {data?.attributes.links.map((link, index) => (
        <SocialLink 
            key={link.id}
            href={link.url} target="_blank"
        >
            -> {link.name}
        </SocialLink>          
        ))}
        </Container>
    )
}

export default Socials