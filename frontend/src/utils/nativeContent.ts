/** Port of Flutter `resolveNativeContentMap` — collapses `*ByNative` maps to the active locale. */

export const MISSING_CONTENT_PATTERN = /⟦missing(?:-content)?:[^⟧]*⟧/g;

export function normalizeNativeLocale(languageCode: string): string {
  return languageCode.trim().toLowerCase().replace(/_/g, "-").split("-")[0] ?? "en";
}

export function missingNativeContentSentinel(path: string, languageCode: string): string {
  return `⟦missing-content:${path}:${normalizeNativeLocale(languageCode)}⟧`;
}

export function isMissingContentSentinel(value: unknown): boolean {
  return typeof value === "string" && /⟦missing(?:-content)?:/.test(value);
}

/** Strip missing-content sentinels for end-user display (show empty instead). */
export function displayNativeText(value: unknown): string {
  if (typeof value !== "string") return "";
  const trimmed = value.trim();
  if (!trimmed || isMissingContentSentinel(trimmed)) return "";
  return trimmed.replace(MISSING_CONTENT_PATTERN, "").trim();
}

export function strictNativeText(
  values: Record<string, string> | null | undefined,
  languageCode: string,
  path: string,
  legacy = "",
): string {
  const locale = normalizeNativeLocale(languageCode);
  if (!values || Object.keys(values).length === 0) {
    return legacy.trim() ? legacy : missingNativeContentSentinel(path, locale);
  }
  const value = values[locale]?.trim();
  return value ? value : missingNativeContentSentinel(path, locale);
}

function resolveLocalizedValue(
  values: Record<string, unknown>,
  locale: string,
  path: string,
): unknown {
  const value = values[locale];
  if (value == null || (typeof value === "string" && value.trim() === "")) {
    return missingNativeContentSentinel(path, locale);
  }
  return resolveNested(value, locale, path);
}

function resolveNested(value: unknown, locale: string, path: string): unknown {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    return resolveNativeContentMap(value as Record<string, unknown>, locale, path);
  }
  if (Array.isArray(value)) {
    return value.map((item, index) => resolveNested(item, locale, `${path}[${index}]`));
  }
  return value;
}

/**
 * Resolves field-level `*ByNative` maps without crossing language boundaries.
 * Same semantics as Flutter `resolveNativeContentMap`.
 */
export function resolveNativeContentMap(
  source: Record<string, unknown>,
  languageCode: string,
  path = "content",
): Record<string, unknown> {
  const locale = normalizeNativeLocale(languageCode);
  const resolved: Record<string, unknown> = {};

  for (const [key, entryValue] of Object.entries(source)) {
    if (key.endsWith("ByNative")) continue;
    const localized = source[`${key}ByNative`];
    resolved[key] =
      localized && typeof localized === "object" && !Array.isArray(localized)
        ? resolveLocalizedValue(localized as Record<string, unknown>, locale, `${path}.${key}`)
        : resolveNested(entryValue, locale, `${path}.${key}`);
  }

  for (const [key, entryValue] of Object.entries(source)) {
    if (!key.endsWith("ByNative")) continue;
    const baseKey = key.slice(0, -"ByNative".length);
    if (Object.prototype.hasOwnProperty.call(resolved, baseKey)) continue;
    if (entryValue && typeof entryValue === "object" && !Array.isArray(entryValue)) {
      resolved[baseKey] = resolveLocalizedValue(
        entryValue as Record<string, unknown>,
        locale,
        `${path}.${baseKey}`,
      );
    }
  }

  return resolved;
}

export function asStringList(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => displayNativeText(item))
    .filter((item) => item.length > 0);
}

export function asRecord(value: unknown): Record<string, unknown> | null {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

export function asRecordList(value: unknown): Record<string, unknown>[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => asRecord(item))
    .filter((item): item is Record<string, unknown> => item != null);
}
