import React, { useRef, useEffect, memo } from 'react';
import { m, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import styled from 'styled-components';

const Scene = styled(m.div)`  
  width: 40%;
  height: 26vh;
  position: relative;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: calc(var(--default-spacing) * 1);
  align-items: center;
  z-index: 1;
  overflow: visible;
`;

const Image = styled(m.div)`
  width: 100%;
  position: relative;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  -webkit-mask-image: url(/profile-mask.avif);
  mask-image: url(/profile-mask.avif);
  mask-mode: alpha;  
  mask-size: cover;
  mask-repeat: no-repeat;
  mask-position: center center;
`;


const ProfileImage = memo(({ isMobile, $imageUrl }) => {
  const controls = useAnimation();

  const [ref, inView, entry] = useInView({
    threshold: 0.5,
  });

  const imgVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1 } }
  };

  useEffect(() => {
    controls.start("visible");
  }, [controls]);

  return (
    <Scene ref={ref} initial="hidden" animate={controls} variants={imgVariants} isInView={inView}>
        <Image style={{backgroundImage: 'url(/avatar.avif)'}} />
    </Scene>
  );
});

export default ProfileImage;