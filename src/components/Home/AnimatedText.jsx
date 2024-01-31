import React, { useMemo, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const AnimatedText = React.memo(({ text, startImmediately }) => {
  const [ref, inView] = useInView({ threshold: 0 });
  const animationDelays = useRef(text.split(' ').flatMap(word => 
    [...word.split(''), ' '].map(() => Math.random())
  ));

  const charVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: i => ({
      scale: 1,
      opacity: 1,
      transition: {
        delay: animationDelays.current[i],
        duration: 1,
        type: 'spring',
        stiffness: 120,
      }, 
    }),
  };

  const characters = useMemo(() => text.split(' ').flatMap((word, i) => 
    [...word.split(''), i < text.split(' ').length - 1 ? ' ' : '']
  ), [text]);

  return (
    <div ref={ref} style={{ display: 'inline-block' }}>
      <span aria-hidden="true">
        {characters.map((char, index) => (
          <motion.span
            key={index}
            variants={charVariants}
            initial="hidden"
            animate={inView || startImmediately ? 'visible' : 'hidden'}
            custom={index}
            style={{ display: 'inline-block', whiteSpace: 'pre', willChange: 'transform, opacity' }}
          >
            {char}
          </motion.span>
        ))}
      </span>
      <span style={{ display: 'none' }}>{text}</span>
    </div>
  );
});

export default AnimatedText;
