/**
 * BÀI TỔNG HỢP CUỐI UNIT — cơ chế lắp ráp (generator).
 * Unit Comprehensive Test — assembly mechanism.
 *
 * Schema: `UnitComprehensiveTest` trong `shared/types.ts`.
 * Thiết kế + luật viết bài: ADR-022 (+ Amendment 2026-07-25),
 * LESSON_AUTHORING_STANDARD.md §E4 và §D-Cloze.
 *
 * ── VAI TRÒ CỦA FILE NÀY (đọc kỹ trước khi sửa) ────────────────────────────
 *
 * File này là **CƠ CHẾ LẮP RÁP + CHỐT CHẶN CẤU TRÚC**, KHÔNG phải nơi sinh ra
 * tiếng Nhật. Nó KHÔNG tự đặt câu, KHÔNG tự nghĩ phương án sai, KHÔNG tự chọn
 * từ — đúng theo `AGENTS.md` ("Không được tự sáng tạo": không tự viết bài tập,
 * không tự chọn từ vựng, không tự viết hội thoại) và §G8 (mọi cụm phải mở
 * nguồn thật đối chiếu, cấm dựa trí nhớ mô hình).
 *
 * Câu chữ thật — kể cả 3 phương án sai — nằm trong **file nguồn ĐÃ DUYỆT**
 * của từng unit, viết theo đúng quy trình G1–G9 rồi đăng ký vào
 * `UNIT_COMPREHENSIVE_REGISTRY` bên dưới. Đây đúng mô hình mà lesson thường
 * đang chạy: `helpers.mjs` + `FIVE_CARDS_REGISTRY` lắp ráp, còn
 * `ja-unit1-lesson1.mjs` giữ nội dung đã duyệt.
 *
 * Việc file này làm:
 *  - Suy ra SỐ CÂU + CHIA MỨC từ số lesson thật của unit.
 *  - Ép mọi luật cấu trúc đếm được (số câu, loại câu theo dải, số ô, đủ 4
 *    phương án, phương án phủ đúng đủ ô, ô truy được về lesson đã dạy, vị trí
 *    ô trống không dồn cuối câu, kiến thức các lesson phải xen kẽ).
 *  - Gắn các trường suy ra được (id, format, plan, graded, sourceLessonIds…).
 *  - THROW ngay khi nguồn sai — fail loud, không đoán, không tự vá.
 * ───────────────────────────────────────────────────────────────────────── */

/**
 * SỐ CÂU + CHIA MỨC theo số lesson thật của unit (owner chốt 2026-07-25).
 * Tỉ lệ 3 mức giữ tương đương giữa hai kế hoạch.
 */
export const SECTION_PLANS = {
  3: { totalQuestions: 25, split: [8, 17] },
  2: { totalQuestions: 18, split: [6, 12] },
};

/**
 * Thứ tự các mức, khó tăng dần. Chỉ số ở đây khớp chỉ số trong `split`.
 *
 * `typed_blank` ĐÃ BỎ KHỎI MỌI KẾ HOẠCH (owner chốt 2026-07-25). Lý do: câu tự
 * gõ không nêu đủ tình huống thì NHIỀU đáp án khác đáp án chuẩn vẫn đúng, nên
 * bộ chấm cố định sẽ chấm sai người trả lời đúng. Câu chọn phương án không có
 * vấn đề đó vì mọi khả năng đều bày sẵn.
 *
 * Kiểu `typed_blank` vẫn GIỮ trong schema, generator và runtime (xem
 * `BLANKS_BY_KIND`, `UnitComprehensiveQuestionKind`) để dùng lại được sau này —
 * chỉ là hiện KHÔNG kế hoạch nào ánh xạ tới nó, nên không unit nào sinh ra câu
 * tự gõ.
 */
export const SECTION_KINDS = [
  'sentence_multi_blank_choice',
  'dialogue_multi_blank_choice',
];

/**
 * Số ô trống bắt buộc theo loại câu. `typed_blank` giữ lại cho tương lai —
 * hiện KHÔNG kế hoạch nào ánh xạ tới nó (xem [SECTION_KINDS]).
 */
