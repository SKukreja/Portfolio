import React, { useEffect, useState } from 'react';
import use from '../../hooks/use';
import styled from 'styled-components';
import { Icons } from '../Common/Icons';
import { m } from 'framer-motion';
import ProfileImage from './ProfileImage';
import { useInView } from 'react-intersection-observer';

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  width: calc(100vw - 80px);
  height: calc(var(--vh) * 100);
  position: relative;
  background: var(--offwhite);
  color: var(--black);
  @media (max-width: 1024px) {
    padding-left: var(--default-spacing);
    padding-right: var(--default-spacing);
    margin-top: 60%;
    width: calc(100% - var(--default-spacing) * 2);
    height: auto;
    padding-bottom: calc(var(--default-spacing) * 2);
    flex-direction: column;
  }
  @media (max-width: 768px) {
    margin-top: 70%;
  }
`;

const Bio = styled.div`
  display: flex;
  flex-direction: column;
  transition: filter 2s ease-in-out;
  filter: grayscale(1);
  text-align: center;
  padding-top: 8rem;
  height: 100%;
  align-items: center;
  z-index: 3;
  &.active {
    filter: grayscale(0);
  }
  @media (max-width: 1024px) {
    padding-top: 0;
    margin-top: var(--default-spacing);
    text-align: left;
    align-items: flex-start;
  }
`;

const Intro = styled(m.h1)`  
  font-family: var(--display-font);
  font-size: var(--title-text);
  color: var(--black);
  white-space: nowrap;
  letter-spacing: 4px;  
  z-index: 4;
  margin-top: 0;
  height: auto;  
  @media (max-width: 1024px) {    
    margin-left: auto;
    margin-right: auto;    
  }
`;

const ColumnHeader = styled(m.h2)`
  font-family: var(--body-font);
  font-size: calc(var(--body-text) * 2); 
  margin-bottom: 0;
  position: relative;
  padding-bottom: var(--default-spacing);
  &::before {
    content: "";
    position: absolute;
    opacity: 1;
    height: 250%;
    width: 100%;
    left: -30%;
    top: -10%;
    opacity: 0.3;
    background: -webkit-radial-gradient(var(--offwhite) 0%,transparent 69%), -webkit-radial-gradient(var(--offwhite) 0%,transparent 56%), -webkit-radial-gradient(var(--offwhite) 0%,transparent 66%), -webkit-radial-gradient(var(--offwhite) 0%,transparent 63%);
    background: radial-gradient(var(--offwhite) 0%,transparent 69%),radial-gradient(var(--offwhite) 0%,transparent 56%), radial-gradient(var(--offwhite) 0%,transparent 66%), radial-gradient(var(--offwhite) 0%,transparent 63%);
    z-index: -1;
    @media (max-width: 1024px) {
      display: none;
    }
  }
  @media (max-width: 1024px) {
    &::before {
      opacity: 0.1;
    }
  }
`;

const AboutContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const Blurb = styled(m.div)`
  font-family: var(--body-font);
  letter-spacing: 0.5px;    
  font-size: var(--body-text);  
  width: 100%;
  text-align: justify;
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
    @media (max-width: 1024px) {
      display: none;
    }
  }
  @media (max-width: 1024px) {
    &::before {
      opacity: 0.5;
    }
  }
