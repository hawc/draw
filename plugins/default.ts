import { Inject } from '@nuxt/types/app';
import colorscale from 'colormap/colorScale';
import { ControllerSetting } from '~/interfaces/Controller';

export default function(_, inject: Inject): void {
  function shadeHexColor(color: string, percent: number): string {
    const f = parseInt(color.slice(1), 16); const t = percent < 0 ? 0 : 255; const p = percent < 0 ? percent * -1 : percent; const R = f >> 16; const G = f >> 8 & 0x00FF; const B = f & 0x0000FF;
    return '#' + (0x1000000 + (Math.round((t - R) * p) + R) * 0x10000 + (Math.round((t - G) * p) + G) * 0x100 + (Math.round((t - B) * p) + B)).toString(16).slice(1);
  }

  function getKey(): string {
    return (Math.floor(Math.random() * 2 ** 18).toString(36).padStart(4, '0')).toString();
  }

  // This function maps the option ranges to the MIDI controller ranges.
  // We assume the MIDI controller returns a value between 0 and 127.
  function limitNumber(number: number, options: ControllerSetting): number {
    return Math.floor((Math.min(Math.max(number / 127 * options.max, options.min), options.max)) * (1 / options.step)) / (1 / options.step);
  }

  inject('shadeHexColor', shadeHexColor);
  inject('colors', Object.keys(colorscale));
  inject('shades', 40);
  inject('getKey', getKey);
  inject('limitNumber', limitNumber);
};
