import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap';
import { useGSAP } from "@gsap/react";

const Scene = styled.div`
  width: calc(var(--vh, 1vh) * 130);
  height: calc(var(--vh, 1vh) * 130);
  margin-top: calc(var(--vh, 1vh) * -15);
  margin-left: auto;
  margin-right: auto;
  position: relative;
  z-index: 1;
  backface-visibility: hidden;
  & .svg-image {
  }

  @media (max-width: 1024px) {
    width: 130vw;
    height: 130vw;
    margin-top: -85vw;
    margin-left: -15vw;    
  }
  @media (max-width: 768px) {
    margin-top: -115vw;
  }
`;

const Container = styled.div`
  width: calc(var(--vh, 1vh) * 130);
  height: calc(var(--vh, 1vh) * 130); 
  margin-left: auto;
  margin-right: auto;
  position: relative;
  @media (max-width: 1024px) {
    width: 130vw;
    height: 130vw;
  }
`;

function Splash({}) {
  const ref = useRef(null);
  const ellipseRef = useRef(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  
    
  useGSAP(() => {
    if(!ellipseRef.current) return;
    const maskIntensity = { radius: 0 };
    const ellipseQuickSetter = gsap.quickSetter(ellipseRef.current, "attr");
    const handleIntersect = (entries, observer) => {
      entries.forEach(entry => {
        const targetRadius = entry.isIntersecting && entry.intersectionRatio >= 0 ? 570 : 0;
        gsap.to(maskIntensity, {
          radius: targetRadius,
          ease: "expoScale(0.5,7,none)",
          duration: 4,
          delay: 0.1,
          onUpdate: () => {
            // Update the mask
            ellipseQuickSetter({
              rx: Math.floor(maskIntensity.radius),
              ry: Math.floor(maskIntensity.radius)
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

  const [isFirefox, setIsFirefox] = useState(false);

  const isFirefoxAndroid = navigator.userAgent.includes('Firefox');

  useEffect(() => {    
    setIsFirefox(isFirefoxAndroid);
  }, []);

  return (
    <Scene ref={ref}>
      <Container>
        <svg width="100%" height="100%" className="splash-image" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1200 1200">
          <defs>
            <filter id={"mask-circle-splash"}>
              <feTurbulence className="filter" type="fractalNoise" baseFrequency="0.01" numOctaves={3} result="noise" />
              <feDisplacementMap className="filter" in="SourceGraphic" in2="noise" scale={75} xChannelSelector="R" yChannelSelector="G" />
              <feGaussianBlur className="filter" stdDeviation={ isFirefox ? 2 : 7 } />
            </filter>
            <mask id={"mask-circle-mask"}>
              <ellipse ref={ellipseRef} cx="50%" cy="50%" id={"circle-mask"} rx="0" ry="0" fill="#FFFFFF" style={{ filter: `url(#mask-circle-splash)`, WebkitFilter: `url(#mask-circle-splash)`}} />
            </mask>
          </defs>
          <image xlinkHref={'placeholder.jpeg'} className={'svg-image'} height="100%" style={{mask: `url(#mask-circle-mask)`, WebkitMask: `url(#mask-circle-mask)`}} onLoad={handleImageLoad} />
        </svg>
      </Container>
    </Scene>
  );
}

export default Splash;
