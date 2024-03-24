import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap';
import { useGSAP } from "@gsap/react";

const Scene = styled.div`  
  width: 50%;
  aspect-ratio: 3 / 4;  
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  position: relative;  
  z-index: 3;
  backface-visibility: hidden;  
  & .svg-image {
    translate: none; 
    rotate: none; 
    scale: none;     
    transform-origin: 0px 0px;
    filter: grayscale(100%) brightness(1.1) contrast(1.3);
  }
  @media (max-width: 768px) {    
    width: 75%;
    height: 30%;
  }
`;

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  @media (max-width: 768px) {
    width: 50%;
    height: 50%;    
    right: 0;
    & svg {
      shape-rendering: optimizeSpeed;
      position: absolute;
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

function ProfileImage({ imageUrl, even }) {
  const ref = useRef(null);
  const ellipseRef = useRef(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  
    
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
          duration: 4,
          delay: 0.1,
          onUpdate: () => {
            // Update the mask
            ellipseQuickSetter({
              rx: Math.floor(maskIntensity.radius) * 0.75,
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

  const isFirefoxAndroid = navigator.userAgent.includes('Firefox') && navigator.userAgent.includes('Android');

  useEffect(() => {    
    setIsFirefox(isFirefoxAndroid);
  }, []);

  return (
    <Scene ref={ref}>
      <Container>
        <svg className="profile-image" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 900 1200">
          <defs>
            <filter id={"mask-circle-profile"}>
              <feTurbulence className="filter" type="fractalNoise" baseFrequency="0.01" numOctaves={3} result="noise" />
              <feDisplacementMap className="filter" in="SourceGraphic" in2="noise" scale={75} xChannelSelector="R" yChannelSelector="G" />
              <feGaussianBlur className="filter" stdDeviation={ isFirefoxAndroid ? 5 : 7 } />
            </filter>
            <mask id={"mask-circle-mask-profile"}>
              <ellipse ref={ellipseRef} cx="50%" cy="50%" id={"circle-mask-profile"} rx="0" ry="0" fill="#FFFFFF" style={{ filter: `url(#mask-circle-profile)`, WebkitFilter: `url(#mask-circle-profile)`}} />
            </mask>
          </defs>
          <image xlinkHref={imageUrl} className={'svg-image'} width="100%" height="100%" style={{mask: `url(#mask-circle-mask-profile)`, WebkitMask: `url(#mask-circle-mask-profile)`}} onLoad={handleImageLoad} />
        </svg>
      </Container>
    </Scene>
  );
}
export default ProfileImage;
