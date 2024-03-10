import React, { useState } from 'react';
import use from '../../hooks/use';
import styled from 'styled-components';
import { InView, useInView } from 'react-intersection-observer';
import { m } from 'framer-motion';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 50vw;
  margin-left: 35vw;
  padding-left: 10vw;
  padding-right: 10vw;
  position: relative;
  background: var(--offwhite);
  color: var(--black);
`;

const Bio = styled.div`
  display: flex;
  flex-direction: column;
  transition: filter 2s ease-in-out;
  filter: grayscale(1);
  text-align: center;
  padding-top: 50%;
  position: absolute;
  max-width: 50vw;
  align-items: center;
  z-index: 3;
  &.active {
    filter: grayscale(0);
  }
`;

const Intro = styled.h1`  
  font-family: var(--body-font);
  font-size: 6rem;  
  display: flex;
  align-items: center;
  white-space: nowrap;
  position: absolute;  
  z-index: 3;
  height: auto;
  top: 0;
  margin: 0;  
  width: 100%;
  padding-bottom: 2rem;
  text-align: left;
  @media (max-width: 768px) {    
    
  }
`;

const ColumnHeader = styled.h2`
  font-family: var(--body-font);
  font-size: 2rem; 
  margin-bottom: 2rem;   
`;

const AboutContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const Blurb = styled.div`
  font-family: var(--body-font);
  letter-spacing: 0.5px;    
  font-size: var(--body-text);
  width: 100%;
  text-align: left;
  bottom: 7.5rem;
  z-index: 2;
  overflow: visible;
  font-weight: var(--body-weight);    
  @media (max-width: 768px) {
    font-size: 1rem;
    width: 85%;
  }
  & > p {
    margin: 0;
  }
  &::before {
    content: "";
    position: absolute;
    opacity: 1;
    height: 100%;
    width: 200%;
    right: -50%;
    left: -70%;
    background: -webkit-radial-gradient(var(--offwhite) 0%,transparent 70%), -webkit-radial-gradient(var(--offwhite) 0%,transparent 60%), -webkit-radial-gradient(var(--offwhite) 0%,transparent 50%), -webkit-radial-gradient(var(--offwhite) 0%,transparent 40%);
    background: radial-gradient(var(--offwhite) 0%,transparent 70%),radial-gradient(var(--offwhite) 0%,transparent 60%), radial-gradient(var(--offwhite) 0%,transparent 50%), radial-gradient(var(--offwhite) 0%,transparent 40%);
    z-index: -1;
  }
`;

const ProfileSection = styled.div`
  display: flex;
  flex-direction: column;  
  width: 100%;
  flex-wrap: nowrap;
  position: relative;
`;

const Tree = styled(m.img)`
  position: absolute;
  top: -90%;
  left: 200%;
  width: auto;
  height: 200%;
  z-index: 4;
`;

const TreeContainer = styled(m.div)`
pointer-events: none;
`;

const TreeMask = styled(m.img)`
position: absolute;
top: -40%;
left: 0;
filter: blur(4px);
width: auto;
height: 150%;
z-index: 2;
-webkit-mask-image: linear-gradient(to left, black 70%, transparent 100%);
mask-image: linear-gradient(to left, black 70%, transparent 100%);
`;

const Background = styled(m.img)`
-webkit-mask-image: linear-gradient(to right, transparent 0%, black 70%, transparent 100%);
mask-image: linear-gradient(to right, transparent 0%, black 70%, transparent 100%);
height: 150%;
width: auto;
top: -40%;
filter: blur(4px);
position: absolute;
z-index: 1;
`;

const TwoColumn = styled.div`
  display: flex;
  gap: 6rem;
  margin-top: 5vh;
  width: 100%;
  z-index: 3;
`;

const Column = styled.div`
  width: 50%;
  text-align: left;
  font-family: var(--body-font);
  font-size: var(--body-text);    
`;

const Time = styled.td`
  width: 30%;
  vertical-align: top;
  text-align: right;
  font-weight: var(--body-weight); 
`;

const TableColumn = styled.td`
  width: 70%;
  vertical-align: top;
  padding-bottom: 2rem;
`;

const Primary = styled.div`
  font-weight: bold;  
`;

const Secondary = styled.div`
  font-weight: var(--body-weight); 
`;

const Table = styled.table`
  width: 100%;
`;

const Experience = ({treeScroll = 0, headerScroll = 0, bgScroll = 0}) => {
  const { data, loading, error } = use(
    `/about?populate=deep`
  );
  
  return (
    <Container as={ m.div}>
      <ProfileSection>
        <InView>
        {({ inView, ref, entry }) => (
          <Bio ref={ref} className={`${inView ? 'active' : ''}`}>    
            <Blurb>
              {data?.attributes.blurb}
            </Blurb>  
          </Bio>
        )}
        </InView>
      </ProfileSection>
    </Container>
  )
}

export default Experience