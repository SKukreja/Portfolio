import React, { useState, useEffect, useRef, memo, useMemo } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { m, useAnimation } from 'framer-motion';
import ProjectImage from './ProjectImage';
import { InView, useInView } from 'react-intersection-observer';
import { Icons } from '../Common/Icons';
import AnimatedText from './AnimatedText';
import CustomLink from '../Common/CustomLink';

// Styled components
const Featured = styled(m.div)`
  height: calc(var(--vh, 1vh) * 100);
  display: flex;
  justify-content: flex-start;
  position: relative;
  margin-left: 5vw;
  align-items: center;
  width: max-content;  
  overflow: visible;
  @media (max-width: 1024px) {
    width: 100vw;
    height: max-content;
    margin-top: calc(var(--default-spacing));
    justify-content: flex-start;
    margin-left: 0;
    flex-direction: column;
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
  top: 7.5vh;
  margin: 0;
  left: 5rem;  
  text-align: center;
  @media (max-width: 1024px) {    
    top: 0;
    left: 50%;
    transform: translateX(-53%);
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
  & > svg {
    font-size: 3vw;
    margin-bottom: -0.75rem;
  }
  &:hover {
    color: var(--interact-hover-color);
  }
  @media (max-width: 1024px) {
    font-size: 4vw;
  }
`;

const Projects = styled(m.div)`
  display: flex;
  height: 100%;
  width: 100%;
  overflow: visible;
  justify-content: space-between;
  @media (max-width: 1024px) {
    margin-top: 20vw;
    margin-bottom: 20vw;
    flex-direction: column;
    justify-content: space-between;
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
    bottom: 33%;    
  }
  &.even {
    top: 33%;    
  }
  @media (max-width: 1024px) {
    width: calc(100% - 2 * var(--default-spacing));
    margin: 0;
    position: relative;
    margin-top: -15vw;    
    padding: var(--default-spacing);
    &.even, &.odd {
      top: 0;    
    }
  }
`;

const Project = styled.div`
  display: flex;
  position: relative;
  margin-left: 5vw;
  margin-right: 5vw;
  flex-direction: column;
  width: 800px;
  max-width: 50vw;
  height: 100%;
  align-items: center;
  justify-content: flex-start;
  @media (max-width: 1024px) {
    width: 100vw;
    max-width: 100vw;
    height: 25%;
    margin-left: 0;
    flex-direction: column;
    &.odd, &.odd .project-image {
      margin-top: calc(var(--default-spacing));        
      margin-bottom: calc(var(--default-spacing)); 
      flex-direction: column-reverse;
    }
    &.even, &.even .project-image {
      margin-top: calc(var(--default-spacing));        
      margin-bottom: calc(var(--default-spacing));
      flex-direction: column;
    }
  }
`;

const ProjectSummary = styled(m.div)`
  font-family: var(--body-font);
  letter-spacing: 0.5px; 
  position: relative;  
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

const ProjectLink = styled(m(CustomLink))`
  z-index: 2;  
  letter-spacing: 0.5px;
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
  transition: color 0.5s ease;
  &:hover {
    color: var(--interact-hover-color);
  }
`;

const ProjectHeader = styled.div`
  display: flex;
  align-items: center;
`;

const Spacer = styled.div``;

const SeeAll = styled(m(CustomLink))`
  z-index: 2;
  letter-spacing: 0.5px;
  color: var(--black);    
  font-family: var(--body-font);
  font-size: calc(var(--body-text) * 2);  
  font-weight: bold;
  text-decoration: none;
  position: relative;  
  margin-top: var(--default-spacing);
  display: flex;
  position: absolute;
  right: 5vw;
  bottom: 7.5vh;
  cursor: pointer;
  justify-content: flex-end;
  text-align: right;
  transition: color 0.5s ease, transform 0.3s linear;
  transform-origin: center;
  align-items: center;
  &:hover {
    color: var(--interact-hover-color);
  }
  & svg {
    width: 3rem;
    margin-right: 1rem;
  }
  @media (max-width: 1024px) {
    position: relative;
    margin-top: 0;
    padding: var(--default-spacing) 0;
    font-size: var(--body-text);
    bottom: 0;
    right: 0;
    margin-right: var(--default-spacing);
    width: auto;
    & svg {
      width: 1.5rem;
      margin-right: 1rem;
    }
  }