export const BLANKS_BY_KIND = {
  sentence_multi_blank_choice: { exactly: 2 },
  dialogue_multi_blank_choice: { exactly: 3 },
  typed_blank: { min: 1 },
};

/** Câu chọn phương án: đúng 4 lựa chọn (1 đúng + 3 sai hợp lý). */
export const CHOICE_OPTION_COUNT = 4;

/** Hội thoại phải NGẮN — 2–3 lượt nói (§E4). */
export const DIALOGUE_TURN_RANGE = { min: 2, max: 3 };

/**
 * Ngưỡng vận hành (§F-h — owner chỉnh được, KHÔNG phải hằng số bất biến):
 *
 * - `MAX_TRAILING_BLANK_RATIO`: tối đa bao nhiêu phần câu được phép có ô
 *   trống nằm CUỐI. Luật owner là "cấm LUÔN khoét cuối câu" — chặn thói quen
 *   đoán theo vị trí, không phải cấm tuyệt đối một câu nào đó kết thúc bằng ô.
 * - `MAX_CONSECUTIVE_SAME_LESSON`: tối đa bao nhiêu câu liên tiếp được phép
 *   chỉ ôn DUY NHẤT một lesson. Ép kiến thức các lesson xen kẽ, không gom
 *   thành từng khối.
 */
export const MAX_TRAILING_BLANK_RATIO = 0.5;
export const MAX_CONSECUTIVE_SAME_LESSON = 3;

export { blank, blankSeg, choiceOption, dialogueTurn, review, seg } from './unit-comprehensive-helpers.mjs';

/* ── Suy ra kế hoạch + chốt chặn cấu trúc ────────────────────────────────── */

/**
 * Suy ra số câu + dải câu của từng mức từ SỐ LESSON THẬT của unit.
 * Fail loud nếu số lesson không có kế hoạch — KHÔNG tự chế tỉ lệ mới.
 */
export function planForLessonCount(lessonCount) {
  const plan = SECTION_PLANS[lessonCount];
  if (!plan) {
    throw new Error(
      `[unit-comprehensive] chưa có kế hoạch chia mức cho unit ${lessonCount} lesson. ` +
        `Hiện chỉ định nghĩa: ${Object.keys(SECTION_PLANS).join(', ')} lesson ` +
        `(owner chốt 2026-07-25). Thêm kế hoạch mới cần owner duyệt tỉ lệ 3 mức — ` +
        `KHÔNG tự suy ra.`,
    );
  }
  const sections = [];
  let cursor = 1;
  plan.split.forEach((count, index) => {
    sections.push({
      kind: SECTION_KINDS[index],
      count,
      start: cursor,
      end: cursor + count - 1,
    });
    cursor += count;
  });
  return { totalQuestions: plan.totalQuestions, sections };
}

/** Loại câu mà `order` này BẮT BUỘC phải mang, theo kế hoạch. */
function kindForOrder(sections, order) {
  const section = sections.find((s) => order >= s.start && order <= s.end);
  return section ? section.kind : null;
}

/** Mọi `blankId` xuất hiện trong thân câu, theo đúng thứ tự đọc. */
function blankIdsInBody(question) {
  const segments =
    question.kind === 'dialogue_multi_blank_choice'
      ? (question.dialogue ?? []).flatMap((turn) => turn.segments ?? [])
      : (question.segments ?? []);
  return segments.filter((s) => s.blankId).map((s) => s.blankId);
}

/** Đoạn CUỐI CÙNG của thân câu có phải ô trống không (feed luật vị trí). */
function endsWithBlank(question) {
  const segments =
    question.kind === 'dialogue_multi_blank_choice'
      ? (question.dialogue ?? []).flatMap((turn) => turn.segments ?? [])
      : (question.segments ?? []);
  const last = segments[segments.length - 1];
  return Boolean(last && last.blankId);
}

