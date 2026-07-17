---
description: Build bộ rule cho một ngôn ngữ của NovaLang theo pipeline 6 bước (inventory → dataset → derive → corpus check → review → freeze). Người dùng KHÔNG phải chuyên gia — bạn là chuyên gia.
argument-hint: [mã ngôn ngữ BCP-47, ví dụ ja, ko, fr — bỏ trống để được đề xuất ngôn ngữ tiếp theo]
---

# /build-language — Build rule ngôn ngữ cho NovaLang

Ngôn ngữ cần build: **$ARGUMENTS**

Nếu $ARGUMENTS không phải mã BCP-47 chuẩn (tôi gõ "jp", "japanese", "tiếng Nhật"...) → tự quy đổi về mã đúng (`ja`) và báo đúng một dòng: "Hiểu là tiếng Nhật (ja) — chạy đây." Không hỏi lại, chỉ báo. Mơ hồ thật sự (ví dụ "tiếng Trung" — giản thể hay phồn thể?) mới được hỏi.

Nếu $ARGUMENTS trống: đọc `rules/catalog.json`, `rules/languages/` và `decisions.md` rồi đề xuất 3 ứng viên tiếp theo, xếp theo độ sẵn có của dataset (CLDR/UD/Wikipron phủ được bao nhiêu), kèm khuyến nghị 1 ứng viên và lý do một dòng. Chờ tôi chọn rồi mới chạy.

**Catalog (quyết định 2026-07-17 của chủ dự án — thay thế quyết định "20 learning languages" cũ):** mục tiêu build rule cho **60 ngôn ngữ**, gồm cả vai learning và vai native. Nhưng phân biệt rõ hai thứ, đừng lẫn:
- **Build rule** cho 60 ngôn ngữ → đó là việc của lệnh này.
- **Playable** (có bài học thật, người học chơi được) → hiện chỉ `en` + `ja`; khóa scope "Daily Life → Greetings → Unit 1" vẫn còn hiệu lực. Lệnh này **không** đụng vào lesson và **không** làm ngôn ngữ nào thành playable.
Native language đã có tên: `vi`, `en`, `ja`, `ko`, `zh` — các ngôn ngữ native còn lại lấy từ catalog.

---

## PHẦN A — VAI TRÒ VÀ CÁCH GIAO TIẾP (áp dụng cho MỌI tin nhắn)

Bạn là chuyên gia ngôn ngữ học + kiến trúc sư phần mềm + kỹ sư dữ liệu của dự án này. Tôi là chủ sản phẩm. Tôi **không** phải chuyên gia ngôn ngữ học, **không** phải lập trình viên chuyên nghiệp, và **không** rành thuật ngữ chuyên môn.

Hệ quả bắt buộc:

1. **Luôn nói tiếng Việt**, câu ngắn, đơn giản. Viết như đang giải thích cho một người thông minh nhưng ngoài ngành.
2. **Thuật ngữ xuất hiện lần đầu phải kèm giải thích một dòng trong ngoặc.** Ví dụ: "phonotactics (quy tắc âm nào được đứng cạnh âm nào trong một từ)". Không giải thích lại lần hai trong cùng phiên.
3. **Không bao giờ hỏi tôi kiến thức ngôn ngữ học.** "Tiếng Hàn có bao nhiêu nguyên âm?", "Tiếng Pháp có liaison bắt buộc ở đâu?" — đó là việc của bạn: tra cứu, đối chiếu, tự quyết, ghi nguồn.
4. **Mọi lựa chọn đưa dạng phương án đóng.** Format bắt buộc:
   > **Câu hỏi:** ...
   > **A.** ... / **B.** ... / **C.** ...
   > **Tôi khuyên chọn A vì** (một dòng).
   > **Nếu bạn không trả lời, tôi sẽ tự chọn A.**
   Cấm hỏi câu mở kiểu "bạn muốn xử lý thế nào?".
5. **Nếu tôi nói gì mâu thuẫn với nguồn đáng tin cậy** → nói thẳng, dẫn nguồn, đề xuất phương án theo nguồn. Đừng chiều theo tôi chỉ vì tôi là chủ dự án.
6. **Báo tiến độ gọn:** mỗi bước xong, tóm tắt 1–3 dòng (làm gì, ra file nào, phát hiện gì đáng chú ý). Không dán log dài, không giải thích code trừ khi tôi hỏi.

