import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const contractPath = "shared/contracts/usage_ledger.schema.json";
const validFixturesPath = "shared/contracts/fixtures/usage_ledger.valid.json";
const invalidFixturesPath = "shared/contracts/fixtures/usage_ledger.invalid.json";
const fixtureTypes = ["request", "entry", "result"];

async function loadJson(relativePath) {
  return JSON.parse(await readFile(path.join(root, relativePath), "utf8"));
}

const isPlainObject = (value) =>
  value !== null && typeof value === "object" && !Array.isArray(value);

const hasText = (value) => typeof value === "string" && /\S/.test(value);

function isOffsetDateTime(value) {
  if (typeof value !== "string") return false;
  const withTimezone = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/;
  return withTimezone.test(value) && !Number.isNaN(Date.parse(value));
}

function isUsageDate(value) {
  return typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value);
}

function validateObject(value, schema, type, usageTypes) {
  if (!isPlainObject(value)) return [`${type} must be an object`];

  const errors = [];
  const properties = schema.properties ?? {};
  for (const field of schema.required ?? []) {
    if (!(field in value)) errors.push(`${field} is required`);
  }
  if (schema.additionalProperties === false) {
    for (const field of Object.keys(value)) {
      if (!(field in properties)) errors.push(`${type} contains unknown field ${field}`);
    }
  }

  for (const [field, definition] of Object.entries(properties)) {
    if (!(field in value)) continue;
    const ref = definition.$ref;
    if (ref === "#/$defs/NonEmptyString" && !hasText(value[field])) {
      errors.push(`${field} must be a non-empty string`);
    }
    if (ref === "#/$defs/TimezoneDateTime" && !isOffsetDateTime(value[field])) {
      errors.push(`${field} must be an ISO 8601 datetime with a timezone`);
    }
    if (ref === "#/$defs/ContractVersion" && value[field] !== "1.0") {
      errors.push("contractVersion must equal 1.0");
    }
    if (ref === "#/$defs/UsageQuantity" && value[field] !== 1) {
      errors.push("quantity must equal 1");
    }
    if (ref === "#/$defs/UsageDate" && !isUsageDate(value[field])) {
      errors.push(`${field} must be YYYY-MM-DD`);
    }
    if (ref === "#/$defs/UsageType" && !usageTypes.includes(value[field])) {
      errors.push(`usageType must be one of ${usageTypes.join(", ")}`);
    }
  }
  return errors;
}

function validateRequest(value, requestSchema, usageTypes) {
  return validateObject(value, requestSchema, "request", usageTypes);
}

function validateEntry(value, entrySchema, usageTypes) {
  return validateObject(value, entrySchema, "entry", usageTypes);
}

function validateResult(value, resultSchema, entrySchema, statuses, usageTypes) {
  const errors = validateObject(value, resultSchema, "result", usageTypes);
  if (!isPlainObject(value)) return errors;

  if ("status" in value && !statuses.includes(value.status)) {
    errors.push(`status must be one of ${statuses.join(", ")}`);
    return errors;
  }
  if (!statuses.includes(value.status)) return errors;

  if (value.status === "committed") {
    if (!("entry" in value)) errors.push("committed result requires entry");
    if ("existingUsageEntryId" in value) {
      errors.push("committed result must not include existingUsageEntryId");
    }
  }
  if (value.status === "already_committed") {
    if (!("existingUsageEntryId" in value)) {
      errors.push("already_committed result requires existingUsageEntryId");
    }
    if ("entry" in value) errors.push("already_committed result must not include entry");
  }
  if ("entry" in value) {
    for (const entryError of validateEntry(value.entry, entrySchema, usageTypes)) {
      errors.push(`entry.${entryError}`);
    }
  }
  return errors;
}

function validateByType(type, value, schemas) {
  if (!fixtureTypes.includes(type)) {
    return ["fixture type must be one of request, entry, result"];
  }
  if (type === "request") return validateRequest(value, schemas.request, schemas.usageTypes);
  if (type === "entry") return validateEntry(value, schemas.entry, schemas.usageTypes);
  return validateResult(value, schemas.result, schemas.entry, schemas.statuses, schemas.usageTypes);
}

function sameErrors(actualErrors, expectedErrors) {
  return (
    Array.isArray(expectedErrors) &&
    actualErrors.length === expectedErrors.length &&
    actualErrors.every((error, index) => error === expectedErrors[index])
  );
}

function byName(fixtures) {
  return new Map(fixtures.map((fixture) => [fixture.name, fixture]));
}

function validateNamedFixtures(fixtures, type, property, schemas) {
  const errors = [];
  if (!Array.isArray(fixtures)) return [`${type}Fixtures must be an array`];
  for (const fixture of fixtures) {
    const name = fixture?.name ?? "unnamed fixture";
    if (!isPlainObject(fixture)) {
      errors.push(`${name}: fixture must be an object`);
      continue;
    }
    if (!hasText(fixture.name)) errors.push(`${name}: name must be a non-empty string`);
    for (const error of validateByType(type, fixture[property], schemas)) {
      errors.push(`${name}: ${error}`);
    }
  }
  return errors;
}

