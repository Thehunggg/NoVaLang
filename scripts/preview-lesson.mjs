#!/usr/bin/env node
// preview-lesson.mjs — TRANG DUYỆT TĨNH cho owner.
//
// Đọc bài từ shared/generated/lessons.json + file provenance tương ứng,
// xuất MỘT file HTML tự chứa (không server, không onboarding, mở file là xem)
// vào scripts/preview/<lessonId>.html
//
// Đây là trang DUYỆT, không phải trang chơi: hiện HẾT đáp án, hiện HẾT nhiễu,
// đánh dấu rõ ✓ / ✗, kèm op mutation. Cuối trang là khối provenance để owner
// mở đúng dòng file nguồn đối chiếu.
//
//   node scripts/preview-lesson.mjs ja-daily_life-m01-u2-l2
//   node scripts/preview-lesson.mjs <id1> <id2> ...        (batch)

import fs from "node:fs";
import path from "node:path";
import { normalize } from "./verify-provenance.mjs";
import { hasKanji, readingFromFurigana, splitFurigana } from "./lib/japanese-furigana.mjs";

const LESSONS_FILE = "shared/generated/lessons.json";
const PROV_DIR = "shared/content/curriculum/provenance";
const OUT_DIR = "scripts/preview";
const NAT = process.env.PREVIEW_NATIVE || "vi";

/* ────────────────────────── tiện ích ────────────────────────── */

const esc = (s) =>
  String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

// Lấy bản theo ngôn ngữ mẹ đẻ nếu có, không thì lấy trường gốc.
const nat = (obj, base) => {
  if (!obj) return undefined;
  const m = obj[`${base}ByNative`];
  if (m && m[NAT] !== undefined) return m[NAT];
  return obj[base];
};

const asList = (v) => (v === undefined || v === null ? [] : Array.isArray(v) ? v : [v]);

const nl2br = (s) => esc(s).replace(/\n/g, "<br>");

/* ───────────────── câu Nhật — 3 dòng (owner chốt 2026-07-29) ─────────────────
 * (1) câu SẠCH, bỏ ngoặc furigana. Bật [Furigana từng chữ] thì kana hiện
 *     dạng ruby TRÊN ĐẦU kanji — cùng một DOM, CSS bật/tắt <rt>.
 * (2) dòng kana WAKACHIGAKI — chèn khoảng cách theo RANH GIỚI KHỐI lấy thẳng
 *     từ dữ liệu ngoặc (mỗi cụm kanji（kana） một khối, chữ giữa các khối một
 *     khối). KHÔNG đoán ranh giới từ, KHÔNG đụng trường reading của bài.
 * (3) dịch.
 * Câu không có kanji thì không có ngoặc → không có dòng (2), giữ nguyên.
 * ─────────────────────────────────────────────────────────────────────────── */

const rubyHtml = (text) =>
  splitFurigana(text)
    .map((p) => (p.kana ? `<ruby>${esc(p.text)}<rt>${esc(p.kana)}</rt></ruby>` : esc(p.text)))
    .join("");

const wakachigaki = (text) => readingFromFurigana(text).blocks.join(" ");

/**
 * Một câu Nhật đầy đủ 3 dòng. `text` là chuỗi HIỂN THỊ (đã có furigana ngoặc).
 * `badge` là nhãn provenance đã dựng sẵn.
 */
function jaSentence(text, translation, badge = "", extra = "") {
  const t = String(text ?? "");
  if (!t) return "";
  const out = [`<div class="s">`];
  out.push(`<div class="s1 ja">${rubyHtml(t)}${badge}</div>`);
  if (hasKanji(t) && /（[぀-ゟー]+）/.test(t)) {
    out.push(`<div class="s2">${esc(wakachigaki(t))}</div>`);
  }
  if (extra) out.push(`<div class="s2x">${esc(extra)}</div>`);
  if (translation) out.push(`<div class="s3">${esc(translation)}</div>`);
  out.push(`</div>`);
  return out.join("\n");
}

/** Câu Nhật gọn một dòng (ô bảng, nhãn phương án): sạch ngoặc + ruby được. */
const jaInline = (text) => `<span class="ja s1">${rubyHtml(String(text ?? ""))}</span>`;

/* ─────────────────────── tra provenance ─────────────────────── */

// Tra theo CHUỖI đã chuẩn hoá — cùng hàm normalize mà cổng dùng, để nhãn
// trên trang duyệt và kết quả cổng không bao giờ lệch nhau.
function buildProvIndex(items) {
  const byText = new Map();
  const byPath = new Map();
  for (const it of items) {
    byPath.set(it.path, it);
    const k = normalize(it.targetText);
    if (!byText.has(k)) byText.set(k, it);
  }
  return { byText, byPath };
}

