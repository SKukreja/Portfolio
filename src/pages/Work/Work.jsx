import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';
import { InView, useInView } from 'react-intersection-observer';
import { m } from 'framer-motion';
import use from '../../hooks/use';
import { Icons } from '../../components/Common/Icons';
import Footer from '../../components/Common/Footer';

const Featured = styled(m.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
  margin-top: var(--content-margin-top);
`;

const ProjectImageBorder = styled.div`
  z-index: 10;
  aspect-ratio: 16/9;
  width: 100%;
  @media (max-width: 1440px) {
    display: none;   
  }
`;

const ProjectName = styled(Link)`
  text-transform: uppercase;
  font-family: 'Satoshi';
  font-weight: 600;
  font-size: 6vw;
  color: var(--accent-colour);
  text-decoration: none;
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

const ProjectContent = styled.div`
  position: relative;
  display: flex;
  width: 33%;
  flex-direction: column;
  z-index: 2;
  margin: -0.3rem var(--default-spacing) 0 var(--default-spacing);
  &.odd {
    text-align: right;
  }
  &.even {
    text-align: left;
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
    opacity: ${({ bgOpacity }) => `${bgOpacity}`};
    background: ${({ bgOpacity }) => `rgba(0,0,6,${bgOpacity})`};
    transition: all 0.5s linear;
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

const ProjectImage = styled.div`
  position: relative;
  width: 60%;
  overflow: hidden;
  margin-top: 0;
  margin-left: 0rem;
  margin-right: 0rem;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 1920px) {
    width: 60%;
  }
  @media (max-width: 1440px) {
    width: 100%;
    margin-left: 0;
    margin-right: 0;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin-bottom: 0;
    filter: blur(15px) saturation(180%);
  }
  @media (max-width: 768px) {

  }
`;

const Project = styled(m.div)`
    display: flex;
    filter: grayscale(1);
    transition: all 1s ease;
    position: relative;
    opacity: 1;
    width: var(--desktop-container-width);
    margin-bottom: calc(var(--default-spacing) * 2);
    &.active {
      filter: grayscale(0);
    }
    &.active.odd, &.active.even {
      opacity: 1;
    }
    @media (max-width: 1440px) {
      filter: grayscale(0);
    }
    @media (max-width: 768px) {      
      height: 60vh;
      height: 60svh;
      flex-direction: column;      
    }
    @media (max-width: 600px) {      
      height: 75vh;
      height: 75svh;
    }
`;

const BackgroundImage = styled.div`
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;  
  will-change: transform;
  object-fit: cover;
  width: 130%;
  height: 130%;
  left: 50%;  
  position: absolute;
  transition: transform 0.1s linear;
  transform: translate3d(-50%, -20%, 0);
`;

const ProjectCover = styled.div`
  border: 5px solid var(--accent-colour);
  position: absolute;
  width: calc(100% - 10px);
  height: calc(100% - 10px);
  
  
  z-index: 5;
  overflow: hidden;
`;


const ProjectSummary = styled.div`
  font-family: 'Satoshi';
  letter-spacing: 0.5px;
  margin-bottom: 1rem;
  letter-spacing: 1px;
  color: var(--offwhite);
  font-size: var(--body-text);
  text-shadow: 0 0 1px var(--offwhite);
`;

const ProjectNumber = styled.h1`
  font-family: 'Satoshi';
  font-size: 8rem;
  font-weight: 200;
  line-height: 0.8;
  text-shadow: 0 0 2px var(--offwhite);
  margin: 0;
  filter: drop-shadow(2px 2px 2px black);
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
  flex-direction: column;
