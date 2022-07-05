import colorscale from 'colormap/colorScale';

export default function ({ app }, inject) {
    function shadeHexColor(color, percent) {
        var f = parseInt(color.slice(1), 16), t = percent < 0 ? 0 : 255, p = percent < 0 ? percent * -1 : percent, R = f >> 16, G = f >> 8 & 0x00FF, B = f & 0x0000FF;
        return "#" + (0x1000000 + (Math.round((t - R) * p) + R) * 0x10000 + (Math.round((t - G) * p) + G) * 0x100 + (Math.round((t - B) * p) + B)).toString(16).slice(1);
    }

    function getKey() {
        return (Math.floor(Math.random() * 2 ** 18).toString(36).padStart(4, 0)).toString();
    }

    inject('shadeHexColor', shadeHexColor);
    inject('colors', Object.keys(colorscale));
    inject('shades', 40);
    inject('getKey', getKey);
};