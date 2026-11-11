/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  validateHackerInput,
  formatHackerResponse,
  generateMatrixChars,
  HACKER_PUNCHLINE
} from './hackerTerminal.ts';

test('validateHackerInput correctly handles empty, valid, and oversized inputs', () => {
  const emptyRes = validateHackerInput('   ');
  assert.equal(emptyRes.valid, false);
  assert.ok(emptyRes.error);

  const validRes = validateHackerInput('  قارلۇق ئۆسمۈر  ');
  assert.equal(validRes.valid, true);
  assert.equal(validRes.trimmed, 'قارلۇق ئۆسمۈر');

  const longInput = 'A'.repeat(55);
  const invalidRes = validateHackerInput(longInput);
  assert.equal(invalidRes.valid, false);
});

test('formatHackerResponse returns valid payload containing the user name and the specific punchline', () => {
  const result = formatHackerResponse('ئەلى زەپەر');
  assert.equal(result.userName, 'ئەلى زەپەر');
  assert.equal(result.punchline, HACKER_PUNCHLINE);
  assert.ok(result.punchline.includes('مۈشۈكمۇ ئاپتاپقا چىقماس'));
  assert.ok(result.punchline.includes('كود يېزىشنى بىكارغا ئۆگەنمىگەندەك'));
  assert.equal(result.statusCode, '402_PAYMENT_REQUIRED');
});

test('generateMatrixChars returns the expected number of random characters', () => {
  const chars = generateMatrixChars(16);
  assert.equal(chars.length, 16);
  assert.ok(chars.every(c => typeof c === 'string' && c.length === 1));
});