function validateValidFixtures(document, schemas) {
  const errors = [];
  if (!isPlainObject(document)) return ["valid fixture document must be an object"];
  if (document.fixtureVersion !== "1.0") errors.push("valid fixtureVersion must equal 1.0");

  errors.push(
    ...validateNamedFixtures(document.requestFixtures, "request", "request", schemas),
    ...validateNamedFixtures(document.entryFixtures, "entry", "entry", schemas),
    ...validateNamedFixtures(document.resultFixtures, "result", "result", schemas),
  );
  if (errors.length > 0) return errors;

  const requests = byName(document.requestFixtures);
  const entries = byName(document.entryFixtures);
  const results = byName(document.resultFixtures);
  for (const name of [
    "golden_completion_usage_request",
    "duplicate_golden_completion_usage_request",
    "different_user_usage_request",
    "different_track_usage_request",
  ]) {
    if (!requests.has(name)) errors.push(`missing required request fixture ${name}`);
  }
  for (const name of ["committed_golden_usage"]) {
    if (!entries.has(name)) errors.push(`missing required entry fixture ${name}`);
  }
  for (const name of ["committed_result", "already_committed_result"]) {
    if (!results.has(name)) errors.push(`missing required result fixture ${name}`);
  }
  if (errors.length > 0) return errors;

  const golden = requests.get("golden_completion_usage_request").request;
  const duplicate = requests.get("duplicate_golden_completion_usage_request").request;
  const differentUser = requests.get("different_user_usage_request").request;
  const differentTrack = requests.get("different_track_usage_request").request;

  if (golden.usageType !== "new_lesson_completion") {
    errors.push("golden_completion_usage_request must use usageType new_lesson_completion");
  }
  if (duplicate.idempotencyKey !== golden.idempotencyKey) {
    errors.push("duplicate_golden_completion_usage_request must reuse golden_completion_usage_request idempotencyKey");
  }
  if (duplicate.sourceEventId !== golden.sourceEventId) {
    errors.push("duplicate_golden_completion_usage_request must reuse golden_completion_usage_request sourceEventId");
  }
  if (differentUser.userId === golden.userId) {
    errors.push("different_user_usage_request must change userId");
  }
  if (differentTrack.userId !== golden.userId || differentTrack.userTrackId === golden.userTrackId) {
    errors.push("different_track_usage_request must keep userId and change userTrackId");
  }

  const goldenEntryFixture = entries.get("committed_golden_usage");
  if (goldenEntryFixture.requestFixtureName !== "golden_completion_usage_request") {
    errors.push("committed_golden_usage must link golden_completion_usage_request");
  } else if (goldenEntryFixture.entry.idempotencyKey !== golden.idempotencyKey) {
    errors.push("committed_golden_usage idempotencyKey must equal linked request");
  }

  const committedResultFixture = results.get("committed_result");
  if (committedResultFixture.requestFixtureName !== "golden_completion_usage_request") {
    errors.push("committed_result must link golden_completion_usage_request");
  } else if (committedResultFixture.result.entry.idempotencyKey !== golden.idempotencyKey) {
    errors.push("committed_result entry idempotencyKey must equal linked request");
  }
  return errors;
}

function validateInvalidFixtures(document, schemas) {
  const errors = [];
  if (!isPlainObject(document)) return ["invalid fixture document must be an object"];
  if (document.fixtureVersion !== "1.0") errors.push("invalid fixtureVersion must equal 1.0");
  if (!Array.isArray(document.fixtures)) return [...errors, "invalid fixtures must be an array"];

  for (const fixture of document.fixtures) {
    const name = fixture?.name ?? "unnamed fixture";
    if (!isPlainObject(fixture)) {
      errors.push(`${name}: fixture must be an object`);
      continue;
    }
    const actualErrors = validateByType(fixture.type, fixture.value, schemas);
    if (!sameErrors(actualErrors, fixture.expectedErrors)) {
      errors.push(
        `${name}: expected ${JSON.stringify(fixture.expectedErrors)} but received ${JSON.stringify(actualErrors)}`,
      );
    }
  }
  return errors;
}

const [contract, validFixtures, invalidFixtures] = await Promise.all([
  loadJson(contractPath),
  loadJson(validFixturesPath),
  loadJson(invalidFixturesPath),
]);

const schemas = {
  request: contract?.$defs?.UsageCommitRequest,
  entry: contract?.$defs?.UsageLedgerEntry,
  result: contract?.$defs?.UsageCommitResult,
  statuses: contract?.$defs?.UsageCommitStatus?.enum,
  usageTypes: contract?.$defs?.UsageType?.enum,
};
const validationErrors = [];

if (!isPlainObject(schemas.request)) validationErrors.push("schema is missing $defs.UsageCommitRequest");
if (!isPlainObject(schemas.entry)) validationErrors.push("schema is missing $defs.UsageLedgerEntry");
if (!isPlainObject(schemas.result)) validationErrors.push("schema is missing $defs.UsageCommitResult");
if (!Array.isArray(schemas.statuses)) validationErrors.push("schema is missing $defs.UsageCommitStatus.enum");
if (!Array.isArray(schemas.usageTypes)) validationErrors.push("schema is missing $defs.UsageType.enum");
if (contract?.$defs?.NonEmptyString?.pattern !== "\\S") {
  validationErrors.push("schema NonEmptyString must reject whitespace-only strings");
}
if (contract?.$defs?.UsageQuantity?.const !== 1) {
  validationErrors.push("schema UsageQuantity must be const 1");
}

if (validationErrors.length === 0) {
  validationErrors.push(
    ...validateValidFixtures(validFixtures, schemas),
    ...validateInvalidFixtures(invalidFixtures, schemas),
  );
}

if (validationErrors.length > 0) {
  console.error(`usage ledger contract FAILED (${validationErrors.length} error(s)):`);
  for (const error of validationErrors) console.error(`- ${error}`);
  process.exitCode = 1;
} else {
  console.log(
    `usage ledger contract PASS — ${validFixtures.requestFixtures.length} request, ${validFixtures.entryFixtures.length} entry, ${validFixtures.resultFixtures.length} result fixture(s); ${invalidFixtures.fixtures.length} invalid fixture(s)`,
  );
}
