import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const contractPath = "shared/contracts/lesson_completion.schema.json";
const validFixturesPath = "shared/contracts/fixtures/lesson_completion.valid.json";
const invalidFixturesPath = "shared/contracts/fixtures/lesson_completion.invalid.json";
const fixtureTypes = ["request", "record", "result"];

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

function validateObject(value, schema, type) {
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
    if (definition.$ref === "#/$defs/NonEmptyString" && !hasText(value[field])) {
      errors.push(`${field} must be a non-empty string`);
    }
    if (definition.$ref === "#/$defs/TimezoneDateTime" && !isOffsetDateTime(value[field])) {
      errors.push(`${field} must be an ISO 8601 datetime with a timezone`);
    }
    if (definition.$ref === "#/$defs/ContractVersion" && value[field] !== "1.0") {
      errors.push("contractVersion must equal 1.0");
    }
  }
  return errors;
}

function validateRequest(value, requestSchema) {
  return validateObject(value, requestSchema, "request");
}

function validateRecord(value, recordSchema) {
  return validateObject(value, recordSchema, "record");
}

function validateResult(value, resultSchema, recordSchema, statuses) {
  const errors = validateObject(value, resultSchema, "result");
  if (!isPlainObject(value)) return errors;

  if ("status" in value && !statuses.includes(value.status)) {
    errors.push(`status must be one of ${statuses.join(", ")}`);
    return errors;
  }
  if (!statuses.includes(value.status)) return errors;

  if (value.status === "recorded") {
    if (!("record" in value)) errors.push("recorded result requires record");
    if ("existingCompletionId" in value) errors.push("recorded result must not include existingCompletionId");
  }
  if (value.status === "already_completed") {
    if (!("existingCompletionId" in value)) errors.push("already_completed result requires existingCompletionId");
    if ("record" in value) errors.push("already_completed result must not include record");
  }
  if (value.status === "invalid_attempt" || value.status === "not_eligible") {
    if ("record" in value) errors.push(`${value.status} result must not include record`);
    if ("existingCompletionId" in value) {
      errors.push(`${value.status} result must not include existingCompletionId`);
    }
  }
  if ("record" in value) {
    for (const recordError of validateRecord(value.record, recordSchema)) {
      errors.push(`record.${recordError}`);
    }
  }
  return errors;
}

function validateByType(type, value, schemas) {
  if (!fixtureTypes.includes(type)) {
    return ["fixture type must be one of request, record, result"];
  }
  if (type === "request") return validateRequest(value, schemas.request);
  if (type === "record") return validateRecord(value, schemas.record);
  return validateResult(value, schemas.result, schemas.record, schemas.statuses);
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
    ...validateNamedFixtures(document.recordFixtures, "record", "record", schemas),
    ...validateNamedFixtures(document.resultFixtures, "result", "result", schemas),
  );
  if (errors.length > 0) return errors;

  const requests = byName(document.requestFixtures);
  const records = byName(document.recordFixtures);
  const results = byName(document.resultFixtures);
  for (const name of [
    "golden_lesson_request",
    "same_lesson_different_user_request",
    "same_user_lesson_different_track_request",
    "duplicate_golden_lesson_request",
  ]) {
    if (!requests.has(name)) errors.push(`missing required request fixture ${name}`);
  }
  for (const name of [
    "recorded_golden_lesson",
  ]) {
    if (!records.has(name)) errors.push(`missing required record fixture ${name}`);
  }
  for (const name of [
    "recorded_result",
    "already_completed_result",
    "invalid_attempt_result",
    "not_eligible_result",
  ]) {
    if (!results.has(name)) errors.push(`missing required result fixture ${name}`);
  }
  if (errors.length > 0) return errors;

  const golden = requests.get("golden_lesson_request").request;
  const duplicate = requests.get("duplicate_golden_lesson_request").request;
  const differentUser = requests.get("same_lesson_different_user_request").request;
  const differentTrack = requests.get("same_user_lesson_different_track_request").request;
  if (golden.lessonId !== "ja-daily_life-m01-u1-l1") {
    errors.push("golden_lesson_request must use ja-daily_life-m01-u1-l1");
  }
  if (duplicate.idempotencyKey !== golden.idempotencyKey) {
    errors.push("duplicate_golden_lesson_request must reuse golden_lesson_request idempotencyKey");
  }
  if (differentUser.lessonId !== golden.lessonId || differentUser.userId === golden.userId) {
    errors.push("same_lesson_different_user_request must keep lessonId and change userId");
  }
  if (
    differentTrack.userId !== golden.userId ||
    differentTrack.lessonId !== golden.lessonId ||
    differentTrack.userTrackId === golden.userTrackId
  ) {
    errors.push("same_user_lesson_different_track_request must keep userId/lessonId and change userTrackId");
  }

  const goldenRecordFixture = records.get("recorded_golden_lesson");
  if (goldenRecordFixture.requestFixtureName !== "golden_lesson_request") {
    errors.push("recorded_golden_lesson must link golden_lesson_request");
  } else if (goldenRecordFixture.record.idempotencyKey !== golden.idempotencyKey) {
    errors.push("recorded_golden_lesson idempotencyKey must equal linked request");
  }

  const recordedResultFixture = results.get("recorded_result");
  if (recordedResultFixture.requestFixtureName !== "golden_lesson_request") {
    errors.push("recorded_result must link golden_lesson_request");
  } else if (recordedResultFixture.result.record.idempotencyKey !== golden.idempotencyKey) {
    errors.push("recorded_result record idempotencyKey must equal linked request");
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
  request: contract?.$defs?.LessonCompletionRequest,
  record: contract?.$defs?.LessonCompletionRecord,
  result: contract?.$defs?.LessonCompletionResult,
  statuses: contract?.$defs?.CompletionStatus?.enum,
};
const validationErrors = [];

if (!isPlainObject(schemas.request)) validationErrors.push("schema is missing $defs.LessonCompletionRequest");
if (!isPlainObject(schemas.record)) validationErrors.push("schema is missing $defs.LessonCompletionRecord");
if (!isPlainObject(schemas.result)) validationErrors.push("schema is missing $defs.LessonCompletionResult");
if (!Array.isArray(schemas.statuses)) validationErrors.push("schema is missing $defs.CompletionStatus.enum");
if (contract?.$defs?.NonEmptyString?.pattern !== "\\S") {
  validationErrors.push("schema NonEmptyString must reject whitespace-only strings");
}

if (validationErrors.length === 0) {
  validationErrors.push(
    ...validateValidFixtures(validFixtures, schemas),
    ...validateInvalidFixtures(invalidFixtures, schemas),
  );
}

if (validationErrors.length > 0) {
  console.error(`lesson completion contract FAILED (${validationErrors.length} error(s)):`);
  for (const error of validationErrors) console.error(`- ${error}`);
  process.exitCode = 1;
} else {
  console.log(
    `lesson completion contract PASS — ${validFixtures.requestFixtures.length} request, ${validFixtures.recordFixtures.length} record, ${validFixtures.resultFixtures.length} result fixture(s); ${invalidFixtures.fixtures.length} invalid fixture(s)`,
  );
}
