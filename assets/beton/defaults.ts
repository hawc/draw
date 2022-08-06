import { ControllerSettings } from "~/interfaces/Controller";

const defaults: ControllerSettings = {
    totalRows: {
        min: 0,
        max: 12,
        step: 1,
        default: 1,
    },
    totalColumns: {
        min: 0,
        max: 12,
        step: 1,
        default: 1,
    },
    currentColumn: {
        min: 0,
        max: 12,
        step: 1,
        default: 0,
    },
    elementWidth: {
        min: 0,
        max: 1,
        step: 1,
        default: 0,
    },
    elementType: {
        min: 0,
        max: 1,
        step: 1,
        default: 0,
    },
};

export {
    defaults,
}