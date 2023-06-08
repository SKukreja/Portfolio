import React, { useRef, useEffect } from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
  overflow: hidden;
  z-index: 0;
`;

const Background = styled.img`
  width: 100vmax;
  height: 100vmax;
  object-fit: cover;
  position: absolute;
  top: 15vmax;
  left: 50%;
  pointer-events: none;
  filter: saturate(140%) brightness(1.1);
  transform: translate(-50%, -50%);
  @media (max-width: 1920px) {
    top: 30vmax;
  }
  @media (max-width: 1440px) {
    top: 35%;
  }
  @media (max-width: 1023px) {
    top: 50%;
  }  
  @media (max-width: 768px) {
    top: 50%;
    left: 30vmax;
  }
`; 

const CanvasStyled = styled.canvas`
  position: absolute;
  top: 15vmax;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #080708;
  mix-blend-mode: multiply;
  width: 100vmax;
  height: 100vmax;
  pointer-events: none;
  @media (max-width: 1920px) {
    top: 30vmax;
  }
  @media (max-width: 1440px) {
    top: 35%;
  }
  @media (max-width: 1023px) {
    top: 50%;
  }  
  @media (max-width: 768px) {
    top: 50%;
    left: 30vmax;
  }
`;

const ShadowTransition = styled.div`
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 200px;
    pointer-events: none;
    z-index: 5;
    background: linear-gradient(to top, rgba(8, 7, 8, 1) 30%, transparent)
`;

const Header = styled.h1`
  color: white;
  display: flex;
  font-family: 'Hind';
  flex-direction: column;
  font-size: 4vmax;
  display: none;
  font-weight: 200;
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-shadow: 0 0 30px 30px #030208;
  @media (max-width: 768px) {
    left: 5vw;
  }  
`;

const Landing = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const viewportMax = Math.max(window.innerWidth, window.innerHeight);
    const resolutionFactor = window.devicePixelRatio || 1;  // Determine the resolution factor

    // Multiply the width and height by the resolution factor
    canvas.width = viewportMax * resolutionFactor;
    canvas.height = viewportMax * resolutionFactor;

    const draw = async () => {
        const gridSize = 128;  // fixed grid size

        const ctx = canvas.getContext("2d");
        // Scale all canvas drawing by the resolution factor
        ctx.scale(resolutionFactor, resolutionFactor);

        // Now we calculate the cellSize and fontSize after we have scaled the context
        const cellSize = viewportMax / gridSize;
        const fontSize = cellSize;  // equal to cellSize

        if ("fonts" in document) {
        await document.fonts.load(`${fontSize}px Pixel`);
        }

        ctx.font = `${fontSize}px Pixel`; 
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
    
        const textGrid = Array.from({ length: gridSize }, () =>
          Array.from({ length: gridSize }, () =>
            Math.round(Math.random()).toString()
          )
        );
    
        const start = performance.now();
        const duration = 5000;
    
        const animate = () => {
            const elapsed = performance.now() - start;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
          
            // Calculate the exact space we want to remove
            const extraSpace = viewportMax - (gridSize * Math.floor(cellSize));
          
            for (let y = 0; y < gridSize; y++) {
              for (let x = 0; x < gridSize; x++) {
                const delay = (x + y) * 20;
                const progress = Math.max(0, (elapsed - delay) / duration);
                ctx.fillStyle = `rgba(255, 255, 255, ${progress})`;
          
                // Gradually distribute the space to remove across the upper rows
                const yOffset = y < extraSpace ? -1 : 0;
          
                ctx.fillText(
                  textGrid[y][x],
                  (x + 0.5) * cellSize,
                  (y + 0.5) * cellSize + yOffset
                );
              }
            }
          
            if (elapsed < duration + gridSize * 2 * 20) {
              requestAnimationFrame(animate);
            }
        };
          
        animate();
      };

    draw();
  }, []);

  return (
    <Container>
        <Background src="/bg.gif" />
        <CanvasStyled ref={canvasRef} />
        <Header>Sumit Kukreja</Header>
        <ShadowTransition />
    </Container>
  );
};

export default Landing;
