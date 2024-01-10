import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ProjectImage from './ProjectImage';
import { InView, useInView } from 'react-intersection-observer';
import use from '../../hooks/use';
import { Icons } from '../Common/Icons';

const Featured = styled(motion.div)`
  width: 100vw;
  display: flex;
  position: relative;
  align-items: center;
  overflow: visible;
`;

const ProjectName = styled(Link)`
  text-transform: lowercase;
  font-family: 'adobe-garamond-pro', sans-serif;
  font-weight: 600;
  font-size: 6vw;
  color: var(--black);  
  text-decoration: none;
  z-index: 2;
  letter-spacing: 1px;
  margin: 2rem 0;
  & > svg {
    font-size: 3vw;
    margin-bottom: -0.75rem;
  }
  &:hover {
    color: white;
  }
  @media (max-width: 2560px) {
    font-size: 1.5rem;
    & > svg {
      font-size: 2.3rem;
      margin-bottom: -0.6rem;
    }
  }
  @media (max-width: 768px) {
    font-size: 4vw;
    & > svg {
      font-size: 6vw;
      margin-bottom: -1.5vw;
    }
  }
`;

const Projects = styled(motion.div)`
  display: flex;
  margin-top: 10rem;
  height: calc(100% - 10rem);
  overflow: visible;
`;

const ProjectContent = styled.div`
  display: flex;
  width: 75%;
  height: fit-content;
  flex-direction: column;
  z-index: 2;
  position: absolute;
  &.odd {
   top: 0;
  }
  &.even {
   bottom: 0;
  }
  &::before {
    content: "";
    position: absolute;
    top: 0;
    opacity: 1;
    height: 100%;
    width: 100%;
    left: 0;  
    background: -webkit-radial-gradient(var(--offwhite) 0%,transparent 70%),-webkit-radial-gradient(var(--offwhite) 0%,transparent 70%),-webkit-radial-gradient(var(--offwhite) 0%,transparent 70%),-webkit-radial-gradient(var(--offwhite) 0%,transparent 70%);
    background: radial-gradient(var(--offwhite) 0%,transparent 70%),radial-gradient(var(--offwhite) 0%,transparent 70%),radial-gradient(var(--offwhite) 0%,transparent 70%),radial-gradient(var(--offwhite) 0%,transparent 70%);
    z-index: -1;
  }
  @media (max-width: 1920px) {
    width: 40%;
  }
  @media (max-width: 1440px) {
    width: 50%;
    &.odd .summary {
      padding-left: 0;
    }
    &.even .summary {
      padding-right: 0;
    }
  }
  @media (max-width: 1440px) {
    width: calc(100% - 4rem);
    margin: 0;
    padding: 2rem;
    background: rgba(8,7,8,0.9);
    justify-content: center;
    &.odd .summary {
      padding-left: 0;
    }
    &.even .summary {
      padding-right: 0;
    }
    &.even, &.odd {
      text-align: center;
    }
  }
  @media (max-width: 768px) {
    height: 100%;
  }
`;


const Project = styled.div`
    display: flex;
    position: relative;
    margin-left: 10rem;
    width: 33vw;
    height: 100%;
    &.odd {
      margin-top: 10rem;
    }
    &.even {
      margin-top: -10rem;
    }
`;

const BackgroundImage = styled.div`
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;  
  will-change: transform;
  object-fit: cover;
  width: 100%;
  height: 100%;
`;

const ProjectCover = styled.div`
  width: calc(100% - 10px);
  height: calc(100% - 10px);  
`;


const ProjectSummary = styled.div`
  font-family: 'adobe-garamond-pro', sans-serif;
  letter-spacing: 0.5px;  
  position: relative;  
  margin-bottom: 1rem;
  letter-spacing: 0.5px;
  font-size: var(--body-text);
  font-weight: 600;
`;

const ProjectNumber = styled.h1`
  font-family: 'adobe-garamond-pro', sans-serif;
  font-weight: 200;
  line-height: 0.8;
  padding-right: 1rem;
  text-shadow: 0 0 2px var(--black);
  margin: 0;
  @media (max-width: 1920px) {
    font-size: 6rem;
  }
  @media (max-width: 1600px) {
    font-size: 6rem;
  }
  @media (max-width: 768px) {
    font-size: 4rem;
  }
`;

const ProjectActions = styled.div`
  margin: 2rem -0.5rem;
`;

const ProjectLink = styled(Link)`
  color: white;
  display: inline-flex;
  display: none;
  font-size: 1.5rem;
  padding: 0.5rem;
  line-height: 1;
  border-radius: 5px;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  background: var(--accent-colour);
  align-items: center;
  overflow: hidden;
  text-decoration: none;
  &:hover {
    color: var(--black);
    background: var(--offwhite);
    text-decoration: none;
  }
  &:hover .btn-label {
    max-width: 300px;
    opacity: 1;
  }
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const ProjectHeader = styled.div`
  display: flex;
  align-items: center;
