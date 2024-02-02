import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import use from '../../hooks/use';
import styled, { keyframes } from 'styled-components';
import { InView, useInView } from 'react-intersection-observer';
import ReactWordcloud from 'react-wordcloud';
import { motion } from 'framer-motion'
import Footer from '../../components/Common/Footer';
import ProfileImage from './ProfileImage';

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
  width: 50vw;
  padding-left: 10vw;
  padding-right: 10vw;
  position: relative;
  background: var(--offwhite);
  color: var(--black);
  @media (max-width: 768px) {
    width: calc(100% - 20vw);
  }
`;

const Bio = styled.div`
  display: flex;
  flex-direction: column;
  transition: filter 2s ease-in-out;
  filter: grayscale(1);
  text-align: center;
  padding-top: 8rem;
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
  font-weight: var(--body-weight);    
  @media (max-width: 768px) {
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
    width: 150%;
    left: -40%;
    right: -10%;
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
  padding-top: 7.5rem;
`;

const Tree = styled(motion.img)`
  position: absolute;
  top: -90%;
  left: 200%;
  width: auto;
  height: 200%;
  z-index: 4;
`;

const TreeContainer = styled(motion.div)`
pointer-events: none;
`;

const TreeMask = styled(motion.img)`
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

const Background = styled(motion.img)`
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
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Column = styled.div`
  width: 50%;
  text-align: left;
  font-family: var(--body-font);
  font-size: var(--body-text);
  @media (max-width: 768px) {
    width: 100%;
  }
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

const About = ({treeScroll = 0, headerScroll = 0, bgScroll = 0}) => {
  const { data, loading, error } = use(
    `/about?populate=deep`
  );
  
  return (
    <Container as={motion.div}>
      <TreeContainer>
        <Background style={bgScroll} src='bg.png' />
        <Tree style={treeScroll} src='tree.png' />
      </TreeContainer>
      <ProfileSection>
        <InView>
        {({ inView, ref, entry }) => (
          <Bio style={headerScroll} ref={ref} className={`${inView ? 'active' : ''}`}>
            <Intro>About Me</Intro>           
            <Blurb>
              <ReactMarkdown linkTarget="_blank" escapeHtml={false}>{data?.attributes.blurb}</ReactMarkdown>           
            </Blurb>
            <TwoColumn>
              <Column>
                <ColumnHeader>Work</ColumnHeader>
                <Table>
                  <tbody>
                    <tr>                  
                      <TableColumn>
                        <Primary>IT Engineer</Primary>
                        <Secondary>KPMB Architects</Secondary>                    
                      </TableColumn>
                      <Time>2018 - 2023</Time>
                    </tr>
                    <tr>                  
                      <TableColumn>
                        <Primary>Programmer</Primary>
                        <Secondary>KUBRA</Secondary>                    
                      </TableColumn>
                      <Time>2017 - 2018</Time>
                    </tr>
                    <tr>
                      <TableColumn>
                        <Primary>Jr. IT Support Technician</Primary>
                        <Secondary>KPMB Architects</Secondary>                    
                      </TableColumn>
                      <Time>2016 - 2017</Time>
                    </tr>
                  </tbody>
                </Table>
              </Column>
              <Column>
                <ColumnHeader>Education</ColumnHeader>
                <Table>
                  <tbody>
                    <tr>
                      <TableColumn>
                        <Primary>Software Enginering Technology</Primary>
                        <Secondary>McMaster University</Secondary>                    
                      </TableColumn>
                      <Time>2018 - 2023</Time>
                    </tr>
                    <tr>
                      <TableColumn>
                        <Primary>Software Development & Network Engineering</Primary>
                        <Secondary>Sheridan College</Secondary>                    
                      </TableColumn>
                      <Time>2012 - 2015</Time>
                    </tr>
                  </tbody>
                </Table>
              </Column>
            </TwoColumn>     
          </Bio>
        )}
        </InView>
      </ProfileSection>
    </Container>
  )
}

export default About