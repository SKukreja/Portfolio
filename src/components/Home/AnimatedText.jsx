import React, { useMemo, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const AnimatedText = React.memo(({ text, startImmediately }) => {
  const [ref, inView] = useInView({ threshold: 0.25, triggerOnce: true });

  // Calculate delays only once to prevent recalculations on each render
  const animationDelays = useRef(text.split(' ').flatMap(
    (word, wordIndex) => [...word].map((_, charIndex) => ({
      delay: Math.random(), // Adjust this calculation as needed
      wordIndex,
      charIndex,
    }))
  ));

  const charVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: ({ delay }) => ({
      scale: 1,
      opacity: 1,
      transition: {
        delay,
        duration: 1,
        type: 'spring',
        stiffness: 120,
      },
    }),
  };

  // Splitting text into words for wrapping, and then mapping over words to animate each letter
  const words = useMemo(() => text.split(' ').map((word, wordIndex) => 
    [...word].map((char, charIndex) => ({
      char,
      delay: animationDelays.current.find(d => d.wordIndex === wordIndex && d.charIndex === charIndex).delay,
    })).concat([{ char: ' ', delay: 0 }]) // Add space at the end of each word except the last
  ), [text]);

  return (
    <div ref={ref}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} style={{ display: 'inline-block', marginRight: '0.25em' }}>
          {word.map(({ char, delay }, index) => (
            <motion.span
              key={index}
              variants={charVariants}
              initial="hidden"
              animate={inView || startImmediately ? 'visible' : 'hidden'}
              custom={{ delay }}
              style={{ display: 'inline-block', whiteSpace: 'pre' }}
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </div>
  );
});

export default AnimatedText;
