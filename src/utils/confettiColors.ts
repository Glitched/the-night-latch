function hexToOklch(hex: string): [number, number, number] {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;

  const toLinear = (c: number) =>
    c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  const lr = toLinear(r),
    lg = toLinear(g),
    lb = toLinear(b);

  const l = Math.cbrt(0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb);
  const m = Math.cbrt(0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb);
  const s = Math.cbrt(0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb);

  const L = 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s;
  const a = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s;
  const bVal = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s;

  const C = Math.sqrt(a * a + bVal * bVal);
  const H = (Math.atan2(bVal, a) * 180) / Math.PI;

  return [L, C, H < 0 ? H + 360 : H];
}

function oklchToHex(L: number, C: number, H: number): string {
  const hRad = (H * Math.PI) / 180;
  const a = C * Math.cos(hRad);
  const b = C * Math.sin(hRad);

  const l = Math.pow(L + 0.3963377774 * a + 0.2158037573 * b, 3);
  const m = Math.pow(L - 0.1055613458 * a - 0.0638541728 * b, 3);
  const s = Math.pow(L - 0.0894841775 * a - 1.291485548 * b, 3);

  let lr = 4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s;
  let lg = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s;
  let lb = -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s;

  const toSrgb = (c: number) =>
    Math.max(
      0,
      Math.min(
        1,
        c <= 0.0031308 ? 12.92 * c : 1.055 * Math.pow(c, 1 / 2.4) - 0.055
      )
    );
  const toHex = (c: number) =>
    Math.round(toSrgb(c) * 255)
      .toString(16)
      .padStart(2, "0");

  return `#${toHex(lr)}${toHex(lg)}${toHex(lb)}`;
}

export function getConfettiColors(hex: string): string[] {
  const [L, C, H] = hexToOklch(hex);
  return [
    hex,
    oklchToHex(Math.min(L + 0.15, 0.9), C * 1.1, H),
    oklchToHex(Math.max(L - 0.1, 0.3), C * 1.3, H),
    oklchToHex(L, C * 1.0, (H + 20) % 360),
    oklchToHex(Math.min(L + 0.25, 0.92), C * 0.9, H),
    oklchToHex(0.65, 0.3, H),
  ];
}
