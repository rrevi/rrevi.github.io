/** Keep Kanagawa's token hues, correcting only inks below AA contrast.
 * Backgrounds match --code-bg in global.css. Applied at build time, so reading
 * and switching themes need no client-side token processing.
 */
const CODE_BACKGROUNDS = { light: '#f3f2e9', dark: '#141610' };
const CODE_FOREGROUNDS = { light: '#252c23', dark: '#f4f4ec' };

function rgb(hex: string): number[] {
  return [1, 3, 5].map((offset) => Number.parseInt(hex.slice(offset, offset + 2), 16));
}

function luminance(channels: number[]): number {
  const linear = channels.map((channel) => {
    const value = channel / 255;
    return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
  });
  return linear[0] * 0.2126 + linear[1] * 0.7152 + linear[2] * 0.0722;
}

export function contrastRatio(first: string, second: string): number {
  const [low, high] = [luminance(rgb(first)), luminance(rgb(second))].sort((a, b) => a - b);
  return (high + 0.05) / (low + 0.05);
}

export function accessibleCodeColor(hex: string, theme: 'light' | 'dark'): string {
  const background = CODE_BACKGROUNDS[theme];
  if (contrastRatio(hex, background) >= 4.5) return hex;
  const original = rgb(hex);
  const target = rgb(CODE_FOREGROUNDS[theme]);
  const mix = (amount: number) => '#' + original.map((channel, index) =>
    Math.round(channel + (target[index] - channel) * amount).toString(16).padStart(2, '0')
  ).join('');
  let low = 0;
  let high = 1;
  for (let step = 0; step < 16; step++) {
    const middle = (low + high) / 2;
    if (contrastRatio(mix(middle), background) >= 4.6) high = middle;
    else low = middle;
  }
  return mix(high);
}

export function accessibleCodeStyle(style: string): string {
  return style.replace(/(^|;)(color|--shiki-dark):\s*(#[\da-f]{6})(?=;|$)/gi,
    (_, separator: string, property: string, color: string) =>
      `${separator}${property}:${accessibleCodeColor(color, property === 'color' ? 'light' : 'dark')}`
  );
}
