import React from 'react';
import { m } from 'framer-motion';
import styled from 'styled-components';
import AnimatedText from './AnimatedText';
import { Icons } from '../Common/Icons';
import ScrollButton from '../Common/ScrollButton'

// background-image: url('bg.png');
const Scene = styled(m.div)`  
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 50vw;
  height: 100vh;
  height: 100svh;
  position: relative;
  overflow: visible;
  display: flex;
  align-items: center;
  z-index: 2;
  @media (max-width: 1024px) {
    width: 100%;    
    align-items: flex-start;
    margin-top: 0;
  }
`;

const Intro = styled.h2`
  font-family: var(--body-font);
  font-weight: var(--body-weight);
  font-size: var(--body-text);
  margin-top: 0;
  margin-bottom: 0;
  color: var(--black);
  @media (max-width: 1024px) {                
    margin-left: 0;
  }
`;

const SceneText = styled(m.div)`
  position: relative;
  height: 50%;
  width: var(--desktop-container-width);
  max-width: 40vw;
  margin-left: 100px;
  text-align: left;
  padding-right: 6rem;
  padding-top: 6rem;
  padding-bottom: 6rem;
  z-index: 1;
  display: flex;
  letter-spacing: 1px;
  white-space: normal; 
  overflow-wrap: break-word; 
  justify-content: center;
  flex-direction: column;
  &::before {
    content: "";
    position: absolute;
    top: -30%;
    opacity: 1;
    height: 180%;
    width: 100%;
    left: 0%;  
    background: -webkit-radial-gradient(var(--offwhite) 0%,transparent 70%),
                -webkit-radial-gradient(var(--offwhite) 0%,transparent 70%),
                -webkit-radial-gradient(var(--offwhite) 0%,transparent 70%),
                -webkit-radial-gradient(var(--offwhite) 0%,transparent 60%),  
                -webkit-radial-gradient(var(--offwhite) 0%,transparent 50%);
    background: radial-gradient(var(--offwhite) 0%,transparent 70%),
                radial-gradient(var(--offwhite) 0%,transparent 70%),
                radial-gradient(var(--offwhite) 0%,transparent 70%),
                radial-gradient(var(--offwhite) 0%,transparent 60%),
                radial-gradient(var(--offwhite) 0%,transparent 50%);
    z-index: -1;
  }
  @media (max-width: 1024px) {
    padding: var(--default-spacing);
    width: calc(100% - var(--default-spacing) * 2);
    margin-top: calc(var(--default-spacing));
    margin-left: auto;
    margin-right: auto;
    max-width: 100%;
    justify-content: flex-start;
    &::before {
      background: transparent;
    }
  }
`;

const ActionButtons = styled(m.div)`
  pointer-events: none;
  display: flex;
  width: 100%;
  justify-content: flex-start;
  @media (max-width: 1024px) {
    margin-top: 25vh;
    margin-top: 25svh;
    flex-direction: column;
    margin-top: var(--default-spacing);
  }  
`;

const Button = styled(ScrollButton)` 
  pointer-events: all;
  text-decoration: none;
  margin: var(--default-spacing);
  font-family: var(--body-font);
  font-size: var(--body-text);
  letter-spacing: 1px;
  font-weight: bold;  
  color: var(--black);
  opacity: 1;
  transition: all 0.2s ease;
  &:hover {
    color: var(--interact-hover-color);
  }
  & svg {
    margin-right: 1rem;
    width: 2rem;
    transition: margin 0.5s ease;
  }
  & p {
    display: flex;
    align-items: center;  
  }
  @media (max-width: 1024px) {
    margin: 0;
    margin-right: var(--default-spacing);
  }
`;

const NameContainer = styled(m.div)`
  width: 100%;
  max-width: 1440px;
  margin-top: 1rem;
  margin-bottom: 1rem;  
`;

const NameSvg = styled(m.svg)`
`;

