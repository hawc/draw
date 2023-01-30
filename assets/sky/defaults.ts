import { ControllerSettings } from '~/interfaces/Controller';

const defaults: ControllerSettings = {
  width: {
    min: 0.1,
    max: 12,
    step: 0.1,
    default: 1,
  },
};

export {
  defaults,
};