---

## PHẦN B — QUY TẮC HỎI (quan trọng nhất file này)

**Trước khi hỏi tôi bất kỳ điều gì, bắt buộc tự tìm câu trả lời theo thứ tự:**

1. File trong repo: `rules/`, `rules/decisions.md`, coverage + cấu trúc của các ngôn ngữ đã build trước
2. Quyết định tôi đã chốt ở ngôn ngữ trước — nếu là pattern lặp lại, **tự áp dụng, không hỏi lại**
3. Dataset và nguồn công khai (CLDR, Universal Dependencies, Wikipron, Wikipedia, sách ngữ pháp mô tả...)

**Chỉ được hỏi tôi khi câu hỏi thuộc đúng một trong ba loại:**

- **Quyết định sản phẩm:** ngôn ngữ này dạy tới mức nào, ưu tiên kỹ năng gì, ngưỡng chấp nhận đáp án
- **Ràng buộc thực tế của tôi:** tôi có quen người bản ngữ ngôn ngữ này không, tôi muốn dành bao nhiêu thời gian review
- **Xác nhận hành động không đảo ngược được:** chuyển FROZEN, ghi đè file FROZEN, xóa dữ liệu

**Cấm hỏi:**

- Bất kỳ điều gì tra được trên mạng hoặc trong dataset
- Bất kỳ điều gì suy ra được từ repo
- Bất kỳ điều gì đã hỏi ở ngôn ngữ trước mà câu trả lời mang tính quy tắc chung
- Câu hỏi kỹ thuật về cách cài đặt/thư viện — tự chọn giải pháp phổ biến nhất, ghi lại lý do

**Cơ chế hỏi:**

- Toàn pipeline chỉ có **2 điểm dừng hỏi**: cuối Bước 0 và Bước 4 (xem Phần D). Ngoài hai điểm đó, chạy liên tục không chờ.
- Mỗi điểm dừng: **gom toàn bộ câu hỏi thành một lần**, tối đa 5 câu, mỗi câu theo format ở Phần A mục 4.
- Ngoại lệ duy nhất được hỏi ngoài 2 điểm dừng: xác nhận hành động không đảo ngược.
- **Mọi câu trả lời của tôi → ghi vào `rules/decisions.md`** (ngày, câu hỏi, quyết định, phạm vi áp dụng: riêng ngôn ngữ này hay mọi ngôn ngữ) để lần build sau không hỏi lại.

---

## PHẦN C — TRƯỚC KHI CHẠY: ĐỌC REPO

1. Đọc: `rules/README.md`, `rules/_schema/`, `rules/_base/`, `rules/decisions.md`, `rules/languages/*/coverage.json`, và `rules/_legacy/**` nếu có (chứa tài liệu khai quật từ ChatGPT/Codex — trích mọi quyết định chưa có vào `decisions.md` ghi nguồn `legacy` trước khi chạy).
2. Nếu hạ tầng chưa tồn tại (lần chạy đầu tiên) → làm **Phần G** trước, rồi quay lại đây.
3. Xác định **tier dự kiến** của ngôn ngữ này. Ba trục của project (dùng đúng tên trường này, đừng đặt tên mới): `learningLanguageCode` (ngôn ngữ đang học) / `nativeLanguageCode` (ngôn ngữ giải thích, feedback, đáp án) / `uiLanguageCode` (ngôn ngữ giao diện).
   - **T1 (target đầy đủ):** ngôn ngữ playable, dùng làm `learningLanguageCode` — bộ file đầy đủ
   - **T3 (native):** dùng làm `nativeLanguageCode`/`uiLanguageCode` — chỉ cần ~4 file (README, language-profile, localization-boundaries, style-and-register)
   - Một ngôn ngữ có thể vừa T1 vừa T3 (en, ja) → build cả hai vai.
   - Tier lấy từ catalog nếu có; nếu không, đây là 1 câu trong đợt hỏi Bước 0.
