/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const HACKER_PUNCHLINE =
  'ھەق تاپشۇرۇڭ، بىكارغا مۈشۈكمۇ ئاپتاپقا چىقماس! خۇددى بىز كود يېزىشنى بىكارغا ئۆگەنمىگەندەك.';

/**
 * Validates the user input name for the hacker terminal.
 */
export function validateHackerInput(name: string): { valid: boolean; trimmed: string; error?: string } {
  const trimmed = name.trim();
  if (!trimmed) {
    return { valid: false, trimmed: '', error: 'ئىسمىڭىزنى كىرگۈزۈڭ!' };
  }
  if (trimmed.length > 50) {
    return { valid: false, trimmed, error: 'ئىسىم بەك ئۇزۇن بولۇپ كەتتى (ئەڭ كۆپ بولغاندا 50 ھەرپ).' };
  }
  return { valid: true, trimmed };
}

/**
 * Generates formatted hacker response containing the user's name and the punchline.
 */
export function formatHackerResponse(name: string): {
  userName: string;
  punchline: string;
  statusCode: string;
  timestamp: string;
} {
  const trimmed = name.trim() || 'نامەلۇم ئىشلەتكۈچى';
  return {
    userName: trimmed,
    punchline: HACKER_PUNCHLINE,
    statusCode: '402_PAYMENT_REQUIRED',
    timestamp: new Date().toISOString()
  };
}

/**
 * Generates an array of pseudorandom digital matrix characters for terminal rain
 */
export function generateMatrixChars(count: number = 24): string[] {
  const chars = '0123456789ABCDEF01010101XYZΩλπ∑∆§#%&*<>[]{}';
  const result: string[] = [];
  for (let i = 0; i < count; i++) {
    const idx = Math.floor(Math.random() * chars.length);
    result.push(chars[idx]);
  }
  return result;
}
