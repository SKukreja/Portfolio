import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { InView, useInView } from 'react-intersection-observer';
import use from '../../hooks/use';
import { Icons } from '../../components/Common/Icons';
import Slider from '../../components/Project/Slider';
import { m } from 'framer-motion'
import Footer from '../../components/Common/Footer';
import { Helmet } from 'react-helmet-async';
import Landing from '../../components/Home/Landing'
import ProjectTitle from './ProjectTitle';
import ProjectSplash from './ProjectSplash';
import Splash from '../../components/Home/Splash'
import FeaturedWorks from '../../components/Home/FeaturedWorks'
import About from '../../components/Home/About'
import Cover from '../../components/Home/Cover'

const Container = styled.div`
  position: relative;
  overflow-y: hidden;
  @media (max-width: 1024px) {
    height: auto;
    overflow-y: auto;
    overflow-x: hidden;
  } 
`;

const Content = styled.div`
  display: flex;
  background: var(--offwhite);
  position: relative;
  overflow-y: hidden;
  @media (max-width: 1024px) {
    flex-direction: column;
    width: 100vw;
    overflow-y: auto;
    overflow-x: hidden;    
  }
  @media (max-width: 1024px) {
    padding-top: calc(var(--default-spacing));
  }
  @media (max-width: 768px) {
    padding-top: calc(var(--default-spacing) * 2);
  }
`;

const Noise = styled.div`
  background: url("Noise.png");
  background-repeat: repeat;
  opacity: 1;
  width: 100%;
  height: 100%;
  pointer-events: none;
  position: absolute;
  inset: 0;
  z-index: 1001;
  &::after {
    content: "";
    position: absolute;
    width: calc(100% - 40vw);
    height: 100%;
    pointer-events: none;
    opacity: 0.12;
    z-index: 5;
    mix-blend-mode: color-burn;
    background: url("paper.jpg");
    @media (max-width: 1024px) {
      width: 100%;
      height: ${({ $isFirefox }) => $isFirefox ? 'calc(100% - (100vh - var(--default-spacing) + 1px))' : 'calc(100% - (100svh - var(--default-spacing) + 1px))'};
    }
    @media (max-width: 768px) {
      height: ${({ $isFirefox }) => $isFirefox ? 'calc(100% - (100vh - var(--default-spacing) * 2 + 1px))' : 'calc(100% - (100svh - var(--default-spacing) * 2 + 1px))'};
    }
  }
`;

const BoxShadow = styled.div`
  box-shadow: 2px 3px 20px var(--black), 0 0 350px #8f5922 inset;
  position: absolute;
  width: 100%;
  height: calc(var(--vh) * 100);
  inset: 0;
  z-index: 10;
  pointer-events: none;
  mix-blend-mode: multiply;
  @media (max-width: 1024px) {
    height: ${({ $isFirefox }) => $isFirefox ? 'calc(100% - (100vh - var(--default-spacing) + 1px))' : 'calc(100% - (100svh - var(--default-spacing) + 1px))'};
    width: 100%;
    box-shadow: 0 0 100px #8f5922 inset;
  }
  @media (max-width: 768px) {
    height: ${({ $isFirefox }) => $isFirefox ? 'calc(100% - (100vh - var(--default-spacing) * 2 + 1px))' : 'calc(100% - (100svh - var(--default-spacing) * 2 + 1px))'};
  }
`;

const ProjectContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-left: auto;
  margin-right: auto;
  padding-top: var(--content-margin-top);
`;

const Browser = styled.div`
  width: var(--desktop-container-width);
  position: relative;
  aspect-ratio: 16/9;
  margin-bottom: var(--article-spacing);
  @media (max-width: 1024px) {
    width: calc(100% - 3rem);
  }
