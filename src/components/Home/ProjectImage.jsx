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
  margin-top: 2rem;
  align-items: center;
  z-index: 1;
  overflow: visible;
  transform: ${(props) => Number(props.isInView) > 0 ? `translateX(calc(${Number(props.number) - 1} * -2rem))` : `translateX(0)))`};
  @media (max-width: 768px) {
    transform: ${(props) => Number(props.isInView) > 0 ? `translateY(calc(${Number(props.number) - 1} * 0rem))` : `translateY(0)))`};
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


function ProjectImage({ customScroll, number, imageUrl, even, scrollYProgress }) {
  const controls = useAnimation();
  const thresholds = Array.from({ length: 25 }, (_, index) => index * 0.04);
  const [ref, inView, entry] = useInView({
    threshold: thresholds
  });
  const imageRef = useRef(null); // Ref for the image container
  const [lastFrameTime, setLastFrameTime] = useState(Date.now());
  const [lastSecond, setLastSecond] = useState(Date.now());
  const [frames, setFrames] = useState(0);
  const targetFPS = 30; // You can adjust this value based on your needs
  const frameDuration = 1000 / targetFPS;
  const introStartRadius = 0; // Starting radius for the intro animation
  const [circleRadius, setCircleRadius] = useState(introStartRadius);  
  const previousBaseRadiusRef = useRef(600 * entry?.intersectionRatio);
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

  // Generate a unique ID for this instance of the component
  const uniqueId = useRef(`project-image-${uniqueIdCounter++}`).current;
  const maskId = `circleMask-${uniqueId}`;
  const invertedMaskId = `invertedCircleMask-${uniqueId}`;

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
        if (inView) {
          const visibility = entry.intersectionRatio;
          const baseRadius = 600 * visibility;
          let newRadius = circleRadius;
    
          // Apply easing: The closer newRadius is to baseRadius, the smaller the increment
          const increment = Math.abs((baseRadius - newRadius) * 0.2); // 0.1 is the easing factor
          
          if (newRadius < baseRadius - 10) {
            newRadius += increment;
          }
          else if (newRadius > baseRadius + 10) {
            newRadius -= increment;
          }

          setCircleRadius(newRadius);
          previousBaseRadiusRef.current = baseRadius;
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [circleRadius, inView, lastFrameTime]);

  return (
    <Scene className={even ? 'even' : 'odd'} number={number} scrollYProgress={scrollYProgress} isInView={inView}>
      <Container className={even ? 'even' : 'odd'} ref={ref} initial="hidden" animate={controls} variants={svgVariants}>
        <Image ref={imageRef} width="100%" height="100%" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1200 900">
          <defs>
            <mask id={maskId}>
              <ellipse cx="50%" cy="50%" rx={circleRadius} ry={circleRadius * 3/4} fill="#F8F8F8" style={{ filter: `url(#displacementFilter6)` }} />
            </mask>
          </defs>
          <image xlinkHref={imageUrl} width="100%" height="100%" mask={`url(#${maskId})`} />
        </Image>
      </Container>
    </Scene>
  );
}

export default ProjectImage;
