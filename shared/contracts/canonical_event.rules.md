# NovaLang Canonical Event Contract v1.0

This platform-neutral shared contract defines three independent values. It has
no Dart, TypeScript, Flutter, React, storage-provider, or backend dependency.

## CanonicalEventAppendRequest

The request expresses an intent to append one canonical event. It contains
`eventType`, `sourceRecordId`, `sourceRecordType`, `userId`, `userTrackId`,
`lessonId`, `requestedAt`, `idempotencyKey`, `contractVersion`, and `payload`.

All IDs are non-empty after trimming. `requestedAt` is ISO 8601 with a
timezone. `contractVersion` is exactly `1.0`. `payload` is an object.
Unknown fields are rejected. The request does not carry `eventId`; the
dispatcher assigns it when the event is appended.

## CanonicalEvent

The event is an immutable canonical fact. It contains `eventId`, `eventType`,
`sourceRecordId`, `sourceRecordType`, `userId`, `userTrackId`, `lessonId`,
`occurredAt`, `idempotencyKey`, `contractVersion`, and `payload`.

Stage 1 defines exactly one `eventType`: `lesson_completion_recorded`, whose
wire name is stable and must not change without a new contract version. For
this event type, `sourceRecordType` is enforced as the constant
`lesson_completion` (schema `const`) and
`sourceRecordId = completionId` of the Core 2 `LessonCompletionRecord` that
caused it. Values such as `completion`, `lesson`, empty strings, missing, or
null are rejected. A future event type may need fields this version does not
have; that requires a compatible (`1.1`) or breaking (`2.0`) contract change,
not a silent extension of this file.

`payload` is deeply immutable for runtime events: nested maps and lists must
not be mutable after create/fromJson, and callers must not be able to mutate
the event by mutating the input map or a `toJson()` output.

The event is created only after the source record it describes already
exists and is immutable. The source record (for Stage 1,
`LessonCompletionRecord`) never references the event back; the reference is
one-directional from event to source record only, so completion never becomes
dependent on the event pipeline.

## CanonicalEventAppendResult

The result contains `status`, optional `event`, optional `existingEventId`,
and `contractVersion`. Supported statuses are `appended` and
`already_appended`.

| Status | Required / forbidden values |
| --- | --- |
| `appended` | Requires `event`; forbids `existingEventId`. Only this status creates a new event. |
| `already_appended` | Requires `existingEventId`; forbids `event`. |

## Business invariants

- **E1:** A canonical event is immutable once appended; there is no update or
  delete operation.
- **E2:** The same `idempotencyKey` returns the existing logical append
  result; it never creates a second event.
- **E3:** An event is persisted (appended) before it is dispatched to any
  subscriber.
- **E4:** A subscriber must not mutate the event it receives.
- **E5:** Dispatch may be retried. A subscriber failure does not delete or
  otherwise change the event; the event remains available for a later
  dispatch attempt.
- **E6:** A duplicate dispatch of the same event must not cause a duplicate
  side effect. This is achieved by each subscriber deduplicating its own
  evidence/projection by `eventId`, not by the dispatcher guaranteeing
  exactly-once delivery.
- **E7:** The Completion Service never becomes aware of, or directly calls,
  any subscriber. Only the orchestrator (Stage 1: `LessonCompletionOrchestrator`,
  introduced in VS0-07) appends and dispatches events after a completion
  record exists.
- **E8:** Unknown fields are rejected for all three contract values.

## Validation

Fixtures contain synthetic identifiers only. The validator checks request,
event, and result independently, enforces result conditionals, validates
fixture relationships, and compares invalid fixture error arrays exactly.

```text
npm run validate:canonical-event-contract
```

No JSON Schema validator dependency exists in the project, so the Node
validator implements these schema rules directly without adding a dependency,
mirroring `scripts/validate-lesson-completion-contract.mjs` and
`scripts/validate-usage-ledger-contract.mjs`.
