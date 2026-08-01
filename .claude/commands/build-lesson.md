---
description: Build một bài five_cards ja-daily_life theo quy trình 2 pha (đo → build) đã chứng minh chạy được ở u2-l1/u2-l2/m02-u1-l1. Đóng gói lại quy trình đã chạy thật, không phát minh cách mới.
argument-hint: [lessonId, ví dụ m02-u1-l2 — CHỈ một bài mỗi lần chạy lệnh]
---

# /build-lesson — Build một bài học NovaLang (five_cards, ja-daily_life)

Bài cần build: **$ARGUMENTS**

Nếu $ARGUMENTS trống: chạy `node scripts/check-build-order.mjs`, lấy 2–3 lessonId đang "chưa bắt đầu" mà đơn vị/module trước nó đã ready, trình bày theo format hỏi đóng ở Phần A mục 4, và **chờ tôi chọn — không tự chọn bài**. Việc chọn bài là quyết định curriculum, không phải việc của bạn (AGENTS.md: "Không được tự... thay đổi lesson flow").

Nếu $ARGUMENTS không phải một lessonId hợp lệ theo mẫu `ja-daily_life-mNN-uN-lN` → báo đúng một dòng mẫu đúng là gì, không đoán.

---

## PHẦN A — VAI TRÒ VÀ CÁCH GIAO TIẾP (áp dụng cho MỌI tin nhắn)

Bạn là Software Engineer thực thi một quy trình đã được owner duyệt qua 3 bài trước (u2-l1, u2-l2, m02-u1-l1). Bạn **không** phải Curriculum Designer — không tự chọn từ vựng, không tự viết hội thoại/ngữ pháp ngoài những gì nguồn cho phép, không tự đổi ngưỡng.

1. Luôn nói tiếng Việt, câu ngắn, dựa trên số đo — không dựa trên cảm giác "nghe hợp lý".
2. **Mọi lựa chọn cần owner đưa dạng phương án đóng:**
   > **Câu hỏi:** ...
   > **A.** ... / **B.** ...
   > **Tôi khuyên chọn A vì** (một dòng, dẫn số đo).
   Cấm hỏi câu mở kiểu "bạn muốn bài này thế nào?".
3. Số liệu chưa chạy thì không báo — WORKING_RULES §g. Trường không có trong dữ liệu thì nói "không có", không suy ra.
4. Tiền đề đề bài (ngưỡng, mẫu đã chốt) mâu thuẫn với thứ đo được trong repo → **dừng, báo cả hai số, chờ owner** (WORKING_RULES §h). Không tự chọn bên rồi làm tiếp.

---

## PHẦN B — QUY TẮC HỎI VÀ ĐIỂM DỪNG

Toàn bộ lệnh chỉ có **hai điểm dừng bắt buộc** (CẦN MẮT NGƯỜI):

1. **Cuối PHA A (đo)** — sau khi đo xong, trước khi build. Owner duyệt can-do (tên bài + mục tiêu) và xác nhận ngưỡng đã đạt.
2. **Trước PUSH** — lệnh này KHÔNG BAO GIỜ push (xem Phần F). Điểm dừng thứ hai là bàn giao preview cho owner xem, không phải một câu hỏi.

Ngoài hai điểm đó, chạy liên tục không hỏi, **trừ** trường hợp phát hiện mâu thuẫn tiền đề (Phần A mục 4) hoặc PHA A không đạt ngưỡng (Bước A3 dưới) — cả hai đều là DỪNG-VÀ-BÁO, không phải câu hỏi lựa chọn.

---

## PHẦN C — TRƯỚC KHI CHẠY: ĐỌC BẮT BUỘC

Theo đúng thứ tự, không bỏ bước nào:

