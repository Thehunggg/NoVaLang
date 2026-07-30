#!/usr/bin/env node
// KIỂM THỨ TỰ BUILD (G14-R16) — REPORT-ONLY, CHƯA nối vào validate/smoke.
//
// Luật (owner chốt 2026-07-30, xem G14-R16 trong LESSON_AUTHORING_STANDARD.md):
// build bài đi theo THỨ TỰ; bài tổng hợp của một unit phải hoàn thành TRƯỚC
// khi bắt đầu bài của unit kế tiếp. Không làm unit mới rồi quay lại bài tổng
// hợp unit cũ.
//
// Script này CHỈ ĐỌC + IN BÁO CÁO, KHÔNG throw, KHÔNG chặn build. Owner chốt
// giữ report-only ở lượt này vì bật cổng cứng ngay sẽ chặn MỌI việc khác
// (kể cả việc không liên quan) cho tới khi các bài tổng hợp còn thiếu được
// viết xong. Nối thành cổng cứng là việc LÀM SAU (xem cuối file này + G14-R16).
//
// THỨ TỰ ĐO ĐƯỢC (không suy diễn): (course.order, unit.order) trong
// shared/generated/courses.json — đo 2026-07-30, ví dụ ja-daily_life-m02 có
// course.order=12 đứng ngay sau ja-daily_life-m01 (order=11).
//
// PHẠM VI: chỉ xét unit có SỐ LESSON khớp một plan trong SECTION_PLANS (2 hoặc
// 3) — tức unit CÓ THỂ có bài tổng hợp theo cơ chế hiện tại. Unit ngoài phạm
// vi đó (vd hiragana/katakana Core Foundation, 10 lesson/unit, không phải
// five_cards) không áp được cơ chế unit_comprehensive_cloze nên KHÔNG tính là
// "thiếu" — ghi rõ "N/A" thay vì báo động nhầm.
//
// MIỄN TRỪ RIÊNG cho niche `core_foundation` (owner chốt 2026-07-30, G14-R16):
// bài kana dạy CHỮ, không dạy tình huống giao tiếp, dạng cloze theo unit
// không áp được — QUYẾT ĐỊNH SẢN PHẨM, không phải hạn chế kỹ thuật. Miễn này
// khai RIÊNG theo `niche`, không dựa vào SECTION_PLANS không khớp: nếu sau
// này SECTION_PLANS mở rộng hỗ trợ unit 10 lesson, Core Foundation vẫn miễn.
//
// Dùng: node scripts/check-build-order.mjs

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { SECTION_PLANS } from "./lib/unit-comprehensive-test.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function main() {
  const courses = JSON.parse(
    fs.readFileSync(path.join(ROOT, "shared/generated/courses.json"), "utf8"),
  ).courses;
  const lessons = JSON.parse(fs.readFileSync(path.join(ROOT, "shared/generated/lessons.json"), "utf8"));
  const lessonById = new Map((lessons.lessons ?? lessons).map((l) => [l.id, l]));

  const byLanguage = new Map();
  for (const course of courses) {
    for (const unit of course.units ?? []) {
      const lessonIds = unit.lessonIds ?? [];
      const isCoreFoundation = course.nicheId === "core_foundation";
      const eligiblePlan = !isCoreFoundation && Boolean(SECTION_PLANS[lessonIds.length]);
      const allReady =
        lessonIds.length > 0 && lessonIds.every((id) => lessonById.get(id)?.contentStatus === "ready");
      const entry = {
        courseId: course.id,
        unitId: unit.id,
        courseOrder: course.order ?? 0,
        unitOrder: unit.order ?? unit.displayOrder ?? 0,
        lessonCount: lessonIds.length,
        isCoreFoundation,
        eligiblePlan,
        allReady,
        hasCT: Boolean(unit.comprehensiveTest),
      };
      const lang = course.languageCode;
      if (!byLanguage.has(lang)) byLanguage.set(lang, []);
      byLanguage.get(lang).push(entry);
    }
  }

  console.log("KIỂM THỨ TỰ BUILD (G14-R16) — REPORT-ONLY, không chặn build");
  console.log("");

  let violationCount = 0;

  for (const [lang, units] of byLanguage) {
    units.sort((a, b) => a.courseOrder - b.courseOrder || a.unitOrder - b.unitOrder);
    console.log(`── ${lang} (${units.length} unit, theo thứ tự course.order/unit.order) ──`);

    // Vị trí sớm nhất đã CÓ nội dung ready ở bất kỳ unit nào (mốc "đã bắt đầu").
    let firstStartedIndex = units.findIndex((u) => u.allReady);

    for (let i = 0; i < units.length; i++) {
      const u = units[i];
      let status;
      if (u.isCoreFoundation) {
        status = "MIỄN — Core Foundation (dạy chữ, không dạy tình huống; quyết định sản phẩm 2026-07-30)";
      } else if (!u.eligiblePlan) {
        status = `N/A (${u.lessonCount} lesson — không khớp plan 2/3, cơ chế chưa áp cho unit này)`;
      } else if (!u.allReady) {
        status = "chưa bắt đầu (lesson chưa ready hết)";
      } else if (u.hasCT) {
        status = "OK — có bài tổng hợp";
      } else {
        // allReady=true, eligiblePlan=true, hasCT=false -> unit ĐANG THIẾU.
        const laterStarted = units
          .slice(i + 1)
          .some((later) => later.allReady && later.eligiblePlan);
        if (laterStarted) {
          status = "*** VI PHẠM THỨ TỰ *** — unit SAU đã có bài ready mà unit này còn thiếu bài tổng hợp";
          violationCount++;
        } else {
          status = "THIẾU — phải làm xong TRƯỚC khi bắt đầu unit kế tiếp (chưa vi phạm, vì chưa unit nào sau nó có nội dung)";
        }
      }
      console.log(
        `   [${String(u.courseOrder).padStart(2)}.${u.unitOrder}] ${u.unitId.padEnd(28)} ` +
          `lesson=${u.lessonCount} ready=${String(u.allReady).padEnd(5)} CT=${String(u.hasCT).padEnd(5)} -> ${status}`,
      );
    }
    console.log("");
  }

  console.log(`TỔNG: ${violationCount} vi phạm THẬT (unit sau đã có nội dung mà unit trước còn thiếu bài tổng hợp).`);
  console.log("Đây là REPORT-ONLY: script này không throw, không chặn generate/validate/smoke.");
}

const isMain = path.resolve(process.argv[1] ?? "") === fileURLToPath(import.meta.url);
if (isMain) main();

// ── LÀM SAU (ghi ở đây + scripts/content/sources/INVENTORY.md) ─────────────
// 1. Nối script này thành CỔNG CỨNG (throw khi có vi phạm THẬT) sau khi các
//    bài tổng hợp còn thiếu (hiện: ja-daily_life-m01-u2) đã viết xong nội
//    dung thật. Bật ngay bây giờ sẽ chặn mọi việc khác không liên quan.
// 2. validateUnitComprehensiveTest (validate-curriculum.mjs:1134) hiện
//    `if (!test) return;` — unit thiếu bài tổng hợp là "hợp lệ" tuyệt đối,
//    KHÔNG một dòng cảnh báo nào, kể cả khi unit đó đã đủ điều kiện làm bài
//    tổng hợp từ lâu. Cùng họ lỗi đã vá ở check-render-coverage.mjs (trường
//    thiếu từng lọt qua vì không ai khai nó phải có). Sửa: validate nên IN
//    CẢNH BÁO (không fail) khi allReady && eligiblePlan && !hasCT, tách biệt
//    với việc bật cổng cứng ở mục 1.