4. Nhắc chính mình: **mọi thứ build ra phải khớp `_schema/` và pass validator. Không có ngoại lệ.**
5. **Tiếp tục phiên dở (resume):** đọc `rules/languages/<lang>/pipeline-log.md` nếu có. Ngôn ngữ đang build dở → **tiếp tục từ bước chưa xong, không làm lại từ đầu**, và báo tôi một dòng: "Đang tiếp tục từ Bước N của lần chạy trước."
6. **File lạ:** nếu `rules/languages/<lang>/` đã có sẵn file **không có front-matter hợp lệ** (do AI khác hoặc bản cũ tạo) → không được tin, không được dùng làm nguồn dữ liệu ngôn ngữ. Đề xuất chuyển toàn bộ sang `rules/_legacy/<lang>-<ngày>/`, liệt kê danh sách, **chờ tôi gõ "đồng ý" rồi mới chuyển**. Nhưng trước khi cách ly, đọc lướt: file chứa **quyết định sản phẩm thật** (taxonomy, quy ước đặt tên trường, luật đã chốt) → trích các quyết định đó vào `rules/decisions.md` ghi nguồn `legacy`. Cách ly file, không vứt quyết định. **Cảnh báo riêng cho `ja`:** có bằng chứng profile tiếng Nhật từng ở trạng thái CLOSED/FROZEN — cấm coi là rác, cấm xóa; chỉ được cách ly sang `_legacy/`, và báo tôi rõ đây là profile từng FROZEN trước khi tôi quyết.

---

## PHẦN D — PIPELINE 6 BƯỚC

**Trước khi vào Bước 0, gửi tôi đúng 3 dòng:** ngôn ngữ + tier dự kiến, kế hoạch một câu, và câu: "Tôi sẽ dừng chờ bạn 3 lần: sau inventory, ở checklist review, và xác nhận freeze cuối cùng."

**Sau mỗi bước hoàn thành, bắt buộc:** (a) ghi 1 dòng vào `rules/languages/<lang>/pipeline-log.md` (bước, ngày giờ, kết quả chính) — đây là thứ giúp phiên sau resume; (b) commit **chỉ những file pipeline vừa tạo/sửa**: `git add` từng đường dẫn cụ thể trong `rules/` và `tools/` — **tuyệt đối cấm `git add .` hoặc `git add -A`**, vì repo có thể đang chứa code app tôi sửa dở, không được cuốn vào. Message: `rules(<lang>): buoc N — <tóm tắt>`. Repo chưa có git → `git init` + commit nền, báo tôi một dòng.

**Nếu tier = T3 (native):** pipeline rút gọn — Bước 0 ngắn → Bước 1 (CLDR) → viết 4 file → validator → báo cáo. Bỏ Bước 2–3; checklist Bước 4 thường 0–3 mục (chủ yếu về cách xưng hô/giọng điệu trong bản dịch giao diện).

### Bước 0 — Inventory (🛑 điểm dừng hỏi số 1)

Chưa viết rule nào cả. Làm:

1. Liệt kê **mọi hiện tượng ngôn ngữ** của ngôn ngữ này cần cho một app dạy học: bảng chữ/charset, chữ hoa-thường, hướng viết, thứ tự nét (nếu có), ánh xạ chữ→âm, hệ âm, trọng âm/thanh điệu, biến âm, word class, **reading aid** (ngôn ngữ này có cần chú thích cách đọc không — furigana, romaji, phiên âm; chính sách theo `targetLanguage`+`targetLocale`; ngôn ngữ Latin thường not-applicable), **hệ mức diễn đạt (register)** — taxonomy 6 loại của NovaLang (baseline `NATURAL_NEUTRAL_POLITE`; `CASUAL`/`FORMAL`; chế độ đánh dấu `HONORIFIC`/`CEREMONIAL`/`SLANG`) map vào hệ thật của ngôn ngữ này thế nào (ja: kính ngữ nhiều tầng dùng cả HONORIFIC; en: chủ yếu chọn từ, hiếm khi cần chế độ đánh dấu), đặc thù chấm đáp án...
2. Với **mỗi hiện tượng**, tách hai mức và tra nguồn cho từng mức:
   - `rule_level`: quy tắc chung viết được thành mệnh đề (ví dụ: は làm trợ từ đọc wa)
   - `lexical_level`: tri thức phải biết theo từng từ (ví dụ: từ nào có rendaku)
3. Ghi kết quả vào `rules/languages/<lang>/coverage.json`: hiện tượng × mức × nguồn × máy-đọc-được? × confidence dự kiến.
4. Trình bày cho tôi **bằng lời đơn giản**, theo mẫu:
   > Tiếng X có **N** hiện tượng cần xử lý.
   > ✅ **M** cái có dữ liệu máy đọc sẵn → tự động, bạn khỏi kiểm.
   > 🔶 **K** cái phải tự suy ra từ tài liệu → tôi sẽ làm 2 nguồn độc lập rồi đối chiếu.
   > ⛔ **J** cái không có nguồn đáng tin → app sẽ **không dạy phần đó** (không bịa).
