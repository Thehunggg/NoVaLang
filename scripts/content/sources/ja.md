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
| Cập nhật lần cuối | 2026-07-28 (BẢNG TẦNG VIỆC → NGUỒN + ranh giới chống lỗi kết hợp từ, bài tập từ Minna, nhiễu cơ học — feed §G11–§G13) |
| Trạng thái | `READY_FOR_AUTHORING` (Irodori + `N5 Grammar Master (japanvitta.com).pdf` + vocab JLPT/kanji/ngữ pháp hanabira đều chữ thật, dùng được ngay — **ngữ pháp N3–N1 ngoài phạm vi Irodori nay dựa vào hanabira, đọc được, không cần sách scan**; sách "まるごとマスター" N5 scan đã owner xóa 2026-07-23. **Còn tồn đọng, chưa xóa:** 5 file Nihongo Sou Matome N1–N5 (ẢNH SCAN, không đọc được) — **`irodori/Irodori.pdf` ĐÃ RÚT khỏi danh sách đề xuất xoá (2026-07-27): nó chứa phần 入門/Starter A1 mà Z_all và ZZ_all KHÔNG có, không hề trùng** —, 3 file kanji subset (`kanji-jouyou`/`kanji-kyouiku`/`kanji-wanikani.json`, trùng `kanji.json`) — đã đề xuất xóa, owner chưa thao tác xong; giấy phép nội dung hanabira grammar CHƯA XÁC ĐỊNH biến thể CC cụ thể — cần owner xác nhận trước khi dùng chính thức) |

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

## Danh mục FILE NGUỒN CỤC BỘ (`local-sources/ja/`) — feed §F-a + §G8 bổ sung

> **Luật cụ thể ja (feed §G8 bổ sung 2026-07-23):** build bài ja **BẮT BUỘC mở
> đối chiếu file thật** trong `local-sources/ja/` trước khi build — KHÔNG thay
> bằng trí nhớ mô hình dù có vẻ đúng: **Irodori** (`irodori/`) cho chủ đề/cách
> nói/tình huống đời sống, **sách N-level** (`grammar-books/`) cho mẫu ngữ
> pháp đúng cấp, **JMdict/EDICT** (tầng X3 ở dưới — dataset online, không có
> file cục bộ) cho loại từ/tự-tha động từ/quy tắc chia. **Báo cáo mỗi bài phải
> ghi rõ đã mở file nào trong bảng dưới đây, phần/chủ đề nào của file đó**,
> không ghi chung chung "đã tra Irodori".

### IRODORI BẢN MARKDOWN — owner bổ sung 2026-07-27, LẤP ĐÚNG LỖ HỔNG 初級1

Owner bỏ vào `IRODORI_4_PDF_to_MD.zip`; đã giải nén sang
`local-sources/ja/irodori/markdown/` (4 file, byte khớp bảng kê zip), **zip đã
xoá**. Đây là bản chuyển PDF → Markdown, **có mốc `## Trang PDF <n>` từng trang**
và **kèm bản dịch tiếng Việt**, nên tra bằng `grep` thẳng, không cần `pdftotext`.

| File | PDF gốc ghi trong đầu file | Cấp | Đo thật | Trạng thái |
|---|---|---|---|---|
| `IRODORI_Nhap_mon_A1.md` | `x_all_20230109.pdf` | **入門 (A1)** | 34.420 dòng · 572 trang · 62% chữ Nhật · 15.658 dòng tiếng Việt · 11 trang rỗng · **0 ký tự hỏng** | Chữ thật |
| `IRODORI_So_cap_1_A2.md` | `sc1_full_20221219.pdf` | **初級1 (A2a)** | 28.491 dòng · **464 trang** · 62% chữ Nhật · 13.151 dòng tiếng Việt · 14 trang rỗng · **0 ký tự hỏng** | Chữ thật — **NGUỒN MỚI HOÀN TOÀN** |
| `IRODORI_So_cap_2_A2.md` | `SC2_full-done-checked.pdf` | **初級2 (A2b)** | 35.686 dòng · 559 trang · 64% chữ Nhật · 17.672 dòng tiếng Việt · 8 trang rỗng · **0 ký tự hỏng** | Chữ thật |
| `IRODORI_So_trung_cap_A2-B1.md` | `ZZ_all.pdf` | **初中級 (A2/B1)** | 44.654 dòng · 635 trang · 56% chữ Nhật · 17.615 dòng tiếng Việt · 1 trang rỗng · **0 ký tự hỏng** | Chữ thật |

**LỖ HỔNG 初級1 ĐÃ ĐÓNG.** Trước: 24 nhãn trang mảnh rải trong 3 PDF. Nay:
**464 trang trọn vẹn**. Đây là cấp chứa bài 「お久しぶりです」.

**Đối chiếu trùng lặp (kiểm bằng chuỗi đặc trưng, không đoán theo tên file):**
`MD_So_trung_cap` ≡ `ZZ_all.pdf` · `MD_So_cap_2` ≡ `Z_all.pdf` ·
`MD_Nhap_mon` ≡ phần 入門 của `Irodori.pdf` · **`MD_So_cap_1` không có bản PDF
tương ứng**. Ba cặp đầu là **trùng THẬT** (cùng sách, khác định dạng).
→ **ĐỀ XUẤT, chưa làm:** dùng bản `.md` làm đường tra mặc định (đã là text, có
mốc trang, có bản dịch); giữ hay bỏ 3 PDF là **quyết định của owner** — PDF vẫn
là bản gốc có hình minh hoạ mà `.md` không nhúng. **Không tự xoá file nội dung.**

**Trích dẫn phải ghi rõ file + số trang PDF** (ví dụ: `IRODORI_So_cap_1_A2.md`,
Trang PDF 43) — mốc trang có sẵn nên không được ghi chung chung.

### PHẠM VI THẬT của 3 file Irodori — đo 2026-07-27, KHÁC bản ghi cũ

Đếm nhãn trang bóc được (`<cấp>　L<n> - <trang>`) trong từng file:

