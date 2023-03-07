import React from 'react'
import styled, { keyframes } from 'styled-components';
import { InView, useInView } from 'react-intersection-observer';
import use from '../../../hooks/use';

const hueRotate = keyframes`
    0% {
        filter: hue-rotate(10deg);
    }
    
    50% {
        filter: hue-rotate(-30deg);
    }
    
    100% {
        filter: hue-rotate(10deg);
    }
`;

const Featured = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const pulseBackground = keyframes`
  0% {
    opacity: 1;
    left:0;
    filter: contrast(7) grayscale(0.7);
  }
  16.6% {
    opacity: 0.5;
    filter: contrast(3) grayscale(0.7);
  }
  33.3% {
    opacity: 1;
    filter: contrast(7) grayscale(0.7);
  }
  50% {
    opacity: 0.5;
    filter: contrast(3) grayscale(0.7);
  }
  66.7% {
    opacity: 1;
    filter: contrast(7) grayscale(0.7);
  }
  83.3% { 
    opacity: 0.5;
    filter: contrast(3) grayscale(0.7);
  }
  100% {
    opacity: 1;
    left: -15%;
    filter: contrast(7) grayscale(0.7);
  }
`;

const ProjectBackground = styled.div`
  width: 120%;
  height: 120%;
  z-index: 0;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
	background: linear-gradient(to bottom left, transparent, #504CCF);
	filter: contrast(7) grayscale(0.7);
  animation: ${pulseBackground} 6s linear infinite;
  animation-play-state: paused;
  --mask: linear-gradient(red, rgba(0, 0, 0, 0.45));
	&::before {
		position: absolute;
		top: 0; right: 0; bottom: 0; left: 0;
    background: radial-gradient(#000, transparent) 0 0/0.3em 0.3em space;
    -webkit-mask: var(--mask);
    mask: var(--mask);
		content: ''
	}
`;

const ProjectName = styled.h1`
  text-transform: uppercase;
  font-family: 'Poppins';
`;

const ProjectContent = styled.div`
  position: relative;
  display: flex;
  width: calc((100vw - 75vmin)/2);
  flex-direction: column;
  z-index: 10;
  background-size: 150%;
  margin: -0.3rem 1rem 0 1rem;
  background-position: 50%;
  &.odd {
    text-align: right;
  }
  &.odd .summary {
    padding-left: 25%;
  }
  &.even {
    text-align: left;
  }
  &.even .summary {
    padding-right: 25%;
  }
`;

const ProjectImage = styled.div`
  position: relative;
  width: 75vmin;
  height: 50vmin;
  border: 5px solid #504CCF;
  box-shadow: 0 0 3px #504CCf;
  overflow: hidden;
  margin: 1rem;
  z-index: 1;
  margin-bottom: 5rem;
  display: flex;
  animation: ${hueRotate} 18s linear infinite;
  justify-content: center;
  align-items: center;
`;

const Project = styled.div`
    display: flex;
    filter: grayscale(1);
    transition: filter 2s ease-in-out;
    &.active {
      filter: grayscale(0);
    }
    &.active .diagonal {
      animation-play-state: running;
    }
    &.active .project-background {
      animation-play-state: running;
    } 
    &.active .vertical {
      animation-play-state: running;
    }

`;

const panImageDiagonal = keyframes`
    0% {
      background-position: 30% 40%;
    }

    50% {
      background-position: 80% 50%;   
    }
    
    100% {
      background-position: 30% 40%;
    }
`;

const panImageVertical = keyframes`
    0% {
      background-position: 40% 30%;
    }

    50% {
      background-position: 50% 80%;   
    }
    
    100% {
      background-position: 40% 80%;
    }
`;

const ProjectMockups = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  width: 100%;
  background-size: 175%;
  background-position: 50%;
  height: 100%;
  &.diagonal {
    animation: ${panImageDiagonal} 50s ease-in-out infinite;
    animation-play-state: paused;
  }
  &.vertical {
    animation: ${panImageVertical} 50s ease-in-out infinite;
    animation-play-state: paused;
  }
`;

const ProjectSummary = styled.div`
  font-family: 'Hind';
`;

const ProjectNumber = styled.h1`
  font-family: 'Poppins';
  font-size: 10rem;
  font-weight: 200;
  line-height: 1;
  text-shadow: 0 0 5px #F1E3F3;
  margin: 0;
  filter: drop-shadow(2px 2px 2px black)
`;

const Filler = styled.div`
  width: calc((100vw - 75vmin)/2);
`;

const padNum = (num, targetLength) => {
  return num.toString().padStart(targetLength, "0");
}

const FeaturedWorks = () => {
  const { data, loading, error } = use(
    `/home?populate=deep`
  );

  return (
    <Featured>
      {data?.attributes.featured.works.data.map((project, number) => (
        <InView key={project.id}>
          {({ inView, ref, entry }) => (
          <Project ref={ref} className={`${inView ? 'active' : ''}`}>
            {number % 2 == 0 ? (
              <ProjectContent className='odd'>
                  <ProjectNumber>{padNum(number + 1, 2)}</ProjectNumber>
                  <ProjectName>{project.attributes.title}</ProjectName>
                  <ProjectSummary className='summary'>{project.attributes.summary}</ProjectSummary>
              </ProjectContent>
              ):''}
            <ProjectImage>
              <ProjectBackground className='project-background' />
              <ProjectMockups className={`${project.attributes.cover_style}`} style={{backgroundImage: "url(" + import.meta.env.VITE_APP_UPLOAD_URL + project.attributes.cover.data.attributes.url + ")"}} />
            </ProjectImage>

            {number % 2 != 0 ? (
              <ProjectContent className='even'>
                  <ProjectNumber>{padNum(number + 1, 2)}</ProjectNumber>
                  <ProjectName>{project.attributes.title}</ProjectName>
                  <ProjectSummary className='summary'>{project.attributes.summary}</ProjectSummary>
              </ProjectContent>
              ):''}
          </Project>
        )}
        </InView>
      ))}
    </Featured>
  )
}

export default FeaturedWorks