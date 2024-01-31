import React, { useState, useEffect, useRef } from 'react';
import Footprint from './Footprint';
import styled from 'styled-components';


const Footprints = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    inset: 0;
    overflow: hidden;
    z-index: 5;
    pointer-events: passive;
`;

const FootprintTracker = ({ horizontalOffset }) => {
  const [footprints, setFootprints] = useState([]);
  const lastPosition = useRef({ x: 0, y: 0 });
  const lastFootprintTime = useRef(0);
  const isLeft = useRef(true);
  const minDistance = 100; // Minimum distance to move before creating a new footprint

  const addFootprint = (x, y, angle) => {
    const now = Date.now();
    if (now - lastFootprintTime.current > 100) {
      const dx = x - lastPosition.current.x;
      const dy = y - lastPosition.current.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance > minDistance) {
        const offsetDistance = 20; // Increased distance
        const offsetX = x - offsetDistance * Math.cos(angle);
        const offsetY = y - offsetDistance * Math.sin(angle);
    
        const newFootprint = { x: offsetX, y: offsetY, id: now, isLeft: isLeft.current, angle };
        setFootprints(current => [...current, newFootprint]);
        lastFootprintTime.current = now;
        isLeft.current = !isLeft.current;
        lastPosition.current = { x, y };
      }
    }
  };

  useEffect(() => {
    let throttleTimeout = null;

    const handleMouseMove = (e) => {
        console.log(e.clientX + horizontalOffset, e.clientY);
        const vwToPixels = value => (document.documentElement.clientWidth * value) / 100;

        // Listen for scroll events to update the last known position
        window.addEventListener('scroll', () => {
            lastPosition.current = { 
            x: lastPosition.current.x - vwToPixels(horizontalOffset),
            y: lastPosition.current.y - window.scrollY
            };
        });

        if (!throttleTimeout) {
            throttleTimeout = setTimeout(() => {
            throttleTimeout = null;

            // Calculate the adjusted position based on content translation and scroll
            const adjustedX = e.clientX - vwToPixels(horizontalOffset);
            const adjustedY = e.clientY - window.scrollY;
            const angle = Math.atan2(adjustedY - lastPosition.current.y, adjustedX - lastPosition.current.x);

            addFootprint(adjustedX, adjustedY, angle);
            lastPosition.current = { x: adjustedX, y: adjustedY };

            }, 100); // Throttle rate: Adjust as needed
        }
    };


    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(throttleTimeout);
    };
  }, []);

  const removeFootprint = (id) => {
    setFootprints(footprints => footprints.filter(fp => fp.id !== id));
  };


  return (
    <Footprints>
        {footprints.map(fp => (
            <Footprint
            key={fp.id}
            x={fp.x}
            y={fp.y}
            isLeft={fp.isLeft}
            angle={fp.angle}
            id={fp.id}
            onRemove={removeFootprint}
            />
        ))}
    </Footprints>
  );
};

export default FootprintTracker;