function provBadge(idx, text) {
  if (!text) return "";
  const it = idx.byText.get(normalize(text));
  if (!it) return "";
  if (it.mutation) {
    return `<span class="prov mut">⇄ ${esc(it.mutation.op)} ← ${esc(it.mutation.from)}</span>`;
  }
  if (it.authored) {
    return `<span class="prov auth">✎ tự soạn — ${esc(it.reason ?? "")}</span>`;
  }
  if (it.verbatim) {
    return `<span class="prov vb">↩ ${esc(path.basename(it.source))}:${it.line}</span>`;
  }
  return "";
}

/* ───────────────────────── thẻ 1 — INTRO ───────────────────────── */

function renderIntro(lesson, idx) {
  const f = lesson.fiveCardContent;
  const intro = f.intro ?? {};
  const out = [];

  out.push(`<h2 id="c1">① INTRO — Vào bài</h2>`);

  const situation = asList(nat(intro, "situation"));
  if (situation.length) {
    out.push(`<h3>Tình huống</h3><ul>`);
    for (const s of situation) out.push(`<li>${esc(s)}</li>`);
    out.push(`</ul>`);
  }

  const objectives = asList(nat(intro, "objectives"));
  if (objectives.length) {
    out.push(`<h3>Mục tiêu</h3><ol>`);
    for (const s of objectives) out.push(`<li>${esc(s)}</li>`);
    out.push(`</ol>`);
  }

  const examples = asList(intro.examples);
  if (examples.length) {
    out.push(`<h3>Câu minh hoạ</h3>`);
    for (const ex of examples) {
      const label = nat(ex, "label");
      out.push(`<div class="ex">`);
      if (label) out.push(`<div class="exlabel">${esc(label)}</div>`);
      const tr = ex.translationByNative?.[NAT] ?? ex.translations?.[NAT] ?? ex.meaningVi;
      out.push(jaSentence(ex.displayText ?? ex.targetText, tr, provBadge(idx, ex.targetText ?? ex.displayText)));
      out.push(`</div>`);
    }
  }

  const note = asList(nat(intro, "importantNote"));
  if (note.length) {
    out.push(`<h3>Lưu ý quan trọng</h3><ul class="note">`);
    for (const s of note) out.push(`<li>${esc(s)}</li>`);
    out.push(`</ul>`);
  }

  return out.join("\n");
}

/* ──────────────────────── thẻ 2 — TỪ VỰNG ──────────────────────── */

const registerCell = (v) =>
  v === "" || v === undefined || v === null
    ? `<span class="empty">[trống]</span>`
    : esc(v);

function renderVocabulary(lesson, idx) {
  const f = lesson.fiveCardContent;
  const details = new Map((f.vocabularyDetails ?? []).map((d) => [d.id, d]));
  const out = [];

  const cards = lesson.vocabulary ?? [];
  const refs = f.vocabularyReferences ?? [];

  out.push(`<h2 id="c2">② TỪ VỰNG — ${cards.length} thẻ + ${refs.length} tham khảo</h2>`);
  out.push(`<table class="vocab"><thead><tr>
    <th>#</th><th>Loại</th><th>Từ (giữ furigana)</th><th>Đọc</th>
    <th>Nghĩa (${NAT})</th><th>Register</th><th>Ghi chú</th></tr></thead><tbody>`);

  cards.forEach((v, i) => {
    const d = details.get(v.id) ?? {};
    const meaning = nat(d, "overview") ?? v.translationByNative?.[NAT] ?? v.meaningVi;
    const notes = asList(nat(d, "notes"));
    out.push(`<tr>
      <td>${i + 1}</td>
      <td><span class="tag card">thẻ</span></td>
      <td>${jaInline(v.displayText)}</td>
      <td class="rd">${esc(v.reading ?? "")}</td>
      <td>${esc(meaning ?? "")}</td>
      <td class="reg">${registerCell(d.register)}</td>
      <td class="notes">${notes.length ? notes.map((n) => esc(n)).join("<br>") : ""}</td>
    </tr>`);
    for (const ex of asList(d.examples)) {
      const tr = ex.translationByNative?.[NAT] ?? ex.translation;
      out.push(`<tr class="sub">
        <td></td><td></td>
        <td colspan="2">${jaSentence(ex.text, "", provBadge(idx, ex.text))}</td>
        <td colspan="3">${esc(tr ?? "")}</td>
      </tr>`);
    }
  });

  refs.forEach((r, i) => {
    out.push(`<tr>
      <td>${cards.length + i + 1}</td>
      <td><span class="tag ref">tham khảo</span></td>
      <td>${jaInline(r.term)}</td>
      <td class="rd">${esc(r.reading ?? "")}</td>
      <td>${esc(nat(r, "meaning") ?? "")}</td>
      <td class="reg">${registerCell(r.register)}</td>
      <td class="notes">${asList(nat(r, "notes")).map((n) => esc(n)).join("<br>")}</td>
    </tr>`);
    if (r.example) {
      const tr = r.example.translationByNative?.[NAT] ?? r.example.translation;
      out.push(`<tr class="sub">
        <td></td><td></td>
        <td colspan="2">${jaSentence(r.example.text, "", provBadge(idx, r.example.text))}</td>
        <td colspan="3">${esc(tr ?? "")}</td>
      </tr>`);
    }
  });

  out.push(`</tbody></table>`);
  return out.join("\n");
}