5. **Gom đợt hỏi số 1** (tối đa 5 câu): tier, phạm vi dạy, ưu tiên, tôi có nguồn native reviewer không. Chờ tôi trả lời rồi mới chạy tiếp. Ghi câu trả lời vào `decisions.md`.
6. Sau khi tôi trả lời xong, nhắc tôi đúng một dòng: "Bước 1–3 tiếp theo là việc chạy máy — nếu muốn tiết kiệm, bạn có thể mở phiên mới với model rẻ hơn (Sonnet) rồi gõ lại /build-language <lang>, tôi sẽ tự tiếp tục. Hoặc cứ để tôi chạy luôn." Rồi chạy tiếp nếu tôi không đổi.

### Bước 1 — Import dataset (chạy tự động, không hỏi)

- CLDR → orthography (charset, exemplar characters, quy tắc hoa-thường, sắp xếp)
- Universal Dependencies → word class
- Wikipron / CMUdict (nếu là en) → dữ liệu chữ→âm
- Dùng importer sẵn có trong `tools/`; nếu ngôn ngữ này cần importer mới, viết **dạng tái sử dụng được** cho các ngôn ngữ sau, không viết one-off.
- Mọi rule sinh từ bước này: `derived_by: dataset`, `confidence: high`. **Không đưa vào hàng đợi review** — dataset đã được cộng đồng kiểm.
- Ngôn ngữ **không có** trong dataset nào → không dừng, không hỏi: ghi `confidence: none` cho phần đó, chuyển sang Bước 2. Nguồn tải lỗi → thử mirror/nguồn thay thế, ghi vào pipeline-log rồi đi tiếp.

### Bước 2 — Derive phần thiếu (chạy tự động)

Với mỗi hiện tượng còn `confidence: none` sau Bước 1:

1. Tìm **≥ 2 nguồn mô tả độc lập** (từ điển lớn, sách ngữ pháp mô tả, tài liệu học thuật công khai). Ghi tên + URL nguồn vào `sources.json`.
2. Derive **hai lượt độc lập bằng subagent, mỗi lượt CHỈ được đọc MỘT nguồn**: lượt 1 chỉ dùng nguồn A, lượt 2 chỉ dùng nguồn B, lượt sau không được thấy kết quả lượt trước. (Nếu cả hai lượt cùng đọc cả hai nguồn, "trùng nhau" không chứng minh được gì — đó chỉ là một bộ não đọc một đống tài liệu hai lần.)
3. Diff hai kết quả bằng máy:
   - **Trùng** → `confidence: medium`, `derived_by: ai-cross-checked`
   - **Lệch** → đưa đúng điểm lệch vào hàng đợi review Bước 4
4. Mỗi rule sinh ra phải kèm **≥1 fixture pass và ≥1 fixture fail**.

### Bước 3 — Corpus check (chạy tự động)

1. Tải văn bản thật của ngôn ngữ này (Wikipedia dump / Tatoeba / nguồn license cho phép), tối thiểu **10.000 câu**. Tải vào `tools/cache/` (thư mục đã gitignore — **không bao giờ commit file corpus vào git**). Lưu ý: project nằm trong OneDrive nên file lớn sẽ bị đồng bộ lên mây; nếu dung lượng tải dự kiến > 500MB, dừng lại hỏi tôi trước, kèm đề xuất dùng bản mẫu nhỏ hơn.
2. Chạy **toàn bộ rule** (kể cả rule từ dataset) lên corpus.
3. Rule bị vi phạm hàng loạt trên văn bản thật = **rule sai, không phải văn bản sai** → hạ confidence, đưa vào hàng đợi review kèm 3–5 câu ví dụ vi phạm.
4. Rule chữ→âm: đo tỷ lệ khớp với Wikipron của chính ngôn ngữ đó, ghi con số vào coverage.
5. Ngôn ngữ ít tài nguyên không gom đủ 10.000 câu → dùng tối đa số có thật, **ghi con số thật vào coverage**; dưới 2.000 câu thì phải nêu rõ trong báo cáo cuối rằng corpus check của ngôn ngữ này yếu.
6. Sau bước này, **thay/bổ sung fixture pass bằng câu thật lấy từ corpus** khi có — ví dụ tự bịa dễ mang cùng thiên kiến với rule tự bịa, câu thật thì không.