`;

const Header = styled.h1`
  font-family: 'adobe-garamond-pro', sans-serif;
  font-size: 6rem;
  color: var(--black);
  display: flex;
  align-items: center;
  white-space: nowrap;
  position: absolute;  
  z-index: 2;
  height: auto;
  top: -20rem;
  left: -10rem;
  padding-top: 20rem;
  padding-left: 6rem;
  padding-bottom: 2rem;
  text-align: center;
  @media (max-width: 768px) {    
    
  }
  &::before {
    content: "";
    position: absolute;
    top: 0;    
    height: 100%;
    width: 100%;
    left: 0;  
    background: -webkit-radial-gradient(var(--offwhite) 0%,transparent 70%), -webkit-radial-gradient(var(--offwhite) 0%,transparent 70%), -webkit-radial-gradient(var(--offwhite) 0%,transparent 70%), -webkit-radial-gradient(var(--offwhite) 0%,transparent 70%), -webkit-radial-gradient(var(--offwhite) 0%,transparent 70%), -webkit-radial-gradient(var(--offwhite) 0%,transparent 70%), -webkit-radial-gradient(var(--offwhite) 0%,transparent 70%);
    background: radial-gradient(var(--offwhite) 0%,transparent 70%), radial-gradient(var(--offwhite) 0%,transparent 70%), radial-gradient(var(--offwhite) 0%,transparent 70%), radial-gradient(var(--offwhite) 0%,transparent 70%), radial-gradient(var(--offwhite) 0%,transparent 70%), radial-gradient(var(--offwhite) 0%,transparent 70%), radial-gradient(var(--offwhite) 0%,transparent 70%);
    z-index: -1;

  }
`;

const ButtonLabel = styled.span`
  display: inline-flex;
  max-width: 0;  
  opacity: 0;
  font-family: 'Satoshi';
  font-size: 1.2rem;
  font-weight: 600;
  white-space: nowrap;
  -webkit-transition: all 0.5s linear;
    -moz-transition: all 0.5s linear;
    -o-transition: all 0.5s linear;
    transition: all 0.5s linear;
`;

const LabelContainer = styled.span`
  padding-left: 0.5rem;
  padding-right: 0.5rem;
`;

const Image = styled(motion.svg)`  
  width: 100%;
  height: 100%;
`

const padNum = (num, targetLength) => {
  return num.toString().padStart(targetLength, "0");
}

const ProjectInfo = (props) => {
  return (
    <ProjectContent className={props.className}>
      <ProjectHeader>
        <ProjectNumber>{padNum(props.number + 1, 2)}</ProjectNumber>
        <ProjectName to={"/project/" + props.project.attributes.slug}>{props.project.attributes.title}</ProjectName>
        {props.project.attributes.links?.map((link) => (
          <ProjectLink key={link.id} to={link.url}>{Icons[link.icon]()}
            <ButtonLabel className='btn-label'><LabelContainer>{link.name}</LabelContainer></ButtonLabel>
          </ProjectLink>
        ))}        
      </ProjectHeader>
      <ProjectSummary className='summary'>{props.project.attributes.summary}</ProjectSummary>
      <ProjectActions>
      </ProjectActions>
    </ProjectContent>
  );
}

const ProjectItem = ({ project, number }) => {
  const ref = useRef(null);
  const [viewRef, inView] = useInView({
    threshold: 0.1,
  });
  const [circleRadius, setCircleRadius] = useState(0);
  const [displacementScale, setDisplacementScale] = useState(150);
  const [blurStdDeviation, setBlurStdDeviation] = useState(10);

  useEffect(() => {
    if (inView) {
      // Set the radius to a value that reveals the entire image
      setCircleRadius(400); // Adjust this value based on your image size
    }
  }, [inView]);

  return (
    <Project ref={viewRef} className={`${inView ? 'active' : ''} ${number % 2 === 0 ? 'odd' : 'even'}`}>
      {number % 2 == 0 ? (
        <ProjectInfo className="odd" number={number} project={project} />
      ) : (
        ''
      )}
      <ProjectImage even={number % 2 != 0} imageUrl={import.meta.env.VITE_APP_UPLOAD_URL + project.attributes.featured.data.attributes.url} />  
      {number % 2 != 0 ? (
        <ProjectInfo className="even" number={number} project={project} />
      ) : (
        ''
      )}
    </Project>
  );
};

const FeaturedWorks = () => {
  const { data, loading, error } = use(
    `/home?populate=deep`
  );

  const [animated, setAnimated] = useState(false);
  const [ref, inView] = useInView({
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      setAnimated(true);
    }
  }, [inView]);

  if (error) return (
    <>{error}</>
  )
  
  return (
    <Featured
      initial={{ y: 100, opacity: 0}}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7 }}
    >
      <Header>Featured Works</Header>
      <Projects>
      {/* Loop through featured projects */}
      {data?.attributes.featured.works.data.map((project, number) => (
        <ProjectItem key={project.id} project={project} number={number} />
      ))}
      </Projects>
    </Featured>
  )
}

export default FeaturedWorks