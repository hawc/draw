const GRAIN_SHADER = {
  uniforms: {
    tDiffuse: { value: null },
    amount: { value: 1.0 },
    rand: { value: 1.0 },
  },
  vertexShader: `
                    varying vec2 vUv;
                    void main() {
                        vUv = uv;
                        gl_Position = projectionMatrix 
                        * modelViewMatrix 
                        * vec4( position, 1.0 );
                    }`,
  fragmentShader: `
                    uniform float amount;
                    uniform float rand;
                    uniform sampler2D tDiffuse;
                    varying vec2 vUv;

                    float random( vec2 co ) {
                        float a = 12.9898;
                        float b = 78.233;
                        float c = 43758.5453;
                        float dt= dot(co.xy ,vec2(a,b));
                        float sn= mod(dt,3.14);
                        return fract(sin(sn) * c * rand);
                    }

                    void main() {
                        vec4 color = texture2D( tDiffuse, vUv );
                        vec2 uvRandom = vUv;
                        uvRandom.y *= random(vec2(uvRandom.y, amount));
                        color.rgb += random(uvRandom)*0.11;
                        gl_FragColor = vec4(color);
                    }`,
};

export { GRAIN_SHADER };
