---
id: fr/tts-and-audio
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: guidance-only
depends_on: [fr/pronunciation]
sources: [S-TRAINED-KNOWLEDGE]
---

# French TTS and Audio

## speechText

`speechText` = surface text Latin. TTS engine cần tự xử lý liaison (chữ
viết không đánh dấu chỗ nối) — đây là hành vi mặc định của TTS engine
chuẩn, không phải override riêng của app.

## Locale

Đề xuất mặc định `fr-FR` (Pháp métropolitain) — xem GIẢ ĐỊNH C-03
(`style-and-register.md`) về Québécois (`fr-CA`), nhẹ hơn vấn đề dialect
của es vì không ảnh hưởng ngữ pháp cốt lõi.

## Kế thừa `_base/audio.rules.json`

Không có gì cần override riêng.

## Provenance

`S-TRAINED-KNOWLEDGE`.

## Chưa giải quyết

Locale cụ thể (fr-FR vs fr-CA) — GIẢ ĐỊNH C-03.