/* ─────────────────────── thẻ 3 — HỘI THOẠI ─────────────────────── */

function renderDialogue(lesson, idx) {
  const groups = lesson.fiveCardContent.dialogueGroups ?? [];
  const out = [`<h2 id="c3">③ HỘI THOẠI — ${groups.length} nhóm</h2>`];

  groups.forEach((g, gi) => {
    out.push(`<div class="dgroup">`);
    out.push(`<h3>Nhóm ${gi + 1}. ${esc(nat(g, "title") ?? g.id)}</h3>`);
    const sit = nat(g, "situation");
    if (sit) out.push(`<p class="sit">${esc(sit)}</p>`);
    out.push(`<table class="turns"><tbody>`);
    for (const ln of g.lines ?? []) {
      const tr = ln.translationByNative?.[NAT] ?? ln.translations?.[NAT] ?? ln.meaningVi;
      out.push(`<tr>
        <td class="spk">${esc(ln.speakerId ?? "")}</td>
        <td>${jaSentence(ln.displayText ?? ln.targetText, tr, provBadge(idx, ln.targetText ?? ln.displayText))}</td>
      </tr>`);
    }
    out.push(`</tbody></table>`);
    for (const e of asList(nat(g, "explanation"))) out.push(`<p class="note">${esc(e)}</p>`);
    out.push(`</div>`);
  });

  return out.join("\n");
}

/* ──────────────────────── thẻ 4 — NGỮ PHÁP ──────────────────────── */

function renderGrammar(lesson, idx) {
  const pats = lesson.fiveCardContent.grammarPatterns ?? [];
  const out = [`<h2 id="c4">④ NGỮ PHÁP — ${pats.length} mẫu</h2>`];

  pats.forEach((p, i) => {
    out.push(`<div class="gpat">`);
    out.push(`<h3>Mẫu ${i + 1}. ${jaInline(p.title)}</h3>`);
    out.push(`<div class="formula ja">${esc(nat(p, "formula") ?? p.formula)}</div>`);
    if (p.formulaReading) out.push(`<div class="rd">${esc(p.formulaReading)}</div>`);
    const meaning = nat(p, "meaning");
    if (meaning) out.push(`<p class="mean">${esc(meaning)}</p>`);
    for (const ex of asList(p.examples)) {
      const tr = ex.translationByNative?.[NAT] ?? ex.translation;
      out.push(jaSentence(ex.text, tr, provBadge(idx, ex.text)));
    }
    for (const e of asList(nat(p, "explanation"))) out.push(`<p class="note">${esc(e)}</p>`);
    out.push(`</div>`);
  });

  return out.join("\n");
}

/* ──────────────────────── thẻ 5 — BÀI TẬP ──────────────────────── */

const MARK_OK = `<span class="mk ok">✓</span>`;
const MARK_NO = `<span class="mk no">✗</span>`;

// Một phương án: đúng thì ✓, sai thì ✗ + nhãn mutation nếu câu đó là biến thể.
function optionRow(idx, opt, isCorrect) {
  const text = opt.text ?? opt.displayText ?? opt.canonicalText ?? "";
  const badge = provBadge(idx, opt.canonicalText ?? text) || provBadge(idx, text);
  return `<li class="${isCorrect ? "ok" : "no"}">
    ${isCorrect ? MARK_OK : MARK_NO}
    <span class="opt">${jaInline(text)}</span>
    <span class="oid">${esc(opt.id ?? "")}</span>
    ${badge}
  </li>`;
}

function feedbackBlock(fb) {
  if (!fb) return "";
  const out = [`<div class="fb">`];
  const ca = fb.correctAnswer;
  if (ca) out.push(`<div><b>Đáp án:</b> <span class="ja">${nl2br(ca)}</span></div>`);
  const ex = nat(fb, "explanation");
  if (ex) out.push(`<div><b>Giải thích:</b> ${nl2br(ex)}</div>`);
  out.push(`</div>`);
  return out.join("\n");
}

