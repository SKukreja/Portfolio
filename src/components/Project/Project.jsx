import React, { useRef, useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import styled from 'styled-components';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

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

const Frame = styled.svg`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

function Project({ customScroll }) {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.5 });
  const imageContainerRef = useRef(null);
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

  const [frame, setFrame] = useState(0); // For walking animation frames
  const walkingFrames = ['/assets/FG1.png', '/assets/FG2.png', '/assets/MG1.png', '/assets/MG2.png']; // Replace with actual frame URLs

  useEffect(() => {
    const scrollAnimation = gsap.to(ref.current, {
      scrollTrigger: {
        trigger: ref.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
        onUpdate: self => {
          const progress = self.progress;
          const totalFrames = walkingFrames.length;
          const frameIndex = Math.floor(progress * totalFrames * 10) % totalFrames; // Adjusted formula
          setFrame(frameIndex);
        }
      },
    });
  
    return () => {
      scrollAnimation.kill();
    };
  }, [walkingFrames.length]);

  const imageRef = useRef(null); // Ref for the image container

  useEffect(() => {
    // Function to handle mouse movement
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
  }, []);

  return (
    <Scene style={customScroll}>
      <motion.div ref={ref} initial="hidden" animate={controls} style={{ position: "relative" }} variants={svgVariants}>
        <Image ref={imageRef}  width="1200" height="900" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1200 900">
            <defs>
              <filter id="displacementFilter6">
                <feTurbulence type="fractalNoise" baseFrequency="0.01" numOctaves="3" result="noise" />
                <feDisplacementMap in="SourceGraphic" in2="noise" scale={displacementScale} xChannelSelector="R" yChannelSelector="G" />
                <feGaussianBlur stdDeviation={blurStdDeviation} />
              </filter>
            <mask id="circleMask6">
              <circle cx="50%" cy="50%" r={circleRadius * 1.2} fill="white" style={{ filter: 'url(#displacementFilter6)' }} />
            </mask>
          </defs>
          <image xlinkHref="bg.png" width="1200" height="900" mask="url(#circleMask6)" />
          <image xlinkHref={walkingFrames[frame]} width="1200" height="900" mask="url(#circleMask6)" />
        </Image>
        <Frame width="1200" height="900" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1200 900">
          <defs>
            <mask id="invertedCircleMask">
              <rect x="0" y="0" width="100%" height="100%" fill="#F8F8F8" />
              <circle cx="50%" cy="50%" r={circleRadius} fill="black" style={{ filter: 'url(#displacementFilter6)' }} />
            </mask>
          </defs>
          <rect x="0" y="0" width="100%" height="100%" fill=" #F8F8F8" mask="url(#invertedCircleMask)" />
        </Frame>
      </motion.div>
    </Scene>
  );
}

export default Project;