function assertQuestionShape(question, { sections, lessonIds, unitId }) {
  const where = `[unit-comprehensive ${unitId}] câu order=${question.order}`;

  const expectedKind = kindForOrder(sections, question.order);
  if (!expectedKind) {
    throw new Error(`${where}: order nằm ngoài mọi dải mức của kế hoạch.`);
  }
  if (question.kind !== expectedKind) {
    throw new Error(
      `${where}: kind='${question.kind}' nhưng dải order này phải là '${expectedKind}'.`,
    );
  }

  // Thân câu: dialogue dùng `dialogue`, hai kind còn lại dùng `segments`.
  if (question.kind === 'dialogue_multi_blank_choice') {
    if (!Array.isArray(question.dialogue) || question.dialogue.length === 0) {
      throw new Error(`${where}: kind hội thoại nhưng thiếu 'dialogue'.`);
    }
    if (question.segments) {
      throw new Error(`${where}: kind hội thoại KHÔNG dùng 'segments' — chuyển vào 'dialogue'.`);
    }
    const turns = question.dialogue.length;
    if (turns < DIALOGUE_TURN_RANGE.min || turns > DIALOGUE_TURN_RANGE.max) {
      throw new Error(
        `${where}: hội thoại có ${turns} lượt — phải ${DIALOGUE_TURN_RANGE.min}–${DIALOGUE_TURN_RANGE.max} lượt. ` +
          `Hội thoại dài biến bài kiểm tra thành bài đọc hiểu (§E4).`,
      );
    }
  } else {
    if (!Array.isArray(question.segments) || question.segments.length === 0) {
      throw new Error(`${where}: thiếu 'segments'.`);
    }
    if (question.dialogue) {
      throw new Error(`${where}: kind này KHÔNG dùng 'dialogue'.`);
    }
  }

  // Số ô trống theo kind.
  const rule = BLANKS_BY_KIND[question.kind];
  const blankCount = (question.blanks ?? []).length;
  if (rule.exactly !== undefined && blankCount !== rule.exactly) {
    throw new Error(`${where}: có ${blankCount} ô trống — kind này phải đúng ${rule.exactly}.`);
  }
  if (rule.min !== undefined && blankCount < rule.min) {
    throw new Error(`${where}: có ${blankCount} ô trống — kind này cần tối thiểu ${rule.min}.`);
  }

  // blankId trong thân câu và danh sách blanks phải khớp 1-1.
  const bodyIds = blankIdsInBody(question);
  const declaredIds = question.blanks.map((b) => b.id);
  const missingInBody = declaredIds.filter((id) => !bodyIds.includes(id));
  const missingInBlanks = bodyIds.filter((id) => !declaredIds.includes(id));
  if (missingInBody.length || missingInBlanks.length) {
    throw new Error(
      `${where}: blankId lệch giữa thân câu và 'blanks' — ` +
        `khai trong blanks nhưng không có trong câu: [${missingInBody.join(', ')}]; ` +
        `có trong câu nhưng không khai: [${missingInBlanks.join(', ')}].`,
    );
  }

  // acceptedAnswers phải chứa canonicalAnswer (§D-Cloze).
  for (const b of question.blanks) {
    if (!Array.isArray(b.acceptedAnswers) || b.acceptedAnswers.length === 0) {
      throw new Error(`${where}: ô '${b.id}' thiếu 'acceptedAnswers'.`);
    }
    if (!b.acceptedAnswers.includes(b.canonicalAnswer)) {
      throw new Error(
        `${where}: ô '${b.id}' có 'acceptedAnswers' KHÔNG chứa 'canonicalAnswer' ` +
          `('${b.canonicalAnswer}') — §D-Cloze bắt buộc.`,
      );
    }
  }

  // Câu chọn phương án: đúng 4 lựa chọn, mỗi lựa chọn phủ đúng đủ ô, đúng 1 đáp án.
  if (question.kind === 'typed_blank') {
    if (question.options || question.correctOptionId) {
      throw new Error(`${where}: câu tự gõ KHÔNG dùng 'options'/'correctOptionId'.`);
    }
  } else {
    const options = question.options ?? [];
    if (options.length !== CHOICE_OPTION_COUNT) {
      throw new Error(
        `${where}: có ${options.length} phương án — phải đúng ${CHOICE_OPTION_COUNT} ` +
          `(1 đúng + 3 sai hợp lý, §B9).`,
      );
    }
    const optionIds = new Set();
    for (const opt of options) {
      if (optionIds.has(opt.id)) throw new Error(`${where}: trùng id phương án '${opt.id}'.`);
      optionIds.add(opt.id);
      const answered = Object.keys(opt.answersByBlankId ?? {});
      const missing = declaredIds.filter((id) => !answered.includes(id));
      const extra = answered.filter((id) => !declaredIds.includes(id));
      if (missing.length || extra.length) {
        throw new Error(
          `${where}: phương án '${opt.id}' phải phủ ĐÚNG và ĐỦ mọi ô — ` +
            `thiếu: [${missing.join(', ')}]; dư: [${extra.join(', ')}].`,
        );
      }
    }
    if (!question.correctOptionId || !optionIds.has(question.correctOptionId)) {
      throw new Error(
        `${where}: 'correctOptionId'='${question.correctOptionId}' không trỏ tới phương án nào.`,
      );
    }
    // Phương án đúng phải khớp đáp án của từng ô — chống lệch dữ liệu.
    const correct = options.find((o) => o.id === question.correctOptionId);
    for (const b of question.blanks) {
      const filled = correct.answersByBlankId[b.id];
      if (!b.acceptedAnswers.includes(filled)) {
        throw new Error(
          `${where}: phương án ĐÚNG điền '${filled}' vào ô '${b.id}' nhưng giá trị này ` +
            `không có trong 'acceptedAnswers' của ô đó — dữ liệu lệch.`,
        );
      }
    }
  }

  // §G7: mọi mục ôn phải trỏ về lesson NẰM TRONG unit này.
  if (!Array.isArray(question.reviews) || question.reviews.length === 0) {
    throw new Error(`${where}: thiếu 'reviews' — không chứng minh được §G7.`);
  }
  for (const r of question.reviews) {
    if (!lessonIds.includes(r.lessonId)) {
      throw new Error(
        `${where}: reviews trỏ tới lesson '${r.lessonId}' KHÔNG thuộc unit này ` +
          `([${lessonIds.join(', ')}]) — vi phạm §G7.`,
      );
    }
  }
}

