// This is the input ID offset of my "Intech Studio: Grid" MIDI controller. Probably different for other devices.
const KNOB_OFFSET = 32;

let DEFAULTS = {};
let DEFAULTS_KEYS = {};

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
});

export const mutations = {
    SET_OPTION(state, payload) {
        const property = Object.keys(payload)[0];
        if (state.settings[property] !== payload[property]) {
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
            navigator.requestMIDIAccess()
                .then(
                    (midi) => midiReady(midi),
                    (err) => console.log('Something went wrong', err));
        };

        const midiReady = (midi) => {
            midi.addEventListener('statechange', (event) => initDevices(event.target));
            initDevices(midi);
        };
        const midiDevices = [];

        const initDevices = (midi) => {
            const inputs = midi.inputs.values();
            for (let input = inputs.next(); input && !input.done; input = inputs.next()) {
                midiDevices.push(input.value);
            }

            startListening();
        };

        const midiMessageReceived = ({ data }) => {
            const knob = data['1'];
            const degree = data['2'];
            const commitData = {};
            const key = DEFAULTS_KEYS[knob - KNOB_OFFSET];
            if (key) {
                commitData[key] = limitNumber(degree, DEFAULTS[key]);
                context.commit('SET_OPTION', commitData);
                localStorage.midiDrawSettings = JSON.stringify(payload);
            }
        };

        const startListening = () => {
            for (const input of midiDevices) {
                input.addEventListener('midimessage', midiMessageReceived);
            }
        };

        connect();
    },
};