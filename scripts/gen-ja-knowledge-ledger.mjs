#!/usr/bin/env node
// gen-ja-knowledge-ledger.mjs — regenerate the Japanese KNOWLEDGE LEDGER
// (scripts/content/daily-life/ja-knowledge-ledger.md) FROM the real built lesson
// data (shared/generated/lessons.json, which is generated from the approved
// .mjs sources — the single source of truth). NEVER hand-write the ledger:
// run `npm run gen:ja-ledger` after adding/regenerating a lesson.
//
// The ledger is a QUICK INDEX for lesson authors: which word/grammar was taught
// in which lesson, which characters + dialogue contexts were used (avoid
// repeating), and where the curriculum currently stands (last done + next).
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = path.join(ROOT, "scripts", "content", "daily-life", "ja-knowledge-ledger.md");

const mul = (id) => {
  const m = /-m(\d+)-u(\d+)-l(\d+)$/.exec(id);
  return m ? [Number(m[1]), Number(m[2]), Number(m[3])] : [999, 999, 999];
};
const cmp = (a, b) => {
  const [am, au, al] = mul(a.id), [bm, bu, bl] = mul(b.id);
  return am - bm || au - bu || al - bl;
};
const short = (id) => {
  const [m, u, l] = mul(id);
  return `M${m}·U${u}·L${l}`;
};

async function main() {
  const data = JSON.parse(
    await readFile(path.join(ROOT, "shared", "generated", "lessons.json"), "utf8"),
  );
  const ja = data.lessons.filter((l) => String(l.id).startsWith("ja-daily_life-"));
  ja.sort(cmp);
  const taught = ja.filter((l) => l.playable === true && l.lessonFormat === "five_cards");
  const nextSlot = ja.find(
    (l) => l.contentStatus === "blueprint" || l.playable !== true,
  );

  const lines = [];
  const p = (s = "") => lines.push(s);

  p("# Japanese — Knowledge Ledger (Sổ kiến thức tiếng Nhật)");
  p();
  p("> **File `.mjs` bài học là NGUỒN SỰ THẬT; sổ này chỉ là CHỈ MỤC tra nhanh,");
  p("> SINH TỰ ĐỘNG từ dữ liệu bài thật.** Đừng sửa tay — chạy `npm run gen:ja-ledger`");
  p("> sau khi thêm/đổi bài. (Sinh từ `shared/generated/lessons.json`, vốn build");
  p("> từ các file `.mjs` đã duyệt.)");
  p();
  p(`Domain: \`daily_life\` · ngôn ngữ: \`ja\` · số bài đã có nội dung thật: **${taught.length}**.`);
  p();

  // ── ĐANG Ở ĐÂU ─────────────────────────────────────────────────────────
  p("## ĐANG Ở ĐÂU");
  const last = taught[taught.length - 1];
  p(`- **Bài cuối đã xong:** ${last ? `\`${last.id}\` (${short(last.id)}) — ${last.titleByNative?.ja ?? ""} / ${last.titleByNative?.vi ?? ""}` : "(chưa có)"}`);
  p(`- **Bài tiếp theo:** ${nextSlot ? `\`${nextSlot.id}\` (${short(nextSlot.id)}) — ${nextSlot.titleByNative?.ja ?? ""} / ${nextSlot.titleByNative?.vi ?? ""}` : "(hết slot blueprint)"}`);
  p();

  // ── TỪ VỰNG ĐÃ DẠY ─────────────────────────────────────────────────────
  p("## TỪ VỰNG ĐÃ DẠY (headword — từ nào, bài nào)");
  p();
  p("| Từ (display) | reading | Nghĩa (vi) | Bài |");
  p("|---|---|---|---|");
  for (const l of taught) {
    for (const v of l.vocabulary ?? []) {
      const meaning = (v.translationByNative?.vi ?? v.meaningVi ?? "").replace(/\n/g, " ");
      p(`| ${v.displayText ?? ""} | ${v.reading ?? ""} | ${meaning} | ${short(l.id)} |`);
    }
  }
  p();

  // ── NGỮ PHÁP ĐÃ DẠY ────────────────────────────────────────────────────
  p("## NGỮ PHÁP ĐÃ DẠY (mẫu nào, bài nào)");
  p();
  p("| Mẫu (ja) | Nghĩa/ghi chú (vi) | Bài |");
  p("|---|---|---|");
  for (const l of taught) {
    for (const g of l.fiveCardContent?.grammarPatterns ?? []) {
      const title = (g.titleByNative?.ja ?? g.titleByNative?.vi ?? g.title ?? "").replace(/\n/g, " ");
      const mean = (g.meaningByNative?.vi ?? g.meaning ?? "").replace(/\n/g, " ");
      p(`| ${title} | ${mean} | ${short(l.id)} |`);
    }
  }
  p();

  // ── THAM KHẢO ĐÃ DÙNG (không coi là đã dạy chính thức) ─────────────────
  p("## THAM KHẢO ĐÃ DÙNG (\"tham khảo thêm\" — KHÔNG coi là đã dạy chính thức)");
  p();
  p("| Cách nói (term) | reading | Tham khảo cho | Bài |");
  p("|---|---|---|---|");
  let anyRef = false;
  for (const l of taught) {
    for (const r of l.fiveCardContent?.vocabularyReferences ?? []) {
      anyRef = true;
      p(`| ${r.term ?? ""} | ${r.reading ?? ""} | ${r.forWord ?? ""} | ${short(l.id)} |`);
    }
  }
  if (!anyRef) p("| _(chưa có)_ | | | |");
  p();

  // ── NHÂN VẬT + BỐI CẢNH HỘI THOẠI ──────────────────────────────────────
  p("## NHÂN VẬT ĐÃ DÙNG");
  const chars = new Map();
  for (const l of taught) {
    for (const c of l.fiveCardContent?.approvedCharacterNamePool ?? []) {
      if (!chars.has(c.id)) chars.set(c.id, c);
    }
  }
  p();
  for (const c of chars.values()) p(`- \`${c.id}\` — ${c.displayName ?? c.canonicalName}`);
  p();
  p("## BỐI CẢNH HỘI THOẠI ĐÃ DÙNG (tránh lặp tình huống)");
  p();
  for (const l of taught) {
    p(`**${short(l.id)}** — ${l.titleByNative?.vi ?? ""}`);
    for (const g of l.fiveCardContent?.dialogueGroups ?? []) {
      const t = g.titleByNative?.vi ?? g.titleByNative?.ja ?? "";
      const s = (g.situationByNative?.vi ?? "").replace(/\n/g, " ");
      p(`  - ${t}${s ? ` — ${s}` : ""}`);
    }
    const q14 = (l.fiveCardContent?.practice?.exercises ?? []).find(
      (e) => e.type === "real_world_practice_dialogue",
    );
    if (q14?.scenarioTitleByNative) {
      p(`  - _(Q14)_ ${q14.scenarioTitleByNative.vi ?? ""} — ${(q14.scenarioDescriptionByNative?.vi ?? "").replace(/\n/g, " ")}`);
    }
    p();
  }

  await writeFile(OUT, lines.join("\n") + "\n");
  console.log(`gen-ja-knowledge-ledger: wrote ${path.relative(ROOT, OUT)} (${taught.length} taught lesson(s)).`);
}

main().catch((error) => {
  console.error(`gen-ja-knowledge-ledger failed: ${error.message}`);
  process.exit(1);
});
