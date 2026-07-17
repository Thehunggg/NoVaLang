import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const contractPath = "shared/contracts/canonical_event.schema.json";
const validFixturesPath = "shared/contracts/fixtures/canonical_event.valid.json";
const invalidFixturesPath = "shared/contracts/fixtures/canonical_event.invalid.json";
const fixtureTypes = ["request", "event", "result"];

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

function validateObject(value, schema, type, eventTypes) {
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
    if (ref === "#/$defs/CanonicalEventType" && !eventTypes.includes(value[field])) {
      errors.push(`eventType must be one of ${eventTypes.join(", ")}`);
    }
    if (ref === "#/$defs/SourceRecordType" && value[field] !== "lesson_completion") {
      errors.push("sourceRecordType must equal lesson_completion");
    }
    if (ref === "#/$defs/EventPayload" && !isPlainObject(value[field])) {
      errors.push(`${field} must be an object`);
    }
  }
  return errors;
}

function validateRequest(value, requestSchema, eventTypes) {
  return validateObject(value, requestSchema, "request", eventTypes);
}

function validateEvent(value, eventSchema, eventTypes) {
  return validateObject(value, eventSchema, "event", eventTypes);
}

function validateResult(value, resultSchema, eventSchema, statuses, eventTypes) {
  const errors = validateObject(value, resultSchema, "result", eventTypes);
  if (!isPlainObject(value)) return errors;

  if ("status" in value && !statuses.includes(value.status)) {
    errors.push(`status must be one of ${statuses.join(", ")}`);
    return errors;
  }
  if (!statuses.includes(value.status)) return errors;

  if (value.status === "appended") {
    if (!("event" in value)) errors.push("appended result requires event");
    if ("existingEventId" in value) {
      errors.push("appended result must not include existingEventId");
    }
  }
  if (value.status === "already_appended") {
    if (!("existingEventId" in value)) {
      errors.push("already_appended result requires existingEventId");
    }
    if ("event" in value) errors.push("already_appended result must not include event");
  }
  if ("event" in value) {
    for (const eventError of validateEvent(value.event, eventSchema, eventTypes)) {
      errors.push(`event.${eventError}`);
    }
  }
  return errors;
}

function validateByType(type, value, schemas) {
  if (!fixtureTypes.includes(type)) {
    return ["fixture type must be one of request, event, result"];
  }
  if (type === "request") return validateRequest(value, schemas.request, schemas.eventTypes);
  if (type === "event") return validateEvent(value, schemas.event, schemas.eventTypes);
  return validateResult(value, schemas.result, schemas.event, schemas.statuses, schemas.eventTypes);
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
    ...validateNamedFixtures(document.eventFixtures, "event", "event", schemas),
    ...validateNamedFixtures(document.resultFixtures, "result", "result", schemas),
  );
  if (errors.length > 0) return errors;

  const requests = byName(document.requestFixtures);
  const events = byName(document.eventFixtures);
  const results = byName(document.resultFixtures);
  for (const name of [
    "golden_completion_event_request",
    "duplicate_golden_completion_event_request",
    "different_user_event_request",
  ]) {
    if (!requests.has(name)) errors.push(`missing required request fixture ${name}`);
  }
  for (const name of ["appended_golden_event"]) {
    if (!events.has(name)) errors.push(`missing required event fixture ${name}`);
  }
  for (const name of ["appended_result", "already_appended_result"]) {
    if (!results.has(name)) errors.push(`missing required result fixture ${name}`);
  }
  if (errors.length > 0) return errors;

  const golden = requests.get("golden_completion_event_request").request;
  const duplicate = requests.get("duplicate_golden_completion_event_request").request;
  const differentUser = requests.get("different_user_event_request").request;

  if (golden.sourceRecordType !== "lesson_completion") {
    errors.push("golden_completion_event_request must use sourceRecordType lesson_completion");
  }
  if (duplicate.idempotencyKey !== golden.idempotencyKey) {
    errors.push("duplicate_golden_completion_event_request must reuse golden_completion_event_request idempotencyKey");
  }
  if (duplicate.sourceRecordId !== golden.sourceRecordId) {
    errors.push("duplicate_golden_completion_event_request must reuse golden_completion_event_request sourceRecordId");
  }
  if (differentUser.userId === golden.userId) {
    errors.push("different_user_event_request must change userId");
  }

  const goldenEventFixture = events.get("appended_golden_event");
  if (goldenEventFixture.requestFixtureName !== "golden_completion_event_request") {
    errors.push("appended_golden_event must link golden_completion_event_request");
  } else if (goldenEventFixture.event.idempotencyKey !== golden.idempotencyKey) {
    errors.push("appended_golden_event idempotencyKey must equal linked request");
  } else if (goldenEventFixture.event.sourceRecordId !== golden.sourceRecordId) {
    errors.push("appended_golden_event sourceRecordId must equal linked request");
  }

  const appendedResultFixture = results.get("appended_result");
  if (appendedResultFixture.requestFixtureName !== "golden_completion_event_request") {
    errors.push("appended_result must link golden_completion_event_request");
  } else if (appendedResultFixture.result.event.idempotencyKey !== golden.idempotencyKey) {
    errors.push("appended_result event idempotencyKey must equal linked request");
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
  request: contract?.$defs?.CanonicalEventAppendRequest,
  event: contract?.$defs?.CanonicalEvent,
  result: contract?.$defs?.CanonicalEventAppendResult,
  statuses: contract?.$defs?.CanonicalEventAppendStatus?.enum,
  eventTypes: contract?.$defs?.CanonicalEventType?.enum,
};
const validationErrors = [];

if (!isPlainObject(schemas.request)) validationErrors.push("schema is missing $defs.CanonicalEventAppendRequest");
if (!isPlainObject(schemas.event)) validationErrors.push("schema is missing $defs.CanonicalEvent");
if (!isPlainObject(schemas.result)) validationErrors.push("schema is missing $defs.CanonicalEventAppendResult");
if (!Array.isArray(schemas.statuses)) validationErrors.push("schema is missing $defs.CanonicalEventAppendStatus.enum");
if (!Array.isArray(schemas.eventTypes)) validationErrors.push("schema is missing $defs.CanonicalEventType.enum");
if (contract?.$defs?.NonEmptyString?.pattern !== "\\S") {
  validationErrors.push("schema NonEmptyString must reject whitespace-only strings");
}
if (contract?.$defs?.SourceRecordType?.const !== "lesson_completion") {
  validationErrors.push("schema SourceRecordType must be const lesson_completion");
}

if (validationErrors.length === 0) {
  validationErrors.push(
    ...validateValidFixtures(validFixtures, schemas),
    ...validateInvalidFixtures(invalidFixtures, schemas),
  );
}

if (validationErrors.length > 0) {
  console.error(`canonical event contract FAILED (${validationErrors.length} error(s)):`);
  for (const error of validationErrors) console.error(`- ${error}`);
  process.exitCode = 1;
} else {
  console.log(
    `canonical event contract PASS — ${validFixtures.requestFixtures.length} request, ${validFixtures.eventFixtures.length} event, ${validFixtures.resultFixtures.length} result fixture(s); ${invalidFixtures.fixtures.length} invalid fixture(s)`,
  );
}
