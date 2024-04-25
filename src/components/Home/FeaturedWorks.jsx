import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';
import { m, useAnimation } from 'framer-motion';
import ProjectImage from './ProjectImage';
import { InView, useInView } from 'react-intersection-observer';
import { Plane, ShaderPass, FXAAPass, useCurtainsEvent } from "react-curtains";
import use from '../../hooks/use';
import { Icons } from '../Common/Icons';
import AnimatedText from './AnimatedText';

const Featured = styled(m.div)`
  height: calc(var(--vh, 1vh) * 100);
  display: flex;
  justify-content: space-evenly;
  position: relative;
  align-items: center;
  margin-left: 5vw;
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
  @media (max-width: 768px) {

  }
`;

const Projects = styled(m.div)`
  display: flex;
  height: 100%;
  overflow: visible;
  @media (max-width: 1024px) {
    margin-top: 10vw;
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
  }
`;


const Project = styled.div`
    display: flex;
    position: relative;
    margin-left: 5vw;
    margin-right: 5vw;
    flex-direction: column;
    width: 30vw;
    max-width: 800px;
    height: 100%;
    align-items: center;
    justify-content: space-between;
    @media (max-width: 1024px) {
      width: 100vw;
      height: auto;
      margin-left: 0;
      flex-direction: column;
      &.odd, &.odd .project-image {
        margin-top: calc(var(--default-spacing));        
        margin-bottom: calc(var(--default-spacing) * 2); 
        flex-direction: column-reverse;
      }
      &.even, &.even .project-image {
        margin-top: calc(var(--default-spacing));        
        margin-bottom: calc(var(--default-spacing) * 2);
        flex-direction: column;
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

const firstPassFs = `
  precision mediump float;

  varying vec3 vVertexPosition;
  varying vec2 vTextureCoord;

  uniform sampler2D uRenderTexture;
  uniform sampler2D displacementTexture;

  uniform float uDisplacement;

  void main( void ) {
    vec2 textureCoords = vTextureCoord;
    vec4 displacement = texture2D(displacementTexture, textureCoords);

    // displace along Y axis
    // textureCoords.x += (sin(displacement.r) / 5.0) * uDisplacement;
    
    gl_FragColor = texture2D(uRenderTexture, textureCoords);
  }
`;

const secondPassFs = `
  #ifdef GL_ES
  precision mediump float;
  #endif

  varying vec3 vVertexPosition;
  varying vec2 vTextureCoord;

  uniform sampler2D uRenderTexture;

  uniform float uScrollEffect;

  void main() {
    vec2 textureCoords = vTextureCoord;
    vec2 texCenter = vec2(0.5, 0.5);

    // distort around scene center
    //textureCoords += vec2(texCenter - textureCoords).xy * sin(distance(texCenter, textureCoords)) * uScrollEffect / 175.0;

    gl_FragColor = texture2D(uRenderTexture, textureCoords);
  }
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
  const [planes, setPlanes] = useState([]);
  const planesDeformations = useRef(0);

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

  const onFirstPassReady = (shaderPass) => {
    shaderPass.loader.loadImage(
      "https://www.curtainsjs.com/examples/medias/displacement.jpg",
      {
        sampler: "displacementTexture"
      }
    );
  };

  const onFirstPassRender = (shaderPass) => {
    // update the uniforms
    shaderPass.uniforms.timer.value++;
    shaderPass.uniforms.displacement.value = planesDeformations.current / 60;
  };

  const onSecondPassRender = (shaderPass) => {
    // update the uniforms
    shaderPass.uniforms.scrollEffect.value = Math.abs(
      planesDeformations.current
    );
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