/** Luật vị trí ô trống + luật trộn xen kẽ — kiểm trên TOÀN bài. */
function assertTestWideRules(questions, { unitId }) {
  const where = `[unit-comprehensive ${unitId}]`;

  const trailing = questions.filter(endsWithBlank).length;
  const ratio = trailing / questions.length;
  if (ratio > MAX_TRAILING_BLANK_RATIO) {
    throw new Error(
      `${where}: ${trailing}/${questions.length} câu (${Math.round(ratio * 100)}%) có ô trống ` +
        `nằm CUỐI câu — vượt ngưỡng ${Math.round(MAX_TRAILING_BLANK_RATIO * 100)}%. ` +
        `Ô trống phải rải đầu/giữa/cuối, thứ tự mỗi câu một khác; luôn khoét cuối câu ` +
        `khiến người học đoán theo thói quen thay vì hiểu (§E4).`,
    );
  }

  // Trộn xen kẽ: không cho quá N câu liên tiếp chỉ ôn DUY NHẤT một lesson.
  let run = 0;
  let runLesson = null;
  for (const q of questions) {
    const lessons = new Set(q.reviews.map((r) => r.lessonId));
    const only = lessons.size === 1 ? [...lessons][0] : null;
    if (only && only === runLesson) {
      run += 1;
    } else {
      run = only ? 1 : 0;
      runLesson = only;
    }
    if (run > MAX_CONSECUTIVE_SAME_LESSON) {
      throw new Error(
        `${where}: có ${run} câu liên tiếp chỉ ôn lesson '${runLesson}' (tới order=${q.order}) ` +
          `— vượt ngưỡng ${MAX_CONSECUTIVE_SAME_LESSON}. Kiến thức các lesson phải XEN KẼ, ` +
          `không gom thành từng khối (§E4).`,
      );
    }
  }
}