function renderExercise(idx, e, n) {
  const out = [];
  const plan = e.plan === "plus" ? `<span class="tag plus">PLUS</span>` : `<span class="tag free">FREE</span>`;
  const graded = e.nonGraded ? `<span class="tag ng">không chấm</span>` : "";
  out.push(`<div class="q" id="q${n}">`);
  out.push(`<h3>Q${n} <span class="qtype">${esc(e.type)}</span> ${plan} ${graded}</h3>`);

  const ctx = nat(e, "context");
  if (ctx) out.push(`<p class="sit">${esc(ctx)}</p>`);
  const prompt = nat(e, "prompt");
  if (prompt) out.push(`<p class="prompt">${esc(prompt)}</p>`);

  switch (e.type) {
    case "multiple_choice":
    case "listening_multiple_choice": {
      if (e.audioText) out.push(`<p class="audio">🔊 <span class="ja">${esc(e.audioText)}</span></p>`);
      out.push(`<ul class="opts">`);
      for (const o of e.options ?? []) out.push(optionRow(idx, o, o.id === e.correctOptionId));
      out.push(`</ul>`);
      out.push(feedbackBlock(e.feedback));
      break;
    }

    case "matching": {
      out.push(`<table class="pairs"><tbody>`);
      for (const p of e.pairs ?? []) {
        out.push(`<tr><td>${jaInline(p.left?.text ?? "")}</td>
          <td>→</td>
          <td>${esc(nat(p.right, "text") ?? p.right?.text ?? "")}</td>
          <td>${MARK_OK}</td></tr>`);
      }
      out.push(`</tbody></table>`);
      out.push(feedbackBlock(e.feedback));
      break;
    }

    case "sentence_ordering": {
      const correct = e.correctTokenIds ?? [];
      const byId = new Map((e.tokens ?? []).map((t) => [t.id, t]));
      const built = correct.map((id) => byId.get(id)?.text ?? `?${id}`).join("");
      out.push(`<div class="built"><b>Thứ tự đúng:</b> ${jaInline(built)} ${provBadge(idx, built)}</div>`);
      out.push(`<ul class="opts">`);
      for (const t of e.tokens ?? []) {
        const used = correct.includes(t.id);
        out.push(`<li class="${used ? "ok" : "no"}">${used ? MARK_OK : MARK_NO}
          <span class="opt">${jaInline(t.text)}</span>
          <span class="oid">${esc(t.id)}</span>
          ${used ? `<span class="hint">vị trí ${correct.indexOf(t.id) + 1}</span>` : `<span class="hint">thẻ nhiễu</span>`}
          ${provBadge(idx, t.canonicalText ?? t.text)}</li>`);
      }
      out.push(`</ul>`);
      out.push(feedbackBlock(e.feedback));
      break;
    }

    case "slot_ordering": {
      const slots = e.answerSlots ?? [];
      const byId = new Map((e.tokens ?? []).map((t) => [t.id, t]));
      const built = slots.map((s) => (byId.get(s.expectedTokenId)?.text ?? "?") + (s.afterText ?? "")).join("");
      out.push(`<div class="built"><b>Thứ tự đúng:</b> ${jaInline(built)} ${provBadge(idx, built)}</div>`);
      const unused = new Set(e.unusedTokenIds ?? []);
      out.push(`<ul class="opts">`);
      for (const t of e.tokens ?? []) {
        const isUnused = unused.has(t.id);
        const pos = slots.findIndex((s) => s.expectedTokenId === t.id);
        out.push(`<li class="${isUnused ? "no" : "ok"}">${isUnused ? MARK_NO : MARK_OK}
          <span class="opt">${jaInline(t.text)}</span>
          <span class="oid">${esc(t.id)}</span>
          <span class="hint">${isUnused ? "thẻ nhiễu (không dùng)" : `ô ${pos + 1}`}</span>
          ${provBadge(idx, t.canonicalText ?? t.text)}</li>`);
      }
      out.push(`</ul>`);
      out.push(feedbackBlock(e.feedback));
      break;
    }

    case "dialogue_fill": {
      const answers = new Map((e.slots ?? []).map((s) => [s.id, s.answerId]));
      const bank = new Map((e.wordBank ?? []).map((w) => [w.id, w]));
      out.push(`<div class="chat">`);
      for (const line of e.dialogue ?? []) {
        const filled = String(line).replace(/\{\{(\w+)\}\}/g, (_, sid) => {
          const w = bank.get(answers.get(sid));
          return `<span class="slot">${esc(w?.text ?? "____")}</span>`;
        });
        out.push(`<div class="ja line">${filled}</div>`);
      }
      out.push(`</div>`);
      const used = new Set([...answers.values()]);
      out.push(`<ul class="opts">`);
      for (const w of e.wordBank ?? []) {
        const ok = used.has(w.id);
        out.push(`<li class="${ok ? "ok" : "no"}">${ok ? MARK_OK : MARK_NO}
          <span class="opt">${jaInline(w.text)}</span>
          <span class="oid">${esc(w.id)}</span>
          ${ok ? "" : `<span class="hint">thẻ nhiễu</span>`}
          ${provBadge(idx, w.canonicalText ?? w.text)}</li>`);
      }
      out.push(`</ul>`);
      out.push(feedbackBlock(e.feedback));
      break;
    }

    case "chat_text_fill": {
      const chat = e.chat ?? {};
      const slots = new Map((e.slots ?? []).map((s) => [s.id, s]));
      if (chat.context) out.push(`<p class="sit">${esc(chat.context)}</p>`);
      out.push(`<div class="chat">`);
      for (const m of chat.messages ?? []) {
        const body = (m.segments ?? [])
          .map((sg) => {
            if (sg.slotId) {
              const s = slots.get(sg.slotId);
              return `<span class="slot">${esc(s?.displayText ?? "____")}</span>`;
            }
            return esc(sg.displayText ?? "");
          })
          .join("");
        out.push(`<div class="line"><span class="spk">${esc(m.speakerId ?? "")}</span> <span class="ja">${body}</span></div>`);
      }
      out.push(`</div>`);
      out.push(`<table class="pairs"><thead><tr><th>ô</th><th>đáp án hiện</th><th>chấp nhận</th></tr></thead><tbody>`);
      for (const s of e.slots ?? []) {
        out.push(`<tr><td>${esc(s.id)}</td>
          <td>${jaInline(s.displayText)} ${provBadge(idx, s.canonicalText ?? s.displayText)}</td>
          <td class="ja">${(s.acceptedAnswers ?? []).map((a) => esc(a)).join(" · ")}</td></tr>`);
      }
      out.push(`</tbody></table>`);
      out.push(feedbackBlock(e.feedback));
      break;
    }

    case "checkpoint": {
      (e.subQuestions ?? []).forEach((sq, i) => {
        out.push(`<div class="sub-q">`);
        out.push(`<p class="prompt">${n}.${i + 1} ${esc(nat(sq, "prompt") ?? "")}</p>`);
        out.push(`<ul class="opts">`);
        for (const o of sq.options ?? []) out.push(optionRow(idx, o, o.id === sq.correctOptionId));
        out.push(`</ul>`);
        out.push(feedbackBlock(sq.feedback));
        out.push(`</div>`);
      });
      break;
    }

    case "real_world_practice_dialogue": {
      const st = nat(e, "scenarioTitle");
      const sd = nat(e, "scenarioDescription");
      if (st) out.push(`<p><b>${esc(st)}</b></p>`);
      if (sd) out.push(`<p class="sit">${esc(sd)}</p>`);
      const dividers = new Map();
      for (const d of e.sceneDividers ?? []) dividers.set(d.afterLineIndex ?? d.index, d);
      out.push(`<table class="turns"><tbody>`);
      (e.dialogueLines ?? []).forEach((ln, i) => {
        const tr = ln.translationByNative?.[NAT] ?? ln.translations?.[NAT] ?? ln.meaningVi;
        out.push(`<tr>
          <td class="spk">${i + 1}. ${esc(ln.speakerId ?? "")}</td>
          <td>${jaSentence(ln.displayText ?? ln.targetText, tr, provBadge(idx, ln.targetText ?? ln.displayText), ln.romanization ?? "")}</td></tr>`);
        const d = dividers.get(i);
        if (d) {
          const dt = d.displayText ?? d.targetText ?? d.text ?? "";
          out.push(`<tr><td colspan="2" class="divider ja">— ${esc(dt)} — ${provBadge(idx, dt)}</td></tr>`);
        }
      });
      out.push(`</tbody></table>`);
      break;
    }

    default:
      out.push(`<pre class="raw">${esc(JSON.stringify(e, null, 1))}</pre>`);
  }

  out.push(`</div>`);
  return out.join("\n");
}

