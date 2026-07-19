# tr — Review checklist (Bước 4)

**Phiên tự động, KHÔNG có owner để trả lời.** Tra cứu **5 vòng** cho MỌI quyết
định sản phẩm (V1 nguồn lớn → V2 nguồn uy tín + app học tiếng → V3 corpus/dataset
thật → V4 học thuật → V5 đối chiếu chéo grammar chuẩn). Mỗi mục ghi rõ đã chọn
gì, các vòng ra gì, vì sao. Trạng thái: `VALIDATED_NOT_YET_PROVEN`, KHÔNG FROZEN.

5 mục, đọc < 10 phút. Đều là **quyết định sản phẩm**. Sự kiện ngôn ngữ Thổ
thuần tuý → `native-review-tr.md`.

Không có front-matter (checklist thao tác).

---

## [D-tr-01] Baseline vùng miền

**A.** `tr-TR` (chuẩn Istanbul, TDK). **B.** Biến thể khác (Kıbrıs/Síp...).

**Đã tự chọn A — chốt VÒNG 1 (không tranh chấp).**
- V1: dataset WikiPron `tur` + UD Turkish-BOUN là chuẩn Istanbul; CLDR `tr` mặc
  định tr-TR; TDK chuẩn hoá. Không biến thể viết cạnh tranh lớn.

> **TỰ QUYẾT 2026-07-19: A (tr-TR).** `tts_audio_policy` VALIDATED, locale tr-TR.

---

## [D-tr-02] Chuẩn chính tả

**A.** TDK (Türk Dil Kurumu — chuẩn nhà nước). **B.** Khác.

**Đã tự chọn A — chốt VÒNG 2.**
- V1: TDK là cơ quan chuẩn hoá chính thức (Yazım Kılavuzu — cẩm nang chính tả).
- V2: giáo trình/từ điển Thổ theo TDK. Không cần vòng 3–5.

> **TỰ QUYẾT 2026-07-19: A (TDK).**

---

## [D-tr-03] Reading aid (chú đọc)

**A.** NOT-APPLICABLE — chữ Latin, chính tả một-chữ-một-âm, đọc được ngay.
**B.** Cần trợ đọc.

**Đã tự chọn A — chốt VÒNG 1.**
- V1: chữ Latin + chính tả đều nhất trong các ngôn ngữ (thiết kế 1928 cho khớp
  âm). Người học phương Tây đọc được ngay sau khi biết ı/i + ç/ş/ğ/ö/ü. Không
  cần hệ chú đọc.

> **TỰ QUYẾT 2026-07-19: A (reading-aid NOT-APPLICABLE).** `reading_aid_policy`
> = not-applicable.

---

## [D-tr-04] Chấm điểm chữ Thổ đặc thù (ç ş ğ ı ö ü) + circumflex + locale ı/İ

ç ş ğ ı ö ü là CHỮ CÁI RIÊNG (đổi âm/nghĩa; ı≠i: 'sık'≠'sik'). Circumflex â/î/û
hiếm/tuỳ chọn. Casing ı/İ phải theo locale.

**A.** Chấp nhận (bỏ qua). **B.** Cảnh báo nhẹ. **C.** Coi là SAI.

**Đã tự chọn C cho ç/ş/ğ/ı/ö/ü — TỰ ÁP TIỀN LỆ pl D-64; circumflex KHOAN DUNG —
chốt sau VÒNG 4, giữ DRAFT + flag owner.**
- V1/V2: ç ş ğ ı ö ü là chữ riêng đổi âm/nghĩa (đặc biệt ı vs i — cặp tối thiểu
  thật). Thiếu = sai chính tả — như pl/da/el/sv/fi (C).
- V4 (học thuật): circumflex â/î/û là ngoại lệ — TDK cho phép bỏ trong hầu hết
  ngữ cảnh (chỉ giữ khi tránh nhầm kar/kâr, hala/hâlâ); ngày càng ít dùng.
  Giống bản chất ru ё/uk ґ (tuỳ chọn thực tế).
- Đề xuất: C cho ç/ş/ğ/ı/ö/ü (thiếu = sai); **KHOAN DUNG circumflex** (chấp nhận
  a thay â); nhắc cài bàn phím Thổ. **LƯU Ý KỸ THUẬT:** so khớp đáp án + casing
  PHẢI dùng locale tr (i↔İ, ı↔I) — dùng locale mặc định làm sai chấm i (thuộc
  implementation, cần owner biết).

> **TỰ QUYẾT 2026-07-19: C cho ç/ş/ğ/ı/ö/ü (pl D-64); circumflex â/î/û KHOAN
> DUNG.** Giữ `answer_acceptance_tr` DRAFT + flag owner (circumflex + locale ı/İ).

---

## [D-tr-05] Dạy đối lập sen/siz + Bey/Hanım

**A.** Dạy đối lập sen (thân)/siz (lịch sự) + Bey/Hanım. **B.** Một dạng.

**Đã tự chọn A — chốt VÒNG 2.**
- V1: Thổ dùng sống đối lập sen/siz (siz lịch sự với người lạ/lớn tuổi — chuẩn
  xã hội thật) + Bey/Hanım sau tên.
- V2: giáo trình Thổ dạy cả hai + danh xưng. Không cần vòng 3–5.

> **TỰ QUYẾT 2026-07-19: A (dạy đối lập sen/siz + Bey/Hanım).** `forms_of_address`
> VALIDATED.