| File | 入門 (A1) | 初級1 (A2a) | 初級2 (A2b) | 初中級 (A2/B1) |
|---|---|---|---|---|
| `Irodori.pdf` | **462 trang — TRỌN, L1 đủ 18/18** | 12 (mảnh) | 14 (mảnh) | 0 |
| `Z_all.pdf` | 0 | 12 (mảnh) | **467 — TRỌN** | 0 |
| `ZZ_all.pdf` | 0 | 0 | 0 | **616 — TRỌN** |

**Ba file KHÔNG trùng nhau — mỗi file giữ một cấp khác nhau.** Bản ghi cũ mô tả
`Z_all` là "Starter + Elementary 1 + Elementary 2" là **sai**: nó là 初級2.
Bản ghi cũ coi `Irodori.pdf` là "trùng Z_all+ZZ_all" cũng **sai**: nó là file
DUY NHẤT có 入門 (A1) — cấp đúng của những bài đầu tiên. **Không được xoá file
nào trong ba.**

**LỖ HỔNG NGUỒN: 初級1 (Elementary 1) gần như KHÔNG có** — chỉ 12 trang mảnh
trên tổng 462+467+616. Đây đúng là cấp chứa bài 「お久しぶりです」 (can-do
「久しぶりに会った人とあいさつをすることができる」). Vì vậy:
- Cụm 「お久しぶりです」 **CÓ** trong nguồn, nhưng chỉ ở **mục lục can-do** —
  có tên bài + mô tả chức năng, **KHÔNG có hội thoại, KHÔNG có câu ví dụ**.
- Đủ căn cứ làm **thẻ từ vựng** (cụm + nghĩa + tình huống dùng, dẫn nguồn
  can-do). **KHÔNG đủ** làm hội thoại — không có đoạn nào để lấy nguyên văn.
- Muốn dạy sâu chủ đề gặp lại thì **owner cần bổ sung bản 初級1**.

### Cách kiểm một PDF có tra chữ được hay không (2026-07-27)

Bài học từ một lần đánh giá sai làm khoá nhầm nguồn tốt nhất suốt hai ngày:

- **ĐÚNG:** chạy `pdftotext -enc UTF-8 <file>.pdf -` rồi **đếm dòng có chữ
  Nhật** (`grep -cE "[぀-ヿ一-鿿]"`). Có chữ ra thì tra được, hết.
- **SAI:** đếm object ảnh nhúng rồi suy ra "toàn ảnh". Sách giáo trình nhiều
  minh hoạ thì **ảnh và font cùng nằm trên một trang** — nhiều ảnh không hề
  có nghĩa là không có chữ.
- **Cũng SAI:** lấy mẫu ở lời tựa/bìa rồi suy ra cả sách. Lấy mẫu phải rơi
  đúng phần **thân bài tiếng Nhật**.
- Kết luận "không đọc được" chỉ ghi khi `pdftotext` ra **0 dòng chữ Nhật**.

Cấu trúc thư mục (quy ước `local-sources/<mã ISO>/<loại-nguồn>/`, xem
`_TEMPLATE.md` mục "ĐƯỜNG DẪN FILE NGUỒN CỤC BỘ"): `local-sources/ja/irodori/`,
`grammar-books/`, `vocab-3000/`, `jmdict/` (trống — xem ghi chú cuối bảng).
Đã quét trực tiếp từng file (không đoán qua tên) bằng trích văn bản mẫu +
đếm ảnh nhúng, 2026-07-23:

