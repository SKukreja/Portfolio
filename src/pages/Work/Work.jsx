import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { m, useAnimation } from 'framer-motion';
import CustomLink from '../../components/Common/CustomLink';

const Featured = styled(m.div)`
  position: relative;
  overflow-y: hidden;
  display: flex;
  padding-left: 80px;
  height: calc(var(--vh) * 100);
  overflow-y: hidden;
  @media (max-width: 1024px) {
    padding-left: 0;
    padding-top: 80px;
    height: auto;    
    overflow-y: auto;
    overflow-x: hidden;
    flex-direction: column;
    width: 100vw;
  }
`;

const Header = styled(m.h1)`
  font-family: var(--display-font);
  font-size: var(--title-text);
  color: var(--black);  
  width: 50%;
  text-align: center;
  height: calc(var(--vh) * 20);
  margin-bottom: var(--default-spacing);
  @media (max-width: 1024px) {
    width: 100%;  
  }
`;

const AllProjects = styled.div`
  display: flex;
  min-width: calc(100vw - 80px);
  height: 100%;
  @media (max-width: 1024px) {
    flex-direction: column;
    min-width: 100vw;
  }
`;

const Projects = styled(m.div)`
  display: flex;
  height: calc(var(--vh) * 100);
  width: 50%;
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;
  @media (max-width: 1024px) {
    min-height: calc(var(--vh) * 100 - 80px);  
    width: 100%;  
    align-items: center;
  }
`;

const Project = styled(m.div)`
  width: calc(100% - var(--default-spacing) * 2);
  text-align: center;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: ${({ isCurrent }) => (isCurrent ? 'calc(var(--vh) * 30)' : 'calc(var(--vh) * 10)')};
  position: relative;
  padding: 0 var(--default-spacing);
  transition: height 0.5s ease;
  @media (max-width: 1024px) {
    height: calc(var(--vh) * 10);
  }
`;

const Year = styled.div`
  font-family: var(--body-font);  
  font-size: calc(var(--body-text) * 2);
  color: var(--black);  
  margin-top: -0.5rem;
  margin-right: var(--default-spacing);
  text-decoration: none;
  z-index: 2;  
  text-transform: uppercase;    
  letter-spacing: 2px;    
`;

const ProjectName = styled(CustomLink)`
  font-family: var(--body-font);  
  font-size: calc(var(--body-text));
  color: var(--black);  
  text-decoration: none;
  z-index: 2;  
  text-transform: uppercase;
  font-weight: 900;
  letter-spacing: 2px;  
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

const BigBorder = styled(m.span)`
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  opacity: 0.5;
  width: 100%;
  border: 1px solid;
  border-image-slice: 1;
  border-image-source: linear-gradient(to left, #793A2B, var(--offwhite));
  transform-origin: left;
  @media (max-width: 1024px) {
    border-image-source: linear-gradient(to left, #793A2B, #793A2B);
  }
`;

const Work = ({ projectData }) => {
  const [data, setData] = useState(null);
  const [currentProject, setCurrentProject] = useState(0);
  const controls = useAnimation();
  let scrollTimeout = useRef(null);

  useEffect(() => {
    if (!projectData) return;    
    setData(projectData);
  }, [projectData]);

  const handleScroll = (e) => {
    e.preventDefault();
    if (scrollTimeout.current) return;
    let isMobile = window.innerWidth < 1024;
    const delta = e.deltaY > 0 ? 1 : -1;
    setCurrentProject((prev) => {
      const nextProject = Math.min(Math.max(prev + delta, 0), data.length - 1);
      controls.start({ y: isMobile ? 0 : -nextProject * 5 + 'vh' });
      return nextProject;
    });

    scrollTimeout.current = setTimeout(() => {
      scrollTimeout.current = null;
    }, 500); // Adjust this timeout to control scroll sensitivity
  };

  useEffect(() => {
    window.addEventListener('wheel', handleScroll, { passive: false });
    return () => {
      window.removeEventListener('wheel', handleScroll);
    };
  }, [data]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2, // This adds a delay before the first child starts animating
      },
    },
  };

  const projectVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: ({ delay }) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: delay * 0.3,
        duration: 0.5,
      },
    }),
  };

  return (
    <Featured

    >
      <AllProjects>
        <Header
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          All Projects
        </Header>
        <Projects as={m.div} variants={containerVariants} initial="hidden" animate="visible">
          {data && data.map((project, index) => (
            <Project key={project.id} isCurrent={index === currentProject} variants={projectVariants} custom={{ delay: index }}>
              <Year>{project.attributes.year}</Year>
              <ProjectName to={"/project/" + project.attributes.slug}>
                {project.attributes.title}
              </ProjectName>
              <BigBorder />
            </Project>
          ))}
        </Projects>
      </AllProjects>
    </Featured>
  );
};

export default Work;
