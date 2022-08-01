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
        default: 1,
    },
    columnType: {
        min: 0,
        max: 12,
        step: 1,
        default: 1,
    },
};

export {
    defaults,
}