function renderPractice(lesson, idx) {
  const p = lesson.fiveCardContent.practice ?? {};
  const ex = p.exercises ?? [];
  const out = [`<h2 id="c5">⑤ BÀI TẬP — ${ex.length} câu (hiện hết đáp án)</h2>`];
  out.push(`<p class="sit">Trang duyệt: mọi phương án đều hiện, ✓ là đáp án đúng, ✗ là nhiễu.</p>`);
  ex.forEach((e, i) => out.push(renderExercise(idx, e, i + 1)));
  return out.join("\n");
}

/* ───────────────────── khối provenance cuối trang ───────────────────── */

function renderProvenance(items) {
  const out = [`<h2 id="prov">⑥ PROVENANCE — sổ nguồn</h2>`];

  const verbatim = items.filter((i) => i.verbatim && !i.authored && !i.mutation);
  const authored = items.filter((i) => i.authored);
  const mutations = items.filter((i) => i.mutation);

  // Tỉ lệ theo CÂU MẸ: dedupe (source:line), đúng cách cổng đếm.
  const uniq = new Map();
  const fields = new Map();
  for (const it of verbatim) {
    if (!uniq.has(it.source)) uniq.set(it.source, new Set());
    uniq.get(it.source).add(`${it.source}:${it.line}`);
    fields.set(it.source, (fields.get(it.source) ?? 0) + 1);
  }
  const totU = [...uniq.values()].reduce((a, s) => a + s.size, 0);
  const totF = [...fields.values()].reduce((a, n) => a + n, 0);

  out.push(`<h3>Tỉ lệ nguồn (theo câu mẹ)</h3>`);
  out.push(`<table class="pairs"><thead><tr><th>nguồn</th><th>câu mẹ</th><th>%</th><th>trường</th><th>%</th></tr></thead><tbody>`);
  for (const [src, set] of uniq) {
    out.push(`<tr><td>${esc(path.basename(src))}</td>
      <td>${set.size}</td><td>${Math.round((set.size * 100) / totU)}%</td>
      <td>${fields.get(src)}</td><td>${Math.round((fields.get(src) * 100) / totF)}%</td></tr>`);
  }
  out.push(`</tbody></table>`);

  out.push(`<h3>Tự soạn — ${authored.length} mục, gom theo lý do</h3>`);
  const byReason = new Map();
  for (const a of authored) {
    const k = String(a.reason ?? "(không ghi lý do)").trim();
    if (!byReason.has(k)) byReason.set(k, []);
    byReason.get(k).push(a);
  }
  out.push(`<table class="pairs"><thead><tr><th>n</th><th>lý do</th><th>trường</th></tr></thead><tbody>`);
  for (const [r, list] of [...byReason].sort((a, b) => b[1].length - a[1].length)) {
    out.push(`<tr><td>${list.length}</td><td>${esc(r)}</td>
      <td class="paths">${list.map((x) => `${esc(x.path)} = <span class="ja">${esc(x.targetText)}</span>`).join("<br>")}</td></tr>`);
  }
  out.push(`</tbody></table>`);

  if (mutations.length) {
    out.push(`<h3>Mutation — ${mutations.length} mục</h3>`);
    out.push(`<table class="pairs"><thead><tr><th>op</th><th>gốc</th><th>biến thể</th><th>trường</th></tr></thead><tbody>`);
    for (const m of mutations) {
      out.push(`<tr><td>${esc(m.mutation.op)}</td>
        <td class="ja">${esc(m.mutation.from)}</td>
        <td class="ja">${esc(m.targetText)}</td>
        <td class="paths">${esc(m.path)}</td></tr>`);
    }
    out.push(`</tbody></table>`);
  }

  out.push(`<h3>Nguyên văn — ${verbatim.length} trường, mở đúng dòng để đối chiếu</h3>`);
  out.push(`<table class="pairs"><thead><tr><th>câu</th><th>nguồn:dòng</th><th>trường</th></tr></thead><tbody>`);
  // Gom theo câu mẹ để owner mở mỗi dòng nguồn đúng một lần.
  const byParent = new Map();
  for (const v of verbatim) {
    const k = `${v.source}:${v.line}`;
    if (!byParent.has(k)) byParent.set(k, { text: v.targetText, paths: [] });
    byParent.get(k).paths.push(v.path);
  }
  for (const [k, g] of byParent) {
    out.push(`<tr><td class="ja">${esc(g.text)}</td>
      <td class="src">${esc(k)}</td>
      <td class="paths">${g.paths.map((p) => esc(p)).join("<br>")}</td></tr>`);
  }
  out.push(`</tbody></table>`);

  return out.join("\n");
}

