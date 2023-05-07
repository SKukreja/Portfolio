import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { useParams } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { InView, useInView } from 'react-intersection-observer';
import use from '../../hooks/use';
import { Icons } from '../../components/Common/Icons';
import Slider from '../../components/Project/Slider';

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
  @media (max-width: 768px) {
    width: 90%;
  }
`;

const Window = styled.div`
  border: 5px solid #504CCF;
  border-top: 50px solid #504CCF;
  box-shadow: 0px 0px 15px 3px #050829;
  aspect-ratio: 16/9;
  animation: ${hueRotate} 18s linear infinite;
  @media (max-width: 768px) {
    border: 3px solid #504CCF;
    border-top: 25px solid #504CCF;
  }
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
  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 2rem;
  }
`;

const Buttons = styled.div`
  display: flex;
  justify-content: center;
  align-items: right;
  position: absolute;
  top: -45px;
  right: 0;
  height: 40px;
  @media (max-width: 768px) {
    top: -23px;
    height: 20px;
  }
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
  @media (max-width: 768px) {
    margin-left: 3px;
    width: 20px;
    height: 20px;
    font-size: 1rem;
  }
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
  @media (max-width: 768px) {
    width: 50%;
    font-size: 1rem;
  }
`;

const ProjectInfo = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 2;
  letter-spacing: 0.5px;
  align-items: center;
  width: calc(100% - 2rem);
  padding: 1rem;
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
  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
  }
`;

const TextSection = styled.div`
  display: flex;
  opacity: 0;
  transition: opacity 0.5s ease;
  &.active {
    opacity: 1;
  }
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const InvertedTitle = styled.h1`
  color: #080708;
  margin-bottom: 6rem;
  font-family: 'Satoshi';
  font-size: 6rem;
  font-weight: 600;
  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;

const Figure = styled.div`
  width: 100%;
  margin-top: -10rem;
  text-align: center;
  & img {
    margin-left: auto;
    margin-right: auto;
    max-width: 100%;
  }
  opacity: 0;
  transition: opacity 0.5s ease;
  &.active {
    opacity: 1;
  }
  @media (max-width: 768px) {
    margin-top: -5rem;
    width: 100vw;
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
  @media (max-width: 768px) {
    width: 100%;
    font-size: 1.2rem;
    padding: 1.5rem;
  }
`;

const Topic = styled.div`
  font-size: 2rem;
  font-family: 'Satoshi';
  display: flex;
  width: 66%;
  @media (max-width: 768px) {
    width: calc(100% - 3rem);
    font-size: 1.2rem;
    padding: 1.5rem;
  }
`;

const BuiltWith = styled.div`
  font-size: 2rem;
  font-family: 'Satoshi';
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 66%;
  @media (max-width: 768px) {
    width: 100%;
    padding: 1.5rem;
  }
`;

const TopicText = styled.div`
  & p:first-child {
    margin-top: 0;
  }
`;

const ProjectLinks = styled.div`
  height: 50vh;
  width: ${desktopContainerWidth};
  margin-left: auto;
  margin-right: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  opacity: 0;
  transition: all 0.5s ease;
  &.active {
    opacity: 1;
  }
  @media (max-width: 768px) {
    width: 100%;
    align-content: flex-end;
  }
`;

const Action = styled.a`
  margin: 2rem;
  background: #504CCF;
  width: 25%;
  text-align: center;
  font-size: 2rem;
  color: #F1E3F3;
  font-family: 'Satoshi';
  font-weight: 500;
  letter-spacing: 2px;
  text-decoration: none;
  padding: 3rem;
  border-radius: 15px;
  animation: ${hueRotate} 18s linear infinite;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  & svg {
    margin-right: 1rem;
  }
  &:hover {
    background: #F1E3F3;
    color: #080708;
  }
  @media (max-width: 768px) {
    width: 100%;
    font-size: 1rem;
    margin: 1rem;
  }
`;

const Caption = styled.span`
  margin-top: 3rem;
  overflow: visible;
  width: 100%;  
  display: block;
  color: #080708;
`;

const Project = () => {
  const { id } = useParams();
  const [isInverted, setIsInverted] = useState(false);

  const { data, loading, error } = use(
    `/slugify/slugs/work/` + id + `?populate=deep`
  );

  const onFigureInViewChange = (inView) => {
    setIsInverted(inView);
  };

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
            const isFigure = topic.__component === 'article.figure' || topic.__component === 'article.slides';
            const first = index === 0 ? 'active' : '';
            if (isFigure) {
              return (
                <Section key={topic.id}>
                  <InView onChange={onFigureInViewChange} threshold={0.7} style={{ width: '100%' }}>
                    {topic.__component === 'article.slides' ? (
                      <Figure className='light'>
                        <InvertedTitle>{topic.title}</InvertedTitle>
                        <Slider media={topic.media} />
                        <Caption>{topic.caption}</Caption>
                      </Figure>
                    ) : (
                    <Figure className='light'>
                      <InvertedTitle>{topic.title}</InvertedTitle>
                      <img src={import.meta.env.VITE_APP_UPLOAD_URL + (topic.__component === 'article.figure' ? topic.figure.data.attributes.url : topic.images.data[0].attributes.url)} />
                      <Caption>{topic.caption}</Caption>
                    </Figure>
                    )}
                  </InView>
                </Section>
              );
            }

            return (
              <Section key={topic.id}>
                <TextSection className={'dark ' + first}>
                  <Headers>
                    {topic.header ? topic.header : ''}
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
              </Section>
            );
          })}
        </Article>
        <ProjectLinks className='dark'>
          {data?.attributes.links?.map((action, index) => {
            return <Action key={index} target='_blank' href={action.url}>{Icons[action.icon]()}{action.name}</Action>;
          })}
        </ProjectLinks>
      </ProjectInfo>
    </ProjectContainer>
  )
}

export default Project