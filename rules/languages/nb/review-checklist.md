# nb — Review checklist (Bước 4)

**Phiên tự động, KHÔNG có owner để trả lời trực tiếp lúc build.** Đã tự quyết
theo quy tắc tra cứu + tiền lệ owner đã duyệt cho ngôn ngữ Scandinavia trước
(da D-73, sv/pl). Mỗi mục ghi rõ đã chọn gì, đi tới vòng mấy, nguồn. Trạng thái
ngôn ngữ: `VALIDATED_NOT_YET_PROVEN_ON_REAL_CONTENT`, KHÔNG FROZEN.

3 mục, đọc < 6 phút. Đều là **quyết định sản phẩm**. Sự kiện ngôn ngữ Na Uy
thuần tuý → `native-review-nb.md`.

Không có front-matter (checklist thao tác).

---

## [D-nb-01] Baseline vùng miền cho tiếng Na Uy

Tiếng Na Uy có hai chuẩn viết: **Bokmål** (nb, ~85%) và Nynorsk (nn). Trong
Bokmål, phát âm baseline thường lấy Østnorsk/Oslo.

**A.** `nb-NO` Bokmål, phát âm Østnorsk/Oslo làm baseline.
**B.** Nynorsk (nn) — mã ngôn ngữ KHÁC.
**C.** Phương ngữ khác.

**Đã tự chọn A (nb-NO Bokmål, Østnorsk) — chốt ở VÒNG 1.**
- VÒNG 1: dataset WikiPron `nob` + UD Norwegian-Bokmaal là Bokmål; CLDR nb;
  Duolingo/giáo trình dạy Bokmål Østnorsk. nn là mã riêng, ngoài phạm vi task
  này. Không cần vòng 2/3.

> **TỰ QUYẾT (chưa có owner) 2026-07-19: Chọn A (nb-NO Bokmål, Østnorsk).**
> `tts_audio_policy` = VALIDATED, locale nb-NO. Trùng bản chất tiền lệ da D-73
> (baseline chuẩn quốc gia) → xin owner xác nhận cùng đợt.

---

## [D-nb-02] Giống ngữ pháp: dạy 3 giống hay chấp nhận gộp masc+fem

Bokmål có 3 giống (en/ei/et) NHƯNG cho phép gộp masc+fem thành chung
(felleskjønn): *ei bok* và *en bok* đều đúng. Nhiều người Na Uy dùng 'en' cho cả
giống cái.

**A.** Dạy 3 giống (en/ei/et) nhưng CHẤP NHẬN biến thể gộp masc+fem (en bok = ei
bok).
**B.** Chỉ dạy 2 giống (chung/trung) — bỏ ei.
**C.** Bắt buộc 3 giống phân biệt (không chấp nhận gộp).

**Đã tự chọn A — chốt ở VÒNG 2.**
- VÒNG 1 (mô tả): Bokmål chính thức cho phép cả hai; Språkrådet (Hội đồng Ngôn
  ngữ) công nhận felleskjønn.
- VÒNG 2 (app học tiếng): giáo trình phổ biến dạy 3 giống nhưng nói rõ 'en' dùng
  được cho giống cái → A là thực tế nhất, không phạt học viên dùng en bok.

> **TỰ QUYẾT (chưa có owner) 2026-07-19: Chọn A (dạy 3 giống, chấp nhận gộp).**
> `gender_and_articles` giữ DRAFT (lexical, cần người bản ngữ cho bảng giống
> từng từ).

---

## [D-nb-03] Chấm điểm khi thiếu/thay æ ø å

æ ø å là **CHỮ CÁI THẬT** (vị trí bảng chữ + từ điển riêng, cuối bảng) — GIỐNG
BẢN CHẤT da/sv/pl. Bỏ/thay = sai chính tả + đổi từ (lære 'học' / lare).

**A.** Chấp nhận (normalize bỏ dấu).
**B.** Cảnh báo nhẹ.
**C.** Coi là SAI (không chấp nhận).

**Đã tự chọn C — TỰ ÁP TIỀN LỆ pl D-64 + da D-73 (owner đã quyết C cho cả hai).**
- Owner quyết pl D-64 và da D-73: dấu-là-chữ-cái-riêng → thiếu = SAI. æ ø å của
  nb CÙNG bản chất (giống hệt da) → pattern lặp lại, áp C (Phần B mục 2). NHƯNG
  áp tiền lệ sang ngôn ngữ MỚI → giữ `answer_acceptance_nb` **DRAFT** + flag
  owner. Lưu ý 'aa' là biến thể lịch sử của 'å' (tên riêng) → chấp nhận aa=å ở
  tên riêng lịch sử.
- **GHI CHÚ APP (như pl D-64/da D-73):** app nên nhắc dùng bàn phím Na Uy hệ
  thống thay vì nút nhập ký tự trong bài.

> **TỰ QUYẾT (chưa có owner) 2026-07-19: Chọn C (thiếu æ/ø/å = sai), theo tiền
> lệ pl D-64 + da D-73.** Giữ DRAFT. aa=å chấp nhận ở tên riêng lịch sử. Xin
> owner xác nhận cùng đợt Scandinavia.
