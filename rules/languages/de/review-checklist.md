# de — Review checklist (Bước 4)

**Phiên tự động, KHÔNG có owner để trả lời.** Đã tự quyết theo quy tắc tra
cứu (nguồn lớn → nguồn uy tín nhất → app học tiếng lớn). Mỗi mục ghi rõ đã
chọn gì + nguồn. Trạng thái ngôn ngữ: `VALIDATED_NOT_YET_PROVEN_ON_REAL_CONTENT`,
KHÔNG FROZEN. Owner xem lại sau; nếu đổi ý, cập nhật `coverage.json` tương ứng.

2 mục, đọc < 5 phút. Đều là **quyết định sản phẩm** (owner không cần biết
tiếng Đức để trả lời). Sự kiện ngôn ngữ Đức thuần tuý → `native-review-de.md`.

Không có front-matter (checklist thao tác).

---

## [D-de-01] Baseline vùng miền cho tiếng Đức

Tiếng Đức có 3 chuẩn quốc gia: Đức (de-DE), Áo (de-AT), Thụy Sĩ (de-CH).
Khác biệt chính ảnh hưởng app: (1) Thụy Sĩ KHÔNG dùng `ß` (luôn `ss`); (2)
locale TTS; (3) vài từ vựng (Áo: Jänner thay Januar). Ngữ pháp cốt lõi
(cách/giống/V2) giống nhau.

**A.** `de-DE` (Đức) làm baseline — dataset WikiPron/UD dùng bản này, phổ
biến nhất quốc tế, có `ß`.
**B.** `de-AT` hoặc `de-CH`.
**C.** Để mở, chưa quyết.

**Đã tự chọn A** (de-DE). Nguồn: WikiPron `deu_latn_broad` + UD German-GSD
là bản Đức chuẩn; Goethe-Institut (viện văn hoá Đức, cơ quan dạy tiếng Đức
chính thức) dạy de-DE làm chuẩn quốc tế; Duolingo/Babbel dùng de-DE. Rủi ro
thấp nhất, dữ liệu sẵn có.

> **TỰ QUYẾT (chưa có owner) 2026-07-19: Chọn A (de-DE).** `coverage.json`
> `tts_audio_policy` = VALIDATED với locale de-DE. Owner có thể đổi sang
> AT/CH sau; sẽ phải import lại dataset + xử lý ß→ss cho CH.

---

## [D-de-02] Chính sách chấm điểm khi gõ ss thay ß, hoặc ae/oe/ue thay ä/ö/ü

Học viên gõ `Strasse` thay `Straße`, `Mueller` thay `Müller` — rất phổ biến
khi bàn phím không có phím Đức. `ss` thay `ß` là chuẩn CHÍNH THỨC ở Thụy Sĩ;
`ae/oe/ue` là quy ước chuyển tự chuẩn (DIN 5007-2).

**A.** Chấp nhận (normalize: coi ss=ß, ae=ä, oe=ö, ue=ü khi so khớp đáp án).
**B.** Cảnh báo nhẹ (accept nhưng hiện dạng chuẩn có ß/umlaut).
**C.** Coi là sai.

**Đã tự chọn A** (chấp nhận, normalize). Nguồn: đây là quy ước chuyển tự
CHÍNH THỨC (DIN 5007-2) + chuẩn quốc gia Thụy Sĩ (bỏ ß hoàn toàn), KHÔNG phải
lỗi chính tả. Khác es (tilde bị owner chọn "cảnh báo nhẹ" B-03 vì tilde đổi
nghĩa từ si/sí) — với de, ae/oe/ue/ss là chuyển tự được cả một quốc gia dùng,
nên chấp nhận hoàn toàn hợp lý hơn. **Caveat đã cân nhắc:** ß/ss đôi khi phân
biệt nghĩa (`Maße` kích thước / `Masse` khối lượng) — nhưng chính người Thụy
Sĩ viết cả hai là `Masse` và dựa ngữ cảnh, nên coi là biến thể hợp lệ. Nếu
owner muốn chặt hơn (giống es B-03 cảnh-báo-nhẹ), đổi sang B.

> **TỰ QUYẾT (chưa có owner) 2026-07-19: Chọn A (chấp nhận normalize ss/ß,
> ae/oe/ue).** `coverage.json` `answer_acceptance_de` + `umlaut_orthography`
> giữ DRAFT tới khi owner xác nhận (vì là chính sách chấm điểm, có caveat
> phân biệt nghĩa) — KHÔNG tự nâng VALIDATED cho 2 mục này.
