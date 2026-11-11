/**
 * Cyber Effects & Decrypter Utilities for Qarluq Uyghur Portfolio
 * Includes text decrypting animation math, audio synth effects, and particle calculations.
 */

const GLITCH_GLYPHS = '01#$@&%*<>{}[]/~=+|!?;:▲▼◆■قۇت';

/**
 * Generates an encrypted/scrambled frame of text towards a target string
 * @param targetText The final readable string
 * @param progress Value from 0.0 to 1.0 representing reveal progress
 */
export function getScrambledText(targetText: string, progress: number): string {
  const p = Math.max(0, Math.min(1, progress));
  const revealedLength = Math.floor(targetText.length * p);

  return targetText
    .split('')
    .map((char, index) => {
      if (char === ' ') return ' ';
      if (index < revealedLength) {
        return char;
      }
      // Return a glitch glyph for unrevealed letters
      const glyphIndex = (index * 7 + Math.floor(p * 50)) % GLITCH_GLYPHS.length;
      return GLITCH_GLYPHS[glyphIndex];
    })
    .join('');
}

/**
 * Calculates distance and opacity for cyber particle connections
 */
export function calculateLaserDistance(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  maxDist = 120
): { distance: number; alpha: number; connects: boolean } {
  const dx = x1 - x2;
  const dy = y1 - y2;
  const distance = Math.hypot(dx, dy);
  const alpha = Math.max(0, 1 - distance / maxDist);
  return {
    distance,
    alpha,
    connects: distance < maxDist
  };
}

/**
 * Synthesizes futuristic sci-fi sound effects via Web Audio API without external audio files
 */
export function playCyberSound(
  ctx: AudioContext,
  soundType: 'laser' | 'glitch' | 'overdrive' | 'powerdown' | 'subtick'
): void {
  try {
    const t0 = ctx.currentTime;

    if (soundType === 'laser') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(1400, t0);
      osc.frequency.exponentialRampToValueAtTime(120, t0 + 0.12);
      gain.gain.setValueAtTime(0.08, t0);
      gain.gain.exponentialRampToValueAtTime(0.001, t0 + 0.12);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(t0);
      osc.stop(t0 + 0.12);
    } else if (soundType === 'overdrive') {
      // Hyperspace / Overdrive power-up boom
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = 'sawtooth';
      osc1.frequency.setValueAtTime(80, t0);
      osc1.frequency.exponentialRampToValueAtTime(480, t0 + 0.35);

      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(40, t0);
      osc2.frequency.exponentialRampToValueAtTime(160, t0 + 0.4);

      gain.gain.setValueAtTime(0.12, t0);
      gain.gain.linearRampToValueAtTime(0.18, t0 + 0.2);
      gain.gain.exponentialRampToValueAtTime(0.001, t0 + 0.5);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start(t0);
      osc2.start(t0);
      osc1.stop(t0 + 0.5);
      osc2.stop(t0 + 0.5);
    } else if (soundType === 'glitch') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(320, t0);
      osc.frequency.setValueAtTime(860, t0 + 0.02);
      osc.frequency.setValueAtTime(180, t0 + 0.04);
      osc.frequency.setValueAtTime(940, t0 + 0.06);

      gain.gain.setValueAtTime(0.06, t0);
      gain.gain.exponentialRampToValueAtTime(0.001, t0 + 0.09);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(t0);
      osc.stop(t0 + 0.09);
    } else if (soundType === 'powerdown') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(420, t0);
      osc.frequency.exponentialRampToValueAtTime(60, t0 + 0.25);
      gain.gain.setValueAtTime(0.08, t0);
      gain.gain.exponentialRampToValueAtTime(0.001, t0 + 0.25);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(t0);
      osc.stop(t0 + 0.25);
    }
  } catch {
    // Autoplay policy or inactive context
  }
}
