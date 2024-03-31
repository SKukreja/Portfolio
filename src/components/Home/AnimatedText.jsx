import React, { useMemo, useState, useRef } from 'react';
import { m } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const AnimatedText = React.memo(({ text, startImmediately, isLink = false }) => {
  const [ref, inView] = useInView({ threshold: 0.25, triggerOnce: true });
  const [isHovered, setIsHovered] = useState(false);

  // Calculate delays only once to prevent recalculations on each render
  const animationDelays = useRef(text.split(' ').flatMap(
    (word, wordIndex) => [...word].map((_, charIndex) => ({
      delay: Math.random(), // Adjust this calculation as needed
      wordIndex,
      charIndex,
    }))
  ));

  const charVariants = {
    hidden: { color: "var(--interact-hover-color)", scale: 0, opacity: 0 },
    visible: ({ delay }) => ({
      color: "var(--black)",
      scale: 1,
      opacity: 1,
      transition: {
        delay,
        duration: 3,
        type: 'spring',
        stiffness: 120,
      },
    }),
    hover: ({ delay }) => ({
      opacity: 1,
      color: "var(--interact-hover-color)", 
      scale: 1.1, 
      transition: {        
        duration: 0.5,
        type: 'linear',        
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
    <div ref={ref} 
      onMouseEnter={() => {
        if (isLink) setIsHovered(true)
      }}
      onMouseLeave={() => {
        if (isLink) setIsHovered(false)
      }}
    >
      {words.map((word, wordIndex) => (
        <span key={wordIndex} style={{ display: 'inline-block', marginRight: '0.25em' }}>
          {word.map(({ char, delay }, index) => (
            <m.span
              key={index}
              variants={charVariants}
              initial="hidden"
              animate={isHovered && isLink ? 'hover' : inView || startImmediately ? 'visible' : 'hidden'}
              whileHover={isLink ? 'hover' : ''}
              custom={{ delay }}
              style={{ display: 'inline-block', whiteSpace: 'pre', willChange: 'color, transform, opacity' }}
            >
              {char}
            </m.span>
          ))}
        </span>
      ))}
    </div>
  );
});

export default AnimatedText;
