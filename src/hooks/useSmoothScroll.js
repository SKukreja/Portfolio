import { useEffect, useState } from 'react';
import { useAnimationFrame } from 'framer-motion';

const useSmoothScroll = (scrollProgress, start, end, strength = 0.1) => {
  const [smoothScroll, setSmoothScroll] = useState(start);

  useAnimationFrame(() => {
    if (!scrollProgress || typeof scrollProgress.get !== 'function') {
      console.error("Invalid scrollProgress motion value");
      return;
    }

    const targetValue = scrollProgress.get() * (end - start) + start;
    setSmoothScroll(prev => prev + (targetValue - prev) * strength);
  });

  return smoothScroll;
};

export default useSmoothScroll;