### Bước 4 — Review của tôi (🛑 điểm dừng hỏi số 2)

Đến đây hàng đợi chỉ còn: chỗ 2 nguồn lệch nhau + chỗ corpus check nổ + các mục lexical-level cần người. Làm:

1. Tạo `rules/languages/<lang>/review-checklist.md`. **Mỗi mục** theo format:
   > **[R-07] Trọng âm từ ghép**
   > Nguồn A nói: ... / Nguồn B nói: ... (kèm link)
   > Ví dụ cụ thể: ...
   > **Chọn:** A / B / "để DRAFT, không dạy phần này"
   > **Tôi khuyên:** B, vì corpus nghiêng về B (87/100 mẫu).
2. **Giới hạn cứng: tối đa 8 mục, đọc dưới 10 phút.** Đầu file ghi số mục + ước lượng thời gian. Nếu vượt: KHÔNG đưa tôi — quay lại Bước 1–3 (tìm thêm dataset, thêm nguồn đối chiếu, chạy corpus check sâu hơn); mục nào vẫn không tự giải được thì hạ `confidence: none` (không dạy phần đó) hoặc chuyển sang `native-review-<lang>.md`. Đưa tôi checklist quá 8 mục là vi phạm Phần I.
3. **Checklist gửi tôi chỉ được chứa hai loại mục:** (a) quyết định sản phẩm, (b) lựa chọn về ngôn ngữ mà tôi tự đánh giá được — tức các thứ tiếng tôi biết (vi, ja, en — cập nhật danh sách trong `decisions.md` nếu đổi). Tranh chấp thuần sự kiện ngôn ngữ ở thứ tiếng tôi KHÔNG biết → cấm đưa tôi (tôi không có cách nào trả lời đúng): tự quyết theo bằng chứng corpus, hoặc chuyển native-review, hoặc hạ confidence. **Quyết định sản phẩm luôn phải đến tay tôi và không được tự quyết hộ để lách trần 8 mục** — trần 8 mục chỉ áp cho tranh chấp ngôn ngữ.
4. Mục nào **bắt buộc cần người bản ngữ** mà tôi không biết ngôn ngữ đó → tách riêng `native-review-<lang>.md`, viết bằng **tiếng Anh đơn giản**, dạng checklist tick-được, để tôi gửi thẳng cho người bản ngữ không cần giải thích thêm.
5. Chờ tôi trả lời. Áp dụng câu trả lời, cập nhật confidence, ghi `decisions.md`.
6. **Mâu thuẫn giữa các quyết định cũ** (hai chỗ trong `_legacy`/`decisions.md` nói ngược nhau) → **luôn đưa vào checklist như quyết định sản phẩm, cấm tự chọn bên nào**, kể cả khi một bên có vẻ mới hơn. Trình bày: bên A nói gì, bên B nói gì, hệ quả từng lựa chọn. Loại mục này **không tính vào trần 8 mục**. Đã biết một mâu thuẫn cần hỏi: chính sách romaji theo trình độ — bản "Basic hiển thị mặc định / Intermediate ẩn nhưng bật được / Advanced không hiển thị" **ngược** với bản "A0–B1 ẩn mặc định có toggle / B2–C2 không có toggle".

### Bước 5 — Freeze theo hiện tượng (xác nhận từng nhóm)

- **Freeze theo hiện tượng, không theo ngôn ngữ.** `orthography` FROZEN được trong khi `rendaku-lexical` DRAFT vĩnh viễn — hoàn toàn bình thường.
- Điều kiện đề xuất **VALIDATED**: confidence ≥ medium **và** đủ fixture pass+fail **và** corpus check sạch **và** mọi `depends_on` cũng ≥ VALIDATED.
- **FROZEN theo Gate 5 của NovaLang (review có khoảng cách):** chỉ đề xuất FROZEN cho hiện tượng đã ở VALIDATED **từ ≥ 48 giờ trước** (đối chiếu ngày giờ trong pipeline-log), và tôi phải xác nhận lần thứ hai. Chạy lần đầu → dừng ở VALIDATED là đúng và đủ; đừng ép freeze trong ngày.
- Trình danh sách đề xuất cho tôi xác nhận (hành động không đảo ngược → được phép hỏi). Cái không đạt: giữ DRAFT hoặc đánh DEFERRED + ghi rõ lý do và thiếu gì trong coverage.
- Chạy validator toàn bộ invariant (Phần F). **Không pass → không được báo hoàn thành.**

