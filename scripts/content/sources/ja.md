# Nguồn nội dung — Tiếng Nhật (`ja`)

> File nguồn riêng cho việc BUILD NỘI DUNG BÀI tiếng Nhật. Quy trình 5 vòng
> (định nghĩa theo LOẠI) ở `LESSON_AUTHORING_STANDARD.md` §F-b; file này điền TÊN
> NGUỒN CỤ THỂ cho `ja`. Đây là tầng nội dung bài — **tách khỏi**
> `rules/languages/ja/sources.json` (nguồn build RULE ngôn ngữ học: CLDR/UD/
> Wikipron…). Đừng lẫn.

---

## Metadata

| Trường | Giá trị |
|---|---|
| `languageCode` | `ja` |
| Tên ngôn ngữ | Tiếng Nhật (日本語) |
| Cấp độ đang nhắm | A1–A2 (JF Standard) ≈ JLPT N5 |
| Cập nhật lần cuối | 2026-07-22 |
| Trạng thái | `READY_FOR_AUTHORING` |

---

## V1 — Tài liệu chuẩn của viện ngôn ngữ chính thức (NGUỒN CHÍNH + chốt chặn cuối)

- **Viện ngôn ngữ chính thức:** The Japan Foundation (国際交流基金) — cơ quan
  chính thức của Nhật phụ trách phổ biến/giáo dục tiếng Nhật ra nước ngoài.
- **Bộ tài liệu:** **IRODORI — Japanese for Life in Japan (『いろどり』生活の
  日本語)**, A1 / A2 / (A2/B1).
- **URL chính thức:** https://www.irodori.jpf.go.jp/ — **phải mở kiểm điều khoản
  trước khi dùng bất cứ tài nguyên nào vào sản phẩm.**
- **Miễn phí?** Có — tải PDF + audio miễn phí. · **Có audio?** Có (bộ audio tải
  được). · **Đối tượng:** người **sống/làm việc ở Nhật** — đúng đối tượng
  NovaLang Daily Life.
- **Chuẩn:** theo JF Standard for Japanese Language Education (nền CEFR).
- **Giấy phép — được PHỎNG THEO vào sản phẩm không?** **CHƯA XÁC MINH.** Bộ audio
  Irodori tải miễn phí **NHƯNG chưa xác minh điều khoản cho phép NHÚNG vào sản
  phẩm** → xem "Ghi chú giấy phép" bên dưới. Phải đọc điều khoản gốc trên trang
  Japan Foundation trước khi dùng.
- **Vì sao chọn làm V1:** miễn phí, tải được thật, đúng đối tượng người sống/làm
  việc ở Nhật, theo chuẩn JF Standard.

## V2 — Giáo trình lớn thứ hai (dùng khi V1 không phủ chủ đề)

- **Bộ tài liệu:** **MARUGOTO — Japanese Language and Culture (『まるごと』)** —
  cùng The Japan Foundation, cùng chuẩn JF Standard.
- **URL:** https://www.marugoto.org/ · tra từ vựng/nội dung: Marugoto Plus
  https://words.marugotoweb.jp/ — **kiểm điều khoản trước khi dùng.**
- **Miễn phí?** Có tài nguyên online miễn phí (Marugoto Plus). · **Có audio?** Có.
- **Giấy phép:** **CHƯA XÁC MINH** cho việc nhúng — chỉ dùng làm tham chiếu tới
  khi xác minh.
- **Dùng khi:** Irodori không phủ chủ đề đang cần.

## V3 — Giáo trình thương mại phổ biến nhất (CHỈ đối chiếu cách trình bày)

- **Bộ tài liệu:** **MINNA NO NIHONGO (みんなの日本語, 3A Corporation)** +
  **GENKI (The Japan Times)**.
- **Bản quyền — không mở nguyên văn.** Chỉ đối chiếu ở **mức chủ đề / thứ tự
  trình bày ngữ pháp sơ cấp**. **KHÔNG bịa số bài / số trang, KHÔNG chép nguyên
  văn.**

## V4 — Hai app học tiếng lớn (CHỈ đối chiếu, KHÔNG dùng làm nguồn chính)

- **App 1:** Duolingo (Japanese). · **App 2:** Bunpro (grammar SRS).
- **Cách dùng:** đối chiếu cách trình bày / độ khó / thứ tự dạy. Không lấy nội
  dung của app làm nội dung bài.

## V5 — Khung năng lực chính thức + kỳ thi chuẩn (kiểm ĐÚNG CẤP ĐỘ)

- **Khung năng lực:** **JF Standard for Japanese Language Education** (A1/A2) —
  https://jfstandard.jpf.go.jp/
- **Kỳ thi chuẩn:** **JLPT N5** (Japan Foundation + JEES) — https://www.jlpt.jp/
- **Cách dùng:** kiểm từ/ngữ pháp đang dạy có thuộc A1–A2 / N5 không, hay vượt
  trình độ. Vượt → bỏ hoặc chuyển "tham khảo thêm" (§B2b), không đưa thành trọng
  tâm.

