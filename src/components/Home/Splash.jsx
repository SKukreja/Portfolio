import React, { useRef, useEffect, useState, useMemo, memo } from 'react';
import styled from 'styled-components';
import { Plane } from "react-curtains";
import { usePerformance } from '../Common/VideoContext.jsx'; // Import the usePerformance hook

// Styled components
const Scene = styled.div`
  position: relative;
  width: calc(var(--vh, 1vh) * 150);
  height: calc(var(--vh, 1vh) * 150);
  z-index: 1;
  overflow: visible;
  margin-top: calc(var(--vh, 1vh) * -35.5);
  margin-left: calc(var(--vh, 1vh) * -20);
  margin-right: calc(var(--vh, 1vh) * -10);
  pointer-events: none;
  @media (max-width: 1024px) {
    margin-top: calc(var(--vh, 1vh) * -20.5);
    width: 150vw;
    height: 150vw;
    margin-left: -25vw;    
  }
  @media (max-width: 768px) {
    width: 80vh;
    height: 80vh;
    margin-left: -35vw;
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

const Picture = styled.img`
  height: 100%;
  width: 100%;  
  display: none;
  transform: flip;
  object-fit: cover;
`;

const Noise = styled.img`
  display: none;
  height: 100%;
  width: 100%;
  object-fit: cover;
`;

// Shaders
const vertexShader = `
  precision mediump float;
      
  attribute vec3 aVertexPosition;
  attribute vec2 aTextureCoord;

  uniform mat4 uMVMatrix;
  uniform mat4 uPMatrix;
  uniform mat4 planeTextureMatrix;
  uniform mat4 noiseTextureMatrix;

  varying vec3 vVertexPosition;
  varying vec2 vTextureCoord;
  varying vec2 vNoiseCoord;

  uniform float uPlaneDeformation;

  void main() {
    vec3 vertexPosition = aVertexPosition;
    gl_Position = uPMatrix * uMVMatrix * vec4(vertexPosition, 1.0);
    vVertexPosition = aVertexPosition;
    vNoiseCoord = (noiseTextureMatrix * vec4(aTextureCoord, 0.0, 1.0)).xy;
    vTextureCoord = (planeTextureMatrix * vec4(aTextureCoord, 0.0, 1.0)).xy;
  }
`;

const fragmentShader = `
  #define SPEED 10.0
  #define MAX_DIST 1.0
  #define CELLS 10.0
  
  precision mediump float;
  
  varying vec3 vVertexPosition;
  varying vec2 vTextureCoord;
  varying vec2 vNoiseCoord;
  
  uniform sampler2D planeTexture;
  uniform sampler2D noiseTexture;
  uniform float uPlaneVisibility;
  uniform vec2 uResolution;
  uniform float uTime;  
  uniform float uMobile;
  uniform float uMaxTime;

  float sqrLen(vec2 vec) {
    return vec.x * vec.x + vec.y * vec.y;  
  }

  vec2 random2(vec2 p) {
    return fract(sin(vec2(dot(p, vec2(115.1, 311.7)), dot(p, vec2(289.5, 183.3)))) * 37958.5453);
  }

  float noise(in vec3 x) {
    vec3 p = floor(x);
    vec3 f = fract(x);
    f = f * f * (3.0 - 2.0 * f);
    vec2 uv = (p.xy + vec2(32.0, 1.0) * p.z) + f.xy;
    vec2 rg = texture2D(noiseTexture, (uv + 0.5) / 256.0, -100.0).yx;
    return mix(rg.x, rg.y, f.z);
  }

  float mapToRange(float fromMin, float fromMax, float toMin, float toMax, float val) {
    val = max(fromMin, min(fromMax, val));
    float fromSize = fromMax - fromMin;
    val = (val - fromMin) / fromSize;
    return mix(toMin, toMax, val);
  }

  float opUnion(float d1, float d2) {
    return min(d1, d2);  
  }

  float opMinus(float d1, float d2) {
    return max(-d1, d2);
  }

  float opIntersect(float d1, float d2) {
    return max(d1, d2);
  }

  float circle(vec2 diff, float radius) {
    return length(diff) - radius;
  }

  float line(vec2 diff, vec2 dir, float thickness) {
    vec2 proj = dot(diff, dir) * dir;
    vec2 perp = diff - proj;
    return length(perp) - thickness;
  }

  float signedDist2D(vec2 pos) {
    float dist = MAX_DIST;
    for (int i = 0; i < int(CELLS); ++i) {          
      dist = opUnion(dist, circle(random2(vec2(i)), 1.0 / (CELLS * 2.0)));
    }
    return dist;
  }

  float FX2(float val, float noise, float expansion, float time) {    
    noise = pow(noise, 2.2);
    val = val * expansion;
    float str = (1.0 + val * time) * expansion;
    float str2 = pow(str, 25.);
    str = str2 * noise;
    str = mapToRange(0.1, 1.0, 0.0, 1.0, str);
    return str;
  }

  float FX3(float val, float noise, float expansion, float time) {    
    val = clamp(val, 0.0, 1.0);
    float str = mapToRange(0.3, 1.0, 0.0, 1.0, FX2(val, noise, expansion, time)) * expansion;
    float ins = FX2(val * pow(expansion - 0.5, 1.0), noise, expansion, time) * expansion;
    ins = mapToRange(0.0, 50.0, 0.0, 1.0, ins);
    str += ins;
    return str;
  }

  float easeOutCubic(float t) {
    return 1.0 - pow(1.0 - t, 4.0);
  }
  
  void main() {
    float time = uTime / uMaxTime; // Use the uniform here
    time = easeOutCubic(time);

    vec2 fragPos = vNoiseCoord;
    vec3 pos = vec3(fragPos, time * 0.0001);
    
    vec3 scaledPos = 6.67 * pos;
    float noiseVal = 0.0;
    float ampl = 2.42;
    float maxValue = 0.0;
    
    for(float i = 0.0; i < 8.0; ++i) {
        noiseVal += noise(scaledPos) * ampl;
        scaledPos *= 2.0;
        maxValue += ampl;
        ampl *= 0.5;
    }
    noiseVal /= maxValue;

    vec2 center = vec2(0.47, 0.355);
    float currentRadius = 0.20 * time;
    float expansion = sqrLen(fragPos - center);
    expansion = 1.0 - expansion;
    expansion += currentRadius;

    float res = FX3(-signedDist2D(fragPos), noiseVal, expansion, time);
    res = clamp(res, 0.0, 1.0);
    vec3 targetColor = vec3(248. / 255., 248. / 255., 248. / 255.);
    gl_FragColor = vec4(mix(targetColor, texture2D(planeTexture, vTextureCoord).rgb, res), 1.0);
  }
