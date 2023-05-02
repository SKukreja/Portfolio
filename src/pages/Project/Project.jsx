import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { useParams } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { InView, useInView } from 'react-intersection-observer';
import use from '../../hooks/use';
import { Icons } from '../../components/Common/Icons';

const desktopContainerWidth = '70vw';

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


const ProjectContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-left: auto;
  margin-right: auto;
  padding-top: 10rem;
`;

const Browser = styled.div`
  width: ${desktopContainerWidth};
  position: relative;
  aspect-ratio: 16/9;
  margin-bottom: 6rem;
`;

const Window = styled.div`
  border: 5px solid #504CCF;
  border-top: 50px solid #504CCF;
  box-shadow: 0px 0px 15px 3px #050829;
  aspect-ratio: 16/9;
  animation: ${hueRotate} 18s linear infinite;
`;

const Website = styled.div`
  width: calc(100% - 10px);
  aspect-ratio: 16/9;
  background-position: center;
  position: absolute;
  bottom: 5px;
  left: 5px;
  right: 5px;
  background-size: cover;
`;

const ProjectTitle = styled.h1`
  text-transform: uppercase;
  font-family: 'Poppins';
  font-weight: 600;
  font-size: 6rem;
  color: #504CCF;
  text-shadow: 0 0 5px #504CCF;
  text-decoration: none;
  letter-spacing: 1px;
  line-height: 1;
  animation: ${hueRotate} 18s linear infinite;
  margin-bottom: -1rem;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: center;
  align-items: right;
  position: absolute;
  top: -45px;
  right: 0;
  height: 40px;
`;

const Button = styled.div`
  width: 40px;
  height: 40px;
  color: black;
  font-size: 1.25rem;
  display: flex;
  margin-left: 5px;
  justify-content: center;
  align-items: center;
`;

const StackComponents = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
`;

const ProjectTechnology = styled.div`
  font-size: 2rem;
  font-family: 'Satoshi';
  height: 4rem;
  display: flex;
  width: 33%;
  align-items: center;
  line-height: 2;
  letter-spacing: 0.5px;
  justify-content: start;
  & svg {
    font-size: 2rem;
    padding-right: 1rem;
  }
`;

const ProjectInfo = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 2;
  letter-spacing: 0.5px;
  align-items: center;
  width: 100%;
`;

const Section = styled.div`
  display: flex;
  width: calc(${desktopContainerWidth} * 3/4);
  margin-bottom: 6rem;
  &.bw {
    opacity: 0;
    transition: opacity 0.5s ease;
  }
  &.bw.active {
    opacity: 1;
  }
`;

const TextSection = styled.div`
  display: flex;
  opacity: 0;
  transition: opacity 0.5s ease;
  &.active {
    opacity: 1;
  }
`;

const InvertedTitle = styled.h1`
  color: #080708;
  margin-bottom: 6rem;
  font-family: 'Satoshi';
  font-size: 6rem;
  font-weight: 600;
`;

const Figure = styled.div`
  width: 100%;
  margin-top: -10rem;
  text-align: center;
  & img {
    position: absoluyt
    margin-left: auto;
    margin-right: auto;
    max-width: 100%;
    aspect-ratio: 16/9;
  }
  opacity: 0;
  transition: opacity 0.5s ease;
  &.active {
    opacity: 1;
  }
`;

const Article = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Headers = styled.div`
  width: 33%;
  font-family: 'Satoshi';
  font-size: 2rem;
  font-weight: 600;
  color: #504CCF;
  animation: ${hueRotate} 18s linear infinite;
`;

const Topic = styled.div`
  font-size: 2rem;
  font-family: 'Satoshi';
  display: flex;
  width: 66%;
`;

const BuiltWith = styled.div`
  font-size: 2rem;
  font-family: 'Satoshi';
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 66%;
`;

const TopicText = styled.div`
  & p:first-child {
    margin-top: 0;
  }
