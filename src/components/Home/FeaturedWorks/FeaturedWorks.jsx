import React from 'react';
import styled, { keyframes } from 'styled-components';
import { InView, useInView } from 'react-intersection-observer';
import use from '../../../hooks/use';
import { Icons } from '../../Common/Icons';

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

const ProjectImageBorder = styled.div`
  z-index: 0;
  aspect-ratio: 16/9;
  width: 100%;
  animation: ${hueRotate} 18s linear infinite;
  border: 5px solid #504CCF;
`;

const ProjectName = styled.a`
  text-transform: uppercase;
  font-family: 'Satoshi';
  font-weight: 600;
  font-size: 2rem;
  color: #504CCF;
  text-shadow: 0 0 2px #504CCF;
  text-decoration: none;
  letter-spacing: 1px;
  animation: ${hueRotate} 18s linear infinite;
  margin: 2rem 0;
  & > svg {
    font-size: 3rem;
    margin-bottom: -0.75rem;
  }
  &:hover {
    color: white;
  }
`;

const ProjectContent = styled.div`
  position: relative;
  display: flex;
  width: calc((100vw - 75vmin)/2);
  flex-direction: column;
  z-index: 10;
  margin: -0.3rem 1rem 0 1rem;
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
  overflow: hidden;
  margin-top: 0;
  margin-left: 1rem;
  margin-right: 1rem;
  margin-bottom: 5rem;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Project = styled.div`
    display: flex;
    filter: grayscale(1);
    transition: all 1s ease;
    opacity: 0;
    &.odd {
      transform: translateX(-100px);
    }
    &.even {
      transform: translateX(100px);
    }
    &.active {
      filter: grayscale(0);
    }
    &.active.odd, &.active.even {
      transform: translateX(0);
      opacity: 1;
    }
`;

const ProjectMockups = styled.div`
  position: absolute;
  left: 5px;
  right: 5px;
  top: 5px;
  bottom: 5px;
  width: calc(100% - 10px);
  aspect-ratio: 16/9;
  background-size: cover;
  background-position: center;
`;

const ProjectSummary = styled.div`
  font-family: 'Satoshi';
  letter-spacing: 0.5px;
  margin-bottom: 1rem;
  text-shadow: 0 0 1px #F1E3F3;
`;

const ProjectNumber = styled.h1`
  font-family: 'Poppins';
  font-size: 10rem;
  font-weight: 200;
  line-height: 0.8;
  text-shadow: 0 0 2px #F1E3F3;
  margin: 0;
  filter: drop-shadow(2px 2px 2px black)
`;

const ProjectActions = styled.div`
  margin: 2rem -0.5rem;
`;

const ProjectLink = styled.a`
  color: white;
  display: inline-flex;
  font-size: 1.5rem;
  padding: 0.5rem;
  line-height: 1;
  border-radius: 3px;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  background: #504CCF;
  animation: ${hueRotate} 18s linear infinite;
  &:hover {
    background: #C2BBF0;
    text-decoration: none;
  }
`;

const Header = styled.h1`
  font-size: 6rem;
  font-weight: 400;
  margin: 6rem 0;
  color: #504CCF;
  animation: ${hueRotate} 18s linear infinite;
  text-transform: uppercase;
  font-family: 'Satoshi';
`;

const padNum = (num, targetLength) => {
  return num.toString().padStart(targetLength, "0");
}

const ProjectInfo = (props) => {
  return (
    <ProjectContent className={props.className}>
      <ProjectNumber>{padNum(props.number + 1, 2)}</ProjectNumber>
      <ProjectName href={"/project/" + props.project.attributes.slug}>{props.project.attributes.title}{Icons['Up Right']()}</ProjectName>
      <ProjectSummary className='summary'>{props.project.attributes.summary}</ProjectSummary>
      <ProjectActions>
      {props.project.attributes.links?.map((link) => (
        <ProjectLink key={link.id} href={link.url}>{Icons[link.icon]()}</ProjectLink>
      ))}        
      </ProjectActions>
    </ProjectContent>
  );
}

const FeaturedWorks = () => {
  const { data, loading, error } = use(
    `/home?populate=deep`
  );

  if (error) return (
    <>{error}</>
  )

  return (
    <Featured>
      <Header>Featured Works</Header>
      {/* Loop through featured projects */}
      {data?.attributes.featured.works.data.map((project, number) => (
        <InView key={project.id}>
          {/* Check if the project is in the viewport and give it the active class, unpausing animation and colouring */}
          {({ inView, ref, entry }) => (
          <Project ref={ref} className={`${inView ? 'active' : ''} ${number % 2 == 0 ? 'odd' : 'even'}`}>
            {/* Show Project Info before Image if the number's odd */}
            {number % 2 == 0 ? (<ProjectInfo className='odd' number={number} project={project} />) : ''}
            <ProjectImage>
              <ProjectImageBorder></ProjectImageBorder>
              <ProjectMockups style={{backgroundImage: "url(" + import.meta.env.VITE_APP_UPLOAD_URL + project.attributes.cover.data.attributes.url + ")"}} />
            </ProjectImage>
            {/* Show Project Info after Image if the number's even */}
            {number % 2 != 0 ? (<ProjectInfo className='even' number={number} project={project} />) : ''}
          </Project>
        )}
        </InView>
      ))}
    </Featured>
  )
}

export default FeaturedWorks