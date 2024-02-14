import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';
import ProjectImage from './ProjectImage';
import { InView, useInView } from 'react-intersection-observer';
import use from '../../hooks/use';
import { Icons } from '../Common/Icons';
import AnimatedText from './AnimatedText';

const Featured = styled(motion.div)`
  width: 200vw;
  display: flex;
  position: relative;
  align-items: center;
  overflow: visible;
  margin-left: 40vw;
  @media (max-width: 768px) {
    margin-top:30vh;
    margin-left: 0;
  }
`;

const Header = styled.h1`
  font-family: var(--body-font);
  font-size: var(--title-text);
  color: var(--black);
  display: flex;
  align-items: center;
  white-space: nowrap;  
  position: absolute;  
  z-index: 4;
  height: auto;
  top: 7.5rem;
  margin: 0;
  left: -10rem;  
  text-align: center;
  @media (max-width: 768px) {    
    left: var(--default-spacing);  
    top: 0;
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

const ProjectName = styled(Link)`
  text-transform: uppercase;
  font-family: var(--body-font);
  font-weight: 600;
  font-size: var(--body-text);
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
  @media (max-width: 768px) {
    margin-top: 16rem;
    flex-direction: column;
  }
`;

const ProjectContent = styled.div`
  display: flex;
  width: 80%;
  height: fit-content;
  flex-direction: column;
  z-index: 2;
  position: absolute;
  margin-left: 20rem;
  &.odd {
    bottom: 50%;
    &::before {
      bottom: 15%;
    }
  }
  &.even {
    top: 40%;
    &::before {
      top: -10%;
    }
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
  @media (max-width: 768px) {
    width: calc(100% - 2 * var(--default-spacing));
    margin: 0;
    padding: var(--default-spacing);
    &.odd, &.even {
      top: 0%;
      bottom: 0%;
      &::before {        
        top: 0%;
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
    width: 33vw;
    height: 100%;
    &.odd {
      margin-top: 10rem;
    }
    &.even {
      margin-top: -10rem;
    }
    @media (max-width: 768px) {
      width: 100vw;
      margin-left: 0;
      flex-direction: column;
      &.odd {
        margin-top: 5rem;
        margin-bottom: 5rem;        
        flex-direction: column-reverse;
      }
      &.even {
        margin-top: 5rem;
        margin-bottom: 5rem;      
      }
    }
`;

const ProjectSummary = styled(motion.div)`
  font-family: var(--body-font);
  letter-spacing: 0.5px;  
  position: relative;  
  margin-bottom: 1rem;
  letter-spacing: 1px;
  font-size: var(--body-text);
  font-weight: var(--body-weight);
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
  @media (max-width: 768px) {
    font-size: 4rem;
  }
`;

const ProjectActions = styled.div`
  margin: 2rem -0.5rem;
`;

const ProjectLink = styled(Link)`  
  display: inline-flex;
  display: none;
  font-size: var(--body-text);
  padding: 0.5rem;
  line-height: 1;
  border-radius: 5px;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
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

  }
`;

const ProjectHeader = styled.div`
  display: flex;
  align-items: center;
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

const ProjectInfo = ({ className, number, project, isInView }) => {
  const controls = useAnimation();
  const projectRef = useRef(null);

  const textVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 2, delay: 0.5, ease: "easeInOut" } },
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
        <ProjectName to={"/project/" + project.attributes.slug}><AnimatedText startImmediately={false} text={project.attributes.title} /></ProjectName>
        {project.attributes.links?.map((link) => (
          <ProjectLink key={link.id} to={link.url}>{Icons[link.icon]()}
            <ButtonLabel className='btn-label'><LabelContainer>{link.name}</LabelContainer></ButtonLabel>
          </ProjectLink>
        ))}        
      </ProjectHeader>
      <ProjectSummary initial="hidden" animate={controls} variants={textVariants}>{project.attributes.summary}</ProjectSummary>
      <ProjectActions>
        <ProjectLink to={"/project/" + project.attributes.slug}>View Project</ProjectLink>
      </ProjectActions>
    </ProjectContent>
  );
}

const ProjectItem = ({ project, number, scrollYProgress}) => {
  const ref = useRef(null);
  const [viewRef, inView] = useInView({
    threshold: 0.25,
    triggerOnce: true
  });
  const [circleRadius, setCircleRadius] = useState(0);
  return (
    <Project ref={viewRef} className={`${inView ? 'active' : ''} ${number % 2 === 0 ? 'odd' : 'even'}`}>
      {number % 2 == 0 ? (
        <ProjectInfo isInView={inView} className="odd" number={number} project={project} />
      ) : (
        ''
      )}
      <ProjectImage scrollYProgress={scrollYProgress} number={number} even={number % 2 != 0} imageUrl={import.meta.env.VITE_APP_UPLOAD_URL + project.attributes.featured.data.attributes.url} />  
      {number % 2 != 0 ? (
        <ProjectInfo isInView={inView} className="even" number={number} project={project} />
      ) : (
        ''
      )}
    </Project>
  );
};

const FeaturedWorks = ({ scrollYProgress }) => {
  const { data, loading, error } = use(
    `/home?populate=deep`
  );
  
  return (
    <Featured
      initial={{ y: 100, opacity: 0}}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7 }}
      id="featured"
    >
      <Header>Featured Work</Header>
      <Projects>
      {/* Loop through featured projects */}
      {data?.attributes.featured.works.data.map((project, number) => (
        <ProjectItem key={project.id} project={project} number={number} scrollYProgress={scrollYProgress} />
      ))}
      </Projects>
    </Featured>
  )
}

export default FeaturedWorks