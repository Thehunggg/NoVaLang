# NovaLang — TRANSLATION STANDARD (chuẩn dịch nghĩa, dùng chung)

**MỘT file duy nhất** làm chuẩn cho phần **DỊCH NGHĨA** của NovaLang — cách dịch
**nghĩa từ vựng + văn giải thích** sang các **ngôn ngữ mẹ đẻ** (native, mục tiêu
60 ngôn ngữ).

> ⚠️ **Đây KHÔNG phải rule ngôn ngữ playable.** Rule playable (âm vị, ngữ pháp,
> chính tả của ngôn ngữ ĐANG HỌC) sống ở `rules/languages/<code>/` và
> `.cursor/rules/05_*`. File này chỉ nói về **cách DỊCH sang tiếng mẹ đẻ người
> học** (`nativeLanguageCode`) — nghĩa của từ, câu giải thích, hint, feedback.

| Bạn là | Đọc bắt buộc |
|---|---|
| Ai cũng đọc | **PHẦN 1 — Nguyên tắc chung** |
| Dịch một ngôn ngữ cụ thể | PHẦN 1 + **PHẦN 2** (cấu trúc file riêng) + file riêng ngôn ngữ đó |
| Build UI hiển thị bản dịch | PHẦN 1 mục 1.8 + 1.11 |

**Quan hệ với tài liệu khác (khi mâu thuẫn, trên thắng dưới):**

1. Frozen spec / ADR (nhất là **ADR-016** — naturalness & register).
2. Bản chuẩn/quyết định trực tiếp của Project Owner.
3. File này (`TRANSLATION_STANDARD.md`).
4. File riêng từng ngôn ngữ (`rules/translation/<code>/…` — xem PHẦN 2).

File này **bổ sung**, không thay `rules/content/naturalness-and-register.md`
(ADR-016). ADR-016 lo **register/giọng điệu**; file này lo **cách dịch nghĩa**.
Hai cái dùng chung: bản dịch phải vừa **đúng nghĩa + tự nhiên** (file này) vừa
**đúng register** (ADR-016).

---

## Nguồn (hai trụ) — URL để lần sau tự lấy

| Trụ | Vai trò | URL nguồn |
|---|---|---|
| **TRỤ 1 — Mozilla L10n Style Guide** | "La bàn" — nguyên tắc gốc: dịch theo NGHĨA + TỰ NHIÊN, không sát chữ. Cấu trúc *general* + *per-locale*. | `https://mozilla-l10n.github.io/styleguides/` (general: `.../mozilla_general/`); repo: `https://github.com/mozilla-l10n/styleguides` |
| **TRỤ 2 — Microsoft Localization Style Guides** | "Từ điển tra" — chi tiết bản địa TỪNG ngôn ngữ: dấu câu, viết hoa, từ điển/terminology, phương ngữ chuẩn, từ tránh. Có bản desktop + mobile/UI. | Danh mục + tải per-language: `https://learn.microsoft.com/en-us/globalization/reference/microsoft-style-guides`; thuật ngữ: `https://learn.microsoft.com/en-us/globalization/reference/microsoft-terminology` |
| Bổ sung — transcreation (tinh thần Apple) | Khi sát chữ ra nghĩa sai/kỳ → dịch lại theo tinh thần, không dịch mặt chữ. | (nguyên tắc, không có 1 URL chuẩn công khai) |
| Bổ sung — DeepL | **1 nguồn ĐỐI CHIẾU** trong 5 vòng (V5), **KHÔNG tin tuyệt đối**. | `https://www.deepl.com/translator` |

> **GHI CHÚ MÔI TRƯỜNG (2026-07-20):** phiên tạo file này thử `WebFetch` cả 2
> trụ nhưng **bị chặn 403** (Mozilla github.io và Microsoft learn đều chặn
> fetcher; proxy khoẻ, `recentRelayFailures: []` — server đích chặn, không phải
> proxy). Nội dung 2 trụ dưới đây lấy từ **kiến thức đã huấn luyện + 11 nguyên
> tắc Owner chốt** (là phần authoritative). **Phiên sau CÓ mạng tới 2 URL trên
> phải đối chiếu lại** và cập nhật nếu lệch (đặc biệt: chi tiết bản địa
> Microsoft cho TỪNG ngôn ngữ chỉ lấy được khi tải guide ngôn ngữ đó — làm ở
> PHẦN 2, lúc dịch ngôn ngữ cụ thể).

---

## PHẦN 1 — NGUYÊN TẮC CHUNG (áp MỌI ngôn ngữ)

### 1.1 Phạm vi

Chuẩn cho phần **dịch nghĩa** sang `nativeLanguageCode`:

- Nghĩa từ vựng (meaning của mỗi từ/cụm).
- Văn giải thích (grammar/usage/context explanation), hint, feedback, review
  explanation, tiêu đề hỗ trợ lesson/unit/module.

