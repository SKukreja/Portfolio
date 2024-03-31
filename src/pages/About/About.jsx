import React, { useState } from 'react';
import use from '../../hooks/use';
import styled, { keyframes } from 'styled-components';
import { InView, useInView } from 'react-intersection-observer';
import { Icons } from '../../components/Common/Icons';
import { m } from 'framer-motion'
import { Helmet } from 'react-helmet-async';
import Footer from '../../components/Common/Footer';

const typewriter = keyframes`
  from { width: 0 }
  to { width: 100% }
`;

const blink = keyframes`
  from, to { border-color: white; }
  50% { border-color: white; }
`;

const Container = styled.div`
  display: flex;
  padding-top: var(--content-margin-top);
  flex-direction: column;
  align-items: center;
`;

const Bio = styled.div`
  display: flex;
  flex-direction: column;
  transition: filter 2s ease-in-out;
  filter: grayscale(1);
  text-align: center;
  align-items: center;
  &.active {
    filter: grayscale(0);
  }
`;

const ProfileImage = styled(m.img)`
  width: 40vmin;
  height: 40vmin;
  filter: drop-shadow(5px 5px 10px var(--black));
  border-radius: 30px;
`;

const Intro = styled.h1`  
  font-family: 'Satoshi';
  font-size: 4rem;
  overflow: hidden; 
  border-right: 0.3rem solid transparent; 
  white-space: nowrap;
  padding-right: 0.5rem;
  padding-left: 0.8rem;
  animation: 
    ${typewriter} 2s steps(20, end),
    ${blink} .75s step-end 3;
  @media (max-width: 1024px) {
    font-size: 1.5rem;
  }
`;

const SkillsContainer = styled.div`
  width: 50%;
  height: 100vh;
  transition: filter 2s ease-in-out;
  filter: grayscale(1);
  user-select: none;
  &.active {
    filter: grayscale(0);
  }
  @media (max-width: 1024px) {
    margin-bottom: 4rem;
    width: 100%;
  }
`;

const AboutContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const CurrentHeader = styled.h2`
font-family: 'Hind';
  font-size: 6rem;
  text-transform: uppercase;
  color: var(--accent-colour);
  letter-spacing: 0.1rem;
  width: 100%;
  text-align: center;
  margin-bottom: 4rem;
  @media (max-width: 1024px) {
    font-size: 1rem;
    letter-spacing: 0.03rem;
  }
`;

const Current = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const CurrentSection = styled.div`
  display: flex;
  flex-direction: column;
  padding: 4rem;
  align-items: center;
  font-size: 0.75rem;
  text-align: center;
  & p {    
    margin-top: 0;
  }
  @media (max-width: 1024px) {
    padding: 1rem;
    width: 50%;
  }
`;

const CurrentIcon = styled.div`
  font-size: 2.5rem;
  line-height: 1;
  color: var(--offwhite);
`;

const Blurb = styled.div`
  font-family: 'Satoshi';
  font-size: var(--body-text);
  text-align: left;
  width: 50vw;
  margin-bottom: 5rem;
  @media (max-width: 1024px) {
    font-size: 1rem;
    width: 85%;
  }
`;

const Description = styled.p`
  font-family: 'Satoshi';
  font-weight: 600;
  color: var(--offwhite);
`;

const LogoLink = styled.a`
  & svg {
    fill: white;
    width: 20vmin;
  }
  & img {
    width: 20vmin;
  }
`;

const Timeline = styled.div``;

const TimelineSection = styled.div`
  opacity: 0;
  transition: opacity 1s ease-in-out;
  &.active {
    opacity: 1;
  }
`;

const Line = styled.div`
  width: 1px;
  height: 300px;
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0), #c2bbf0);
  margin: 2rem auto;
  @media (max-width: 1024px) {
    height: 150px;
  }
`;

const Year = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const YearText = styled.h2`
  font-family: 'Satoshi';
  color: var(--accent-colour);
  letter-spacing: 0.1rem;
  font-weight: 700;
  font-size: 3rem;
  margin-top: 2rem;
  margin-bottom: 2rem;
  @media (max-width: 1024px) {
    margin-top: 0;
  }
`;

const SideBySide = styled.div`
  width: 80vmin;
  display: flex;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
`;

const LeftImage = styled.img`
  width: calc(50% - 2rem);
  padding: 1rem;
  border-radius: 30px;
`;

const RightText = styled.p`
  padding: 1rem;
  width: calc(50% - 2rem);
  font-family: 'Satoshi';
  font-size: var(--body-text);
  font-weight: 400;
`;

