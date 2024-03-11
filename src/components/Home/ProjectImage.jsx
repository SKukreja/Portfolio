import React, { useRef, useEffect, useState } from 'react';
import { m, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import styled from 'styled-components';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { set } from 'react-ga';

gsap.registerPlugin(ScrollTrigger);

const Scene = styled(m.div)`  
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

const Container = styled(m.div)`
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


function ProjectImage({ isMobile, number, imageUrl, even }) {
  const ref = useRef(null); // Ref for the scene container
  const [imageLoaded, setImageLoaded] = useState(false);
  const uniqueId = `project-image-${useRef(++uniqueIdCounter).current}`;
  const maskId = `circleMask-${uniqueId}`;
  // State for the dynamic properties of the SVG filters
  const [stdDeviation, setStdDeviation] = useState(0);
  const [displacement, setDisplacement] = useState(0);
  const [circleRadius, setCircleRadius] = useState(0);

  useEffect(() => {
    if (!imageLoaded) return;
    ScrollTrigger.create({
      trigger: ref.current,
      start: isMobile ? "top bottom" : "left right", // When the left of the trigger hits the right of the viewport
      end: isMobile ? "bottom center" : "right center", 
      horizontal: !isMobile, 
      onUpdate: (self) => {
        // Calculate the new radius based on the scroll progress
        const progress = self.progress;
        const maxRadius = 400; // Max radius as per your original logic
        // Apply a cubic ease-out curve to the progress
        const easeOutProgress = 1 - Math.pow(1 - progress, 3);
        
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

  const handleImageLoad = () => {
    setImageLoaded(true);
    ScrollTrigger.refresh();
  };

  return (
    <Scene ref={ref} className={even ? 'even' : 'odd'} number={number}>
      <Container className={even ? 'even' : 'odd'}>
      <Image width="100%" height="100%" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1200 900">
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
              <ellipse cx="50%" cy="50%" rx={circleRadius} ry={circleRadius * 3 / 4} fill="#FFFFFF" style={{ filter: `url(#mask-${maskId})` }} />
            </mask>
          </defs>
          <image xlinkHref={imageUrl} width="100%" height="100%" mask={`url(#${maskId})`} filter={`url(#displacementFilter-${maskId})`} onLoad={handleImageLoad} />
        </Image>
      </Container>
    </Scene>
  );
}

export default ProjectImage;