#!/usr/bin/env node
// G14-R14 — KIỂM PHỦ HIỂN THỊ.
//
// Bóc MỌI trường mang chuỗi tiếng Nhật ra khỏi lessons.json rồi đối chiếu với
// shared/config/render-coverage.json. Trường chưa khai → FAIL.
//
// Vì sao cần: `intro.examples` có đủ displayText + reading + dịch + speechText
// trên cả 5 bài (15 câu) mà KHÔNG nền nào vẽ. Hai lượt rà bằng mắt đều lọt,
// vì không có chỗ nào ghi "trường này phải hiện ở đâu". Kiểm này biến câu hỏi
// đó thành một phép so danh sách.
//
// Kiểm này KHÔNG tự biết widget nào vẽ gì — nó bắt trường LẠ và bắt khai
// thiếu. Việc render thật do widget test của mỗi nền gác.
//
// Dùng: node scripts/check-render-coverage.mjs

import { readFileSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const LESSONS = path.join(ROOT, "shared", "generated", "lessons.json");
const MAP = path.join(ROOT, "shared", "config", "render-coverage.json");

const JP = /[぀-ヿ一-鿿]/;
const PLATFORMS = ["web", "flutter"];
const CLASSES = ["display", "aid", "tts", "internal"];

function collectFields(lesson) {
  const found = new Map(); // tên trường → { count, viDu }
  const walk = (node) => {
    if (Array.isArray(node)) return node.forEach(walk);
    if (!node || typeof node !== "object") return;
    for (const [key, value] of Object.entries(node)) {
      if (typeof value === "string") {
        if (!JP.test(value)) continue;
        const cur = found.get(key) ?? { count: 0, viDu: value };
        cur.count += 1;
        found.set(key, cur);
      } else walk(value);
    }
  };
  walk(lesson);
  return found;
}

function main() {
  if (!existsSync(LESSONS)) {
    console.error(`Không thấy ${LESSONS} — chạy 'npm run generate:curriculum' trước.`);
    process.exit(2);
  }
  const all = JSON.parse(readFileSync(LESSONS, "utf8"));
  const lessons = (all.lessons ?? all).filter((l) => l.lessonFormat === "five_cards");
  const map = JSON.parse(readFileSync(MAP, "utf8"));
  const declared = map.fields ?? {};

  const seen = new Map();
  for (const lesson of lessons) {
    for (const [k, v] of collectFields(lesson)) {
      const cur = seen.get(k) ?? { count: 0, viDu: v.viDu };
      cur.count += v.count;
      seen.set(k, cur);
    }
  }

  const errors = [];
  const warnings = [];

  console.log(`KIỂM PHỦ HIỂN THỊ (G14-R14) — ${lessons.length} bài five_cards`);
  console.log("");

  // 1. Trường có trong dữ liệu mà CHƯA khai.
  const undeclared = [...seen.keys()].filter((k) => !declared[k]).sort();
  for (const k of undeclared) {
    errors.push(
      `TRƯỜNG CHƯA KHAI: '${k}' (${seen.get(k).count} chỗ mang tiếng Nhật)\n` +
        `    ví dụ: ${JSON.stringify(seen.get(k).viDu.slice(0, 60))}\n` +
        `    → thêm một dòng vào shared/config/render-coverage.json, ghi rõ class\n` +
        `      (display / aid / tts / internal) và nền nào đã vẽ.`,
    );
  }

  // 2. Khai rồi nhưng khai sai hình. HAI CỜ, mỗi cờ false phải có waivedReason.
  for (const [k, decl] of Object.entries(declared)) {
    if (!CLASSES.includes(decl.category)) {
      errors.push(`'${k}': category '${decl.category}' không hợp lệ (${CLASSES.join(" / ")})`);
      continue;
    }
    for (const flag of ["mustRender", "mustDeclareProvenance"]) {
      if (typeof decl[flag] !== "boolean") {
        errors.push(`'${k}': thiếu cờ '${flag}' (phải là true/false)`);
      }
    }
    const rendered = Array.isArray(decl.renderedOn) ? decl.renderedOn : [];
    const bad = rendered.filter((p) => !PLATFORMS.includes(p));
    if (bad.length) errors.push(`'${k}': nền lạ trong renderedOn: ${bad.join(", ")}`);

    // Bất kỳ cờ nào false → BẮT BUỘC có lý do.
    const anyFalse = decl.mustRender === false || decl.mustDeclareProvenance === false;
    if (anyFalse && !String(decl.waivedReason ?? "").trim()) {
      errors.push(
        `'${k}': có cờ false (mustRender=${decl.mustRender} · ` +
          `mustDeclareProvenance=${decl.mustDeclareProvenance}) nhưng THIẾU waivedReason.`,
      );
    }
    // mustRender=true thì phải vẽ đủ hai nền.
    if (decl.mustRender === true) {
      const missing = PLATFORMS.filter((p) => !rendered.includes(p));
      if (missing.length) {
        errors.push(
          `'${k}' có mustRender=true nhưng chưa vẽ ở: ${missing.join(", ")}\n` +
            `    → hoặc vẽ nó, hoặc đặt mustRender=false kèm waivedReason.`,
        );
      }
    }
  }

  // 3. Khai thừa: có trong bản đồ mà dữ liệu không còn dùng.
  const stale = Object.keys(declared).filter((k) => !seen.has(k)).sort();
  for (const k of stale) {
    warnings.push(`'${k}': khai trong bản đồ nhưng KHÔNG còn trường nào mang tiếng Nhật — khai thừa?`);
  }

  const byClass = {};
  for (const [k, d] of Object.entries(declared)) {
    if (!seen.has(k)) continue;
    (byClass[d.category] ??= []).push(k);
  }
  for (const c of CLASSES) {
    const list = (byClass[c] ?? []).sort();
    console.log(`  ${c.padEnd(9)} ${String(list.length).padStart(2)} trường  ${list.join(" · ")}`);
  }
  const mustDeclare = Object.entries(declared).filter(([k, d]) => d.mustDeclareProvenance && seen.has(k));
  const waivedDecl = Object.entries(declared).filter(([k, d]) => !d.mustDeclareProvenance && seen.has(k));
  console.log("");
  console.log(`  PHẢI KHAI NGUỒN: ${mustDeclare.length} trường — ${mustDeclare.map(([k]) => k).sort().join(" · ")}`);
  console.log(`  MIỄN KHAI NGUỒN: ${waivedDecl.length} trường`);
  for (const [k, d] of waivedDecl) console.log(`    ${k.padEnd(20)} ${d.waivedReason}`);

  console.log("");
  if (warnings.length) {
    console.log("── CẢNH BÁO ──");
    for (const w of warnings) console.log(`  ! ${w}`);
    console.log("");
  }
  if (errors.length) {
    console.log("── LỖI ──");
    for (const e of errors) console.log(`  ✗ ${e}`);
    console.log("");
    console.log(`KIỂM PHỦ HIỂN THỊ: HỎNG — ${errors.length} lỗi`);
    process.exit(1);
  }
  console.log(
    `KIỂM PHỦ HIỂN THỊ: ĐẠT — ${seen.size} trường mang tiếng Nhật, khai đủ ${seen.size}/${seen.size}`,
  );
}

main();