**KHÔNG thuộc phạm vi:** target-language text (câu/từ ngôn ngữ đang học — thuộc
`learningLanguageCode`), UI chrome (thuộc `uiLanguageCode`), và rule âm vị/ngữ
pháp của ngôn ngữ đích (thuộc `rules/languages/`). (Ranh giới trường theo
AGENTS.md "Learning Content Language Purity".)

### 1.2 Hai trụ nguồn — dùng thế nào

- **TRỤ 1 (Mozilla) = LA BÀN.** Trả lời câu hỏi *"dịch thế nào cho ĐÚNG TINH
  THẦN"*: ưu tiên nghĩa, tự nhiên, "meaning is everything", không dịch mặt chữ.
  Dùng ở mọi bản dịch, mọi ngôn ngữ.
- **TRỤ 2 (Microsoft) = TỪ ĐIỂN TRA.** Trả lời câu hỏi *"ngôn ngữ NÀY quy ước
  cụ thể ra sao"*: dấu câu, viết hoa, terminology chuẩn, phương ngữ chuẩn, từ
  cấm. Tra theo TỪNG ngôn ngữ khi dịch ngôn ngữ đó (→ đổ vào file riêng, PHẦN 2).
- **Transcreation** (bổ sung): khi dịch nghĩa-đúng vẫn nghe kỳ → viết lại theo
  tinh thần.
- **DeepL** (bổ sung): chỉ là **1 phiếu tham khảo** ở V5, luôn kiểm chéo, không
  chép thẳng.

### 1.3 Luật cốt lõi — NGHĨA + TỰ NHIÊN > sát chữ

Ưu tiên **nghĩa đúng** và **nghe tự nhiên** hơn dịch sát mặt chữ. Nếu sát chữ ra
**nghĩa sai hoặc nghe kỳ** → **THOÁT LY bản gốc** (transcreation), dịch theo
điều người bản ngữ thật sự nói.

- ✅ *"I work like a dog"* → **"làm việc quần quật"**
- ❌ *"làm việc như một con chó"* (sát chữ → kỳ, sai văn hoá)

### 1.4 Ngoại lệ — dịch sát chữ CÓ ĐÁNH DẤU (để dạy ngữ pháp)

Khi cần **dạy một điểm ngữ pháp/cấu trúc**, được phép để **bản dịch sát chữ**
NHƯNG **phải đánh dấu rõ** và **kèm nghĩa tự nhiên bên cạnh**. Bản dịch tự nhiên
luôn là bản CHÍNH; bản sát chữ là phụ trợ dạy học.

