# pl — Review checklist (Bước 4)

**Phiên tự động, KHÔNG có owner để trả lời.** Đã tự quyết theo quy tắc tra
cứu (3 vòng, nâng 4 vòng cho ngôn ngữ phức tạp). Mỗi mục ghi rõ đã chọn gì, đi
tới vòng mấy, nguồn. Trạng thái ngôn ngữ: `VALIDATED_NOT_YET_PROVEN_ON_REAL_CONTENT`,
KHÔNG FROZEN.

2 mục, đọc < 6 phút. Đều là **quyết định sản phẩm**. Sự kiện ngôn ngữ Ba Lan
thuần tuý (7 cách, số từ, giống nam-người) → `native-review-pl.md`.

Không có front-matter (checklist thao tác).

---

## [D-pl-01] Baseline vùng miền cho tiếng Ba Lan

Tiếng Ba Lan chuẩn hoá RẤT cao (một chuẩn văn học/giáo dục thống nhất, pl-PL —
Rada Języka Polskiego). Không có biến thể quốc gia gây chia rẽ. Khác biệt vùng
(Śląsk, Kaszuby) ở mức phương ngữ/ngôn ngữ khu vực riêng, không phải chuẩn cạnh
tranh.

**A.** `pl-PL` (chuẩn Ba Lan) làm baseline.
**B.** Biến thể khác (không có ứng viên đáng kể).

**Đã tự chọn A (pl-PL) — chốt ở VÒNG 1 (không có tranh chấp thật).**
- VÒNG 1: dataset WikiPron `pol` + UD Polish-PDB/LFG là chuẩn Ba Lan; toàn bộ
  giáo trình + Duolingo dùng pl-PL. Không có biến thể cạnh tranh → dừng vòng 1.

> **TỰ QUYẾT (chưa có owner) 2026-07-19: Chọn A (pl-PL).** `tts_audio_policy`
> = VALIDATED, locale pl-PL.

---

## [D-pl-02] Chấm điểm khi thiếu dấu Ba Lan (dấu là CHỮ, không phải accent)

**Điểm khác bản chất với es/it/pt/nl:** dấu Ba Lan (ą ć ę ł ń ó ś ź ż) là
**chữ cái thật**, KHÔNG phải dấu phụ trang trí. Bỏ dấu = sai chính tả, đôi khi
đổi từ (ó/u đồng âm khác chữ; ż/rz; ł/l khác âm [w]/[l]). Học viên gõ
`dzien dobry` thay `dzień dobry`, `zolw` thay `żółw`. Nhưng bàn phím không-Ba-Lan
khó gõ dấu.

**A.** Chấp nhận (normalize bỏ dấu).
**B.** Cảnh báo nhẹ (accept nhưng hiện dạng đúng + nhấn mạnh 'đây là chữ').
**C.** Coi là sai (vì là chữ, không phải accent).

**Đã tự chọn B (cảnh báo nhẹ có chú thích) — cân nhắc tới VÒNG 2.**
- VÒNG 1 (chuẩn ngôn ngữ): Rada Języka Polskiego + mọi từ điển coi thiếu dấu là
  LỖI CHÍNH TẢ (khác bản chất es tilde). Theo chuẩn thuần tuý → nghiêng C.
- VÒNG 2 (app học tiếng lớn): Duolingo/Busuu tiếng Ba Lan trên thực tế CHẤP NHẬN
  câu trả lời thiếu dấu kèm nhắc "chú ý dấu", vì ép gõ dấu trên bàn phím Anh là
  bất khả thi cho người mới → nghiêng B. Đây chính là tinh thần es B-03 owner đã
  duyệt (không đánh trượt vì thiếu công cụ gõ).
- **Kết luận:** chọn **B** (cân bằng chuẩn ngôn ngữ + thực tế công cụ), NHƯNG
  khác es ở chỗ phải HIỂN THỊ RÕ dạng đúng + chú thích "dấu Ba Lan là chữ, không
  phải dấu" để học viên không hiểu nhầm là tuỳ chọn. `answer_acceptance_pl` giữ
  DRAFT — đây là điểm owner nên xác nhận rõ vì bản chất khác các ngôn ngữ Latin
  trước.

> **TỰ QUYẾT (chưa có owner) 2026-07-19: Chọn B (cảnh báo nhẹ + chú thích 'dấu
> là chữ'), theo tinh thần es B-03 nhưng điều chỉnh cho bản chất Ba Lan.** Nếu
> owner muốn nghiêm hơn (C: coi là sai vì là chữ) hoặc lỏng hơn (A), cập nhật.
> Đây là mục CẦN OWNER DUYỆT RÕ (khác bản chất với es/it/pt/nl).
