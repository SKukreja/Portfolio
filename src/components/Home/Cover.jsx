import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import use from '../../hooks/use';
import styled, { keyframes } from 'styled-components';
import { InView, useInView } from 'react-intersection-observer';
import ReactWordcloud from 'react-wordcloud';
import { motion } from 'framer-motion'
import Footer from '../Common/Footer';
import ProfileImage from './ProfileImage';
import Socials from './Socials';
import WashedAwayText from './WashedAwayText';

const typewriter = keyframes`
  from { width: 0 }
  to { width: 100% }
`; 

const blink = keyframes`
  from, to { border-color: white; }
  50% { border-color: white; }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 30vw;
  margin-left: 35vw;
  padding-left: 5vw;
  padding-right: 5vw;
  padding-top: var(--default-spacing);
  z-index: 6;
  position: relative;
  background: var(--black);
  color: var(--offwhite);
  @media (max-width: 768px) {
    width: 100%;
    height: calc(100vh - var(--default-spacing));
    margin-left: 0;
    padding: 0;padding-top: var(--default-spacing);
  }
`;

const Bio = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  max-width: 50vw;
  align-items: center;  
`;

const Blurb = styled.div`
  font-family: var(--body-font);
  letter-spacing: 0.5px;    
  font-size: var(--body-text);
  width: 100%;
  overflow: visible;
  font-weight: var(--body-weight);    
  @media (max-width: 768px) {
    font-size: 1rem;
    width: 85%;
  }
  & > p {
    margin: 0;
  }
`;

const ProfileSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;    
  flex-wrap: nowrap;
  position: relative;
`;

const Cover = ({treeScroll = 0, headerScroll = 0, bgScroll = 0}) => {
  const { data, loading, error } = use(
    `/about?populate=deep`
  );

  return (
    <Container as={motion.div}>
      <ProfileSection>
        <ProfileImage imageUrl={import.meta.env.VITE_APP_UPLOAD_URL + data?.attributes.picture.data.attributes.url} />
        <InView>
        {({ inView, ref, entry }) => (
          <Bio ref={ref} className={`${inView ? 'active' : ''}`}>            
            <Blurb>
              Please feel free to contact me by e-mail or find me on one of the platforms below.
            </Blurb>
            <Socials />
          </Bio>
        )}
        </InView>
      </ProfileSection>
    </Container>
  )
}

export default Cover