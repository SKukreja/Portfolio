import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { InView, useInView } from 'react-intersection-observer';
import use from '../../hooks/use';
import { Icons } from '../Common/Icons';

const desktopContainerWidth = '75vw';

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
  margin-bottom: 2rem;
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
  @media (max-width: 768px) {
    font-size: 1.2rem;
    & > svg {
      font-size: 1.8rem;
      margin-bottom: -0.5rem;
    }
  }
`;

const ProjectContent = styled.div`
  position: relative;
  display: flex;
  width: 33%;
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
  @media (max-width: 768px) {
    width: calc(100% - 4rem);
    margin: 0;
    padding: 2rem;
    background: rgba(8,7,8,0.9);
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
`;

const ProjectImage = styled.div`
  position: relative;
  width: 75%;
  overflow: hidden;
  margin-top: 0;
  margin-left: 1rem;
  margin-right: 1rem;
  margin-bottom: 5rem;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
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
`;

const Project = styled.div`
    display: flex;
    filter: grayscale(1);
    transition: all 1s ease;
    opacity: 0;
    width: ${desktopContainerWidth};
    transform: translateY(100px);
    &.active {
      filter: grayscale(0);
    }
    &.active.odd, &.active.even {
      transform: translateY(0);
      opacity: 1;
    }
    @media (max-width: 768px) {
      flex-direction: column;
      width: 100%;
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

  @media (max-width: 768px) {
    aspect-ratio: auto;
    object-fit: cover;
  }
`;

const ProjectSummary = styled.div`
  font-family: 'Satoshi';
  letter-spacing: 0.5px;
  margin-bottom: 1rem;
  letter-spacing: 1px;
  text-shadow: 0 0 1px #F1E3F3;
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const ProjectNumber = styled.h1`
  font-family: 'Poppins';
  font-size: 10rem;
  font-weight: 200;
  line-height: 0.8;
  text-shadow: 0 0 2px #F1E3F3;
  margin: 0;
  filter: drop-shadow(2px 2px 2px black);
  @media (max-width: 768px) {
    font-size: 6rem;
  }
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
  border-radius: 5px;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  background: #504CCF;
  animation: ${hueRotate} 18s linear infinite;
  &:hover {
    background: #C2BBF0;
    text-decoration: none;
  }
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const ProjectHeader = styled.div`
  display: flex;
  flex-direction: column;
`;

const Header = styled.h1`
  font-size: 6rem;
  font-weight: 400;
  margin: 6rem 0;
  color: #504CCF;
  animation: ${hueRotate} 18s linear infinite;
  text-transform: uppercase;
  font-family: 'Satoshi';

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const padNum = (num, targetLength) => {
  return num.toString().padStart(targetLength, "0");
}

const ProjectInfo = (props) => {
  return (
    <ProjectContent className={props.className}>
      <ProjectHeader>
        <ProjectNumber>{padNum(props.number + 1, 2)}</ProjectNumber>
        <ProjectName href={"/project/" + props.project.attributes.slug}>{props.project.attributes.title}{Icons['Up Right']()}</ProjectName>
      </ProjectHeader>
      <ProjectSummary className='summary'>{props.project.attributes.summary}</ProjectSummary>
      <ProjectActions>
      {props.project.attributes.links?.map((link) => (
        <ProjectLink key={link.id} href={link.url}>{Icons[link.icon]()}</ProjectLink>
      ))}        
      </ProjectActions>
    </ProjectContent>
  );
}

const ProjectItem = ({ project, number }) => {
  const [animated, setAnimated] = useState(false);
  const [ref, inView] = useInView({
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      setAnimated(true);
    }
  }, [inView]);

  return (
    <Project
      ref={ref}
      className={`${animated ? 'active' : ''} ${
        number % 2 == 0 ? 'odd' : 'even'
      }`}
    >
      {number % 2 == 0 ? (
        <ProjectInfo className="odd" number={number} project={project} />
      ) : (
        ''
      )}
      <ProjectImage>
        <ProjectImageBorder></ProjectImageBorder>
        <ProjectMockups
          style={{
            backgroundImage:
              'url(' +
              import.meta.env.VITE_APP_UPLOAD_URL +
              project.attributes.cover.data.attributes.url +
              ')',
          }}
        />
      </ProjectImage>
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
    <Featured>
      <Header>Featured Works</Header>
      {/* Loop through featured projects */}
      {data?.attributes.featured.works.data.map((project, number) => (
        <ProjectItem key={project.id} project={project} number={number} />
      ))}
    </Featured>
  )
}

export default FeaturedWorks