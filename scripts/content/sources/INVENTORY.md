# KHẢO SÁT KHO NGUỒN ja — chỉ đọc, không sửa gì

> Khảo sát 2026-07-28. Nhánh `claude/build-language-jp-o91o6h`, commit `bc735bf`,
> worktree sạch (0 file chưa commit). **KHÔNG commit file này.**
>
> Luật của bản khảo sát: mọi kết luận kèm **mẫu nguyên văn + đường dẫn + số dòng**.
> Không chắc thì ghi `KHÔNG CHẮC`. Nguồn cho 0 kết quả thì ghi **0**.

---

## 1. KHO CÓ GÌ

| Nguồn | Đường dẫn | Định dạng | Số file | Dung lượng |
|---|---|---|---|---|
| Irodori — bản Markdown | `irodori/markdown/` | md (text) | 4 | 9,7 MB |
| Irodori — bản PDF | `irodori/*.pdf` | **PDF** (chữ thật) | 3 | 386 MB |
| hanabira — ngữ pháp Markdown | `hanabira.org-main/frontend-next/content/markdown_grammar_japanese/` | md (text) | 805 | ~30 MB |
| hanabira — dữ liệu JSON | `hanabira.org-main/backend/express/json_data/` | json | ~20 | ~18 MB |
| Nihongo Sou Matome N1–N5 | `grammar-books/Nihongo*.pdf` | **PDF ẢNH SCAN** | 5 | 177 MB |
| N5 Grammar Master | `grammar-books/N5 Grammar Master (japanvitta.com).pdf` | **PDF** (chữ thật) | 1 | 1,9 MB |
| Collins 3000 words | `vocab-3000/Collins_Japanese_3000_words_and_phrases.pdf` | **PDF** (chữ thật) | 1 | 14,6 MB |
| JMdict | `jmdict/jmdict-eng-3.6.2.json` | json | 1 | 112 MB |
| kanji-data | `kanji-data-master/kanji*.json` | json | 4 | 7,5 MB |
| open-anki JLPT decks | `open-anki-jlpt-decks-main/src/*.csv` | csv | 5 | 0,6 MB |
| Tài liệu N1–N5 rời | `n1/ n2/ n3/ n4/ n5/` | md (text) | 19 | 1,8 MB |
| 敬語の指針 + bảng kính ngữ | `New Tài liệu văn bản*.txt` | txt | 2 | 252 KB |

**KHÔNG phải text đọc thẳng:**
- **5 file Nihongo Sou Matome** — kiểm lại bằng `pdftotext -l 60`: **0 dòng chữ
  Nhật**. Đúng là ảnh scan. (Đã kiểm bằng phương pháp đúng, không suy từ đếm
  object ảnh — đó là lỗi từng làm khoá nhầm Irodori.)
- 3 PDF Irodori: **chữ thật**, nhưng bản `.md` tiện hơn (đã là text, có mốc
  trang). PDF chỉ hơn ở chỗ còn hình minh hoạ.
- N5 Grammar Master + Collins: **chữ thật**, đọc được bằng `pdftotext`.

---

## 2. TỪNG NGUỒN CHỨA GÌ

### 2.1 Irodori Markdown — `irodori/markdown/` (4 file)

| | |
|---|---|
| **a. Loại** | Giáo trình đủ bộ: hội thoại · bài tập · từ vựng · ghi chú ngữ pháp · giải thích văn hoá |
| **b. Tổ chức theo** | **Số bài (課) → can-do → mã băng** (`01-06`), kèm mốc `## Trang PDF <n>` từng trang |
| **c. Nhãn cấp** | CÓ, theo tên file + nhãn trang trong ruột: `入門` A1 (572 tr) · `初級1` A2a (464 tr) · `初級2` A2b (559 tr) · `初中級` A2/B1 (635 tr) |
| **d. Câu hoàn chỉnh** | **4.966 lượt hội thoại** có nhãn người nói (đo cả 4 tập) |
| **e. Cấu trúc** | **Nửa đều**: lượt thoại theo khuôn `Ａ：…`/`名前：…` parse được; phần còn lại là bố cục PDF bị ép phẳng |
| **f. Trùng/dẫn xuất** | `markdown/So_trung_cap` ≡ `ZZ_all.pdf`; `So_cap_2` ≡ `Z_all.pdf`; `Nhap_mon` ≡ phần 入門 của `Irodori.pdf`. **`So_cap_1` KHÔNG có bản PDF** — nguồn duy nhất cho 初級1 |

**Mẫu nguyên văn** — `IRODORI_So_cap_1_A2.md` dòng 4980:
```
Ａ：日本に来て、どのぐらいになりますか？
Ｂ：1 年になります。
Ａ：そうですか。日本の生活に、もう慣れましたか？
Ｂ：はい。
```

### 2.2 hanabira — ngữ pháp

| | |
|---|---|
| **a. Loại** | Giải thích ngữ pháp + ví dụ câu |
| **b. Tổ chức theo** | **Điểm ngữ pháp** (1 file .md hoặc 1 mục JSON / điểm) |
| **c. Nhãn cấp** | JSON **CÓ** (`p_tag: JLPT_N5`, 136 mục N5); markdown **KHÔNG** (grep `JLPT N5` chỉ 1 lượt/805 file) |
| **d. Câu hoàn chỉnh** | **3.310 câu ví dụ** trong JSON (đếm thật, gộp N1–N5) |
| **e. Cấu trúc** | JSON **rất đều**: `title · short_explanation · long_explanation · formation · examples[{jp,romaji,en}]`. Markdown là văn xuôi có đề mục |
| **f. Trùng/dẫn xuất** | **812/828 (98%)** title JSON có file .md trùng tên → **cùng gốc, hai định dạng**. Đối chiếu chéo giữa hai cái là vô nghĩa |

**Mẫu nguyên văn** — `grammar_ja_JLPT_N5_0001.json`, mục 1:
```json
"title": "A が いちばん～ (A ga ichiban～)",
"formation": "Noun + が + いちばん + Adjective/Verb",
"examples": [{ "jp": "この中で、寿司が一番好きです。",
               "romaji": "Kono naka de, sushi ga ichiban suki desu.",
               "en": "Of all these, I like sushi the most." }]
```

### 2.3 hanabira — từ vựng Tanos

- **a.** Danh sách từ · **b.** theo TỪ · **c.** `p_tag JLPT_N1..N5`, **8.449 từ**
- **d.** 0 câu (chỉ từ đơn) · **e.** đều · **f.** xem 2.4

### 2.4 open-anki JLPT decks — `open-anki-jlpt-decks-main/src/*.csv`

- **a.** Danh sách từ · **b.** theo TỪ · **c.** cột `tags` = `JLPT_N5`… ·
  **d.** 0 câu · **e.** CSV đều: `expression,reading,meaning,tags,guid`
- **f. TRÙNG NẶNG với 2.3:** N5 — open-anki 718 từ, hanabira Tanos 669 từ,
  **619 từ chung (93% của bên nhỏ)**. Thứ tự khác nhau nhưng cùng gốc Tanos.co.uk.
  → **Hai nguồn này KHÔNG độc lập, không dùng để đối chiếu chéo.**

**Mẫu** — `src/n5.csv` dòng 2–3:
```
ああ,ああ,"Ah!, Oh!",JLPT JLPT_4 JLPT_5 JLPT_N5,HI-.Ij?HS~
会う,あう,"to meet, to see",JLPT JLPT_3 JLPT_5 JLPT_N5,kupB!kWE}<
```

### 2.5 Tài liệu N1–N5 rời — `n1/`…`n5/` (19 file .md)

**Đo mức hỏng OCR** (dòng có chữ Nhật mà lẫn cụm LATIN HOA ≥3 ký tự):

| File | dòng | %JP | nhiễu | Đánh giá |
|---|---|---|---|---|
| `n5/n5_bai-tap-tieng-Nhat-so-cap-1.md` | 2709 | 56% | **23%** | **HỎNG NẶNG** |
| `n5/n5_minna-no-nihongo-I-shokyuu-topikku-25.md` | 2970 | 62% | **22%** | **HỎNG NẶNG** |
| `n5/n5_kanji-master.md` | 3928 | 67% | **18%** | **HỎNG NẶNG** |
| `n5/n5_tong-hop-tu-vung-1021.md` | 951 | 31% | **17%** | **HỎNG NẶNG** |
| `n5/n5_minna-no-nihongo-I-sach-dich-tieng-Viet.md` | 6976 | 43% | 9% | hỏng một phần |
| `n5/n5_160-kanji-n5-n4.md` · `n5_basic-kanji-120.md` · `n5_tong-hop-ngu-phap-60-mau.md` | | | 0–1% | sạch |
| `n4/*` (3 file) · `n3/*` (4) · `n2/*` (3) · `n1/*` (1) | | | **0%** | **sạch** |

**Mẫu HỎNG** — `n5/n5_minna-no-nihongo-I-shokyuu-topikku-25.md` giữa file:
```
QRM 捨てました。
ORR いつも CE 買わなければ ならない。
```
**Mẫu SẠCH** — `n4/n4_grammar-full.md` dòng 3–6:
```
1. ~んです
Cấu trúc: [Thể thường (普通形)] + んです。(「~だ」→ なんです)
Ví dụ:
いく (đi) → いくんです、あった (đã gặp) → あったんです
```

