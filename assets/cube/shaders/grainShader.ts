import { Shader } from '~/interfaces/Renderer';

const GRAIN_SHADER: Shader = {
  uniforms: {
    tDiffuse: { value: null },
    amount: { value: 1.0 },
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
                    uniform sampler2D tDiffuse;
                    varying vec2 vUv;

                    float random( vec2 p )
                    {
                        vec2 K1 = vec2(
                        23.14069263277926, // e^pi (Gelfond's constant)
                        2.665144142690225 // 2^sqrt(2) (Gelfond&Schneider constant)
                        );
                        return fract( cos( dot(p,K1) ) * 12345.6789 );
                    }

                    void main() {
                        vec4 color = texture2D( tDiffuse, vUv );
                        vec2 uvRandom = vUv;
                        uvRandom.y *= random(vec2(uvRandom.y, amount));
                        color.rgb += random(uvRandom)*0.15;
                        gl_FragColor = vec4(color);
                    }`,
};

export { GRAIN_SHADER };
