# Review checklist — ja (Bước 4)

**Số mục: 2 thường + 1 mâu thuẫn (không tính trần 8) · Ước lượng: ~7 phút.**
Trả lời bằng cách ghi chữ cái chọn cho từng mục (ví dụ: "R-01: B, R-02: A, D-11: ii").
Mọi câu trả lời sẽ được ghi vào `rules/decisions.md`.

---

## [R-01] Động từ bất quy tắc: 2 hay 3?

Hai nguồn độc lập lệch nhau về danh sách động từ bất quy tắc (irregular verbs —
động từ không chia theo khuôn chung):

- **Nguồn A — nrGrammar (Kamermans):** "There are three irregular verbs: する,
  来（く）る, ある" — xếp **ある** vào bất quy tắc.
  (raw.githubusercontent.com/Pomax/nrGrammar/master/data/pages/en-GB/verb_grammar.txt)
- **Nguồn B — Wikipedia "Japanese irregular verbs":** chỉ **する** và **くる**
  là bất quy tắc chính; ある là động từ godan có đúng một ngoại lệ: phủ định là
  **ない** (không phải あらない).

Ví dụ cụ thể: 「本がある」→ phủ định 「本がない」.

**Chọn:** A (3 động từ: する・くる・ある) / B (2 động từ: する・くる) / để DRAFT
**Tôi khuyên chọn B vì** đây là cách phân loại chuẩn trong giáo trình (JLPT,
Genki...): app dạy する・くる là bất quy tắc, còn ない dạy như dạng từ vựng riêng
của ある — người học ít phải nhớ hơn.
**Nếu bạn không trả lời, tôi sẽ tự chọn B.**

---

## [R-02] App dạy quy ước dấu câu nào?

- **Nguồn A — nrGrammar + Wikipedia:** văn tiếng Nhật thường dùng **。** (dấu
  chấm câu) và **、** (dấu phẩy).
- **Nguồn B — W3C JLREQ (§ Punctuation):** văn bản ngang tồn tại **ba** quy ước:
  `，．` (sách khoa học kỹ thuật), `，。`, và `、。` (phổ biến, văn bản hành chính
  dùng 、。).

Ví dụ cụ thể: cùng một câu có thể in là 「今日は晴れ。」 hoặc 「今日は晴れ．」
tùy nhà xuất bản.

**Chọn:** A (chỉ dạy 。、 — quy ước phổ thông) / B (dạy 。、 nhưng ghi chú cho
người học biết ．， tồn tại) / để DRAFT
**Tôi khuyên chọn A vì** người học A0–A2 chỉ cần một quy ước; máy chấm đã
normalize bỏ khác biệt dấu câu (D-14) nên bài làm chứa ．， không bao giờ bị
chấm sai — không cần dạy thêm.
**Nếu bạn không trả lời, tôi sẽ tự chọn A.**

---

## [D-11 · MÂU THUẪN QUYẾT ĐỊNH CŨ — không tính vào trần 8 mục]

Chính sách **romaji theo trình độ** tồn tại hai bản ngược nhau trong legacy
(xem `decisions.md` D-11):

- **Bản (i):** Basic **hiện romaji mặc định** / Intermediate ẩn nhưng bật được /
  Advanced không hiện (trừ ngoại lệ đã duyệt).
- **Bản (ii):** A0–B1 **ẩn romaji mặc định**, có toggle bật / B2–C2 không có
  toggle.

Khác nhau duy nhất ở **người mới học**: thấy romaji ngay (i) hay phải tự bật (ii).

Hệ quả từng lựa chọn:
- Chọn **(i)**: vào bài dễ hơn ngày đầu, nhưng người học có xu hướng đọc romaji
  thay vì kana → chậm thoát romaji; và **ngược** với D-10 (Q14 romaji
  `HIDDEN_BY_DEFAULT`), tạo hai hành vi khác nhau trong cùng app.
- Chọn **(ii)**: người mới buộc làm quen kana sớm (phù hợp mục tiêu dạy đọc),
  nhất quán với D-10 và tinh thần fail-safe D-12; đổi lại ngày đầu khó hơn một
  chút — đã có nút bật cho ai cần.

**Chọn:** (i) / (ii)
Đây là quyết định sản phẩm thuộc về bạn — tôi **không tự chọn**. Nếu cần thông
tin thêm: bản (ii) đang là hành vi được nhiều quyết định khác giả định.

---

## Ghi chú — KHÔNG cần trả lời

1. **3 claim chỉ có 1 nguồn xác nhận** (độ dài nguyên âm phân biệt nghĩa; っ
   tính 1 mora; luật Lyman chặn rendaku): giữ `confidence: medium`, đã ghi chú
   trong `phonology.rules.json`; không ảnh hưởng nội dung dạy hiện tại.
2. **Corpus 9.100 câu** (dưới mốc 10.000 vì mạng phiên này chặn Tatoeba/
   Wikipedia): trên ngưỡng 2.000 nên corpus check vẫn giá trị; số thật đã ghi
   vào `coverage.json`.
3. **Phần chủ quan cần người bản ngữ** (sắc thái keigo, trợ từ cuối câu, dịch
   tự nhiên): đã soạn `native-review-ja.md` (tiếng Anh, tick được) — bạn gửi
   thẳng cho người bản ngữ khi thu xếp được, không chặn các bước sau.
