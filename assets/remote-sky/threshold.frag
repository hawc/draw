precision mediump float;

// grab texcoords from the vertex shader
varying vec2 vTexCoord;

// our texture coming from p5
uniform sampler2D tex0;
uniform float thresholdValue;
uniform vec3 color1;
uniform vec3 color2;
uniform vec3 color3;
uniform float monotone;
// unused, for passing in-between color. 
// uniform float useColor3;
float useColor3 = 0.0; // default value to interpolate third color.

// this is a common glsl function of unknown origin to convert rgb colors to luminance
// it performs a dot product of the input color against some known values that account for our eyes perception of brighness
// i pulled this one from here https://github.com/hughsk/glsl-luma/blob/master/index.glsl
float luma(vec3 color) {
  return dot(color, vec3(0.299, 0.587, 0.114));
}

void main() {

  vec2 uv = vTexCoord;
  // the texture is loaded upside down and backwards by default so lets flip it
  uv = 1.0 - uv;

  // get the texture as a vec4 using texture2D
  vec4 tex = texture2D(tex0, uv);

  float fullcolor = 1.0;
  float nocolor = 0.0;
  float alpha = fullcolor;
  // if the current pixel is 100% red, the alpha channel is set to 100%
  if(tex.r == fullcolor && tex.g == nocolor && tex.b == nocolor) {
    alpha = nocolor;
  }
  // convert the texture to grayscale by using the luma function  
  float gray = luma(tex.rgb);

  float thresh = smoothstep(thresholdValue, 1.0 - thresholdValue, gray);

  // output the threshold value in all three rgb color channels

  vec3 color3computed;
  if (useColor3 < 0.5) {
    color3computed = mix(color1, color2, 0.5);
  } else {
    color3computed = color3;
  }
  
  if(thresh == fullcolor) {
    gl_FragColor = vec4(color1, alpha);
  } else if(thresh > 0.33) {
    gl_FragColor = vec4(color3computed, alpha);
  } else {
    gl_FragColor = vec4(color2, alpha);
  }
}