| File | Bộ / cấp độ | Chủ đề · phạm vi | Chữ thật hay ảnh scan |
|---|---|---|---|
| `irodori/Z_all.pdf` | Irodori — **Starter + Elementary 1 + Elementary 2** (A1–A2, JF Standard) | 3 phần, mỗi phần 9 chủ đề / 18 lesson — hội thoại + ngữ pháp đời sống hàng ngày | **CHỮ THẬT — tra tự động ĐƯỢC** (sửa lại **2026-07-27**, lật đánh giá 2026-07-25). Đo thật bằng `pdftotext -enc UTF-8`: **55.331 dòng / 506 trang, trong đó 26.729 dòng có chữ Nhật (48%)**; `会話` 213 lượt, `ことば` 309 lượt, `聴解スクリプト` 70 lượt. Bóc ra được **kịch bản hội thoại nguyên văn** dạng `Ａ：… Ｂ：…`. Đánh giá "ẢNH" trước đây đếm object ảnh nhúng (đúng — sách nhiều minh hoạ) rồi suy ra là không có chữ — **suy sai**: ảnh và font cùng tồn tại trên một trang. Cách kiểm đáng tin là **chạy `pdftotext` rồi grep chuỗi tiếng Nhật**, không phải đếm object. |
| `irodori/ZZ_all.pdf` | Irodori — **Pre-Intermediate** (A2/B1, JF Standard) | 9 chủ đề / 18 lesson, 4 dạng hoạt động (nói/nghe/đọc/viết) | **CHỮ THẬT — tra tự động ĐƯỢC** (sửa 2026-07-27, cùng lý do dòng trên). Đo: **74.938 dòng / 635 trang, 36.838 dòng có chữ Nhật (49%)**; `会話` 210 lượt, `聴解スクリプト` 58 lượt. Có hội thoại nhiều lượt trình độ A2/B1 thật. |
| `irodori/Irodori.pdf` | Irodori — bản gộp lớn nhất (158MB); ToC xác nhận có Starter (A1) trở lên | **CHƯA XÁC MINH chắc chắn phạm vi đầy đủ** (dung lượng không khớp phép cộng Z_all+ZZ_all — có thể là bản merge khác/edition khác) — **cần owner xác nhận nên dùng bản nào làm chính** để tránh 2 bài khác nhau vô tình đối chiếu 2 bản Irodori khác nhau | **CHỮ THẬT — tra tự động ĐƯỢC** (sửa 2026-07-27, cùng lý do dòng trên). Đo: **49.664 dòng / 515 trang, 22.387 dòng có chữ Nhật (45%)**. Đây là bản chứa phần **入門 (Starter, A1)** — nơi có khối kịch bản chào hỏi 「1.こんにちは」/「2.お先に失礼します」 mà Z_all/ZZ_all không có. Vì vậy **KHÔNG trùng hoàn toàn** với Z_all+ZZ_all như ghi trước đây; **đừng xoá**. |
| `grammar-books/Nihongo_Sou_Matome_N1_Bunpou.pdf` | Nihongo Sou Matome — 文法 (Ngữ pháp) | **JLPT N1** — toàn bộ ngữ pháp N1 | **ẢNH SCAN — CẦN OCR** (không trích được văn bản; ~1079 ảnh nhúng, 0 font) |
| `grammar-books/Nihongo Sou Matome N2 - Bumpou.pdf` | Nihongo Sou Matome — 文法 | **JLPT N2** — toàn bộ ngữ pháp N2 | **ẢNH SCAN — CẦN OCR** (~1050 ảnh nhúng) |
| `grammar-books/Nihongo_Sou_Matome_N3_Bunpou.pdf` | Nihongo Sou Matome — 文法 | **JLPT N3** — toàn bộ ngữ pháp N3 | **ẢNH SCAN — CẦN OCR** (~118 ảnh nhúng) |
| `grammar-books/Nihongo Sou Matome N4- Bumpou.pdf` | Nihongo Sou Matome — 文法 | **JLPT N4** — toàn bộ ngữ pháp N4 | **ẢNH SCAN — CẦN OCR** (~188 ảnh nhúng; font nhúng lỗi khi trích bằng pdftotext) |
| `grammar-books/Nihongo_Sou_Matome_N5.pdf` | Nihongo Sou Matome N5 — tên file **KHÔNG có hậu tố Bunpou** như N1–N4 | **JLPT N5** — **CHƯA XÁC MINH** chỉ ngữ pháp hay gồm cả từ vựng/kanji N5 (cần OCR trước mới biết chắc phạm vi) | **ẢNH SCAN — CẦN OCR** (~131 ảnh nhúng) |
| `grammar-books/N5 Grammar Master (japanvitta.com).pdf` | **JLPTsensei.com** — *"JLPT N5 Grammar Master: 80 Grammar Lessons You Must Know to Pass the JLPT"*, Complete Study Guide, tác giả Cruise Bogedin, © 2020 (tải qua japanvitta.com — tên file chỉ ghi nơi tải, KHÔNG phải tác giả gốc) | **JLPT N5** — đúng **80 điểm ngữ pháp N5**, mỗi điểm có nghĩa + cách dùng + ghi chú ngữ pháp + nhiều câu ví dụ (romaji + dịch nghĩa). Vai trò gợi ý trong hệ 5-vòng §F-b: **giáo trình thương mại phổ biến (kiểu V3)** — chỉ đối chiếu cách trình bày/thứ tự ngữ pháp N5, KHÔNG dùng làm nguồn chính thay Irodori (V1) — owner xác nhận lại khi thật sự build bài dùng tới | **Chữ thật** — trích được đầy đủ mục lục 80 điểm ngữ pháp + nội dung chi tiết (nghĩa, cách chia, ví dụ) |
| `vocab-3000/Collins_Japanese_3000_words_and_phrases.pdf` | Collins — *Japanese 3000 Words and Phrases* (HarperCollins, 2019) | Không theo cấp JLPT — từ vựng/cụm đời sống theo 10 chủ đề: essentials, transport, in the home, at the shops, day-to-day, leisure, sport, health, planet earth, celebrations and festivals | **Chữ thật** |
| `jmdict/jmdict-eng-3.6.2.json` | JMdict/EDICT bản **jmdict-simplified v3.6.2** (dictDate 2026-07-20, gloss eng) — **217.974 mục từ** | Feed **§X3** (loại từ/tự-tha) + một phần **§X1** (tự/tha → suy を/が) — xem chi tiết ở §Tầng X dưới đây. Giấy phép CC BY-SA, phiên bản cụ thể CHƯA XÁC MINH bằng fetch | **Chữ thật** — đúng cấu trúc jmdict-simplified, đã kiểm mục thật |

### Nguồn mở GitHub bổ sung (thêm 2026-07-23): từ vựng JLPT + kanji + ngữ pháp hanabira

Owner tải nguyên **2 repo GitHub** vào `local-sources/ja/` (không tạo thư mục
con loại nguồn riêng — repo tự có cấu trúc): `hanabira.org-main/` (app
Hanabira.org đầy đủ — backend Express/Flask, frontend Next.js, Docker,
nginx, CICD…) và `kanji-data-master/`. **Chỉ 2–3 đường dẫn NỘI DUNG bên
trong `hanabira.org-main/` dùng được cho việc build bài** — phần còn lại là
mã nguồn hạ tầng ứng dụng, không cần catalog. Repo cũng có nội dung tiếng
Hàn/Thái/Trung (`markdown_grammar_korean/`, `grammar_kr_KOREAN_*.json`,
`grammar_th_CU-TFL_*.json`, `grammar_cn_HSK_*.json`) — ngoài phạm vi file
`ja.md` này, không catalog ở đây.