`;

const Window = styled.div`
  border: 5px solid #FF6281;
  border-top: 50px solid #FF6281;
  box-shadow: 0px 0px 15px 3px #050829;
  aspect-ratio: 16/9;
  @media (max-width: 1024px) {
    border: 3px solid #FF6281;
    border-top: 25px solid #FF6281;
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

const Buttons = styled.div`
  display: flex;
  justify-content: center;
  align-items: right;
  position: absolute;
  top: 5px;
  right: 0;
  height: 40px;
  @media (max-width: 1024px) {
    top: 3px;
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
  @media (max-width: 1024px) {
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
  font-size: var(--body-text);
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
  @media (max-width: 1024px) {
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
  width: 100%;
  padding: 1rem;
`;

const Section = styled.div`
  display: flex;
  width: calc(var(--desktop-container-width) * 3/4);
  margin-bottom: var(--article-spacing);
  &.bw {
    opacity: 0;
    transition: opacity 0.5s ease;
  }
  &.bw.active {
    opacity: 1;
  }
  &.figure {
    width: 50%;
  }
  @media (max-width: 1600px) {
    &.figure {
      width: 60%;
    }
  }
  @media (max-width: 1440px) {
    &.figure {
      width: 100%;
    }
  }
  @media (max-width: 1024px) {
    flex-direction: column;
    width: 100%;
  }
`;

const TextSection = styled.div`
  display: flex;
  opacity: 1;
  transition: opacity 0.5s ease;
  &.active {
    opacity: 1;
  }
  &.intro {
    width: 100%;
  }
  @media (max-width: 1024px) {
    flex-direction: column;
  }
`;

const InvertedTitle = styled.h1`
  color: var(--black);
  margin-bottom: var(--article-spacing);
  font-family: 'Satoshi';
  font-size: 4rem;
  font-weight: 600;
  @media (max-width: 1600px) {
    font-size: 3.5rem;
  }
  @media (max-width: 1024px) {
    font-size: 3rem;
  }
`;

const Figure = styled.div`
  width: 80%;
  margin-left: auto;
  margin-right: auto;
  margin-top: -5rem;
  margin-bottom: 5rem;
  text-align: center;
  & img, & video {
    margin-left: auto;
    margin-right: auto;
    max-width: 100%;
  }
  opacity: 1;
  transition: opacity 0.5s ease;
  &.active {
    opacity: 1;
  }
  @media (max-width: 1024px) {
    width: ;
  }
  @media (max-width: 1024px) {
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
  font-size: var(--body-text);
  font-weight: 600;
  color: #FF6281;
  transition: opacity 0.5s ease;
  @media (max-width: 1024px) {
    width: 100%;
    font-size: 1.2rem;
    padding: 1.5rem;
  }
`;

const Topic = styled.div`
  font-size: var(--body-text);
  font-family: 'Satoshi';
  display: flex;
  width: 66%;
  @media (max-width: 1024px) {
    width: calc(100% - 3rem);
    font-size: 1.2rem;
    padding: 1.5rem;
  }
`;

const BuiltWith = styled.div`
  font-size: var(--body-text);
  font-family: 'Satoshi';
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 66%;
  @media (max-width: 1024px) {
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
  width: var(--desktop-container-width);
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
  @media (max-width: 1024px) {
    width: 100%;
    align-content: flex-end;
  }
`;

const Action = styled.a`
  margin: 2rem;
  background-color: var(--accent-colour);
  width: 25%;
  text-align: center;
  font-size: var(--body-text);
  color: var(--offwhite);
  font-family: 'Satoshi';
  font-weight: 500;
  letter-spacing: 2px;
  text-decoration: none;
  padding: 3rem;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  & svg {
    margin-right: 1rem;
  }
  &:hover {
    background: var(--offwhite);
    color: var(--black);
  }
  @media (max-width: 1024px) {
    width: 100%;
    font-size: 2rem;
    margin: 1rem 5%;
  }
`;

const Caption = styled.span`
  margin-top: 3rem;
  overflow: visible;
  width: 100%;  
  display: block;
  font-size: var(--body-text);
  font-family: 'Satoshi';
  color: var(--black);
`;

const Project = ({ $isMobile, $isFirefox }) => {
  const { id } = useParams();

  const { data, loading, error } = use(
    `/slugify/slugs/work/` + id + `?populate=deep`
  );

  return (
    <Container
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    > 
      <Helmet>
        <title>Sumit Kukreja</title>
      </Helmet>
        <ProjectTitle titleText={data?.attributes.title} />
        <ProjectSplash />
    </Container>
  );

  /*return (
    <m.div
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
    <ProjectContainer as={ m.div} 
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
      <Helmet>      
        <title>{'Sumit Kukreja | ' + data?.attributes.title}</title>        
        <link rel="icon" type="image/png" href="/favicon.ico" />
      </Helmet>
      <ProjectTitle>{data?.attributes.title}</ProjectTitle>
      <Browser>
        <Window>
          <Buttons>
            <Button className='minimize'>{Icons['Minimize']}</Button>
            <Button className='maximize'>{Icons['Square']}</Button>
            <Button className='close'>{Icons['Close']}</Button>
          </Buttons>
        </Window>
        <Website style={{backgroundImage: "url(" + import.meta.env.VITE_APP_UPLOAD_URL + data?.attributes.cover.data.attributes.url + ")"}}></Website>
      </Browser>
      <ProjectInfo>
        <Article>
          <Section className='bw dark'>
            <Headers className='topic-header'>Built With</Headers>
            <BuiltWith>
              <StackComponents>
                {data?.attributes.technologies.data?.map((technology) => (
                  <ProjectTechnology key={technology.id}>{Icons[technology.attributes.name]} {technology.attributes.name}</ProjectTechnology>
                ))}
              </StackComponents>
            </BuiltWith>
          </Section>
          <Section>
            <TextSection className='dark intro'>
                <Headers className='topic-header'>Introduction</Headers>
                <Topic>
                  <TopicText>
                    {data?.attributes.summary}
                  </TopicText>
                </Topic>
              </TextSection>  
          </Section>
          {data?.attributes.article.map((topic, index) => {
            const isFigure = topic.__component === 'article.figure' || topic.__component === 'article.slides';
            const first = index === 0 ? 'active' : '';
            if (isFigure) {
              return (
                <Section key={topic.id} className='figure'>
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
                      <FigureMedia item={(topic.__component === 'article.figure' ? topic.figure.data : topic.images.data[0])} />
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
                  <Headers className='topic-header'>
                    {topic.header ? topic.header : ''}
                  </Headers>
                  <Topic>
                    {topic.__component === 'article.topic' ? (
                    <TopicText>
                      {topic.content}
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
            return <Action key={index} target='_blank' href={action.url}>{Icons[action.icon]}{action.name}</Action>;
          })}
        </ProjectLinks>
      </ProjectInfo>
    </ProjectContainer>
    <Footer />
    </m.div>
  )*/
}

export default Project