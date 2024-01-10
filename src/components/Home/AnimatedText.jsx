import React from 'react';
import { motion } from 'framer-motion';

const AnimatedText = ({ text }) => {
  // Split the text into words, then map each word to its characters
  const words = text.split(' ').map((word) => [...word.split(''), ' ']);

  // Flatten the array of characters
  const characters = words.flat();

  // Animation variants for each character
  const charVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: () => ({
      scale: 1,
      opacity: 1,
      transition: {
        delay: Math.random() * 1 + 1, // Random delay for each character
        duration: 2, // Duration of the animation
        type: 'spring',
        stiffness: 120,
      },
    }),
  };

  return (
    <div style={{ display: 'inline-block' }}>
      {characters.map((char, index) => (
        <motion.span
          key={index}
          variants={charVariants}
          initial="hidden"
          animate="visible"
          style={{ display: 'inline-block', whiteSpace: 'pre' }}
        >
          {char}
        </motion.span>
      ))}
    </div>
  );
};

export default AnimatedText;
