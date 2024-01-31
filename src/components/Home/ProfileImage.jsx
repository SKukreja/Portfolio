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
  width: 50%;
  aspect-ratio: 3 / 4;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 7;  
  overflow: visible;
`;

const Image = styled.svg`
  width: 100%;
  position: absolute;
  height: auto;
  left: 50%;
  top: 50%;
  filter: grayscale(1) contrast(1.3) brightness(1.1);
  transform: translate(-50%, -50%);
  object-fit: cover;
`;

const Frame = styled.svg`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: auto;
`;

const Container = styled(motion.div)`
  position: relative;
  width: 100%;
  height: 100%;
`;

let uniqueIdCounter = 0;


function ProfileImage({ customScroll, imageUrl, even }) {
  const controls = useAnimation();
  const thresholds = Array.from({ length: 101 }, (_, index) => index * 0.01);
  const [ref, inView, entry] = useInView({
    threshold: 1
  });
  const imageRef = useRef(null); // Ref for the image container
  const [displacementScale, setDisplacementScale] = useState(75);
  const [blurStdDeviation, setBlurStdDeviation] = useState(10);
  const introStartRadius = 0; // Starting radius for the intro animation
  const [circleRadius, setCircleRadius] = useState(introStartRadius);
  const [isPulsing, setIsPulsing] = useState(true);
  const [pulsingDirection, setPulsingDirection] = useState(true);
  const [animationCompleted, setAnimationCompleted] = useState(false);  
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
  const uniqueId = useRef(`profile-image-${uniqueIdCounter++}`).current;
  const maskId = `circleMask-${uniqueId}`;
  const invertedMaskId = `invertedCircleMask-${uniqueId}`;

  useEffect(() => {
    controls.start("visible");
  }, [controls]);

  useEffect(() => {
    let animationFrameId;
  
    const animate = () => {
      if (inView) {
        const visibility = entry.intersectionRatio;
        const baseRadius = 440 * visibility;
        let newRadius = circleRadius;
  
        if (!animationCompleted) {
          // Apply easing: The closer newRadius is to baseRadius, the smaller the increment
          const increment = (baseRadius - newRadius) * 0.01; // 0.1 is the easing factor
  
          newRadius += increment;
  
          if (Math.abs(newRadius - baseRadius) < 1) { // Adjust the threshold as needed
            newRadius = baseRadius;
            setAnimationCompleted(true);
          }
        }
        else {
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
            newRadius = direction == 1 ? lerp(newRadius, newRadius + 0.05, 0.1) : lerp(newRadius, newRadius - 0.05, 0.1);
          }
        }
  
        setCircleRadius(newRadius);
      }
      animationFrameId = requestAnimationFrame(animate);
    };
  
    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [inView, animationCompleted, circleRadius, entry?.intersectionRatio]);
  

  return (
    <Scene style={customScroll}>
      <Container ref={ref} initial="hidden" animate={controls} variants={svgVariants}>
        <Image ref={imageRef} width="100%" height="100%" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 900 1200">
          <defs>
            <mask id={maskId}>
              <ellipse cx="50%" cy="50%" rx={circleRadius * 3/4} ry={circleRadius} fill="var(--offwhite)" style={{ filter: `url(#displacementFilter6)` }} />
            </mask>
          </defs>
          <image xlinkHref={imageUrl} width="100%" height="100%" mask={`url(#${maskId})`} />
        </Image>
        <Frame width="100%" height="100%" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 900 1200">
          <defs>
            <mask id={invertedMaskId}>
              <rect x="0" y="0" width="100%" height="100%" fill="#F8F8F8" />
              <ellipse cx="50%" cy="50%" rx={circleRadius * 3/4} ry={circleRadius} fill="black" style={{ filter: `url(#displacementFilter6)` }} />
            </mask>
          </defs>
          <rect x="0" y="0" width="100%" height="100%" fill="var(--black)" mask={`url(#${invertedMaskId})`} />
        </Frame>
      </Container>
    </Scene>
  );
}

export default ProfileImage;
