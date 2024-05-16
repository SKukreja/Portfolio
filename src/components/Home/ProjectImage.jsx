import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { Plane, useCurtains } from "react-curtains";

const Scene = styled.div`  
  position: absolute;
  height: 0;
  width: 150%;
  height: calc(var(--vh, 1vh) * 50);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1;
  backface-visibility: hidden;
  overflow: visible;
  &.even {
    top: -10vh;
  }
  &.odd {
    bottom: -10vh;
  }
  @media (max-width: 1024px) {
    position: relative;
    width: 100vw;
    height: 100vw;
    &.odd, &.even {
      top: 0vh;
      bottom: 0vh;
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
  uniform mat4 noiseTextureMatrix;

  varying vec3 vVertexPosition;
  varying vec2 vTextureCoord;
  varying vec2 vNoiseCoord;

  uniform float uPlaneDeformation;

  void main() {
    vec3 vertexPosition = aVertexPosition;

    // cool effect on scroll


    gl_Position = uPMatrix * uMVMatrix * vec4(vertexPosition, 1.0);
    
    // varyings
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
  uniform float uEven;
  uniform float uMobile;
  uniform float uNumber;

  float sqrLen(vec2 vec)
  {
    return vec.x * vec.x + vec.y * vec.y;  
  }

  vec2 random2( vec2 p ) {
      return fract(sin(vec2(dot(p,vec2(127.1,311.7)),dot(p,vec2(269.5,183.3))))*43758.5453);
  }

  float noise( in vec3 x )
  {
    vec3 p = floor(x);
    vec3 f = fract(x);
    f = f*f*(3.0-2.0*f);
    
    vec2 uv = (p.xy+vec2(37.0,1.0)*p.z) + f.xy;
    vec2 rg = texture2D( noiseTexture, (uv+(0.33 * (uNumber)))/256.0, -100.0 ).yx;
    return mix( rg.x, rg.y, f.z );
  }

  float mapToRange(float fromMin, float fromMax, float toMin, float toMax, float val)
  {
      val = max(fromMin, (min(fromMax, val)));//clamp in range if outside
      float fromSize = fromMax - fromMin;
      val = (val - fromMin) / fromSize;
      return mix(toMin, toMax, val);
  }

  float opUnion(float d1, float d2)
  {
    return min(d1, d2);  
  }

  float opMinus(float d1, float d2)
  {
    return max(-d1, d2);
  }

  float opIntersect(float d1, float d2)
  {
    return max(d1, d2);
  }

  float circle(vec2 diff, float radius)
  {
      return (length(diff) - radius);
  }

  float line(vec2 diff, vec2 dir, float thickness)
  {
      vec2 proj = dot(diff, dir) * dir;
      vec2 perp = diff - proj;
      return length(perp) - thickness;
  }

  float signedDist2D(vec2 pos)
  {
    float dist = MAX_DIST;
      for (int i = 0; i < int(CELLS); ++i)
      {          
          dist = opUnion(dist, circle(random2(vec2(i)), 1.0 / (CELLS * 2.0)));
      }
      return dist;
  }

  float FX2(float val, float noise, float expansion, float time)
  {    
      noise 		= pow(noise, 5.0);
      
      val 		= val * (expansion);
      float str 	= (1.0 + val * time) * (expansion);
      float str2 	= pow(str, 19.0) ;
      str 		= str2 * noise;
      str 		= mapToRange(0.2, 1.0, 0.0, 1.0, str);
      
      return str;
  }

  float FX3(float val, float noise, float expansion, float time)
  {    
      val = clamp(val, 0.0, 1.0);
      float str 	= mapToRange(0.3, 1.0, 0.0, 1.0, FX2(val, noise, expansion, time)) * expansion;
      float ins 	= FX2(val * pow(expansion - 0.5, 1.0), noise, expansion, time) * expansion;
      ins 		= mapToRange(0.0, 50.0, 0.0, 1.0, ins);
      str 		+= ins;
      
      return str;
  }

  float easeOutCubic(float t) {
    return 1.0 - pow(1.0 - t, 3.0);
  }
  
  void main() {
    float time = uTime/400.;
    time = easeOutCubic(time);

    vec2 fragPos = vNoiseCoord;
	  vec3 pos = vec3(fragPos, time * 0.0001);
    
    //noise sampling
    vec3 scaledPos 	= 4.0 * pos;
    float noiseVal 	= 0.0;
    float ampl 		= 2.0;
    float maxValue 	= 0.0;
    
    for(float i = 0.0; i < 8.0; ++i)
    {
        noiseVal += noise(scaledPos) * ampl;
        scaledPos *= 2.0;
        maxValue += ampl;
        ampl *= 0.5;
    }
    noiseVal /= maxValue;

    vec2 center = vec2(0.4, 0.5);

    float currentRadius = 0.47 * time;

    float expansion = sqrLen(fragPos - center);
    expansion = 1.0 - expansion;
    expansion += currentRadius;
    

    float res = FX3(-signedDist2D(fragPos), noiseVal, expansion, time);

    res = clamp(res, 0.0, 1.0);
    vec3 targetColor = vec3(248./255., 248./255., 248./255.);

    gl_FragColor = vec4(mix(targetColor, texture2D(planeTexture, vTextureCoord).rgb, res), 1.0);
  }
`;

const Picture = styled.img`
  height: 100%;
  object-fit: cover;
  display: none;
  padding-bottom: 6rem;
  @media (max-width: 1024px) {
    padding-bottom: 0;
  }
`;

const Noise = styled.img`
  display: none;
  height: 100%;
  object-fit: cover;
`;

function ProjectImage({ isMobile, number, imageUrl, even }) {
  const ref = useRef(null);
  const isVisible = useRef(false);
  const curtains = useCurtains();

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

  const setPlaneResolution = (plane) => {
    const planeBox = plane.getBoundingRect()
    plane.uniforms.mobile.value = isMobile ? 1 : 0
    plane.uniforms.resolution.value = [planeBox.width, planeBox.height]    
    curtains?.needRender();    
  }

  const onAfterResize = (plane) => {
    setPlaneResolution(plane)
  }


  const uniforms = {
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
    even: {
      name: "uEven",
      type: "1f",
      value: even ? 1 : 0
    },
    mobile: {
      name: "uMobile",
      type: "1f",
      value: 0
    },
    number: {
      name: "uNumber",
      type: "1f",
      value: number
    }
  };

  const onRender = (plane) => {

    if (!isVisible.current && plane.uniforms.time.value > 0) {
      plane.uniforms.time.value -= 1;
    }
    else if (isVisible.current && plane.uniforms.time.value < 400) {
      plane.uniforms.time.value += 1;
    }
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
          uniforms={uniforms}
          // plane events
          onRender={onRender}
          onAfterResize={onAfterResize}
          onReady={setPlaneResolution}
        >
          <Picture src={imageUrl} data-sampler="planeTexture" alt="" />
          <Noise src={'/inknoise.png'} data-sampler="noiseTexture" alt="" />
        </ImagePlane>
      </Container>
    </Scene>
  );
}

export default ProjectImage;