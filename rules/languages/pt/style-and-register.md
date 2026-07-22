---
id: pt/style-and-register
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: pragmatics.rules.json
depends_on: [pt/grammar-and-usage]
reviewer: NOT_ASSIGNED
review_date: NOT_REVIEWED
sources: [S-TRAINED-KNOWLEDGE]
---

# Portuguese Style and Register Profile

Cụ thể hoá `naturalness-and-register.md` (ADR-016) cho tiếng Bồ (baseline pt-BR).

## Profile metadata

```text
language: pt
baseline_variety: pt-BR
status: DRAFT (VALIDATED_NOT_YET_PROVEN — chưa FROZEN)
version: 0.1.0
reviewer: NOT_ASSIGNED
review_date: NOT_REVIEWED
provenance: S-TRAINED-KNOWLEDGE + PROJECT_OWNER_PRECEDENT (es B-02/B-03)
```

## Xưng hô (pronouns / forms of address)

- `você` — thân mật-trung tính, chuẩn toàn quốc BR, **chia động từ ngôi 3 số
  ít**. Baseline.
- `o senhor` / `a senhora` — trang trọng.
- `vocês` — số nhiều.
- `tu` — vùng (Nam/Đông Bắc), khẩu ngữ thường vẫn chia ngôi 3 → KHÔNG dạy chia
  `tu` ở baseline. (KHÁC pt-PT, nơi `tu` là thân mật chuẩn.)

## Politeness markers

Thức điều kiện làm nhẹ yêu cầu: `Poderia...?`, `Gostaria de...`, `Você
poderia...`. `Com licença` (xin phép), `Por favor`, `Obrigado/Obrigada` (hoà
giống theo NGƯỜI NÓI: nam nói obrigado, nữ nói obrigada).

## Register taxonomy (ADR-016)

| Mức | pt-BR |
|---|---|
| CASUAL | você + tiếng lóng BR (valeu, tá, cadê, a gente) |
| NATURAL_NEUTRAL_POLITE | você trung tính (baseline) |
| FORMAL | o senhor/a senhora + từ trang trọng |
| HONORIFIC | **not-applicable** (tiền lệ es B-02) |
| CEREMONIAL / SLANG | modifier trực giao, dùng khi nội dung yêu cầu |

## Trợ từ cuối câu (sentence-final particles)

Not-applicable như một hệ hình thái (khác ja ね/よ). Tiếng Bồ dùng tiểu từ diễn
ngôn rời (né?, viu, tá?) — thuộc từ vựng/khẩu ngữ, không phải hệ trợ từ ngữ pháp.

## Ngôn ngữ dịch vụ / khách hàng

FORMAL mặc định: `o senhor/a senhora`, `Pois não?` (mời), `Às ordens`, `Um
momento, por favor`.

## Nói vs viết

Khẩu ngữ BR: proclise (`Me passa...`), `a gente` thay `nós`, nuốt `-ndo` →
`-no` (`falano`). Viết chuẩn: giữ `nós`, `-ndo`, đại từ o/a. Dạy chuẩn viết,
chú thích khẩu ngữ.

## Unacceptable literal translations (nội-ngôn-ngữ)

- KHÔNG dịch máy "you are welcome" → *você é bem-vindo* (sai ngữ dụng); đúng:
  `De nada` / `Imagina`.
- KHÔNG bỏ co kết: *de o*, *em a* → phải `do`, `na`.
- Cặp theo ngôn ngữ khác (vd bẫy pt↔en) → `rules/pairs/`, không ở đây (INV-1).

## Pedagogically controlled language

Baseline BR: você, ter (thì kép), ser/estar. Tránh mesóclise, pretérito
mais-que-perfeito simples (fizera) ở trình độ đầu — trang trọng/văn chương.

## Deterministic banned fixtures

- `você falas` (sai — você chia ngôi 3) → FAIL.
- `de o mercado` (thiếu co kết) → FAIL.
- `*obrigado* do một người nói nữ` khi ngữ cảnh chốt giới → cảnh báo hoà giống.

## Native-review fixtures

Xem `native-review-pt.md` (você/tu vùng miền, tự nhiên bản dịch, giống danh từ).

## Unresolved decisions

- D-pt-01 baseline pt-BR (review-checklist) — **owner chưa duyệt**.
- D-pt-02 você vs tu baseline — **owner chưa duyệt**.
- D-pt-03 chấm điểm thiếu dấu/cedilha — **owner chưa duyệt** (`answer_acceptance_pt` DRAFT).

## Change log

- 0.1.0 (2026-07-19): Khởi tạo từ pipeline /build-language Bước 0–4. DRAFT.