import { JA_M01_U1_COMPREHENSIVE } from '../content/daily-life/module-1/ja-unit1-comprehensive.mjs';
import { JA_M01_U2_COMPREHENSIVE } from '../content/daily-life/module-1/ja-unit2-comprehensive.mjs';
import { JA_M02_U1_COMPREHENSIVE } from '../content/daily-life/module-1/ja-unit1-comprehensive-m02.mjs';
import { JA_M02_U2_COMPREHENSIVE } from '../content/daily-life/module-1/ja-unit2-comprehensive-m02.mjs';

/* ── Đăng ký nội dung đã duyệt ───────────────────────────────────────────── */

/**
 * Bài tổng hợp ĐÃ DUYỆT, khoá theo `languageCode` rồi tới `unitId` THẬT
 * (không theo vị trí mảng) — cùng nguyên tắc ID-stability của
 * `FIVE_CARDS_REGISTRY`.
 *
 * Thêm một bài = viết file nguồn đã duyệt (theo G1–G9, có đối chiếu nguồn
 * thật) rồi thêm ĐÚNG MỘT dòng vào đây — vòng lặp sinh curriculum không cần
 * sửa.
 */
export const UNIT_COMPREHENSIVE_REGISTRY = {
  ja: {
    'ja-daily_life-m01-u1': JA_M01_U1_COMPREHENSIVE,
    'ja-daily_life-m01-u2': JA_M01_U2_COMPREHENSIVE,
    'ja-daily_life-m02-u1': JA_M02_U1_COMPREHENSIVE,
    'ja-daily_life-m02-u2': JA_M02_U2_COMPREHENSIVE,
  },
};

/**
 * Lắp ráp bài tổng hợp cho một unit. Trả `null` khi unit chưa có bài đã duyệt
 * — unit không có bài tổng hợp là trạng thái HỢP LỆ, không phải lỗi.
 *
 * @param {string} languageCode
 * @param {string} unitId
 * @param {{ lessonIds: string[], targetLocale: string }} context
 * @returns {object|null} UnitComprehensiveTest
 */
export function resolveUnitComprehensiveTest(languageCode, unitId, { lessonIds, targetLocale }) {
  const approved = UNIT_COMPREHENSIVE_REGISTRY[languageCode]?.[unitId];
  if (!approved) return null;

  const { totalQuestions, sections } = planForLessonCount(lessonIds.length);
  const questions = approved.questions ?? [];

  if (questions.length !== totalQuestions) {
    throw new Error(
      `[unit-comprehensive ${unitId}]: có ${questions.length} câu nhưng unit ${lessonIds.length} ` +
        `lesson phải có đúng ${totalQuestions} câu (chia ${sections.map((s) => s.count).join('/')}).`,
    );
  }

  // order phải là 1..N, đủ và không trùng.
  const orders = questions.map((q) => q.order).sort((a, b) => a - b);
  const expected = Array.from({ length: totalQuestions }, (_, i) => i + 1);
  if (orders.join(',') !== expected.join(',')) {
    throw new Error(
      `[unit-comprehensive ${unitId}]: 'order' phải là 1..${totalQuestions} đủ và không trùng ` +
        `(đang có: ${orders.join(',')}).`,
    );
  }

  const ordered = [...questions].sort((a, b) => a.order - b.order);
  for (const q of ordered) assertQuestionShape(q, { sections, lessonIds, unitId });
  assertTestWideRules(ordered, { unitId });

  return {
    id: `${unitId}-comprehensive`,
    unitId,
    format: 'unit_comprehensive_cloze',
    languageCode,
    targetLocale,
    plan: 'plus',
    graded: true,
    title: approved.title,
    ...(approved.titleByNative ? { titleByNative: approved.titleByNative } : {}),
    ...(approved.description ? { description: approved.description } : {}),
    ...(approved.descriptionByNative
      ? { descriptionByNative: approved.descriptionByNative }
      : {}),
    estimatedMinutes: approved.estimatedMinutes,
    totalQuestions,
    sourceLessonIds: [...lessonIds],
    questions: ordered,
    ...(approved.passThresholdPercent === undefined
      ? {}
      : { passThresholdPercent: approved.passThresholdPercent }),
  };
}