`;

const ProfileSection = styled.div`
  display: flex;
  flex-direction: column; 
  padding-left: 5vw;
  padding-right: 5vw;
  width: 50%;
  height: calc(var(--vh) * 100);
  flex-wrap: nowrap;
  position: relative;
  @media (max-width: 1024px) {
    padding-top: 0;
    margin-top: 0;
    width: 100%;
    height: auto;
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
@media (max-width: 1024px) {
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

const Background = styled(m.div)`
-webkit-mask-image: linear-gradient(to right, transparent 0%, black 30%, transparent 100%);
mask-image: linear-gradient(to right, transparent 0%, black 40%, transparent 100%);
height: 100%;
width: 100%;
background-size: cover;
background-position: -15% center;
position: absolute;
inset: 0;
filter: saturate(0.5) brightness(0.8) contrast(1.2) grayscale(0.5);
will-change: opacity, filter;
opacity: 0.35;
mix-blend-mode: darken;
z-index: 1;
@media (max-width: 1024px) {
  -webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 30%, transparent 100%);
  mask-image: linear-gradient(to bottom, transparent 0%, black 40%, transparent 100%);
  background-position: -90% 0%;
  display: none;
}
`;

const TwoColumn = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 7.5vh;
  width: 50%;
  padding-left: 5vw;
  padding-right: 5vw;
  z-index: 3;
  @media (max-width: 1024px) {
    width: 100%;
    flex-direction: column;
    gap: 0;
    margin-top: var(--default-spacing);
    padding-left: 0;
    padding-right: 0;
  }
`;

const Column = styled.div`
  width: 100%;
  text-align: left;
  position: relative;
  font-family: var(--body-font);
  font-size: var(--body-text);
  padding-bottom: var(--default-spacing);
  &::before {
    content: "";
    position: absolute;
    opacity: 1;
    height: 250%;
    width: 100%;
    left: -30%;
    top: -10%;
    opacity: 0.3;
    background: -webkit-radial-gradient(var(--offwhite) 0%,transparent 69%), -webkit-radial-gradient(var(--offwhite) 0%,transparent 56%), -webkit-radial-gradient(var(--offwhite) 0%,transparent 66%), -webkit-radial-gradient(var(--offwhite) 0%,transparent 63%);
    background: radial-gradient(var(--offwhite) 0%,transparent 69%),radial-gradient(var(--offwhite) 0%,transparent 56%), radial-gradient(var(--offwhite) 0%,transparent 66%), radial-gradient(var(--offwhite) 0%,transparent 63%);
    z-index: -1;
    @media (max-width: 1024px) {
      display: none;
    }
  }
  @media (max-width: 1024px) {
    width: 100%;
  }
`;

const Time = styled.span`
  width: 30%;
  vertical-align: top;
  text-align: right;
  font-family: var(--body-font);  
  font-weight: var(--body-weight);
`;

const TableColumn = styled.div`
  width: 70%;
  vertical-align: top; 
  position: relative;
  display: flex;
  flex-direction: column;
  &::before {
    content: "";
    position: absolute;
    opacity: 1;
    height: 250%;
    width: 100%;
    left: -10%;
    top: -10%;
    opacity: 0.3;
    background: -webkit-radial-gradient(var(--offwhite) 0%,transparent 69%), -webkit-radial-gradient(var(--offwhite) 0%,transparent 56%), -webkit-radial-gradient(var(--offwhite) 0%,transparent 66%), -webkit-radial-gradient(var(--offwhite) 0%,transparent 63%);
    background: radial-gradient(var(--offwhite) 0%,transparent 69%),radial-gradient(var(--offwhite) 0%,transparent 56%), radial-gradient(var(--offwhite) 0%,transparent 66%), radial-gradient(var(--offwhite) 0%,transparent 63%);
    z-index: -1;
    @media (max-width: 1024px) {
      display: none;
    }
  }
`;

const Primary = styled.span`
  font-weight: bold;  
`;

const Secondary = styled.span`
  font-weight: var(--body-weight); 
`;

const Table = styled.div`
  width: 100%;
`;

const TableRow = styled(m.div)`
  position: relative;
  display: flex;
  padding-top: var(--default-spacing);
  padding-bottom: 0;
  &::before {
    content: "";
    position: absolute;
    opacity: 1;
    height: 250%;
    width: 70%;
    left: -10%;
    top: -10%;
    opacity: 0.3;
    background: -webkit-radial-gradient(var(--offwhite) 0%,transparent 69%), -webkit-radial-gradient(var(--offwhite) 0%,transparent 56%), -webkit-radial-gradient(var(--offwhite) 0%,transparent 66%), -webkit-radial-gradient(var(--offwhite) 0%,transparent 63%);
    background: radial-gradient(var(--offwhite) 0%,transparent 69%),radial-gradient(var(--offwhite) 0%,transparent 56%), radial-gradient(var(--offwhite) 0%,transparent 66%), radial-gradient(var(--offwhite) 0%,transparent 63%);
    z-index: -1;
    @media (max-width: 1024px) {
      display: none;
    }
  }
`;

const DiamondIcon = styled.div`
  font-size: 3rem;
  font-family: var(--display-font);
  color: var(--black);
  width: 1rem;
  user-select: none;
  pointer-events: none;
  margin-bottom: calc(var(--default-spacing) * 2);
  transform: scale(.75,1);
  margin-left: auto;
  margin-right: auto;
`;

const Border = styled(m.span)`
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;  
  display: none;
  width: 100%;
  border-bottom: 1px solid #793A2B;
  transform-origin: left;
`;

const BigBorder = styled(m.span)`
content: '';
position: absolute;
bottom: 0;
left: 0;
opacity: 0.5;
width: 100%;
border: 1px solid;
border-image-slice: 1;
border-image-source: linear-gradient(to right, #793A2B, var(--offwhite));
transform-origin: left;
`;
 
const DividerRight = styled.div`
  position: absolute;
  border-left: 1px solid #8f5922;
  border-style: collapse;
  height: 100%;
  top: 50%;
  display: none;
  opacity: 0.5;  
  transform: translateY(-50%);
  right: 0;
`;

const DividerLeft = styled.div`
  position: absolute;
  border-left: 1px solid #8f5922;
  border-style: collapse;
  height: 100%;
  top: 50%;
  display: none;
  opacity: 0.5;  
  transform: translateY(-50%);
  left: 0;
`;

const About = () => {
  const [ref, inView] = useInView({ threshold: 0.25, triggerOnce: true});
  const [aboutRef, aboutInView] = useInView({ threshold: 0.25, triggerOnce: true});
  const [bgRef, bgInView] = useInView({ threshold: 0.25});
  const [blurbText, setBlurbText] = useState('');
  const { data, loading, error } = use(
    `/about?populate=deep`
  );

  const blurbVariants = {
    hidden: { opacity: 0, },
    visible: () => ({      
      opacity: 1,
      transition: {    
        delay: 0.5,  
        duration: 3,
        type: 'linear',
      },
    }),
  };

  const lineVariants = {
    hidden: { scaleX: 0, },
    visible: () => ({      
      scaleX: 1,
      transition: {      
        delay: 0.5,  
        duration: 3,
      },
    }),
  };

  const rowVariants = {
    hidden: { opacity: 0, },
    visible: ({delay}) => ({      
      opacity: 1,
      transition: {      
        delay: 0.5 + delay,  
        duration: 2,
        type: 'spring',
        stiffness: 10,
      },
    }),
  };

  const bgVariants = {
    hidden: { opacity: 0, filter: 'saturate(0) brightness(0) contrast(0) grayscale(0)' },
    visible: () => ({      
      opacity: 0.3,
      filter: 'saturate(0.5) brightness(0.9) contrast(1.2) grayscale(0.5)' ,
      transition: {      
        delay: 0.1,  
        duration: 2,        
      },
    }),
  };

  useEffect(() => {
    if(!data) return;
    setBlurbText(data.attributes.blurb);    
  }, [data]);

  const headerVariants = {
    hidden: { opacity: 0 },
    visible: () => ({
      opacity: 1,
      transition: {
        duration: 3,
        type: 'linear',        
      },
    }),
  };
  
  return (
    <Container ref={ref} as={m.div}>
      <Background ref={bgRef} style={{backgroundImage: 'url(bg-min.jpg)'}}
        variants={bgVariants}
        initial="hidden"
        animate={bgInView ? 'visible' : 'hidden'}
      />
      <ProfileSection ref={aboutRef}>
        <DividerLeft />
          <Bio className={`${inView ? 'active' : ''}`}>
            <Intro
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={headerVariants}
            >About Me</Intro>
            <DiamondIcon>{Icons["Diamond"]}</DiamondIcon>
            <Blurb
              variants={blurbVariants}
              initial="hidden"
              animate={aboutInView ? 'visible' : 'hidden'}
              custom={{ delay: 0.2 }}
            >
              {blurbText}
            </Blurb>
          </Bio>
        <DividerRight />
      </ProfileSection>
      <TwoColumn ref={ref}>
        <Column>
          <ColumnHeader                
            variants={rowVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            custom={{delay: 0.2}}              
          >
            Work
            <BigBorder                  
              variants={lineVariants}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}                                    
            />
          </ColumnHeader>
          <Table>
              <TableRow 
                variants={rowVariants}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                custom={{delay: 0.3}}
              >                  
                <TableColumn>
                  <Primary>IT Engineer</Primary>
                  <Secondary>KPMB Architects</Secondary>                    
                </TableColumn>
                <Time>2018 - 2023</Time>
                <Border />
              </TableRow>
              <TableRow
                variants={rowVariants}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                custom={{delay: 0.5}}
              >                  
                <TableColumn>
                  <Primary>Programmer</Primary>
                  <Secondary>KUBRA</Secondary>                    
                </TableColumn>
                <Time>2017 - 2018</Time>
                <Border />
              </TableRow>
              <TableRow
                variants={rowVariants}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                custom={{delay: 0.7}}
              >               
                <TableColumn>
                  <Primary>Jr. IT Technician</Primary>
                  <Secondary>KPMB Architects</Secondary>                    
                </TableColumn>
                <Time>2016 - 2017</Time>
                <Border />
              </TableRow>
              <TableRow
                variants={rowVariants}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                custom={{delay: 0.9}}
              >               
                <TableColumn>
                  <Primary>Computer Technician</Primary>
                  <Secondary>Home Trust Company</Secondary>                    
                </TableColumn>
                <Time>2014 - 2016</Time>
                <Border />
              </TableRow>
              <TableRow
                variants={rowVariants}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                custom={{delay: 1.1}}
              >               
                <TableColumn>
                  <Primary>Financial Model Analyst</Primary>
                  <Secondary>Royal Bank of Canada</Secondary>                    
                </TableColumn>
                <Time>2014 - 2014</Time>
                <Border />
              </TableRow>            
          </Table>
        </Column>
        <Column>
          <ColumnHeader
            variants={rowVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            custom={{delay: 1.3}}    
          >Education
          <BigBorder
            variants={lineVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}   
          /></ColumnHeader>
          <Table>
            <TableRow 
              variants={rowVariants}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              custom={{delay: 1.5}}
            >      
              <TableColumn>
                <Primary>Software Engineering Technology</Primary>
                <Secondary>McMaster University</Secondary>                    
              </TableColumn>
              <Time>2018 - 2023</Time>
              <Border />
            </TableRow>
            <TableRow 
              variants={rowVariants}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              custom={{delay: 1.7}}
            >      
              <TableColumn>
                <Primary>Software Development & Network Engineering</Primary>
                <Secondary>Sheridan College</Secondary>                    
              </TableColumn>
              <Time>2012 - 2015</Time>
              <Border />
            </TableRow>
          </Table>
        </Column>
      </TwoColumn>  
    </Container>
  )
}

export default About