| Nguồn (đường dẫn) | Định dạng | Trường dữ liệu | Phạm vi / cấp độ | Giấy phép | Đọc được? |
|---|---|---|---|---|---|
| `hanabira.org-main/backend/express/json_data/wordsTanos_openai_JLPT_N{1..5}_tanos_vocab_list.json` | JSON | `vocabulary_original` (chữ gốc), `vocabulary_simplified` (kana), `vocabulary_english` (nghĩa), `word_type` (⚠ **rỗng `"nan"` toàn bộ, đã kiểm N1+N5 — KHÔNG dùng được cho loại từ/tự-tha, không feed §X3**), `vocabulary_audio` (đường dẫn — KHÔNG có file audio thật kèm theo), `p_tag` (cấp JLPT), `s_tag` | N1(3476)+N2(1835)+N3(1835)+N4(634)+N5(669) = **8449 từ**, phủ đủ N5–N1 | Gốc **Tanos.co.uk — Creative Commons BY** (ghi rõ trong `README.md` repo, dòng có chữ "Licence: Creative Commons BY") — dùng thương mại được kèm ghi công | **Chữ thật** |
| `hanabira.org-main/frontend-next/content/markdown_grammar_japanese/*.md` (805 file) | Markdown | Mỗi file = 1 điểm ngữ pháp, đủ mục: Introduction · Core Grammar Explanation (nghĩa/cấu trúc/formation diagram) · Comparative Analysis (so mẫu gần giống) · Examples in Context (formal/informal/written/spoken) · Cultural Notes (register/lịch sự/thành ngữ) · Common Mistakes and Tips · Summary + quiz | 805 điểm — README repo ghi rõ mục tiêu "prepare for JLPT N5-N1" → phủ **ĐỦ 5 cấp, vượt xa trần A2/B1 của Irodori** | `README.md`: *"Creative Commons License for in house created hanabira.org content"* — **CHƯA XÁC ĐỊNH biến thể CC cụ thể** (BY / BY-SA / BY-NC?). Đã quét toàn repo tìm "NonCommercial"/"BY-NC" — **không thấy** — nhưng chưa đủ để coi là xác nhận. Nội dung gốc dẫn ở repo riêng `github.com/tristcoil/hanabira.org-japanese-content` (chưa mở — WebFetch bị chặn) | **Chữ thật** — chất lượng RẤT TỐT (ví dụ đủ 4 văn phong, common-mistakes, cultural/register notes — khớp hẳn §B4/§B9/ADR-016) |
| `hanabira.org-main/backend/express/json_data/grammar_ja_JLPT_N{1..5}_0001.json` | JSON | Bản **có cấu trúc** của cùng kho ngữ pháp trên: `title`, `short_explanation`, `long_explanation`, `formation` (công thức), `examples[]` (`jp`/`romaji`/`en`/đường dẫn audio) | N1(245)+N2(191)+N3(132)+N4(124)+N5(136) = **828 điểm**, **có tag cấp độ rõ theo từng file** (tiện hơn .md — tên file .md không tự ghi cấp) | Cùng ghi chú giấy phép như dòng .md ở trên (CHƯA XÁC ĐỊNH biến thể CC cụ thể) | **Chữ thật** |
| `kanji-data-master/kanji.json` (+ `kanji-jouyou.json`, `kanji-kyouiku.json`) | JSON | Mỗi kanji: `strokes`, `grade` (lớp học), `freq` (tần suất), `jlpt_old`/`jlpt_new` (JLPT hệ cũ 4 cấp / hệ mới 5 cấp), `meanings[]`, `readings_on[]`, `readings_kun[]` + dữ liệu WaniKani (`wk_level`, `wk_meanings`, `wk_readings_on/kun`, `wk_radicals`) | `kanji.json` = **13.108 kanji** (khớp KANJIDIC2 đầy đủ); `kanji-jouyou.json` = **2.136** (đúng số Jōyō chính thức); `kanji-kyouiku.json` = **1.006** (đúng số Kyōiku chính thức) — phủ mọi cấp JLPT qua `jlpt_new` | **MIT License** (David Gouveia, 2019) — rõ ràng, dùng thương mại được, không ràng buộc share-alike. Nguồn gốc dữ liệu: KANJIDIC (EDRDG) + JLPT (Tanos.co.uk) + WaniKani API, ghi rõ trong `README.md` repo | **Chữ thật** |

**Đánh giá dùng được cho việc gì:**
- **Từ vựng JLPT (wordsTanos):** dùng được ngay để tra nghĩa/reading/cấp độ
  1 từ khi build vocab card — **KHÔNG** giúp §X3 (loại từ/tự-tha) vì
  `word_type` rỗng toàn bộ.
- **Kanji (kanji-data-master):** dùng được ngay — đủ on/kun, nghĩa, cấp
  JLPT, lớp học, tần suất. Nguồn kanji tốt nhất hiện có trong
  `local-sources/ja/`, giấy phép rõ ràng nhất (MIT). **Lưu ý còn trên đĩa:**
  `kanji-jouyou.json`/`kanji-kyouiku.json`/`kanji-wanikani.json` chỉ là bản
  lọc subset của `kanji.json` (đã kiểm cùng cấu trúc trường) — dùng
  `kanji.json` một mình là đủ (tự lọc lại qua `grade`/`wk_level` khi cần), 3
  file kia dư thừa, có thể xóa — **vẫn CÒN TRÊN ĐĨA**, chưa bị xóa.
- **Ngữ pháp hanabira (.md + .json):** đây là **nguồn ngữ pháp tốt nhất hiện
  có cho phạm vi ngoài A2** — trả lời đúng khoảng trống owner nêu (Irodori
  dừng ở A2/B1, Sou Matome + sách N-level scan chưa đọc được). Dùng được
  NGAY để đọc/đối chiếu mẫu ngữ pháp N5–N1 thật, không cần OCR. **NHƯNG** vai
  trò trong hệ V1–V5 (§F-b) đề xuất tạm là **kiểu V2** (nguồn lớn thứ hai,
  dùng khi Irodori/V1 không phủ — tức mọi thứ trên A2/B1) — đây là ĐỀ XUẤT,
  chưa chốt, và **giấy phép nội dung cụ thể cần owner xác nhận** (mở
  `github.com/tristcoil/hanabira.org-japanese-content` xem có LICENSE file
  riêng ghi rõ biến thể CC) trước khi dùng chính thức cho bài build thương
  mại — theo đúng §G4 "không chắc → không dùng".

**Giới hạn đã biết (báo cáo, không giấu):**
- **`日本語N5文法・読解まるごとマスター.pdf` (ảnh scan N5) đã được owner XÓA
  TAY 2026-07-23** — xác nhận không còn trong `local-sources/ja/grammar-books/`
  bằng quét trực tiếp lại (không đoán). Gỡ khỏi bảng danh mục trên.
- **CÒN LẠI 5/9 file (Nihongo Sou Matome N1–N5) vẫn là ẢNH SCAN — chưa OCR
  được nội dung thật, VẪN CÒN TRÊN ĐĨA** (owner có ý định xóa cùng đợt nhưng
  quét lại xác nhận 5 file này **chưa thực sự bị xóa** — khác với báo cáo ban
  đầu; đã báo lại owner). Cho tới khi OCR hoặc xóa xong, các file này CHỈ xác
  nhận "có tồn tại, đúng cấp JLPT nào" qua tên file — **CHƯA thể mở đối chiếu
  mẫu ngữ pháp cụ thể theo §G8** từ chúng.
