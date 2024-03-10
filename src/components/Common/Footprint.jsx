import React from 'react';
import { m } from 'framer-motion';



const Footprint = ({ x, y, isLeft, angle, id, onRemove }) => {
    // Adjust the base rotation to align with the cursor movement direction
    // SVG's default orientation is factored into the calculation
    const baseRotation = -180; // SVG is -90 degrees rotated by default
    const rotationAngle = angle * (180 / Math.PI) + baseRotation;
  
    // Define animation states
    const initialStyle = {
      opacity: 1,
      scale: 1,
      y: isLeft ? 30 : -30,
      rotate: rotationAngle, // Use the calculated rotation angle
    };
  
    const animateStyle = {
      opacity: 0,
      scale: 0.9,
      rotate: rotationAngle, // Use the same rotation for animation
      y: isLeft ? 30 : -30,      
      transition: { duration: 2, delay: 1 }
    };
  
    return (
      <m.img
        src={isLeft ? "/left.svg" : "/right.svg"}
        alt="Footprint"
        initial={initialStyle}
        animate={animateStyle}
        onAnimationComplete={() => onRemove(id)}
        style={{
          position: 'absolute',
          left: `${x}px`,
          top: `${y}px`,
          zIndex: 1,
          mixBlendMode: 'difference',
          width: '50px',
          height: 'auto',
          transformOrigin: 'center'
        }}
      />
    );
  };
  
      
export default Footprint;