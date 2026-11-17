import sharp from 'sharp';

interface OgCardOptions {
  title: string;
  subtitle?: string;
  eyebrow: string;
}

function escapeXml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

function wrapLines(text: string, maxChars: number, maxLines: number): string[] {
  const words = text.trim().split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let current = '';

  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (candidate.length <= maxChars) {
      current = candidate;
      continue;
    }
    if (current) lines.push(current);
    current = word;
    if (lines.length === maxLines - 1) break;
  }

  if (current && lines.length < maxLines) {
    const usedWords = lines.join(' ').split(/\s+/).filter(Boolean).length;
    const remaining = words.slice(usedWords).join(' ');
    const finalLine = remaining.length > maxChars ? `${remaining.slice(0, maxChars - 1)}…` : remaining;
    if (finalLine) lines.push(finalLine);
  }

  return lines.length > 0 ? lines : [text.slice(0, maxChars)];
}

/** Renders a 1200x630 Rivian OS Open Graph PNG card via Sharp SVG rasterization. */
export async function renderOgImage({ title, subtitle, eyebrow }: OgCardOptions): Promise<Uint8Array> {
  const titleLines = wrapLines(title, 28, 3);
  const subtitleLines = subtitle ? wrapLines(subtitle, 56, 2) : [];
  const titleLineHeight = 66;
  const subtitleLineHeight = 36;
  const dividerY = 506;
  const subtitleOffset = titleLines.length * titleLineHeight + 18;

  const titleStartY = subtitleLines.length > 0
    ? Math.min(255, dividerY - 26 - subtitleOffset - (subtitleLines.length - 1) * subtitleLineHeight)
    : 290;
  const titleSvg = titleLines
    .map(
      (line, index) =>
        `<text x="88" y="${titleStartY + index * titleLineHeight}" font-family="-apple-system, BlinkMacSystemFont, Helvetica Neue, Arial, sans-serif" font-size="54" font-weight="700" fill="#f4f4ec" letter-spacing="-1">${escapeXml(line)}</text>`,
    )
    .join('\n  ');

  const subtitleStartY = titleStartY + subtitleOffset;
  const subtitleSvg = subtitleLines
    .map(
      (line, index) =>
        `<text x="88" y="${subtitleStartY + index * subtitleLineHeight}" font-family="-apple-system, BlinkMacSystemFont, Helvetica Neue, Arial, sans-serif" font-size="26" font-weight="400" fill="#b8c0af">${escapeXml(line)}</text>`,
    )
    .join('\n  ');

  const pillWidth = Math.min(1024, Math.max(280, Math.round(eyebrow.length * 12.5) + 74));

  const svg = `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#11130f"/>
  <rect x="44" y="44" width="1112" height="542" rx="40" fill="#1b1e18" stroke="#34382f" stroke-width="3"/>
  <rect x="88" y="92" width="${pillWidth}" height="44" rx="22" fill="#262922" stroke="#34382f" stroke-width="2"/>
  <circle cx="116" cy="114" r="6" fill="#ffac00"/>
  <text x="134" y="121" font-family="ui-monospace, SFMono-Regular, Menlo, monospace" font-size="18" font-weight="700" fill="#ffac00" letter-spacing="1.5">${escapeXml(eyebrow.toUpperCase())}</text>
  ${titleSvg}
  ${subtitleSvg}
  <line x1="88" y1="${dividerY}" x2="1112" y2="${dividerY}" stroke="#34382f" stroke-width="2"/>
  <text x="88" y="548" font-family="-apple-system, BlinkMacSystemFont, Helvetica Neue, Arial, sans-serif" font-size="22" font-weight="600" fill="#f4f4ec">Rants on Software Development</text>
  <text x="1112" y="548" text-anchor="end" font-family="ui-monospace, SFMono-Regular, Menlo, monospace" font-size="20" font-weight="600" fill="#ffac00">rrevi.github.io</text>
</svg>`;

  const buffer = await sharp(Buffer.from(svg)).png().toBuffer();
  return new Uint8Array(buffer);
}
