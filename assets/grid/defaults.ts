import { ControllerSettings } from '~/interfaces/Controller';

const defaults: ControllerSettings = {
  width: {
    min: 0.1,
    max: 12,
    step: 0.1,
    default: 1,
  },
  totalRows: {
    min: 1,
    max: 12,
    step: 1,
    default: 3,
  },
  totalColumns: {
    min: 1,
    max: 12,
    step: 1,
    default: 3,
  },
  side: {
    min: 0,
    max: 1,
    step: 1,
    default: 1,
  },
  currentColumn: {
    min: 0,
    max: 12,
    step: 1,
    default: 0,
  },
  columnType: {
    min: 0,
    max: 4,
    step: 1,
    default: 0,
  },
  elementType: {
    min: 0,
    max: 4,
    step: 1,
    default: 0,
  },
  style: {
    min: 0,
    max: 2,
    step: 1,
    default: 0,
  },
};

export { defaults };