- **SỬA LẠI 2026-07-25 — cả 3 file Irodori cũng là ẢNH, không phải "Chữ thật"
  như ghi trước đây.** Đã kiểm object PDF thật (không đoán): `Z_all.pdf`
  1283 ảnh/0 font, `ZZ_all.pdf` 1326 ảnh/0 font, `Irodori.pdf` 4098 ảnh/0
  font. Đánh giá "Chữ thật" ban đầu chỉ dựa trên mẫu lời tựa tiếng Anh đầu
  sách (đúng là chữ thật), CHƯA xác minh phần nội dung bài học tiếng Nhật
  thật (phần đó là ảnh) — không thể `grep`/`pdftotext` để đối chiếu cụm cố
  định/mẫu câu từ Irodori được nữa; chỉ owner tự mở file xem trực quan hoặc
  OCR mới đối chiếu được. §F-b vẫn coi Irodori/JF Standard là V1 chính về
  MẶT NGUỒN (uy tín, miễn phí, đúng đối tượng), nhưng **về mặt kỹ thuật đối
  chiếu tự động, ngữ pháp/cụm cố định sơ cấp hiện dựa vào hanabira** (chữ
  thật, đọc được ngay — xem mục GitHub bổ sung ở trên) và JMdict/Collins,
  không phải Irodori. Ngữ pháp trung/cao cấp (N3–N1, ngoài phạm vi A2/B1 của
  Irodori) cũng dựa vào hanabira, không đổi.
- **`N5 Grammar Master (japanvitta.com).pdf` là CHỮ THẬT, đọc được ngay** —
  80 điểm ngữ pháp N5 đầy đủ (JLPTsensei.com). Đây là nguồn **thương mại**
  (giống vai trò V3 trong §F-b: đối chiếu cách trình bày/thứ tự, KHÔNG thay
  Irodori làm nguồn chính) — chưa gán cứng vào V1–V5 nào, để owner/người
  build bài xác nhận khi thật sự dùng tới.
- **3 file Irodori trùng lặp/chưa rõ ràng ranh giới** (`Irodori.pdf` vs
  `Z_all.pdf` + `ZZ_all.pdf`) — xem cột "Chủ đề · phạm vi" ở trên. Owner nên
  xác nhận giữ bản nào làm nguồn chính cho từng cấp độ (Starter/Elementary
  1/Elementary 2/Pre-Intermediate) để build bài sau này luôn đối chiếu đúng
  MỘT bản nhất quán.
- **3 nguồn GitHub mới (vocab JLPT / kanji / ngữ pháp hanabira) KHÔNG giải
  quyết Tầng X (§X1–§X3 dưới đây).** Vai trò của chúng là **V1/V2 nội dung**
  (§F-b) — vốn từ/mẫu ngữ pháp để BUILD bài — khác với Tầng X là **xác minh
  kết hợp/cấu trúc/loại từ** trước khi DÙNG một từ/mẫu cụ thể. Cụ thể:
  `word_type` trong vocab JLPT rỗng toàn bộ → không feed §X3; grammar
  hanabira có trường `formation` (công thức) nhưng đây là mẫu NGỮ PHÁP câu,
  khác phạm vi hẹp của §X1 (case frame BẮT BUỘC của riêng ĐỘNG TỪ) — có thể
  dùng tham khảo chéo khi liên quan, nhưng không thay Kyoto Case Frame/NINJAL
  LWP/JMdict đã ghi ở Tầng X bên dưới.

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
  - **CẬP NHẬT 2026-07-23 — bản JMdict THẬT đã có cục bộ:**
    `local-sources/ja/jmdict/jmdict-eng-3.6.2.json` (~111.9MB, jmdict-simplified
    v3.6.2, dictDate 2026-07-20, gloss tiếng Anh, **217.974 mục từ** — khớp quy
    mô JMdict-eng đầy đủ). **Chữ thật, đọc được, đúng cấu trúc jmdict-simplified**
    (đã kiểm trực tiếp, không đoán): mỗi mục có `id`, `kanji[].text`,
    `kana[].text`, `sense[].partOfSpeech[]` (vd `v1`=nhóm 1/ichidan,
    `v5k`=godan đuôi く, `vt`=tha động từ, `vi`=tự động từ — **đủ cho §X3 loại
    từ/biến đổi dạng VÀ một phần §X1 tự/tha → suy を/が**), `sense[].gloss[].text`
    (nghĩa). Ví dụ đã kiểm thật (không nhạy cảm): mục `id 1202450`
    (開ける/空ける/明ける, kana あける) có sense `["v1","vt"]` cho nghĩa "to open
    (a door, etc.)" nhưng sense khác cùng mục lại là `["v1","vi"]` cho nghĩa
    "to dawn" (ứng với chữ 明ける) — cho thấy dữ liệu phân biệt tự/tha **theo
    từng nghĩa**, không chỉ theo từ. **Giới hạn còn lại:** JMdict không tự gắn
    cấp JLPT (khác với vocab Tanos đã ghi ở trên) — nếu cần lọc theo cấp phải
    tự đối chiếu chéo với nguồn vocab JLPT khác. File nguyên bản LỚN (112MB,
    217k mục) — build bài chỉ cần tra vài từ mỗi lần, nên **trích subset nhỏ
    (chỉ từ liên quan tới lesson đang build, hoặc build index tra nhanh theo
    kanji/kana) sẽ hợp lý cho tốc độ** — **CHƯA làm** trong lần kiểm này, để
    dành cho lúc thật sự trích/build.

> **Hệ quả cho luật G8/G4 ("không tra được = không dùng"):** **X3 nay ĐÃ CÓ dữ
> liệu thật, đọc được cục bộ** (JMdict, xem cập nhật trên) — chạy được, nhưng
> **giấy phép cụ thể (CC BY-SA đúng phiên bản nào) vẫn CHƯA XÁC MINH bằng fetch**
> (môi trường build này chặn outbound), owner vẫn cần tự mở
> `edrdg.org/edrdg/licence.html` xác nhận trước khi dùng chính thức. **X1
> (Kyoto Case Frame)** và **X2 (NINJAL-LWP)** vẫn chưa có bản cục bộ — vẫn
> **CHƯA XÁC MINH**, owner (hoặc phiên có mạng) cần mở 2 trang gốc còn lại,
> xác nhận đường dẫn + điều khoản, đổi trạng thái sang "ĐÃ XÁC MINH".

