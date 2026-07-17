# Japanese TTS and Audio

## Confirmed input boundary

TTS nhận native Japanese script qua approved speech field (`ttsText`,
`speechText`, `surfaceText` hoặc pronunciation reading theo consumer contract).
TTS không nhận romanization hoặc learner-support translation mặc định.

**Evidence: `JA-EV-AUDIO-01` — `EXISTING_CONFIRMED`.**

## Field precedence

| Purpose | Preferred authority | Forbidden silent substitute |
|---|---|---|
| Display | Japanese surface text | TTS override/romaji |
| TTS utterance | Approved native-script speech field | romanization/translation |
| Pronunciation explanation | pronunciation reading | literal kana without context |
| Learner aid | romanization when approved | audio source of truth |

Audio delivery priority is mandatory:

1. approved recorded/generated audio;
2. TTS using the correct Japanese locale;
3. explicit user-visible error when neither is available.

There is no silent fallback to a different locale or voice.

**Evidence: `JA-EV-OWNER-03` — `PROJECT_OWNER_DECISION`.**

A `ttsTextOverride` chỉ được dùng khi native-script engine cần, phải có
reason/provenance, không sửa displayed text và không tạo canonical
pronunciation rule mới.

Detailed precedence: explicit approved `ttsText`/override wins for speech only;
otherwise an approved `speechText`, pronunciation field or `surfaceText` is
selected according to the consumer contract. Literal `reading` is not silently
treated as contextual pronunciation. Every override must keep the original
surface field intact.

## Runtime and engine uncertainty

Exact voice, pitch, engine normalization và platform audio behavior là runtime
concern. Profile không tự tạo pitch-accent data và không claim Android/Web/iOS
audio parity nếu chưa runtime-verify.

## Metadata and content domains

Default locale metadata is `ja-JP`; actual voice/provider is not selected by
this profile. Speed, pitch, pauses, punctuation, counters, dates, numbers,
abbreviations, names, proper nouns, loanwords and multiple pronunciations need
exact speech metadata or runtime/listener review. Locale mismatch, missing
voice/dictionary or ambiguous reading must fail loud or surface an explicit
approved fallback, never switch language silently.

Generated audio and runtime TTS are separate delivery modes but share the same
Japanese speech authority. Cache keys must include content/speech revision,
locale/voice and relevant settings so stale audio cannot masquerade as current;
exact cache architecture remains runtime-owned.

**Evidence:** native-script boundary `JA-EV-AUDIO-01`; playback/source policy
`JA-EV-OWNER-03`. Provider selection and cache implementation remain runtime
architecture outside this documentation task.

## Replay, speed and recording policy

- Replay is unlimited.
- Standard speed is `1.0x`.
- Slow mode is `0.75x`.
- Opening a card does not autoplay audio.
- Accessibility/listening surfaces may expose the approved slow mode and
  replay without changing the source-priority chain.

Recording and speech-recognition feedback are outside this Japanese closure;
the profile does not invent defaults.

**Evidence: `JA-EV-OWNER-03` — `PROJECT_OWNER_DECISION`.**

## Validation

Deterministic validation phải chặn romanization-as-TTS và empty required speech
field, cross-locale/voice fallback, disallowed autoplay, or a source-priority
violation. Naturalness/audio quality cần Japanese listener review trên
engine/voice thực tế.
