import { DeviceList } from '~/interfaces/Controller';

const DEVICES: DeviceList = {
    0: {
        name: 'null',
        offset: {
            channel: 0,
            pitch: 0,
            volume: 0,
        },
        useChannel: false,
        fadeOut: false,
    },
    '-1830361464': {
        name: 'Maschine Mikro MK3',
        offset: {
            channel: 160,
            pitch: 12,
            volume: 0,
        },
        useChannel: false,
        fadeOut: false,
    },
    1315524914: {
        name: 'Maschine 2 Virtual Output',
        offset: {
            channel: 144,
            pitch: 48,
            volume: 0,
        },
        useChannel: true,
        fadeOut: true,
    },
    822093897: {
        name: 'Intech Studio: Grid PO16',
        offset: {
            channel: 0,
            pitch: 32,
            volume: 0,
        },
        useChannel: false,
        fadeOut: false,
    },
};

export { DEVICES };
