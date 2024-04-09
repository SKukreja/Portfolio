import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';

const Scene = styled.div`  
  width: 100%;
  height: calc(40% + var(--default-spacing));
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;  
  z-index: 3;
  overflow: hidden;
  margin-top: var(--default-spacing);
  backface-visibility: hidden;  
  & .svg-image {
    translate: none; 
    rotate: none; 
    scale: none;     
    transform-origin: 0px 0px;
    filter: grayscale(50%) brightness(1.1) contrast(1.2);
  }
  @media (max-width: 1024px) {
    height: calc(30% + var(--default-spacing));
  }
`;

const Container = styled.div`
  position: relative;
  height: 100%;
  aspect-ratio: 3/4;

`;

function ProfileImage({ imageUrl, even }) {
  const ref = useRef(null);
  const ellipseRef = useRef(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <Scene ref={ref}>
      <Container>
        <svg className="profile-image" viewBox="0 0 900 1200">
          <defs>
            <filter id={"mask-circle-profile"}>
              <feTurbulence className="filter" type="fractalNoise" baseFrequency="0.01" numOctaves={3} result="noise" />
              <feDisplacementMap className="filter" in="SourceGraphic" in2="noise" scale={75} xChannelSelector="R" yChannelSelector="G" />
              <feGaussianBlur className="filter" stdDeviation={ 7 } />
            </filter>
            <mask id={"mask-circle-mask-profile"}>
              <ellipse ref={ellipseRef} cx="50%" cy="50%" id={"circle-mask-profile"} rx="0" ry="0" fill="#FFFFFF" style={{ filter: `url(#mask-circle-profile)`, WebkitFilter: `url(#mask-circle-profile)`}} />
            </mask>
          </defs>
          <image xlinkHref={imageUrl} className={'svg-image'} width="100%" height="100%" style={{mask: `url(#mask-circle-mask-profile)`, WebkitMask: `url(#mask-circle-mask-profile)`}} />
        </svg>
      </Container>
    </Scene>
  );
}
export default ProfileImage;
