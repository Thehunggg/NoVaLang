# NovaLang Lesson Completion Contract v1.0

This platform-neutral shared contract defines three independent values. It has
no Dart, TypeScript, Flutter, React, storage-provider, or backend dependency.
It is not connected to the Golden Lesson or any platform runtime in VS0-02A.

## LessonCompletionRequest

The request expresses an attempt to complete a lesson. It contains
`attemptId`, `userId`, `userTrackId`, `lessonId`, `requestedAt`,
`idempotencyKey`, and `contractVersion`.

All IDs are non-empty after trimming. `requestedAt` is ISO 8601 with a
timezone. `contractVersion` is exactly `1.0`. Unknown fields are rejected.

## LessonCompletionRecord

The record is an immutable first valid completion. It contains `completionId`,
`attemptId`, `userId`, `userTrackId`, `lessonId`, `completedAt`,
`idempotencyKey`, and `contractVersion`.

It is created before any canonical event. A future canonical event refers to
it with `sourceRecordId = completionId`; it does not supply `sourceEventId` to
the record. In v1.0 this record represents the first valid completion, so it
does not contain `isFirstValidCompletion`. Unknown fields are rejected.

## LessonCompletionResult

The result contains `status`, optional `record`, optional
`existingCompletionId`, and `contractVersion`. Supported statuses are
`recorded`, `already_completed`, `invalid_attempt`, and `not_eligible`.

| Status | Required / forbidden values |
| --- | --- |
| `recorded` | Requires `record`; forbids `existingCompletionId`. Only this status creates a new record. |
| `already_completed` | Requires `existingCompletionId`; forbids a new `record`. |
| `invalid_attempt` | Forbids `record` and `existingCompletionId`; creates no record. |
| `not_eligible` | Forbids `record` and `existingCompletionId`; creates no record. |

## Business invariants

- **C1:** One attempt creates at most one valid completion record.
- **C2:** One `userId + userTrackId + lessonId` scope has one first valid completion.
- **C3:** Replay does not create another first valid completion.
- **C4:** Completion does not directly consume Usage Ledger usage.
- **C5:** Completion does not directly update Curriculum Progress.
- **C6:** Completion does not directly update Mastery.
- **C7:** Completion does not directly award XP.
- **C8:** Duplicate requests with the same `idempotencyKey` return the existing logical result.
- **C9:** A completion record is immutable; future corrections use a separate audit/correction record.

Unknown fields are rejected for all three contract values. This prevents
unagreed lifecycle or compatibility fields from being silently accepted.

## Validation

Fixtures contain synthetic identifiers only. The validator checks request,
record, and result independently, enforces result conditionals, validates
fixture relationships, and compares invalid fixture error arrays exactly.

```text
npm run validate:lesson-completion-contract
```

No JSON Schema validator dependency exists in the project, so the Node
validator implements these schema rules directly without adding a dependency.
