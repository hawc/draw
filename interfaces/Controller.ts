interface ControllerSetting {
  min: number;
  max: number;
  step: number;
  default: number;
}

interface ControllerSettings {
  [key: string]: ControllerSetting;
}

interface MIDIData {
  channel: number;
  pitch: number;
  volume: number;
}

interface Device {
  name: string,
  offset: MIDIData;
  useChannel: boolean;
  fadeOut: boolean;
}

interface DeviceList {
  [key: string]: Device;
}

export {
  ControllerSetting,
  ControllerSettings,
  DeviceList,
};
