import { ControllerSettings } from '~/interfaces/Controller';

const defaults: ControllerSettings = {
  blur: {
    min: 0,
    max: 1,
    step: 0.01,
    default: 0.5,
  },
  brightness: {
    min: 0,
    max: 1,
    step: 0.01,
    default: 0.8,
  },
  textLightness: {
    min: 0,
    max: 255,
    step: 1,
    default: 255,
  },
  grain: {
    min: 0,
    max: 1,
    step: 0.01,
    default: 0.5,
  },
  smudge: {
    min: 0,
    max: 1,
    step: 0.01,
    default: 0,
  },
};

export { defaults };
