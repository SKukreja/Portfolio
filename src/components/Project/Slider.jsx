import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';

const hueRotate = keyframes`
  0% {
      filter: hue-rotate(10deg);
  }
  50% {
      filter: hue-rotate(-30deg);
  }
  100% {
      filter: hue-rotate(10deg);
  }
`;

const SliderWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 50vmin;
  margin-left: auto;
  margin-right: auto;
  overflow: visible;
`;

const Slides = styled.div`
    position: relative;
    width: 80%;
    display: flex;
    align-items: center;
    justify-content: center;
    height: fit-content;
`;

const Slide = styled.div`
    position: absolute;
    width: 50%;
    height: auto;
    opacity: 0.5;
    display: flex;
    justify-content: center;
    flex-direction: column;
    transition: all 0.5s ease;
    background-position: center;
    pointer-events: none;
    user-select: none;
    background-size: cover;
    &.active {
        opacity: 1;
        width: 70%;
        z-index: 3;
        height: auto;
    }
    &.left {
        transform: translateX(-50%);
        z-index: 1;
    }
    &.right {
        transform: translateX(50%);
        z-index: 2;
    }

    img, video {
        width: 100%;
        height: auto;
    }
    @media (max-width: 768px) {
        &.active {            
            width: 100%;
        }
    }
`;

const Arrow = styled.svg`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    transition: all 0.5s ease;
    height: 1.5rem;
    width: 1.5rem;
    fill: #080708;    
    animation: ${hueRotate} 18s linear infinite;
    cursor: pointer;
    user-select: none;
    z-index: 2;
    &:hover {
        fill: var(--accent-colour);
    }
    &.left {
        left: 10px;
    }
    &.right {
        right: 10px;
    }
