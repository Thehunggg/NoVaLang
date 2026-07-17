```text
PILOT-SCOPE-FROZEN
IMPLEMENTATION-AUTHORIZATION: NOT YET
```

# Đề xuất Pilot Scope — PILOT-CONTENT-VALIDATION (v4, FROZEN)

## Context

Stage 1 (VS0-02B → VS0-08) đã hoàn thành, gửi Codex final review, kết quả hiện tại **`STAGE_1_REVIEW_BLOCKED`** với 5 blocker (B1–B5). Quyền sửa đang thuộc Cursor (`docs/ai/ACTIVE_TASK.md`: `Task ID: STAGE1-FINAL-PATCH-01-CURSOR`, `Current owner: Cursor`). Claude Code đang ở trạng thái read-only đối với source NovaLang trong lúc Cursor giữ quyền ghi (Single-writer rule, `AGENTS.md`).

Chủ dự án chọn thu hẹp "khung" về đúng mức Pilot thay vì hoàn thiện toàn bộ 6 Architecture Program hay 20 ngôn ngữ trước.

Sự kiện nền tảng đã xác nhận qua source:

- 506 lesson trong `shared/content/curriculum/lessons.json`, chỉ đúng 1 lesson (`ja-daily_life-m01-u1-l1`, Golden) có `lessonFormat: "five_cards"`.
- `scripts/content/daily-life/module-1/helpers.mjs` đã có sẵn cơ chế **conditional override**: hard-code đúng một nhánh `if (language === 'ja' && unitIndex === 0 && lessonIndex === 0) { dùng JA_UNIT1_LESSON1 } else { rơi về template legacy chung }`. Registry đề xuất trong bản này là **tổng quát hóa tối thiểu** của cơ chế đã có sẵn — không phải thiết kế mới.
- **Chưa xác nhận `shared/content/curriculum/lessons.json` có phải là nguồn có thẩm quyền (authoritative) hay chỉ là generated output** của `scripts/content/daily-life/module-1/content.mjs`/`dialogues.mjs` + `scripts/lib/daily-life-blueprint.mjs` qua `generate-curriculum.mjs`. Việc này phải được xác minh cụ thể trước khi snapshot bất kỳ lesson nào (mục 7) — **không mặc định** `lessons.json` là nguồn gốc.

**Bản v4 là bản chốt phạm vi (FROZEN). Đã duyệt về phạm vi; chưa được phép triển khai (xem mục 0).**

**Ranh giới không đổi**: chỉ định phạm vi/rủi ro kiến trúc — không tự sáng tạo từ vựng, hội thoại, ngữ pháp, đáp án, cultural guidance.

---

## 0. Điều kiện tiên quyết trước khi triển khai (chặn cứng)

Pilot **chưa được phép triển khai bất kỳ phần nào** cho đến khi:

1. Cursor hoàn tất vá 5 blocker Stage 1 final review (B1: Golden UI chưa gọi Stage 1 pipeline; B2: Canonical Event payload còn mutable; B3: `sourceRecordType` chưa được enforce; B4: Progress projection parser coerce `isCompleted` sai kiểu âm thầm; B5: Compatibility bridge vẫn cập nhật reward state).
2. Codex xác nhận **Stage 1 final review PASS**.

Lớp orchestrator/UI wiring đang được Cursor sửa trực tiếp; Pilot xác minh lại kiến trúc **sau khi** có PASS cuối cùng, không giả định trước cấu trúc file hiện tại.

## 0b. Content Specification Gate (chặn cứng theo lesson)

- Không tạo file lesson placeholder cho 4 lesson Pilot dưới bất kỳ hình thức nào.
- Mỗi lesson chỉ tạo file `.mjs` sau khi có **Content Specification** riêng được chủ dự án duyệt đầy đủ (vocabulary + reading nếu có, dialogueGroups, grammarPatterns, character pool + cultureContext/targetLocale, nội dung đủ 14 exercise theo đúng khuôn cấu trúc đã đóng băng của Q10/Q13...).
- Không đăng ký lesson vào registry khi chưa có Content Specification được duyệt.
- 4 lesson Pilot có thể được duyệt nội dung và lên registry độc lập theo từng lesson.

## 1. Mục tiêu kiểm chứng

1. Lesson Format 2.0 tổng quát hóa được ra ngoài 1 lesson tiếng Nhật, sang chủ đề khác và ngôn ngữ không phân biệt script.
2. Pipeline sinh nội dung hỗ trợ nhiều lesson `five_cards` qua registry overlay, không phải nhiều nhánh hard-code.
3. Stage 1 (sau khi Codex PASS) hoạt động đúng với lessonId khác Golden — có automated test.
4. Phát hiện sớm chỗ rule/architecture giả định ngầm "tiếng Nhật + chủ đề chào hỏi".