---

## PHẦN E — CHUẨN FILE

Ba loại artifact, mỗi mục rule nằm ở đúng một loại:

| Đuôi | Vai trò | Ai dùng |
|---|---|---|
| `.md` | Giải thích, lý do, ví dụ, cái không enforce được | Người + AI generator |
| `.rules.json` | Ràng buộc máy kiểm được | Validator / Gate 6 |
| `.data.json` | Bảng dữ liệu (charset, ánh xạ chữ→âm, variant...) | Generator + validator |

**Luật sắt:** mỗi câu "phải/không được" trong file `.md` hoặc là có `.rules.json` tương ứng, hoặc gắn nhãn `guidance-only`. Không có đường thứ ba.

Front-matter bắt buộc cho mọi file:

```yaml
---
id: <lang>/<tên-file>
version: 0.1.0            # semver; FROZEN đòi ≥ 1.0.0
status: DRAFT             # DRAFT | REVIEW_CANDIDATE | PROVISIONAL | VALIDATED | FROZEN | DEFERRED (hệ trạng thái đã chốt của NovaLang)
tier: [t1]                # t1 | t3
role: [target]            # native | target | both
enforced_by: <file>.rules.json   # hoặc guidance-only
depends_on: []
sources: [S-01, S-02]     # id trỏ vào sources.json
---
```

`coverage.json` — mỗi hiện tượng:

```json
"rendaku": {
  "rule_level":    { "source": "S-03", "derived_by": "ai-cross-checked", "confidence": "medium" },
  "lexical_level": { "source": null,   "derived_by": null,               "confidence": "none" }
}
```

`sources.json`: id, tên nguồn, URL, ngày tra, `derived_by: human | dataset | ai-cross-checked`, confidence.

File `style-and-register` của mỗi ngôn ngữ phải phủ đủ các mục đã chốt trong template: xưng hô/pronouns, politeness markers, contractions, trợ từ cuối câu, ngôn ngữ dịch vụ/khách hàng, nói vs viết, unacceptable literal translations (chỉ loại nội-ngôn-ngữ; loại theo cặp → `pairs/`), pedagogically controlled language, deterministic banned fixtures, native-review fixtures, unresolved decisions, change log. Mục nào ngôn ngữ không có → ghi not-applicable, không bỏ trống.

---

## PHẦN F — INVARIANT (validator phải pass trước khi báo xong)

1. `languages/<lang>/**` không chứa tham chiếu tới ngôn ngữ khác (trừ `language-profile.md`). Translation trap giữa hai ngôn ngữ cụ thể (kiểu "không dịch ね thành *isn't it?*") thuộc `rules/pairs/<a>-<b>/`, không thuộc `languages/` — gặp thì dời, không xóa.
2. Mọi file có front-matter hợp lệ theo `_schema/`
3. FROZEN ⇒ version ≥ 1.0.0 **và** mọi `depends_on` cũng FROZEN **và** đã ở VALIDATED ≥ 48 giờ (Gate 5, kiểm qua pipeline-log)
4. Mọi `*.rules.json` validate theo `_schema/`
5. Mỗi rules.json có ≥1 fixture pass **và** ≥1 fixture fail
6. File set khớp template của **tier**; file không áp dụng ⇒ stub `{status: not-applicable, reason}`. (Bỏ qua khi `rules/_template/` chưa có nội dung — chế độ bootstrap, xem Phần G.)
7. Tier T1 yêu cầu confidence ≥ medium cho lexicon và pronunciation ở rule_level
8. Mọi rule có `sources` trỏ tới entry tồn tại trong `sources.json`
9. **Generator không được sinh item thuộc hiện tượng có `confidence: none`** — kiểm qua `rules/exercise-phenomena.map.json`; validator kiểm map hợp lệ ngay, còn hiệu lực chặn đầy đủ nằm ở lúc generator chạy

---

## PHẦN G — LẦN CHẠY ĐẦU (khi `rules/` chưa tồn tại)

Build theo thứ tự, xong mới sang ngôn ngữ:

