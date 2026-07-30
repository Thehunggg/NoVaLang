#!/usr/bin/env node
// SINH SỔ VỐN TỪ ĐÃ DẠY — G14-R11.
//
// Trước 2026-07-30 sổ này sinh ad-hoc, không có script → nó CŨ ngay khi có bài
// mới. Đo được: sổ chỉ có 4 bài, thiếu hẳn u2-l2 và 9 cụm của bài đó, nên bài
// kế tiếp chạy lọc R5 sẽ coi vốn u2-l2 là chưa dạy. Nay có script, chạy lại
// được bất cứ lúc nào.
//
// PHẠM VI (quyết theo DỮ LIỆU, không theo danh sách gõ tay):
//   mọi lesson `languageCode=ja` có `contentStatus=ready` + `playable=true`
//   + `vocabulary[].length > 0`.
// Gồm cả 20 bài kana Core Foundation: chúng dạy thật (あめ・いぬ・うみ…) và
// người học phải xong Core Foundation mới vào daily_life, nên vốn đó ĐÃ có.
// Bỏ chúng ra là R5 sẽ báo nhầm từ người học đã biết là "chưa dạy".
//
// Dùng: node scripts/build-taught-vocabulary.mjs

import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const LESSONS = path.join(ROOT, "shared", "generated", "lessons.json");
const OUT = path.join(ROOT, "shared", "content", "curriculum", "taught-vocabulary.json");

const stripFurigana = (s) => String(s ?? "").replace(/（[぀-ゟー]+）/g, "");

function main() {
  const db = JSON.parse(readFileSync(LESSONS, "utf8"));
  const lessons = db.lessons ?? db;

  const byLang = {};
  const orderByLang = {};

  for (const l of lessons) {
    const lang = l.languageCode;
    if (!lang) continue;
    if (l.contentStatus !== "ready" || l.playable !== true) continue;
    const vocab = l.vocabulary ?? [];
    if (!vocab.length) continue;

    // Giữ dạng THẬT kể cả dấu câu (「元気？」 giữ ？) — R5 tự bỏ dấu khi so khớp.
    // Bỏ ngoặc chú âm vì đó là lớp trợ đọc, không phải mặt chữ của từ.
    const phrases = vocab.map((v) => stripFurigana(v.displayText)).filter(Boolean);
    if (!phrases.length) continue;

    (byLang[lang] ??= {})[l.id] = phrases;
    (orderByLang[lang] ??= []).push({
      id: l.id,
      track: l.track ?? "",
      unitId: l.unitId ?? "",
      order: l.order ?? 0,
    });
  }

  // Thứ tự học — để trả lời được "vốn đã dạy TỚI BÀI NÀY".
  //
  // `displayOrder` KHÔNG dùng được: nó là thứ tự TRONG unit, nên xếp theo nó là
  // trộn hiragana với daily_life vô nghĩa (đo thật: u1-l1 daily_life đứng trước
  // hiragana-u1-l1). Trong một track thì unitId + `order` xếp đúng.
  //
  // Giữa các track: lessons.json KHÔNG mang thứ tự toàn khoá. Core Foundation
  // đứng trước là SỰ THẬT SẢN PHẨM (cổng `coreFoundationCompleted` chặn vào
  // daily_life), không phải con số đo được — ghi thẳng ra đây thay vì suy ra
  // một thứ tự nghe hợp lý.
  const trackRank = (t) => (t.includes("core_foundation") ? 0 : 1);
  for (const lang of Object.keys(orderByLang)) {
    orderByLang[lang].sort(
      (a, b) =>
        trackRank(a.track) - trackRank(b.track) ||
        a.unitId.localeCompare(b.unitId) ||
        a.order - b.order ||
        a.id.localeCompare(b.id),
    );
    orderByLang[lang] = orderByLang[lang].map((x) => x.id);
  }

  const out = {
    _note:
      "Sổ vốn từ ĐÃ DẠY, theo ngôn ngữ → lessonId → danh sách cụm. Dùng cho §G7 vùng A " +
      "(bài tập chấm điểm chỉ dùng vốn đã dạy) và cho lọc vốn từ G14-R5. MÁY SINH — " +
      "KHÔNG gõ tay. Sinh lại: node scripts/build-taught-vocabulary.mjs",
    _source: "shared/generated/lessons.json · vocabulary[].displayText (đã bỏ ngoặc chú âm)",
    _phamVi:
      "Mọi lesson contentStatus=ready + playable=true + có vocabulary[]. Gồm cả bài kana " +
      "Core Foundation vì người học phải xong Core Foundation mới vào daily_life.",
    _quyTac:
      "Giữ dạng THẬT kể cả dấu câu (「元気？」 giữ dấu ？). R5 tự bỏ dấu câu khi so khớp.",
    _thuTu:
      "_order[<lang>] là thứ tự học, dùng để tính 'vốn đã dạy TỚI bài X'. " +
      "Core Foundation trước daily_life là sự thật sản phẩm (cổng coreFoundationCompleted), " +
      "không đo được từ lessons.json; phần còn lại xếp theo unitId + order.",
    _generatedAt: new Date().toISOString().slice(0, 10),
    _order: orderByLang,
    ...byLang,
  };

  writeFileSync(OUT, JSON.stringify(out, null, 1), "utf8");

  for (const [lang, m] of Object.entries(byLang)) {
    const n = Object.values(m).reduce((s, a) => s + a.length, 0);
    console.log(`${lang}: ${Object.keys(m).length} bài · ${n} cụm`);
  }
}

main();
