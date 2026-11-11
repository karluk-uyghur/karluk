import test from 'node:test';
import assert from 'node:assert/strict';
import { getTurkistanFlagSvg, getTurkistanStarPoints } from './flag';

test('getTurkistanFlagSvg produces valid SVG containing sky blue and white elements', () => {
  const svg = getTurkistanFlagSvg({ width: 300, height: 200 });
  assert.ok(svg.includes('<svg'), 'Should start with svg element');
  assert.ok(svg.includes('fill="#0099ff"'), 'Should contain sky blue field');
  assert.ok(svg.includes('mask="url(#turkistan-crescent-mask)"'), 'Should contain crescent mask');
  assert.ok(svg.includes('<polygon'), 'Should contain star polygon');
});

test('getTurkistanStarPoints returns 10 coordinate pairs for a 5-pointed star', () => {
  const points = getTurkistanStarPoints(500, 300, 50, 20);
  const pairs = points.split(' ');
  assert.equal(pairs.length, 10, 'Star should have exactly 10 vertices (5 outer, 5 inner)');
});
