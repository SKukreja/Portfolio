import React, { useRef, useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Scene = styled(motion.div)`  
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  margin-left: 100px;
  width: calc(100vw - 100px);
  height: 100vh;
  position: relative;
  overflow: hidden;
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

function Project() {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.5 });

  const [displacementScale, setDisplacementScale] = useState(150);
  const [blurStdDeviation, setBlurStdDeviation] = useState(3);
  const [circleRadius, setCircleRadius] = useState(0);

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [inView, controls]);

  useEffect(() => {
    if (circleRadius < 450) {
      const interval = setInterval(() => {
        setCircleRadius(prevRadius => prevRadius + 4);
        setDisplacementScale(prevScale => Math.max(prevScale - 0.05, 0));
        setBlurStdDeviation(prevDeviation => Math.max(prevDeviation - 0.0005, 0));
      }, 30);

      return () => clearInterval(interval);
    }
  }, [circleRadius]);

  const svgVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1 } }
  };

  return (
    <Scene>
      <motion.div
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={svgVariants}
      >
        <Image width="1200" height="900" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1200 900">
          <defs>
            <filter id="displacementFilter6">
              <feTurbulence type="fractalNoise" baseFrequency="0.01" numOctaves="3" result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale={displacementScale} xChannelSelector="R" yChannelSelector="G" />
              <feGaussianBlur stdDeviation={blurStdDeviation} />
            </filter>
            <mask id="circleMask6">
              <circle cx="50%" cy="50%" r={circleRadius} fill="white" style={{ filter: 'url(#displacementFilter6)' }} />
            </mask>
          </defs>
          <image xlinkHref="bg.png" width="1200" height="900" mask="url(#circleMask6)" />
        </Image>
      </motion.div>
    </Scene>
  );
}

export default Project;
