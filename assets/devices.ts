interface MIDIData {
    channel: number,
    pitch: number,
    volume: number,
}

interface Device {
    name: string,
    offset: MIDIData,
    useChannel: boolean,
    fadeOut: boolean,
}

interface DeviceList {
    [key: string]: Device;
}

const DEVICES: DeviceList = {
    '0': {
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
    '1315524914': {
        name: 'Maschine 2 Virtual Output',
        offset: {
            channel: 144,
            pitch: 48,
            volume: 0,
        },
        useChannel: true,
        fadeOut: true,
    },
    '999': { // not tested
        name: 'Intech Studio: Grid PO16',
        offset: {
            channel: 0,
            pitch: 32,
            volume: 0,
        },
        useChannel: false,
        fadeOut: false,
    },
}

export { DEVICES };