- **c.** Nhãn cấp có ở đầu file (`# Cấp độ: N5`) — **metadata sạch dù ruột hỏng**.
  Đây đúng cái bẫy: tin tên file/tiêu đề là tin nhầm.
- **f.** `n4_vocab-list.md` và `n4/n3/n2 vocab-list` **KHÔNG CHẮC** có trùng
  Tanos không — chưa đo.

### 2.6 JMdict — `jmdict/jmdict-eng-3.6.2.json`

- **a.** Từ điển · **b.** theo TỪ (`id`) · **c.** **KHÔNG có nhãn JLPT**
- **d.** 0 câu ví dụ (chỉ `gloss`) · **e.** rất đều · **f.** độc lập
- Bản 3.6.2, `dictDate 2026-07-20`

**Mẫu**: `{"id":"1000000","kanji":[],"kana":[{"text":"ヽ"}],"sense":[{"gloss":[{"lang":"eng","text":"repetition mark in katakana"}]}]}`

### 2.7 kanji-data — `kanji-data-master/kanji.json`

- **a.** Dữ liệu kanji · **b.** theo KANJI · **c.** **CÓ** `jlpt_new` + `grade`
- **13.108 kanji** · **d.** 0 câu · **e.** rất đều · **f.** độc lập

**Mẫu**: `"日": {"strokes":4,"grade":1,"jlpt_new":5,"meanings":["Day","Sun",…],"readings_on":["にち","じつ"],"readings_kun":["ひ","-び","-か"]}`

### 2.8 Collins 3000 words — `vocab-3000/*.pdf`

- **a.** Từ + CỤM CÂU theo chủ đề · **b.** theo chủ đề · **c.** **KHÔNG có nhãn JLPT**
- **d.** CÓ câu: đếm được **1.136 bộ ba EN→JA→romaji chỉ trong 60 trang mẫu**
- **e.** đều theo bộ ba · **f.** độc lập

**Mẫu** (60 trang đầu, dòng ~200):
```
I’m from...
私は…から来まし た。
watashi wa … kara kimashita.
```
⚠ Chú ý mẫu trên: **`来まし た` có dấu cách lạ giữa từ** — lỗi bóc PDF.

### 2.9 N5 Grammar Master — `grammar-books/N5 Grammar Master*.pdf`

- **a.** Giải thích ngữ pháp · **b.** theo điểm ngữ pháp (80 điểm) · **c.** N5
- **d.** CÓ ví dụ · **e.** khá đều · **f.** **KHÔNG CHẮC** có trùng hanabira N5
  không — chưa đo

### 2.10 敬語の指針 — `New Tài liệu văn bản.txt`

- **a.** Văn bản chính thức về kính ngữ (文化審議会答申 平成19年)
- **b.** theo loại kính ngữ · **c.** KHÔNG có nhãn JLPT · **d.** có ví dụ rời rạc
- **e.** văn xuôi tự do · **f.** độc lập

---

## 3. TRƯỜNG BẮT BUỘC — NGUỒN CÓ SẴN BAO NHIÊU

Đo trên toàn bộ câu/mục của từng nguồn:

| Nguồn | Số câu | furigana trong câu | kana đọc riêng | romaji | bản dịch | nhãn người nói |
|---|---|---|---|---|---|---|
| Irodori markdown (hội thoại) | 4.966 | **0%** *(xem ghi chú)* | 0% | **0%** | **0%** *(xem ghi chú)* | **100%** |
| hanabira grammar JSON | 3.310 | **0%** | 0% | **100%** | **100% (en)** | 0% |
| open-anki CSV | 3.526 từ | 0% | **100%** | 0% | **100% (en)** | 0% |
| hanabira Tanos vocab | 8.449 từ | 0% | **100%** | 0% | **99% (en)** | 0% |
| Collins | ~1.136/60tr | 0% | 0% | **100%** | **100% (en)** | 0% |
| kanji.json | 13.108 kanji | — | **100%** (on/kun) | 0% | **100% (en)** | — |

**GHI CHÚ QUAN TRỌNG — Irodori có furigana và bản dịch, nhưng KHÔNG GHÉP ĐƯỢC:**

- **Furigana**: nằm ở **dòng NGAY TRÊN** lời thoại (ruby của PDF bị ép phẳng).
  Đo 初級1: **629/714 = 88%** lượt có kanji có dòng kana ngay trên.
  Mẫu — `IRODORI_So_cap_1_A2.md` dòng 1664–1665:
  ```
  いま        に ほ ん ご         かよ
  Ｂ：いいえ、学生です。今は、日本語学校に通っています。
  ```
  **Nhưng KHÔNG khớp từng chữ được**: kana không thẳng cột với kanji, và ở
  trang nhiều cột thì một dòng furigana phục vụ 3 lời thoại cùng lúc —
  `IRODORI_So_cap_1_A2.md` dòng 4437–4438:
  ```
  ひさ                    ひさ                 ひさ
  Ａ：あ、お久しぶりです。   Ａ：あ、久しぶり。    Ａ：あ、久しぶり。
  ```
  → **Kết luận: furigana CÓ TỒN TẠI nhưng phải tự sinh lại bằng kuromoji, không
  lấy được từ nguồn.** (Đúng cách dự án đang làm.)
- **Bản dịch tiếng Việt**: có 13.151 dòng tiếng Việt trong 初級1, nhưng chỉ
  **19%** lượt hội thoại có dòng tiếng Việt trong phạm vi 3 dòng sau →
  **phần lớn dịch là dịch phần HƯỚNG DẪN, không phải dịch lời thoại.**

**Không nguồn nào có `speechText`** — mọi nguồn đều thiếu; phải tự sinh.

---

## 4. ÁNH XẠ Ô ↔ NGUỒN

| Ô trong schema | Nguồn cấp được | Mẫu thật |
|---|---|---|
| **`dialogueGroups`** (2–8 lượt, có nhãn người nói) | **CHỈ Irodori markdown.** 4.966 lượt, 100% có nhãn người nói | `So_cap_1` dòng 4980, xem §2.1 |
| **`grammarPatterns`** (mẫu + giải thích + ≥2 ví dụ) | **hanabira grammar JSON** (đủ 3 phần, 3.310 ví dụ) · Irodori 文法ノート · `n4_grammar-full.md` (sạch, tiếng Việt) · N5 Grammar Master | `grammar_ja_JLPT_N5_0001.json`, xem §2.2 |
| **`vocabularyDetails[].examples`** (1 câu/từ) | **KHÔNG nguồn nào ánh xạ từ→câu sẵn.** open-anki/Tanos/JMdict chỉ có TỪ. Phải tự tìm câu chứa từ đó trong Irodori/hanabira | — |
| **`vocabularyReferences`** (từ + reading + nghĩa + **mức lịch sự** + ví dụ) | **KHÔNG có nguồn cho "mức lịch sự".** 敬語の指針 phân theo 5 hệ kính ngữ — **khác trục** với 3 mức của §B2e. Từ+reading+nghĩa thì có sẵn (Tanos/anki) | — |
| **`intro.examples`** (câu minh hoạ tình huống) | **Irodori** (câu trong ngữ cảnh bài) · **Collins** (cụm câu theo chủ đề, có romaji + en) | Collins: `私は…から来まし た。` |
| **`practice` Q1–Q13** | **KHÔNG nguồn nào cấp bài tập theo khuôn NovaLang.** Irodori có bài tập nhưng khác định dạng hoàn toàn. Chất liệu (từ/câu/mẫu) thì có; **cấu trúc bài tập phải tự dựng** | — |
| **`Q14` (≥4 lượt)** | **CHỈ Irodori markdown** | như `dialogueGroups` |

### Ô KHÔNG nguồn nào lấp được — phần quan trọng nhất

1. **`speechText`** — 0/6 nguồn có. Phải tự sinh (kana hoá).
2. **furigana gắn liền câu** — 0/6 nguồn dùng được (Irodori có nhưng không ghép
   được, xem §3). Phải tự sinh bằng kuromoji.
3. **Bản dịch tiếng Việt cho từng câu** — Irodori dịch phần hướng dẫn chứ không
   dịch lời thoại (19%). hanabira/anki/Collins chỉ có **tiếng Anh**.
   → **Mọi bản dịch vi phải tự viết.**
4. **`register` — mức lịch sự 3 bậc (§B2e)** — không nguồn nào gán. 敬語の指針
   phân theo **hệ kính ngữ** (尊敬語/謙譲語/丁寧語/美化語), là trục khác.
5. **Bài tập theo khuôn NovaLang** (matching · checkpoint · chat_text_fill ·
   slot_ordering) — không nguồn nào có.
6. **Ánh xạ từ vựng → câu ví dụ** — phải tự tra ngược.

---

## 5. THỬ THẬT VỚI u2-l2 — "được hỏi thăm rồi kể tình hình dạo này"

Đếm từ khoá chủ đề trên các nguồn text:

