/**
 * XUẤT BÀI TỔNG HỢP CUỐI UNIT RA FILE TEXT ĐỌC ĐƯỢC.
 *
 * Đọc thẳng `shared/generated/courses.json` — tức đúng dữ liệu app đang chạy,
 * không phải bản đọc soạn tay. Nếu hai bên lệch nhau thì là do chưa xuất lại,
 * không phải hai nguồn khác nhau.
 *
 *   node scripts/dump-unit-comprehensive.mjs <unitId> [đường-dẫn-ra]
 *
 * MỌI NHÃN SUY TỪ DỮ LIỆU, KHÔNG HARD-CODE: tên mức, dải order, số câu, cách
 * chấm — tất cả tính từ `questions` thật. Đổi kế hoạch chia mức trong
 * `SECTION_PLANS` thì file xuất tự đúng theo, không phải sửa script.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const unitId = process.argv[2] ?? 'ja-daily_life-m01-u1';
const outPath =
  process.argv[3] ??
  path.join(ROOT, 'shared', 'generated', `${unitId}-comprehensive.txt`);

/** Nhãn hiển thị + mô tả cách chấm của từng kind. Thêm kind mới thì thêm ở đây. */
const KIND_INFO = {
  sentence_multi_blank_choice: {
    label: 'CÂU ĐƠN · CHỌN PHƯƠNG ÁN',
    grading:
      'Chọn 1 trong 4 phương án. So id phương án — chọn đúng là CẢ CÂU đúng,\n' +
      '    KHÔNG có điểm từng phần, vì một phương án đã chứa đáp án cho MỌI ô.',
  },
  dialogue_multi_blank_choice: {
    label: 'HỘI THOẠI · CHỌN PHƯƠNG ÁN',
    grading:
      'Chọn 1 trong 4 phương án. So id phương án — chọn đúng là CẢ CÂU đúng,\n' +
      '    KHÔNG có điểm từng phần, vì một phương án đã chứa đáp án cho MỌI ô.',
  },
  typed_blank: {
    label: 'TỰ GÕ',
    grading:
      'Người học tự gõ. So từng ô với `acceptedAnswers`; câu chỉ đúng khi MỌI\n' +
      '    ô đều đúng. Bộ chấm tự lo: bỏ dấu cách (ngôn ngữ không dùng dấu cách\n' +
      '    giữa từ), bỏ dấu câu cuối 。.!！, thường hoá chữ hoa. Nó KHÔNG tự quy\n' +
      '    đổi kanji ↔ kana, nên mọi dạng viết phải liệt kê sẵn.',
  },
};

const MARK = ['①', '②', '③', '④', '⑤'];

/* ── Đọc dữ liệu ─────────────────────────────────────────────────────────── */

const courses = JSON.parse(
  fs.readFileSync(path.join(ROOT, 'shared', 'generated', 'courses.json'), 'utf8'),
);

let unit = null;
const walk = (node) => {
  if (!node || typeof node !== 'object') return;
  if (node.id === unitId && node.comprehensiveTest) unit = node;
  if (Array.isArray(node)) node.forEach(walk);
  else Object.values(node).forEach(walk);
};
walk(courses);

if (!unit) {
  console.error(
    `[dump-unit-comprehensive] unit '${unitId}' không có bài tổng hợp trong ` +
      `shared/generated/courses.json. Chạy 'npm run generate:curriculum' trước, ` +
      `hoặc unit này chưa được đăng ký nội dung.`,
  );
  process.exit(1);
}

const test = unit.comprehensiveTest;
const questions = [...test.questions].sort((a, b) => a.order - b.order);

/** Nhãn ngắn cho lesson, suy từ đuôi id — không hard-code danh sách. */
const lessonLabel = (lessonId) => {
  const m = /-l(\d+)$/.exec(lessonId);
  return m ? `L${m[1]}` : lessonId;
};

/**
 * Chia câu thành các DẢI liên tiếp cùng kind, suy từ dữ liệu thật. Dải rỗng
 * không tồn tại nên không bao giờ in ra mục trống.
 */
