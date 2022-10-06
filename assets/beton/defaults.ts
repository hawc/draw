import { ControllerSettings } from '~/interfaces/Controller';

const defaults: ControllerSettings = {
    totalRows: {
        min: 2,
        max: 12,
        step: 1,
        default: 5,
    },
    totalColumns: {
        min: 1,
        max: 12,
        step: 1,
        default: 5,
    },
    currentColumn: {
        min: 0,
        max: 12,
        step: 1,
        default: 0,
    },
    buildingSection: {
        min: 0,
        max: 2,
        step: 1,
        default: 0,
    },
    elementType: {
        min: 0,
        max: 5,
        step: 1,
        default: 0,
    },
    elementWidth: {
        min: 0,
        max: 1,
        step: 1,
        default: 0,
    },
    side: {
        min: 0,
        max: 1,
        step: 1,
        default: 0,
    },
    style: {
        min: 0,
        max: 2,
        step: 1,
        default: 0,
    },
    x: {
        min: 0,
        max: 2,
        step: 0.05,
        default: 0,
    },
    y: {
        min: 0,
        max: 1,
        step: 0.05,
        default: 0.5,
    },
    z: {
        min: 0,
        max: 2,
        step: 0.05,
        default: 2,
    },
};

export {
    defaults,
};
