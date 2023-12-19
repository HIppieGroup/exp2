import vertex from './shader/vertex.glsl';
import fragment from './shader/fragment.glsl';

const MagicShader = {
  name: 'MagicShader',

  uniforms: {
    tDiffuse: { type: 't', value: null },
    uTexturePositionInit: { type: 't', value: null },


    uTextureOutput: { type: 't', value: null },

    uResolutionInput: {
      type: 'v2',
      value: null,
    },
    uResolutionOutput: {
      type: 'v2',
      value: null,
    },

    uStrength: { type: 'f', value: 0.005 },
    uFrictions: { type: 'f', value: 1 },
    uSpring: { type: 'f', value: null },
    uVelocityMax: { type: 'f', value: 0.0013 },
    uAttraction: { type: 'f', value: 0 },
    uResetStacked: { type: 'i', value: 1 },
    uStackSensibility: { type: 'f', value: 0.8 },
    uRepulsion: { type: 'i', value: 0 },
    uInvert: { type: 'i', value: 0 },
    uMapStrength: { type: 'f', value: 0.32 },
  },

  vertexShader: vertex,
  fragmentShader: fragment,
};

export { MagicShader };
