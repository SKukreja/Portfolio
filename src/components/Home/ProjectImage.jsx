import React, { useRef, useState, useMemo } from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap';
import { useGSAP } from "@gsap/react";

const Scene = styled.div`  
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 100%;
  aspect-ratio: 4 / 3;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 2rem;
  align-items: center;
  z-index: 1;
  backface-visibility: hidden;
  overflow: visible;

  & .svg-image {
    translate: none; 
    rotate: none; 
    scale: none; 
    transform-origin: 0px 0px;
  }
`;

const Container = styled.div`
  position: absolute;
  width: 150%;
  height: 150%;
  @media (max-width: 1024px) {
    &.even svg, &.odd svg {
      shape-rendering: optimizeSpeed;
      position: absolute;
      top: -65%;
      bottom: 0;
      will-change: contents;
      -webkit-transform: translate3d(0,0,0);
      -moz-transform: translate3d(0,0,0);
      -ms-transform: translate3d(0,0,0);
      -o-transform: translate3d(0,0,0);
      transform: translate3d(0,0,0);
    }
  }
`;

let uniqueIdCounter = 0;



function ProjectImage({ isMobile, number, imageUrl, even }) {
  const ref = useRef(null);
  const ellipseRef = useRef(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const uniqueId = useMemo(() => `project-image-${++uniqueIdCounter}`, []);
  const maskId = useMemo(() => `circle-mask-${uniqueId}`, [uniqueId]);
  
  
    
  useGSAP(() => {
    if(!ellipseRef.current) return;
    const maskIntensity = { radius: 0 };
    const ellipseQuickSetter = gsap.quickSetter(ellipseRef.current, "attr");
    const handleIntersect = (entries, observer) => {
      entries.forEach(entry => {
        const targetRadius = entry.isIntersecting && entry.intersectionRatio >= 0 ? 400 : 0;
        gsap.to(maskIntensity, {
          radius: targetRadius,
          ease: "expoScale(0.5,7,none)",
          duration: 3,
          delay: 0.1,
          onUpdate: () => {
            // Update the mask
            ellipseQuickSetter({
              rx: Math.floor(maskIntensity.radius),
              ry: Math.floor(maskIntensity.radius * 0.75)
            });
          },
        });
      });
    };

    const observerOptions = { threshold: [0] };
    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, [imageLoaded, ellipseRef.current]);

  const handleImageLoad = () => setImageLoaded(true);


  return (
    <Scene ref={ref} className={even ? 'even' : 'odd'} number={number}>
      <Container className={even ? 'even' : 'odd'}>
        <svg className="project-image" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1200 900">
          <defs>
            <mask id={maskId}>
              <ellipse ref={ellipseRef} cx="50%" cy="50%" id={"circle-" + maskId} rx="0" ry="0" fill="#FFFFFF" style={{ filter: `url(#mask-circle-project-image-${number})`, WebkitFilter: `url(#mask-circle-project-image-${number})`}} />
            </mask>
          </defs>
          <image xlinkHref={imageUrl} className={'svg-image'} width="100%" height="100%" style={{mask: `url(#${maskId})`, WebkitMask: `url(#${maskId})`}} onLoad={handleImageLoad} />
        </svg>
      </Container>
    </Scene>
  );
}

export default ProjectImage;