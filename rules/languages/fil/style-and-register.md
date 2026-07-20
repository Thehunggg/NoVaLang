---
id: fil/style-and-register
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: pragmatics.rules.json
depends_on: [fil/grammar-and-usage]
reviewer: NOT_ASSIGNED
review_date: NOT_REVIEWED
sources: [S-TRAINED-KNOWLEDGE]
---

# Filipino Style and Register Profile

Cụ thể hoá `naturalness-and-register.md` (ADR-016) cho tiếng Filipino (baseline
fil-PH).

## Profile metadata

```text
language: fil
baseline_variety: fil-PH (Filipino = Tagalog chuẩn hoá)
status: DRAFT (VALIDATED_NOT_YET_PROVEN — chưa FROZEN)
version: 0.1.0
reviewer: NOT_ASSIGNED
review_date: NOT_REVIEWED
provenance: S-TRAINED-KNOWLEDGE + PROJECT_OWNER_PRECEDENT (es B-02)
corpus_caveat: corpus rất nhỏ (222) — native review đặc biệt quan trọng
```

## Xưng hô + tiểu từ tôn trọng po/ho

- `ka`/`ikaw` — ngôi 2 thân.
- `kayo` — số nhiều HOẶC lịch sự cho 1 người (như vous/Vi).
- **`po`/`ho`** — tiểu từ **TÔN TRỌNG** cuối câu/xen câu (với người lớn tuổi/địa
  vị). **Rất quan trọng xã hội**: thiếu `po` với người lớn tuổi bị coi bất lịch
  sự.

Baseline: dạy ka/kayo + **po/ho**.

## Politeness markers

`salamat (po)` (cảm ơn), `pasensya na` (xin lỗi), `pwede po ba…?` (xin phép),
`paki-` (tiền tố nhờ vả: pakibigay 'làm ơn đưa'), `magandang umaga` (chào buổi
sáng).

## Register taxonomy (ADR-016)

| Mức | fil-PH |
|---|---|
| CASUAL | ka + bỏ po (bạn bè) |
| NATURAL_NEUTRAL_POLITE | + po/ho + kayo (baseline lịch sự) |
| FORMAL | po/ho đầy đủ + từ vựng trang trọng |
| HONORIFIC | **not-applicable** (po/ho ~ register, tiền lệ es B-02) |
| CEREMONIAL / SLANG | modifier trực giao |

## Nói vs viết — Taglish

Đời thường **code-switch tiếng Anh** (Taglish) rất phổ biến. Chuẩn viết giữ
Filipino. Dạy Filipino chuẩn; ghi nhận Taglish là thực tế khẩu ngữ.

## Unacceptable literal translations (nội-ngôn-ngữ)

- KHÔNG bỏ `po` khi cần tôn trọng người lớn tuổi.
- KHÔNG sai phụ tố tiêu điểm (actor vs object focus) so với tiểu từ ang/ng.
- KHÔNG bỏ linker na/-ng khi nối bổ nghĩa.
- Accents không bắt buộc (thường bỏ) — KHÔNG chấm sai khi thiếu.
- Cặp bẫy theo ngôn ngữ khác → `rules/pairs/` (INV-1).

## Pedagogically controlled language

Baseline: câu cơ bản + actor focus (-um-/mag-) trước, po/ho, ka/kayo, tiểu từ
ang/ng/sa hay dùng. Tránh hệ tiêu điểm đầy đủ + trùng lặp phức sớm.

## Deterministic banned fixtures

- `Kumain ng bata.` (actor focus nhưng dùng ng thay ang) → FAIL.
- `maganda babae` (thiếu linker) → FAIL.
- `Magandang po umaga.` (po sai vị trí) → FAIL.

## Native-review fixtures

Xem `native-review-fil.md` (hệ tiêu điểm, phụ tố/trùng lặp, tiểu từ ang/ng/sa,
po/ho, trọng âm/glottal, Taglish, độ tự nhiên) — ĐẶC BIỆT quan trọng vì corpus
rất nhỏ.

## Unresolved decisions

- D-fil-01 baseline fil-PH — **owner chưa duyệt**.
- D-fil-02 dạy po/ho làm baseline lịch sự — **owner chưa duyệt**.
- D-fil-03 dạy chuẩn Filipino (không Taglish) làm nội dung — **owner chưa duyệt**.
- D-fil-04 chấm: accents tuỳ chọn (không bắt buộc) — **owner chưa duyệt**.

## Change log

- 0.1.0 (2026-07-20): Khởi tạo từ pipeline /build-language Bước 0–4. DRAFT.
  Corpus rất nhỏ — nhiều mục medium/DRAFT cần người bản ngữ.