| Nguồn | 近況 | どうですか | いかがですか | 最近 | 慣れました | どのぐらい | 忙しい | 元気です |
|---|---|---|---|---|---|---|---|---|
| Irodori 入門 A1 | 4 | 14 | 0 | 19 | 1 | 19 | 3 | 1 |
| **Irodori 初級1 A2a** | 7 | **66** | 0 | 24 | **11** | **40** | 14 | **19** |
| Irodori 初級2 A2b | 15 | 17 | 6 | 62 | 12 | 27 | 6 | 1 |
| Irodori 初中級 B1 | 8 | 59 | 0 | 67 | 10 | 12 | 7 | 0 |
| `n4_grammar-full.md` | 0 | 4 | 0 | 2 | 0 | 0 | 1 | 0 |
| `n5_tong-hop-ngu-phap-60-mau.md` | 0 | 0 | 1 | 0 | 0 | 0 | 1 | 1 |
| hanabira grammar JSON | **0** | 35 | 34 | 14 | **0** | **0** | 60 | **0** |

**Lọc thành LƯỢT HỘI THOẠI thật (không phải chỉ chứa từ khoá):**
- Irodori 初級1: **21 lượt** hội thoại chứa từ khoá chủ đề.
- hanabira / n4 / n5 / Collins / anki / JMdict / kanji: **0 lượt hội thoại** —
  các nguồn này **không có định dạng hội thoại có nhãn người nói**.

**Phát hiện quyết định:** Irodori 初級1 第1課 có hẳn **can-do 02
「日本に来てどのぐらいですか？」** = ĐÚNG chủ đề u2-l2, với **7 kịch bản**
nguyên văn, mỗi kịch bản 4 lượt.

3 kịch bản đầu — `irodori/markdown/IRODORI_So_cap_1_A2.md`:

```
[01-06] dòng 4980
Ａ：日本に来て、どのぐらいになりますか？
Ｂ：1 年になります。
Ａ：そうですか。日本の生活に、もう慣れましたか？
Ｂ：はい。

[01-07] dòng 4990
Ａ：日本に来て、どのぐらいですか？
Ｂ：ちょうど半年です。
Ａ：そうですか。日本に慣れましたか？
Ｂ：はい、なんとか。

[01-08] dòng 5000
Ａ：日本に来て、どのぐらいですか？
Ｂ：去年の 9 月に来ました。
Ａ：そうですか。もう慣れましたか？
Ｂ：はい、おかげさまで。
```

**Đo thật, kết luận:** với chủ đề u2-l2, **chỉ 1/12 nguồn cho ra hội thoại dùng
được** (Irodori 初級1, 7 kịch bản). 11 nguồn còn lại cho **0**.

---

## 6. CỔNG KIỂM NGUYÊN VĂN CÓ KHẢ THI KHÔNG

Phép thử: đọc file nguồn, kiểm chuỗi được trích có tồn tại nguyên văn không.

| Nguồn | Làm được? | Ghi chú |
|---|---|---|
| Irodori markdown | **ĐƯỢC** | `includes('日本に来て、どのぐらいですか？')` → khớp |
| hanabira grammar JSON | **ĐƯỢC** | `includes('この中で、寿司が一番好きです。')` → khớp |
| open-anki CSV | **ĐƯỢC** | khớp ở mức TỪ |
| n1–n4 markdown (sạch) | **ĐƯỢC** | khớp |
| n5 markdown (4 file hỏng) | **KHÔNG** | OCR hỏng 17–23%: chuỗi trong file không phải chuỗi thật |
| 5 PDF Sou Matome | **KHÔNG** | ảnh scan, 0 chữ |
| Collins / N5 Grammar Master PDF | **ĐƯỢC nhưng phải bóc trước** | cần `pdftotext`, và Collins có dấu cách lạ giữa từ (`来まし た`) |

**Ca hỏng đã đo trên Irodori 初級1:**
- Lượt bị **tràn sang dòng sau**: 4/729 = **1%** — không đáng kể.
- Dòng chứa **≥2 lượt do PDF nhiều cột**: **4 dòng** — hiếm nhưng có; chuỗi ghép
  từ hai cột sẽ khớp nhầm.
- **furigana chèn giữa câu**: KHÔNG xảy ra trong bản `.md` (furigana ở dòng
  riêng, không chèn giữa) → so khớp không bị lệch vì furigana.
  ⚠ Nhưng **bài NovaLang thì CÓ furigana chèn giữa** (`お久（ひさ）しぶり`), nên
  cổng kiểm **bắt buộc phải bóc furigana trước khi so** — cách đang dùng.

---

## VƯỚNG MẮC

1. **4 file n5 hỏng OCR 17–23%** nhưng tiêu đề sạch (`# Cấp độ: N5`) — dễ tưởng
   dùng được. Không dùng để trích câu.
2. **open-anki ≡ hanabira Tanos (93% trùng N5)** — cùng gốc Tanos, đối chiếu
   chéo giữa hai cái là vô nghĩa.
3. **hanabira markdown ≡ hanabira JSON (98% trùng title)** — cùng gốc, hai định
   dạng; cũng không đối chiếu chéo được.
4. **Chỉ Irodori có hội thoại có nhãn người nói.** Mọi ô cần hội thoại đều
   phụ thuộc một nguồn duy nhất — không có nguồn thứ hai để đối chiếu.
5. **Bản dịch tiếng Việt của lời thoại gần như không có** (19% ở 初級1, mà phần
   lớn là dịch hướng dẫn). Dịch vi cho mọi câu phải tự viết.
6. **Không nguồn nào gán mức lịch sự 3 bậc của §B2e.** 敬語の指針 phân theo trục
   khác (5 hệ kính ngữ), không thay thế được.
7. **Furigana của Irodori không ghép lại được bằng máy** — dòng kana không thẳng
   cột, và trang nhiều cột thì một dòng phục vụ nhiều lời thoại.
8. **5 PDF Sou Matome (177 MB) = 0 chữ.** Muốn dùng phải OCR.
9. **Collins có dấu cách lạ giữa từ** (`来まし た`) — trích thẳng sẽ sai chính tả.
10. **KHÔNG CHẮC**: `n2/n3/n4 vocab-list.md` có trùng Tanos không, và
    N5 Grammar Master có trùng hanabira N5 không — chưa đo.

---
---

# PHỤ LỤC — KHẢO SÁT VÒNG 2 (2026-07-28)

> Cùng mốc: nhánh `claude/build-language-jp-o91o6h`, commit `bc735bf`.
> 1 file chưa commit: chính `INVENTORY.md` này.
>
> **Vòng 2 SỬA hai kết luận sai của vòng 1** — đánh dấu ⚠ SỬA bên dưới.

## A. NGUỒN NÀO CÓ BÀI TẬP THẬT

### A1. Minna no Nihongo — TÌM THẤY, 3 file

Tìm cả theo tên file lẫn theo nội dung (`みんなの日本語` / `Minna no Nihongo`):

| File | dòng | nhiễu OCR |
|---|---|---|
| `n5/n5_minna-no-nihongo-I-sach-dich-tieng-Viet.md` | 6.976 | 9% |
| `n5/n5_minna-no-nihongo-I-shokyuu-topikku-25.md` | 2.970 | **22%** |
| `n5/n5_bai-tap-tieng-Nhat-so-cap-1.md` | 2.709 | **23%** |

File thứ ba **không mang chữ "minna" trong tên** — chỉ tìm ra bằng cách grep nội
dung. Cả ba nằm trong nhóm "n1–n5 rời", nên vòng 1 đã đếm nhưng **không gọi tên
là Minna**. **Cả ba đều hỏng OCR.**

### A2. Quét toàn kho — dấu hiệu bài tập

Quét **1.792 file text có chữ Nhật**, tìm 練習 · 問題 · ドリル · 例題 · 答え ·
解答 · 正誤 và ô trống. **561 file có dấu hiệu.** Top:

| File | tổng | chi tiết |
|---|---|---|
| `irodori/markdown/IRODORI_So_trung_cap_A2-B1.md` | 647 | 練習:95 問題:47 答え:59 解答:6 ô:440 |
| `irodori/markdown/IRODORI_So_cap_2_A2.md` | 437 | 練習:29 答え:70 **解答:113** ô:211 |
| `irodori/markdown/IRODORI_Nhap_mon_A1.md` | 417 | 練習:44 答え:126 **解答:99** ô:143 |
| `n5/n5_160-kanji-n5-n4.md` | 392 | 練習:19 答え:10 ô:363 |
| `n5/n5_kanji-master.md` | 371 | ô:371 |
| `irodori/markdown/IRODORI_So_cap_1_A2.md` | 243 | 練習:45 答え:80 **解答:78** |
| `n5/n5_bai-tap-tieng-Nhat-so-cap-1.md` | 174 | 練習:2 問題:6 ô:165 |
| `hanabira .../sentences_600_verbs_book_0001.json` | 166 | 練習:32 問題:88 答え:44 |

### A3. Từng nguồn có bài tập

**Irodori markdown (4 file) — nguồn bài tập tốt nhất**

- **Bao nhiêu**: 45 lượt 練習 chỉ riêng 初級1; ô trống 36–431 tuỳ tập.
- **Dạng**: đánh dấu ○/× theo nội dung nghe · ghép ①②③ với a/b/c/d · điền ô ·
  nghe rồi chọn. **KHÔNG có dạng chia động từ / điền trợ từ kiểu Minna.**