const ImageBelowText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 3rem;
`;

const CenterText = styled.div`
  text-align: center;
  margin-top: 0;
  width: 60vmin;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 0;
  font-family: 'Satoshi';
  padding: 0;
  font-size: var(--body-text);
  font-weight: 400;
  & svg {
    font-size: 4rem;
  }
  & > p:first-child {
    margin-top: -1rem;
  }
  & a, & a:visited {
    color: var(--accent-colour);
    text-decoration: none;
    font-weight: 600;
  }
  & a:hover {
    color: white;
  }
  @media (max-width: 1024px) {
    font-size: 1rem;
    width: 85%;
    & svg {
      font-size: 3rem;
    }
  }
`;

const BelowImage = styled.img`
  max-width: 50vmin;
  border-radius: 30px;
  padding: 1rem;
  &.three {
    width: 25vmin;    
  }
  @media (max-width: 1024px) {
    border-radius: 15px;
    max-width: 90%;
    padding: 0.5rem;
  }
`;

const ThreeImages = styled.div`
  display: flex;
`;

const FiveImages = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  grid-column-gap: 2rem;
  grid-row-gap: 2rem;
  padding: 1rem;
  @media (max-width: 1024px) {
    grid-column-gap: 1rem;
    grid-row-gap: 1rem;
  }
`;

const FiveImage = styled.img`
  border-radius: 30px;
  aspect-ratio: 4/3;
  height: calc(20vmin - 2rem);
  align-self: center;
  &.portrait {
    height: calc(40vmin - 2rem);
    aspect-ratio: 3/4;
    justify-self: center;
    grid-area: 1 / 2 / 3 / 3;
  }
  &.landscape1 {
    justify-self: right;
    grid-area: 1 / 1 / 2 / 2;
  }
  &.landscape2 {
    justify-self: right;
    grid-area: 2 / 1 / 3 / 2;
  }
  &.landscape3 {
    justify-self: left;
    grid-area: 1 / 3 / 2 / 4;
  }
  &.landscape4 {
    justify-self: left;
    grid-area: 2 / 3 / 3 / 4;
  }
  @media (max-width: 1024px) {
    border-radius: 15px;
    height: calc(20vmin - 1rem);
    &.portrait {
      height: calc(40vmin - 1rem);
    }
  }
`

const colors = ["#FFFFFF", "var(--offwhite)", "#AD5893"];

const options = {
  colors: ["#FFFFFF", "var(--offwhite)", "#AD5893"],
  fontFamily: "Satoshi",
  deterministic: true,
  randomSeed: "167", // 24, 46, 50
  enableTooltip: false,
  enableOptimizations: true,
  fontSizes: [8, 50],
  padding: 5,
  fontWeight: 900,
  rotations: 2,
  rotationAngles: [0, 90, 270],
  transitionDuration: 0
};

const callbacks = {
  getWordColor: (word) => (word.value > 150 ? "var(--accent-colour)" : colors[Math.floor(Math.random() * colors.length)]),
};

