import { containsKana } from './japanese-pronunciation.mjs';

/** Validate the generated Q14 field consumed by presentation clients. */
export function requireGeneratedQ14Romanization(value, label = 'Q14 line') {
  if (typeof value !== 'string') {
    throw new TypeError(`${label}: romanization must be a string`);
  }
  if (!value.trim()) {
    throw new Error(`${label}: romanization must not be empty`);
  }
  if (containsKana(value)) {
    throw new Error(`${label}: romanization must not contain kana`);
  }
  return value;
}
