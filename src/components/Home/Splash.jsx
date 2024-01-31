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
  margin-left: 100px;
  margin-right: 100px;
  width: calc(85vw - 100px);
  height: 100vh;
  position: relative;
  overflow: clip;
  display: flex;
  align-items: center;
  z-index: 1;
`;

const Image = styled.svg`
  width: auto;
  position: relative;
  height: 120vh;
  object-fit: cover;
  @media (max-width: 768px) {
    width: 120vw;
    height: auto;
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
  will-change: transform;
  width: calc(120vh * 4/3 * 1.05);
  height: calc(120vh * 4/3 * 1.05);
  animation: ${({ isVisible, index }) =>
  isVisible
    ? css`${Spin} 90s linear infinite reverse`
    : 'none'};
`;

function Splash({ customScroll, imageUrls }) {
  const controls = useAnimation();
  const thresholds = Array.from({ length: 101 }, (_, index) => index * 0.01);
  const [ref, inView, entry] = useInView({
    threshold: thresholds
  });
  const imageRef = useRef(null); // Ref for the image container
  const [displacementScale, setDisplacementScale] = useState(75);
  const [blurStdDeviation, setBlurStdDeviation] = useState(10);
  const introStartRadius = 0; // Starting radius for the intro animation
  const [circleRadius, setCircleRadius] = useState(introStartRadius);
  const [animationCompleted, setAnimationCompleted] = useState(false);
  const [isPulsing, setIsPulsing] = useState(true);
  const [pulsingDirection, setPulsingDirection] = useState(true);
  const previousBaseRadiusRef = useRef(500 * entry?.intersectionRatio);
  const svgVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1 } }
  };

  const [frame, setFrame] = useState(0); // For walking animation frames
  const totalFrames = 41; // Total number of frame images in the directory
  const walkingFrames = Array.from({ length: totalFrames }, (_, i) => `/splash/frame${i + 1}.jpg`);

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
      if (inView) {
        const visibility = entry.intersectionRatio;
        const baseRadius = 500 * visibility;
        let newRadius = circleRadius;
        let direction = pulsingDirection;
  
        const baseRadiusChange = Math.abs(baseRadius - previousBaseRadiusRef.current);
  
        if (!animationCompleted) {
          // Apply easing: The closer newRadius is to baseRadius, the smaller the increment
          const increment = (baseRadius - newRadius) * 0.01; // 0.1 is the easing factor
  
          newRadius += increment;
          if (newRadius >= baseRadius - 10) {
            setAnimationCompleted(true);
            setIsPulsing(true);
            setPulsingDirection(true);
          }
        } else {
          const pulsingRange = 15;
          const minRadius = Math.max(baseRadius - pulsingRange, 0);
          const maxRadius = baseRadius + pulsingRange;
          const targetRadius = direction ? maxRadius : minRadius;

          // Dynamic alpha based on base radius change
          const dynamicAlpha = Math.max(0.05 * visibility + baseRadiusChange / 50, 0.03); // Adjust the divisor for sensitivity
  
          newRadius = lerp(newRadius, targetRadius, 0.05);
  
          if (Math.abs(newRadius - targetRadius) < 10) {
            setPulsingDirection(!direction);
          }
        }
  
        setCircleRadius(newRadius);
        previousBaseRadiusRef.current = baseRadius;
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [inView, animationCompleted, isPulsing, circleRadius, pulsingDirection, entry?.intersectionRatio]);



  useEffect(() => {
    // Only add event listeners if the animation has completed
    if (animationCompleted) {
      const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        // Calculate movement and apply to image
        const moveX = -(clientX - window.innerWidth / 2) / 70;
        const moveY = -(clientY - window.innerHeight / 2) / 70;
        imageRef.current.style.transform = `translate(${moveX}px, ${moveY}px)`;
      };

      // Function to handle gyroscopic movement
      const handleOrientation = (e) => {
        const { beta, gamma } = e;
        // Calculate movement and apply to image
        const moveX = gamma / 70;
        const moveY = beta / 70;
        imageRef.current.style.transform = `translate(${moveX}px, ${moveY}px)`;
      };

      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('deviceorientation', handleOrientation);

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('deviceorientation', handleOrientation);
      };
    }
  }, [animationCompleted]);

   // Scroll Handling
  useEffect(() => {
    const scrollAnimation = gsap.to(ref.current, {
      scrollTrigger: {
        trigger: ref.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
        onUpdate: self => {
          const progress = self.progress;

          // Frame animation logic
          const totalFrames = walkingFrames.length;
          const frameIndex = Math.floor(progress * 4 * (totalFrames - 1)) < totalFrames ? Math.floor(progress * 4 * (totalFrames - 1)) : totalFrames - 1;
          setFrame(frameIndex);
        }
      },
    });

    return () => {
      scrollAnimation.kill();
    };
  }, [walkingFrames.length]);

  return (
    <Scene style={customScroll}>
      <motion.div ref={ref} initial="hidden" animate={controls} style={{ position: "relative" }} variants={svgVariants}>
      <Image ref={imageRef} width="1200" height="900" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1200 900">
          <defs>
            <filter id="displacementFilter6">
              <feTurbulence type="fractalNoise" baseFrequency="0.01" numOctaves="3" result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale={displacementScale} xChannelSelector="R" yChannelSelector="G" />
              <feGaussianBlur stdDeviation={blurStdDeviation} />
            </filter>
            <mask id="circleMask6">
              <circle cx="50%" cy="50%" r={circleRadius * 1.2} fill="#F8F8F8" style={{ filter: 'url(#displacementFilter6)' }} />
            </mask>
          </defs>
          <image xlinkHref="bg.png" width="1200" height="900" mask="url(#circleMask6)" />
          <image xlinkHref={walkingFrames[frame]} width="1200" height="900" mask="url(#circleMask6)" />
        </Image>
        <Frame width="1200" height="900" isVisible={inView} version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1200 900">
          <defs>
            <mask id="invertedCircleMask">
              <rect x="0" y="0" width="100%" height="100%" fill="#F8F8F8" />
              {/* Use scrollDependentRadius here if scroll is affecting the radius */}
              <circle cx="50%" cy="50%" r={circleRadius} fill="black" style={{ filter: 'url(#displacementFilter6)' }} />
            </mask>
          </defs>
          <rect x="0" y="0" width="100%" height="100%" fill="#F8F8F8" mask="url(#invertedCircleMask)" />
        </Frame>
      </motion.div>
    </Scene>
  );
}

export default Splash;