/* ──────────────────────────── CSS ──────────────────────────── */

const CSS = `
:root{--bg:#fff;--fg:#1a1a1a;--mut:#666;--line:#ddd;--ok:#0a7d32;--no:#b3261e;
--vb:#0b5aa8;--auth:#8a5a00;--mutc:#7b2fa8;--card:#f7f7f9;}
@media(prefers-color-scheme:dark){:root{--bg:#15161a;--fg:#e8e8ea;--mut:#9a9aa3;
--line:#33343c;--ok:#4ec97a;--no:#ff7b72;--vb:#6cb0ff;--auth:#e0b23c;--mutc:#c58cf0;--card:#1e1f26;}}
*{box-sizing:border-box}
body{margin:0;padding:0 1.2rem 4rem;background:var(--bg);color:var(--fg);
font:15px/1.65 -apple-system,BlinkMacSystemFont,"Segoe UI",system-ui,sans-serif;}
.wrap{max-width:1080px;margin:0 auto}
h1{font-size:1.6rem;margin:1.6rem 0 .3rem}
h2{font-size:1.25rem;margin:2.6rem 0 .8rem;padding-bottom:.4rem;border-bottom:2px solid var(--line)}
h3{font-size:1.02rem;margin:1.4rem 0 .5rem}
.meta{color:var(--mut);font-size:.87rem;margin-bottom:1rem}
nav{position:sticky;top:0;background:var(--bg);border-bottom:1px solid var(--line);
padding:.6rem 0;margin-bottom:1rem;z-index:9}
nav a{margin-right:1rem;color:var(--vb);text-decoration:none;font-size:.9rem}
.ja{font-family:"Yu Gothic","Hiragino Sans","Noto Sans JP",sans-serif;font-size:1.06rem}
.rd{color:var(--mut);font-size:.88rem}
.tr{font-size:.93rem}

/* ── CÂU NHẬT 3 DÒNG ──
   Ruby luôn nằm trong DOM; CSS quyết định hiện hay không, nên bật/tắt không
   phải dựng lại trang và không đụng dữ liệu. */
.s{margin:.35rem 0}
.s1{line-height:1.9}
ruby rt{display:none;font-size:.5em;color:var(--vb);font-weight:400}
:root[data-furi="1"] ruby rt{display:revert}
:root[data-furi="1"] .s1{line-height:2.5}
.s2{display:none;color:var(--mut);font-size:.9rem;letter-spacing:.01em;
font-family:"Yu Gothic","Hiragino Sans","Noto Sans JP",sans-serif}
:root[data-kana="1"] .s2{display:block}
.s2x{color:var(--mut);font-size:.82rem;font-style:italic}
.s3{font-size:.93rem}
#aids{position:sticky;top:0;z-index:10;background:var(--bg);
border-bottom:1px solid var(--line);padding:.5rem 0;margin-bottom:.4rem;
display:flex;gap:1.2rem;flex-wrap:wrap;align-items:center}
#aids label{font-size:.86rem;cursor:pointer;user-select:none;
display:inline-flex;align-items:center;gap:.35rem}
#aids .hint2{color:var(--mut);font-size:.78rem}
.sit,.mean{color:var(--mut);font-style:italic;margin:.3rem 0}
.prompt{font-weight:600;margin:.4rem 0}
table{border-collapse:collapse;width:100%;margin:.6rem 0;font-size:.93rem}
th,td{border:1px solid var(--line);padding:.45rem .55rem;text-align:left;vertical-align:top}
th{background:var(--card);font-size:.85rem}
tr.sub td{background:var(--card);font-size:.9rem}
.vocab td.reg{white-space:nowrap}
.empty{color:var(--mut);font-style:italic}
.notes{color:var(--auth)}
.tag{display:inline-block;padding:.05rem .4rem;border-radius:3px;font-size:.72rem;
font-weight:700;letter-spacing:.03em;vertical-align:middle}
.tag.card{background:var(--vb);color:#fff}.tag.ref{background:var(--mut);color:#fff}
.tag.free{background:var(--ok);color:#fff}.tag.plus{background:var(--mutc);color:#fff}
.tag.ng{background:var(--mut);color:#fff}
/* Nhãn tự soạn mang cả câu lý do nên PHẢI xuống dòng được, không thì
   một lý do dài kéo ngang cả trang (đo được: 1367px trên khung 715px). */
.prov{display:inline;font-size:.74rem;padding:.02rem .35rem;border-radius:3px;
vertical-align:middle;margin-left:.3rem;overflow-wrap:anywhere}
.prov.vb{color:var(--vb);border:1px solid var(--vb);white-space:nowrap}
.prov.auth{color:var(--auth);border:1px solid var(--auth)}
.prov.mut{color:var(--mutc);border:1px solid var(--mutc)}
.ex,.gpat,.dgroup,.q{background:var(--card);border:1px solid var(--line);
border-radius:6px;padding:.7rem .9rem;margin:.7rem 0}
.exlabel{font-size:.85rem;color:var(--mut)}
.formula{font-weight:600;padding:.35rem 0}
.note{font-size:.9rem;color:var(--mut);margin:.25rem 0}
ul.opts{list-style:none;padding:0;margin:.5rem 0}
ul.opts li{padding:.28rem .4rem;border-radius:4px;margin:.15rem 0}
ul.opts li.ok{background:color-mix(in srgb,var(--ok) 14%,transparent)}
ul.opts li.no{background:color-mix(in srgb,var(--no) 9%,transparent)}
.mk{font-weight:800;margin-right:.35rem}
.mk.ok{color:var(--ok)}.mk.no{color:var(--no)}
.oid{color:var(--mut);font-size:.75rem;margin-left:.4rem;font-family:ui-monospace,monospace}
.hint{color:var(--mut);font-size:.78rem;margin-left:.4rem}
.fb{border-left:3px solid var(--ok);padding:.35rem .7rem;margin:.55rem 0;font-size:.92rem}
.qtype{font-family:ui-monospace,monospace;font-size:.8rem;color:var(--mut);font-weight:400}
.chat{margin:.5rem 0}
.chat .line{padding:.2rem 0}
.slot{background:color-mix(in srgb,var(--ok) 22%,transparent);
border-bottom:2px solid var(--ok);padding:0 .25rem;border-radius:3px}
.spk{color:var(--mut);font-size:.82rem;white-space:nowrap}
.divider{text-align:center;color:var(--mut)}
.built{margin:.35rem 0}
.src{font-family:ui-monospace,monospace;font-size:.82rem;white-space:nowrap}
.paths{font-family:ui-monospace,monospace;font-size:.74rem;color:var(--mut)}
.sub-q{border-top:1px dashed var(--line);padding-top:.5rem;margin-top:.5rem}
.raw{overflow-x:auto;font-size:.75rem;background:var(--bg);padding:.5rem}
table{display:block;overflow-x:auto}
`;

