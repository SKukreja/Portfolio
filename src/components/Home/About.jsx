import React, { useState } from 'react';
import use from '../../hooks/use';
import styled, { keyframes } from 'styled-components';
import { InView, useInView } from 'react-intersection-observer';
import { m } from 'framer-motion'
import WashedAwayText from './WashedAwayText';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 50vw;
  padding-right: 10vw;  
  position: relative;
  background: var(--offwhite);
  color: var(--black);
  @media (max-width: 768px) {
    padding-left: var(--default-spacing);
    padding-right: var(--default-spacing);
    width: calc(100% - var(--default-spacing) * 2);
    padding-bottom: calc(var(--default-spacing) * 2);
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
  @media (max-width: 768px) {
    padding-top: 0;
    margin-top: var(--default-spacing);
    text-align: left;
    align-items: flex-start;
  }
`;

const Intro = styled.h1`  
  font-family: var(--body-font);
  font-size: var(--title-text);  
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
    position: relative;
  }
`;

const ColumnHeader = styled.h2`
  font-family: var(--body-font);
  font-size: calc(var(--body-text) * 2); 
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
  @media (max-width: 768px) {
    padding-top: 0;
    margin-top: -10rem;
  }
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
@media (max-width: 768px) {
  display: none;
}
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
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0;
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

const About = () => {
  const { data, loading, error } = use(
    `/about?populate=deep`
  );
  
  return (
    <Container as={ m.div}>
      <TreeContainer>
        <Background src='bg.png' />
        <Tree src='tree.png' />
      </TreeContainer>
      <ProfileSection>
        <InView>
        {({ inView, ref, entry }) => (
          <Bio ref={ref} className={`${inView ? 'active' : ''}`}>
            <Intro><WashedAwayText text={"About Me"} /></Intro>           
            <Blurb>
              <WashedAwayText text={data?.attributes.blurb + ""} />
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
                        <Primary>Software Engineering Technology</Primary>
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