const bands = [];
for (const q of questions) {
  const last = bands[bands.length - 1];
  if (last && last.kind === q.kind) last.questions.push(q);
  else bands.push({ kind: q.kind, questions: [q] });
}

const kindsPresent = [...new Set(questions.map((q) => q.kind))];

/* ── Dựng file ───────────────────────────────────────────────────────────── */

const out = [];
const w = (s = '') => out.push(s);

const renderBody = (segments, blanks) =>
  segments
    .map((s) => {
      if (!s.blankId) return s.displayText ?? '';
      const i = blanks.findIndex((b) => b.id === s.blankId);
      return ` ${MARK[i] ?? '?'} `;
    })
    .join('');

const fill = (segments, answersByBlankId) =>
  segments
    .map((s) => (s.blankId ? answersByBlankId[s.blankId] : s.displayText ?? ''))
    .join('');

w(`BÀI TỔNG HỢP CUỐI UNIT — ${test.title}`);
w('Xuất trực tiếp từ shared/generated/courses.json — đúng dữ liệu app đang chạy.');
w(`Xuất lúc: ${new Date().toISOString().slice(0, 10)}`);
w();
w(`id            : ${test.id}`);
w(`unit          : ${test.unitId}`);
w(`format        : ${test.format}`);
w(`ngôn ngữ học  : ${test.languageCode}`);
w(`gate          : ${test.plan}   ·   chấm điểm: ${test.graded ? 'CÓ' : 'không'}`);
w(`số câu        : ${test.totalQuestions}`);
w(`ôn từ lesson  : ${test.sourceLessonIds.map(lessonLabel).join(' + ')}`);
w();

// Cách chấm: CHỈ in phần của những kind thật sự có trong bài.
w('CÁCH CHẤM');
for (const kind of kindsPresent) {
  const info = KIND_INFO[kind];
  const count = questions.filter((q) => q.kind === kind).length;
  w(`  · ${info?.label ?? kind} (${count} câu): ${info?.grading ?? '(chưa mô tả)'}`);
}
w();

for (const band of bands) {
  const info = KIND_INFO[band.kind];
  const first = band.questions[0].order;
  const last = band.questions[band.questions.length - 1].order;
  const range = first === last ? `Q${first}` : `Q${first}–Q${last}`;
  const blankCounts = [...new Set(band.questions.map((q) => q.blanks.length))].sort();

  w('');
  w('='.repeat(78));
  w(
    `${info?.label ?? band.kind} · ${blankCounts.join('–')} ô` +
      `   (${range} · ${band.questions.length} câu)`,
  );
  w('='.repeat(78));

  for (const q of band.questions) {
    w('');
    w('-'.repeat(78));
    w(`CÂU ${q.order}`);
    w(`Ngữ cảnh: ${q.context ?? '—'}`);
    w('');

    if (Array.isArray(q.dialogue) && q.dialogue.length) {
      w('HỘI THOẠI:');
      for (const turn of q.dialogue) {
        w(`   ${turn.speakerId} : ${renderBody(turn.segments, q.blanks)}`);
      }
    } else {
      w(`CÂU:  ${renderBody(q.segments ?? [], q.blanks)}`);
    }
    w('');

    const hasOptions = Array.isArray(q.options) && q.options.length > 0;
    if (hasOptions) {
      const correct = q.options.find((o) => o.id === q.correctOptionId);
      w(`${q.options.length} PHƯƠNG ÁN:`);
      q.options.forEach((o, idx) => {
        const letter = String.fromCharCode(65 + idx);
        const right = o.id === q.correctOptionId;
        w(`   ${letter}. ${o.text}${right ? '        <<< ĐÁP ÁN ĐÚNG' : ''}`);
        w(
          `      điền vào ô: ${q.blanks
            .map((b, i) => `${MARK[i]}${o.answersByBlankId[b.id]}`)
            .join('  ')}`,
        );
      });
      w('');
      w('KHI CHỌN ĐÚNG:');
      if (Array.isArray(q.dialogue) && q.dialogue.length) {
        for (const turn of q.dialogue) {
          w(`   ${turn.speakerId} : ${fill(turn.segments, correct.answersByBlankId)}`);
        }
      } else {
        w(`   ${fill(q.segments ?? [], correct.answersByBlankId)}`);
      }
    } else {
      w('ĐÁP ÁN + MỌI DẠNG VIẾT ĐƯỢC CHẤP NHẬN:');
      q.blanks.forEach((b, i) => {
        w(`   ${MARK[i]} ${b.displayAnswer}`);
        w(
          `      chấp nhận (${b.acceptedAnswers.length} dạng): ` +
            b.acceptedAnswers.join('  ·  '),
        );
        if (b.hint) w(`      gợi ý hiện cho người học: ${b.hint}`);
      });
    }

    w('');
    w(hasOptions ? 'VÌ SAO CÁC PHƯƠNG ÁN KIA SAI:' : 'GIẢI THÍCH:');
    for (const part of (q.explanation ?? '').split('. ').filter(Boolean)) {
      const line = part.trim();
      w(`   ${line}${line.endsWith('.') ? '' : '.'}`);
    }
    w('');
    w(
      `ÔN LẠI: ${q.reviews
        .map(
          (r) =>
            `${lessonLabel(r.lessonId)} · ${
              r.kind === 'vocabulary' ? 'từ vựng' : 'ngữ pháp'
            } · ${r.ref}`,
        )
        .join('   |   ')}`,
    );
  }
}