`;

const Header = styled(m.h1)`
  font-family: 'Hind';
  font-size: 6rem;
  text-transform: uppercase;
  color: var(--accent-colour);
  letter-spacing: 0.1rem;
  width: 100%;
  text-align: center;
  margin-bottom: 4rem;
  @media (max-width: 768px) {
    font-size: 2rem;
    letter-spacing: 0.03rem;
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

const padNum = (num, targetLength) => {
  return num.toString().padStart(targetLength, "0");
}

const ProjectInfo = (props) => {
  const [ref, inView, entry] = useInView({
    threshold: 1, // Adjust this value to change the point at which the element is considered in view
  });
  
  const [opacity, setOpacity] = useState(0.97);

  useEffect(() => {
    if (inView) {
      const isVisible = entry.intersectionRatio; // Get the visibility ratio

      // Update opacity based on visibility ratio
      if (isVisible > 1) {
        setOpacity(0.97);
      }
      else {
        const newOpacity = 0.97 * isVisible;
        setOpacity(newOpacity);
      }
    }
    else 
    {
      setOpacity(0);
    }
  }, [inView]);

  return (
    <ProjectContent className={props.className} ref={ref} bgOpacity={opacity}>
      <ProjectHeader>
        <ProjectNumber>{padNum(props.number + 1, 2)}</ProjectNumber>
        <ProjectName to={"/project/" + props.project.attributes.slug}>{props.project.attributes.title}</ProjectName>
      </ProjectHeader>
      <ProjectSummary className='summary'>{props.project.attributes.summary}</ProjectSummary>
      <ProjectActions>
      {props.project.attributes.links?.map((link) => (
        <ProjectLink key={link.id} to={link.url}>{Icons[link.icon]}
          <ButtonLabel className='btn-label'><LabelContainer>{link.name}</LabelContainer></ButtonLabel>
        </ProjectLink>
      ))}        
      </ProjectActions>
    </ProjectContent>
  );
}

const ProjectItem = ({ project, number }) => {
  const [viewRef, inView, entry] = useInView({
    threshold: 0,
  });
  const ref = useRef(null);
  const [windowHeight, setWindowHeight] = useState(0);
  const [elementTop, setElementTop] = useState(0);
  const [bgY, setBgY] = useState(-20);

  // Update window height on resize
  useEffect(() => {
    setWindowHeight(window.innerHeight);

    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Update elementTop and bgY on scroll when the element is in view
  useEffect(() => {
      const handleScroll = () => {
        if (ref.current) {
          const rect = ref.current.getBoundingClientRect();
          setElementTop(rect.bottom);

          const newBgY = (rect.bottom / windowHeight) * 20;
          setBgY(newBgY);
        }
      };

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);    
  }, [windowHeight]);


  return (
    <Project
      ref={viewRef}
      className={`${inView ? 'active' : ''} ${
        number % 2 == 0 ? 'odd' : 'even'
      }`}
      initial={{ 
        opacity: 0,      
       }} 
      animate={{ 
        opacity: 1,      
      }} 
      exit={{ 
        opacity: 0,
       }} 
      transition={{ duration: 1 }}
    >
      {number % 2 == 0 ? (
        <ProjectInfo className="odd" number={number} project={project} />
      ) : (
        ''
      )}
      <ProjectImage>
        <ProjectImageBorder></ProjectImageBorder>
        <ProjectCover ref={ref}>
          <BackgroundImage            
            style={{
              backgroundImage:
                'url(' +
                import.meta.env.VITE_APP_UPLOAD_URL +
                project.attributes.featured.data.attributes.url +
                ')',
                transform: `translate3d(-50%, -${bgY}%, 0)`,
            }}
          />
        </ProjectCover>
      </ProjectImage>
      {number % 2 != 0 ? (
        <ProjectInfo className="even" number={number} project={project} />
      ) : (
        ''
      )}
    </Project>
  );
};

const Work = () => {
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
    <Featured initial={{ 
      opacity: 0,      
     }} 
    animate={{ 
      opacity: 1,      
    }} 
    exit={{ 
      opacity: 0,
     }} 
    transition={{ duration: 1 }}
    >
      <Header initial={{ 
      opacity: 0,      
     }} 
    animate={{ 
      opacity: 1,      
    }} 
    exit={{ 
      opacity: 0,
     }} 
    transition={{ duration: 1 }}>Featured Works</Header>
      {/* Loop through featured projects */}
      {data?.attributes.featured.works.data.map((project, number) => (
        <ProjectItem key={project.id} project={project} number={number} />
      ))}
      <Footer />
    </Featured>
  )
}

export default Work