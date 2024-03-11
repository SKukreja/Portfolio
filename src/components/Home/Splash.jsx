import React, { useRef, useEffect, useState } from 'react';
import { m, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import styled, { css, keyframes } from 'styled-components';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const maskId = `circleMask-splash-circle`;

const Scene = styled(m.div)`  
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  margin-left: -15vw;
  margin-right: 100px;  
  width: 100vh;
  height: 100vh;
  position: relative;
  display: flex;
  will-change: transform;
  align-items: center;
  z-index: 1;
  @media (max-width: 768px) {
    
    margin-top: -50vh;
    width: 180vw;
    height: 180vw;
  }
`;

//transform: ${(props) => Number(props.isInView) > 0 ? `translateX(calc(${Number(props.number) - 1} * -2rem))` : `translateX(0)))`};
//transform: ${(props) => Number(props.isInView) > 0 ? `translateY(calc(${Number(props.number) - 1} * 0rem))` : `translateY(0)))`};

const BG = styled.img`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  height: 100vh;
  height: 100svh;
  width: calc(100vh * 16/9);
  width: calc(100svh * 16/9);
  aspect-ratio: 16/9;
  z-index: 1;
  pointer-events: none;
  mask: url(#${maskId});
  @media (max-width: 768px) {
    width: calc(100%);
    height: calc(100%);
    object-fit: cover;    
  }
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
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
  @media (max-width: 768px) {
    width: calc(100% * 4/3 * 1.05);      
  }
`;

function Splash({ isMobile }) {
  const controls = useAnimation();
  const thresholds = Array.from({ length: 20 }, (_, index) => index * 0.05);
  const [ref, inView, entry] = useInView({
    threshold: thresholds
  });
  const [imageLoaded, setImageLoaded] = useState(false);
  const [stdDeviation, setStdDeviation] = useState(0);
  const [displacement, setDisplacement] = useState(0);
  const [circleRadius, setCircleRadius] = useState(0);
  const [circleCenterY, setCircleCenterY] = useState('450');
  const [circleCenterX, setCircleCenterX] = useState('800');

  const easeInOut = (t) => {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  };

  const lerp = (start, end, alpha) => {
    const easedAlpha = easeInOut(alpha);
    return start * (1 - easedAlpha) + end * easedAlpha;
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
    ScrollTrigger.refresh();
  };

  useEffect(() => {
    const updateCirclePosition = () => {
      const screenHeight = window.innerHeight;
      const screenWidth = window.innerWidth;
      const viewBoxWidth = 1600; 
      const viewBoxHeight = 900;
      const centerX = (screenWidth / viewBoxWidth) * 800;
      const centerY = (screenHeight / viewBoxHeight) * 450;
      setCircleCenterX(centerX.toString());
      setCircleCenterY(centerY.toString());
    };
  
    updateCirclePosition();

    window.addEventListener('resize', updateCirclePosition);

    // Cleanup function to remove the event listener
    return () => window.removeEventListener('resize', updateCirclePosition);
  }, []);

  useEffect(() => {
    controls.start("visible");
  }, [controls]);

  useEffect(() => {
    if (!imageLoaded) return;
    ScrollTrigger.create({
      trigger: ref.current,
      start: isMobile ? "top 50%" : "left center", // When the left of the trigger hits the right of the viewport
      end: isMobile ? "bottom -200%" : "right left", 
      horizontal: !isMobile, 
      onUpdate: (self) => {
        // Calculate the new radius based on the scroll progress
        const progress = self.progress;
        const maxRadius = 600; // Max radius as per your original logic
        // Apply a cubic ease-out curve to the progress
        const easeOutProgress = Math.pow(1 - progress, 4);
        
        const newRadius = easeOutProgress * maxRadius;
        setCircleRadius(newRadius);

        // Dynamically adjust stdDeviation and displacement based on scroll progress or other conditions
        const targetDeviation = (1 - newRadius / maxRadius) * 5;
        const targetDisplacement = (1 - newRadius / maxRadius) * 100;
        setStdDeviation(targetDeviation);
        setDisplacement(targetDisplacement);
      },
    });
  }, [imageLoaded]);

  /* Combined Intro and Pulsing Animation
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
          const screenWidth = window.innerWidth;
          const screenHeight = window.innerHeight;
          const baseRadius = isMobile ? 350 : screenWidth / 3;
          let newRadius = circleRadius;
          let direction = pulsingDirection;              

          if (!animationCompleted)
          {
            // Apply easing: The closer newRadius is to baseRadius, the smaller the increment
            const increment = (baseRadius - newRadius) * 0.05; // 0.1 is the easing factor
    
            newRadius += increment;
            if (newRadius >= baseRadius - 10) 
            {
              setAnimationCompleted(true);
              setIsPulsing(true);
              setPulsingDirection(true);
            }
          } 

          setDisplacementScale(lerp(1, 0.5, newRadius / baseRadius));
          setBlurStdDeviation(lerp(1, 0.5, newRadius / baseRadius));
          setCircleRadius(newRadius);
          previousBaseRadiusRef.current = baseRadius;
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [inView, animationCompleted, circleRadius]);
  */

  return ( 
    <Scene ref={ref}>
      <BG onLoad={handleImageLoad} src="placeholder.jpeg" />
      <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid meet">
        <defs>
          <filter id={"mask-" + maskId}>
            <feTurbulence type="fractalNoise" baseFrequency="0.01" numOctaves="3" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale={75} xChannelSelector="R" yChannelSelector="G" />
            <feGaussianBlur stdDeviation={10 - stdDeviation} />
          </filter>
          <filter id={"displacementFilter-" + maskId}>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale={displacement} xChannelSelector="R" yChannelSelector="G" />
            <feGaussianBlur stdDeviation={stdDeviation} />
          </filter>
          <mask id={maskId}>
            <circle cx={circleCenterX} cy={circleCenterY} r={circleRadius} fill="#FFFFFF" style={{ filter: `url(#mask-${maskId})` }} />
          </mask>
        </defs>
      </svg>
    </Scene>
  );
}

export default Splash;

/*
  <mask id="invertedCircleMask">
    <rect x="0" y="0" width="100%" height="100%" fill="#F8F8F8" />
    <circle cx="50%" cy="50%" r={circleRadius} fill="black" style={{ filter: 'url(#displacementFilter6)' }} />
  </mask>
*/