- **CÓ ĐÁP ÁN**: có, **CÙNG FILE**, mục 解答 (初級1 từ dòng 26381).
  Mẫu — `IRODORI_So_cap_1_A2.md` dòng ~26410:

      1  （1）  ①  ②  ③  ④
                 b   a   d   c
         （2）  ①  ②  ③  ④
                 ○   ○   ○

- **Giải thích VÌ SAO SAI**: **KHÔNG.** Đáp án là ký hiệu trần (b a d c, ○).
- **OCR**: 0 lỗi (không phải OCR — là bóc PDF chữ thật).
- **Nguyên văn 3 bài đầu** — `IRODORI_So_cap_1_A2.md` dòng 8372–8392:

      Hãy đánh dấu 〇 nếu đúng với nội dung, dấu × nếu sai với nội dung.
      1. 今日は学校に行きました。          （      ）
      2. レストランでコロッケを食べます。    （      ）
      1. 今は春です。                    （      ）
      2. コートを買いました。              （      ）

**hanabira markdown — nguồn DUY NHẤT có "vì sao sai"**

- **100%** (805/805) file có mục `## 6. Common Mistakes and Tips`.
- Đếm cặp Mistake → Correction: **280 cặp** trong **164 file**, **278 cặp có câu
  tiếng Nhật**.
- **Chất liệu quý nhất trong cả kho**: phương án sai đã được nguồn chứng nhận là
  sai, kèm bản sửa và LÝ DO.
- Nguyên văn — `A_あるいは_B_(A_aruiwa_B).md` mục 6:

      1. **Using the Wrong Conjunction in Casual Speech**
         - **Mistake:**    映画あるいはゲームに行こう。
           (Using あるいは in casual invitation.)
         - **Correction:** 映画かゲームに行こう。
           (か (ka) is more appropriate in casual contexts.)

**n5 Minna (3 file)** — có bài tập điền trợ từ, nhưng **OCR hỏng 9–23%**.
Nguyên văn — `n5_bai-tap-tieng-Nhat-so-cap-1.md` dòng 82:
`B :いいえ、ミラーさん(  ) ブラジル人人じゃありません。` — `人人` là lỗi OCR.

### A4. Chất liệu nuôi được type nào

| Type NovaLang | Nguồn cấp được | Ghi chú |
|---|---|---|
| `multiple_choice` | hanabira Mistake/Correction (280 cặp) · Irodori ghép a/b/c/d | nhiễu có nguồn chứng nhận sai |
| `listening_multiple_choice` | Irodori (bài nghe + 解答) | không có audio, chỉ có kịch bản |
| `matching` | Irodori ①②③↔a/b/c/d · Tanos/anki từ↔nghĩa | |
| `sentence_ordering` | bất kỳ câu nào có sẵn | tự cắt token |
| `dialogue_ordering` | Irodori (4.966 lượt) | |
| `dialogue_fill` | Irodori + Minna (Minna hỏng OCR) | |
| `checkpoint` | gộp từ các type trên | |
| **`chat_text_fill`** | **GẦN NHƯ KHÔNG CÓ — 13 lượt toàn kho** | xem dưới |
| `slot_ordering` | bất kỳ câu nào | tự cắt token |
| **`real_world_practice_dialogue`** | **CHỈ Irodori đủ số lượng** | xem dưới |

**`chat_text_fill` (hội thoại 2–12 lượt CÓ Ô TRỐNG trong chính lượt nói):**
quét toàn kho tìm dòng vừa có nhãn người nói vừa có ô trống → **13 lượt**, và
**cả 13 nằm trong `n5_bai-tap-tieng-Nhat-so-cap-1.md`** (hỏng OCR 23%).
Irodori: **0** — ô trống của Irodori nằm ở bài đánh dấu ○/×, không nằm trong lời
thoại. → **Thực tế KHÔNG NGUỒN NÀO DÙNG ĐƯỢC; phải tự khoét ô vào hội thoại.**

**`real_world_practice_dialogue` (≥4 lượt, không chấm):** khối ≥4 lượt liền
mạch — **Irodori** (nguồn chính) · **hanabira md: 3 khối** · **n1–n5 rời: 7
khối**. Ngoài Irodori tổng cộng **10 khối**.

## B. HANABIRA CÓ HỘI THOẠI KHÔNG — ⚠ SỬA KẾT LUẬN VÒNG 1

Vòng 1 ghi *"chỉ Irodori có hội thoại, 11 nguồn còn lại 0 lượt"*. **SAI.**
Nguyên nhân: bộ dò dùng mẫu neo đầu dòng, nên bỏ sót định dạng markdown
`- **A:** …`.

**Dò lại bằng mẫu TEXT (cho phép markup đầu dòng), CHỈ nhận nhãn người nói thật
— KHÔNG nhận nhãn tiếng Nhật tự do vì đó là tên điểm ngữ pháp:**

| Nguồn | file có lượt | tổng lượt | khối ≥2 lượt | khối dài nhất |
|---|---|---|---|---|
| **hanabira markdown** | **37** | **119** | **48** | **4 lượt** |
| **n1–n5 rời** | **6** | **78** | **21** | **7 lượt** |
| 敬語の指針 (2 txt) | 0 | **0** | 0 | — |
| Collins (60 tr mẫu) | 0 | **0** | 0 | — |

Phân bố khối — hanabira: `2 lượt:45 · 4 lượt:3`; n1–n5: `2:12 · 3:2 · 4:4 · 5:2 · 7:1`

**B2 — tên trường trong hanabira JSON** (liệt kê HẾT, không chỉ trường tên
"dialogue"):

- `grammar_ja_JLPT_N*.json`: `title` · `short_explanation` · `long_explanation` ·
  `formation` · `examples[{jp,romaji,en,grammar_audio}]` · `p_tag` · `s_tag`
- `wordsTanos_*.json`: `vocabulary_original` · `vocabulary_simplified` ·
  `vocabulary_english` · `word_type` · `vocabulary_audio` · `p_tag` · `s_tag`
- `sentences_*.json`: `sentence_original` · `sentence_romaji` ·
  `sentence_english` · `key` · `sentence_audio`

→ **KHÔNG trường nào chứa hội thoại.** Hội thoại hanabira chỉ nằm trong
**markdown**, dạng text thuần.

**B3 — 3 mẫu nguyên văn:**

    hanabira.org-main/.../A。そういえば_B。(~souieba).md dòng 40–43
      - A: 明日は試験ですね。(Ashita wa shiken desu ne.)
        "The exam is tomorrow, isn't it?"
      - B: ところで、週末は何をしますか。(Tokoro de, shuumatsu wa nani o shimasu ka.)
        "By the way, what are you doing this weekend?"

    n4/n4_grammar-full.md dòng 18–20
      A: にほんごが じょうずですね。にほんに いったことがあるんですか。
      (Cậu giỏi tiếng Nhật thế. Cậu đến Nhật bao giờ chưa?)
      B: いいえ、いったことが ありません。(Không, tớ chưa đến Nhật bao giờ.)

    n3/n3_grammar-list-from-text.md dòng 476–477
      A:社長しゃちょうはいらっしゃいますか。
      B:今週こんしゅうは出張しゅっちょうに行いっています。

⚠ Mẫu n3: furigana bị **chèn thẳng vào giữa từ** (`社長しゃちょう`) — không tách
được bằng dấu ngoặc như bài NovaLang.

**Đã dò những mẫu nào** (để "0" là 0 có căn cứ): `Ａ：` `Ｂ：` · `A:` `B:` ·
`男:` `女:` · `先生:` `学生:` · `店員:` `客:` · `母:` `父:` · `田中:` `佐藤:`
`山田:` · `「tên」：` — có và không có markup đầu dòng.

## ⚠ SỬA THỨ HAI — vòng 1 nói "KHÔNG nguồn nào ánh xạ từ→câu ví dụ". SAI.

hanabira có **5 file `sentences_*.json`**, mỗi mục có `key` = **TỪ** và một câu
ví dụ đầy đủ:

| File | số câu | số khoá (từ) |
|---|---|---|
| `sentences_600_verbs_book_0001.json` | 2.101 | 404 |
| `sentences_600_suru_verbs_book_0001.json` | 1.470 | 294 |
| `sentences_N3_tango_verbs_0001.json` | 1.270 | 254 |
| `sentences_N3_tango_na-adjectives_0001.json` | 290 | 58 |
| `sentences_N3_tango_i-adjectives_0001.json` | 150 | 29 |
| **TỔNG** | **5.281 câu** | **1.039 từ** |

Nguyên văn — `sentences_600_verbs_book_0001.json` mục 1:

    {"sentence_original":"学校が終わると、みんなの気分が上がった。",
     "sentence_romaji":"Gakkou ga owaru to, minna no kibun ga agatta.",
     "sentence_english":"When school ended, everyone's mood lifted.",
     "key":"上がる_"}

→ Ô `vocabularyDetails[].examples` **CÓ nguồn** cho 1.039 từ (chủ yếu động từ và
tính từ, cấp N3). Vẫn thiếu furigana và bản dịch tiếng Việt.

## C. BA CHUỖI REGISTER