> **X2 KHÔNG DÙNG ĐƯỢC → phải bù bằng luật, không bằng tra cứu (owner chốt
> 2026-07-28).** X2 là tầng duy nhất trả lời *"người bản ngữ có thật sự ghép hai
> từ này không"*, mà nó chỉ có công cụ tra **online** (NLB/NLT), **không có bản
> cục bộ** và môi trường build **chặn outbound**. Nên khi viết bài **không có
> cách nào tra collocation**. Chỗ hổng này **KHÔNG bịt được bằng X1/X3**: X1/X3
> chỉ nói loại từ + trợ từ bắt buộc, nên 「薬を飲む」 (đúng) và 「薬を食べる」
> (sai) **qua được cả hai như nhau**. Cơ chế bù là **ranh giới nguồn ở §G11.3** —
> trong mẫu câu chỉ thay bằng từ **cùng nguồn cùng bài** (giáo trình liệt kê =
> giáo trình đã xác nhận ghép được), ngoài mẫu câu thì tự do. Xem mục "RANH GIỚI
> CHỐNG LỖI KẾT HỢP TỪ" bên dưới. Nếu sau này có bản X2 cục bộ dùng được thì
> **rà lại ranh giới đó** — nó là biện pháp thay thế, không phải mục tiêu.

## Danh sách CỤM CỐ ĐỊNH (feed §G1 / §G2)

- **Đường dẫn file danh sách:** *(chưa khởi tạo)*.
- **Trạng thái duyệt:** `CHƯA KHỞI TẠO`. Tới khi có danh sách duyệt: gặp cụm nghi
  là cố định → **xử như LOẠI A + hỏi owner** (§G1). Nguồn để rút cụm cố định:
  V1 (Irodori) — các mẫu chào hỏi/lịch sự dạy nguyên khối.

### Bổ sung 2026-07-27 — KÍNH NGỮ: hai file, owner ĐÃ THAY nội dung

> **Đổi so với bản ghi 2026-07-25:** file lớn TRƯỚC đây là tuyển tập bài web,
> nay owner đã **thay hẳn** bằng văn bản chính thức. Đã kiểm bằng cách quét dấu
> vết cũ: 0 lượt cho mọi tiêu đề của bản tuyển tập. Vì vậy **hạng nguồn của nó
> nâng từ tầng đối chiếu lên NGUỒN CHÍNH** — xem dưới.

| File | Dạng | Nội dung | Hạng |
|---|---|---|---|
| `local-sources/ja/New Tài liệu văn bản.txt` | text thuần UTF-8 · 248,6 KB · 3 575 dòng · 92 862 ký tự · 65% ký tự Nhật · **chữ thật, đọc được 100%** | **敬語の指針** — *Phương châm Kính ngữ*, 文化審議会答申 (Hội đồng Thẩm định Văn hoá), 平成19年2月2日. Toàn văn có mục lục. Trình bày phân loại **5 LOẠI CHÍNH THỨC**: 尊敬語 (104) · 謙譲語Ⅰ (107) · 謙譲語Ⅱ／丁重語 (64／13) · 丁寧語 (27) · 美化語 (22). Phủ dày vai vế và tình huống: 相手 156 · 先生 168 · 立てる 91 · 場面 50 · 上司 23 · 部下 9 · 取引先 5. | **NGUỒN CHÍNH cho kính ngữ / mức lịch sự / vai vế** |
| `local-sources/ja/New Tài liệu văn bản (2).txt` | text thuần UTF-8 · 3,2 KB · 108 dòng · 1 293 ký tự · 64% ký tự Nhật · **chữ thật, bảng phân tách bằng TAB** | **Bảng chuyển kính ngữ 3 cột**: 基本 → 尊敬語 → 謙譲語・丁重語, khoảng **24 động từ gốc** (会う · 集まる · 言う · 来る · 売る · 教える · 思う · 買う · 帰る · 借りる · 聞く · 決める …), mỗi ô liệt kê nhiều biến thể. | **Tra cứu nhanh**, đi kèm file trên |

**Vì sao xếp NGUỒN CHÍNH, khác với lần trước:**

- Đây là **văn bản chính thức của cơ quan nhà nước Nhật** (答申 của 文化審議会),
  không phải bài viết trên mạng — có xuất xứ, có ngày ban hành, có thẩm quyền.
- Nó phủ đúng **tầng đang mỏng nhất** của dự án: kính ngữ, mức độ lịch sự, và
  quan hệ vai vế. Đây là tầng mà G1–G9 không kiểm được và đã để lọt 5 lần
  (こんばんは trong công sở · gọi thầy bằng さん · 失礼します giữa bạn bè · kính
  ngữ khách sạn · こんばんは lúc chia tay).
- Vẫn giữ luật chung: **KHÔNG chép nguyên văn** vào lesson. Dùng để tra và kiểm
  chéo; báo cáo phải ghi rõ đã mở mục nào.

**Một điểm phải nói rõ — 5 loại của văn bản KHÁC 3 mức của §B2e:**

Văn bản phân theo **hệ kính ngữ** (tôn kính / khiêm nhường / lịch sự / mĩ hoá) —
tức *loại* kính ngữ mà một từ thuộc về. §B2e phân theo **mức trang trọng** cho
người học (trang trọng · lịch sự · thân mật). Hai trục **không mâu thuẫn nhưng
cũng không trùng**: văn bản này KHÔNG phải bằng chứng cho cách chia 3 mức —
3 mức là lựa chọn sản phẩm của owner. Dùng file để tra một từ thuộc hệ nào và
dùng với ai, ĐỪNG dùng nó để biện minh cho việc gán mức 1/2/3.

**Trùng lặp:** hai file KHÔNG trùng nhau — file lớn là văn bản luận giải, file
nhỏ là bảng tra động từ. Giữ cả hai.

**Ghi chú kỹ thuật (owner tự làm, agent không đụng `local-sources/`):** cả hai
vẫn mang tên mặc định của Windows. Đề xuất đổi thành
`keigo-shishin-2007.txt` và `keigo-conversion-table.txt`, và chuyển vào
`local-sources/ja/keigo/` cho khớp quy ước `<loại-nguồn>/`.

## QUYẾT ĐỊNH OWNER về cách dùng cụm (không suy ra từ nguồn)

