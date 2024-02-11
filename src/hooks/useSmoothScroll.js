import { useEffect, useState } from 'react';
import { useAnimationFrame } from 'framer-motion';

const useSmoothScroll = (scrollProgress, start, end, strength = 0.1, threshold = 0.01) => {
  const [smoothScroll, setSmoothScroll] = useState(start);

  useAnimationFrame(() => {
    // Ensure scrollProgress is a valid motion value
    if (!scrollProgress || typeof scrollProgress.get !== 'function') {
      console.error("Invalid scrollProgress motion value");
      return;
    }

    // Calculate the target scroll position
    const targetValue = scrollProgress.get() * (end - start) + start;
    // Update smoothScroll only if the change exceeds the threshold
    setSmoothScroll(prev => {
      const difference = targetValue - prev;
      return Math.abs(difference) > threshold ? prev + difference * strength : prev;
    });
  });

  return smoothScroll;
};

export default useSmoothScroll;
