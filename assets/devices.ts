import { DeviceList } from '~/interfaces/Controller';

// useChannel:
// MIDI data is basically an array of three values ([1,1,1]) - channel, pitch and velocity. Depending on
// the configuration of the device, either "channel" or "pitch" are used for identifying which button
// has been pressed. While using "channel" makes most sense for mixing audio, "pitch" could be used when
// working with basic MIDI devices without mixing software in between.

// fadeOut:
// this should be dependent on a usage mode or something,
// because the fading only makes sense when rendering MIDI loops (i.e. with "Maschine")

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