1. `CLAUDE.md` (cửa vào, chỉ trỏ)
2. `docs/ai/WORKING_RULES.md` — 12 khoản quy trình
3. `AGENTS.md` → `.cursor/rules/novalang.mdc` → `.cursor/rules/02_novalang_lesson_standard.mdc`
4. `LESSON_AUTHORING_STANDARD.md` mục **G14** (R0–R16) — đặc biệt R6 (nhiễu, 4 loại), R7 (bài tập dẫn xuất), R8 (register 3 tầng), R10 (báo cáo), R13 (local-sources), R14 (trợ đọc/furigana), R15 (trang duyệt), R16 (bài tổng hợp/build order)
5. `scripts/content/sources/INVENTORY.md` — đặc biệt mục "Kết luận — một dòng mỗi nguồn" và mọi mục đo riêng cho lessonId đang build (nếu PHA A của bài này đã chạy ở lượt trước, đọc lại kết quả đo cũ, **không đo lại từ đầu**)
6. `docs/ai/ACTIVE_TASK.md` — xác nhận `Current owner` = Claude Code trước khi sửa gì

**Xác nhận trạng thái build order:** chạy `node scripts/check-build-order.mjs`, xác nhận lessonId này hợp lệ để build tiếp (unit/module trước nó đã ready hoặc chính nó là bài đầu của unit). Không hợp lệ → dừng, báo, không tự ý build trước bài lẽ ra phải đến trước.

---

## PHẦN D — QUY TRÌNH 2 PHA

WORKING_RULES §f: **điểm dừng hợp lệ DUY NHẤT là sau commit PHA A.** Không có điểm dừng "chưa bắt đầu" — hết ngân sách giữa PHA B thì phải đưa PHA B về trạng thái chạy được (cổng xanh) rồi mới dừng, không được bỏ dở.

### PHA A — Đo (commit nhóm "docs"/"content-source")

1. **Đo nguồn cho `grammarPatterns`**: tìm mẫu ngữ pháp thật trong `local-sources/ja/` khớp chủ đề bài, trích dẫn `source:line`. Không có mẫu thật → không đưa mẫu đó vào bài (không tự sáng tác).
2. **Đo hội thoại ở MỨC KHỐI**, dùng `node scripts/estimate-source-coverage.mjs` (hàm `uniqueUnknownInSpan`/`bestQualifyingSpan`, xây ở lượt build m02-u1-l1) — đếm từ lạ **DUY NHẤT trên toàn khối** (union, không cộng dồn theo từng lượt riêng). Ngưỡng mặc định ≤2 từ lạ/khối; nới lên ≤3 **phải ghi lý do cụ thể** trong báo cáo (không lặng lẽ nới ngưỡng).
   - Nếu chủ đề bài chưa có trong danh sách hằng số của script → thêm entry mới theo mẫu các entry hiện có, **phá thật lại 3 ca self-test đã có** (`--self-test`) để chắc không phá logic cũ, rồi mới đo.
3. **Điều kiện ĐẠT** (owner chốt, dùng lại nguyên văn cho mọi bài):
   - **≥3 khối** dài 3–4 lượt, lấy từ **≥2 hội thoại nguồn khác nhau**, VÀ
   - **≥1 đoạn ≥4 lượt** riêng, dành cho Q14 (`real_world_practice_dialogue`, cần 6–8 lượt theo G14-R7 — đoạn ≥4 lượt là nguyên liệu tối thiểu để ghép đủ, không phải toàn bộ Q14).
   - **Không đạt** → DỪNG, báo owner đúng con số đo được, đề xuất hướng (đổi chủ đề/gộp chủ đề/chờ thêm nguồn). **KHÔNG tự ý lùi sang Irodori hay nguồn khác để né ngưỡng** — đó là quyết định curriculum của owner.
4. **Đo từ vựng mới** so với `taught-vocabulary.json` tính đến bài này: từ nào thật sự mới (tính vào ngân sách), từ nào là "cách dùng mới của từ đã dạy" (không tính vào ngân sách, theo mẫu §B2b/owner chốt ở PHA B của m02-u1-l1).
5. **Đề xuất can-do**: tên bài (tiếng Việt + tiêu đề tiếng Nhật nếu có) + danh sách mục tiêu (objectives), viết đúng dạng câu hành động đã dùng ở u2-l1 (vd "Cảm ơn lịch sự khi việc còn đang xảy ra bằng ...").
6. Ghi toàn bộ số đo + đề xuất can-do vào `INVENTORY.md`, mục mới cho lessonId này, theo đúng khuôn các mục đo trước (m02-u1-l1, u2-l2).
7. Cổng cho PHA A: nếu có sửa `estimate-source-coverage.mjs`, chạy `--self-test` xanh trước. Fetch-check (`git fetch` + `git rev-list --left-right --count origin/<branch>...HEAD`, đi sau ≠0 → DỪNG). Commit riêng (docs/content-source, không trộn code).
8. **DỪNG Ở ĐÂY.** Trình can-do + số đo cho owner theo format hỏi đóng (Phần B điểm dừng 1). Owner duyệt rồi mới sang PHA B.

