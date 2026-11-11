/**
 * East Turkistan Flag (كۆك بايراق / Kökbayraq) SVG Generator & Helpers
 * Sky blue field with white crescent moon and 5-pointed star.
 */

export interface FlagOptions {
  width?: number | string;
  height?: number | string;
  className?: string;
  showBorder?: boolean;
  isWaving?: boolean;
  glow?: boolean;
  aspectRatio?: string;
}

/**
 * Returns raw clean SVG string for the East Turkistan flag
 */
export function getTurkistanFlagSvg(options: FlagOptions = {}): string {
  const width = options.width ?? '100%';
  const height = options.height ?? '100%';
  const showBorder = options.showBorder ? 'stroke="rgba(255,255,255,0.25)" stroke-width="6"' : '';
  const filterAttr = options.glow ? 'filter="url(#turkistan-glow)"' : '';

  return `<svg viewBox="0 0 900 600" width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg" class="${options.className || ''}">
  <defs>
    <mask id="turkistan-crescent-mask">
      <rect width="900" height="600" fill="#ffffff" />
      <circle cx="342" cy="300" r="120" fill="#000000" />
    </mask>
    <filter id="turkistan-glow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="2" stdDeviation="6" flood-color="#0099ff" flood-opacity="0.45" />
    </filter>
  </defs>
  <!-- Sky Blue Field (Pantone 300C / #0099ff) -->
  <rect width="900" height="600" rx="12" fill="#0099ff" ${showBorder} ${filterAttr} />
  
  <!-- White Crescent Moon -->
  <circle cx="300" cy="300" r="150" fill="#ffffff" mask="url(#turkistan-crescent-mask)" />
  
  <!-- White 5-pointed Star pointing towards crescent -->
  <polygon points="505,242 522,282 565,274 535,305 558,342 516,324 485,355 491,311 454,286 497,280" fill="#ffffff" />
</svg>`;
}

/**
 * Returns clean 5-pointed star polygon points rotated to point into crescent opening
 */
export function getTurkistanStarPoints(cx = 515, cy = 300, outerR = 60, innerR = 23): string {
  const points: string[] = [];
  // 5 points, offset so left point (index 0) points to crescent opening (angle = PI / 180 deg)
  const angleOffset = Math.PI; // pointing left
  for (let i = 0; i < 10; i++) {
    const r = i % 2 === 0 ? outerR : innerR;
    const a = angleOffset + (i * Math.PI) / 5;
    const x = Math.round((cx + r * Math.cos(a)) * 10) / 10;
    const y = Math.round((cy + r * Math.sin(a)) * 10) / 10;
    points.push(`${x},${y}`);
  }
  return points.join(' ');
}
