import { ControllerSettings } from '~/interfaces/Controller';

const defaults: ControllerSettings = {
    lineHeight: {
        min: 0,
        max: 5,
        step: 0.001,
        default: 1,
    },
    lineDistance: {
        min: 0,
        max: 1,
        step: 0.01,
        default: 1,
    },
    lineWidth: {
        min: 0.1,
        max: 1,
        step: 0.01,
        default: 1,
    },
    // lineYOffset: {
    //     min: 0,
    //     max: 1,
    //     step: 0.01,
    //     default: 0.5,
    // },
    // pixelation: {
    //     min: 0,
    //     max: 1,
    //     step: 0.1,
    //     default: 1,
    // },
    // speed: {
    //     min: 0.1,
    //     max: 1,
    //     step: 0.01,
    //     default: 1,
    // },
};

export {
    defaults,
};
