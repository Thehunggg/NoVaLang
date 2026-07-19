# ru — Review checklist (Bước 4)

**Phiên tự động, KHÔNG có owner để trả lời.** Đã tự quyết theo quy tắc tra
cứu 3 vòng. Mỗi mục ghi rõ đã chọn gì, đi tới vòng mấy, nguồn. Trạng thái ngôn
ngữ: `VALIDATED_NOT_YET_PROVEN_ON_REAL_CONTENT`, KHÔNG FROZEN.

3 mục, đọc < 6 phút. Đều là **quyết định sản phẩm** (owner không cần biết tiếng
Nga để trả lời). Sự kiện ngôn ngữ Nga thuần tuý → `native-review-ru.md`.

Không có front-matter (checklist thao tác).

---

## [D-ru-01] Baseline vùng miền cho tiếng Nga

Tiếng Nga chuẩn hoá RẤT cao (một chuẩn văn học/giáo dục thống nhất, ru-RU).
Không có biến thể quốc gia gây chia rẽ kiểu es (tú/vos) hay pt (BR/PT). Khác
biệt vùng chủ yếu ở phát âm nhẹ (аканье mạnh/nhẹ), không ảnh hưởng ngữ pháp/
chính tả cốt lõi.

**A.** `ru-RU` (chuẩn Nga) làm baseline.
**B.** Biến thể khác (không có ứng viên đáng kể).

**Đã tự chọn A (ru-RU) — chốt ở VÒNG 1 (không có tranh chấp thật).**
- VÒNG 1: dataset WikiPron `rus_cyrl` + UD Russian-GSD/SynTagRus là chuẩn Nga;
  toàn bộ giáo trình + Duolingo/Babbel dùng ru-RU chuẩn. Không có biến thể cạnh
  tranh → không cần vòng 2/3.

> **TỰ QUYẾT (chưa có owner) 2026-07-19: Chọn A (ru-RU).** `tts_audio_policy`
> = VALIDATED, locale ru-RU.

---

## [D-ru-02] Chấm điểm ё/е và dấu trọng âm

Hai vấn đề chấm: (1) `ё` — người Nga thường viết `е` thay `ё` trong văn thường
(ё chỉ bắt buộc trong từ điển/sách học/khi mơ hồ); (2) **dấu trọng âm** —
không có trên bàn phím Nga, học viên không gõ được.

**A.** Chấp nhận (normalize: coi е=ё; bỏ dấu trọng âm khi so khớp).
**B.** Cảnh báo nhẹ (accept nhưng hiện dạng chuẩn có ё / trọng âm).
**C.** Coi là sai.

**Đã tự chọn A/B kết hợp — chốt ở VÒNG 1, theo tiền lệ es B-03.**
- `е`=`ё`: **chấp nhận hoàn toàn** (chuẩn chính tả đời thường Nga, không phải
  lỗi — khác es tilde). Dấu trọng âm: **normalize bỏ** (công cụ gõ không có, ép
  gõ là bất khả). Áp tinh thần tiền lệ es B-03 (dấu phụ do thiếu công cụ → không
  đánh trượt). `answer_acceptance_ru` giữ DRAFT tới khi owner xác nhận (chính
  sách chấm điểm + cần field UI gợi ý).

> **TỰ QUYẾT (chưa có owner) 2026-07-19: Chọn A cho ё/е + trọng âm.** Nếu owner
> muốn chặt hơn (B: hiện dạng chuẩn kèm cảnh báo), cập nhật sau.

---

## [D-ru-03] Hiển thị dấu trọng âm (ударение) làm trợ đọc mặc định

Trọng âm tiếng Nga tự do + di động + KHÔNG đánh dấu trong chính tả thường, nhưng
quyết định nguyên âm giảm → học viên đầu rất cần biết trọng âm ở đâu. Học liệu
Nga truyền thống đánh dấu sắc (рука́) cho người mới. Đây là trợ đọc (reading aid),
tương tự romaji của ja.

**A.** Hiện dấu trọng âm mặc định ở trình độ đầu, ẩn-có-toggle ở trình độ cao.
**B.** Không hiện dấu trọng âm bao giờ.
**C.** Luôn hiện.

**Đã tự chọn A — chốt ở VÒNG 1, theo tiền lệ chính sách romaji ja owner đã duyệt.**
- Owner đã duyệt chính sách romaji ja: ẩn-mặc-định-có-toggle theo trình độ. Dấu
  trọng âm Nga cùng bản chất trợ đọc → áp cùng khuôn (Phần B mục 2), nhưng vì
  học viên Nga đầu phụ thuộc trọng âm nặng hơn, đề xuất HIỆN mặc định ở trình độ
  đầu (biến thể hợp lý của cùng chính sách). `reading_aid_policy` giữ DRAFT tới
  khi owner xác nhận mức mặc định chính xác.

> **TỰ QUYẾT (chưa có owner) 2026-07-19: Chọn A (hiện dấu trọng âm mặc định
> trình độ đầu, ẩn-có-toggle cao hơn).** Owner chốt mức mặc định chính xác sau.