> Mục này ghi các quyết định **owner tự chốt** khi nguồn không phân xử được. Đây
> **KHÔNG phải** kết luận rút từ V1–V5 hay Tầng X — ghi riêng để lần sau không
> ai đi tìm nguồn cho chúng, và để biết cái gì cần người bản ngữ soi lại.

### 「お元気で」 — mốc chia tay TỪ MỘT TUẦN TRỞ LÊN (owner chốt 2026-07-25)

| Mốc gặp lại | 「お元気で」 |
|---|---|
| `また来週` / lâu hơn / không hẹn ngày | **ĐÚNG** |
| `また明日` / trong vài ngày | **SAI** — mốc quá gần |

**Vì sao phải chốt:** mô tả cũ trong bài là "khi lâu mới gặp lại" — mập mờ, và
nó làm dữ liệu L3 tự đá nhau (thẻ từ vựng nói "lâu mới gặp lại", nhưng hội thoại
đã duyệt của chính L3 lại ghép với `また明日`). Nguồn local **không phân xử
được**: hanabira/n5 gần như chỉ có `お元気ですか` (câu HỎI "có khoẻ không"), chỉ
một chỗ có `それじゃ、お元気で。` (lời chia tay) — không đủ để suy ra mốc.

**Đã áp dụng:** thẻ `ogenki-de` của L3 đổi sang "khi chia tay từ một tuần trở
lên"; cụm này được dùng làm trục đúng/sai trong bài tổng hợp cuối Unit theo đúng
bảng trên.

**Còn nợ:** hai lượt thoại trong L3 vẫn ghép `お元気で` với `また明日` — vị trí
chính xác + hai hướng sửa ghi ở `docs/ai/ACTIVE_TASK.md` (mục nợ nội dung).
Chưa sửa, chờ owner quyết.

**Cần soi lại khi có người bản ngữ:** mốc "một tuần" là ranh giới owner đặt cho
nhất quán nội bộ, không phải con số rút từ tài liệu ngôn ngữ.

## PHẦN CỐT LÕI KHÔNG ĐƯỢC THAY khi thay thế theo mẫu (feed §G3)

- Với mẫu ngữ pháp (LOẠI B) tiếng Nhật: **trợ từ + đuôi động từ/tính từ + trật tự
  đầu-cuối câu là CỐT LÕI, không đụng**; chỉ thay **danh từ/động từ nội dung** ở ô
  trống bằng từ ĐÃ DẠY. Quy tắc chia/biến đổi dạng: theo `rules/languages/ja/`
  (FROZEN) — file nguồn này không định nghĩa lại.

## BẢNG TẦNG VIỆC → NGUỒN của tiếng Nhật (feed §G11 — owner chốt 2026-07-28)

**Vì sao có bảng này:** bài `u2-l1` dồn gần **100%** nội dung vào Irodori và bỏ
không hanabira (805 file ngữ pháp), Collins 3000 từ, JMdict, 8 file N5, 3 file
Minna. Owner yêu cầu dùng **hết** nguồn đang có. Cách chia là **theo tầng việc** —
mỗi nguồn dùng cho đúng việc nó mạnh nhất — **KHÔNG chia theo phần trăm** (§G11.1).

| Tầng việc | Nguồn dùng | Ghi chú |
|---|---|---|
| **Hội thoại nguyên đoạn** | **Irodori** | **NGUỒN DUY NHẤT** có đoạn nhiều lượt → §G10 (lấy nguyên đoạn) chỉ có một kênh, không có nguồn thay thế |
| **Ngữ pháp** | **hanabira** + **`n5_tong-hop-ngu-phap-60-mau`** | **≥2 nguồn → ĐỐI CHIẾU BẮT BUỘC** (§G11.2) |
| **Nghĩa / cách đọc / loại từ** | **JMdict** + **`n5_tong-hop-tu-vung-1021`** | **≥2 nguồn → ĐỐI CHIẾU BẮT BUỘC**. JMdict cũng là nguồn §X3/§X1 (xem Tầng X) |
| **Từ vựng bổ sung** | **Collins 3000** + **n5** | **CHỈ dùng ở chỗ KHÔNG ghép vào mẫu câu** — thẻ từ vựng riêng, tham khảo, ví dụ rời. **CẤM ghép vào mẫu của Irodori** (§G11.3) |
| **Kanji** | **kanji-data** (`kanji.json`) + **`n5_kanji-master`** | **≥2 nguồn → ĐỐI CHIẾU BẮT BUỘC** |
| **Mức lịch sự / vai vế** | **敬語の指針** + **bảng chuyển kính ngữ** | Hai file đã ghi ở mục "Bổ sung 2026-07-27 — KÍNH NGỮ" bên trên |
| **Bài tập (chất liệu)** | **3 file Minna** | **NGUỒN DUY NHẤT** có bài tập thật → không có nguồn thay thế |

**Đối chiếu đã bắt được lỗi thật:** chữ 何 đọc **なに** hay **なん** tuỳ ngữ cảnh —
lỗi này lộ ra đúng vì mở **hai** nguồn thay vì một. Đây là bằng chứng nền của
§G11.2, không phải ví dụ giả định.

**Đường dẫn / trạng thái đọc được của từng file:** xem mục **"Danh mục FILE NGUỒN
CỤC BỘ"** bên trên. Nguồn nào ghi **ẢNH SCAN — CẦN OCR** thì **CHƯA dùng được**
cho tầng của nó; gặp ca đó → §G9 (dừng, hỏi owner), không thay bằng trí nhớ.

> **CHƯA VÀO DANH MỤC:** các file owner nêu tên trong bảng này mà mục "Danh mục
> FILE NGUỒN CỤC BỘ" chưa có dòng riêng — `n5_tong-hop-ngu-phap-60-mau`,
> `n5_tong-hop-tu-vung-1021`, `n5_kanji-master`, `160-kanji`, **3 file Minna** —
> cần **đo + ghi danh mục ở phiên LOCAL** (cloud không mở được `local-sources/`).
> Trước khi một bài dùng tới file nào trong nhóm này, **phải mở file thật + ghi
> dòng danh mục cho nó** (§G8 đòi ghi rõ đã mở nguồn nào, mục nào).

### RANH GIỚI CHỐNG LỖI KẾT HỢP TỪ — ví dụ tiếng Nhật (feed §G11.3)