`;

function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  const windowHeight = window.innerHeight || document.documentElement.clientHeight;
  const windowWidth = window.innerWidth || document.documentElement.clientWidth;

  // Calculate the amount of visible height and width of the element
  const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
  const visibleWidth = Math.min(rect.right, windowWidth) - Math.max(rect.left, 0);

  // Check if the element is at least 50% visible in both height and width
  return visibleHeight > 0 && visibleWidth > 0 &&
         visibleHeight >= rect.height / 2 && visibleWidth >= rect.width / 2;
}

const Project = () => {
  const { id } = useParams();
  const [isInverted, setIsInverted] = useState(false);
  const [figureRefs, setFigureRefs] = useState([]);
  const { data, loading, error } = use(
    `/slugify/slugs/work/` + id + `?populate=deep`
  );

  useEffect(() => {
    if (data && data.attributes && data.attributes.article) {
      const newFigureRefs = data.attributes.article.map((_, i) =>
        figureRefs[i] || React.createRef()
      );
      setFigureRefs(newFigureRefs);
    }
  }, [data, figureRefs]);

  useEffect(() => {
    if (figureRefs.length > 0) {
      let anyFigureInView = false;
      figureRefs.forEach((figureRef, index) => {
        const figureInView = figureRef.current && isInViewport(figureRef.current);
        if (figureInView) {
          anyFigureInView = true;
        }
      });
      setIsInverted(anyFigureInView);
    }
  }, [figureRefs]);  

  useEffect(() => {
    const lightElems = document.querySelectorAll(".light");
    const darkElems = document.querySelectorAll(".dark");

    if (isInverted) {
      document.querySelector("html").classList.add("inverted");
      lightElems.forEach((elem) => {
        elem.classList.add("active");
      });
      darkElems.forEach((elem) => {
        elem.classList.remove("active");
      });
    } else {
      document.querySelector("html").classList.remove("inverted");
      lightElems.forEach((elem) => {
        elem.classList.remove("active");
      });
      darkElems.forEach((elem) => {
        elem.classList.add("active");
      });
    }
  }, [isInverted]);

  if (error) return (
    <>{error}</>
  )
  return (
    <ProjectContainer>
      <ProjectTitle>{data?.attributes.title}</ProjectTitle>
      <Browser>
        <Window>
          <Buttons>
            <Button className='minimize'>{Icons['Minimize']()}</Button>
            <Button className='maximize'>{Icons['Square']()}</Button>
            <Button className='close'>{Icons['Close']()}</Button>
          </Buttons>
        </Window>
        <Website style={{backgroundImage: "url(" + import.meta.env.VITE_APP_UPLOAD_URL + data?.attributes.cover.data.attributes.url + ")"}}>          </Website>
      </Browser>
      <ProjectInfo>
        <Article>
          <Section className='bw dark'>
            <Headers>Built With</Headers>
            <BuiltWith>
              <StackComponents>
                {data?.attributes.technologies.data?.map((technology) => (
                  <ProjectTechnology key={technology.id}>{Icons[technology.attributes.name]()} {technology.attributes.name}</ProjectTechnology>
                ))}
              </StackComponents>
            </BuiltWith>
          </Section>
          {data?.attributes.article.map((topic, index) => {
            return(
              <Section key={topic.id}>
                {topic.__component === 'article.figure' ? (
                    <Figure ref={figureRefs[index]} className='light'>
                      <InvertedTitle>{topic.title}</InvertedTitle>
                      <img src={import.meta.env.VITE_APP_UPLOAD_URL + topic.figure.data.attributes.url} />
                    </Figure>
                  ) :
                  topic.__component === 'article.slides' ? (
                    <Figure ref={figureRefs[index]} className='light'>
                      <InvertedTitle>{topic.title}</InvertedTitle>
                      <img src={import.meta.env.VITE_APP_UPLOAD_URL + topic.images.data[0].attributes.url} />
                    </Figure>
                  ) : (
                    <TextSection className='dark'>
                      <Headers>
                        {topic.header ? topic.header : ""}
                      </Headers>
                      <Topic>
                        {topic.__component === 'article.topic' ? (
                        <TopicText>
                          <ReactMarkdown linkTarget="_blank" escapeHtml={false}>{topic.content}</ReactMarkdown>
                        </TopicText>
                        ) : 
                        topic.__component === 'article.sandbox' ? (
                          <div></div>
                        ) : ("")}
                      </Topic>
                    </TextSection>
                  )}            
              </Section>
            );
          })}
        </Article>
      </ProjectInfo>
    </ProjectContainer>
  )
}

export default Project