### PHA B — Build (commit nhóm "content", chỉ chạy sau khi owner duyệt PHA A)

1. **Cấu hình A** theo G14-R3b (đọc lại rule tại thời điểm chạy — không chép số cũ, rule có thể đã cập nhật).
2. **Thang chất liệu**, ưu tiên theo thứ tự: (1) tái dùng từ bài đã dạy trước (`from_lesson`, xem cơ chế trong `verify-provenance.mjs`) → (2) nguồn owner (`ban1.txt`, `topic1-5.json` — đã xác nhận owner tự viết 2026-07-30) → (3) Irodori/hanabira/JMdict, chỉ khi hai tầng trên không đủ.
3. **§G6** — mọi `dialogueGroup` và Q14 phải khai vai vế (quan hệ giữa người nói, mức thân sơ) trong `situation`.
4. **§G7 vùng A** — nghiêm ngặt cho MỌI chuỗi bị chấm điểm (đáp án đúng, `acceptedAnswers`, token đúng của bài sắp xếp câu).
5. **Nhiễu G14-R6** — 4 loại (MUTATION · SOURCE_MARKED · CLOSED_FACT · MỤC TỪ KHÁC ĐÃ DẠY TRONG CHÍNH BÀI). Loại 4 chỉ hợp lệ khi ngữ cảnh nêu rõ trục phân biệt VÀ trục đó loại trừ được mọi phương án còn lại. **RÀ ĐỐI KHÁNG từng phương án khi soạn**, không để dồn lại cuối lượt mới rà (tránh lặp lại việc phải dựng bảng hồi tố).
   - **Trước khi gắn nhãn loại 4 cho một phương án, tự hỏi: phương án này có thật sự được DẠY (xuất hiện trong vocabulary/dialogue/Q14 của CHÍNH bài đang viết), hay chỉ là từ quen thuộc mượn từ bài khác?** Mượn từ bài khác không tự động là sai, nhưng KHÔNG được gắn nhãn loại 4 — phải tìm lý do khác (loại 1–3) hoặc đổi phương án.
6. **Furigana** — để máy tự ráp qua pass kuromoji trong `generate-curriculum.mjs`. Không tự đoán âm, không gõ tay furigana.
7. **Provenance** — viết cùng lúc với nội dung (không để dồn cuối bài), đủ 100% trường `mustDeclareProvenance: true` theo `shared/config/render-coverage.json`.
8. **Cổng bắt buộc, theo đúng thứ tự** (đã chứng minh chạy được ở m02-u1-l1, 2026-07-31):
   ```
   npm run generate:curriculum
   npm run sync:flutter-assets
   npm run validate:curriculum
   npm run smoke:curriculum
   node scripts/verify-provenance.mjs shared/content/curriculum/provenance/<lessonId>.provenance.json
   node scripts/check-render-coverage.mjs
   node scripts/test-provenance-checks.mjs
   node scripts/test-japanese-text-parity.mjs
   npm run test:japanese-pronunciation
   npm run test:q14-romanization
   node scripts/check-build-order.mjs      # report-only, không chặn
   (cd mobile/novalang_flutter && flutter test)
   ```
   Bất kỳ cổng nào FAIL → sửa nội dung cho khớp chuẩn, **không nới ngưỡng/sửa validator để né lỗi** trừ khi chính validator sai (trường hợp đó là việc khác, ngoài phạm vi lệnh này — báo owner).
9. **Xuất preview** (G14-R15): `node scripts/preview-lesson.mjs <lessonId>` — tự mở trình duyệt.
10. Fetch-check → commit (content, một nhóm, không trộn tooling/rule).
11. **KHÔNG PUSH** (xem Phần F).

---

## PHẦN E — MẪU BÁO CÁO CỐ ĐỊNH (cuối PHA B)

