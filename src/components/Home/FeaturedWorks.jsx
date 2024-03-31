import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';
import { m, useAnimation } from 'framer-motion';
import ProjectImage from './ProjectImage';
import { InView, useInView } from 'react-intersection-observer';
import use from '../../hooks/use';
import { Icons } from '../Common/Icons';
import AnimatedText from './AnimatedText';

const Featured = styled(m.div)`
  height: calc(var(--vh, 1vh) * 100);
  display: flex;
  justify-content: space-evenly;
  position: relative;
  align-items: center;
  overflow: visible;
  @media (max-width: 1024px) {
    width: 100vw;
    height: auto;
    margin-top: calc(var(--default-spacing) * 4);
    justify-content: flex-start;
    margin-left: 0;
  }
  @media (max-width: 768px) {
    margin-top: calc(var(--default-spacing) * 2);
  }
`;

const Header = styled(m.h1)`
  font-family: var(--display-font);
  font-size: var(--title-text);
  color: var(--black);
  display: flex;
  align-items: center;
  white-space: nowrap;
  letter-spacing: 4px;
  position: absolute;  
  z-index: 4;
  height: auto;
  top: 7.5rem;
  margin: 0;
  left: -1rem;  
  text-align: center;
  @media (max-width: 1024px) {    
    top: 0;
    left: 50%;
    transform: translateX(-53%);
  }
  &::before {
    content: "";
    position: absolute;
    opacity: 1;
    height: 100%;
    width: 150%;
    left: -25%;
    right: -10%;
    background: -webkit-radial-gradient(var(--offwhite) 0%,transparent 69%), -webkit-radial-gradient(var(--offwhite) 0%,transparent 65%), -webkit-radial-gradient(var(--offwhite) 0%,transparent 60%), -webkit-radial-gradient(var(--offwhite) 0%,transparent 50%);
    background: radial-gradient(var(--offwhite) 0%,transparent 69%),radial-gradient(var(--offwhite) 0%,transparent 65%), radial-gradient(var(--offwhite) 0%,transparent 60%), radial-gradient(var(--offwhite) 0%,transparent 50%);
    z-index: -1;
  }
`;

const ProjectName = styled(Link)`
  font-family: var(--body-font);  
  font-size: calc(var(--body-text));
  color: var(--black);  
  text-decoration: none;
  z-index: 2;  
  text-transform: uppercase;
  font-weight: 900;
  letter-spacing: 2px;
  margin: 2rem 0;
  &::before {
    content: "";
    position: absolute;
    opacity: 0.9;
    height: 110%;
    width: 50%;
    top: 20%;
    pointer-events: none;
    left: -20%;
    right: -10%;    
    background: -webkit-radial-gradient(var(--offwhite) 0%,transparent 69%), -webkit-radial-gradient(var(--offwhite) 0%,transparent 66%), -webkit-radial-gradient(var(--offwhite) 0%,transparent 66%), -webkit-radial-gradient(var(--offwhite) 0%,transparent 63%);
    background: radial-gradient(var(--offwhite) 0%,transparent 69%),radial-gradient(var(--offwhite) 0%,transparent 56%), radial-gradient(var(--offwhite) 0%,transparent 46%), radial-gradient(var(--offwhite) 0%,transparent 33%);
    z-index: -1;
  }
  & > svg {
    font-size: 3vw;
    margin-bottom: -0.75rem;
  }
  &:hover {
    color: var(--interact-hover-color);
  }
  @media (max-width: 1024px) {
    font-size: 4vw;
    &::before {      
      height: 130%;
      width: 190%;
      top: -20%;      
      left: -100%;
      right: -10%;
    }
    & > svg {
      font-size: 6vw;
      margin-bottom: -1.5vw;
    }
  }
`;

const Projects = styled(m.div)`
  display: flex;
  height: 100%;
  overflow: visible;
  @media (max-width: 1024px) {
    margin-top: 85vw;
    flex-direction: column;
    
  }
`;

