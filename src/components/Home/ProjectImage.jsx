import React, { useRef } from 'react';
import styled from 'styled-components';
import { Plane } from "react-curtains";

const Scene = styled.div`  
  position: absolute;
  height: 0;
  width: 100%;
  overflow: hidden;
  padding-bottom: 66.6%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1;
  backface-visibility: hidden;
  overflow: visible;
  &.even {
    top: 0;
  }
  &.odd {
    bottom: 0;
  }
  @media (max-width: 768px) {
    position: relative;
    &.odd {
      top: 0;
    }
  }
`;

const Container = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

const ImagePlane = styled(Plane)`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

const vertexShader = `
  precision mediump float;
      
  attribute vec3 aVertexPosition;
  attribute vec2 aTextureCoord;

  uniform mat4 uMVMatrix;
  uniform mat4 uPMatrix;

  uniform mat4 planeTextureMatrix;

  varying vec3 vVertexPosition;
  varying vec2 vTextureCoord;

  uniform float uPlaneDeformation;

  void main() {
    vec3 vertexPosition = aVertexPosition;

    // cool effect on scroll
    vertexPosition.y += sin(((vertexPosition.x + 1.0) / 2.0) * 3.141592) * (sin(uPlaneDeformation / 90.0));

    gl_Position = uPMatrix * uMVMatrix * vec4(vertexPosition, 1.0);
    
    // varyings
    vVertexPosition = aVertexPosition;
    vTextureCoord = (planeTextureMatrix * vec4(aTextureCoord, 0.0, 1.0)).xy;
  }
`;

const fragmentShader = `
  precision mediump float;

  varying vec3 vVertexPosition;
  varying vec2 vTextureCoord;
  
  uniform sampler2D planeTexture;
  
  void main() {
    gl_FragColor = texture2D(planeTexture, vTextureCoord);
  }
`;

const Picture = styled.img`
  width: 100%;
  aspect-ratio: 4 / 3;
  display: none;
`;



function ProjectImage({ onPlaneReady = () => {}, number, imageUrl, even }) {
  const ref = useRef(null);    
  const uniforms = {
    planeDeformation: {
      name: "uPlaneDeformation",
      type: "1f",
      value: 0
    }
  };

  const drawCheckMargins = {
    top: 100,
    right: 0,
    bottom: 100,
    left: 0
  };

  return (
    <Scene ref={ref} className={even ? 'even' : 'odd'} number={number}>
      <Container className={even ? 'even' : 'odd'}>
        <ImagePlane
          // plane init parameters
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          widthSegments={10}
          heightSegments={10}
          drawCheckMargins={drawCheckMargins}
          uniforms={uniforms}
          // plane events
          onReady={onPlaneReady}
        >
          <Picture src={imageUrl} data-sampler="planeTexture" alt="" />
        </ImagePlane>
      </Container>
    </Scene>
  );
}

export default ProjectImage;