`scripts/validate-curriculum.mjs` dòng 991–1003, nguyên văn:

    const ALLOWED_REGISTERS = new Set([
      // vi
      "Trang trọng.",
      "Lịch sự.",
      "Thân mật.",
      // en
      "Formal.",
      "Polite.",
      "Casual.",
      // ja
      "改まった言い方。",
      "丁寧。",
      "カジュアル。",

`LESSON_AUTHORING_STANDARD.md` §B2e dòng 224–228, nguyên văn:

    | Mức | vi | en | ja |
    | trang trọng | `Trang trọng.` | `Formal.` | `改まった言い方。` |
    | lịch sự | `Lịch sự.` | `Polite.` | `丁寧。` |
    | thân mật | `Thân mật.` | `Casual.` | `カジュアル。` |

**KHỚP HOÀN TOÀN** — 9/9 chuỗi giống nhau từng ký tự, kể cả dấu chấm cuối và
dấu 。 tiếng Nhật.

## D. HAI CHỖ CHƯA ĐO Ở VÒNG 1

### D1. vocab-list rời vs hanabira Tanos

| | md | Tanos | trùng | thứ tự 10 đầu | Kết luận |
|---|---|---|---|---|---|
| **N4** | 634 | 634 | **631 (100%)** | **GIỐNG** | **CÙNG MỘT FILE** |
| **N3** | 1.835 | 1.835 | **1.835 (100%)** | **GIỐNG** | **CÙNG MỘT FILE** |
| N2 | 1.159 | 1.835 | 291 (25%) | khác | **KHÁC danh sách** |

N4/N3: số từ bằng nhau tuyệt đối, trùng 100%, thứ tự y hệt
(`あ ああ あいさつ・する 間 合う…`) → **là bản định dạng lại của Tanos, KHÔNG
phải nguồn thứ hai.**
N2 định dạng khác (`| số | từ |`, sắp theo chủ đề: `人生 人間 人 祖先 親戚…`) →
**là danh sách độc lập.**

### D2. N5 Grammar Master vs hanabira N5 — **ĐỘC LẬP**

- N5GM: **137 điểm** bóc được · hanabira N5: **136 điểm**
- Khớp CHÍNH XÁC phần chữ Nhật: **7/137** · khớp LỎNG (chứa nhau): **96/137 (70%)**
- 70% trùng là do **cùng phủ đại cương N5**, không phải cùng gốc. Chứng minh bằng
  cùng một điểm だけ:

      N5GM    : ⼀⼈だけ。 / ただ⼀つだけある。 / ほしいものはこれだけ。
      hanabira: title "Noun だけ〜 (〜dake)"
                formation "Noun + だけ, Verb-casual + だけ, い-Adj + だけ…"
                ví dụ "コーヒーだけ飲んで、帰りました。"

  Giải thích và ví dụ **hoàn toàn khác nhau** → hai bản soạn độc lập.
- → **Tầng ngữ pháp CÓ nguồn thứ hai để đối chiếu.** Khác tầng từ vựng: Tanos /
  open-anki / n3 / n4 đều cùng một gốc.
- ⚠ N5GM bóc ra dùng **ký tự Kangxi Radical** `⼀` (U+2F00) thay vì `一` (U+4E00)
  — so khớp nguyên văn sẽ trượt nếu không chuẩn hoá Unicode.

## VƯỚNG MẮC VÒNG 2

1. **Vòng 1 kết luận sai 2 chỗ** — "hanabira 0 hội thoại" (thật: 37 file/119
   lượt) và "không nguồn nào ánh xạ từ→câu" (thật: 5.281 câu/1.039 từ).
2. **`chat_text_fill` thực tế KHÔNG có nguồn** — 13 lượt toàn kho, cả 13 nằm
   trong file hỏng OCR 23%.
3. **Cả 3 file Minna đều hỏng OCR (9–23%)** — tầng bài tập điền trợ từ coi như
   không dùng được.
4. **Irodori có đáp án nhưng KHÔNG có "vì sao sai"** — đáp án là ký hiệu trần.
5. **Chỉ hanabira có "vì sao sai"** (280 cặp / 164 file) — một nguồn duy nhất,
   trộn lẫn N1–N5, bản markdown không mang nhãn cấp nên không lọc theo cấp được.
6. **n4/n3 vocab-list ≡ Tanos 100%** — tưởng 2 nguồn, thật ra 1.
7. **Furigana n3 chèn thẳng vào giữa từ** (`社長しゃちょう`) — khác kiểu ngoặc của
   NovaLang, không tách được bằng cùng một hàm.
8. **N5GM dùng ký tự Kangxi** (`⼀` U+2F00) — cổng kiểm nguyên văn phải chuẩn hoá
   Unicode trước khi so.
9. **KHÔNG CHẮC**: 2 file `sentences_600_*` lấy từ sách nào (khoá có hậu tố lạ:
   `上がる_`); chưa rõ giấy phép riêng cho phần này.

---
---

# PHỤ LỤC 3 — NGUỒN MỚI: NGỮ PHÁP N5 TIẾNG VIỆT (2026-07-28)

> Mốc: nhánh `claude/build-language-jp-o91o6h`, commit `bc735bf`, 3 file chưa
> commit (`INVENTORY.md`, `verify-provenance.mjs`, `taught-vocabulary.json`).
> **KHÔNG commit.** Đo bằng ĐÚNG các thước đã dùng ở phụ lục 1–2 để so được.

## TÌM FILE

`find local-sources -type f` sắp theo mtime giảm dần → **đúng MỘT file mới**:

    2026-07-28 12:55   63.054 byte   local-sources/ja/New Tài liệu văn bản3.txt

File kế tiếp là 4 file Irodori markdown (2026-07-27 15:25), đã khảo sát ở phụ
lục 2. Không có thư mục mới. → chỉ đo 1 file.

## 1. ĐỊNH DẠNG & CHẤT LƯỢNG

| | |
|---|---|
| path | `local-sources/ja/New Tài liệu văn bản3.txt` |
| dạng | text thuần, **UTF-8**, **CRLF** |
| dung lượng | 63.054 byte · 1.056 dòng |
| dòng có chữ Nhật | 625 (59%) |
| dòng có tiếng Việt | 747 (71%) |
| **nhiễu OCR** | **3 dòng = 0%** (ngưỡng chặn cũ 17–23%) → **SẠCH** |
| Kangxi Radical U+2F00–2FDF | **0** |
| CJK compat khác | **0** |
| khoảng trắng chen KANJI\|kana | 12 |
| khoảng trắng chen kana\|kana | 331 |

⚠ 331 chỗ kana-cách-kana **KHÔNG phải lỗi bóc PDF** như Collins — đây là lối
viết **phân từ cố ý của sách sơ cấp** (`わたしは ケーキを たべました。`). Cổng
nguyên văn đã bỏ mọi khoảng trắng nên không ảnh hưởng.

## 2. CẤU TRÚC

- **Tổ chức**: mục lục đánh số `chương.mục` → thân bài. **7 chương · 34 mục con
  · 41 mục tổng.**
- **Câu ví dụ**: **289 dòng** có chữ Nhật kết bằng `。/？`; **278 câu** trích
  được sạch. **67 dòng** mở đầu bằng "Ví dụ".
- **Furigana**: kiểu **NGOẶC** `漢字（かな）` — **19 lượt** (mẫu: `旦那(だんな)` ·
  `洗濯(せんたく)`). Kiểu **DÒNG RIÊNG: 0**. Kiểu dính liền: 22 (ước lượng thô,
  dễ nhầm okurigana). → **Furigana rất thưa** — 19/278 câu.
- **Romaji**: **0** (dò: dòng thuần latin dài >12 ký tự → 0).
- **Mục lỗi thường gặp / 正誤**: `正誤` **0** · `間違` **0** · `誤り` **0**.
  Chỉ có `Lưu ý` 11 dòng · `Chú ý` 1 · `không dùng` 3 + `KHÔNG dùng` 1.
  → **KHÔNG có cặp sai→đúng có cấu trúc** như hanabira. Chỉ là ghi chú văn xuôi.

### 20 MỤC ĐẦU (nguyên văn, kèm số dòng)

    d   1  1 NHỮNG KIẾN THỨC CƠ BẢN VỀ ĐỘNG TỪ
    d   2  1.1 辞書形 (じしょけい) Thể từ điển hay động từ nguyên thể
    d   3  1.2 Thể phủ định của động từ ない形 (Thể ない) Không (làm gì đó)
    d   4  1.3 Động từ thể ます
    d   5  1.4 Cách tạo động từ thể た từ thể từ điển
    d   6  1.5 Động từ thể て
    d   7  1.6 Phân biệt ~て、~ và ~てから、~
    d   8  1.7 Cấu trúc này động từ chia về thể た.
    d   9  1.8 あげます、もらいます、くれます
    d  10  1.9 ~たり ... ~たりする
    d  11  1.10 ~ないでください。 ĐừngKhông được
    d  12  1.11 ~なければならない~なくてはならないPhải (làm gì đó)
    d  13  1.12 ~ なくてもいい
    d  14  2 TÍNH TỪ
    d  15  2.1 Tính từ – Những kiến thức cơ bản
    d  16  2.2 Tính từ khi kết hợp với danh từ và động từ
    d  17  2.3 ~たいです – Tôi muốn
    d  18  2.4 ~がほしいです。muốn
    d  19  2.5 ~がすきです。Sở thích
    d  20  2.6 ~がじょうずです ~がへたです Giỏikém cái gì

### DỊCH TIẾNG VIỆT — trường đắt nhất, ĐANG 100% VIẾT TAY

**CÓ**, và nằm **NGAY SAU câu Nhật, trong ngoặc, cùng dòng**. 3 mẫu nguyên văn:

    d 263: 1 [Người A] は [người B] に [danh từ] を あげます。(Đưatặng cho)
    d 315: す。(Vào chủ nhật, em trai tôi thường đọc sách, xem ti vi v.v)
    d 337: かべに かかないでください。(Không được viết lên tường)

Thêm hai mẫu rõ hơn từ khối hội thoại:

    d 514: A しょうらい、なにに なりたいですか。(Tương lai, bạn thích làm gì)
    d 515: B えいごのせんせいに なりたいです。(Tớ muốn làm giáo viên tiếng Anh.)

→ **Đây là nguồn ĐẦU TIÊN trong kho có bản dịch TIẾNG VIỆT gắn liền từng câu.**
(Irodori có 13k dòng tiếng Việt nhưng chỉ 19% bám lời thoại — phần lớn dịch
phần hướng dẫn; hanabira/anki/Collins/JMdict chỉ có tiếng Anh.)

⚠ Bản dịch có lỗi **mất dấu cách khi bóc**: `(Đưatặng cho)` = "Đưa/tặng cho",
`Giỏikém` = "Giỏi/kém", `ĐừngKhông được` = "Đừng/Không được". Dùng lại phải sửa tay.

### HỘI THOẠI — ⚠ LẦN THỨ BA DÒ THIẾU

Dò lần 1 bằng mẫu có dấu hai chấm (`A:` `Ａ：` `- **A:**`) → **0 lượt**.
**SAI.** Nguồn này dùng nhãn `A`/`B` + **khoảng trắng, KHÔNG có dấu hai chấm**.

Dò lại bằng `^\s*[-*>]?\s*\**\s*([ＡＢＣＤA-D])\**\s*[：:]?\s+\S*[chữ Nhật]`:

- **15 lượt** có nhãn người nói · **4 khối ≥2 lượt** · kích thước `4, 2, 2, 4`
  · **dài nhất 4 lượt**

Nguyên văn 2 khối đầu:

    d 514: A しょうらい、なにに なりたいですか。(Tương lai, bạn thích làm gì)
    d 515: B えいごのせんせいに なりたいです。(Tớ muốn làm giáo viên tiếng Anh.)
    d 517: A なにが のみたいですか。(Bạn muốn uống gì)
    d 518: B おちゃがいいですよ。(Cho tớ trà nhé.)

    d 541: A たんじょうびに なにが ほしいですか。(Ngày sinh nhật cậu muốn nhận quà gì)
    d 542: B そうですね、あたらしいかばんが ほしいです。(À, tớ muốn có một cái cặp
           sách mới.)
    d 551: A すみません、しろいかみが ほしいんですが。(Xin lỗi, cho tôi một tờ giấy
    d 553: B はい。(OK)

→ **Bài học lặp lại lần thứ ba**: mỗi nguồn dùng một quy ước nhãn khác nhau
(`Ａ：` Irodori · `- **A:**` hanabira · `A ` nguồn này). Dò bằng một mẫu là
chắc chắn trả 0 sai.

## 3. ĐỘC LẬP — CÓ, không phải bản định dạng lại

| Đối chiếu | Kết quả |
|---|---|
| Câu ví dụ trùng **hanabira N5** (verbatim, chuẩn hoá) | **0 / 278** |
| Khoá điểm ngữ pháp trùng hanabira N5 | chính xác **1/28** · lỏng **14/28** |
| Câu ví dụ trùng **N5 Grammar Master** | **9 / 278 (3%)** |
| Khoá điểm ngữ pháp trùng N5GM | chính xác **3/28** · lỏng **25/28 (89%)** |

→ Khoá trùng lỏng cao (89% với N5GM) là do **cùng phủ đại cương N5**, giống hệt
ca N5GM ↔ hanabira đã đo ở phụ lục 2. Nhưng **câu ví dụ gần như không trùng**
(0% và 3%) → **soạn độc lập**, KHÔNG phải bản định dạng lại của nguồn nào.

→ **Khác hẳn ca `n3/n4 vocab-list ≡ Tanos`** (trùng 100%, thứ tự y hệt).

3 câu ví dụ đầu để owner tự soi — `New Tài liệu văn bản3.txt`:

    d 74: かれは ごはんをたべる。
    d 75: かのじょは りょうりをする。
    d 76: わたしは せんせいとはなす。

## 4. THỬ THẬT VỚI u2-l2

### 4 mẫu ngữ pháp

| Mẫu | Số dòng | Mẫu nguyên văn |
|---|---|---|
| `どのぐらい` | **3** | d 689: `A そこに ハンカチが どのくらい ありますか。Ở đó có bao nhiêu chiếc khăn tay` |
| `〜てから` | **7** | d 213: `7. ~てから、~ Sau khi (xong việc gì đó), thì làm việc khác` · d 214: `a. かんがえてから、いってください。Sau khi nghĩ xong thì hãy nói ra nhé。` |
| `〜になります/になる` | **1** | d 480: `あのひとは ゆうめいになりました。(Người kia đã trở nên nổi tiếng rồi.)` |
| `慣れる` | **0** | RỖNG — đã dò regex `/慣れ[るまた]\|なれ[るまた]/` trên toàn file |

→ Phủ **3/4 mẫu**. `〜てから` có **hẳn một mục riêng** (mục 1.6 và mục 7) — đây
là mẫu nguồn này mạnh nhất.

### LỌC VỐN TỪ KHÔ — phép đo quyết định

Vốn đối chiếu: **Tanos N5** (669 từ, lấy cả dạng kanji lẫn kana) ∪
**taught-vocabulary.json** (7 cụm) = **1.158 mục**.

⚠ **Sổ taught-vocabulary MỚI CHỈ CÓ u2-l1, THIẾU 3 bài Unit 1** → kết quả dưới
đây **khắt hơn thực tế**.
⚠ Bộ tách từ là bộ **thô** (cụm kanji+kana liên tục), không quy `たべました` về
`たべる` → số "từ lạ" bị **phồng lên**.

10 câu rải các mẫu:

    d 214 [2 lạ] かんがえてから、いってください。      ← かんがえてから いってください
    d 480 [0 lạ] あのひとは ゆうめいになりました。
    d 689 [1 lạ] そこに ハンカチが どのくらい ありますか。 ← ありますか
    d 522 [1 lạ] がほしいです。                      ← がほしいです
    d 493 [1 lạ] ます) + たいです。                   ← たいです
    d 183 [0 lạ] にほんごで はなしてください。
    d 255 [1 lạ] わたしは すしを たべたことがあります。 ← たべたことがあります
    d 392 [0 lạ] は + tính từ -i + です。
    d 128 [2 lạ] わたしは ケーキを たべました。        ← ケーキ たべました
    d 124 [2 lạ] わたしは ケーキを たべません。        ← ケーキ たべません

**KẾT QUẢ: 0 từ lạ = 3 câu · 1–2 từ lạ = 7 câu · >2 từ lạ = 0 câu.**

→ **KHÔNG câu nào có >2 từ lạ**, và mọi "từ lạ" đếm được đều là **dạng chia của
động từ đã biết** (`たべました` ← `たべる`) hoặc **katakana ngoại lai dễ đoán**
(`ケーキ`). Với bộ tách từ đúng, con số thật gần như bằng 0.

→ **KHÁC HẲN `sentences_*.json`** — bộ đó toàn câu N3+ (`一度安定した状態になる
と、もはや大きな変化はありません。`), rụng gần hết ở trình độ A1–A2. Nguồn này
viết bằng **kana phân từ, câu ngắn, đúng lối sách sơ cấp**.

## 5. CHẠY CỔNG THẬT

`node scripts/verify-provenance.mjs` với 4 ca trên nguồn mới:

    CỔNG NGUYÊN VĂN — TEST-nguon-moi-ngu-phap-N5 · 4 mục

      PASS  CA A — câu thật, dòng 480
      PASS  CA B — câu thật, dòng 214 (câu bị NGẮT DÒNG trong nguồn)
      PASS  CA C — cùng câu dòng 480 nhưng thêm furigana kiểu ngoặc
      FAIL  CA D — CỐ Ý SAI: đổi 1 ký tự (になりました → になりません)
              bài (đã chuẩn hoá) : あのひとはゆうめいになりません。
              nguồn (đã chuẩn hoá): 私のちょうしがよくなった。(…)…あのひとはゆうめいに
                                    なりました。(Ngườikiađãtrởnênnổitiếngrồi.)…

    TỔNG — nguyên văn PASS 3 · FAIL 1 · tự soạn 0     exit=1

- **Qua ở MỨC 1** (chuẩn hoá an toàn: NFKC + furigana-ngoặc + bỏ khoảng trắng).
  Không ca nào phải hạ xuống mức 2.
- **Ngắt dòng: KHÔNG thành vấn đề.** CA B lấy câu ở dòng 214, mà nguồn ngắt
  `(かん` / `がえる suy nghĩ…` sang dòng 215 — cửa sổ ±3 dòng nối lại vẫn khớp.
- **Nhiều cột: KHÔNG có.** File là text một cột, không phải bóc PDF nhiều cột
  như Irodori (nơi đã đo được 4 dòng bị ép chung cột).

## KẾT LUẬN

**VÀO BẢNG NGUỒN.** Ô nó lấp được, theo thứ tự giá trị:

1. **`grammarPatterns`** — 41 mục có cấu trúc + giải thích tiếng Việt + 278 câu
   ví dụ. Là **nguồn ngữ pháp THỨ BA độc lập** (0%/3% trùng câu với hai nguồn kia).
2. **Bản dịch tiếng Việt** — nguồn **đầu tiên** trong kho có dịch vi gắn liền
   từng câu. Trường này đang 100% viết tay.
3. **`intro.examples` / `vocabularyDetails[].examples`** — 278 câu đúng trình độ
   A1–A2 (0/10 câu có >2 từ lạ), khác hẳn `sentences_*.json` toàn N3+.
4. **`dialogueGroups` / Q14** — chỉ 4 khối, dài nhất 4 lượt. Bổ sung nhỏ cho
   Irodori, không thay thế được.

**KHÔNG lấp được**: furigana (chỉ 19/278 câu) · romaji (0) · mục lỗi có cấu
trúc (0 cặp `正誤`) · `chat_text_fill`.

## VƯỚNG MẮC

1. **Dò hội thoại trả 0 sai LẦN THỨ BA** — nguồn này dùng nhãn `A`/`B` không dấu
   hai chấm. Ba nguồn, ba quy ước; một mẫu dò là chắc chắn sót.
2. **Bản dịch tiếng Việt mất dấu cách khi bóc**: `(Đưatặng cho)` `Giỏikém`
   `ĐừngKhông được` — dùng lại phải sửa tay từng chỗ.
3. **Furigana rất thưa (19/278 câu)** — vẫn phải tự sinh bằng kuromoji như cũ.
4. **KHÔNG có cặp sai→đúng có cấu trúc** (`正誤` 0) — chỉ `Lưu ý` văn xuôi 11
   dòng; không nuôi được phương án nhiễu như hanabira Common Mistakes.
5. **`慣れる` ra 0** — mẫu u2-l2 cần nhất lại không có; vẫn phải dựa Irodori.
6. **Bộ tách từ trong phép lọc vốn là bộ thô**, không quy dạng chia về nguyên
   thể → số "từ lạ" phồng; con số thật thấp hơn báo cáo.
7. **Tên file vô nghĩa** (`New Tài liệu văn bản3.txt`) — cùng lỗi với 2 file
   敬語 trước; đề xuất đổi tên nhưng owner tự làm, agent không đụng local-sources.
8. **KHÔNG CHẮC** xuất xứ: file không ghi tác giả/nguồn/nhà xuất bản. Nội dung
   giống giáo trình Minna soạn lại bằng tiếng Việt nhưng **chưa xác minh được**.
9. **KHÔNG CHẮC** giấy phép — như mục 8, không có thông tin bản quyền trong file.

---

## CẬP NHẬT 2026-07-29 — path chính thức nguồn n5-Việt

Owner cấp phép ngoại lệ một lần để đổi tên (không sửa nội dung). Đã chuyển:

| | |
|---|---|
| trước | `local-sources/ja/New Tài liệu văn bản3.txt` |
| **sau (CHÍNH THỨC)** | **`local-sources/ja/n5/n5_ngu-phap-vi.txt`** |
| sha256 trước | `778414d20f38b2a289152e8d70acb9446641b8716d6e9826933e0dd7848c9e79` |
| sha256 sau | `778414d20f38b2a289152e8d70acb9446641b8716d6e9826933e0dd7848c9e79` |
| size | 63.054 byte cả hai lượt |
| nội dung | 1.056 dòng / 41 mục / 278 câu — khớp nguyên số đo phụ lục 3 |

Thư mục `n5/` có sẵn nên chuyển vào đó, không tạo thư mục mới.
Mọi tham chiếu tới nguồn này trong provenance dùng path CHÍNH THỨC ở trên.

---

# ĐO 7 NGUỒN MỚI — 2026-07-30

Owner thêm 7 file vào `local-sources/ja/` ngày 2026-07-30. Tìm theo mtime,
đối chiếu INVENTORY: **đúng 7 mục, cả 7 đều chưa có trong sổ**. Task CHỈ ĐỌC.

## Bảng sàng

| # | Nguồn | Định dạng | Dung lượng | Loại | Kết luận sàng |
|---|---|---|---|---|---|
| 1 | `topic1.json` Dailylife | JSON, in đẹp | 1,38 MB | hội thoại | **QUA SÀNG** |
| 2 | `topic2.json` School | JSON | 1,35 MB | hội thoại | **QUA SÀNG** |
| 3 | `topic3.json` Travel | JSON | 1,38 MB | hội thoại | **QUA SÀNG** |
| 4 | `topic4.json` Health | JSON | 1,36 MB | hội thoại | **QUA SÀNG** |
| 5 | `topic5.json` Entertainment | JSON | 1,37 MB | hội thoại | **QUA SÀNG** |
| 6 | `ban1.txt` | text UTF-8 | 476 KB | giáo trình | **QUA SÀNG kỹ thuật · VƯỚNG GIẤY PHÉP** |
| 7 | `ban2.txt` | text bóc PDF | 221 KB | giáo trình | **CHẶN** — hỏng 55% + bản quyền |

## 1–5. `topic1…5.json` — KHO HỘI THOẠI, ô đói nhất

| topic | tên | hội thoại | lượt nói | dòng file |
|---|---|---|---|---|
| 1 | Dailylife | 1.069 | 8.454 | 50.824 |
| 2 | School | 1.057 | 8.189 | 49.403 |
| 3 | Travel | 1.020 | 8.449 | 50.407 |
| 4 | Health | 1.060 | 8.335 | 50.157 |
| 5 | Entertainment | 1.050 | 8.310 | 49.952 |
| | **TỔNG** | **5.256** | **41.737** | |

Cấu trúc: `topic_id · topic_name · dialogue_id · dialogue_length · utterances[]`,
mỗi lượt `turn_num · speaker · utterance`. Người nói **A / B**. Hội thoại dài
**4–12 lượt**.

**Chạy cổng thật** (`verify-provenance`): 2 câu/topic, **PASS mức 1**, trích
đúng `source:line` — file in đẹp nên mỗi câu nằm trọn một dòng:

```
local-sources/ja/topic1.json:11
                "utterance": "おはようございます。今日はとても良いお天気ですね。"
```

**Lọc vốn từ khô** — 10 câu rải đều/topic, đối chiếu Tanos N5 (669 mục, 422
kanji) ∪ vốn đã dạy (33 cụm):

| topic | 0 kanji lạ | 1–2 lạ | >2 lạ | kanji/câu |
|---|---|---|---|---|
| 1 Dailylife | 4 | 4 | 2 | 5,4 |
| 2 School | 3 | 3 | 4 | 6,1 |
| 3 Travel | 2 | 7 | 1 | 5,6 |
| 4 Health | 3 | 7 | 0 | 3,9 |
| 5 Entertainment | 4 | 4 | 2 | 3,8 |
| **cộng** | **16/50** | **25/50** | **9/50** | |

→ **dải N4**, quá giàu cho A0–A1 nếu dùng thô.

**Thiếu, phải bù bằng tay:** KHÔNG có furigana, KHÔNG romaji, KHÔNG dịch —
chỉ mỗi mặt chữ. G14-R14 [JA] (c) chặn cứng câu hiển thị có kanji mà thiếu
`reading` → **mỗi câu lấy ra đều phải viết tay dòng đọc**.

**Trùng nguồn cũ:** `topic1 ∩ Irodori` = **1/200 câu (0,5%)** → độc lập.

**KHÔNG CHẮC — giấy phép:** không có trường license, không README, không dòng
bản quyền nào trong 5 file. Chưa xác định được nguồn gốc bộ dữ liệu. **Owner
phải xác minh trước khi dùng.**

## 6. `ban1.txt` — Beginning Japanese for Professionals (Portland State)

Emiko Konomi · Portland State University · 2015, © 2018 ·
**Creative Commons Attribution-NonCommercial 4.0 International** (dòng 10–12).

Text UTF-8 sạch toàn file, 12.172 dòng, 3.424 dòng có tiếng Nhật.
**870 câu Nhật hoàn chỉnh** (kết bằng 。！？, ≥6 ký tự).
32 Lesson · 96 khối `Dialogue N` · **638 lượt có nhãn người nói**.

**QUY ƯỚC NHÃN THỨ TƯ** — R4 mới có 3, đây là cái thứ 4:
`Tên Latin + ':'` đầu dòng, romaji + dịch Anh cùng dòng, câu Nhật ở dòng SAU,
furigana ở dòng RIÊNG phía trên:

```
1512 | Emily:  Anou, ima nan-ji desu ka. Um, what time is it (now)?
1513 |  いま なんじ
1514 | あのう、今、何時ですか。
1515 | Yamamoto: Etto…hachi-ji desu yo. Let's see…it's eight o'clock.
```

Tên nhân vật thật: Emily · Yamamoto · Tanaka · Smith · Yamada · Honda · Oda ·
Michael · Rise. (`Cue` / `Response` / `PROFESSIONALS` là dương tính giả — nhãn
bài luyện và chữ ở bìa.)

Hỏng bóc: cụt 73% nhưng **dính furigana chỉ 2%**, dòng ≤2 ký tự 8% — con số
73% là do dòng tiếng Anh/romaji/tiêu đề, không phải câu Nhật vỡ. **Dưới ngưỡng
tiền lệ 17–23%.**

Trình độ: A0–A1 (です/ます, giới thiệu tên, hỏi giờ). Trùng Irodori 1/200.

> **VƯỚNG: điều khoản NonCommercial.** NovaLang có gói trả phí (Plus/Pro/
> Ultimate) → dùng nội dung CC BY-**NC** là rủi ro pháp lý. **Owner quyết**,
> tôi không tự xếp vào bảng tầng.

## 7. `ban2.txt` — NHK WORLD JAPAN «Cùng nhau học tiếng Nhật» → CHẶN

48 bài, hội thoại thành một câu chuyện, **có tiếng Việt**: 3.778 dòng Nhật +
**3.058 dòng Việt** song song — đúng trường đắt nhất.

**Nhưng bản bóc PDF HỎNG NẶNG, vượt xa ngưỡng:**

| chỉ số | ban2 | ngưỡng tiền lệ |
|---|---|---|
| furigana dính inline | **55%** | 17–23% |
| dòng cụt | 80% | |
| dòng ≤2 ký tự | 15% | |

Mẫu nguyên văn (`local-sources/ja/ban2.txt:117–139`):

```
 117 | 海かい          ← 海斗（かいと） bị vỡ thành 2 dòng, furigana dính
 118 | 斗と
 121 | ：              ← dấu hai chấm tách khỏi tên người nói
 137 | すぐ近ちか       ← 近く bị cắt ngang từ
 138 | くです。
```

Bố cục cột bị trộn: lời giải thích tiếng Việt chèn giữa hội thoại
(dòng 128–133 nằm lọt giữa hai lượt nói).

Dò nhãn người nói đủ **4 quy ước** (`Ａ：` · `- **A:**` · `A ` trần · `Tên:`):
**0 / 0 / 1 / 0**. Không phải trả 0 vì dò thiếu — cấu trúc đã vỡ.

**Chặn hai lần:** (a) hỏng bóc 55% ≫ ngưỡng; (b) NHK WORLD JAPAN là nội dung
phát sóng có bản quyền, không có giấy phép mở.

## Kết luận — một dòng mỗi nguồn

| Nguồn | Kết luận |
|---|---|
| `topic1–5.json` | **LẤP Ô HỘI THOẠI N4–N3** — 5.256 hội thoại, cổng PASS mức 1, trích được `source:line`. Phải viết tay `reading` cho mọi câu lấy ra. **Giấy phép chưa rõ — owner xác minh trước.** |
| `ban1.txt` | Giáo trình A0–A1 sạch, có quy ước nhãn thứ 4 → để dành ô hội thoại sơ cấp, **CHỜ owner quyết điều khoản NonCommercial** |
| `ban2.txt` | **BLOCKLIST** — hỏng bóc 55% + bản quyền NHK |

---

# LÀM SAU — chưa làm, ghi để không quên

> Mỗi mục: **việc** · **vì sao hoãn**. Thấy lỗi ngoài phạm vi lượt đang làm
> thì ghi vào đây, không tự sửa (WORKING_RULES §1).

## Bảng ngắn — 9 mục đang treo

| # | Việc | Vì sao hoãn |
|---|---|---|
| LS-1 | Đem lối hiển thị 3 dòng + wakachigaki + công tắc lên app thật | Chi tiết ở mục dưới; cần chốt cách cắt okurigana trước |
| LS-2 | **Ruby (kana trên đầu kanji) cho app** | Owner đã BỎ lối ruby ở trang duyệt 2026-07-29; nếu sau này muốn cho app thì là quyết định sản phẩm mới, không phải việc kỹ thuật còn dở |
| LS-3 | **Dùng kuromoji cho bộ lọc R5** (lọc vốn từ chưa dạy) | Hiện lọc bằng so chuỗi; kuromoji tách từ chính xác hơn nhưng lại là bộ đoán — phải chốt ranh giới "đoán để LỌC" vs "đoán để SINH" (cái sau đã cấm ở G14-R14) |
| LS-4 | **Cổng đổi so-substring → khớp cả dòng** | `verify-provenance` đang tìm chuỗi con trong dòng nguồn; khớp cả dòng chặt hơn nhưng sẽ FAIL hàng loạt câu đang PASS — cần một lượt riêng để rà từng ca |
| LS-5 | **`Flashcard.tsx` còn vẽ chuỗi Nhật trần** | Màn Flashcards không thuộc 5 thẻ bài học, nằm ngoài phạm vi mọi lượt G14-R14 đã làm |
| LS-6 | **Hàng "Đọc" trong thẻ từ vựng không theo công tắc** | Luôn hiện khi mở thẻ; không mất trợ đọc nên không phải lỗi, nhưng lệch cơ chế bật/tắt — cần owner quyết có gom vào công tắc không |
| LS-7 | **`lessonLevel` chết trong `ReadingAidScope`** (Flutter) | Từ 2026-07-30 gate theo ngôn ngữ, không theo cấp; trường này còn trong scope nhưng không ai dùng để quyết định gì. Dọn được, chỉ là rác |
| LS-8 | **Romaji câu dài dính** — `donoguraininarimasuka?` | Khối wakachigaki gộp `どのぐらいになりますか` thành một khối vì bảng trợ từ đóng không tách được `に` nằm giữa. Đúng luật đã chốt; muốn thoáng hơn phải mở bảng hoặc dùng bộ tách từ |
| LS-9 | **Tên 2 file 敬語 trong `local-sources/ja/keigo/`** | Tên file không nói rõ nội dung; đổi tên cần owner cấp phép từng lần + sha256 trước/sau (G14-R13) |
| LS-10 | **`sentences_*.json` mở lại từ N4** | Đã đo có 5.281 câu / 1.039 khoá, nhưng bài hiện tại còn ở N5; mở sớm sẽ kéo từ chưa dạy vào (§G7) |


## LS-1. Đem lối hiển thị 3 DÒNG lên APP THẬT (web + Flutter)

**Trạng thái: CHƯA LÀM.** Ghi ngày 2026-07-29, ngay sau khi dựng xong ở
trang duyệt tĩnh (`scripts/preview-lesson.mjs`).

Trang duyệt hiện vẽ mỗi câu Nhật thành **3 dòng**, owner đã xem và chốt lối
này. App thật thì **chưa** — vẫn vẽ mặt chữ kèm ngoặc furigana thẳng trong
dòng.

| dòng | nội dung | nguồn dữ liệu |
|---|---|---|
| (1) | câu Nhật **sạch**, bỏ ngoặc furigana | `displayText` bóc ngoặc |
| (2) | dòng kana **wakachigaki** (có khoảng cách) | ráp từ chính dữ liệu ngoặc |
| (3) | dịch theo `nativeLanguageCode` | `translationByNative` |

Kèm **2 công tắc** theo đúng lối Q14 đã có
(`Q14ReadingAidSessionStore`, `five_card_exercise_flow.dart`): *Furigana từng
chữ* (kana ruby trên đầu kanji ở dòng 1) và *Dòng đọc kana* (bật/tắt dòng 2).
Nhớ theo **phiên**, không ghi đĩa.

**Điều kiện bắt buộc: PARSE Ở MỘT CHỖ.** Phép cắt `displayText` thành
[cụm kanji → kana] hiện nằm ở `scripts/lib/japanese-furigana.mjs`
(`splitFurigana` · `readingFromFurigana`). Đem lên app thì port đúng phép đó
sang **một** chỗ dùng chung (một hàm Dart + một hàm TS), rồi cả web lẫn
Flutter gọi vào. **Không** để mỗi nền tảng tự bóc ngoặc — làm thế là ba bản
cắt khác nhau, đúng vết xe của ca `japanese-furigana` vs
`japanese-pronunciation` lệch nhau ở 日本 (đã phải vá 2026-07-29).

Làm một lần thì **mọi bài đều ăn**, không phải sửa nội dung bài nào.

**Vướng còn treo:** ranh giới khối ở dòng (2) cắt theo dữ liệu ngoặc nên
okurigana tách khỏi kanji — `来（き）て` ra `き て`, `慣（な）れました` ra
`な れました`. Muốn dính liền thành `きて` / `なれました` thì phải biết ranh
giới TỪ THẬT, tức cần bộ tách từ — thứ vừa bị cấm khỏi đường furigana vì nó
đoán sai âm đọc. Nếu đem lên app thì owner chốt trước: chịu cắt theo khối,
hay cho dùng bộ tách từ **chỉ để chia khoảng cách hiển thị**, tuyệt đối không
cho nó đụng vào âm đọc.
