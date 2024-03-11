import React, { useRef } from 'react'
import { cubicBezier,m, useScroll, useTransform } from 'framer-motion'
import styled, { keyframes } from 'styled-components'
import use from '../../hooks/use';
import { Icons } from '../Common/Icons';

const Container = styled(m.div)`
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
  display: flex;
  align-items: center;
  &:hover {
    color: var(--primary);
  }
  & svg {
    margin-right: 1rem;
    margin-bottom: 0.1rem;
    width: 1.5rem;
  }  
`;

const Socials = ({treeScroll = 0, headerScroll = 0, bgScroll = 0}) => {
    const { data, loading, error } = use(
        `/social?populate=deep`
    );

    return (
        <Container as={ m.div}>
        {data?.attributes.links.map((link, index) => (
        <SocialLink 
            key={link.id}
            href={link.url} target="_blank"
        >
            {Icons["Arrow Right"]} {link.name}
        </SocialLink>          
        ))}
        </Container>
    )
}

export default Socials