import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';

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

  const handleImageLoad = () => setImageLoaded(true);

  const [isFirefox, setIsFirefox] = useState(false);

  const isFirefoxAndroid = navigator.userAgent.includes('Firefox');

  /* return (
    <Scene ref={ref}>
      <Container>
        <svg width="100%" height="100%" className="splash-image" viewBox="0 0 1200 1200">
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
  ); */
}

export default Splash;