const About = () => {
  let currentYear = null;
  const [imageLoading, setImageLoading] = useState(true);

  const { data, loading, error } = use(
    `/about?populate=deep`
  );

  const imageLoaded = () => {
    setImageLoading(false);
  };

  if (error) return (
    <>{error}</>
  )
  return (
    <Container as={ m.div} 
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
        <title>Sumit Kukreja | About Me</title>                
        <link rel="icon" type="image/png" href="/favicon.ico" />         
      </Helmet>
      <InView>
      {({ inView, ref, entry }) => (
        <Bio ref={ref} className={`${inView ? 'active' : ''}`}>
          <ProfileImage 
          initial={{ opacity: 0 }}
          animate={{
            opacity: imageLoading ? 0 : 1
          }}
          transition={
            ({ opacity: { delay: 0, duration: 0.4 } })
          } 
          onLoad={imageLoaded} src={import.meta.env.VITE_APP_UPLOAD_URL + data?.attributes.picture.data.attributes.url} />
          <Intro>Hello, my name is Sumit.</Intro>
        </Bio>
      )}
      </InView>
      <InView>
      {({ inView, ref, entry }) => (
        <AboutContainer ref={ref} className={`${inView ? 'active' : ''}`}>
          <Current>
            <CurrentSection>
              <CurrentIcon>{Icons['Work']}</CurrentIcon>
              <Description>I currently work at</Description>
              <LogoLink href="https://www.kpmb.com">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 45.4">
                  <path d="M28.7 45.4L16.3 23.5 9.1 32v13.4H0V0h9.1v12.9c0 1.7-.1 5.8-.1 7.2.6-1 2.3-3.1 3.6-4.6L25.2 0h10.9L22.9 15.7l16.7 29.7H28.7zM66.8 8.8H56.3v11.7h10.6c4.2 0 6.5-1.9 6.5-5.9s-2.6-5.8-6.6-5.8m-.5 20.5h-10v16.1h-9.1V0H67c8.6 0 15.6 4.7 15.6 14.4.1 10.5-6.9 14.9-16.3 14.9M123.8 45.4V16.1l-12.3 20.1-12.2-20.1v29.3h-8.9V0h8.7l12.6 20.5L123.9 0h8.9v45.4M164.2 25h-12.1v11.7h12.1c4.4 0 6.5-2.3 6.5-5.9 0-3.8-2.1-5.8-6.5-5.8m-.5-16.6h-11.5V17h12c3.8 0 5.1-1.8 5.1-4.3-.1-2.8-1.7-4.3-5.6-4.3m.2 37h-20.6V0H164c8.8 0 14.4 4.2 14.4 12 0 3.9-1.8 7-4.8 8.8 3.6 1.6 6.3 4.9 6.3 9.9.1 9.6-6.3 14.7-16 14.7"></path>
                </svg>
              </LogoLink>
            </CurrentSection>
            <CurrentSection>
              <CurrentIcon>{Icons['Education']}</CurrentIcon>
              <Description>I'm enrolled part-time at</Description>
              <LogoLink href="https://www.eng.mcmaster.ca/sept/programs/degree-options/btech-software-engineering-technology/program-structure/">
              <img src="https://nursing.mcmaster.ca/images/default-source/default-album/ft_logo_mcmasterd99d0d45b7f266cc881aff0000960f99.png?sfvrsn=4" />
              </LogoLink>
            </CurrentSection>
          </Current>
          <Blurb>
            {data?.attributes.blurb}          
          </Blurb>
        </AboutContainer>
      )}
      </InView>
      <InView>
      {({ inView, ref, entry }) => (
        <SkillsContainer ref={ref} className={`${inView ? 'active' : ''}`}>

        </SkillsContainer>
      )}
      </InView>

      <AboutContainer>
        <CurrentHeader>My Story So Far</CurrentHeader>
        <Timeline>
        {data?.attributes.timeline.map((section, index) => {
          const year = new Date(section.date).getFullYear();

          // Display the year only if it's different from the current year
          const YearComponent = year !== currentYear && (
            <Year>
              <YearText>{year}</YearText>
            </Year>
          );

          // Update the current year
          currentYear = year;

          return (
              <InView key={`section-${index}`}>
              {({ inView, ref, entry }) => (
                <TimelineSection ref={ref} className={`${inView ? 'active' : ''}`}>
                  <Line></Line>
                  {YearComponent}
                  {section.__component === 'timeline.image-beside-text' ? (
                    <SideBySide>
                      <LeftImage src={import.meta.env.VITE_APP_UPLOAD_URL + section.image.data?.attributes.url} />
                      <RightText>{section.text}</RightText>
                    </SideBySide>
                  ) : 
                  section.__component === 'timeline.image-below-text' ? (
                    <ImageBelowText>
                      <CenterText>{section.type=="Personal" ? "" : Icons[section.type]}{section.text}</CenterText>
                      <BelowImage src={import.meta.env.VITE_APP_UPLOAD_URL + section.image.data?.attributes.url} />                    
                    </ImageBelowText>
                  ) : 
                  section.__component === 'timeline.text-above-three-images' ? (
                    <ImageBelowText>
                      <CenterText>{section.type=="Personal" ? "" : Icons[section.type]}{section.text}</CenterText>
                      <ThreeImages>
                      {section.images.data?.map((image, index) => (
                        <BelowImage key={image.id} className='three' src={import.meta.env.VITE_APP_UPLOAD_URL + image.attributes.url} />
                      ))}
                      </ThreeImages>
                    </ImageBelowText>
                  ) : 
                  section.__component === 'timeline.text-above-5-images' ? (
                    <ImageBelowText>
                      <CenterText>{section.type=="Personal" ? "" : Icons[section.type]}{section.text}</CenterText>
                      <FiveImages>
                      {section.images.data?.map((image, index) => (
                        <FiveImage key={image.id} className={index == 0 ? ' portrait' : ' landscape' + index} src={import.meta.env.VITE_APP_UPLOAD_URL + image.attributes.url} />
                      ))}
                      </FiveImages>                              
                    </ImageBelowText>
                  ) : 
                  section.__component === 'timeline.event' ? (
                    <CenterText>{section.type=="Personal" ? "" : Icons[section.type]}{section.text}</CenterText>
                  ) : ("")}
                </TimelineSection>
              )}
              </InView>
          );
        })}
        </Timeline>
      </AboutContainer>
      <Footer />
    </Container>
  )
}

export default About