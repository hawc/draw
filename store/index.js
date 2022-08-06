import { DEVICES } from "~/assets/devices";

let DEFAULTS = {};
let DEFAULTS_KEYS = {};

// this should be dependent on a usage mode or something, 
// because the fading only makes sense when rendering MIDI loops (i.e. with "Maschine")
const FADE_OUT_SETTINGS = false;
// MIDI data is basically an array of three values ([1,1,1]) - channel, pitch and velocity. Depending of
// the configuration of the device, either "channel" or "pitch" are used for identifying which button
// has been pressed. While using "channel" makes most sense for mixing audio, "pitch" could be used when
// working with basic MIDI devices without mixing software in between.
const USE_CHANNELS = false;

function getRandomNumber(data) {
    const min = Math.ceil(data.min);
    const max = Math.floor(data.max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomElement(array) {
    return array[(Math.random() * array.length) | 0];
}

function getFromLocalStorage(key) {
    return typeof localStorage.midiDrawSettings !== 'undefined' ? JSON.parse(localStorage.midiDrawSettings)[key] : null;
}

// This function maps the option ranges to the MIDI controller ranges.
// We assume the MIDI controller returns a value between 0 and 127.
function limitNumber(number, options) {
    return Math.floor((Math.min(Math.max(number / 127 * options.max, options.min), options.max)) * (1 / options.step)) / (1 / options.step);
}

function getDefaultSettings(data) {
    return Object.fromEntries(
        Object.entries(data).map(
            ([key, value]) => ([key, getFromLocalStorage(key) ?? value.default])
        )
    );
}

export const state = () => ({
    settings: null,
    stopMultiplicator: 1,
    populated: false,
});

let newestTimestamp = {};

function fadeOption(context, commitData, key, degree, start = true, newTimestamp = + new Date()) {
    if (start) {
        newestTimestamp[key] = newTimestamp;
    }
    fireEvent(context, commitData, key, degree);
    setTimeout(() => {
        if (newestTimestamp[key] === newTimestamp && degree > 0) {
            fadeOption(context, commitData, key, degree - 1, false, newTimestamp);
        }
    }, 10)
}

export const mutations = {
    SET_OPTION(state, payload) {
        const property = Object.keys(payload)[0];
        if (state.settings[property] !== payload[property] && payload[property] !== null) {
            state.settings[property] = payload[property];
        }
    },
    SET_STOP_MULTIPLICATOR(state, payload) {
        state.stopMultiplicator = payload;
    },
    // Store needs to be populated on every page to create the settings object.
    // TODO: move to plugin
    POPULATE_STORE(state, payload) {
        state.settings = getDefaultSettings(payload);
        DEFAULTS = payload;
        DEFAULTS_KEYS = Object.keys(payload);
        state.populated = true;
    },
};

export const actions = {
    SET_OPTIONS({ commit }, payload) {
        const optionKeys = Object.keys(payload);
        optionKeys.forEach(optionKey => {
            let data = {};
            data[optionKey] = payload[optionKey];
            commit('SET_OPTION', data);
        });
        localStorage.midiDrawSettings = JSON.stringify(payload);
    },
    // TODO: Connection should be handled inside Sender component.
    addMidiController(context) {
        const connect = () => {
            if ('requestMIDIAccess' in navigator) {
                navigator.requestMIDIAccess()
                    .then(
                        (midi) => midiReady(midi),
                        (err) => console.log('Something went wrong', err));
            }
        };

        const midiReady = (midi) => {
            console.log("init", midi);
            midi.addEventListener('statechange', (event) => initDevices(event.target));
            initDevices(midi);
        };
        const midiDevices = [];

        const initDevices = (midi) => {
            console.log(midi.inputs);
            const inputs = midi.inputs.values();
            for (let input = inputs.next(); input && !input.done; input = inputs.next()) {
                console.log(input);
                midiDevices.push(input.value);
            }

            startListening();
        };

        const midiMessageReceived = ({ data }, { midiKnobPosition, offset, fadeOut }) => {
            // const knob = data[midiKnobPosition] > 143 ? data[midiKnobPosition] - 144 : data[midiKnobPosition] - 128;
            const knob = data[midiKnobPosition] - offset;
            const value = data['2'];
            const commitData = {};
            const key = DEFAULTS_KEYS[knob];
            if (key !== undefined) {
                if (fadeOut) {
                    // checking if value is > 0, so we don't reset setting to 0 after button is released
                    if (value > 0) {
                        fadeOption(context, commitData, key, value);
                    }
                } else {
                    fireEvent(context, commitData, key, value);
                }
            }
        };

        const startListening = () => {
            for (const input of midiDevices) {
                let deviceId = input.id;
                const deviceData = DEVICES[deviceId.toString()] ?? DEVICES['0'];
                const eventData = {
                    midiKnobPosition: deviceData.useChannel ? 0 : 1,
                    offset: deviceData.offset[deviceData.useChannel ? 'channel' : 'pitch'],
                    fadeOut: deviceData.fadeOut,
                };
                input.addEventListener('midimessage', (event) => midiMessageReceived(event, eventData));
            }
        };

        connect();
    },
    FIRE_EVENT(context, payload) {
        let key = Object.keys(context.state.settings)[payload.key];
        if (key) {
            fireEvent(context, payload.commitData, key, payload.value);
        }
    },
};

function fireEvent(context, commitData, key, degree) {
    if (key && DEFAULTS[key]) {
        let num = limitNumber(degree, DEFAULTS[key]);
        if (num !== null && num !== NaN) {
            commitData[key] = num;
            context.commit('SET_OPTION', commitData);
            // localStorage.midiDrawSettings = JSON.stringify(payload);
        }
    }
}