function Landing({ $isMobile }) {
  return (
    <Scene>
      <SceneText>
        <Intro><AnimatedText text="Hi, my name is" /></Intro>
        <NameContainer>
        <NameSvg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 -2 732.91 138.98">
          <m.path initial={{ strokeDasharray: 1000, strokeDashoffset: 1000, fill: "rgba(18, 21, 24, 0)" }} animate={{ strokeDashoffset: 0, fill: "rgba(18, 21, 24, 1)" }} transition={{ duration: 4, ease: "easeInOut", delay: 1 }} className="name-path" d="M432.04,134.98c-4.09-1.17-8.29-2.03-12.24-3.55-12.82-4.93-22.19-14.11-28.62-25.87-6.01-11-10.83-22.64-16.17-34.01-.68-1.46-1.28-2.95-2.05-4.73-3.72,3.77-5.61,7.52-5.4,12.64.37,9.31.1,18.65.11,27.97.01,9.36.32,9.89,8.61,14.23h-32.15c8.75-1.67,7.97-8.41,7.95-14.94-.07-28.81-.16-57.62.06-86.43.05-6.89-.5-12.73-8.57-14.89h32.02c-9.09,2.11-7.92,9.4-7.93,16.12,0,13.94,0,27.89,1,42.23,3.1-4.35,6.21-8.69,9.29-13.04,8.06-11.39,16.13-22.78,24.16-34.2,4.25-6.05,4.18-6.46-1.51-11.1h22.47c-11.25,2.46-15.59,12.32-21.51,20.48-5.96,8.2-11.84,16.45-17.54,24.82-.92,1.35-1.49,3.8-.91,5.19,7.67,18.23,15.81,36.27,28.52,51.67,8.45,10.23,18.17,19.03,31.8,21.89,2.39.5,4.87.62,7.82,2.13-2.74,1.14-5.48,2.28-8.23,3.42h-11Z" style={{ strokeWidth: "1px", stroke: "#121518" }} />
          <m.path initial={{ strokeDasharray: 1000, strokeDashoffset: 1000, fill: "rgba(18, 21, 24, 0)" }} animate={{ strokeDashoffset: 0, fill: "rgba(18, 21, 24, 1)" }} transition={{ duration: 4, ease: "easeInOut", delay: 1 }} className="name-path" d="M48,0c5.25,1.17,10.56,2.14,15.72,3.61,1.56.44,3.61,2.05,3.91,3.46,1.13,5.17,1.77,10.46,2.23,15.74.11,1.25-1.24,2.63-1.92,3.95-1.02-.98-2.56-1.78-2.98-2.97-3.06-8.63-7.95-15.48-17.5-17.25-18.02-3.35-29.94,5.91-27.42,22.84,1.16,7.78,6.54,12.93,12.67,17.12,7.12,4.88,14.75,9.04,21.73,14.1,12.59,9.13,19.38,21.05,16.69,37.26-2.19,13.14-12.82,23.48-27.23,26.07-10.71,1.93-21.07.64-31.42-2.49-5.81-1.75-8.88-5.04-9.54-11.05-.64-5.88-1.69-11.72-2.56-17.57.52-.39,1.04-.79,1.57-1.18,1.15.93,2.7,1.64,3.37,2.83,2.01,3.6,3.32,7.62,5.52,11.08,6.95,10.94,19.47,16.08,31.44,13.16,19.83-4.84,19.83-28.78,9.11-38.62-6.67-6.12-14.86-10.54-22.08-16.11-5.48-4.23-11.45-8.34-15.52-13.77C-1.55,29.75,10.39,3.69,35.89.96c1.06-.11,2.08-.63,3.11-.96,3,0,6,0,9,0Z" style={{ strokeWidth: "1px", stroke: "#121518" }} />
          <m.path initial={{ strokeDasharray: 1000, strokeDashoffset: 1000, fill: "rgba(18, 21, 24, 0)" }} animate={{ strokeDashoffset: 0, fill: "rgba(18, 21, 24, 1)" }} transition={{ duration: 4, ease: "easeInOut", delay: 1 }} className="name-path" d="M194.72,103.42h-24.05c6.88-2.9,6.44-7.68,6.39-12.45-.11-10.82.12-21.65-.09-32.47-.17-8.66-8.06-13.14-15.33-9-2.49,1.42-3.77,3.19-3.72,6.36.21,12.15.05,24.31.1,36.46.02,6.11.69,7.36,5.48,11.03h-20.04c1.13-3.53,3.16-7.09,3.27-10.72.4-13.14.16-26.3.15-39.46,0-4.34-.92-8.2-6.96-10.48h17.76c.19,1.58.38,3.16.43,3.52,5.05-1.45,10.03-3.33,15.17-4.23,5.83-1.03,10.22,1.92,13.76,7.49,4.33-5.75,9.97-8.09,16.92-7.65,6.6.42,10.66,3.2,11.99,9.74,2.85,13.93,5.37,27.92,8.06,41.88.41,2.11.91,4.2,1.5,6.27,1.65,5.82,3.22,6.81,9.15,5.9-2.09,7.44-9.34,10.17-14.48,4.7-3.32-3.53-5.91-8.52-6.96-13.26-2.97-13.4-4.8-27.05-7.45-40.53-1.65-8.41-9.32-11.42-15.62-6.41-.99.79-1.92,2.38-1.92,3.6.02,12.63.25,25.25.4,37.88.05,4.47-.02,8.98,6.08,11.81Z" style={{ strokeWidth: "1px", stroke: "#121518" }} />
          <m.path initial={{ strokeDasharray: 1000, strokeDashoffset: 1000, fill: "rgba(18, 21, 24, 0)" }} animate={{ strokeDashoffset: 0, fill: "rgba(18, 21, 24, 1)" }} transition={{ duration: 4, ease: "easeInOut", delay: 1 }} className="name-path" d="M503.97,42.64h21.16c-11.56,4.76-17.55,13.7-24.52,22.63,11.11,11.86,16.35,28.3,30.46,38.01h-26.19c1.76-1.32,4.09-2.19,4.4-3.53.36-1.56-.72-3.73-1.71-5.29-4.37-6.84-8.94-13.55-13.45-20.33-6.83,5.24-5.59,24.88,2.18,29.1h-22.91c6.52-3.04,5.69-8.27,5.68-13.29-.03-22.48-.11-44.96.07-67.43.04-4.56-1.12-7.7-5.71-9.32h16.48v55.29c.46.25.92.5,1.37.75,5.47-6.87,11.09-13.64,16.18-20.78.51-.72-2.18-3.72-3.48-5.8Z" style={{ strokeWidth: "1px", stroke: "#121518" }} />
          <m.path initial={{ strokeDasharray: 1000, strokeDashoffset: 1000, fill: "rgba(18, 21, 24, 0)" }} animate={{ strokeDashoffset: 0, fill: "rgba(18, 21, 24, 1)" }} transition={{ duration: 4, ease: "easeInOut", delay: 1 }} className="name-path" d="M730.04,103.24c-8.27,1.72-13.21.82-14.5-3.31-10.42,4.9-20.95,7.38-30.27-1.81-4.99-4.92-5.89-14.34-2.51-19.93,7.8-12.9,19.59-13.78,32.58-10.07,2.41-11.07-1.21-19.8-8.55-21.12-11.42-2.05-17.54,2.21-19.74,13.49-1-4.25-2-8.49-3.07-13.04,9.65-4.37,19.39-7.05,29.88-4.58,8.32,1.96,13.08,7.79,13.22,16.33.19,11.14-.15,22.3.23,33.43.12,3.57,1.78,7.09,2.73,10.62ZM716.06,83.19c0-2.82.2-5.67-.1-8.46-.13-1.19-1.04-2.86-2.04-3.3-5.89-2.59-13.26-1.08-16.94,3.16-4.46,5.14-5.15,13.23-1.61,19.03,3.01,4.95,7.34,6.79,12.55,5.34,6.52-1.81,8.14-3.96,8.14-10.8,0-1.66,0-3.32,0-4.98Z" style={{ strokeWidth: "1px", stroke: "#121518" }} />
          <m.path initial={{ strokeDasharray: 1000, strokeDashoffset: 1000, fill: "rgba(18, 21, 24, 0)" }} animate={{ strokeDashoffset: 0, fill: "rgba(18, 21, 24, 1)" }} transition={{ duration: 4, ease: "easeInOut", delay: 1 }} className="name-path" d="M107.78,43.57c4.6-5.51,9.64-5.96,14.79-1.47,5.24,4.57,7.13,10.72,7.91,17.21,1.52,12.74,1.25,25.26-7.12,36.05-6.95,8.96-20.69,11.69-30.55,5.97-6.8-3.94-8.57-10.72-8.74-17.91-.24-10.48-.08-20.97-.06-31.46,0-4.12-.96-7.71-5.6-9.87h16.24c0,5.76-.04,11.34,0,16.92.09,9.98.16,19.96.36,29.94.13,6.26,3.86,10,10.65,10.97,6.74.96,10.66-1.29,12.29-7.89,3.37-13.73,2.86-27.61.83-41.49-.02-.16-.12-.31-.16-.47-2.16-7.34-4.07-8.49-10.84-6.5Z" style={{ strokeWidth: "1px", stroke: "#121518" }} />
          <m.path initial={{ strokeDasharray: 1000, strokeDashoffset: 1000, fill: "rgba(18, 21, 24, 0)" }} animate={{ strokeDashoffset: 0, fill: "rgba(18, 21, 24, 1)" }} transition={{ duration: 4, ease: "easeInOut", delay: 1 }} className="name-path" d="M411.09,42.1h16.07c0,1.98-.03,3.75,0,5.51.28,13.97.42,27.95.91,41.92.22,6.27,4.39,9.83,11.12,10.43,6.62.59,10.18-1.5,11.72-8.06,3.23-13.75,3.29-27.71.58-41.53-1.54-7.87-3.72-8.77-10.96-6.74,5.13-5.87,10.57-6.03,16-.61,5.18,5.17,6.56,11.95,7.28,18.65,1,9.29.28,18.55-3.6,27.35-5.86,13.26-20.65,19.03-33.66,12.76-6.98-3.37-9.19-9.89-9.44-16.92-.38-10.82-.12-21.65-.19-32.48-.03-4.04-.58-7.9-5.82-10.29Z" style={{ strokeWidth: "1px", stroke: "#121518" }}/>
          <m.path initial={{ strokeDasharray: 1000, strokeDashoffset: 1000, fill: "rgba(18, 21, 24, 0)" }} animate={{ strokeDashoffset: 0, fill: "rgba(18, 21, 24, 1)" }} transition={{ duration: 4, ease: "easeInOut", delay: 1 }} className="name-path" d="M637.11,81.01c.11,1.77.74,3.71.23,5.27-6.18,19.05-31.19,23.92-44.75,8.63-12.37-13.95-11.58-36.92,4.83-48.78,11.08-8.01,31.05-6.22,38.11,11.31,1.61,3.99-.92,5.04-3.55,6.18-9.72,4.18-19.41,8.44-29.25,12.34-3.41,1.35-4.55,2.97-2.72,6.2,1.95,3.44,3.5,7.27,6.09,10.15,7.81,8.69,20.01,7.28,25.94-2.78,1.55-2.63,2.56-5.58,3.82-8.38.42-.04.84-.09,1.26-.13ZM596.32,73.68l2.07.73c6.49-3.11,13.02-6.14,19.47-9.34,6.95-3.44,7.24-4.6,3.32-11.24-.59-.99-1.2-1.99-1.93-2.88-3.46-4.23-8.01-5.74-13.27-4.78-4.85.89-9.43,5.45-9.83,10.59-.43,5.6.07,11.28.16,16.92Z" style={{ strokeWidth: "1px", stroke: "#121518" }} />
          <m.path initial={{ strokeDasharray: 1000, strokeDashoffset: 1000, fill: "rgba(18, 21, 24, 0)" }} animate={{ strokeDashoffset: 0, fill: "rgba(18, 21, 24, 1)" }} transition={{ duration: 4, ease: "easeInOut", delay: 1 }} className="name-path" d="M657.54,42.11h12.38c.26,2.06.72,4.12.74,6.17.18,15.48.48,30.97.29,46.45-.11,8.55-2.25,16.61-7.49,23.78-7.09,9.71-20.14,9.03-27.81,4.68-.83-.47-1.64-2.17-1.44-3.08.84-3.78,2.08-7.48,3.43-12.11.35,2.98.36,5,.86,6.9,1.24,4.75,4.4,7.35,9.37,7.33,4.78-.02,8.58-2.04,9.8-6.85,1.17-4.63,2.2-9.43,2.26-14.17.23-16.99.14-33.98-.12-50.97-.04-2.76-1.51-5.5-2.3-8.15Z" style={{ strokeWidth: "1px", stroke: "#121518" }} />
          <m.path initial={{ strokeDasharray: 1000, strokeDashoffset: 1000, fill: "rgba(18, 21, 24, 0)" }} animate={{ strokeDashoffset: 0, fill: "rgba(18, 21, 24, 1)" }} transition={{ duration: 4, ease: "easeInOut", delay: 1 }} className="name-path" d="M538.37,42.13h16.47v15.78c.37.2.73.4,1.1.6,3.96-7.8,8.58-14.88,18.17-17.6,1.21,6.14,2.4,12.13,3.58,18.13-4.28-5.94-9.36-6.74-15.16-2.1-5.56,4.45-6.9,10.82-7.29,17.35-.37,6.31-.51,12.69.09,18.96.32,3.35,2.4,6.53,3.59,9.54h-19.26c4.81-2.72,5.31-6.96,5.29-11.5-.06-11.99-.11-23.98.02-35.97.06-5.62-.1-10.93-6.6-13.21Z" style={{ strokeWidth: "1px", stroke: "#121518" }} />
          <m.path initial={{ strokeDasharray: 1000, strokeDashoffset: 1000, fill: "rgba(18, 21, 24, 0)" }} animate={{ strokeDashoffset: 0, fill: "rgba(18, 21, 24, 1)" }} transition={{ duration: 4, ease: "easeInOut", delay: 1 }} className="name-path" d="M262.74,41.77c9.8-.27,13.61-7.88,19.11-15.54v15.46h17.22c-.02.6-.03,1.21-.05,1.81h-17.02v5.98c0,11.98,0,23.97,0,35.95,0,.83-.02,1.67.01,2.5.37,9.33,4.1,11.83,12.42,8.31-1.98,5.13-6.87,7.51-13.95,6.8-4.61-.46-8.3-3.76-8.46-8.85-.45-14.46-.47-28.93-.64-43.39-.03-2.11,0-4.22,0-6.59-3.23-.18-5.83-.32-8.43-.47-.07-.66-.15-1.32-.22-1.98Z" style={{ strokeWidth: "1px", stroke: "#121518" }} />
          <m.path initial={{ strokeDasharray: 1000, strokeDashoffset: 1000, fill: "rgba(18, 21, 24, 0)" }} animate={{ strokeDashoffset: 0, fill: "rgba(18, 21, 24, 1)" }} transition={{ duration: 4, ease: "easeInOut", delay: 1 }} className="name-path" d="M250.66,42.18c0,11.55,0,22.51,0,33.48,0,5.5.01,11,0,16.5-.01,4.38-.08,8.77,5.15,10.7h-19.16c1.07-3.23,3.14-6.75,3.24-10.32.4-13.48.08-26.99.21-40.48.04-4.23-.56-7.86-6.57-9.88h17.14Z" style={{ strokeWidth: "1px", stroke: "#121518" }} />
          <m.path initial={{ strokeDasharray: 1000, strokeDashoffset: 1000, fill: "rgba(18, 21, 24, 0)" }} animate={{ strokeDashoffset: 0, fill: "rgba(18, 21, 24, 1)" }} transition={{ duration: 4, ease: "easeInOut", delay: 1 }} className="name-path" d="M664.57,18.01c3.99,0,6.7,2.81,6.77,7,.07,4.03-2.68,6.89-6.7,6.98-4.16.1-7.25-3.01-7.14-7.19.1-3.89,3.13-6.8,7.07-6.8Z" style={{ strokeWidth: "1px", stroke: "#121518" }} />
          <m.path initial={{ strokeDasharray: 1000, strokeDashoffset: 1000, fill: "rgba(18, 21, 24, 0)" }} animate={{ strokeDashoffset: 0, fill: "rgba(18, 21, 24, 1)" }} transition={{ duration: 4, ease: "easeInOut", delay: 1 }} className="name-path" d="M244.68,18.89c4.22-.06,7.26,2.86,7.17,6.9-.07,3.45-3.53,6.59-7.33,6.65-3.43.05-6.88-3.44-6.99-7.08-.11-3.68,2.92-6.41,7.14-6.47Z" style={{ strokeWidth: "1px", stroke: "#121518" }} />
        </NameSvg>
        </NameContainer>
        <Intro><AnimatedText text="I'm a full-stack developer with a passion for creating unique digital experiences." /></Intro>
        <ActionButtons initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 2 }}>
          <Button $isMobile={$isMobile} to={"#featured-works"}><p>{Icons["Arrow Right"]} View my work</p></Button>
          <Button $isMobile={$isMobile} to={"#about"}><p>{Icons["Arrow Right"]} More about me</p></Button>
        </ActionButtons>      
      </SceneText>
    </Scene>
  );
}

export default Landing;
