#!/usr/bin/env node

import { JA_UNIT1_LESSON1 } from './content/daily-life/module-1/ja-unit1-lesson1.mjs';
import {
  containsKana,
  romanizeNow,
} from './lib/japanese-pronunciation.mjs';
import { requireGeneratedQ14Romanization } from './lib/q14-romanization-validation.mjs';

const expected = [
  'konbanwa. sumimasen, chotto yoroshii desu ka.',
  'konbanwa. hai, dō shimashita ka.',
  'hajimemashite. ryūgakusei no Tanaka desu. sumimasen ga, jitsu wa, sumaho ga tsukaenakute, michi ga wakaranai n desu.',
  'a, ryūgakusei nan desu ne. hajimemashite. Satō desu.',
  'sore wa taihen desu ne. doko e ikitai n desu ka.',
  'sakura ryō desu. basho, wakarimasu ka.',
  'hai, wakarimasu yo. koko kara chikai desu yo.',
  'issho ni ikimashō ka.',
  'e, ii n desu ka. hontōni arigatō gozaimasu.',
  'ieie. nan de mo nai desu.',
  'tsukimashita yo. koko desu.',
  'tasukarimashita. Satō-san, arigatō gozaimashita.',
  'nan de mo nai desu.',
  'Tanaka-san, benkyō o ganbatte kudasai ne. sayōnara.',
];

const q14 = JA_UNIT1_LESSON1.lesson.content.practice.exercises.find(
  (exercise) => exercise.order === 14,
);
if (!q14 || q14.type !== 'real_world_practice_dialogue') {
  throw new Error('Q14 real_world_practice_dialogue source was not found');
}
if (q14.dialogueLines.length !== expected.length) {
  throw new Error(
    `Q14 must contain ${expected.length} lines, got ${q14.dialogueLines.length}`,
  );
}

for (const [index, line] of q14.dialogueLines.entries()) {
  const actual = await romanizeNow(line.targetText);
  if (!actual || containsKana(actual)) {
    throw new Error(`Q14 line ${index + 1} produced invalid romaji: ${actual}`);
  }
  if (actual !== expected[index]) {
    throw new Error(
      `Q14 line ${index + 1} mismatch: ${JSON.stringify(actual)}; ` +
        `expected ${JSON.stringify(expected[index])}`,
    );
  }
  requireGeneratedQ14Romanization(actual, `Q14 line ${index + 1}`);
}

for (const [value, message] of [
  [42, 'must be a string'],
  ['   ', 'must not be empty'],
  ['すまほ', 'must not contain kana'],
]) {
  let caught = null;
  try {
    requireGeneratedQ14Romanization(value, 'invalid fixture');
  } catch (error) {
    caught = error;
  }
  if (!caught?.message.includes(message)) {
    throw new Error(`Malformed romanization fixture did not fail: ${message}`);
  }
}

console.log('PASS: Q14 canonical romanization dry-run completed for 14/14 lines.');
