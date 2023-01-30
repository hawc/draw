interface ShaderUniform {
  value: null|number|string,
}

interface ShaderUniforms {
  [key: string]: ShaderUniform;
}

interface Shader {
  uniforms: ShaderUniforms;
  vertexShader: string;
  fragmentShader: string;
}

export {
  Shader,
};
