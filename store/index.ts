import { GetterTree, ActionTree, MutationTree } from 'vuex';
import { DEVICES } from '~/assets/devices';
import { ControllerSetting, ControllerSettings } from '~/interfaces/Controller';

interface messagePayload {
  commitData: ControllerSetting;
  key: string;
  value: number;
}

let DEFAULTS = {};
let DEFAULTS_KEYS = {};
const newestTimestamp = {};

export const state = () => ({
  settings: null,
  stopMultiplicator: 1,
  populated: false,
});

export type RootState = ReturnType<typeof state>;

export const getters: GetterTree<RootState, RootState> = {
  settings: (state: RootState) => state.settings,
  stopMultiplicator: (state: RootState) => state.stopMultiplicator,
  populated: (state: RootState) => state.populated,
};

export const mutations: MutationTree<RootState> = {
  SET_OPTION(state, payload) {
    const property = Object.keys(payload)[0];
    if (
      state.settings[property] !== payload[property] &&
      payload[property] !== null
    ) {
      state.settings[property] = payload[property];
    }
  },
  SET_STOP_MULTIPLICATOR(state: RootState, payload: number): void {
    state.stopMultiplicator = payload;
  },
  // Store needs to be populated on every page to create the settings object.
  // TODO: move to plugin
  POPULATE_STORE(state: RootState, payload: ControllerSettings): void {
    state.settings = getDefaultSettings(payload);
    DEFAULTS = payload;
    DEFAULTS_KEYS = Object.keys(payload);
    state.populated = true;
  },
};

export const actions: ActionTree<RootState, RootState> = {
  SET_OPTIONS({ commit }, payload) {
    const optionKeys = Object.keys(payload);
    optionKeys.forEach((optionKey) => {
      const data = {};
      data[optionKey] = payload[optionKey];
      commit('SET_OPTION', data);
    });
    localStorage.midiDrawSettings = JSON.stringify(payload);
  },
  // TODO: Connection should be handled inside Sender component.
  ADD_MIDI_CONTROLLER(context): void {
    const connect = () => {
      if ('requestMIDIAccess' in navigator) {
        navigator.requestMIDIAccess().then(
          (midi: WebMidi.MIDIAccess) => midiReady(midi),
          (err: ErrorEvent) => console.error('Something went wrong', err),
        );
      }
    };

    const midiReady = (midi: WebMidi.MIDIAccess): void => {
      midi.addEventListener(
        'statechange',
        (event: WebMidi.MIDIConnectionEvent): void =>
          initDevices(event.target as WebMidi.MIDIAccess),
      );
      initDevices(midi);
    };

    const midiDevices = [];

    const initDevices = (midi: WebMidi.MIDIAccess): void => {
      const inputs = midi.inputs.values();
      for (
        let input = inputs.next();
        input && !input.done;
        input = inputs.next()
      ) {
        midiDevices.push(input.value);
      }

      startListening();
    };

    const midiMessageReceived = (
      { data }: { data: Uint8Array },
      {
        midiKnobPosition,
        offset,
        fadeOut,
      }: { midiKnobPosition: number; offset: number; fadeOut: boolean },
    ): void => {
      const knob = data[midiKnobPosition] - offset;
      const value = data['2'];
      const commitData = {} as ControllerSetting;
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

    const startListening = (): void => {
      for (const input of midiDevices) {
        const deviceId = input.id;
        const deviceData = DEVICES[deviceId.toString()] ?? DEVICES['0'];
        const eventData = {
          midiKnobPosition: deviceData.useChannel ? 0 : 1,
          offset:
            deviceData.offset[deviceData.useChannel ? 'channel' : 'pitch'],
          fadeOut: deviceData.fadeOut,
        };
        input.addEventListener(
          'midimessage',
          (event: WebMidi.MIDIMessageEvent) =>
            midiMessageReceived(event, eventData),
        );
      }
    };

    connect();
  },
  FIRE_EVENT(context, payload: messagePayload): void {
    const key = Object.keys(context.state.settings)[payload.key];
    if (key) {
      fireEvent(context, payload.commitData, key, payload.value);
    }
  },
};

function fireEvent(
  context,
  commitData: ControllerSetting,
  key: string,
  degree: number,
) {
  if (key && DEFAULTS[key]) {
    const num = limitNumber(degree, DEFAULTS[key]);
    if (num !== null && !isNaN(num)) {
      commitData[key] = num;
      context.commit('SET_OPTION', commitData);
    }
  }
}

function fadeOption(
  context,
  commitData,
  key,
  degree,
  start = true,
  newTimestamp = +new Date(),
): void {
  if (start) {
    newestTimestamp[key] = newTimestamp;
  }
  fireEvent(context, commitData, key, degree);
  setTimeout(() => {
    if (newestTimestamp[key] === newTimestamp && degree > 0) {
      fadeOption(context, commitData, key, degree - 1, false, newTimestamp);
    }
  }, 10);
}

function limitNumber(number: number, options): number {
  return (
    Math.floor(
      Math.min(
        Math.max((number / 127) * options.max, options.min),
        options.max,
      ) *
        (1 / options.step),
    ) /
    (1 / options.step)
  );
}

function getFromLocalStorage(key: string) {
  return typeof localStorage.midiDrawSettings !== 'undefined'
    ? JSON.parse(localStorage.midiDrawSettings)[key]
    : null;
}

function getDefaultSettings(data: ControllerSettings): ControllerSettings {
  return Object.fromEntries(
    Object.entries(data).map(([key, value]) => [
      key,
      getFromLocalStorage(key) ?? value.default,
    ]),
  );
}