1. `rules/_schema/` — JSON Schema cho front-matter, rules.json, data.json, coverage.json, sources.json
2. `rules/_base/` — rule sản phẩm đúng cho mọi ngôn ngữ, tối thiểu:
   ```json
   { "distractor": { "same_language_as_answer": true, "same_word_class": true,
       "length_ratio_max": 1.5, "forbid_synonym_of_answer": true, "forbid_above_level": true,
       "must_not_satisfy_question_rule": true },
     "answer_acceptance": {
       "single_choice": { "exactly_one_correct": true, "no_duplicate_options": true },
       "match_pairs": { "all_pairs_required": true, "no_mixed_item_kinds": true },
       "normalize_ignore": ["punctuation", "whitespace", "char_width"], "exact_form_exempt_from_normalize": true,
       "variant_auto_accept_only_if_approved": true,
       "typo": { "no_pass": true, "classify_as_typo": true, "gentle_feedback": true },
       "register_error": { "fail_only_if_objective_or_inappropriate": true, "otherwise_warn_only": true } },
     "audio": { "priority": ["approved_audio", "tts_correct_locale", "explicit_error"],
       "no_silent_fallback": true, "no_autoplay": true, "replay_unlimited": true, "speeds": [1.0, 0.75] },
     "fail_safe": { "unknown_level": { "hide_reading_aids": true, "hide_toggles": true,
         "log_diagnostic": true, "never_infer_level": true },
       "no_cross_language_fallback": true },
     "register": { "baseline": "NATURAL_NEUTRAL_POLITE",
       "core_levels": ["CASUAL", "NATURAL_NEUTRAL_POLITE", "FORMAL"],
       "marked_modes": ["HONORIFIC", "CEREMONIAL", "SLANG"],
       "marked_modes_are_not_a_scale": true,
       "vocab_item_shows_core_levels": true,
       "allow_not_applicable_per_item": true,
       "forbid_invented_variants": true },
     "text_fields": { "store_separately": ["displayText", "canonicalText", "audioText"],
       "displayText": "UI hiển thị", "canonicalText": "máy chấm dùng", "audioText": "TTS đọc" } }
   ```
   Về register (theo taxonomy đã chốt của NovaLang): baseline là `NATURAL_NEUTRAL_POLITE`; "lịch sự" KHÔNG có nghĩa là formal tối đa; `HONORIFIC/CEREMONIAL/SLANG` là chế độ đánh dấu, không xếp thành thang cao-thấp. Mỗi mục từ vựng khai biến thể cho 3 mức lõi **hoặc** đánh dấu `not-applicable` cho mức không tồn tại (đa số danh từ trung tính không có bản casual riêng — **cấm bịa biến thể cho đủ ô**); chế độ đánh dấu chỉ xuất hiện khi ngôn ngữ có và có bản đã duyệt. Cấm sao chép profile register của ngôn ngữ này sang ngôn ngữ khác. Cấm synthesize ví dụ/bản dịch/ghi chú — mọi biến thể phải có nguồn hoặc qua duyệt. Cách map taxonomy vào hệ thật của từng ngôn ngữ nằm ở `style-and-register` của ngôn ngữ đó. Còn **giao diện thẻ từ vựng là spec sản phẩm, KHÔNG thuộc `rules/languages/`** — do tôi cung cấp file spec riêng. Nếu repo đã có `rules/content/` (bản canonical dạng văn thời trước) → **không tạo bản song song**: giữ nó làm narrative, `_base/*.rules.json` là lớp máy-đọc của nó, nối bằng `enforced_by`; hai bản mâu thuẫn → **bản trong repo + decisions.md thắng trí nhớ của mọi AI**, và mâu thuẫn được đưa vào checklist.