/* ── Bảng tổng ───────────────────────────────────────────────────────────── */

w('');
w('='.repeat(78));
w('BẢNG TỔNG');
w('='.repeat(78));
w('');

const choiceQuestions = questions.filter((q) => (q.options ?? []).length > 0);
if (choiceQuestions.length) {
  const counts = {};
  const row = [];
  for (const q of choiceQuestions) {
    const letter = String.fromCharCode(
      65 + q.options.findIndex((o) => o.id === q.correctOptionId),
    );
    counts[letter] = (counts[letter] ?? 0) + 1;
    row.push(`Q${q.order}=${letter}`);
  }
  w(`PHÂN BỐ ĐÁP ÁN ĐÚNG (${choiceQuestions.length} câu chọn phương án):`);
  w(`   ${row.join('  ')}`);
  w(
    `   ${Object.entries(counts)
      .sort()
      .map(([k, v]) => `${k}: ${v} câu`)
      .join('  ·  ')}`,
  );
  w('   → UI KHÔNG xáo trộn phương án lúc chạy nên dữ liệu phải tự rải;');
  w('     bấm mãi một chữ chỉ đúng được số câu lớn nhất ở trên.');
  w('');
}

w('SỐ Ô TRỐNG:');
for (const band of bands) {
  const total = band.questions.reduce((s, q) => s + q.blanks.length, 0);
  const first = band.questions[0].order;
  const last = band.questions[band.questions.length - 1].order;
  w(
    `   ${(KIND_INFO[band.kind]?.label ?? band.kind).padEnd(26)} ` +
      `Q${first}–Q${last}: ${total} ô`,
  );
}
w(`   TỔNG: ${questions.reduce((s, q) => s + q.blanks.length, 0)} ô`);
w('');

const typedQuestions = questions.filter((q) => (q.options ?? []).length === 0);
if (typedQuestions.length) {
  const variants = typedQuestions
    .flatMap((q) => q.blanks)
    .reduce((s, b) => s + b.acceptedAnswers.length, 0);
  const blanks = typedQuestions.reduce((s, q) => s + q.blanks.length, 0);
  w(`BIẾN THỂ CHÍNH TẢ CHẤP NHẬN Ở CÂU TỰ GÕ: ${variants} chuỗi cho ${blanks} ô`);
  w('');
}

w('TRỘN XEN KẼ LESSON (mỗi câu ôn lesson nào):');
for (const q of questions) {
  const set = [...new Set(q.reviews.map((r) => lessonLabel(r.lessonId)))].sort();
  w(`   Q${String(q.order).padStart(2)}  ${set.join('+')}`);
}
w('');
w('='.repeat(78));
w(`HẾT — ${questions.length} câu.`);

fs.writeFileSync(outPath, out.join('\n') + '\n', 'utf8');
console.log(`[dump-unit-comprehensive] ${unitId}: ${out.length} dòng → ${outPath}`);
