#!/usr/bin/env node
// G14-R14 [JA] — BA bản cùng một phép hiển thị tiếng Nhật phải cho ra ĐÚNG
// cùng kết quả:
//
//   Node   scripts/lib/japanese-furigana.mjs               (lúc sinh dữ liệu)
//   TS     frontend/src/utils/japaneseText.ts              (web)
//   Dart   mobile/.../lib/core/japanese_text.dart          (Flutter)
//
// Bộ chứng dùng chung: shared/config/japanese_text_fixtures.json
//
// File này kiểm bản Node và bản TS. Bản Dart do
// `mobile/novalang_flutter/test/japanese_text_fixtures_test.dart` kiểm, cùng
// bộ fixtures đó.
//
// Bản TS được dịch bằng esbuild (đã có sẵn theo vite, không thêm phụ thuộc)
// rồi nạp thẳng — tức kiểm ĐÚNG file nguồn web đang chạy, không phải bản chép.
//
// Dùng: node scripts/test-japanese-text-parity.mjs

import { readFileSync, writeFileSync, mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { createRequire } from "node:module";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const FIXTURES = path.join(ROOT, "shared", "config", "japanese_text_fixtures.json");
const TS_SOURCE = path.join(ROOT, "frontend", "src", "utils", "japaneseText.ts");

let pass = 0;
let fail = 0;
const t = (name, got, want) => {
  const ok = JSON.stringify(got) === JSON.stringify(want);
  if (ok) pass += 1;
  else fail += 1;
  console.log(
    `  ${ok ? "OK  " : "SAI "} ${name}` +
      (ok ? "" : `\n         nhận  ${JSON.stringify(got)}\n         muốn  ${JSON.stringify(want)}`),
  );
};

async function loadTs() {
  const require = createRequire(import.meta.url);
  let esbuild;
  try {
    esbuild = require(path.join(ROOT, "frontend", "node_modules", "esbuild"));
  } catch {
    return null;
  }
  const src = readFileSync(TS_SOURCE, "utf8");
  const out = esbuild.transformSync(src, { loader: "ts", format: "esm", target: "es2022" });
  const dir = mkdtempSync(path.join(tmpdir(), "novalang-ts-"));
  const file = path.join(dir, "japaneseText.mjs");
  writeFileSync(file, out.code, "utf8");
  try {
    return await import(pathToFileURL(file).href);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

async function main() {
  const fx = JSON.parse(readFileSync(FIXTURES, "utf8"));
  const node = await import("./lib/japanese-furigana.mjs");
  const ts = await loadTs();

  console.log("=== NODE (scripts/lib/japanese-furigana.mjs) ===");
  for (const [input, want] of fx.stripFurigana) {
    t(`stripFurigana(${JSON.stringify(input)})`, node.stripFurigana(input), want);
  }
  for (const [input, want] of fx.blocks) {
    t(`blocks(${JSON.stringify(input)})`, node.readingFromFurigana(input).blocks, want);
  }

  console.log("");
  if (!ts) {
    console.log("=== TS (frontend/src/utils/japaneseText.ts) ===");
    console.log("  BỎ QUA — chưa cài frontend/node_modules (cần esbuild để dịch).");
    console.log("  Chạy `npm install --prefix frontend` rồi chạy lại để kiểm bản web.");
  } else {
    console.log("=== TS (frontend/src/utils/japaneseText.ts, dịch bằng esbuild) ===");
    for (const [input, want] of fx.stripFurigana) {
      t(`stripFurigana(${JSON.stringify(input)})`, ts.stripFurigana(input), want);
    }
    for (const [input, want] of fx.blocks) {
      t(`furiganaBlocks(${JSON.stringify(input)})`, ts.furiganaBlocks(input), want);
    }
    for (const [input, want] of fx.romaji) {
      t(`kanaToRomaji(${JSON.stringify(input)})`, ts.kanaToRomaji(input), want);
    }
    for (const [text, reading, want] of fx.romajiLine) {
      t(`romajiLine(${JSON.stringify(text)})`, ts.romajiLine(text, reading), want);
    }

    console.log("");
    console.log("=== NODE ↔ TS phải khớp nhau trên CÙNG đầu vào ===");
    for (const [input] of [...fx.stripFurigana, ...fx.blocks]) {
      t(
        `strip khớp: ${JSON.stringify(input)}`,
        node.stripFurigana(input),
        ts.stripFurigana(input),
      );
      t(
        `blocks khớp: ${JSON.stringify(input)}`,
        node.readingFromFurigana(input).blocks,
        ts.furiganaBlocks(input),
      );
    }
  }

  console.log("");
  console.log(`TỔNG — OK ${pass} · SAI ${fail}`);
  if (fail > 0) process.exit(1);
}

main();