`;

// Main component
const Splash = memo(({ isMobile }) => {
  const { isVideoCapable } = usePerformance(); // Use the performance context
  const ref = useRef(null);
  const isVisible = useRef(false);
  const planeRef = useRef(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const lastRenderTime = useRef(0);

  // Determine frame rate and time based on performance
  const frameRate = isVideoCapable ? 60 : 30;
  const maxTime = isVideoCapable ? 240 : 120;
  const frameInterval = 1000 / frameRate;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          isVisible.current = entry.isIntersecting > 0 ? true : false;
        });
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref]);

  // Set the resolution for the plane
  const setPlaneResolution = (plane) => {
    const planeBox = plane.getBoundingRect();
    plane.uniforms.mobile.value = isMobile ? 1 : 0;
    plane.uniforms.resolution.value = [planeBox.width, planeBox.height];
    plane.updatePosition();
  };

  // Plane ready event
  const onPlaneReady = (plane) => {
    planeRef.current = plane;
    setPlaneResolution(plane);
    if (isImageLoaded) {
      setTimeout(() => {
        plane.updatePosition();
      }, 100);
    }
  };

  // Plane resize event
  const onAfterResize = (plane) => {
    setPlaneResolution(plane);
  };

  // Render loop
  const onRender = (plane) => {
    const now = performance.now();
    if (now - lastRenderTime.current < frameInterval) {
      return;
    }
    lastRenderTime.current = now;

    if (!isVisible.current && plane.uniforms.time.value > 0) {
      plane.uniforms.time.value -= 1;
    } else if (isVisible.current && plane.uniforms.time.value < maxTime) {
      plane.uniforms.time.value += 1;
    }
  };

  // Update plane position on image load
  useEffect(() => {
    if (isImageLoaded && planeRef.current) {
      setTimeout(() => {
        planeRef.current.updatePosition();
      }, 100);
    }
  }, [isImageLoaded]);

  // Uniforms for the plane
  const uniforms = useMemo(() => ({
    planeVisibility: {
      name: "uPlaneVisibility",
      type: "1f",
      value: 0
    },
    time: {
      name: "uTime",
      type: "1f",
      value: 0
    },
    resolution: {
      name: "uResolution",
      type: "2f",
      value: [0, 0]
    },
    mobile: {
      name: "uMobile",
      type: "1f",
      value: 0
    },
    maxTime: {
      name: "uMaxTime",
      type: "1f",
      value: maxTime
    }
  }), [isMobile, maxTime]);

  return (
    <Scene ref={ref}>
      <Container>
        {isImageLoaded && (
          <ImagePlane
            vertexShader={vertexShader}
            fragmentShader={fragmentShader}
            widthSegments={10}
            heightSegments={10}
            uniforms={uniforms}
            onRender={onRender}
            onAfterResize={onAfterResize}
            onReady={onPlaneReady}
          >
            <Picture src={'/splash.avif'} data-sampler="planeTexture" alt="Watercolour art depicting Sumit walking his dog and holding a laptop" onLoad={() => setIsImageLoaded(true)} />
            <Noise src={'/splashnoise.avif'} data-sampler="noiseTexture" alt="" aria-hidden="true" />
          </ImagePlane>
        )}
        {!isImageLoaded && (
          <Picture src={'/splash.avif'} alt="" aria-hidden="true" onLoad={() => setIsImageLoaded(true)} />
        )}
      </Container>
    </Scene>
  );
});

export default Splash;
