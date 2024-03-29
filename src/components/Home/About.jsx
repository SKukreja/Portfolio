import React, { useState } from 'react';
import use from '../../hooks/use';
import styled, { keyframes } from 'styled-components';
import { InView, useInView } from 'react-intersection-observer';
import { m } from 'framer-motion'
import WashedAwayText from './WashedAwayText';
import AnimatedText from './AnimatedText';

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  width: 100vw;
  height: 100%;
  position: relative;
  background: var(--offwhite);
  color: var(--black);
  @media (max-width: 768px) {
    padding-left: var(--default-spacing);
    padding-right: var(--default-spacing);
    width: calc(100% - var(--default-spacing) * 2);
    padding-bottom: calc(var(--default-spacing) * 2);
    flex-direction: column;
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
  font-family: var(--display-font);
  font-size: var(--title-text);
  color: var(--black);
  white-space: nowrap;
  letter-spacing: 4px;  
  z-index: 4;
  margin-top: 0;
  height: auto;  
  @media (max-width: 768px) {    
    margin-left: auto;
    margin-right: auto;    
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
  padding-left: 5vw;
  padding-right: 5vw;
  width: 50%;
  flex-wrap: nowrap;
  position: relative;
  @media (max-width: 768px) {
    padding-top: 0;
    margin-top: -10rem;
    width: 100%;
    padding-left: 0;
    padding-right: 0;
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
  flex-direction: column;
  margin-top: 7.5vh;
  width: 50%;
  padding-left: 5vw;
  padding-right: 5vw;
  z-index: 3;
  @media (max-width: 768px) {
    width: 100%;
    flex-direction: column;
    gap: 0;
    padding-left: 0;
    padding-right: 0;
  }
`;

const Column = styled.div`
  width: 100%;
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
  font-family: var(--body-font);  
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
  & tr {
    border-bottom: 2px solid var(--black);    
  }
`;

const Diamond = styled.div`
  font-size: 3rem;
  margin-bottom: calc(var(--default-spacing) * 2);
  @media (max-width: 768px) {
    width: 100%;
    display: flex;
    justify-content: center;
    font-size: 2rem;
  }
`;

const About = () => {
  const { data, loading, error } = use(
    `/about?populate=deep`
  );
  
  return (
    <Container as={ m.div}>
      <ProfileSection>
        <InView>
        {({ inView, ref, entry }) => (
          <Bio ref={ref} className={`${inView ? 'active' : ''}`}>
            <Intro>{"About Me"}</Intro>
            <Diamond>♦</Diamond>      
            <Blurb>
             {data?.attributes.blurb + ""}
            </Blurb>
          </Bio>
        )}
        </InView>   
      </ProfileSection>
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
    </Container>
  )
}

export default About