/* ──────────────────────────── build ──────────────────────────── */

export function buildPreview(lessonId) {
  const db = JSON.parse(fs.readFileSync(LESSONS_FILE, "utf8"));
  const lessons = Array.isArray(db) ? db : db.lessons ?? [];
  const lesson = lessons.find((l) => l.id === lessonId);
  if (!lesson) throw new Error(`Không thấy bài "${lessonId}" trong ${LESSONS_FILE}`);
  if (!lesson.fiveCardContent) throw new Error(`Bài "${lessonId}" không phải five_cards`);

  const provFile = path.join(PROV_DIR, `${lessonId}.provenance.json`);
  let items = [];
  let provNote = "";
  if (fs.existsSync(provFile)) {
    items = JSON.parse(fs.readFileSync(provFile, "utf8")).items ?? [];
  } else {
    provNote = ` · <b>chưa có file provenance</b>`;
  }
  const idx = buildProvIndex(items);

  const title = nat(lesson, "title") ?? lesson.title;
  const body = [
    `<div class="wrap">`,
    `<h1>${esc(title)}</h1>`,
    `<div class="meta">${esc(lessonId)} · ${esc(lesson.level ?? "")} · ${esc(lesson.lessonFormat ?? "")} · ngôn ngữ mẹ đẻ hiển thị: <b>${NAT}</b> · provenance ${items.length} mục${provNote}<br>Sinh lúc ${new Date().toISOString()} bằng <code>scripts/preview-lesson.mjs</code></div>`,
    `<nav><a href="#c1">① Intro</a><a href="#c2">② Từ vựng</a><a href="#c3">③ Hội thoại</a><a href="#c4">④ Ngữ pháp</a><a href="#c5">⑤ Bài tập</a><a href="#prov">⑥ Provenance</a></nav>`,
    // Hai công tắc trợ đọc, theo đúng lối Q14 (Q14ReadingAidSessionStore):
    // nhớ trong PHIÊN, không ghi đĩa, mỗi công tắc một trạng thái độc lập.
    `<div id="aids">
      <label><input type="checkbox" id="tFuri"> Furigana từng chữ <span class="hint2">(kana trên đầu kanji)</span></label>
      <label><input type="checkbox" id="tKana" checked> Dòng đọc kana <span class="hint2">(tách theo ranh giới khối)</span></label>
    </div>`,
    renderIntro(lesson, idx),
    renderVocabulary(lesson, idx),
    renderDialogue(lesson, idx),
    renderGrammar(lesson, idx),
    renderPractice(lesson, idx),
    renderProvenance(items),
    `</div>`,
  ].join("\n");

  const html = `<!doctype html>
<html lang="vi"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>DUYỆT — ${esc(title)} (${esc(lessonId)})</title>
<style>${CSS}</style></head><body>
${body}
<script>
// Trợ đọc — nhớ theo PHIÊN (sessionStorage), giống Q14ReadingAidSessionStore
// bên app: đóng tab là quên, không ghi đĩa.
(function () {
  var root = document.documentElement;
  function bind(id, key, def) {
    var box = document.getElementById(id);
    if (!box) return;
    var saved = sessionStorage.getItem(key);
    var on = saved === null ? def : saved === "1";
    box.checked = on;
    root.setAttribute(key, on ? "1" : "0");
    box.addEventListener("change", function () {
      root.setAttribute(key, box.checked ? "1" : "0");
      sessionStorage.setItem(key, box.checked ? "1" : "0");
    });
  }
  bind("tFuri", "data-furi", false);
  bind("tKana", "data-kana", true);
})();
</script>
</body></html>`;

  fs.mkdirSync(OUT_DIR, { recursive: true });
  const out = path.join(OUT_DIR, `${lessonId}.html`);
  fs.writeFileSync(out, html, "utf8");
  return { out, items: items.length, exercises: lesson.fiveCardContent.practice?.exercises?.length ?? 0 };
}

function main() {
  const ids = process.argv.slice(2).filter((a) => !a.startsWith("-"));
  if (!ids.length) {
    console.error("Dùng: node scripts/preview-lesson.mjs <lessonId> [lessonId...]");
    process.exit(2);
  }
  for (const id of ids) {
    const r = buildPreview(id);
    console.log(`ĐÃ XUẤT  ${r.out}  (${r.exercises} bài tập · ${r.items} mục provenance)`);
    console.log(`         mở: file:///${path.resolve(r.out).replace(/\\/g, "/")}`);
  }
}

if (process.argv[1] && import.meta.url === new URL(`file://${process.argv[1].replace(/\\/g, "/")}`).href) {
  main();
}