const ProjectContent = styled.div`
  display: flex;
  width: 100%;
  height: fit-content;
  flex-direction: column;
  z-index: 2;
  position: absolute;
  
  &.odd {
    bottom: 35%;
    &::before {
      bottom: 5%;
    }
  }
  &.even {
    top: 50%;
    &::before {
      top: -20%;
    }
  }
  &::before {
    content: "";
    position: absolute;
    opacity: 1;
    height: 120%;
    width: 140%;
    left: -50%;
    opacity: 0.9;
    background: -webkit-radial-gradient(var(--offwhite) 0%,transparent 69%), -webkit-radial-gradient(var(--offwhite) 0%,transparent 66%), -webkit-radial-gradient(var(--offwhite) 0%,transparent 66%), -webkit-radial-gradient(var(--offwhite) 0%,transparent 63%);
    background: radial-gradient(var(--offwhite) 0%,transparent 69%),radial-gradient(var(--offwhite) 0%,transparent 66%), radial-gradient(var(--offwhite) 0%,transparent 66%), radial-gradient(var(--offwhite) 0%,transparent 63%);
    z-index: -1;
  }
  @media (max-width: 1024px) {
    width: calc(100% - 2 * var(--default-spacing));
    margin: 0;
    padding: var(--default-spacing);
    &::before {      
      height: 100%;
      width: 150%;
      left: -40%;    
    }
    &.odd, &.even {
      top: 0%;
      bottom: 0%;
      &::before {        
        top: 10%;
        bottom: 0%;
      }
    }
  }
`;


const Project = styled.div`
    display: flex;
    position: relative;
    margin-left: 5vw;
    margin-right: 5vw;
    flex-direction: column;
    width: 30vw;
    height: 100%;
    align-items: center;
    justify-content: space-between;
    &.odd, &.odd .project-image {
      margin-top: 3rem;
    }
    &.even, &.even .project-image {
      margin-top: -17rem;
    }
    @media (max-width: 1024px) {
      width: 100vw;
      margin-left: 0;
      flex-direction: column;
      &.odd, &.odd .project-image, &.even, &.even .project-image {
        margin-top: calc(var(--default-spacing) * 2);
        margin-bottom: calc(var(--default-spacing));       
        flex-direction: column-reverse;
      }
    }
`;

const ProjectSummary = styled(m.div)`
  font-family: var(--body-font);
  letter-spacing: 0.5px;  
  position: relative;  
  letter-spacing: 1px;
  text-align: justify;
  font-size: var(--body-text);
  font-weight: var(--body-weight);
  z-index: 2;
`;

const ProjectNumber = styled.h1`
  font-family: var(--body-font);
  font-weight: 200;
  line-height: 0.8;
  padding-right: 1rem;
  text-shadow: 0 0 2px var(--black);
  display: none;
  margin: 0;
  @media (max-width: 1920px) {
    font-size: 6rem;
  }
  @media (max-width: 1600px) {
    font-size: 6rem;
  }
  @media (max-width: 1024px) {
    font-size: 4rem;
  }
`;

const ProjectActions = styled.div`
  margin: 2rem -0.5rem;
`;

const ProjectLink = styled(m(Link))`      
  z-index: 2;  
  letter-spacing: 1px;
  color: var(--black);    
  font-family: var(--body-font);
  font-size: var(--body-text);  
  font-weight: bold;
  text-decoration: none;
  width: fit-content;
  position: relative;  
  margin-top: var(--default-spacing);
  display: flex;
  cursor: pointer;
  align-items: center;
  transition: all 0.5s ease;
  transition-delay: 0.1s;
  &:hover {
    color: var(--interact-hover-color);
    text-decoration: none;
    transform: scale(1.03);
  }
  @media (max-width: 1024px) {

  }
`;

const ProjectHeader = styled.div`
  display: flex;
  align-items: center;
`;

