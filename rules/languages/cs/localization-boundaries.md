---
id: cs/localization-boundaries
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: guidance-only
depends_on: [cs/style-and-register]
sources: [S-TRAINED-KNOWLEDGE]
---

# Czech Localization Boundaries

Vai trò của cs trong NovaLang: **learning language** (T1). Đang là
playable-needs-rule, chưa dùng làm native/UI mặc định.

## Ranh giới trường

- `learningLanguageCode = cs`: câu/từ đích, phát âm, chính tả Séc (đầy đủ dấu).
- Không tự dịch máy sang ngôn ngữ khác. Cặp bẫy dịch cs↔<X> → `rules/pairs/`,
  KHÔNG ở `languages/cs/` (INV-1).

## Dấu bắt buộc trong dữ liệu

Văn bản đích PHẢI giữ đầy đủ dấu Séc (háček + acute/kroužek — đổi âm/nghĩa/độ
dài). Chỉ tầng chấm điểm mới bàn (xem `answer_acceptance_cs` — đề xuất KHÔNG
chấp nhận thiếu, tiền lệ pl D-64).

## Biến thể viết/nói

Baseline spisovná (chuẩn viết). obecná čeština (khẩu ngữ) khác — nếu thêm sau
phải tách rõ, gắn nhãn register.

## Số / ngày / tiền tệ

Dấu thập phân `,` và phân nhóm nghìn dấu cách (1 234,56). Tiền: Kč (Koruna).
Ngày: d. m. yyyy. Quy ước hiển thị theo locale cs-CZ.
