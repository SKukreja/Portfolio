import { createContext } from 'react';

function getWebGLVersion() {
  if(isUsingOpenGL()) {
    return 'low';
  }
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (gl && gl instanceof WebGLRenderingContext) {
      return 'high';
    }
  } catch (error) {
    console.error('Error detecting WebGL version:', error);
  }

  return 'low';
}

function isUsingOpenGL() {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
  
    if (!gl) {
      return false;
    }
  
    const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
    if (!debugInfo) {
      return false;
    }
  
    const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
    return renderer.toLowerCase().includes("opengl");
}

const WebGLPerformanceContext = createContext(getWebGLVersion());

export default WebGLPerformanceContext;
