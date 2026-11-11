import test from 'node:test';
import assert from 'node:assert/strict';
import { generateAutonomousPortfolioHtml } from './generateHtml';

test('generateAutonomousPortfolioHtml contains Qarluq Uyghur and excludes Rashidin', () => {
  const html = generateAutonomousPortfolioHtml();
  assert.ok(html.includes('مەن قارلۇق ئۇيغۇر'), 'Must contain Qarluq Uyghur in Uyghur');
  assert.ok(html.includes('QARLUQ_UYGHUR'), 'Must contain Qarluq Uyghur in Latin');
  assert.ok(!html.includes('راشىدىن'), 'Must not contain Rashidin');
});

test('generateAutonomousPortfolioHtml includes East Turkistan flag elements', () => {
  const html = generateAutonomousPortfolioHtml();
  assert.ok(html.includes('تۈركىستان بايرىقى'), 'Must mention Turkistan flag in Uyghur');
  assert.ok(html.includes('#0099ff'), 'Must use authentic Turkistan azure blue');
  assert.ok(html.includes('flag-nav-mask'), 'Must include flag SVG mask definition');
});

test('generateAutonomousPortfolioHtml produces valid HTML structure with scripts', () => {
  const html = generateAutonomousPortfolioHtml();
  assert.ok(html.startsWith('<!DOCTYPE html>'), 'Must start with doctype');
  assert.ok(html.includes('startSwarmAssembly'), 'Must contain swarm assembly function');
  assert.ok(html.endsWith('</html>'), 'Must terminate with html tag');
});
