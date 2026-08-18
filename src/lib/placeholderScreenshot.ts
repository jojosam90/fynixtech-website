export function buildPlaceholderScreenshot(colorFrom: string, colorTo: string): string {
  const rows = [0, 1, 2, 3]
    .map((i) => {
      const y = 560 + i * 200;
      return `
        <rect x="90" y="${y}" width="90" height="90" rx="18" fill="url(#g)" opacity="0.6"/>
        <rect x="210" y="${y + 14}" width="620" height="26" rx="13" fill="#e2e8f0"/>
        <rect x="210" y="${y + 60}" width="400" height="26" rx="13" fill="#f1f5f9"/>
      `;
    })
    .join("");

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="1125" height="2436" viewBox="0 0 1125 2436">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="${colorFrom}"/>
          <stop offset="1" stop-color="${colorTo}"/>
        </linearGradient>
      </defs>
      <rect width="1125" height="2436" fill="#ffffff"/>
      <rect width="1125" height="440" fill="url(#g)"/>
      ${rows}
    </svg>
  `.trim();

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}