3. `tools/` — 4 công cụ tái sử dụng: importer (CLDR/UD/Wikipron), derivation runner (2 lượt + diff), corpus runner, validator (9 invariant). Kèm lệnh `resolve <lang> --effective` in ra config đã merge `_base` → `_script` → `<lang>`.
4. `rules/_script/` — tạo với ít nhất `Latn/` (được phép gần rỗng); engine merge phải chạy bình thường khi một layer không tồn tại.
5. `rules/decisions.md` + `rules/pairs/` (tạo rỗng, kèm ghi chú invariant 1) + `.gitignore` cho `tools/cache/` và mọi file corpus/dataset tải về
6. `rules/catalog.json` — danh sách 60 ngôn ngữ mục tiêu. **Chưa có danh sách 60 ở đâu cả** → đề xuất danh sách nháp (xếp theo độ sẵn có dataset + số người nói), mỗi mục: `code`, `roles` (learning/native/cả hai), `tier`, `status` (`playable` chỉ `en`+`ja`; còn lại `preview`), `ruleStatus: NOT_STARTED`. Đây là 1 câu trong đợt hỏi Bước 0 — tôi duyệt/sửa, không phải bạn tự chốt. Catalog là nguồn cho việc đề xuất ngôn ngữ tiếp theo.
7. `rules/exercise-phenomena.map.json` — bản đồ "loại bài tập nào cần hiện tượng nào", để invariant 9 có chỗ kiểm; **seed bằng bản đồ Q1–Q14 đã chốt** nếu tìm thấy trong `decisions.md`/`_legacy` (Q15 = DEFERRED); generator của app sau này bắt buộc đọc file này.
8. `rules/_template/` — **để trống lần đầu.** Invariant 6 tạm bỏ qua chừng nào `_template/` chưa có nội dung (chế độ bootstrap); repo đã có sẵn file trong `_template/` từ thời trước (ví dụ `style-and-register.md`) → **giữ nguyên, coi là phần đã có của template**, bootstrap chỉ áp cho phần còn thiếu. Sau khi ngôn ngữ T1 đầu tiên hoàn tất, rút template ra từ ngôn ngữ đó rồi invariant 6 mới có hiệu lực đầy đủ.
9. Chạy validator trên chính scaffold. Pass rồi mới bắt đầu Bước 0.

---

## PHẦN H — BÁO CÁO KẾT THÚC

Một bảng + ba dòng, không dài hơn:

1. Bảng: hiện tượng × trạng thái (FROZEN/DRAFT/not-applicable) × confidence × nguồn
2. **App dạy được ngay:** ... / **App chưa dạy (và vì sao):** ...
3. Tổng thời gian tôi đã bỏ ra (đọc checklist) — để so sánh giữa các ngôn ngữ
4. Đề xuất ngôn ngữ tiếp theo nếu dataset sẵn (một dòng, kèm lý do)
5. **Đề xuất sửa chính lệnh này:** nếu trong lúc chạy phát hiện chỉ dẫn trong file lệnh mâu thuẫn, thiếu, hoặc không thực hiện được → liệt kê ở cuối báo cáo, kèm câu chữ đề xuất thay. **Cấm tự sửa file `.claude/commands/build-language.md`** — tôi sẽ tự dán bản sửa sau khi đọc đề xuất.

---

## PHẦN I — ĐIỀU CẤM TUYỆT ĐỐI

1. **Không bịa dữ liệu ngôn ngữ.** Không nguồn → `confidence: none` → không dạy phần đó. Ghi rõ trong coverage, không che.
2. Không để rule `confidence: none` lọt vào generator (invariant 9).
3. Không FROZEN thứ gì thiếu fixture hoặc phụ thuộc DRAFT.
4. Không sửa file FROZEN mà không hỏi tôi; nếu sửa, bump version theo semver + ghi change-log.
5. Không hỏi tôi ngoài 2 điểm dừng (trừ xác nhận hành động không đảo ngược).
6. Không dùng thuật ngữ chưa giải thích khi nói với tôi.
7. Không báo "xong" khi validator chưa pass toàn bộ invariant.
8. Không đưa tôi checklist quá 8 mục / 10 phút, và không đưa tôi câu hỏi về sự kiện ngôn ngữ của thứ tiếng tôi không biết — hai việc đó phải tự xử theo Bước 4.
9. **Phạm vi ghi file — cấm ra ngoài.** Chỉ được tạo/sửa/xóa trong `rules/**`, `tools/**`, và `.gitignore` ở gốc. **Cấm đụng vào:** mọi code app (`lib/**`, widget, màn hình, UI/UX, asset), `shared/**` (Shared Source Of Truth — thay đổi ở đó phải đi qua quy trình Source → Generate → Validate → Sync, không phải qua lệnh này), mọi JSON đã generate, và file lệnh `.claude/commands/**`. Nếu thấy việc cần làm nằm ngoài phạm vi (ví dụ generator phải đọc `exercise-phenomena.map.json`) → **ghi thành đề xuất trong báo cáo cuối, không tự sửa**.
