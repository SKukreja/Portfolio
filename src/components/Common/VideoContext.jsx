import React, { createContext, useState, useEffect, useContext } from 'react';
import { getGPUTier } from 'detect-gpu';

const VideoContext = createContext();

export const VideoProvider = ({ children }) => {
  const [isVideoCapable, setIsVideoCapable] = useState(false);

  const extractIOSVersion = (userAgent) => {
    const match = userAgent.match(/iPhone OS (\d+)_/);
    if (match && match[1]) {
      const version = parseInt(match[1], 10);
      return version < 16;
    }
    return false;
  };

  useEffect(() => {
    const checkGpuPerformance = async () => {
      const isFirefoxAndroid = navigator.userAgent.includes('Firefox') && navigator.userAgent.includes('Android');
      const isOldIOS = extractIOSVersion(navigator.userAgent);
      const gpuTier = await getGPUTier();
      setIsVideoCapable(!(gpuTier.tier < 1 || isFirefoxAndroid || isOldIOS));
      console.log("GPU Tier: " + gpuTier.tier + "\nisFirefoxAndroid: " + isFirefoxAndroid + "\nisOldIOS: " + isOldIOS)
    };
    checkGpuPerformance();
  }, []);

  return (
    <VideoContext.Provider value={{ isVideoCapable }}>
      {children}
    </VideoContext.Provider>
  );
};

export const usePerformance = () => useContext(VideoContext);