`;

// Helper function to pad numbers
const padNum = (num, targetLength) => {
  return num.toString().padStart(targetLength, "0");
};

// Project information component
const ProjectInfo = memo(({ className, number, project, isInView }) => {
  const controls = useAnimation();
  const projectRef = useRef(null);

  // Animation variants
  const textVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1.5, delay: 0.5, ease: "easeInOut" } },
  }), []);

  const linkVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1.5, delay: 1, ease: "easeInOut" } },
  }), []);

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    } else {
      controls.start('hidden');
    }
  }, [controls, isInView]);

  return (
    <ProjectContent ref={projectRef} className={className}>
      <ProjectHeader>
        <ProjectNumber>{padNum(number + 1, 2)}</ProjectNumber>
        <ProjectName to={`/project/${project.attributes.slug}`}>
          <AnimatedText isLink={true} startImmediately={false} text={project.attributes.title} />
        </ProjectName>
      </ProjectHeader>
      <ProjectSummary initial="hidden" animate={controls} variants={textVariants}>
        {project.attributes.summary}
      </ProjectSummary>
      <ProjectLink initial="hidden" animate={controls} variants={linkVariants} to={`/project/${project.attributes.slug}`}>
        Read More
      </ProjectLink>
    </ProjectContent>
  );
});

const ProjectItem = memo(({ isMobile, project, number }) => {
  const [viewRef, inView] = useInView({
    threshold: 0.25,
    triggerOnce: true
  });

  return (
    <Project ref={viewRef} className={`${inView ? 'active' : ''} ${number % 2 === 0 ? 'odd' : 'even'}`}>
      {number % 2 === 0 ? (
        <>
          <Spacer />
          <ProjectInfo isInView={inView} className="odd" number={number} project={project} />
        </>
      ) : (
        null
      )}
      <ProjectImage isInView={inView} isMobile={isMobile} number={number} even={number % 2 !== 0} image={project.attributes.featured} />  
      {number % 2 !== 0 ? (
        <>
          <ProjectInfo isInView={inView} className="even" number={number} project={project} />
          <Spacer />
        </>
      ) : (
        null
      )}
    </Project>
  );
});

// Main component
const FeaturedWorks = memo(({ $isMobile, data }) => {
  const controls = useAnimation();
  const [featuredProjects, setFeaturedProjects] = useState(null);

  const headerVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: () => ({
      opacity: 1,
      transition: {
        duration: 1.5,
        type: 'linear',        
      },
    }),
  }), []);

  const linkVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1.5, delay: 1, ease: "easeInOut" } },
  }), []);

  const [seeAllRef, isInView] = useInView({
    threshold: 1,
    triggerOnce: true
  });

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    } else {
      controls.start('hidden');
    }
  }, [controls, isInView]);

  useEffect(() => {
    if (!data) return;
    const featured = data.filter(project => project.attributes.isFeatured === true);
    setFeaturedProjects(featured);
  }, [data]);

  return (
    <InView triggerOnce>
      {({ inView, ref }) => (
        <Featured ref={ref} id="featured-works">
          <Header
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={headerVariants}
          >
            Featured Projects
          </Header>

          <Projects>
            {featuredProjects && featuredProjects.map((project, number) => (
              <ProjectItem key={project.id} isMobile={$isMobile} project={project} number={number} />
            ))}

            <SeeAll ref={seeAllRef} initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={linkVariants}
              to="/projects"
              aria-label="See all projects"
            >
              {Icons["Arrow Right"]} See all projects
            </SeeAll>
          </Projects>
        </Featured>
      )}
    </InView>
  );
});

export default FeaturedWorks;
