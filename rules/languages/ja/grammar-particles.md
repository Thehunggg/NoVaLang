# Japanese Grammar Particles

## Narrow authority

File này chỉ là authority cho particle classification ảnh hưởng
pronunciation/romanization. General particle meaning, teaching và accepted
answers thuộc `grammar-and-usage.md` và `learning-and-pedagogy.md`.

## Confirmed transformation

Chỉ token được analyzer gắn part-of-speech `助詞` mới nhận learner-facing
pronunciation/romanization sau:

| Orthographic token | Pronunciation value | Romanization |
|---|---|---|
| は | わ | `wa` |
| へ | え | `e` |
| を | お | `o` |

Các ký tự giống vậy bên trong lexical token giữ lexical reading. Canonical
Japanese text và literal kana reading luôn giữ は/へ/を.

**Evidence: `JA-EV-PARTICLE-01` — `EXISTING_CONFIRMED`.**

## Failure behavior

Nếu token/POS context không đủ tin cậy, pipeline phải fail loud hoặc dùng một
approved content override. Không character-level exception list và không
fallback sang output “có vẻ đúng”.

**Evidence: `JA-EV-RUNTIME-02` — `EXISTING_CONFIRMED`.**

## Explicit non-authority

File này không quyết định particle omission trong casual speech, translation
của ね/よ, answer tolerance, dialogue register hoặc lesson progression.