**Tiếng Nhật KHÔNG có nguồn collocation dùng được trong dự án** (đã tra: không có
bản mở). Hệ quả cụ thể — máy **không** phân biệt được hai câu này:

| Câu | Thực tế | Máy thấy gì |
|---|---|---|
| 「薬を飲む」 | **ĐÚNG** — cách nói thật của người Nhật | đúng ngữ pháp |
| 「薬を食べる」 | **SAI** — người Nhật không nói thế | **cũng** đúng ngữ pháp |

JMdict cho biết 飲む/食べる đều là **tha động từ** đi với `を` (feed §X1/§X3) →
**cả hai câu đều qua được tầng X**. Từ điển **không** nói cái nào tự nhiên. Vì vậy
phải chặn bằng **ranh giới nguồn**, không phải bằng tra cứu.

**TRONG MẪU CÂU — chỉ từ CÙNG NGUỒN CÙNG BÀI:**

| Mẫu lấy từ | Được thay bằng | Lý do được |
|---|---|---|
| Mẫu 「〜から来ました」 của Irodori bài đó | Tên quốc gia **mà chính bài Irodori đó liệt kê** (vd danh sách nước trong phần ことば của bài) | Giáo trình đã **xác nhận** những từ đó ghép được vào mẫu này |

**CẤM** lấy một tên nước từ Collins 3000 / n5 rồi ghép vào mẫu của Irodori — kể cả
khi trông hiển nhiên đúng: **không nguồn nào trong hai** xác nhận đúng **tổ hợp**
đó. Cấu trúc thì vẫn giữ y nguyên như cũ (trợ từ `から`, thể `〜ました`, trật tự
đầu-cuối câu — mục "PHẦN CỐT LÕI KHÔNG ĐƯỢC THAY" bên trên).

**KHÔNG được thay dù cùng nguồn** — từ đó bắt buộc cho nghĩa của câu:

| Câu nguồn | Vì sao giữ nguyên văn |
|---|---|
| 「医者が診察しています」 | Chính **医者** làm nên hành động 診察; thay nghề khác là câu hỏng nghĩa |

**NGOÀI MẪU CÂU — dùng thoải mái Collins 3000 / n5 / JMdict / kanji-data:** thẻ từ
vựng riêng, mục tham khảo (§B2b), ví dụ rời, ngữ pháp đối chiếu, nghĩa / cách đọc,
kanji, mức lịch sự. **Mỗi ví dụ lấy NGUYÊN từ MỘT nguồn** — không ghép hai nguồn
trong cùng một câu.

Báo cáo phải khai: đoạn nào **nguyên văn**, đoạn nào **đã thay từ** (thay chữ gì,
lấy từ **cùng bài của nguồn nào**).

### BÀI TẬP — LẤY TỪ MINNA, ĐỔI VỎ (feed §G12)

Nguồn cấp: **3 file Minna** (tầng "Bài tập" trong bảng trên — **nguồn DUY NHẤT** có
bài tập thật). Giữ nguyên **điểm kiểm**, chỉ đổi **cách trả lời**:

| Bài trong nguồn | Điểm kiểm (GIỮ NGUYÊN) | Đổi vỏ sang dạng NovaLang |
|---|---|---|
| Điền chỗ trống 「わたし＿田中です。」 → đáp án `は` | chọn đúng trợ từ chủ đề `は` | `multiple_choice` (4 phương án trợ từ) · `slot_ordering` (sắp mảnh) · `matching` |

Không đổi câu, không đổi đáp án, không đổi điểm ngữ pháp đang kiểm — **chỉ đổi
cách người học trả lời**. Nguồn không có bài phù hợp → mới tự soạn và **ghi rõ
"tự soạn"** trong báo cáo (§G12).

### PHƯƠNG ÁN NHIỄU của tiếng Nhật (feed §G13)

**BA CA ĐÃ DÍNH THẬT** — nhiễu tưởng sai, hoá ra **cũng đúng** → câu có 2 đáp án
đúng. Ghi lại để **cấm dùng lại làm lý do sai**:

| Nhiễu đã dùng | Vì sao nó **ĐÚNG**, không sai |
|---|---|
| 「お名前お願いします」 | Lược trợ từ trước `お願いします` là **chuẩn đời thường** (`コーヒーお願いします`) — không sai ngữ pháp |
| 「お名前は？」 sau khi đã tự giới thiệu | Hỏi lại tên đối phương sau khi tự giới thiệu là **tự nhiên** |
| 「伊藤さんですか」 | Là câu hỏi xác nhận **hợp lệ** trong nhiều bối cảnh |

**ĐƯỢC DÙNG — loại cơ học (sai chắc chắn, không thể vô tình đúng):**

| Loại | Ví dụ dạng sai |
|---|---|
| Sai trợ từ | は ↔ が ↔ を ↔ も ↔ の |
| Sai thể / mức lịch sự | lịch sự ↔ thường (`です` ↔ `だ`) |
| Sai chia động từ | dạng chia không tồn tại / lệch thời |
| Thiếu hoặc thừa `さん` | 「伊藤ですね」 (thiếu) · gắn `さん` vào chính mình (thừa) |
| Thêm `お` cho cái của mình | 「私のお名前」 |
| Lặp trợ từ | 「お名前はは？」 |

**HẠN CHẾ — nhiễu là CẢ CỤM / CẢ CÂU:** phải kiểm nó có vô tình đúng trong đúng
bối cảnh đó không (đúng ba ca trên là ví dụ thất bại). **Không chắc → đổi sang
nhiễu cơ học** (§G13).

Các dạng méo cố ý ở bảng trên **được miễn** luật "cụm không được LUÔN SAI" của
§B16 — chúng tồn tại *chỉ để* làm phương án sai.

### MỐC ÁP DỤNG của tiếng Nhật (feed §G11.5)

- **Áp từ `u2-l2` trở đi.**
- **`u2-l1` đã chốt 100% nguyên văn Irodori → GIỮ NGUYÊN, KHÔNG viết lại.** Nguyên
  văn từ một nguồn uy tín không phải lỗi; chỉ là chưa khai thác hết nguồn.
- Các bài trước `u2-l1` (Golden L1, L2, L3) cũng **không** thuộc phạm vi viết lại
  của luật này.

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
