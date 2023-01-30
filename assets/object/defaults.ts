import { ControllerSettings } from '~/interfaces/Controller';

const defaults: ControllerSettings = {
  bloomStrength: {
    min: 0,
    max: 3,
    step: 0.01,
    default: 1.5,
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
    max: 1.5,
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
    min: 6,
    max: 15,
    step: 0.01,
    default: 12,
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

export {
  defaults,
};
