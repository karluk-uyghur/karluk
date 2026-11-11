import test from 'node:test';
import assert from 'node:assert/strict';
import { getScrambledText, calculateLaserDistance } from './cyberEffects';

test('getScrambledText scrambles unrevealed characters and leaves revealed characters untouched', () => {
  const target = 'قارلۇق ئۇيغۇر';
  const start = getScrambledText(target, 0);
  assert.notEqual(start, target);
  assert.equal(start.length, target.length, 'Length must be preserved');

  const half = getScrambledText(target, 0.5);
  assert.equal(half.startsWith(target.slice(0, Math.floor(target.length * 0.5))), true);

  const full = getScrambledText(target, 1.0);
  assert.equal(full, target, 'At 1.0 progress, text must be fully revealed');
});

test('calculateLaserDistance correctly determines alpha and connection threshold', () => {
  const near = calculateLaserDistance(0, 0, 30, 40, 100);
  assert.equal(near.distance, 50);
  assert.equal(near.connects, true);
  assert.ok(near.alpha > 0);

  const far = calculateLaserDistance(0, 0, 100, 100, 100);
  assert.equal(far.connects, false);
  assert.equal(far.alpha, 0);
});
