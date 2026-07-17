# NovaLang Usage Ledger Contract v1.0

This platform-neutral shared contract defines three independent values. It has
no Dart, TypeScript, Flutter, React, storage-provider, or backend dependency.
It is a shared service outside the six runtime cores and is independent of the
Lesson Completion Contract, which it must not modify.

## UsageCommitRequest

The request expresses caller intent to commit one unit of usage. It contains
`userId`, `userTrackId`, `usageType`, `quantity`, `sourceEventId`,
`sourceRecordId`, `requestedAt`, `idempotencyKey`, and `contractVersion`.

All IDs are non-empty after trimming. `requestedAt` is ISO 8601 with a
timezone. `quantity` is exactly `1` in Stage 1. `usageType` is one of the
Stage 1 usage types. `contractVersion` is exactly `1.0`. Unknown fields are
rejected. The request does not carry `usageDate`; the committing service
resolves the calendar date through a date abstraction rather than trusting a
caller-supplied value.

## UsageLedgerEntry

The entry is an immutable committed usage fact. It contains `usageEntryId`,
`userId`, `userTrackId`, `usageDate`, `usageType`, `quantity`,
`sourceEventId`, `sourceRecordId`, `recordedAt`, `idempotencyKey`, and
`contractVersion`.

`usageDate` is `YYYY-MM-DD`, resolved by the committing service at commit
time. `sourceEventId` links the entry to the canonical event that triggered
it; `sourceRecordId` links it to the Core 2 completion record. Unknown fields
are rejected.

## UsageCommitResult

The result contains `status`, optional `entry`, optional
`existingUsageEntryId`, and `contractVersion`. Supported statuses are
`committed` and `already_committed`.

| Status | Required / forbidden values |
| --- | --- |
| `committed` | Requires `entry`; forbids `existingUsageEntryId`. Only this status creates a new entry. |
| `already_committed` | Requires `existingUsageEntryId`; forbids `entry`. |

Stage 1 does not define a rejection/ineligibility status. Plan quota
enforcement is out of scope for Stage 1; the ledger only records usage. A
caller that must not record usage (replay, resume, review, wrong-answer
practice, audio replay, a duplicate request, the same attempt resent, or an
already-completed lesson) simply does not call commit for that action — the
ledger itself does not decide eligibility.

## Business invariants

- **U1:** A commit request creates at most one usage ledger entry.
- **U2:** The same `sourceEventId` produces at most one usage ledger entry.
  This is the canonical dedup key: exactly one canonical
  `lesson_completion_recorded` event must ever result in exactly one usage
  entry, regardless of how many times a caller retries the commit.
- **U3:** The same `idempotencyKey` returns the existing logical result; it
  never creates a second entry.
- **U4:** Stage 1 records usage only for `new_lesson_completion`. No other
  usage type is defined.
- **U5:** `quantity` is always exactly `1` in Stage 1.
- **U6:** A usage ledger entry is immutable; there is no update or delete
  operation.
- **U7:** There is no destructive daily reset. Entries accumulate and are
  filtered by `usageDate` at query time (`countForDateAndType`,
  `listForUserTrackDate`).
- **U8:** A plan downgrade or any plan change does not delete usage history.
  Stage 1 has no plan-aware deletion logic at all.
- **U9:** The Usage Ledger does not enforce quota. Stage 1 only records
  usage; quota enforcement is a separate, later concern.
- **U10:** Unknown fields are rejected for all three contract values.

## Validation

Fixtures contain synthetic identifiers only. The validator checks request,
entry, and result independently, enforces result conditionals, validates
fixture relationships, and compares invalid fixture error arrays exactly.

```text
npm run validate:usage-ledger-contract
```

No JSON Schema validator dependency exists in the project, so the Node
validator implements these schema rules directly without adding a dependency,
mirroring `scripts/validate-lesson-completion-contract.mjs`.