- Cơ chế repo: nghĩa tự nhiên ở trường dịch chính; cấu trúc sát chữ ở
  **`literalGloss`** (hoặc trường tương đương đã duyệt) — theo ADR-016 ("literal
  structure belongs in `literalGloss`"). KHÔNG để bản sát chữ thay bản tự nhiên.

### 1.5 Giọng (tone)

**Tự nhiên, ấm, đời thường.** KHÔNG lịch sự quá, KHÔNG xuồng xã quá, KHÔNG cứng/
máy móc. Chuẩn hình dung: **một giáo viên trẻ, thân thiện** đang giải thích cho
bạn. (Khớp baseline `NATURAL_NEUTRAL_POLITE` của ADR-016; register cụ thể theo
`rules/languages/<code>/style-and-register.md` khi có.)

### 1.6 Collocation (kết hợp từ) — dịch theo CỤM tương đương

Dịch theo **cụm từ tự nhiên của tiếng đích**, KHÔNG ghép từng từ rời.

- ✅ *"heavy rain"* → **"mưa to"**  ❌ "mưa nặng"
- ✅ *"make a decision"* → **"đưa ra quyết định"**  ❌ "làm một quyết định"

### 1.7 Trung tính người học

Bản dịch KHÔNG giả định người học là ai: **không gắn quốc tịch**, không giả định
giới/tuổi/tôn giáo, **không hardcode văn hoá một nước** vào nghĩa. Ví dụ đời
thường phải trung tính, dùng được cho người học ở bất kỳ đâu.

### 1.8 Data — MỘT bộ dịch chung (web + mobile)

- **Một nguồn sự thật:** cùng một bộ bản dịch cho cả Web và Mobile (đúng
  nguyên tắc Shared Source of Truth của AGENTS.md). KHÔNG tạo 2 bản khác nhau.
- Khác nhau giữa web/mobile **chỉ ở HIỂN THỊ** (CSS/layout), KHÔNG ở nội dung
  dịch.
- **Ưu tiên câu dịch GỌN** để vừa màn hình mobile (mobile chật hơn). Gọn nhưng
  không cụt nghĩa.

### 1.9 Quy trình 5 VÒNG cho mỗi bản dịch (ghi nguồn tới vòng mấy)

| Vòng | Việc |
|---|---|
| **V1 — Mozilla** | Áp nguyên tắc "la bàn": nghĩa + tự nhiên, không sát chữ. |
| **V2 — Microsoft** | Tra guide Microsoft của **chính ngôn ngữ đó**: dấu câu, viết hoa, terminology, phương ngữ chuẩn, từ tránh. |
| **V3 — Từ điển chuẩn** | Đối chiếu từ điển chuẩn uy tín của ngôn ngữ đó (nghĩa + cách dùng). |
| **V4 — Corpus/nguồn thật** | Kiểm cách người bản ngữ THẬT dùng (corpus/văn bản thật), nhất là collocation. |
| **V5 — Đối chiếu chéo** | Đối chiếu chéo nhiều nguồn, **gồm DeepL tham khảo** (không tin tuyệt đối). Chốt phương án hợp lý nhất. |

Mỗi bản dịch ghi rõ **đi tới vòng mấy** và **nguồn nào** (như rule playable ghi
"V1–V5"). Ưu tiên **dữ liệu thật hơn lý thuyết**: corpus mâu thuẫn giả thuyết →
sửa theo dữ liệu.

### 1.10 Ranh giới KIỂM (cái gì AI tự làm được, cái gì cần người bản ngữ)

- **AI tự tra được (5 vòng):** nghĩa từ vựng, dấu câu/viết hoa theo guide,
  terminology chuẩn.
- **CẦN NGƯỜI BẢN NGỮ:** văn giải thích dài, collocation tinh tế, độ tự nhiên,
  sắc thái register, transcreation khó.
- Ngôn ngữ **chưa có người bản ngữ kiểm** → trạng thái **"đã dịch, CHƯA KIỂM"**
  (song song với `VALIDATED` chưa `FROZEN` của rule playable). KHÔNG tự tuyên bố
  "đạt" nếu chưa có người bản ngữ kiểm phần cần người.

### 1.11 Hiển thị

- Ngôn ngữ **chưa có bản dịch** → UI hiện **"sắp có"**, **KHÔNG cho chọn**.
- **KHÔNG fallback tiếng Anh âm thầm** khi thiếu bản dịch (đúng
  `no_cross_language_fallback` của `_base` + AGENTS.md "UI Language Purity").
  Thiếu key → sentinel báo thiếu ở bản dev, KHÔNG vượt ranh giới ngôn ngữ.
- Cơ chế "sắp có" đã có sẵn: `shared/config/language_options.json`
  (`courseStatus`/`learningContentStatus` = `available` | `coming_soon`).

---

## PHẦN 2 — CẤU TRÚC FILE RIÊNG TỪNG NGÔN NGỮ (MÔ TẢ — CHƯA TẠO FILE NÀO)

> File riêng mỗi ngôn ngữ **sinh SAU, khi thật sự dịch ngôn ngữ đó** — giống
> rule playable sinh folder `rules/languages/<code>/` khi build từng ngôn ngữ,
> KHÔNG tạo sẵn 60 folder trống. PHẦN 2 chỉ **mô tả khuôn**.

### 2.1 Vị trí đề xuất trong repo

**Đề xuất chính: `rules/translation/<code>/`** — một thư mục con cho mỗi ngôn
ngữ NATIVE khi dịch nó, song song với `rules/languages/` (rule playable). Lý do
tách riêng, KHÔNG nhét vào `rules/languages/<code>/`:

- Dịch nghĩa áp cho **60 ngôn ngữ native**; rule playable chỉ cho **33 ngôn ngữ
  học**. Nhiều ngôn ngữ native (vd fa/ur/bn…) sẽ có file dịch nhưng **không** có
  folder `rules/languages/` → để chung sẽ lệch tập hợp.
- Giữ đúng phân tách khái niệm: `languages/` = ngôn ngữ ĐÍCH (playable),
  `translation/` = dịch sang ngôn ngữ MẸ ĐẺ (native).

Kèm **`rules/translation/_template/`** chứa khuôn rỗng (giống `rules/languages/_template/`)
và **`rules/translation/README.md`** điều hướng.

*(Phương án thay thế nếu Owner muốn gộp: `rules/languages/<code>/translation/` —
nhưng chỉ hợp khi ngôn ngữ đó vừa playable vừa native; không phủ hết 60 native.
Đề xuất dùng phương án chính.)*

### 2.2 Nội dung file riêng mỗi ngôn ngữ (khuôn)

Mỗi thư mục `rules/translation/<code>/` khi sinh sẽ gồm:

**a) `glossary.md` (hoặc `.json`) — Bảng thuật ngữ cố định.**
Danh sách thuật ngữ dịch **NHẤT QUÁN xuyên suốt mọi bài** của ngôn ngữ đó (một
thuật ngữ chỉ có MỘT bản dịch chuẩn trong toàn app). Tối thiểu gồm các nhóm:

