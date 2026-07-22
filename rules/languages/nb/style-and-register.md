---
id: nb/style-and-register
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: pragmatics.rules.json
depends_on: [nb/grammar-and-usage]
reviewer: NOT_ASSIGNED
review_date: NOT_REVIEWED
sources: [S-TRAINED-KNOWLEDGE]
---

# Norwegian Bokmål Style and Register Profile

Cụ thể hoá `naturalness-and-register.md` (ADR-016) cho tiếng Na Uy Bokmål
(baseline nb-NO).

## Profile metadata

```text
language: nb
baseline_variety: nb-NO (Bokmål)
status: DRAFT (VALIDATED_NOT_YET_PROVEN — chưa FROZEN)
version: 0.1.0
reviewer: NOT_ASSIGNED
review_date: NOT_REVIEWED
provenance: S-TRAINED-KNOWLEDGE + PROJECT_OWNER_PRECEDENT (es B-02, pl D-64)
```

## Xưng hô (du phổ quát, như sv/da)

- `du` — dùng cho **hầu hết mọi người** (kể cả người lạ/lớn tuổi/dịch vụ/trang
  trọng). Na Uy hiện đại dùng du gần như phổ quát. Baseline.
- `De` — trang trọng cao, **đã rất hiếm** (gần như chỉ hoàng gia/văn bản rất
  trang trọng) → KHÔNG dạy làm chuẩn.
- `dere` — ngôi 2 số nhiều (các bạn).

Tiếng Na Uy **không** dựng đối lập T-V mạnh. Lịch sự qua **từ vựng + gián tiếp**.

## Politeness markers

`Kunne du...?`, `Jeg vil gjerne...`, `unnskyld`, `takk`, `vær så snill` (làm
ơn), `God dag` (trang trọng hơn) / `Hei`, `Hallo` (thân mật).

## Register taxonomy (ADR-016)

| Mức | nb-NO |
|---|---|
| CASUAL | du + từ thân mật (hei, hallo, ha det) |
| NATURAL_NEUTRAL_POLITE | du chuẩn mực (baseline) |
| FORMAL | du + từ trang trọng + gián tiếp |
| HONORIFIC | **not-applicable** (tiền lệ es B-02) |
| CEREMONIAL / SLANG | modifier trực giao |

## Trợ từ cuối câu

Not-applicable như hệ hình thái. Tiểu từ diễn ngôn (jo, da, nok, vel) thuộc từ
vựng/ngữ dụng.

## Ngôn ngữ dịch vụ / khách hàng

FORMAL vẫn dùng `du`: `Hva kan jeg hjelpe deg med?`, `Et øyeblikk`, `Vær så
god`.

## Nói vs viết

Khẩu ngữ có pitch accent + âm câm (hv→v, d/g cuối câm). Viết chuẩn giữ đầy đủ.
Dạy chuẩn viết + audio cho phát âm. Nhiều phương ngữ nói khác nhau — baseline
Østnorsk/Oslo.

## Unacceptable literal translations (nội-ngôn-ngữ)

- KHÔNG dịch 'you' trang trọng thành `De` (du là chuẩn).
- KHÔNG bỏ V2 (*I dag jeg leser* sai → *I dag leser jeg*).
- KHÔNG bỏ xác định kép khi có tính từ (nb: *den røde bilen*, KHÔNG *den røde
  bil* kiểu da).
- KHÔNG bỏ æ/ø/å (là chữ).
- Cặp bẫy theo ngôn ngữ khác → `rules/pairs/` (INV-1).

## Pedagogically controlled language

Baseline: hiện tại + hoàn thành, du, V2. Tránh cấu trúc phụ lồng sâu; pitch
accent ở audio, không ép trình độ đầu.

## Deterministic banned fixtures

- `I dag jeg leser` (sai V2) → FAIL.
- `jeg eren` (động từ chia theo ngôi) → FAIL.
- `den røde bil` (bỏ xác định kép — đúng cho da, SAI cho nb) → FAIL.

## Native-review fixtures

Xem `native-review-nb.md` (giống en/ei/et, hậu tố xác định + xác định kép, pitch
accent, phát âm, du tự nhiên, Bokmål chuẩn).

## Unresolved decisions

- D-nb-01 baseline nb-NO (Bokmål, Østnorsk) — **owner chưa duyệt**.
- D-nb-02 dạy 3 giống nhưng chấp nhận gộp masc+fem — **owner chưa duyệt**.
- D-nb-03 chấm khi thiếu æ/ø/å (áp tiền lệ pl D-64) — **owner chưa duyệt**.

## Change log

- 0.1.0 (2026-07-19): Khởi tạo từ pipeline /build-language Bước 0–4. DRAFT.