const Spacer = styled.div`

`;

const padNum = (num, targetLength) => {
  return num.toString().padStart(targetLength, "0");
}

const ProjectInfo = ({ className, number, project, isInView }) => {
  const controls = useAnimation();
  const projectRef = useRef(null);

  const textVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1.5, delay: 0.5, ease: "easeInOut" } },
  };

  const linkVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1.5, delay: 1, ease: "easeInOut" } },
  };

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
    else {
      controls.start('hidden');
    }
  }, [controls, isInView]);

  return (
    <ProjectContent ref={projectRef} className={className}>
      <ProjectHeader>
        <ProjectNumber>{padNum(number + 1, 2)}</ProjectNumber>
        <ProjectName to={"/project/" + project.attributes.slug}><AnimatedText isLink={true} startImmediately={false} text={project.attributes.title} /></ProjectName>
      </ProjectHeader>
      <ProjectSummary initial="hidden" animate={controls} variants={textVariants}>{project.attributes.summary}</ProjectSummary>      
      <ProjectLink initial="hidden" animate={controls} variants={linkVariants} to={"/project/" + project.attributes.slug}>Read More</ProjectLink>
    </ProjectContent>
  );
}

const ProjectItem = ({ isMobile, project, number}) => {
  const ref = useRef(null);
  
  const [viewRef, inView] = useInView({
    threshold: 0.25,
    triggerOnce: true
  });

  const [isFirefox, setIsFirefox] = useState(false);

  const isFirefoxAndroid = navigator.userAgent.includes('Firefox');

  useEffect(() => {    
    setIsFirefox(isFirefoxAndroid);
  }, []);
  return (
    <Project ref={viewRef} className={`${inView ? 'active' : ''} ${number % 2 === 0 ? 'odd' : 'even'}`}>
      {number % 2 == 0 ? (
        <>
          <Spacer />
          <ProjectInfo isInView={inView} className="odd" number={number} project={project} />
        </>
      ) : (
        ''
      )}
      <svg>
        <defs>
          <filter id={"mask-circle-project-image-" + number}>
            <feTurbulence className="filter" type="fractalNoise" baseFrequency="0.01" numOctaves={3 + Math.sin(90 * number)} result="noise" />
            <feDisplacementMap className="filter" in="SourceGraphic" in2="noise" scale={75 + 10 * Math.sin(90 * number)} xChannelSelector="R" yChannelSelector="G" />
            <feGaussianBlur className="filter" stdDeviation={ isFirefox ? 2 : 7 } />
          </filter>
        </defs>
      </svg>
      <ProjectImage isInView={inView} isMobile={isMobile} number={number} even={number % 2 != 0} imageUrl={import.meta.env.VITE_APP_UPLOAD_URL + project.attributes.featured.data.attributes.url} />  
      {number % 2 != 0 ? (
        <>
          <ProjectInfo isInView={inView} className="even" number={number} project={project} />
          <Spacer />
        </>
      ) : (
        ''
      )}
    </Project>
  );
};

const FeaturedWorks = ({ isMobile }) => {
  const { data, loading, error } = use(
    `/home?populate=deep`
  );

  const headerVariants = {
    hidden: { color: "var(--interact-hover-color)", opacity: 0 },
    visible: () => ({
      color: "var(--black)",
      opacity: 1,
      transition: {
        duration: 3,
        type: 'linear',        
      },
    }),
  };
  
  return (
    <InView triggerOnce>
      {({ inView, ref, entry }) => (
        <Featured ref={ref}>
          <Header
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={headerVariants}
          >Featured Work</Header>

          <Projects>
          {/* Loop through featured projects */}
          {data?.attributes.featured.works.data.map((project, number) => (
            <ProjectItem key={project.id} isMobile={isMobile} project={project} number={number} />
          ))}
          </Projects>
        </Featured>
      )}
    </InView>
  )
}

export default FeaturedWorks