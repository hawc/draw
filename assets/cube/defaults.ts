import { ControllerSettings } from '~/interfaces/Controller';

const defaults: ControllerSettings = {
  bloomStrength: {
    min: 0,
    max: 5,
    step: 0.01,
    default: 1,
  },
  bloomRadius: {
    min: 0,
    max: 1,
    step: 0.01,
    default: 0,
  },
  speed: {
    min: 0.5,
    max: 3,
    step: 0.01,
    default: 0.5,
  },
  size: {
    min: 1,
    max: 2,
    step: 0.01,
    default: 1,
  },
  lineHeight: {
    min: 1,
    max: 4,
    step: 0.001,
    default: 1,
  },
  showSecondary: {
    min: 0,
    max: 1,
    step: 0.1,
    default: 0,
  },
  lineDistance: {
    min: 0,
    max: 1,
    step: 0.01,
    default: 1,
  },
  lineWidth: {
    min: 1,
    max: 10,
    step: 0.01,
    default: 10,
  },
  exposure: {
    min: 0.1,
    max: 2,
    step: 0.01,
    default: 1,
  },
  lineYOffset: {
    min: 0,
    max: 1,
    step: 0.01,
    default: 0.5,
  },
};

export { defaults };