| Nhóm | Ví dụ khái niệm cần chốt bản dịch |
|---|---|
| Thuật ngữ học | vocabulary, grammar, pronunciation, lesson, unit, module, exercise, review |
| Nhãn register | lịch sự (polite), thân mật (casual), trang trọng (formal), tự nhiên |
| Nhãn ngữ pháp | danh từ, động từ, tính từ, thì, cách, giống, số… (bộ AI cần khi giải thích) |
| Nhãn hệ thống học | đúng, sai, gợi ý (hint), phản hồi (feedback), điểm, hoàn thành, streak |
| Thuật ngữ đặc thù ngôn ngữ đích | (nếu dịch cho người học tiếng Nhật: kính ngữ, trợ từ, kana… — chốt bản dịch cố định) |

Mục tiêu: mọi lesson của ngôn ngữ đó dùng CÙNG một bản dịch cho cùng thuật ngữ
→ người học không thấy "vocabulary" lúc dịch kiểu này, lúc kiểu khác.

**b) `microsoft-locale-details.md` — Chi tiết bản địa (từ Microsoft guide ngôn
ngữ đó).**
Trích các mục Microsoft Style Guide của chính ngôn ngữ đó **tự liệt kê**:

- Dấu câu (dấu chấm/phẩy/ngoặc kép/khoảng trắng theo quy ước ngôn ngữ đó).
- Viết hoa (tháng/thứ/tiêu đề — mỗi ngôn ngữ khác nhau; nhớ bài học fil/id: có
  ngôn ngữ HOA tháng, có ngôn ngữ thường).
- Phương ngữ chuẩn (vd pt-PT vs pt-BR, es-ES vs es-419) — chốt bản chuẩn dùng.
- Từ điển/terminology chuẩn + **từ TRÁNH** (từ guide khuyến cáo không dùng).
- Số/ngày/tiền tệ (định dạng bản địa).

**c) `style-notes.md` — Ghi chú giọng/độ dài/transcreation riêng ngôn ngữ đó.**
Những chỗ ngôn ngữ này cần transcreation đặc thù, cụm collocation hay sai, giới
hạn độ dài mobile.

**d) `status.md` (hoặc front-matter trạng thái) — Trạng thái kiểm.**
Một trong ba, ghi rõ ngày + nguồn:

```text
NOT_TRANSLATED        — chưa dịch (mặc định; UI "sắp có")
TRANSLATED_UNVERIFIED — đã dịch (5 vòng) nhưng CHƯA có người bản ngữ kiểm
NATIVE_VERIFIED       — người bản ngữ đã kiểm phần cần người (mục 1.10)
```

Kèm: đi tới vòng mấy (V1–V5), nguồn, ai/khi nào kiểm, mục còn treo.

**e) (khuyến nghị) `native-review-<code>.md`** — checklist tick-được cho người
bản ngữ (giống pattern `rules/languages/<code>/native-review-*.md`): các câu
giải thích/collocation cần người bản ngữ xác nhận.

### 2.3 Nguyên tắc sinh file riêng (khi thật sự dịch)

- Sinh **1 ngôn ngữ / lần**, chạy đủ 5 vòng, ghi nguồn, đặt trạng thái
  `TRANSLATED_UNVERIFIED` (KHÔNG tự `NATIVE_VERIFIED`).
- Tải guide Microsoft của đúng ngôn ngữ đó ở bước này (V2) — đổ vào
  `microsoft-locale-details.md`.
- Glossary chốt TRƯỚC khi dịch bài để nhất quán.
- KHÔNG tạo sẵn folder rỗng cho ngôn ngữ chưa dịch.

---

## Trạng thái file này

- **Phần chung (PHẦN 1):** hoàn tất — 11 nguyên tắc Owner chốt + 2 trụ nguồn.
- **Template file riêng (PHẦN 2):** hoàn tất — mô tả cấu trúc, CHƯA tạo file
  ngôn ngữ nào.
- **Chưa dịch ngôn ngữ nào; chưa tạo `rules/translation/` hay file riêng.**
- 2 trụ nguồn: URL đã ghi; live fetch bị 403 phiên này → phiên sau đối chiếu lại.

## Changelog

- **0.1.0 (2026-07-20):** Khởi tạo. Owner chốt định hướng chuẩn dịch (11 nguyên
  tắc, 2 trụ Mozilla+Microsoft, transcreation/DeepL, quy trình 5 vòng, ranh giới
  kiểm, hiển thị "sắp có"). Chỉ tạo file chung + mô tả template file riêng; chưa
  dịch, chưa tạo file riêng ngôn ngữ nào.
