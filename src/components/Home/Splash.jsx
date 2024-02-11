import React, { useRef, useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import styled, { css, keyframes } from 'styled-components';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { set } from 'react-ga';

gsap.registerPlugin(ScrollTrigger);

const Scene = styled(motion.div)`  
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  margin-left: -20vw;
  margin-right: 100px;
  width: 100vh;
  height: 100vh;
  position: relative;
  display: flex;
  will-change: transform;
  align-items: center;
  z-index: 1;
  transform: ${(props) => Number(props.isInView) > 0 ? `translateX(calc(${Number(props.number) - 1} * -2rem))` : `translateX(0)))`};
  @media (max-width: 768px) {
    transform: ${(props) => Number(props.isInView) > 0 ? `translateY(calc(${Number(props.number) - 1} * 0rem))` : `translateY(0)))`};
    margin-left: -90vw;
    margin-top: -60vh;
    width: 200vw;
    height: 200vw;
  }
`;

const Image = styled.svg`
  width: auto;
  position: relative;
  height: 120vh;
  object-fit: cover;  
  @media (max-width: 768px) {    
    width: 140%;
    height: auto;
    aspect-ratio: 4/3;
  }
`;

const BG = styled.video`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  width: calc(100svh * 16/9);
  height: 100svh;
  width: calc(100vh * 16/9);
  height: 100vh;
  aspect-ratio: 16/9;
  z-index: 1;
  mask: url(#circleMask6);
`;

const Spin = keyframes`
  0% {
    transform: rotate(0deg);    
  }
  100% {
    transform: rotate(360deg);    
  }
`;

const Frame = styled.svg`
  position: absolute;
  top: 0;
  right: 0;  
  margin-left: auto;
  margin-right: auto;
  margin-top: auto;
  margin-bottom: auto;  
  bottom: 0;
  transform-origin: center;
  left: 0;
  z-index: 2;
  width: 100vh;
  height: 100vh;  
  @media (max-width: 768px) {
    width: calc(100% * 4/3 * 1.05);      
  }
`;

function Splash({ customScroll }) {
  const controls = useAnimation();
  const thresholds = Array.from({ length: 101 }, (_, index) => index * 0.01);
  const [ref, inView, entry] = useInView({
    threshold: thresholds
  });
  const video = useRef(null); // Ref for the image container
  const [displacementScale, setDisplacementScale] = useState(1);
  const [blurStdDeviation, setBlurStdDeviation] = useState(1);
  const introStartRadius = 0; // Starting radius for the intro animation
  const [circleRadius, setCircleRadius] = useState(introStartRadius);
  const [animationCompleted, setAnimationCompleted] = useState(false);
  const [isPulsing, setIsPulsing] = useState(true);
  const [pulsingDirection, setPulsingDirection] = useState(true);
  const [lastFrameTime, setLastFrameTime] = useState(Date.now());
  const [lastSecond, setLastSecond] = useState(Date.now());
  const [frames, setFrames] = useState(0);
  // Target FPS for throttling the animation
  const targetFPS = 30; // You can adjust this value based on your needs
  const frameDuration = 1000 / targetFPS;
  const previousBaseRadiusRef = useRef(500 * entry?.intersectionRatio);
  const svgVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1 } }
  };

  const easeInOut = (t) => {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  };

  const lerp = (start, end, alpha) => {
    const easedAlpha = easeInOut(alpha);
    return start * (1 - easedAlpha) + end * easedAlpha;
  };

  useEffect(() => {
    controls.start("visible");
  }, [controls]);

  // Combined Intro and Pulsing Animation
  useEffect(() => {
    let animationFrameId;

    const animate = () => {
      const now = Date.now();
      const elapsed = now - lastFrameTime;
      // Console log the frame rate
      setFrames(frames + 1);      
      if (now - lastSecond >= 1000) {        
        setLastSecond(now);
        setFrames(0); // Reset frame count for the next second
      }

      if (elapsed > frameDuration) 
      {
        setLastFrameTime(now - (elapsed % frameDuration));
        if (inView) 
        {
          const visibility = entry.intersectionRatio * 3;
          const baseRadius = 200 * visibility + 150;
          let newRadius = circleRadius;
          let direction = pulsingDirection;              

          if (!animationCompleted)
          {
            // Apply easing: The closer newRadius is to baseRadius, the smaller the increment
            const increment = (baseRadius - newRadius) * 0.03; // 0.1 is the easing factor
    
            newRadius += increment;
            if (newRadius >= baseRadius - 10) 
            {
              setAnimationCompleted(true);
              setIsPulsing(true);
              setPulsingDirection(true);
            }
          } 
          else 
          {
            const pulsingRange = 12;
            const minRadius = Math.max(baseRadius - pulsingRange, 0);
            const maxRadius = baseRadius + pulsingRange;
            const targetRadius = direction ? maxRadius : minRadius;
    
            newRadius = lerp(newRadius, targetRadius, 0.05);
    
            if (Math.abs(newRadius - targetRadius) < 10) 
            {
              setPulsingDirection(!direction);
            }
          }
    
          setCircleRadius(newRadius);
          previousBaseRadiusRef.current = baseRadius;
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [inView, animationCompleted, isPulsing, circleRadius, pulsingDirection, entry?.intersectionRatio]);

  return ( 
    <Scene ref={ref}>
      <BG muted playsInline ref={video} src="woods.mp4" />
      <Frame width="100%" height="100%" viewBox="0 0 1100 1100" preserveAspectRatio="xMidYMid meet">
        <defs>
          <filter id="displacementFilter6">
            <feTurbulence type="fractalNoise" baseFrequency="0.01" numOctaves="3" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale={displacementScale * 75} xChannelSelector="R" yChannelSelector="G" />
            <feGaussianBlur stdDeviation={blurStdDeviation * 10} />
          </filter>
          <filter id="displacementFilter7">
            <feTurbulence type="fractalNoise" baseFrequency="0.01" numOctaves="3" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale={displacementScale * 15} xChannelSelector="R" yChannelSelector="G" />
            <feGaussianBlur stdDeviation={blurStdDeviation * 5} />
          </filter>
          <mask id="circleMask6">
            <circle cx="50%" cy="50%" r={circleRadius * 0.75} fill="white" style={{ filter: 'url(#displacementFilter6)' }} />
          </mask>
          <mask id="invertedCircleMask">
              <rect x="0" y="0" width="100%" height="100%" fill="#F8F8F8" />
              {/* Use scrollDependentRadius here if scroll is affecting the radius */}
              <circle cx="50%" cy="50%" r={circleRadius} fill="black" style={{ filter: 'url(#displacementFilter6)' }} />
            </mask>
        </defs>
      </Frame>
    </Scene>
  );
}

export default Splash;