Đúng các mục sau, không thêm bớt cấu trúc:

1. **Tỉ lệ nguồn theo câu mẹ** — % mỗi file nguồn đóng góp (giống output `verify-provenance.mjs` mục "TỈ LỆ NGUỒN (G14-R10)").
2. **Authored theo reason** — đếm theo từng lý do authored (mục "AUTHORED theo reason").
3. **Mutation/nhiễu theo loại** — đếm bao nhiêu phương án mỗi loại (1/2/3/4) trong toàn bài.
4. **BẢNG RÀ ĐỐI KHÁNG TỪNG PHƯƠNG ÁN** — một dòng mỗi phương án (câu hỏi · phương án · đúng/sai · loại · vì sao bị loại/vì sao hợp lệ), **không giấu trong `feedback.explanation`** — bảng này phải đứng độc lập trong báo cáo.
5. **Đường dẫn preview** (`file:///...`).
6. **Hash commit** — cả PHA A và PHA B, kèm kết quả fetch-check từng lần.
7. **Vướng mắc** ≤2 dòng.
8. **CẦN MẮT NGƯỜI**, đánh số — **mục 1 luôn là can-do** (tên bài + mục tiêu, dù đã duyệt ở điểm dừng PHA A cũng nhắc lại ở đây để owner đối chiếu bản cuối cùng có đổi gì so với bản duyệt không); các mục sau là ngưỡng đạt/không đạt, quyết định lệch giữa nguồn, hoặc bất kỳ chỗ nào owner cần tự đọc để xác nhận (không phải máy tự xác nhận được).

---

## PHẦN F — ĐIỀU CẤM / RÀNG BUỘC

1. **Một lessonId mỗi lần chạy lệnh** (owner chốt 2026-07-31: 1 bài/lượt cho 2–3 bài đầu tiên dùng lệnh này, xét tăng sau khi có bằng chứng ổn định). $ARGUMENTS chứa nhiều hơn một lessonId → từ chối chạy, báo lại đúng quy tắc này.
2. **KHÔNG BAO GIỜ push.** Lệnh dừng lại sau khi commit PHA B + xuất preview. Push (nếu có) là quyết định riêng của owner ở một lượt khác, sau khi xem preview.
3. **KHÔNG đụng bài cũ, KHÔNG đụng Golden Reference Lesson** (`ja-daily_life-m01-u1-l1`) khi áp dụng bất kỳ luật nào (kể cả G14-R6 loại 4) — mọi luật mới trong G14 áp dụng **từ bài đang build trở đi**, trừ khi rule đó tự ghi rõ là hồi tố.
4. **PHA A không đạt ngưỡng → dừng, báo, không tự hạ tiêu chuẩn hoặc tự đổi nguồn để đạt cho bằng được.**
5. **Phạm vi ghi file** — chỉ được tạo/sửa trong:
   - `scripts/content/daily-life/**` (file nội dung + localization của bài mới)
   - `shared/generated/**`, `shared/content/curriculum/**` — chỉ qua `generate:curriculum`/`sync:flutter-assets`, không sửa tay
   - `mobile/novalang_flutter/assets/shared/**` — chỉ qua `sync:flutter-assets`, không sửa tay
   - `shared/content/curriculum/provenance/<lessonId>.provenance.json`
   - `scripts/preview/<lessonId>.html` — chỉ qua `preview-lesson.mjs`
   - `scripts/content/sources/INVENTORY.md` (mục đo của bài này)
   - `scripts/estimate-source-coverage.mjs` — chỉ khi cần thêm entry chủ đề mới, kèm phá thật self-test
   **Cấm đụng:** mọi rule trong `LESSON_AUTHORING_STANDARD.md`/`.cursor/rules/**` (đổi rule là việc của owner, không phải của lệnh build bài), Golden Reference Lesson, và **cấm tự sửa `.claude/commands/build-lesson.md`** — phát hiện chỗ lệnh này sai/thiếu thì ghi thành đề xuất ở cuối báo cáo, owner tự dán bản sửa.
6. Mọi ràng buộc chung của WORKING_RULES.md vẫn áp dụng nguyên vẹn: fetch-check trước MỌI commit, Write/Edit không heredoc, commit tách nhóm, không bịa số liệu.
