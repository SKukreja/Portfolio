import React, { useEffect, useRef, useState } from 'react';
import { m } from 'framer-motion';

const WashedAwayText = ({ text }) => {
  const containerRef = useRef(null);
  const [animationProps, setAnimationProps] = useState([]);

  // Function to add noise, creating non-linear water pressure
  const addNoiseToPressure = (pressure, index, totalLength) => {
    // Simple noise function
    const noise = Math.random() * 0.2 - 0.1; // Noise range between -0.1 and 0.1
    return pressure + noise * (1 - Math.abs(index - totalLength / 2) / (totalLength / 2));
  };

  useEffect(() => {
    const letters = containerRef.current.querySelectorAll('span');
    const containerWidth = containerRef.current.offsetWidth;
    const midPointX = containerWidth / 2;
    const totalLength = letters.length;

    const newAnimationProps = Array.from(letters).map((letter, index) => {
      const { x, width } = letter.getBoundingClientRect();
      const parentX = containerRef.current.getBoundingClientRect().x;
      const letterXCenter = x - parentX + width / 2;
      const distanceFromCenter = Math.abs(letterXCenter - midPointX);
      const direction = letterXCenter < midPointX ? -1 : 1;

      // Base velocity decreases linearly from the center to the edges
      let velocity = 1 - (distanceFromCenter / midPointX);

      // Add noise to the base velocity for each letter
      velocity = addNoiseToPressure(velocity, index, totalLength);

      return {
        initial: { y: 0, rotate: 0, opacity: 1 },
        animate: {
          y: [0, velocity * velocity * 200, velocity * velocity * 400], // Y movement with noise
          x: [0, direction * velocity * velocity * 50, direction * velocity * velocity * 200], // X movement with noise
          rotate: [0, -direction * velocity * 25 * Math.random(), -direction * velocity * 50 * Math.random()], // Rotation with noise
          opacity: [1, 1, velocity > 0.9 ? 0 : 1], // Fade out
        },
        transition: {
          duration: 4 - velocity, // Duration affected by velocity
          times: [0, 0.5, 1], // Keyframes for the animation
          ease: "linear",
        }
      };
    });

    setAnimationProps(newAnimationProps);
  }, [text]);

  return (
    <div ref={containerRef} style={{ position: 'relative', overflow: 'visible' }}>
      {text.split('').map((char, index) => (
        <m.span
          key={index}
          style={{ display: 'inline-block', whiteSpace: 'pre-wrap', willChange: 'transform'}}
          initial={animationProps[index]?.initial}
          animate={animationProps[index]?.animate}
          transition={animationProps[index]?.transition}
        >
          {char}
        </m.span>
      ))}
    </div>
  );
};

export default WashedAwayText;
