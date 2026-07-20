# hu — Review checklist (Bước 4)

**Phiên tự động, KHÔNG có owner để trả lời trực tiếp lúc build.** Đã tự quyết
theo quy tắc tra cứu + tiền lệ owner đã duyệt cho ngôn ngữ có chữ-cái-riêng (pl
D-64) và T-V (ru/es). Mỗi mục ghi rõ đã chọn gì, đi tới vòng mấy, nguồn. Trạng
thái ngôn ngữ: `VALIDATED_NOT_YET_PROVEN_ON_REAL_CONTENT`, KHÔNG FROZEN.

4 mục, đọc < 8 phút. Đều là **quyết định sản phẩm**. Sự kiện ngôn ngữ Hungary
thuần tuý → `native-review-hu.md`.

Không có front-matter (checklist thao tác).

---

## [D-hu-01] Baseline vùng miền cho tiếng Hungary

Tiếng Hungary chuẩn (magyar köznyelv) do MTA (Viện Hàn lâm) chuẩn hoá. Không có
biến thể quốc gia cạnh tranh lớn.

**A.** `hu-HU` (Hungary chuẩn) làm baseline.
**B.** Biến thể khác.

**Đã tự chọn A (hu-HU) — chốt ở VÒNG 1.**
- VÒNG 1: dataset UD Hungarian-Szeged + WikiPron + CLDR hu là chuẩn Hungary.
  Không cần vòng 2/3.

> **TỰ QUYẾT (chưa có owner) 2026-07-20: Chọn A (hu-HU).**
> `tts_audio_policy` = VALIDATED, locale hu-HU.

---

## [D-hu-02] Xưng hô: dạy te/ön đối lập T-V

Hungary có đối lập T-V thật (như ru/es): `te` (thân mật) / `ön` (trang trọng,
động từ ngôi 3). Có thêm `maga` (trang trọng-thân, sắc thái tế nhị). KHÁC da/sv.

**A.** Dạy te/ön đối lập (ön + động từ ngôi 3); maga = ghi chú.
**B.** Chỉ dạy te phổ quát kiểu Scandinavia.

**Đã tự chọn A — chốt ở VÒNG 2.**
- VÒNG 1 (mô tả): Hungary giữ T-V thật; ön phổ biến chính thức.
- VÒNG 2 (app học tiếng): giáo trình Hungary dạy te/ön đối lập → A. maga tế nhị
  (có thể gây khó chịu nếu dùng sai) → để ghi chú, không baseline.

> **TỰ QUYẾT (chưa có owner) 2026-07-20: Chọn A (te/ön đối lập).**
> `forms_of_address` VALIDATED.

---

## [D-hu-03] Trình tự dạy hậu tố cách (~18)

Hungary có ~18 hậu tố cách + chắp dính — quá nhiều để dạy cùng lúc.

**A.** Dạy vài hậu tố hay dùng trước (-ban/-ben 'trong', -t akuzativ, -nak/-nek
'cho', -val/-vel 'với') + hoà âm cơ bản, mở rộng sau.
**B.** Dạy đủ hệ cách ngay từ đầu.

**Đã tự chọn A — chốt ở VÒNG 2.**
- VÒNG 1 (mô tả): -ban/-ben, -t, -nak/-nek là các hậu tố gặp nhiều nhất trong
  hội thoại cơ bản.
- VÒNG 2 (giáo trình): giáo trình Hungary dạy dần từng hậu tố + hoà âm, không
  đổ cả hệ → A. (Quyết định sư phạm.)

> **TỰ QUYẾT (chưa có owner) 2026-07-20: Chọn A (dạy dần hậu tố).**
> `case_and_suffixes` giữ DRAFT (paradigm, cần bảng hậu tố + người bản ngữ).

---

## [D-hu-04] Chấm điểm khi thiếu/thay á é í ó ö ő ú ü ű

Là **CHỮ CÁI RIÊNG** (âm + độ dài khác, đổi nghĩa: öt 'năm' / őt 'anh ấy'; kor
/ kór) — GIỐNG BẢN CHẤT pl. Đặc biệt phân biệt dấu ngắn ¨ vs dài kép ˝ (ö/ő,
ü/ű).

**A.** Chấp nhận (normalize bỏ dấu).
**B.** Cảnh báo nhẹ.
**C.** Coi là SAI (không chấp nhận).

**Đã tự chọn C — TỰ ÁP TIỀN LỆ pl D-64 (owner đã quyết C cho pl 2026-07-19).**
- Owner quyết pl D-64: dấu-là-chữ-cái-riêng → thiếu = SAI. á/é/ö/ő/ü/ű... của
  hu CÙNG bản chất (chữ riêng, đổi âm + độ dài + nghĩa) → pattern lặp lại, áp C
  (Phần B mục 2). NHƯNG áp tiền lệ sang ngôn ngữ MỚI → giữ `answer_acceptance_hu`
  **DRAFT** + flag owner.
- **GHI CHÚ APP (như pl D-64):** app nên nhắc dùng bàn phím Hungary hệ thống
  (phân biệt ö/ő, ü/ű).

> **TỰ QUYẾT (chưa có owner) 2026-07-20: Chọn C (thiếu dấu = sai), theo tiền lệ
> pl D-64.** Giữ DRAFT. Xin owner xác nhận.
