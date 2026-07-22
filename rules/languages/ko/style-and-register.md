---
id: ko/style-and-register
version: 0.1.0
status: DRAFT
tier: [t1, t3]
role: [both]
enforced_by: pragmatics.rules.json
depends_on: [ko/grammar-and-usage]
sources: [S-WIKI-SPEECHLEVELS, S-TRAINED-KNOWLEDGE]
reviewer: NOT_ASSIGNED
review_date: NOT_REVIEWED
---

# Korean Style and Register Profile

Cụ thể hoá [`rules/content/naturalness-and-register.md`](../../content/naturalness-and-register.md)
theo [`ADR-016`](../../../docs/ai/ARCHITECTURE_DECISIONS.md#adr-016--multilingual-naturalness-and-register-architecture)
cho tiếng Hàn. Global rule vẫn ưu tiên; file này không tạo schema field mới.

## Profile metadata

```text
languageCode: ko
status: DRAFT / PROJECT_OWNER_REVIEW_PENDING / NOT_FROZEN
version: 0.1.0
reviewer: NOT_ASSIGNED
reviewDate: NOT_REVIEWED
provenance: SECTION_LEVEL_REFERENCES_RECORDED
unresolvedDecisions: SEE "Unresolved decisions" SECTION BELOW
```

AI không được ghi là native reviewer. Profile này CHƯA native review, CHƯA
đủ điều kiện `APPROVED` hoặc release `PASS`.

## Normal neutral-polite register

Đề xuất (chưa duyệt): `NATURAL_NEUTRAL_POLITE` ánh xạ vào **해요체**
(haeyo-che) — mức lịch sự thường ngày dùng với người lạ, đồng nghiệp,
người lớn tuổi hơn không thân. Câu kết thúc bằng đuôi 아요/어요/(이)에요.
Đây là mức mặc định app dạy đầu tiên, tương tự です／ます của ja.

## Casual register

`CASUAL` ánh xạ vào **해체/반말** (hae-che/banmal) — dùng với bạn thân,
người nhỏ tuổi hơn/em út trong gia đình. Đuôi 아/어 (bỏ 요). Chỉ dùng khi
context xác nhận độ thân thiết; không suy đoán từ tuổi/giới tính.

## Formal register

`FORMAL` ánh xạ vào **하십시오체** (hasipsio-che) — mức trang trọng cao
nhất còn dùng phổ biến: dịch vụ công cộng, phát thanh, kinh doanh, phát
biểu. Đuôi 습니다/습니까 hoặc ㅂ니다/ㅂ니까.

## Honorific modifier

Tiếng Hàn CÓ hệ thống kính ngữ ngữ pháp riêng biệt, **trực giao** với 3 mức
trên (giống cấu trúc HONORIFIC của ja — không phải một bậc cao hơn FORMAL):

- **Chủ ngữ kính ngữ** (subject honorification) — hình vị -시- chèn vào
  thân động từ khi chủ ngữ là người cần tôn trọng. Vd: 가다 (đi) ->
  가시다 (chủ ngữ đáng kính đi).
- **Khiêm nhường ngữ** (humble forms) — động từ đặc biệt khi người nói tự
  hạ mình để tôn người nghe. Vd: 주다 (cho) -> 드리다 (kính biếu/dâng).

**GIẢ ĐỊNH CẦN NGƯỜI DUYỆT A-02** — map chính xác 6-mức-taxonomy vào hệ
thật CHƯA được owner xác nhận.

## Ceremonial modifier

Chưa có inventory/fixture đã duyệt — không tự phát minh. Ngôn ngữ nghi lễ
truyền thống (하소서체, phát biểu hoàng gia/tôn giáo cổ) ngoài scope hiện
tại.

## Slang modifier

Chưa có inventory/fixture đã duyệt. Không dùng corpus frequency làm approval
tự động.

## Pronouns / forms of address

- 씨 — trung tính, sau tên đầy đủ hoặc tên riêng (dùng một mình sau tên
  riêng nghe suồng sã hơn, cần cẩn thận).
- 님 — kính trọng, sau chức danh/tên (vd 사장님 = "Giám đốc kính xưng").
- 선생님 — giáo viên, hoặc xưng hô kính trọng chung với người không rõ
  chức danh.
- Từ thân tộc (형/오빠/누나/언니...) dùng xưng hô cả với người KHÔNG cùng
  huyết thống, chọn theo giới tính người nói/người nghe — điểm dễ dịch sai
  máy móc.
- Đại từ nhân xưng ngôi 2 (너/당신) **hiếm dùng trực tiếp** trong giao tiếp
  lịch sự thật — người Hàn thường dùng chức danh/tên/lược bỏ chủ ngữ thay
  vì "you". Sự kiện quan trọng, cần native review trước khi đưa vào nội
  dung dạy.

## Contraction behavior

Chưa có nguồn xác nhận đầy đủ trong phiên này — UNRESOLVED.

## Politeness markers

Xem "Normal neutral-polite register" / "Formal register" ở trên — với tiếng
Hàn, politeness marker CHÍNH LÀ đuôi câu (không tách rời như trợ từ cuối câu
ね/よ của ja).

## Sentence-final particles

**KHÁC CẤU TRÚC với ja** — xem `pragmatics.rules.json` config
`structural_note`: tiếng Hàn KHÔNG có trợ từ cuối câu tuỳ chọn tách rời
khỏi lịch sự kiểu ね/よ. Lịch sự + loại câu (trần thuật/nghi vấn/mệnh
lệnh/đề nghị) GỘP vào một hệ đuôi bắt buộc ngữ pháp. Mục này KHÔNG áp dụng
theo nghĩa ja — xem "Normal/Casual/Formal register" thay thế.

## Service / customer-facing language

Đề xuất: 하십시오체 là chuẩn dịch vụ/khách hàng (giống keigo dịch vụ của
ja) — CHƯA native review.

## Written versus spoken differences

Văn viết trang trọng (báo chí, luận văn) thường dùng **해라체** (một mức
trong 7-mức cổ điển, không hẳn "archaic" mà là trung lập-văn-viết) thay vì
해요체 nói. UNRESOLVED — cần native review trước khi đưa vào nội dung dạy.

## Unacceptable literal-translation patterns

Chưa thu thập — cần dữ liệu thật. Bẫy dịch xuyên ngôn ngữ cụ thể (vd 씨 ->
"Mr/Ms" cố định) thuộc `rules/pairs/<a>-<b>/`, không thuộc file này.

## Target-language content criteria

Giữ intended meaning, context, teaching objective, base register và
modifiers. Korean naturalness bắt buộc native review theo release gate
(ADR-016), giống ja.

## Natural translation and learner-support criteria

Primary translation truyền meaning/pragmatic intent tự nhiên. Literal
structure (vd giải thích 조사/어순) thuộc literal gloss hoặc trường tương
đương đã duyệt, không lẫn vào bản dịch chính.

## UI copy criteria

Korean UI copy theo `uiLanguageCode`: ngắn, hiện đại, `NATURAL_NEUTRAL_POLITE`
(해요체), không ép mọi UI string thành câu đầy đủ 습니다. UI review riêng
với target-language lesson text — CHƯA có ví dụ cụ thể, UNRESOLVED.

## Pedagogically controlled language

Có thể giữ structure hơi không tự nhiên chỉ khi exact form là approved
teaching objective và scope ghi rõ; exception không lan sang primary
translation — cùng nguyên tắc ja.

## QA fixtures and review evidence

Chưa có banned exact fixtures hay native-review fixtures thật — xem
`test-fixtures.md` (khung, chưa có nội dung thật) và `native-review-ko.md`
(checklist, chưa gửi review).

## Unresolved decisions

- Map 6-mức taxonomy vào hệ đuôi câu thật (GIẢ ĐỊNH A-02).
- Đại từ ngôi 2 dùng khi nào — cần native review.
- Written vs spoken formality boundary (해라체 vs 해요체 trong văn viết).
- Contraction behavior chưa có nguồn.
- Native reviewer chưa được chỉ định.

## Source / provenance

- Taxonomy/naturalness priority: ADR-016, `rules/content/naturalness-and-register.md`.
- Speech level classification: `S-WIKI-SPEECHLEVELS` (WebSearch snippet, xem D-51).
- Honorific mechanism (-시-, khiêm nhường ngữ): `S-TRAINED-KNOWLEDGE`.

## Change log

- 2026-07-18 · v0.1.0 · Claude Code (build-language pipeline, Bước 0-4 tự
  động) · Tạo profile lần đầu, DRAFT, chưa native/owner review.
