/**
 * Smoke checks: answer Unicode normalization must preserve world scripts.
 * Also audits dangerous ASCII-only patterns that would affect answer input.
 */

import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  UNICODE_ANSWER_SAMPLES,
  normalizeAnswer,
  answersMatch,
} from "./lib/answer-normalize.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const failures = [];
const pass = (msg) => console.log(`  PASS ${msg}`);
const fail = (msg) => {
  failures.push(msg);
  console.log(`  FAIL ${msg}`);
};

async function readText(rel) {
  return readFile(path.join(ROOT, rel), "utf8");
}

function checkUnicodeSamples() {
  console.log("\nUnicode answer normalization samples");
  for (const sample of UNICODE_ANSWER_SAMPLES) {
    const out = normalizeAnswer(sample.input);
    if (out !== sample.input) {
      fail(`${sample.name}: expected unchanged "${sample.input}", got "${out}"`);
    } else {
      pass(`${sample.name}: keeps "${sample.input}"`);
    }
    if (out.length === 0 && sample.input.trim().length > 0) {
      fail(`${sample.name}: normalized to empty string`);
    }
  }

  // Must NOT strip accents: cà phê ≠ ca phe
  if (answersMatch("cà phê", "ca phe")) {
    fail('Vietnamese: "cà phê" must not equal "ca phe" without accents');
  } else {
    pass('Vietnamese: accents required ("cà phê" ≠ "ca phe")');
  }

  // NFC: decomposed vs composed should match after NFC on Web/Node
  const nfd = "cafe\u0301"; // café
  const nfc = "café";
  if (normalizeAnswer(nfd) !== normalizeAnswer(nfc)) {
    fail(`NFC: NFD "${nfd}" should match NFC "${nfc}" after normalize`);
  } else {
    pass("NFC: combining acute resolves to composed form");
  }

  // Whitespace collapse + trim
  if (normalizeAnswer("  ありがとう   日本  ") !== "ありがとう 日本") {
    fail("Whitespace collapse failed for Japanese");
  } else {
    pass("Whitespace collapse preserves Japanese");
  }

  // caseInsensitive opt-in only
  if (normalizeAnswer("München") !== "München") {
    fail("Default must preserve case and umlaut");
  } else {
    pass("Default preserves case + umlaut");
  }
  if (normalizeAnswer("HELLO", { caseInsensitive: true }) !== "hello") {
    fail("caseInsensitive:true should lower-case Latin");
  } else {
    pass("caseInsensitive:true lower-cases Latin");
  }
}

async function auditDangerousPatterns() {
  console.log("\nDangerous pattern audit (answer-input related)");
  const answerPaths = [
    "frontend/src/utils/checkAnswer.ts",
    "frontend/src/utils/lessonEngine.ts",
    "frontend/src/components/learning/ExerciseRenderer.tsx",
    "shared/answerNormalize.ts",
    "mobile/novalang_flutter/lib/models/exercise.dart",
    "mobile/novalang_flutter/lib/core/utils/answer_normalize.dart",
    "mobile/novalang_flutter/lib/widgets/common/app_text_field.dart",
    "mobile/novalang_flutter/lib/widgets/lesson/exercise_card.dart",
  ];

  const dangerous = [
    { re: /normalize\(["']NFD["']\)\.replace\(\/\[\\u0300-\\u036f\]/u, label: "NFD + strip combining marks" },
    { re: /removeDiacritics|stripDiacritics|removeAccents/i, label: "removeDiacritics helper" },
    { re: /FilteringTextInputFormatter\.allow\s*\(\s*RegExp\s*\(\s*['"`]\[a-zA-Z/u, label: "ASCII-only FilteringTextInputFormatter" },
    { re: /replace\(\/?\[\^a-zA-Z/u, label: "strip non-Latin replace" },
    { re: /accents\s*=\s*\{[\s\S]*?'à'\s*:\s*'a'/u, label: "Vietnamese accent strip map" },
  ];

  for (const rel of answerPaths) {
    let text;
    try {
      text = await readText(rel);
    } catch {
      fail(`missing file ${rel}`);
      continue;
    }
    for (const rule of dangerous) {
      if (rule.re.test(text)) {
        fail(`${rel}: found ${rule.label}`);
      }
    }
    pass(`${rel}: no dangerous answer-input Unicode strippers`);
  }

  // Known non-answer usages (report only, do not fail)
  console.log("\nNon-answer pattern notes (informational)");
  const notes = [
    {
      file: "frontend/src/components/NativeLanguageSelector.tsx",
      why: "NFD accent-fold for language search filter only — not answer input",
    },
    {
      file: "mobile/novalang_flutter/lib/services/mock_auth_service.dart",
      why: "ASCII slug from email for mock user id — not answer input",
    },
    {
      file: "shared/lessonData.ts",
      why: "slug() uses NFKD for lesson ids — not answer input",
    },
    {
      file: "frontend/src/utils/practiceValidation.ts",
      why: "NFC+lowercase for curriculum quality warnings — not live answer input",
    },
  ];
  for (const note of notes) {
    console.log(`  NOTE ${note.file}: ${note.why}`);
  }
}

async function main() {
  console.log("NovaLang answer Unicode smoke");
  checkUnicodeSamples();
  await auditDangerousPatterns();

  if (failures.length) {
    console.log(`\nFAILED (${failures.length})`);
    for (const f of failures) console.log(`- ${f}`);
    process.exit(1);
  }
  console.log("\nPASS: answer Unicode smoke completed successfully.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