---

## Tầng X — NGUỒN XÁC MINH NGÔN NGỮ (feed §G8)

> ⚠️ **WEBFETCH BỊ CHẶN trong môi trường build này** — mọi lần tra outbound trả
> **HTTP 403** (kể cả Wikipedia, edrdg.org, nlb.ninjal.ac.jp, nlt.tsukuba…,
> nlp.ist.i.kyoto-u.ac.jp). → **KHÔNG tự xác minh được điều khoản/đường dẫn của
> cả 3 nguồn.** Theo luật "không tra được = ghi CHƯA XÁC MINH, không bịa": tên
> nguồn dưới đây là **owner cung**; đường dẫn ghi là **trang gốc tiêu chuẩn của
> nguồn (CHƯA XÁC MINH bằng fetch)**; **owner cần tự mở kiểm điều khoản trước khi
> dùng vào sản phẩm.**

- **X1 — Cấu trúc BẮT BUỘC của từ** (động từ đòi trợ từ/cách nào; đổi dạng thì
  đổi ra sao):
  - **Nguồn:** Kyoto University Case Frame Dictionary (格フレーム辞書 — Kawahara &
    Kurohashi) — từ điển khung cách (case frame) tự động dựng từ corpus lớn.
  - **Đường lấy (trang gốc, CHƯA XÁC MINH bằng fetch):** tài nguyên NLP ĐH Kyoto,
    `https://nlp.ist.i.kyoto-u.ac.jp/`.
  - **Giấy phép: CHƯA XÁC MINH** (fetch 403). Owner cần kiểm: dùng nghiên cứu vs
    thương mại, điều kiện ghi công.
  - **Giới hạn:** trả lời "động từ này đi với cách/trợ từ nào" — KHÔNG thay khâu
    người duyệt cho sắc thái.
- **X2 — Kết hợp từ THỰC TẾ / collocation** (người bản ngữ có thật sự ghép các từ
  này) — **hai công cụ lexical profiling của NINJAL:**
  - **Nguồn 1:** **NINJAL-LWP for BCCWJ (NLB)** — Lago Word Profiler trên corpus
    **BCCWJ** (Balanced Corpus of Contemporary Written Japanese).
    Trang gốc (CHƯA XÁC MINH bằng fetch): `https://nlb.ninjal.ac.jp/`.
  - **Nguồn 2:** **NINJAL-LWP for TWC (NLT)** — tra **Tsukuba Web Corpus** (~1,1
    tỷ từ), cùng hệ lexical profiling của NINJAL; corpus web lớn.
    Trang gốc (CHƯA XÁC MINH bằng fetch): `https://nlt.tsukuba.lagoinst.info/`.
  - **Giấy phép: CHƯA XÁC MINH** (fetch 403). Công cụ tra online của NINJAL;
    corpus BCCWJ/TWC có điều khoản riêng — owner cần kiểm.
  - **Giới hạn:** tra tần suất/đối tác kết hợp — không tự xác nhận tính tự nhiên
    của câu hoàn chỉnh.
- **X3 — Loại từ + biến đổi dạng** (từ thuộc loại nào, chia/biến đổi theo quy tắc
  nào):
  - **Nguồn:** **JMdict/EDICT (EDRDG)** — đánh dấu tự/tha động từ (quyết định
    **を** hay **が**) + loại động từ để suy quy tắc chia; kèm **KANJIDIC** nếu
    cần thông tin kanji.
  - **Đường lấy (trang gốc, CHƯA XÁC MINH bằng fetch):** `https://www.edrdg.org/`
    (điều khoản: `https://www.edrdg.org/edrdg/licence.html`).
  - **Giấy phép (owner cung — CHƯA XÁC MINH bằng fetch):** **CC BY-SA** — dùng
    thương mại được, **phải ghi công**. Owner cần xác nhận đúng phiên bản CC
    BY-SA trên trang gốc.
  - **Giới hạn:** cho loại từ / tính tự-tha; KHÔNG cho ngữ cảnh/sắc thái.
  - Nền sẵn có trong repo (không thay nguồn X3 chính thức):
    `rules/languages/ja/word-class.data.json` + pipeline romaji.

> **Hệ quả cho luật G8/G4 ("không tra được = không dùng"):** vì cả 3 nguồn hiện
> **CHƯA XÁC MINH** (môi trường chặn fetch), luật tầng X **chưa chạy thật được**.
> Trước khi build bài tiếng Nhật thật: owner (hoặc phiên có mạng) **mở 3 trang
> gốc, xác nhận đường dẫn + điều khoản**, đổi trạng thái sang "ĐÃ XÁC MINH".

## Danh sách CỤM CỐ ĐỊNH (feed §G1 / §G2)

