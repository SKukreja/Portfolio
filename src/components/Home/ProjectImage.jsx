import React, { useRef, useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import styled from 'styled-components';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { set } from 'react-ga';

gsap.registerPlugin(ScrollTrigger);

const Scene = styled(motion.div)`  
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 100%;
  aspect-ratio: 4 / 3;
  position: relative;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1;
  overflow: visible;
  margin-left: ${(props) => `calc(${Number(props.number)} * -2rem)`};
  @media (max-width: 768px) {
    margin-left: 0;
    margin-top: ${(props) => `calc(${Number(props.number)} * -2rem)`};
  }
`;

const Image = styled.svg`
  width: 100%;
  position: absolute;
  height: auto;
  bottom: 0;
  object-fit: cover;
`;

const Frame = styled.svg`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: auto;
`;

const Container = styled(motion.div)`
  position: absolute;
  width: 150%;
  height: 150%;
  &.even svg {
    top: 0%;
  }
  &.odd svg {
    bottom: 10%;
  }
  @media (max-width: 768px) {
    &.even svg, &.odd svg {
      top: -50%;
      bottom: 0;
    }
  }
`;

let uniqueIdCounter = 0;


function ProjectImage({ customScroll, number, imageUrl, even }) {
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
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrollDependentRadius, setScrollDependentRadius] = useState(0);
  const maxRadius = 600;
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

  // Generate a unique ID for this instance of the component
  const uniqueId = useRef(`project-image-${uniqueIdCounter++}`).current;
  const maskId = `circleMask-${uniqueId}`;
  const invertedMaskId = `invertedCircleMask-${uniqueId}`;

  useEffect(() => {
    controls.start("visible");
    console.log(number);
  }, [controls]);

  // Function to calculate the scroll-adjusted radius
  const calculateScrollAdjustedRadius = (progress) => {
    // Adjust the progress to be within 0.25 to 0.75 range
    const adjustedProgress = Math.min(Math.max(progress, 0.25), 0.75);    
    // Calculate the radius based on adjusted progress
    return maxRadius - (adjustedProgress - 0.25) * 2 * maxRadius;
  };

  // Combined Intro and Pulsing Animation
  useEffect(() => {

    let animationFrameId;

    const animate = () => {
      if (inView) {
        const visibility = entry.intersectionRatio;
        const baseRadius = maxRadius * visibility;
        let newRadius = circleRadius;
        let direction = pulsingDirection;

        if (!animationCompleted) {
          // Apply easing: The closer newRadius is to baseRadius, the smaller the increment
          const increment = (baseRadius - newRadius) * 0.01; // 0.1 is the easing factor
  
          newRadius += increment;
          if (newRadius >= baseRadius) {
            setAnimationCompleted(true);
            setIsPulsing(true);
            setPulsingDirection(true);
          }
        } else {
          const pulsingRange = 10; // Fixed pulsing range

          // Adjust the pulsing range based on scroll progress
          const minRadiusBound = baseRadius >= pulsingRange ? baseRadius - pulsingRange : pulsingRange;
          const maxRadiusBound = minRadiusBound + 2 * pulsingRange;

          
          // Pulsing logic
          if (newRadius >= maxRadiusBound) {
            newRadius = lerp(newRadius, minRadiusBound, 0.1);
            setPulsingDirection(!direction);
          }
          else if (newRadius <= minRadiusBound) {
            newRadius = lerp(newRadius, maxRadiusBound, 0.1);
            setPulsingDirection(!direction);
          }
          else {
            newRadius = direction == 1 ? lerp(newRadius, newRadius + 0.05, 0.2) : lerp(newRadius, newRadius - 0.05, 0.2);
          }
        }

        // Update both circleRadius and scrollDependentRadius
        setCircleRadius(newRadius);
        setScrollDependentRadius(newRadius);
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [inView, animationCompleted, isPulsing, circleRadius, pulsingDirection, entry?.intersectionRatio]);

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
          setScrollProgress(progress);

          // Frame animation logic
          const totalFrames = walkingFrames.length;
          const frameIndex = Math.floor(progress * 2 * (totalFrames - 1)) < totalFrames ? Math.floor(progress * 2 * (totalFrames - 1)) : totalFrames - 1;
          setFrame(frameIndex);
        }
      },
    });

    return () => {
      scrollAnimation.kill();
    };
  }, [walkingFrames.length]);

  return (
    <Scene className={even ? 'even' : 'odd'} number={number} style={customScroll}>
      <Container className={even ? 'even' : 'odd'} ref={ref} initial="hidden" animate={controls} variants={svgVariants}>
        <Image ref={imageRef} width="100%" height="100%" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1200 900">
          <defs>
            <mask id={maskId}>
              <ellipse cx="50%" cy="50%" rx={circleRadius} ry={circleRadius * 3/4} fill="#F8F8F8" style={{ filter: `url(#displacementFilter6)` }} />
            </mask>
          </defs>
          <image xlinkHref={imageUrl} width="100%" height="100%" mask={`url(#${maskId})`} />
        </Image>
        <Frame width="100%" height="100%" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1200 900">
          <defs>
            <mask id={invertedMaskId}>
              <rect x="0" y="0" width="100%" height="100%" fill="#F8F8F8" />
              <ellipse cx="50%" cy="50%" rx={circleRadius} ry={circleRadius * 3/4} fill="black" style={{ filter: `url(#displacementFilter6)` }} />
            </mask>
          </defs>
          <rect x="0" y="0" width="100%" height="100%" fill="#F8F8F8" mask={`url(#${invertedMaskId})`} />
        </Frame>
      </Container>
    </Scene>
  );
}

export default ProjectImage;