## 2–3. Danh sách lesson (5 lesson tổng — 1 Golden có sẵn + 4 Pilot mới)

| # | Vai trò | ID | Ngôn ngữ | Chủ đề |
|---|---|---|---|---|
| 1 | Golden (có sẵn, không đổi) | `ja-daily_life-m01-u1-l1` | Japanese | Chào hỏi / tự giới thiệu |
| 2 | Pilot — registry overlay | `ja-daily_life-m01-u2-l1` | Japanese | Quốc tịch / xuất xứ |
| 3 | Pilot — registry overlay | `en-daily_life-m01-u2-l1` | English | Quốc tịch / xuất xứ (song song #2) |
| 4 | Pilot — registry overlay | `ja-daily_life-m01-u3-l1` | Japanese | Sở thích / hoạt động |
| 5 | Pilot — registry overlay | `en-daily_life-m01-u3-l1` | English | Sở thích / hoạt động (song song #4) |

**Chỉ đúng 4 lesson trên được phê duyệt overlay. Không tự động áp dụng cho lesson nào khác.**

## 4. Rủi ro kiến trúc mỗi lesson kiểm tra

| Lesson | Rủi ro kiến trúc chính |
|---|---|
| `ja-daily_life-m01-u2-l1` (quốc tịch, JA) | `vocabularyDetails` (register/casual/formal) thiết kế cho phrase chào hỏi — tên nước có thật sự cần nuance xã giao này? |
| `en-daily_life-m01-u2-l1` (quốc tịch, EN) | Reading-aid 3-field khi không có phân biệt script; `cultureContext` lần đầu khác "Japan"; `dialogueGroups` "move-to-casual" có ý nghĩa với ngôn ngữ không phân cấp lịch sự theo ngữ pháp? |
| `ja-daily_life-m01-u3-l1` (sở thích, JA) | Grammar card lần đầu chứa mẫu câu động từ (thể て/ます) thay vì copula (Noun + です). |
| `en-daily_life-m01-u3-l1` (sở thích, EN) | Cộng dồn rủi ro 2 lesson trên; cặp JA/EN cùng chủ đề tách được lỗi ngôn ngữ vs lỗi chủ đề. |
| Cả 4 lesson | Q10/Q13 có cấu trúc đã đóng băng theo Rule 03 — nội dung mới phải vừa khít khuôn cố định. |
| Cả 4 lesson | Registry overlay phải phục vụ đúng nhiều lessonId cùng lúc, và fallback đúng về legacy khi entry bị gỡ. |
| Cả 4 lesson | Stage 1 pipeline (sau Codex PASS) phải đúng với lessonId khác Golden — xác minh bằng automated test. |

## 5. Cơ chế Registry Overlay (không phá hủy)

**Nguyên tắc: legacy source của 4 lesson không bao giờ bị sửa hoặc xóa trong Pilot.**

- Registry: `scripts/content/daily-life/module-1/five-card-lessons/index.mjs` — map `lessonId → content module`, chỉ chứa entry cho lesson đã có Content Specification được duyệt (mục 0b).
- `helpers.mjs` tổng quát hóa nhánh hard-code hiện có thành: **nếu `lessonId` có entry hợp lệ trong registry → dùng nội dung `five_cards`; nếu không → rơi về đúng đường sinh nội dung legacy hiện tại (không đổi)**. Đây là tổng quát hóa trực tiếp của cơ chế `if/else` đã có sẵn cho Golden Lesson, không phải cơ chế mới.
- Khi registry entry bị gỡ, generator **tự động quay lại legacy source** ở lần chạy tiếp theo — không cần thao tác khôi phục thủ công nào khác ngoài gỡ entry + regenerate.
- Không ghi đè, không xóa legacy source (`content.mjs`/`dialogues.mjs`/blueprint hoặc bất kỳ nguồn nào đang sinh ra nội dung legacy của 4 lesson này) trong suốt Pilot.

**Tái sử dụng từ Lesson Format 2.0** (không đổi): cấu trúc 5-card cố định; 14-exercise roster; cơ chế `option()/token()` collapse `displayText=canonicalText=audioText`; toàn bộ persistence/resume/wrong-answer/completion Flutter (đã tham số hóa theo `lessonId`); shape của `approvedCharacterNamePool`/`targetLanguage`/`targetLocale`/`cultureContext` (không tái sử dụng giá trị).

## 6. Lesson Format 2.0 — frozen tuyệt đối, quy trình khi gặp format blocker

- Lesson Format 2.0 và nội dung Golden Lesson **FROZEN** trong suốt Pilot — không sửa dưới bất kỳ hình thức nào, kể cả "tạm thời".
- Khi gặp format blocker: (1) dừng lesson đó ngay; (2) ghi defect (Rule defect), mô tả đúng chỗ không khớp; (3) không workaround; (4) mở Change Control riêng cho đề xuất Lesson Format 2.1 (Change ID, Affected Document, Old/New Decision, Reason, Affected Cores, Version Change, Approval Status) — xử lý **sau khi** Pilot có kết quả, ngoài phạm vi Pilot này.
- Các phần khác (schema `vocabularyDetails`, cấu trúc `dialogueGroups`, hành vi renderer/TTS thật, tính đúng của registry overlay) vẫn **không được đóng băng** — cần bằng chứng từ Pilot.

## 7. File dự kiến tạo hoặc sửa

**Sửa (chỉ sau khi mục 0 hoàn tất):**

- `scripts/content/daily-life/module-1/helpers.mjs` — thay nhánh hard-code bằng một lần tra cứu registry (fallback legacy khi không có entry).
- `docs/ai/ACTIVE_TASK.md` — mở task `PILOT-CONTENT-VALIDATION` khi được phép bắt đầu.
- `docs/ai/ARCHITECTURE_DECISIONS.md` — ADR ghi nhận registry overlay là cơ chế chính thức; Migration Decision Records cho 4 lesson; quy trình Change Control cho 2.1 nếu phát sinh.

**Tạo mới — theo đúng thứ tự phụ thuộc Content Specification (mục 0b):**

- `scripts/content/daily-life/module-1/five-card-lessons/index.mjs` — registry.
- `scripts/content/daily-life/module-1/five-card-lessons/{lessonId}.mjs` — chỉ tạo từng file sau khi Content Specification tương ứng được duyệt.
- `mobile/novalang_flutter/test/pilot_lessons_invariants_test.dart` — test case cho một lesson chỉ thêm khi lesson đó đã lên registry.
- Mở rộng automated Stage 1 integration test (mục 8).

**Trước mỗi migration, phải xác minh và ghi lại (không mặc định `lessons.json` là nguồn gốc):**

1. Xác định **nguồn có thẩm quyền thật sự** của nội dung legacy lesson đó (ví dụ: object/hàm cụ thể trong `content.mjs`/`dialogues.mjs`/blueprint — không phải `shared/content/curriculum/lessons.json`, vì file đó nhiều khả năng là generated output).
2. Snapshot cả hai lớp riêng biệt:

```text
docs/content/migration/legacy-snapshots/{lessonId}.legacy.json
```

Metadata bắt buộc trong snapshot:

```text
authoritativeSourcePath      (đường dẫn file nguồn thật, vd. content.mjs)
authoritativeSourceLocator   (vị trí cụ thể trong nguồn — object/hàm/key)
generatedRecordPath          (vd. shared/content/curriculum/lessons.json, chỉ để tham chiếu/đối chiếu)
sourceContentHash            (checksum của nguồn có thẩm quyền)
generatedRecordHash          (checksum của generated record hiện hành — riêng biệt, không gộp với sourceContentHash)
snapshotAt
migrationTaskId
approvedBy
```

**Sinh tự động, không sửa tay**: `shared/content/curriculum/*.json`, `shared/generated/*.json`, `mobile/novalang_flutter/assets/shared/*.json`.

**Lớp orchestrator/UI wiring**: xác định file cụ thể sau khi Codex xác nhận Stage 1 PASS.

### Rollback procedure (registry overlay — không phá hủy)

1. Xác định lesson cần rollback theo `lessonId` + `migrationTaskId`.
2. Gỡ entry của lesson khỏi `five-card-lessons/index.mjs`.
3. Xác nhận legacy source **vẫn nguyên vẹn** — đối chiếu hash hiện tại của `authoritativeSourcePath`/`authoritativeSourceLocator` với `sourceContentHash` trong snapshot (vì theo mục 5, legacy source chưa từng bị sửa nên bước này chỉ là xác nhận, không phải khôi phục).
4. `npm run generate:curriculum` — regenerate curriculum.
5. Verify: generated lesson quay lại đúng nội dung legacy, và hash của generated record khớp `generatedRecordHash` trong snapshot.
6. **Không sửa generated JSON thủ công** ở bất kỳ bước nào.
7. Gỡ/cập nhật assertion tương ứng trong `pilot_lessons_invariants_test.dart` và bộ Stage 1 integration test mở rộng.
8. Ghi Rollback Record: `lessonId`, `rolledBackAt`, `reason`, `rolledBackBy`, tham chiếu `migrationTaskId`.
9. Cập nhật `docs/ai/ACTIVE_TASK.md`/`ARCHITECTURE_DECISIONS.md`.

## 8. Test plan

1. `npm run generate:curriculum && npm run validate:curriculum && npm run smoke:curriculum` — registry overlay sinh đúng cho nhiều lesson `five_cards` cùng lúc, fallback đúng khi entry bị gỡ.
2. `npm run sync:flutter-assets`.
3. `flutter test` toàn bộ — mọi test hiện có (kể cả Stage 1) phải xanh nguyên vẹn, cộng test invariant mới cho từng lesson Pilot đã lên registry.
4. **Automated Stage 1 integration test bắt buộc**: mở rộng `stage1_integration_test.dart`-style, chạy lại assertion golden-path/idempotency với **ít nhất 1 lessonId tiếng Nhật và 1 lessonId tiếng Anh không phải Golden**, xác nhận completion → event → usage → progress → mock evidence đúng ID/source-linkage như Golden.
5. `flutter analyze` sạch.
6. Android thật: cài debug APK, chơi hết từng lesson Pilot đã sẵn sàng, kiểm tra audio/TTS ở lesson tiếng Anh, resume/wrong-answer review.
7. Internal testing với đồng nghiệp: log lỗi phân loại (Architecture defect / Rule defect / Content defect / UX defect / Deferred question).
8. **Verify rollback procedure trên fixture/temporary test lesson riêng** (không thuộc 4 lesson Pilot thật) trước khi thực hiện bất kỳ migration thật nào. **Không migrate rồi rollback một trong 4 lesson Pilot thật chỉ để thử quy trình.**

## 9. Điều kiện Pilot đạt / không đạt

**Đạt (READY cho bước tiếp theo):**

- Golden Lesson không regression (5 card, 14 exercise, test cũ xanh).
- Từng lesson Pilot đã lên registry chạy hết trên Android không crash; automated Stage 1 integration test PASS cho ít nhất 1 lessonId JA + 1 lessonId EN ngoài Golden.
- Registry overlay tổng quát hóa thật (không if/else hard-code riêng theo lesson), fallback về legacy đúng khi gỡ entry, đã verify qua fixture lesson.
- Mỗi migration có snapshot đủ metadata phân tách rõ authoritative source vs generated record (2 hash riêng biệt).
- Legacy source của 4 lesson xác nhận chưa từng bị sửa/xóa trong suốt Pilot.
- Reading-aid 3-field hoạt động tự nhiên ở cả JA và EN, không cần workaround khiên cưỡng.
- Đồng nghiệp hoàn thành được các lesson đã sẵn sàng, không gặp lỗi chặn; log lỗi phân loại rõ ràng.
- Không có format blocker nào bị workaround âm thầm — mọi format blocker đã dừng đúng lesson, ghi defect, có Change Control request cho 2.1 (chưa cần duyệt trong Pilot).

**Không đạt (BLOCKED):**

- Golden Lesson bị ảnh hưởng theo bất kỳ cách nào.
- Lesson Format 2.0 hoặc nội dung Golden Lesson bị sửa trong Pilot.
- Legacy source của bất kỳ lesson nào trong 4 lesson bị ghi đè/xóa thay vì chỉ overlay.
- Registry không tổng quát hóa được thật, hoặc có entry lesson chưa có Content Specification được duyệt.
- Automated Stage 1 integration test cho lessonId Pilot fail hoặc tạo duplicate record.
- Migration thực hiện mà không xác minh đúng nguồn có thẩm quyền/snapshot đủ metadata, hoặc rollback chưa từng được verify qua fixture.
- Tester không hoàn thành được lesson vì lỗi kiến trúc/cấu trúc (không tính lỗi nội dung/văn phong).

---

**Chưa tạo bất kỳ lesson hoặc placeholder nào, chưa tạo registry, chưa sửa `helpers.mjs`, chưa migrate/overlay nội dung legacy nào.** Triển khai còn bị khóa bởi mục 0 (Cursor hoàn tất B1–B5 + Codex xác nhận Stage 1 PASS) và mục 0b (Content Specification phải được duyệt trước từng lesson).
