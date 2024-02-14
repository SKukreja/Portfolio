import React, { useRef, useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import styled, { css, keyframes } from 'styled-components';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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
  @media (max-width: 768px) {
    
    margin-top: -50vh;
    width: 180vw;
    height: 180vw;
  }
`;

//transform: ${(props) => Number(props.isInView) > 0 ? `translateX(calc(${Number(props.number) - 1} * -2rem))` : `translateX(0)))`};
//transform: ${(props) => Number(props.isInView) > 0 ? `translateY(calc(${Number(props.number) - 1} * 0rem))` : `translateY(0)))`};

const BG = styled.video`
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
  const thresholds = Array.from({ length: 101 }, (_, index) => index * 0.01);
  const [ref, inView, entry] = useInView({
    threshold: thresholds
  });
  const videoRef = useRef(null); // Ref for the image container
  const [displacementScale, setDisplacementScale] = useState(1);
  const [blurStdDeviation, setBlurStdDeviation] = useState(1);
  const introStartRadius = 0; // Starting radius for the intro animation
  const [circleRadius, setCircleRadius] = useState(introStartRadius);
  const [circleCenterY, setCircleCenterY] = useState('450');
  const [circleCenterX, setCircleCenterX] = useState('800');
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
  }, []);

  useEffect(() => {
    const video = videoRef.current;
  
    const playAndPauseVideo = () => {
      video.play();
      video.pause();
    };
  
    document.documentElement.addEventListener('touchstart', playAndPauseVideo, { once: true });
  
    let tl = gsap.timeline({
      scrollTrigger: {
        defaults: { duration: 1 },
        trigger: video,
        start: isMobile ? "top top" : "left center",
        end: isMobile ? "bottom bottom" : "right center",
        scrub: true,
        horizontal: isMobile ? false : true,
      }
    });
    
    function clampVideoPlayback(video, atStart) {
      if (!video) return;
      // Adjust video.currentTime to either its start or just before its end based on the atStart flag.
      video.currentTime = atStart ? 0 : Math.max(0, video.duration - 0.1); // Subtract a small time to avoid flickering at the end.
    }

    const onMetadataLoaded = () => {      
      tl.fromTo(video, { currentTime: 0 }, { currentTime: video.duration});
    };
  
    video.addEventListener('loadedmetadata', onMetadataLoaded, { once: true });

    let src = video.currentSrc || video.src;
  
    return () => {
      document.documentElement.removeEventListener('touchstart', playAndPauseVideo);
      video.removeEventListener('loadedmetadata', onMetadataLoaded);
      if (tl) { tl.kill(); }
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

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
          const baseRadius = isMobile ? 350 : 550;
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
      <BG muted playsInline ref={videoRef} src="woods.mp4" />
      <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid meet">
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
            <circle cx={circleCenterX} cy={circleCenterY} r={circleRadius} fill="white" style={{ filter: 'url(#displacementFilter6)' }} />
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