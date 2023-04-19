import React from 'react'
import use from '../../hooks/use';
import styled, { keyframes } from 'styled-components';
import { InView, useInView } from 'react-intersection-observer';
import ReactWordcloud from 'react-wordcloud';
import { Icons } from '../../components/Common/Icons';

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
  padding-top: 200px;
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
  & span {
    animation: ${hueRotate} 18s linear infinite;
  }
`;

const ProfileImage = styled.img`
  width: 40vmin;
  height: 40vmin;
  filter: drop-shadow(5px 5px 10px #080708);
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
`;

const SkillsContainer = styled.div`
  width: 100%;
  height: 100vh;
  transition: filter 2s ease-in-out;
  filter: grayscale(1);
  user-select: none;
  &.active {
    filter: grayscale(0);
  }
  & > .words svg text:first-child {
    animation: ${hueRotate} 18s linear infinite;
  }
`;

const AboutContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const CurrentHeader = styled.h2`
  font-family: 'Poppins';
  font-size: 1.5rem;
  text-transform: uppercase;
  color: #504CCF;
  letter-spacing: 0.1rem;
  animation: ${hueRotate} 18s linear infinite;
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
`;

const CurrentIcon = styled.div`
  font-size: 2.5rem;
  color: #C2BBF0;
`;

const Blurb = styled.div`
  font-family: 'Satoshi';
  font-size: 2rem;
  text-align: center;
  width: 75vmin;
  margin-bottom: 5rem;
`;

const Description = styled.p`
  font-family: 'Satoshi';
  font-weight: 600;
  color: #C2BBF0;
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

const TimelineSection = styled.div``;

const Line = styled.div`
  margin: 2rem auto;
  width: 1px;
  height: 200px;
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0), #c2bbf0);
`;

const Year = styled.div`
  margin-top: -2rem;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const YearText = styled.h2`
  font-family: 'Poppins';
  color: #504CCF;
  letter-spacing: 0.1rem;
  font-weight: 700;
  font-size: 3rem;
  animation: ${hueRotate} 18s linear infinite;
  margin-top: 0.5rem;
  margin-bottom: 2rem;
`;

const SideBySide = styled.div`
  width: 80vmin;
  display: flex;
  align-items: center;
`;

const LeftImage = styled.img`
  width: 50%;
  padding: 1rem;
  border-radius: 30px;
`;

const RightText = styled.p`
  padding: 1rem;
  width: 50%;
  font-family: 'Satoshi';
  font-size: 2rem;
  font-weight: 400;
`;

const ImageBelowText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CenterText = styled.p`
  text-align: center;
  margin-top: 0;
  width: 60vmin;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 1rem;
  font-family: 'Satoshi';
  font-size: 2rem;
  font-weight: 400;
`;

const BelowImage = styled.img`
  width: 50vmin;
  border-radius: 30px;
  padding: 1rem;
  &.three {
    width: 25vmin;    
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
`

const colors = ["#FFFFFF", "#F1E3F3", "#C2BBF0"];

const options = {
  colors: ["#FFFFFF", "#F1E3F3", "#C2BBF0"],
  fontFamily: "Satoshi",
  deterministic: true,
  randomSeed: "167", // 24, 46, 50
  enableTooltip: false,
  enableOptimizations: true,
  fontSizes: [8, 70],
  padding: 5,
  fontWeight: 900,
  rotations: 2,
  rotationAngles: [0, 90, 270],
  transitionDuration: 1000
};

const callbacks = {
  getWordColor: (word) => (word.value > 150 ? "#504CCF" : colors[Math.floor(Math.random() * colors.length)]),
};

const About = () => {
  let currentYear = null;

  const { data, loading, error } = use(
    `/about?populate=deep`
  );

  if (error) return (
    <>{error}</>
  )
  return (
    <Container>
      <InView>
      {({ inView, ref, entry }) => (
        <Bio ref={ref} className={`${inView ? 'active' : ''}`}>
          <ProfileImage src={import.meta.env.VITE_APP_UPLOAD_URL + data?.attributes.picture.data.attributes.url} />
          <Intro>Hello, my name is Sumit.</Intro>
        </Bio>
      )}
      </InView>
      <InView>
      {({ inView, ref, entry }) => (
        <AboutContainer ref={ref} className={`${inView ? 'active' : ''}`}>
          <CurrentHeader>A Little About Me</CurrentHeader>
          <Current>
            <CurrentSection>
              <CurrentIcon>{Icons['Work']()}</CurrentIcon>
              <Description>I currently work at</Description>
              <LogoLink href="https://www.kpmb.com">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 45.4">
                  <path d="M28.7 45.4L16.3 23.5 9.1 32v13.4H0V0h9.1v12.9c0 1.7-.1 5.8-.1 7.2.6-1 2.3-3.1 3.6-4.6L25.2 0h10.9L22.9 15.7l16.7 29.7H28.7zM66.8 8.8H56.3v11.7h10.6c4.2 0 6.5-1.9 6.5-5.9s-2.6-5.8-6.6-5.8m-.5 20.5h-10v16.1h-9.1V0H67c8.6 0 15.6 4.7 15.6 14.4.1 10.5-6.9 14.9-16.3 14.9M123.8 45.4V16.1l-12.3 20.1-12.2-20.1v29.3h-8.9V0h8.7l12.6 20.5L123.9 0h8.9v45.4M164.2 25h-12.1v11.7h12.1c4.4 0 6.5-2.3 6.5-5.9 0-3.8-2.1-5.8-6.5-5.8m-.5-16.6h-11.5V17h12c3.8 0 5.1-1.8 5.1-4.3-.1-2.8-1.7-4.3-5.6-4.3m.2 37h-20.6V0H164c8.8 0 14.4 4.2 14.4 12 0 3.9-1.8 7-4.8 8.8 3.6 1.6 6.3 4.9 6.3 9.9.1 9.6-6.3 14.7-16 14.7"></path>
                </svg>
              </LogoLink>
            </CurrentSection>
            <CurrentSection>
              <CurrentIcon>{Icons['Education']()}</CurrentIcon>
              <Description>I'm studying Software Engineering at</Description>
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
          <ReactWordcloud className='words' words={data?.attributes.words} callbacks={callbacks} options={options} />
        </SkillsContainer>
      )}
      </InView>

      <AboutContainer>
        <CurrentHeader>My Story So Far</CurrentHeader>
        <Timeline>
        {data?.attributes.timeline.map((section) => {
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
              <InView key={section.id}>
              {({ inView, ref, entry }) => (
                <TimelineSection ref={ref} className={`${inView ? 'active' : ''}`}>
                  <Line></Line>
                  {YearComponent}
                  {section.__component === 'timeline.image-beside-text' ? (
                    <SideBySide>
                      <LeftImage src={import.meta.env.VITE_APP_UPLOAD_URL + section.image.data?.attributes.url} />
                      <RightText>{Icons[section.type]()}<br />{section.text}</RightText>
                    </SideBySide>
                  ) : 
                  section.__component === 'timeline.image-below-text' ? (
                    <ImageBelowText>
                      <CenterText>{Icons[section.type]()}<br />{section.text}</CenterText>
                      <BelowImage src={import.meta.env.VITE_APP_UPLOAD_URL + section.image.data?.attributes.url} />                    
                    </ImageBelowText>
                  ) : 
                  section.__component === 'timeline.text-above-three-images' ? (
                    <ImageBelowText>
                      <CenterText>{Icons[section.type]()}<br />{section.text}</CenterText>
                      <ThreeImages>
                      {section.images.data?.map((image, index) => (
                        <BelowImage key={index} className='three' src={import.meta.env.VITE_APP_UPLOAD_URL + image.attributes.url} />
                      ))}
                      </ThreeImages>
                    </ImageBelowText>
                  ) : 
                  section.__component === 'timeline.text-above-5-images' ? (
                    <ImageBelowText>
                      <CenterText>{Icons[section.type]()}<br />{section.text}</CenterText>
                      <FiveImages>
                      {section.images.data?.map((image, index) => (
                        <FiveImage key={index} className={index == 0 ? ' portrait' : ' landscape' + index} src={import.meta.env.VITE_APP_UPLOAD_URL + image.attributes.url} />
                      ))}
                      </FiveImages>                              
                    </ImageBelowText>
                  ) : 
                  section.__component === 'timeline.event' ? (
                    <CenterText>{Icons[section.type]()}<br />{section.text}</CenterText>
                  ) : ("")}
                </TimelineSection>
              )}
              </InView>
          );
        })}
        </Timeline>
      </AboutContainer>
    </Container>
  )
}

export default About