`;

const Slider = ({ media, className, interval = 5000 }) => {
    const [current, setCurrent] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    const slides = media.data;

    const handlePrev = () => {
        setCurrent((current - 1 + slides.length) % slides.length);
    };

    const handleNext = () => {
        setCurrent((current + 1) % slides.length);
    };

    useEffect(() => {
        if (!isHovered) {
        const timer = setTimeout(handleNext, interval);
        return () => {
            clearTimeout(timer);
        };
        }
    }, [current, isHovered]);

    const getMediaType = (mime) => {
        if (mime.startsWith("video")) {
        return "video";
        }
        return "image";
    };
  
    return (
        <SliderWrapper
            className={className}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onTouchStart={() => setIsHovered(true)}
            onTouchEnd={() => setIsHovered(false)}
        >
            <Arrow className='left' onClick={handlePrev} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 621 1009.11">            
                <path d="m621,838.17v170.83c-5.07.5-9.3-.73-13.58-3.99-28.08-21.38-56.38-42.46-84.65-63.58-28.62-21.39-57.32-42.67-85.91-64.09-29.95-22.45-59.76-45.08-89.71-67.51-27.36-20.49-54.88-40.75-82.24-61.24-47.68-35.71-95.24-71.59-142.93-107.28-40.59-30.37-81.31-60.57-121.97-90.85,0-29.64,0-59.27,0-88.91,2.43-1.6,4.96-3.08,7.29-4.82,35.08-26.27,70.07-52.67,105.21-78.86,33.13-24.69,66.45-49.13,99.63-73.75,33.96-25.2,67.87-50.47,101.75-75.76,20.34-15.19,40.58-30.52,60.92-45.72,19.53-14.6,39.13-29.11,58.71-43.66,22.11-16.42,44.25-32.8,66.32-49.26,20.03-14.94,40.01-29.95,59.99-44.95,16.12-12.1,32.25-24.19,48.26-36.43,3.22-2.46,5.96-5.54,8.92-8.34,1.33,0,2.67,0,4,0v170.83c-.86.35-1.84.54-2.56,1.08-13.69,10.1-27.33,20.25-41.01,30.36-41.47,30.65-82.98,61.25-124.4,91.96-30.49,22.6-60.83,45.41-91.33,68.01-27.62,20.47-55.37,40.77-83.02,61.19-27.98,20.66-55.92,41.38-83.87,62.08-8.6,6.37-17.18,12.75-25.93,19.23.82.87,1.3,1.55,1.94,2.02,20.06,14.75,40.16,29.45,60.21,44.21,35.64,26.25,71.25,52.53,106.88,78.79,35.64,26.28,71.31,52.53,106.91,78.86,24.82,18.35,49.5,36.88,74.35,55.2,23.34,17.21,46.81,34.26,70.24,51.36,10.52,7.68,21.08,15.32,31.61,22.99Z" />
            </Arrow>
            <Slides>
                {slides.map((item, index) => {
                    const type = getMediaType(item.attributes.mime);
                    const src = import.meta.env.VITE_APP_UPLOAD_URL + item.attributes.url;
                    const isActive = index === current;
                    const isLeft = (current - 1 + slides.length) % slides.length === index;
                    const isRight = (current + 1) % slides.length === index;

                    const videoRef = useRef(null);

                    useEffect(() => {
                    if (type === "video") {
                        if (isActive) {
                        videoRef.current.play();
                        } else {
                        videoRef.current.pause();
                        }
                    }
                    }, [isActive]);

                    return (
                    <Slide
                        key={index}
                        className={`${isActive ? "active" : ""} ${isLeft ? "left" : ""} ${
                        isRight ? "right" : ""
                        }`}
                    >
                        {type === "image" ? (
                        <img src={src} alt="" onClick={handleNext} />
                        ) : (
                        <video
                            ref={videoRef}
                            src={src}
                            muted
                            loop
                            onClick={handleNext}
                        ></video>
                        )}
                    </Slide>
                    );
                })}
            </Slides>
            <Arrow className='right' onClick={handleNext} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 621 1009.11">            
                <path d="m0,838.17c0,56.94,0,113.89,0,170.83,5.07.5,9.3-.73,13.58-3.99,28.08-21.38,56.38-42.46,84.65-63.58,28.62-21.39,57.32-42.67,85.91-64.09,29.95-22.45,59.76-45.08,89.71-67.51,27.36-20.49,54.88-40.75,82.24-61.24,47.68-35.71,95.24-71.59,142.93-107.28,40.59-30.37,81.31-60.57,121.97-90.85,0-29.64,0-59.27,0-88.91-2.43-1.6-4.96-3.08-7.29-4.82-35.08-26.27-70.07-52.67-105.21-78.86-33.13-24.69-66.45-49.13-99.63-73.75-33.96-25.2-67.87-50.47-101.75-75.76-20.34-15.19-40.58-30.52-60.92-45.72-19.53-14.6-39.13-29.11-58.71-43.66-22.11-16.42-44.25-32.8-66.32-49.26-20.03-14.94-40.01-29.95-59.99-44.95C45.07,32.66,28.94,20.57,12.92,8.34,9.7,5.88,6.96,2.8,4,0,2.67,0,1.33,0,0,0c0,56.94,0,113.89,0,170.83.86.35,1.84.54,2.56,1.08,13.69,10.1,27.33,20.25,41.01,30.36,41.47,30.65,82.98,61.25,124.4,91.96,30.49,22.6,60.83,45.41,91.33,68.01,27.62,20.47,55.37,40.77,83.02,61.19,27.98,20.66,55.92,41.38,83.87,62.08,8.6,6.37,17.18,12.75,25.93,19.23-.82.87-1.3,1.55-1.94,2.02-20.06,14.75-40.16,29.45-60.21,44.21-35.64,26.25-71.25,52.53-106.88,78.79-35.64,26.28-71.31,52.53-106.91,78.86-24.82,18.35-49.5,36.88-74.35,55.2-23.34,17.21-46.81,34.26-70.24,51.36C21.09,822.87,10.54,830.51,0,838.17Z" />
            </Arrow>
        </SliderWrapper>
    );
  };
  
  export default Slider;