- **Đường dẫn file danh sách:** *(chưa khởi tạo)*.
- **Trạng thái duyệt:** `CHƯA KHỞI TẠO`. Tới khi có danh sách duyệt: gặp cụm nghi
  là cố định → **xử như LOẠI A + hỏi owner** (§G1). Nguồn để rút cụm cố định:
  V1 (Irodori) — các mẫu chào hỏi/lịch sự dạy nguyên khối.

## PHẦN CỐT LÕI KHÔNG ĐƯỢC THAY khi thay thế theo mẫu (feed §G3)

- Với mẫu ngữ pháp (LOẠI B) tiếng Nhật: **trợ từ + đuôi động từ/tính từ + trật tự
  đầu-cuối câu là CỐT LÕI, không đụng**; chỉ thay **danh từ/động từ nội dung** ở ô
  trống bằng từ ĐÃ DẠY. Quy tắc chia/biến đổi dạng: theo `rules/languages/ja/`
  (FROZEN) — file nguồn này không định nghĩa lại.

## Cơ chế HỖ TRỢ ĐỌC của tiếng Nhật (feed §C2/§E3 — chi tiết cụ thể ở đây, không ở file chung)

Repo có **HAI kiểu**, dùng đúng chỗ (KHÔNG có bước tự động ghép `displayText` +
`reading`; KHÔNG ruby; không tồn tại parser `漢字（かな）→ ruby`):

1. **Vocab card / Dialogue line / Q14 line** (mặc định): `displayText`
   (= `targetText`) lưu văn bản chuẩn **CÓ kanji** (`田中さん、今日も…`); `reading`
   là **trường RIÊNG kana thuần** (`たなかさん、きょうも…`), hiển thị như **dòng
   trợ đọc riêng / toggle**.
2. **Chat_text_fill segment (Q10)** + đôi chỗ furigana nội dòng: `displayText`
   **nhúng sẵn `漢字（かな）`** (vd `私（わたし）は田中（たなか）です。`), hiển thị
   nguyên văn (parens LÀ furigana, dữ liệu pre-authored).

Chính sách romaji/romanization theo trình độ + TTS locale: theo
`rules/languages/ja/` (FROZEN).

## Sổ kiến thức + bài mẫu của tiếng Nhật (feed §F-a/§F-f)

- **Sổ kiến thức:** `scripts/content/daily-life/ja-knowledge-ledger.md`.
- **Lệnh sinh sổ:** `npm run gen:ja-ledger` (sinh lại từ file bài thật —
  KHÔNG viết tay).
- **Bài đã APPROVED làm MẪU phong cách:**
  `scripts/content/daily-life/module-1/ja-unit1-lesson1.mjs` (Golden),
  `ja-unit1-lesson2.mjs` (L2), `ja-unit1-lesson3.mjs` (L3).

## Ví dụ "Tham khảo thêm" (§B2b) — bằng tiếng Nhật (ví dụ cụ thể để ở đây, không ở file chung)

```js
{
  term: 'またね',           // furigana 漢字（かな） nếu có kanji
  reading: 'またね',        // reading kana thuần
  speechText: 'またね',     // audio — BẮT BUỘC mỗi mục
  meaning: '…',            // NGHĨA đầy đủ (native, localize đủ locale)
  forWord: 'じゃあ、また',   // THAM KHẢO CHO TỪ CHÍNH NÀO (target ja)
  forWho: '…',            // DÙNG CHO AI (bạn bè/thầy cô/người trên… — native)
  whenToUse: '…',         // DÙNG KHI NÀO (tình huống, thời điểm — native)
  difference: '…',        // KHÁC GÌ so với từ chính (— native)
}
```

---

## Ghi chú giấy phép (QUAN TRỌNG)

- **Audio Irodori/Marugoto:** miễn phí tải, NHƯNG điều khoản cho phép **NHÚNG vào
  sản phẩm** **CHƯA ĐƯỢC XÁC MINH**. → Audio của Japan Foundation dùng làm **THAM
  CHIẾU** để người viết bài **nghe cách nói tự nhiên**; **KHÔNG nhúng vào app.**
- App vẫn dùng **speech/TTS sinh theo text của NovaLang** (không phụ thuộc audio
  ngoài).
- **Phải đọc điều khoản gốc trên trang Japan Foundation trước khi dùng bất cứ
  tài nguyên nào của họ (text, audio, hình) vào sản phẩm.**
- Minna/Genki (V3): bản quyền thương mại — chỉ đối chiếu ý tưởng trình bày ở mức
  chủ đề, không sao chép.

## Ghi chú riêng của tiếng Nhật

- Hệ chữ + reading (furigana/kana) + romanization + TTS locale: theo
  `rules/languages/ja/` (FROZEN). File nguồn này KHÔNG định nghĩa lại rule ngôn
  ngữ — chỉ liệt kê nguồn NỘI DUNG.
- Register/kính ngữ, chính sách romaji theo trình độ: đã có rule riêng ở
  `rules/languages/ja/`; nội dung bài bám V1 (Irodori) về mức lịch sự đời thường
  (teineiei です/ます) cho A1–A2.
