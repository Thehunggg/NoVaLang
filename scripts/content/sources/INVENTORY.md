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

> **[ĐÃ GIẢI 2026-07-31]** Ghi chú gốc lúc khảo sát (2026-07-30, trước khi có
> xác nhận): "VƯỚNG: điều khoản NonCommercial. NovaLang có gói trả phí
> (Plus/Pro/Ultimate) → dùng nội dung CC BY-**NC** là rủi ro pháp lý. Owner
> quyết, tôi không tự xếp vào bảng tầng." **Owner đã xác nhận CÙNG NGÀY
> 2026-07-30** (mục "CẬP NHẬT 2026-07-30 — owner xác nhận nguồn tự viết +
> đổi tên nhân vật" ở trên): `ban1.txt` là **nội dung owner tự viết**, không
> phải bản CC BY-NC của Konomi/Portland State như dòng bản quyền ở đầu mục
> này (dòng 939-940) từng ghi — "chủ đề nguồn gốc ĐÓNG... hết hiệu lực,
> không hỏi lại". Rủi ro NonCommercial không còn áp dụng.

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

## CẬP NHẬT 2026-07-30 — owner xác nhận nguồn tự viết + đổi tên nhân vật

**Owner xác nhận:** `topic1-5.json`, `ban1.txt`, `ban2.txt` là **nội dung owner
tự viết**. Chủ đề nguồn gốc **ĐÓNG** — mục "giấy phép chưa rõ" ở trên **hết
hiệu lực**, không hỏi lại. `ban2` vẫn chặn nhưng **chỉ vì lý do kỹ thuật**
(bóc PDF hỏng), không phải bản quyền.

### Đổi tên nhân vật — ngoại lệ sửa nguồn MỘT LẦN

Roster lấy từ `approvedCharacterNamePool` trong `lessons.json`:
**田中 · 佐藤 · 伊藤** (+ 先生 là VAI, không phải tên → không đưa vào xoay vòng).

Phạm vi: **CHỈ trường/dòng nhãn người nói.** Lời thoại không đụng.

| file | nhãn đã đổi | dòng trước → sau | sha256 trước → sau |
|---|---:|---|---|
| `topic1.json` | 8.454 | 50.824 → 50.824 ✅ | `6cb6d250b32b` → `f16fe4ed8e8c` |
| `topic2.json` | 8.189 | 49.403 → 49.403 ✅ | `a09e442c579c` → `5e1a81602629` |
| `topic3.json` | 8.449 | 50.407 → 50.407 ✅ | `affbff6a7daf` → `98a05af142f4` |
| `topic4.json` | 8.335 | 50.157 → 50.157 ✅ | `0bc67a1340a7` → `4b735e5b9835` |
| `topic5.json` | 8.310 | 49.952 → 49.952 ✅ | `5b6c24f01c2e` → `e2010415292d` |
| `ban1.txt` | 184 | 12.173 → 12.173 ✅ | `d5ddb2ee6184` → `381719842e68` |

- `topic1-5`: `utterances[].speaker` `A`/`B` → cặp roster, **xoay vòng theo
  hội thoại**: (田中,佐藤) → (佐藤,伊藤) → (伊藤,田中). Nhất quán trong một
  hội thoại. Tổng **41.737 nhãn = đúng tổng số lượt nói** → không sót lượt nào.
- `ban1`: nhãn `Tên:` đầu dòng, gán lại **trong từng khối `Dialogue N`** để hai
  người nói trong cùng khối không trùng tên. **Bỏ qua** `Cue` · `Response` ·
  `PROFESSIONALS` — nhãn bài luyện và chữ bìa, không phải nhân vật (454 dòng
  khớp mẫu nhưng bị loại đúng).
- **Chứng lời thoại không đụng:** hash tập `utterance` sau khi sửa =
  `f8a7611627c85454`, số lượt vẫn 41.737.

**Bản mới là VẬT CHUẨN của cổng** — mọi provenance từ nay trỏ vào bản đã đổi tên.

### ⚠ TÊN NGƯỜI TRONG LỜI THOẠI — owner quyết, CHƯA thay

Quét có hệ thống (mẫu `họ + さん/くん/君`, đã lọc từ thân tộc/nghề nghiệp):

**1.171 lượt · 493 họ khác nhau.**

| | |
|---|---|
| **trong** roster | 佐藤 (61) · 田中 (31) · 伊藤 (4) |
| **ngoài** roster, top 12 | 加藤 (34) · 鈴木 (27) · 山田 (21) · 木村 (12) · 健太 (12) · 小林 (12) · 高橋 (10) · 花屋 (10) · 中村 (10) · 渡辺 (9) · 山本 (9) · 石井 (8) |

> **SỬA LẠI SỐ CỦA CHÍNH TÔI:** lượt trước tôi báo "97 lượt chứa tên người".
> Sai — regex đó dựng từ danh sách tên thấy ở `ban1`, không quét hệ thống.
> Số đúng là **1.171**. Phát hiện khi thấy `加藤さん` trong hội thoại vừa được
> gán nhãn `佐藤`.

Hệ quả: có hội thoại nhãn là 田中/佐藤 nhưng trong câu lại gọi 加藤さん. Lấy
câu ra dùng thì phải xử — nhưng đó là **sửa lời thoại**, ngoài phạm vi ngoại lệ
lần này. Owner quyết lượt sau.

`ban1.txt`: **212 dòng không-phải-nhãn** có chứa tên người (vd dòng 409
`本田さん。`, dòng 530 `スミスです。`) — cùng tình trạng, chưa thay.

### Sửa TÊN-TRONG-CÂU — phương án hẹp, 2026-07-30

**BACKUP TRƯỚC KHI ĐỤNG** (luật mới G14-R13): 6 file copy sang
`local-sources-backup/2026-07-30/`, sha256 bản sao == bản gốc, đã xác minh
từng file. Thư mục đã gitignore.

Chỉ sửa **một loại lỗi**: câu **gọi người đối diện** bằng tên không khớp nhãn
người nghe. Ba luật hình thức, không phán đoán ngữ nghĩa:

| luật | hình thức | thay bằng | số câu |
|---|---|---|---:|
| **a** | hô cách 「<tên>さん、」「<tên>さん。」 | tên NGƯỜI NGHE | **169** |
| **b** | 「<tên>さん + は/も … ですか/ますか」 | tên NGƯỜI NGHE | **224** |
| **c** | tự giới thiệu 「<tên>です」 lệch nhãn người nói | tên NGƯỜI NÓI | **24** |
| | | **TỔNG** | **417** |

Chỉ thay phần **họ**; giữ nguyên `さん・くん・君・ちゃん` và mọi thứ khác.

**Phép chặn dương tính giả:** họ phải được **CHỨNG THỰC** — từng đứng trước
`さん/くん/君/ちゃん` ở đâu đó trong chính kho (491 họ). Bản đầu không có phép
này nên luật (c) nuốt nhầm `大変です`・`了解です`・`元気です` → **đã dừng và
sửa trước khi ghi**. Sau khi có phép: 361 → **24** ca luật (c), đúng.

| file | dòng trước → sau | sha256 trước → sau |
|---|---|---|
| `topic1.json` | 50.824 → 50.824 ✅ | `f16fe4ed8e8c` → `b2fea70225ea` |
| `topic2.json` | 49.403 → 49.403 ✅ | `5e1a81602629` → `8dc37a80f053` |
| `topic3.json` | 50.407 → 50.407 ✅ | `98a05af142f4` → `09db1fd9a832` |
| `topic4.json` | 50.157 → 50.157 ✅ | `4b735e5b9835` → `ce45077354e9` |
| `topic5.json` | 49.952 → 49.952 ✅ | `e2010415292d` → `5aa18bc05518` |

Định dạng giữ nguyên: thụt lề **4**, EOL **LF**, **không** newline cuối file
(đo từ bản gốc trước khi ghi).

**CỜ — không tự sửa:** `scripts/content/sources/ten-lech-nhan.json`
**698 lượt · 462 hội thoại** còn tên lệch nhãn mà 3 luật trên không xử được
(nhắc người thứ ba vắng mặt, cấu trúc lạ). Máy gom chất liệu **bỏ qua** các
hội thoại này — đã ghi vào G14-R3.

Còn lại **5.256 − 462 = 4.794 hội thoại sạch** (91%), vẫn thừa dùng.

`ban1.txt` **không đụng lượt này** — 212 dòng có tên người ở đó nằm ngoài cấu
trúc JSON, luật a/b/c dựng cho trường `utterance` không áp thẳng được.

## Kết luận — một dòng mỗi nguồn

| Nguồn | Kết luận |
|---|---|
| `topic1–5.json` | **LẤP Ô HỘI THOẠI N4–N3** — 5.256 hội thoại, cổng PASS mức 1, trích được `source:line`. Phải viết tay `reading` cho mọi câu lấy ra. **Giấy phép chưa rõ — owner xác minh trước.** |
| `ban1.txt` | Giáo trình A0–A1 sạch, có quy ước nhãn thứ 4 → dùng được cho ô hội thoại sơ cấp. **Owner đã xác nhận 2026-07-30: nội dung owner tự viết** (mục "CẬP NHẬT 2026-07-30" bên dưới) — mục "chờ NonCommercial" ở đây đã LỖI THỜI, sửa 2026-07-31 |
| `ban2.txt` | **BLOCKLIST** — hỏng bóc 55% + bản quyền NHK |

---

# ĐO TRƯỚC KHI VIẾT — m02-u1-l1 「Cảm ơn theo mức độ」 (2026-07-31)

> PHA A của lượt "PUSH + 2 PHA". Chỉ đo, chưa viết bài. Công cụ dùng:
> `scripts/estimate-source-coverage.mjs` (đã có sẵn từ lượt trước, probe đầu
> tiên đúng tên bài này — xác nhận lại bằng `--self-test` trước khi tin số).
> Owner xác nhận 2026-07-30: `topic1-5.json`/`ban1.txt` là nội dung owner tự
> viết, tên nhân vật đã đổi về roster `田中·佐藤·伊藤·先生`.

## A1 — GRAMMARPATTERNS (mẫu liên quan cảm ơn)

Quét `hanabira` (805 file .md ngữ pháp) · `n5_ngu-phap-vi.txt` · `ban1.txt` ·
`topic1-5.json` (bỏ hội thoại trong `ten-lech-nhan.json`, 698 lượt/462 hội
thoại bị cờ).

**hanabira (805 file):** 0 file có TIÊU ĐỀ là mẫu cảm ơn (ありがとう/どうも/
おかげさまで không phải "mẫu ngữ pháp productive" theo cách hanabira phân
loại — chúng chỉ xuất hiện làm VÍ DỤ trong các mẫu khác: `Verb-てくださる`,
`Verb-ていただく`…). Có **1 file thật sự dùng được**: `～おかげで_(〜okagede).md`
— mẫu ngữ pháp 「Verb/Noun+おかげで」 (nhờ có…) + mục riêng cho cụm cố định
「おかげさまで」 với hội thoại mẫu 「A: お元気ですか？ B: おかげさまで、元気で
す。」 — **CHÍNH LÀ** cụm đã dạy ở `ja-daily_life-m01-u2-l1`. Cấu trúc đầy đủ
おかげで/せいで hơi cao so với A1-A2 (ví dụ formal/written dùng thể た+おかげで
phức) — chỉ phần cụm cố định おかげさまで + giải thích register là dùng trực
tiếp được.

**n5_ngu-phap-vi.txt:** 0 mẫu cảm ơn nào (0/41 mục ngữ pháp). 2 lượt
`すみません` (dòng 551, 775) đều là nghĩa "xin lỗi làm phiền để nhờ việc",
KHÔNG phải nghĩa cảm ơn.

**ban1.txt:** đoạn "Offering and Accepting, Thanking" (dòng 374–401) —
khối vựng+giải thích register THẬT, trích nguyên văn:
> "Arigatou (gozaimasu) expresses thanks in general. You should never use
> the short form with your superiors… Doumo expresses gratitude or apology.
> It can also be combined with arigatou gozaimasu ('Thank you very much')
> or sumimasen ('I'm very sorry'). Gozaimashita indicates past and is used
> when the act is completed."

Đây là **quan sát trực tiếp từ nguồn**, không phải suy luận của tôi — ghi lại
để PHA B trích dẫn đúng, không diễn giải thêm (LUẬT CHỐNG BẪY). Kèm 1 hội
thoại mẫu dòng 4981–4991 (伊藤 nói 「あ、どうも。」 sau khi được chỉ đường —
伊藤 nằm trong roster đã duyệt).

**topic1-5.json** (đã lọc `ten-lech-nhan.json`, đếm bằng token thật qua
kuromoji — không phải đếm cụm kanji thô):

| mẫu | lượt khớp | lượt ≤2 từ lạ (vùng B) | từ lạ điển hình | ví dụ 1 từ lạ (=chính mẫu, sẽ hết lạ khi thành thẻ từ vựng) |
|---|---:|---:|---|---|
| どうも (đứng riêng) | 1 | 0 | 悲観,的,ばかり | *(không có câu sạch — dùng ban1 làm nguồn chính)* |
| ありがとう (trần) | 2 | 1 | ありがとう | `topic1.json:589` t8 (佐藤) 「ありがとう。」 |
| ありがとうございます | 934 | 487 | ありがとう | `topic1.json:3` t8 (田中) 「ありがとうございます。」 |
| ありがとうございました | 62 | 31 | ありがとう | `topic1.json:822` t10 (田中) 「ありがとうございました。」 |
| どうもありがとう(ございます/ました) | 49 | 35 | ありがとう | `topic1.json:201` t10 (田中) 「どうもありがとう。」 |
| 助かります/助かりました | 95 | 43 | 助かり | `topic1.json:533` t5 (佐藤) 「助かります。」 |
| 恐れ入ります/恐縮 | 6 | 2 | 恐れ入り + 1 từ khác | `topic3.json:185` t7 (佐藤) 「恐れ入りますが、クレジットカードはお持ちでしょうか？」 (2 lạ: 恐れ入り, クレジットカード) |
| 感謝 | 22 | 1 | 感謝 + ≥1 từ khác | `topic5.json:218` t1 (2 lạ: 勤労感謝の日,贈り物) 「勤労感謝の日に、お父さんに贈り物をしたいです。」 |

**Kết luận A1: 6 mẫu dùng trực tiếp được** (どうも · ありがとう · ありがとう
ございます · ありがとうございました · どうもありがとう · 助かります/まし
た) — trên ngưỡng tối thiểu 4–5, KHÔNG cần dùng điều khoản "số ít hơn".
**恐れ入ります/感謝 để riêng, chỉ hợp "tham khảo thêm"** (§B2b) vì mọi ví dụ
sạch nhất vẫn ≥2 từ lạ, và bối cảnh dùng (khách sạn/thương mại, dịp lễ) lệch
A1-A2 đời thường.

**Đã dạy từ trước (không phải mẫu mới, nhưng CÙNG trục "mức độ cảm ơn"):**
`すみません` (`ja-daily_life-m01-u1-l2`) và `おかげさまで` (`ja-daily_life-
m01-u2-l1`) — `taught-vocabulary.json` xác nhận. Bài mới nên nối tiếp trục
này, không dạy lại.

## A2 — HỘI THOẠI (đo bằng token thật, không phải cụm kanji thô)

Kho sạch (đã bỏ 462 hội thoại bị cờ `ten-lech-nhan.json`): **4.794 hội
thoại**. Hội thoại có ít nhất 1 lượt chứa từ khoá cảm ơn
(ありがとう/どうも/恐れ入り/恐縮/助かり/感謝): **927 hội thoại**.

Với mỗi hội thoại, tìm ĐOẠN LIÊN TIẾP dài nhất mà MỖI lượt ≤2 từ lạ (vùng B)
VÀ đoạn đó chứa ít nhất 1 lượt có từ khoá cảm ơn — phân bố độ dài đoạn:

| độ dài đoạn sạch liên tiếp | số hội thoại |
|---:|---:|
| 0 (không đoạn nào đạt vùng B) | 419 |
| 1 lượt | 242 |
| 2 lượt (**cặp**) | 121 |
| 3 lượt | 56 |
| 4 lượt | 40 |
| 5 lượt | 23 |
| 6 lượt | 10 |
| 7 lượt | 7 |
| 8 lượt | 8 |
| 9 lượt | 1 |

**Cặp 2 lượt sạch:** 121 hội thoại đúng 2, cộng dồn ≥2 = **266 hội thoại**.
**Khối 3–4 lượt sạch:** **96 hội thoại** (56+40).
**Q14 cần ≥4 lượt liên tiếp:** **89 hội thoại đạt** (40+23+10+7+8+1) — CÓ
đoạn đạt, **không cần kích hoạt điều khoản lùi R4**.

Ví dụ khối dài (8 lượt sạch liên tiếp, `topic1.json:3`, chủ đề mời/nhận đồ
uống — rất hợp A1-A2):
```
1. 伊藤: 休憩時間になりましたが、何か飲みますか？
2. 田中: ありがとうございます。何を飲むか考えますね。
3. 伊藤: コーヒーはいかがでしょうか？
4. 田中: コーヒーは苦手です。他の飲み物はありますか？
5. 伊藤: 紅茶もありますよ。
6. 田中: 紅茶は大好きなので、紅茶にします。
7. 伊藤: では、紅茶を入れます。
8. 田中: ありがとうございます。
```
Ví dụ khối 4 lượt (`topic1.json:133`):
```
1. 田中: ロールケーキを買ってきたので、一緒に食べましょう。
2. 佐藤: ありがとうございます。では、私はお茶を入れてきます。
3. 田中: では、いつもの緑茶でお願いします。
4. 佐藤: お母さん、最近いつも緑茶を飲んでいますね。
```
(lượt 4 lệch chủ đề cảm ơn nhưng vẫn sạch vùng B — PHA B tự cân nhắc cắt ở
lượt 3 hay giữ nguyên 4 lượt tuỳ ngữ cảnh cả bài.)

## A2' — ĐO LẠI Ở MỨC KHỐI (owner chốt 2026-07-31, SỬA số ở A2 trên)

**Vì sao đo lại:** bảng A2 ở trên đếm "≤2 từ lạ" **THEO TỪNG LƯỢT** rồi cộng
dồn thành đoạn — một khối 4 lượt có thể mang tới 8 từ lạ KHÁC NHAU (2/lượt ×
4 lượt) trong khi bài chỉ dạy 7 cụm mới (A3). Số "89 hội thoại đạt Q14" ở A2
vì vậy **nới tay hơn thực tế**. Đo lại: với mỗi hội thoại, tìm đoạn liên tiếp
dài nhất mà **UNION từ lạ trên CẢ đoạn** (khử trùng lặp — `もちろん` nhắc 2
lần chỉ tính 1) không vượt ngưỡng. Công cụ: `scripts/estimate-source-
coverage.mjs`, hàm mới `bestQualifyingSpan`/`uniqueUnknownInSpan`. Phá thật
trước khi tin số (`--self-test`), 2 ca mới thêm:

```
── PHÁ THẬT MỨC KHỐI — union từ lạ, không phải cộng theo lượt ──
  OK   ngưỡng≤2, 3 lượt (mỗi lượt 1 từ lạ RIÊNG) -> đoạn dài nhất = 2 lượt [もちろん, コンビニ] (phải DỪNG ở 2, không nhận lượt 3 dù riêng lượt 3 chỉ có 1 từ lạ)
  OK   ngưỡng≤3, cùng 3 lượt -> đoạn dài nhất = 3 lượt [もちろん, コンビニ, パスポート] (phải nhận đủ cả 3, union đúng 3 từ lạ)
  OK   2 lượt cùng nhắc "もちろん", ngưỡng≤1 -> union = [もちろん] (phải khử trùng lặp còn 1, không phải 2 — nếu không cả đoạn sẽ bị từ chối oan)
  => PHÁ THẬT MỨC KHỐI: union đúng, khử trùng lặp đúng, bắt đúng ca đếm-theo-lượt sẽ bỏ sót.
```
Ca 1 chứng minh **FAIL đúng chỗ** (một khối mà mỗi lượt riêng lẻ ≤2 nhưng
UNION cả khối vượt ngưỡng phải bị từ chối — đúng lỗ hổng owner chỉ ra). Ca 2
chứng minh cùng dữ liệu **PASS** khi nới ngưỡng. Ca 3 chứng minh khử trùng
lặp không từ chối oan.

**Kết quả đo thật (927 hội thoại có từ khoá cảm ơn):**

| | ngưỡng ≤2 (union) | ngưỡng ≤3 (union) |
|---|---:|---:|
| phân bố đoạn tốt nhất | 0=419 · 1=378 · 2=112 · 3=12 · 4=6 | 0=265 · 1=408 · 2=182 · 3=51 · 4=17 · 5=3 · 7=1 |
| cặp 2 lượt (đoạn tốt nhất ≥2) | **130 hội thoại** | 254 hội thoại |
| khối 3–4 lượt (đoạn tốt nhất ≥3) | **18 hội thoại** | 72 hội thoại |
| đoạn ≥4 lượt liên tiếp — Q14 | **6 hội thoại** | 21 hội thoại |

So với A2 (đếm theo lượt): "89 hội thoại đạt Q14" **sụp còn 6** ở mức khối
ngưỡng ≤2 — đúng như owner lường trước ("mức khối có thể sụp"). Nhưng 6 vẫn
**≥1**, và 18 vẫn **≥3** — xem A'2 dưới.

Ví dụ đoạn=4 ở ngưỡng ≤2 (`topic1.json:3`, lượt 5–8 — TRÙNG hội thoại dùng
làm ví dụ khối-8-lượt ở A2, nhưng mức khối chỉ nhận **4/8 lượt** của nó,
không phải cả 8, union=[ので, ありがとう]):
```
5. 伊藤: 紅茶もありますよ。
6. 田中: 紅茶は大好きなので、紅茶にします。
7. 伊藤: では、紅茶を入れます。
8. 田中: ありがとうございます。
```
**Ghi rõ để không lẫn hai trích dẫn:** đoạn 8-lượt ở A2 phía trên (lượt 1-8
nguyên khối) đo bằng phép-theo-lượt CŨ; đoạn 4-lượt này (lượt 5-8) đo bằng
UNION mới — cùng một hội thoại nguồn nhưng hai phép đo chọn ra đoạn khác
nhau.

## A'2 — ĐIỀU KIỆN ĐẠT

Ngưỡng cần: **≥3 khối 3–4 lượt** (từ ≥2 hội thoại khác nhau) **VÀ ≥1 đoạn
≥4 lượt** (Q14).

- Ngưỡng ≤2: khối 3-4 = **18** (≥3 ✓, từ 18 hội thoại khác nhau ≥2 ✓) · đoạn
  ≥4 = **6** (≥1 ✓). **CẢ HAI ĐẠT NGAY Ở ≤2 — KHÔNG CẦN NỚI SANG ≤3.**
- Kết luận: **PHA A' ĐẠT.** PHA B dùng ngưỡng ≤2 cho vùng B (§G7), không
  cần lý do nới, không lùi Irodori.

## A3 — TỪ VỰNG (8–10 cụm, đối chiếu taught-vocabulary)

Ứng viên rút từ bảng A1 (đã lọc bỏ 恐れ入ります/感謝 — không hợp A1-A2):

| # | cụm | trạng thái | nguồn |
|---|---|---|---|
| 1 | どうも | MỚI | `ban1.txt`:379-401, hội thoại dòng 4981-4991 |
| 2 | ありがとう | MỚI | `ban1.txt`:387, `topic1.json:589` t8 |
| 3 | ありがとうございます | MỚI | `ban1.txt`:393, `topic1.json:3` t8 (487 lượt sạch topic1-5) |
| 4 | ありがとうございました | MỚI | `ban1.txt`:394, `topic1.json:822` t10 (31 lượt sạch) |
| 5 | どうもありがとうございます | MỚI (ghép 1+3, đã có cả hai mảnh) | `topic1.json:524` t9 |
| 6 | 助かります | MỚI | `topic1.json:533` t5, `topic3.json:7` t5 |
| 7 | 助かりました | MỚI (quá khứ của #6, cùng trục thời của #3/#4) | `topic1.json:1049` t4 |
| 8 | すみません | **ĐÃ DẠY** (`ja-daily_life-m01-u1-l2`) — cross-ref, không tính từ mới | — |
| 9 | おかげさまで | **ĐÃ DẠY** (`ja-daily_life-m01-u2-l1`) — cross-ref, không tính từ mới | — |

→ **7 cụm MỚI** (#1–7, đúng khoảng 8–10 nếu tính cả 2 cụm cross-ref #8–9 làm
phần ôn — PHA B cân nhắc đưa #8/#9 vào `vocabularyReferences`/reviews thay vì
thẻ từ vựng chính, vì đã có thẻ riêng ở bài trước). Quyết định cuối (thẻ nào
là 8 thẻ chính) để owner duyệt trên preview theo đúng A4 dưới.

## A4 — CAN-DO ĐỀ XUẤT (đưa vào CẦN MẮT NGƯỜI)

Suy từ tiêu đề owner chốt "Cảm ơn theo mức độ" + trục register/thời quan sát
được ở A1 (ban1.txt: gozaimasu=lịch sự chung, gozaimashita=việc đã xong,
doumo=thân mật/ghép nhấn mạnh):

- **vi:** "Cảm ơn đúng mức độ lịch sự — từ どうも thân mật tới ありがとうご
  ざいました khi việc đã xong."
- **en:** "Say thank you at the right level of politeness — from casual
  どうも to ありがとうございました once something is finished."
- **ja:** 「丁寧さのレベルに合わせてお礼を言うことができる — 気軽な「どうも」
  から、済んだことへの「ありがとうございました」まで。」

**CẦN MẮT NGƯỜI — mục 1:** can-do trên là ĐỀ XUẤT dựa trên chất liệu đo được,
chưa phải quyết định sản phẩm. Owner duyệt trên trang preview HTML ở PHA B.

## Vướng mắc PHA A

- `恐れ入ります`/`感謝` đo được nhưng KHÔNG đề xuất vào 8-10 từ chính (độ khó/
  bối cảnh lệch A1-A2) — nếu owner muốn dùng, cần nguồn ví dụ đơn giản hơn
  hoặc đưa vào "tham khảo thêm" thay vì thẻ chính.
- **[ĐÃ SỬA 2026-07-31]** `ban1.txt` từng ở trạng thái "CHỜ owner quyết điều
  khoản NonCommercial" theo `ja.md`/INVENTORY mục 6 — owner đã xác nhận "nội
  dung owner tự viết" 2026-07-30 (mục "CẬP NHẬT 2026-07-30" phía trên) nên
  coi là đã giải; dòng kết luận đầu file (mục "Kết luận — một dòng mỗi
  nguồn") đã cập nhật khớp. `ja.md` mục 6 (đường dẫn LS-11 gốc) CHƯA sửa
  theo — ghi vào LÀM SAU, ngoài phạm vi lượt sửa INVENTORY.md này.

> Mỗi mục: **việc** · **vì sao hoãn**. Thấy lỗi ngoài phạm vi lượt đang làm
> thì ghi vào đây, không tự sửa (WORKING_RULES §1).

## Bảng ngắn — 11 mục đang treo

| # | Việc | Vì sao hoãn |
|---|---|---|
| LS-1 | Đem lối hiển thị 3 dòng + wakachigaki + công tắc lên app thật | Chi tiết ở mục dưới; cần chốt cách cắt okurigana trước |
| LS-2 | **Ruby (kana trên đầu kanji) cho app** | Owner đã BỎ lối ruby ở trang duyệt 2026-07-29; nếu sau này muốn cho app thì là quyết định sản phẩm mới, không phải việc kỹ thuật còn dở |
| LS-3 | **Dùng kuromoji cho bộ lọc R5** (lọc vốn từ chưa dạy) — **ÁP MỘT PHẦN 2026-07-30** | `scripts/estimate-source-coverage.mjs` nay dùng kuromoji thật để ƯỚC LƯỢNG phủ nguồn TRƯỚC KHI build (đoán để LỌC — không sinh nội dung gì, chỉ xếp loại câu ứng viên cho người viết chọn). Ranh giới GIỮ NGUYÊN ở chỗ owner lo: cổng THẬT lúc build bài (`verify-provenance.mjs`, G14-R5 lúc soạn) **vẫn** so chuỗi tay, không tự động chấm bằng kuromoji — việc đó vẫn treo |
| LS-4 | **Cổng đổi so-substring → khớp cả dòng** | `verify-provenance` đang tìm chuỗi con trong dòng nguồn; khớp cả dòng chặt hơn nhưng sẽ FAIL hàng loạt câu đang PASS — cần một lượt riêng để rà từng ca |
| LS-5 | **`Flashcard.tsx` còn vẽ chuỗi Nhật trần** | Màn Flashcards không thuộc 5 thẻ bài học, nằm ngoài phạm vi mọi lượt G14-R14 đã làm |
| LS-6 | **Hàng "Đọc" trong thẻ từ vựng không theo công tắc** | Luôn hiện khi mở thẻ; không mất trợ đọc nên không phải lỗi, nhưng lệch cơ chế bật/tắt — cần owner quyết có gom vào công tắc không |
| LS-7 | **`lessonLevel` chết trong `ReadingAidScope`** (Flutter) | Từ 2026-07-30 gate theo ngôn ngữ, không theo cấp; trường này còn trong scope nhưng không ai dùng để quyết định gì. Dọn được, chỉ là rác |
| LS-8 | **Romaji câu dài dính** — `donoguraininarimasuka?` | Khối wakachigaki gộp `どのぐらいになりますか` thành một khối vì bảng trợ từ đóng không tách được `に` nằm giữa. Đúng luật đã chốt; muốn thoáng hơn phải mở bảng hoặc dùng bộ tách từ |
| LS-9 | **Tên 2 file 敬語 trong `local-sources/ja/keigo/`** | Tên file không nói rõ nội dung; đổi tên cần owner cấp phép từng lần + sha256 trước/sau (G14-R13) |
| LS-10 | **`sentences_*.json` mở lại từ N4** | Đã đo có 5.281 câu / 1.039 khoá, nhưng bài hiện tại còn ở N5; mở sớm sẽ kéo từ chưa dạy vào (§G7) |
| **LS-12** | **Rà 19 khoản FROZEN còn lại của `rules/languages/ja/`** — `register_taxonomy` · `honorifics_keigo` · `forms_of_address` · `tts_audio_policy` · `answer_acceptance_ja` · `naturalness_translation` · `romanization_hepburn` · `pronunciation_contextual`… đối chiếu G14, tìm xung đột **khác kiểu** `reading_aid_policy` | `reading_aid_policy` (D-11) đã lộ ra là mâu thuẫn với G14-R14 và phải supersede bằng D-93. Nhiều khả năng còn khoản khác cùng cảnh. **CHƯA rà lượt này theo yêu cầu owner** — cần một lượt riêng, đơn nhiệm |
| **LS-11** | **Màn "Nguồn & Ghi công"** — JMdict/EDRDG · hanabira · Tanos | **BẮT BUỘC TRƯỚC PHÁT HÀNH.** Nguồn owner đã đóng chủ đề nguồn gốc, nhưng ba bộ dữ liệu BÊN THỨ BA này vẫn còn dùng (cách đọc, vốn từ JLPT) và giấy phép của chúng đòi ghi công. Chưa làm vì chưa tới mốc phát hành — nhưng **không được quên**, thiếu là vi phạm giấy phép |
| **LS-13** | **`check-build-order.mjs` (G14-R16) nối thành cổng cứng** | **RÀ LẠI 2026-07-30 (cùng ngày):** điều kiện trigger ban đầu đã hết — `ja-daily_life-m01-u2` giờ CÓ bài tổng hợp (18 câu, commit cùng lượt). `check-build-order` hiện báo `TỔNG: 0 vi phạm` cho MỌI unit. Việc "nối thành cổng cứng" bản thân nó vẫn CHƯA làm (chưa ai được yêu cầu bật) — giữ report-only tới khi owner giao riêng |
| **LS-14** | **`validateUnitComprehensiveTest` im lặng cho qua unit thiếu bài tổng hợp** | `validate-curriculum.mjs:1136` — `if (!test) return;` không phân biệt "unit chưa tới lượt" với "unit ĐỦ ĐIỀU KIỆN mà vẫn thiếu". Cùng họ lỗi đã vá ở `check-render-coverage.mjs`. Sửa: in CẢNH BÁO (không fail) khi đủ điều kiện mà thiếu — tách biệt khỏi việc bật cổng cứng ở LS-13 |
| **LS-15** | **`preview-lesson.mjs` không hỗ trợ Unit Comprehensive Test** | Script chỉ đọc `lessons.json` cấp Lesson (five_cards); bài tổng hợp sống ở `courses.json` cấp Unit, hình dạng hoàn toàn khác (segments/blanks/options/dialogue turns). G14-R15 đòi "mọi lượt sửa nội dung kết thúc bằng trang duyệt" nhưng công cụ chưa làm được cho loại này — lượt build m01-u2 (2026-07-30) phải dùng dump text STOPGAP ra Desktop thay vì trang HTML thật |


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

---

# ĐO TRƯỚC KHI VIẾT — m02-u1-l2 「Đáp khi được cảm ơn」 (2026-08-02)

> PHA A của lệnh `/build-lesson m02-u1-l2` — lần chạy thật đầu tiên của lệnh
> này. Áp luật CÂN NGUỒN mới (G14-R3b, owner chốt 2026-08-01) — quét MỌI
> nguồn trong kho, không xếp thứ tự ưu tiên. Kết quả máy đọc đầy đủ:
> `scripts/content/sources/scan/ja-daily_life-m02-u1-l2.scan.json` (22 nguồn,
> 14 coHang=true, 8 coHang=false — mỗi dòng kèm cách quét).
>
> Chủ đề đã có sẵn từ blueprint (`shared/generated/lessons.json`, KHÔNG tự
> đặt): `titleVi: "Đáp khi được cảm ơn"`, `titleByNative.ja:
> "お礼を言われたときの返事"` — khớp tên unit `ja-daily_life-m02-u1: "Cảm ơn &
> đáp lại"` (l1 dạy cảm ơn, l2 dạy đáp lại).

## B1 — CÂN NGUỒN: hai bug tooling lộ ra khi quét thật

1. **`walk()` trong script quét nguồn của lượt này tự viết** — truyền mảng
   đuôi file rỗng `[]` để nghĩa là "khớp mọi file", nhưng
   `[].some(...)` luôn `false` nên **0 file nào được nhận** — hanabira
   grammar-json/Tanos-json bị bỏ sót hoàn toàn ở lượt quét đầu. Phát hiện nhờ
   `find` xác nhận file có thật (10 file) mà script báo "0 file". Đã sửa
   (script tạm, không phải file trong repo) và quét lại tay bằng grep trực
   tiếp — kết quả đã vào `scan.json`.
2. **`taught-vocabulary.json` cũ, thiếu `ja-daily_life-m02-u1-l1`** —
   `_order.ja` dừng ở `m01-u2-l2`; bài m02-u1-l1 (build 2026-07-31) chưa bao
   giờ được "nối" vào sổ (G14-R11 nói máy đọc từ `lessons.json`, có script
   `scripts/build-taught-vocabulary.mjs` nhưng KHÔNG ai chạy lại sau khi build
   m02-u1-l1). Hậu quả: bộ đo mức-khối coi cả `ありがとう`/`ありがとうございます`
   là "từ lạ" — sai, vì đó là từ đã dạy ngay bài liền trước. Đã chạy
   `node scripts/build-taught-vocabulary.mjs` (26 bài · 141 cụm, có
   `m02-u1-l1`), đo lại toàn bộ sau khi sửa. Đây là bug **có thật, tái diễn**
   — comment trong chính script ghi nhận nó đã xảy ra một lần trước
   (thiếu u2-l2), giờ lặp lại với m02-u1-l1. **Đề xuất cho báo cáo cuối:**
   thêm bước "chạy `build-taught-vocabulary.mjs`" vào cổng bắt buộc của PHA B
   trong `/build-lesson`, để không lặp lần thứ ba.

## B2 — grammarPatterns (mẫu thật, có nguồn)

| Mẫu | Nguồn | Trích |
|---|---|---|
| とんでもない ↔ とんでもないです／とんでもございません (register) | 敬語の指針 `New Tài liệu văn bản.txt:2243-2251` (văn bản CHÍNH THỨC của 文化審議会答申) | "とんでもございません（とんでもありません）は…" · "とんでもない」を丁寧にするためには「とんでもないです」「とんでもないことでございます」…にすれば良い" |
| 気にしないでください (câu nguyên, không tách được casual/polite vì KHÔNG tìm thấy dạng で trần) | topic1.json:4791 · topic2.json:29139 · topic4.json:23465 (nhiều, nhất quán) | "気にしないでください。" |
| お役に立てて良かったです／幸いです (đáp khi được cảm ơn vì đã giúp) | topic1.json:5313 · topic2.json:26909 | "お役に立てて幸いです。" · "お役に立てて良かったです。" |

**Đã quét, không có:** dạng 気にしないで **trần** (không kèm ください) — 12/12
lượt khớp trong topic1-5.json đều có ください đi kèm. Không dựng được cặp
casual/polite cho mẫu này từ nguồn hiện có.

## B3 — Hội thoại MỨC KHỐI — kết quả có SẮC THÁI, cần owner đọc kỹ

Công cụ đo (`node scripts/estimate-source-coverage.mjs`, đã tổng quát hoá
`blockLevelReport` — trước chỉ chạy được cho m02-u1-l1, giờ nhận `label` +
`keywordRe` bất kỳ, phá thật lại 3 ca cũ xanh, số m02-u1-l1 KHÔNG đổi sau khi
tổng quát hoá — xem `--self-test`).

**Từ khoá dùng:** `どういたしまして|こちらこそ|お役に立て|とんでもな|いえいえ`
(4 cụm gốc trong `PROBES` + `いえいえ` bổ sung — cụm này vắng mặt ở bản gốc
dù có nhiều ví dụ sạch nhất trong kho, xem B3c).

**Số máy đo (union từ lạ, khử trùng lặp):**

| ngưỡng | khối 3-4 lượt (cần ≥3) | đoạn ≥4 lượt cho Q14 (cần ≥1) |
|---|---|---|
| ≤2 (mặc định) | **2** — KHÔNG ĐẠT | **1** — ĐẠT |
| ≤3 (nới) | **4** — ĐẠT | **2** — ĐẠT |

**B3a — Đọc kỹ 4 khối ở ngưỡng ≤3, không chỉ đếm số:**

1. **topic2.json:575, 4 lượt** — SẠCH, ĐÚNG TRỌNG TÂM: すみません→見つけました
   (đã giúp tìm đồ)→どうもありがとうございます→**どういたしまして**. Mẫu hội
   thoại "giúp → được cảm ơn → đáp どういたしまして" gần như giáo khoa.
2. **topic3.json:31, 5 lượt (đoạn≥4 mẫu)** — SẠCH, ĐÚNG TRỌNG TÂM, và có mối
   nối đặc biệt: đây là **CÙNG hội thoại** đã dùng cho Q14 của m02-u1-l1
   (cùng cảnh 田中/佐藤 chụp ảnh ở Hachiko, xem
   `ja-unit1-lesson1-m02.mjs` dòng 210-219) — lượt kế tiếp NGAY SAU đoạn đã
   dùng là 佐藤「どういたしまして。」. Có thể nối tiếp thành một mạch chuyện.
3. **topic2.json:628, 3 lượt** — `こちらこそ` nhưng KHÔNG phải đáp lời cảm ơn
   trực tiếp: 田中「十分です。ぜひお願いしたいです。」→佐藤「分かりました。
   よろしくお願いします。」→田中「ありがとうございます。**こちらこそ**よろし
   くお願いします。」 — đây là cặp よろしくお願いします hai chiều (giống cách
   Golden L1 đã dạy こちらこそ), không phải "được cảm ơn rồi đáp lại".
4. **topic5.json:105, 3 lượt** — cùng vấn đề: あけましておめでとう…よろしく
   お願いいたします→田中「**こちらこそ**、よろしくお願いいたします。」 — lời
   chúc Tết + よろしくお願いします hai chiều, không phải đáp lễ cảm ơn.

**B3b — Vì sao (3) và (4) không hẳn sai, chỉ KHÔNG PHẢI bằng chứng "đáp lễ
cảm ơn":** Irodori (`IRODORI_So_cap_1_A2.md:23241`) dạy こちらこそ trong đúng
khuôn 「…お世話になっています」→「こちらこそ」, kèm chú giải sách giáo khoa
**"相手にあいさつや感謝のことばを返す"** (đáp lại lời chào/lời cảm ơn của đối
phương) — tức こちらこそ đúng là một cách "đáp lễ" theo nghĩa RỘNG (đáp lại
thiện ý/ơn nghĩa nói chung), nhưng (3)/(4) không mang dạng lời CẢM ƠN trực
tiếp (ありがとう) làm lượt trước — chúng là dạng よろしくお願いします. Dùng làm
Q14/dialogueGroup cho lesson này có nguy cơ **trùng lặp** với cách Golden L1
đã dạy こちらこそ (chào hỏi/nhờ vả), không dạy được KHÍA CẠNH MỚI (đáp lễ khi
được cảm ơn trực tiếp) — trừ khi đóng khung rõ là "cách dùng khác của từ đã
học" (mẫu §B2b, như おかげさまで/すみません ở m02-u1-l1).

**B3c — いえいえ: giàu nhất nhưng chỉ ra cặp 2 lượt, không ra khối 3-4:**
Bổ sung いえいえ vào từ khoá làm số hội thoại khớp tăng 59→66, nhưng KHÔNG
thêm khối 3-4 lượt nào (mọi cặp ありがとうございます→いえいえ đều đúng 2 lượt,
lượt sau đó chuyển chủ đề). Ví dụ sạch nhất: 「それは助かります。どうもありが
とうございます。」→「**いえいえ**、お安い御用ですよ。」(topic2.json, dialogue
502) và 「いえいえ、とんでもありません。」(topic2.json, dialogue 515 — kết hợp
いえいえ + とんでも trong một câu). Nguyên liệu tốt cho **matching/dialogue_fill
2 lượt** (như Q3/Q5 kiểu m02-u1-l1), không đủ cho dialogueGroup 3-4 lượt hay
Q14.

**B3d — Kết luận đo (KHÔNG tự quyết):**
- Ở ngưỡng mặc định ≤2: **KHÔNG ĐẠT** "≥3 khối" (chỉ 2), dù đạt "≥1 đoạn≥4".
- Ở ngưỡng ≤3 (cần nới + ghi lý do — chủ đề hẹp hơn "cảm ơn" nói chung: 66/4794
  hội thoại khớp so với 927/4794 của m02-u1-l1): đạt cả hai số, nhưng **chỉ
  2/4 khối là bằng chứng sạch, đúng trọng tâm** (topic2:575, topic3:31) — 2/4
  còn lại (topic2:628, topic5:105) là こちらこそ ở nghĩa khác đã dạy.

## B4 — Từ vựng mới (đối chiếu taught-vocabulary.json SAU khi vá — 141 cụm)

| Cụm | Trạng thái |
|---|---|
| どういたしまして | MỚI |
| いえいえ | MỚI |
| とんでもない (+ biến thể register とんでもないです／とんでもございません) | MỚI |
| 気にしないでください | MỚI |
| お役に立てて良かったです | MỚI |
| こちらこそ | **ĐÃ DẠY** (Golden L1) — nếu dùng, phải đóng khung "cách dùng MỚI" như B3b nói, không tính vào ngân sách từ mới |

**5 cụm mới cốt lõi** (+ 1 cách-dùng-mới của từ cũ nếu owner duyệt hướng
B3b) — trong khoảng 8-10 của G14-R3b, còn dư chỗ cho biến thể register nếu
tách とんでもない thành nhiều thẻ như m02-u1-l1 đã làm với ありがとう.

## B5 — Can-do đề xuất (CẦN MẮT NGƯỜI mục 1)

**Tên bài:** Đáp khi được cảm ơn (お礼を言われたときの返事) — khớp blueprint có
sẵn, không tự đặt.

**Mục tiêu đề xuất** (theo mẫu u2-l1, dựa đúng cụm đã xác nhận có nguồn ở B2):

- Đáp lại lời cảm ơn một cách lịch sự bằng どういたしまして.
- Đáp lại lời cảm ơn một cách thân mật, giản dị bằng いえいえ.
- Khiêm tốn từ chối lời cảm ơn/khen ngợi bằng とんでもない／とんでもないです／
  とんでもございません.
- Trấn an người khác rằng không cần bận tâm bằng 気にしないでください.
- Bày tỏ vui vì đã giúp được bằng お役に立てて良かったです／幸いです.
- *(Tuỳ owner chọn B3b)* Dùng こちらこそ như một cách đáp lễ khi ai đó bày tỏ
  thiện ý/biết ơn với mình — cách dùng khác của từ đã học ở bài chào hỏi.

## CẦN MẮT NGƯỜI — owner quyết trước khi sang PHA B

1. **Can-do ở B5** — duyệt/sửa tên bài + mục tiêu.
2. **Ngưỡng hội thoại (B3d)** — chọn:
   - (A) Chấp nhận nới lên ≤3, dùng cả 4 khối kể cả 2 khối こちảnh こそ "lệch
     trọng tâm" (đóng khung theo B3b, dạy こちらこそ như cách dùng mới), hoặc
   - (B) Chỉ dùng 2 khối sạch tuyệt đối (topic2:575, topic3:31) làm
     dialogueGroups + Q14, bỏ こちらこそ ra khỏi Q14/dialogueGroup (vẫn có thể
     giữ trong vocabularyReferences như m02-u1-l1 đã làm với すみません/
     おかげさまで), chấp nhận PHA B chỉ có 2 khối 3+ lượt thay vì 3 theo cấu
     hình mặc định G14-R3b (cần owner xác nhận ngoại lệ số lượng).
3. **Bug tooling B1.2** (taught-vocabulary.json không tự cập nhật) — đề xuất
   thêm bước `node scripts/build-taught-vocabulary.mjs` vào cổng PHA B của
   `/build-lesson` để không tái diễn lần ba.

---

# ĐO TRƯỚC KHI VIẾT — m02-u2-l1 (2026-08-05)

Chủ đề blueprint: "Xin lỗi & xin phép" (Apologize & Ask Permission,
謝ることと許可を求めること). Cấu hình A owner chốt cho bài này: **8-10 thẻ từ
vựng NGAY TỪ ĐẦU** (rút kinh nghiệm m02-u1-l2 chỉ có 6, phải sửa sau).

## Cân nguồn (bước 1) — xem `scripts/content/sources/scan/ja-daily_life-m02-u2-l1.scan.json`

14 nguồn đã quét, `coHang=true` ở 11/14 (3 nguồn 0 hàng: New Tài liệu văn bản.txt
— có khớp nhưng SAI SẮC THÁI [thể xin phép dùng để NHỜ VẢ gián tiếp, không phải
"xin phép cho chính mình"]; N5 Grammar Master PDF — chỉ xuất hiện trong ví dụ
của điểm ngữ pháp khác; JMdict — CLOSED_FACT, chưa cần tra).

## Đo hội thoại mức khối (bước 3) — 10 từ chính coi là "đã biết" khi đo

Đã thử ~12 ứng viên hội thoại (topic1-5.json, lọc qua ten-lech-nhan.json).
Hầu hết KHÔNG đạt ≤6 từ lạ/khối trong phạm vi 4-6 lượt (domain vocabulary quá
rộng — nồi chiên, phòng gym, thư viện...). **3 khối đạt, đều đúng 4 lượt (mức
trần của giới hạn, không nới thêm được vì nguồn xung quanh vượt ≤6 ngay lượt
kế tiếp — đã thử cả hai hướng nới lui/nới tới cho từng khối):**

| khối | nguồn | lượt | từ lạ (union) | chủ đề/vai vế |
|---|---|---|---|---|
| 1 — xin lỗi lịch sự | topic4.json:812, turns 1-4 (dòng 37769-37784) | 4 | 5 (お出かけ,キャンセル,楽しみ,のに,具合) | 佐藤 huỷ hẹn vì mệt, 伊藤 hỏi thăm — lịch sự, chưa rõ thân sơ |
| 2 — xin phép lịch sự | topic5.json:186, turns 3-6 (dòng 7486-7501) | 4 | 4 (系統,紺色,着,室) | 伊藤 (khách) xin phép thử áo, 田中 (nhân viên) đồng ý — khách hàng/nhân viên |
| 3 — xin phép thân mật | topic5.json:821, turns 2-5 (dòng 38566-38581) | 4 | 5 (拾っ,貝殻,カ所,寂しい,ので) | 伊藤 xin phép 佐藤 (bố, xưng "お父さん") gắn vỏ sò trang trí — gia đình, thân mật |

**Tổng từ lạ toàn bài (union 3 khối, khử trùng lặp): 14** — trần 1,5×10 = 15,
còn dư 1. ≥1 đoạn ≥4 lượt cho Q14: cả 3 khối đều đạt (chọn khối dài nhất/nhiều
chất liệu nhất khi build Q14 ở PHA B).

**ĐIỀU KIỆN ĐẠT (owner chốt 2026-08-02): ĐẠT** — 3 khối 4-6 lượt (đúng 4/4/4)
từ 2 hội thoại nguồn khác nhau (topic4, topic5 — thực ra 3 dialogue_id khác
nhau: 812/186/821) ✓, có đoạn ≥4 lượt cho Q14 ✓.

## Đo từ vựng (bước 5) — 10 từ chính, đối chiếu taught-vocabulary.json

Kiểm `すみません,ごめんなさい,ごめん,申し訳ありません,申し訳ございません,
てもいいですか,てもよろしいですか,もちろん,大丈夫,構いません,いいですか`:
CHỈ すみません đã dạy (m02-u1-l1, vocabularyReferences, nghĩa "cảm ơn vì làm
phiền" — KHÁC nghĩa "xin lỗi" ở bài này, có thể tính "cách dùng mới" nếu dùng
lại, nhưng bài này CHỌN không dùng lại để giữ đơn giản). 10 từ còn lại đều MỚI:

1. **ごめんなさい** (xin lỗi, thân mật) — verbatim `topic1.json:12` turn 7 (ごomenなさい、今度からは気を付けます) hoặc `ban1.txt:447` (mục từ)
2. **申し訳ありません** (xin lỗi, lịch sự) — verbatim `topic4.json:812` turn 1 (khối 1)
3. **申し訳ございません** (xin lỗi, rất lịch sự) — verbatim `topic3.json:213`, dòng 9382 (大変申し訳ございませんでした)
4. **てもいいですか** (xin phép, trung tính) — verbatim `n5/n5_ngu-phap-vi.txt:192` + `ban1.txt:11355` (写真、撮ってもいいですか)
5. **てもよろしいですか** (xin phép, lịch sự hơn) — verbatim `topic5.json:186` turn 5 (khối 2)
6. **もちろんです** (đồng ý, "tất nhiên") — verbatim `topic5.json:186` turn 6 (khối 2)
7. **大丈夫です** (đồng ý/trấn an, "được mà") — verbatim `topic4.json:77` turn 7, dòng 2954
8. **構いません** (đồng ý, "không sao") — verbatim `topic5.json:821` turn 6, dòng 38586
9. **仕方ありません** (trấn an/thông cảm, "không sao đâu, chuyện đó chịu thôi") — verbatim `topic4.json:812` turn 4 (khối 1) — ĐỒNG THỜI làm giảm từ lạ khối 1 (từ 6 xuống 5) vì chính chuỗi này xuất hiện trong khối
10. **気を付けます** (hứa cẩn thận hơn, follow-up sau lời xin lỗi) — verbatim `topic2.json:1039` turn 8, dòng 48495 (ごめんなさい。次から気を付けます。)

Chọn TỪ ĐANG DÙNG TRONG 3 KHỐI làm ưu tiên đầu (giống bài học rút ra từ
m02-u1-l2: nâng từ lạ trong hội thoại lên thành thẻ chính vừa tăng thẻ vừa hạ
trần) — 4/10 từ (2,4[một phần],5,6,9) đã trực tiếp nằm trong 3 khối.

## Grammar patterns (bước 2)

- **てもいいですか / てはいけません** — `n5/n5_ngu-phap-vi.txt` dòng 191-207,
  cặp hỏi-xin phép/cấm, có 6 ví dụ nguyên văn tiếng Nhật + dịch Việt sẵn, và
  mẫu đáp lại 「はい、いいですよ」／「いいえ、いけませんよ」／「いいえ、だめですよ」.
- **てもいいですか ↔ てもよろしいですか** (register) — bảng 4 tầng lịch sự
  trong `hanabira.../～てもいい_(〜temo_ii).md` dòng 92-97 (casual/polite/
  formal polite/very formal), dùng làm khung giải thích — KHÔNG dùng phần
  "Comparative Analysis" của New Tài liệu văn bản.txt (sắc thái khác, xem
  scan.json).
- **ごめんなさい ↔ 申し訳ありません ↔ 申し訳ございません** (register 3 tầng) —
  quan sát được: `ban1.txt:443-450` mô tả ごめん/ごめんなさい là "casual"; 申し
  訳ありません/ございません xuất hiện nhất quán trong ngữ cảnh dịch vụ khách
  hàng/nơi làm việc/cấp trên trên khắp topic1-4.json (hàng chục lượt).

## B — Can-do đề xuất (CẦN MẮT NGƯỜI mục 1)

**Tên bài:** Xin lỗi & xin phép (謝ることと許可を求めること) — khớp blueprint.

**Mục tiêu đề xuất:**
- Xin lỗi thân mật bằng ごめんなさい.
- Xin lỗi lịch sự bằng 申し訳ありません／申し訳ございません.
- Xin phép làm việc gì đó bằng ～てもいいですか／～てもよろしいですか.
- Đồng ý cho phép bằng もちろんです／大丈夫です／構いません.
- Trấn an/thông cảm khi ai đó gặp chuyện không hay bằng 仕方ありません.
- Hứa sẽ cẩn thận hơn sau khi xin lỗi bằng 気を付けます.

# ĐO TRƯỚC KHI VIẾT — m02-u2-l2 (2026-08-05)

Chủ đề blueprint: "Nhờ ai đó việc nhỏ" (Ask Someone for a Small Favor,
ちょっとしたお願いをする). Cấu hình A owner chốt: 8-10 thẻ từ vựng NGAY TỪ ĐẦU.

## Cân nguồn (bước 1) — xem `scripts/content/sources/scan/ja-daily_life-m02-u2-l2.scan.json`

14 nguồn đã quét, `coHang=true` ở 12/14 (2 nguồn 0 hàng: New Tài liệu văn
bản.txt — có khớp nhưng là lý thuyết 敬語の指針 nâng cao, không phải hội
thoại/mẫu câu A0-A1; N5 Grammar Master PDF — 0 khớp).

## Đo hội thoại mức khối (bước 3) — sửa `estimate-source-coverage.mjs` thêm
entry chủ đề mới (`m02-u2-l2 · Nhờ ai đó việc nhỏ`, keyword
`てもらえ|ていただけ|てくれ(ない|ません)`), phá thật lại `--self-test` — XANH
(3 ca test cũ dùng もちろんです làm "từ chắc chắn chưa dạy" đã LỖI THỜI vì
もちろん nay đã dạy thật ở m02-u2-l1; đổi từ mẫu sang ホッチキス — từ chắc chắn
không bao giờ được dạy trong khoá lịch sự/xã giao — 3 ca lại xanh).

10 từ chính coi là "đã biết" khi đo. **3 khối đạt, đều 4 lượt:**

| khối | nguồn | lượt | từ lạ (union) | chủ đề/vai vế |
|---|---|---|---|---|
| 1 — nhờ vả lịch sự | topic2.json:378, turns 5-8 (dòng 16467-16482) | 4 | 3 (曲,本当,もらえ) | 伊藤 mượn đĩa CD của 田中, đồng nghiệp/bạn — lịch sự, tái dùng 助かります đã dạy ở m02-u1-l1 |
| 2 — nhờ vả rất lịch sự | topic1.json:882, turns 5-8 (dòng 41314-41329) | 4 | 5 (造り,いただけ,汁,思い,かしこまり) | khách (伊藤) nhờ nhân viên cá (田中) làm sashimi — khách hàng/dịch vụ |
| 3 — nhờ vả thân mật | topic1.json:839, turns 1-4 (dòng 39245-39260) | 4 | 5 (梅酒,づくり,手伝っ,くれ,ば) | 佐藤 nhờ 伊藤 giúp làm rượu mơ — bạn bè, thân mật, tái dùng もちろんです đã dạy ở m02-u2-l1 |

**Tổng từ lạ toàn bài (union 3 khối, khử trùng lặp): 13** — trần 1,5×10 = 15,
còn dư 2. ≥1 đoạn ≥4 lượt cho Q14: cả 3 khối đều đạt (4/4/4).

**ĐIỀU KIỆN ĐẠT (owner chốt 2026-08-02): ĐẠT** — 3 khối 4-6 lượt (đúng 4/4/4)
từ 2 hội thoại nguồn khác nhau (topic1, topic2 — 3 dialogue_id khác nhau:
378/882/839) ✓, có đoạn ≥4 lượt cho Q14 ✓.

**Đoạn dài nhất đo được** (không chỉ đoạn vừa đủ ngưỡng, G14-R3b PHA A bước 4):
- Khối 1 (topic2:378): thử nới lên turns 4-8 (5 lượt) → union tăng lên
  (thêm 4曲分/既に/用意/できて từ turn 4) — vượt trần dư còn lại nếu cộng cả 3
  khối; giữ 4 lượt (đã đo, đủ ≥4 cho Q14, không cần dài hơn).
- Khối 2 (topic1:882): turns 4-8 (5 lượt, thêm turn 4 田中 "毎度ありがとう
  ございます。何枚かにおろしますか？") đo union = 8 từ lạ — vượt ≤6; giữ 4
  lượt (turns 5-8).
- Khối 3 (topic1:839): dialogue chỉ có 6 lượt; turns 1-6 (cả bài) đo union =
  9 từ lạ — vượt ≤6 vì turn 5 thêm 3 từ lạ specific (ウメ,実,ようじ); giữ 4
  lượt (turns 1-4), dừng ở câu hỏi mở "もちろんです。何をすればよいのですか？"
  (giống cách khối 1 m02-u2-l1 dừng ở câu hỏi mở).

## Đo từ vựng (bước 5) — 10 từ chính, đối chiếu taught-vocabulary.json

Kiểm `もらえ,いただけ,くれ,かしこまりました,了解しました,よいですよ,本当ですか,
お願いします,貸す,手伝う`: `もちろんです` và `助かります` đã dạy (m02-u2-l1 /
m02-u1-l1) — CHỌN KHÔNG tính vào 10 từ mới, chỉ tái dùng trong hội thoại
(đúng bài học rút ra từ m02-u1-l2: giảm từ lạ bằng cách tái dùng từ đã dạy).
10 từ còn lại đều MỚI:

1. **～てもらえませんか** (nhờ vả, lịch sự) — verbatim `topic2.json:378` turn 6
   (khối 1, dòng 16472: 貸してもらえませんか？)
2. **～ていただけますか** (nhờ vả, rất lịch sự) — verbatim `topic1.json:882`
   turn 5 (khối 2, dòng 41314: お造りにしていただけますか？)
3. **～てくれませんか** (nhờ vả, thân mật) — verbatim `topic1.json:839` turn 3
   (khối 3, dòng 39255: 梅酒づくりを手伝ってくれませんか？)
4. **かしこまりました** (đồng ý giúp, rất lịch sự — dịch vụ) — verbatim
   `topic1.json:882` turn 8, dòng 41329
5. **了解しました** (đồng ý giúp, thân mật/thông thường) — verbatim
   `topic1.json:839` turn 6, dòng 39270 (không nằm trong khối 3 đã chọn —
   trích riêng làm ví dụ thẻ)
6. **よいですよ** (đồng ý giúp, trung tính) — verbatim `topic2.json:378`
   turn 7, dòng 16477
7. **本当ですか** (Thật à? — phản ứng khi nghe tin vui) — verbatim
   `topic2.json:378` turn 6, dòng 16472 (cùng dòng với てもらえませんか)
8. **お願いします** (câu nhờ vả ngắn gọn, hay đi kèm/kết thúc lượt nhờ) —
   verbatim `topic5.json:229` turn 9, dòng 9525
9. **貸す** (cho mượn, dạng từ điển) — verbatim ví dụ `topic2.json:378`
   turn 6, dòng 16472 (貸してもらえませんか — dạng chia)
10. **手伝う** (giúp đỡ, dạng từ điển) — verbatim ví dụ `topic1.json:839`
    turn 3, dòng 39255 (手伝ってくれませんか — dạng chia)

## Grammar patterns (bước 2)

- **てくれる (đứng riêng)** — `n5/n5_ngu-phap-vi.txt` dòng 291-304, mẫu
  「Vてくれる」 với 3 ví dụ nguyên văn tiếng Nhật + dịch Việt sẵn (母がお弁当を
  作ってくれた。／友達が買い物をしてくれました。／山田さんが息子にお菓子を
  買ってくれました。).
- **てもらう ↔ てくれる ↔ ていただく** (register 3 tầng) — bảng so sánh trong
  `hanabira.../Verb_ていただく_(〜te_itadaku).md` dòng 28-38 (3 ví dụ song song:
  田中さんが教えてくれました。／友達に手伝ってもらいました。／先生にご説明
  していただきました。), dùng làm khung giải thích register.
- **ていただけますか (bổ sung)** — `ban1.txt` dòng 7709/7780 (来月からの
  スケジュールですけど、ちょっと見ていただけませんか。／コーヒー、いただけ
  ませんか。), dùng làm ví dụ bổ sung register rất lịch sự.

## B — Can-do đề xuất (CẦN MẮT NGƯỜI mục 1)

**Tên bài:** Nhờ ai đó việc nhỏ (ちょっとしたお願いをする) — khớp blueprint.

**Mục tiêu đề xuất:**
- Nhờ vả lịch sự bằng ～てもらえませんか.
- Nhờ vả rất lịch sự bằng ～ていただけますか.
- Nhờ vả thân mật bằng ～てくれませんか.
- Đồng ý giúp bằng かしこまりました／了解しました／よいですよ (tuỳ mức lịch sự).
- Phản ứng khi nghe tin vui bằng 本当ですか.
- Nhờ vả ngắn gọn bằng お願いします.

# LÀM SAU — việc dời lại, chưa xử lý trong lượt build bài (2026-08-05)

## Sổ tra furigana dùng CHUNG cho cả kho, không xử được kanji đa âm theo bài

**Phát hiện khi build `ja-daily_life-m02-u2-l2`.** `generate-curriculum.mjs`
xây MỘT `furiganaIndex` (Map) DÙNG CHUNG cho toàn bộ `lessonsPayload` +
`coursesPayload` (không cắt theo từng bài — xem comment tại chỗ khai báo:
"Sổ tra dùng CHUNG cho cả kho, không cắt theo từng bài... cắt theo bài thì
nó không tra được 田中 / 何 mà chính 3 bài kia đã ghi rõ cách đọc"). Cơ chế:
lượt 1 quét TOÀN BỘ kho, gom mọi cặp kanji→kana đã khai furigana tường minh
vào sổ; lượt 2 dùng sổ đó để tự động gắn furigana cho chuỗi bare (chưa có
furigana) ở MỌI bài. Nếu MỘT kanji được khai với **hai cách đọc khác nhau**
ở hai bài khác nhau (đúng cả hai, vì đó là kanji đa âm — ví dụ 何 đọc なん
trong 何ですか nhưng đọc なに trong 何をすれば), sổ tra ghi nhận
`index.get('何') = {なん, なに}`, và MỌI chuỗi bare 何 ở BẤT KỲ bài nào
(kể cả bài đã duyệt từ lâu, không đụng tới trong lượt build) đều bị
`annotateFromIndex` THROW ("ghi cụm đó bằng NHIỀU cách đọc, không chọn hộ").

**Ca thật đo được:** `ja-daily_life-m01-u1-l2` (bài đã duyệt) dùng 何 với âm
なん ở nhiều chỗ (`何ですか`, `お名前は何ですか`) qua khai furigana tường minh
ở nơi khác trong CHÍNH bài đó (`token('nan', '何（なん）', '何', 'なん')`),
nhưng các chuỗi hiển thị khác trong CÙNG bài lại để 何 BARE (không furigana
tường minh tại chỗ), dựa vào cơ chế lượt-2 tự gắn hộ. Khi `m02-u2-l2` cần
何 đọc なに (một câu hỏi 「何をすればよいのですか」, trích nguyên văn từ
`topic1.json:39260`) và khai furigana tường minh cho cách đọc đó, sổ tra
toàn kho lập tức có 2 cách đọc cho 何 → mọi chuỗi bare 何 ở `m01-u1-l2` (và
`m01-u1-comprehensive`, dùng lại nội dung từ `m01-u1-l2` qua cơ chế
review/reuse) đồng loạt FAIL, dù KHÔNG file nào của `m01-u1-l2` bị đụng tới
trong lượt build này. **Đã né bằng cách đổi 何 → hiragana なに trong nội
dung của `m02-u2-l2`** (xem provenance + ghi chú trong
`ja-unit2-lesson2-m02.mjs`), không sửa `m01-u1-l2`. Cách né này chỉ dùng
được khi từ đang cần CÓ thể viết hiragana thuần tự nhiên (何 → なに hợp lệ);
với kanji đa âm mà bài BẮT BUỘC phải hiện kanji (ví dụ tên riêng, thuật ngữ
cố định), cách né này sẽ không dùng được.

**Việc cần làm (chưa làm, ngoài phạm vi build bài):**
- Cắt sổ tra `furiganaIndex` theo TỪNG BÀI (mỗi lesson + phần
  comprehensiveTest liên quan của nó dùng sổ riêng), thay vì một Map dùng
  chung toàn kho — đúng với ý định nêu trong docstring của
  `annotateFromIndex` ("SỔ TRA CỦA CHÍNH BÀI ĐÓ"), vốn hiện KHÔNG khớp với
  cách gọi thực tế trong `generate-curriculum.mjs`.
- HOẶC: cho phép một kanji có NHIỀU cách đọc trong sổ tra toàn kho, miễn
  MỖI BÀI chỉ dùng một cách đọc bare (tách sổ theo `(kanji, lessonId)` thay
  vì chỉ `kanji`).
- Cả hai hướng đều cần rà lại toàn bộ 172 bài đã sinh để chắc không phát
  sinh xung đột mới, và cần owner quyết hướng nào trước khi sửa
  `generate-curriculum.mjs`/`japanese-furigana.mjs` (nằm ngoài phạm vi file
  được phép sửa của lệnh `/build-lesson`).
