import type { Course, Language, LanguageCode, Lesson, NativeLanguage, PlacementQuestion, PracticeSet } from "../types/index";
import { getCourseByLanguage, getLessonById, getPlacementByLanguage, getReviewCatalog, languages, makePracticeSet } from "../data/fallbackCourses";
import { nativeLanguages } from "../data/nativeLanguages";

const API_URL = (import.meta.env.VITE_API_URL || "http://localhost:5000/api").replace(/\/$/, "");
export interface ApiResult<T> { data: T; source: "api" | "fallback"; }
const request = async <T>(path: string): Promise<T> => { const controller = new AbortController(); const timeout = window.setTimeout(() => controller.abort(), 1800); try { const response = await fetch(`${API_URL}${path}`, { signal: controller.signal }); if (!response.ok) throw new Error(`API returned ${response.status}`); return await response.json() as T; } finally { window.clearTimeout(timeout); } };
const withFallback = async <T>(path: string, fallback: () => T): Promise<ApiResult<T>> => { try { return { data: await request<T>(path), source: "api" }; } catch { return { data: fallback(), source: "fallback" }; } };

export const fetchLanguages = () => withFallback<Language[]>("/languages", () => languages);
export const fetchNativeLanguages = () => withFallback<NativeLanguage[]>("/native-languages", () => nativeLanguages);
export const getNativeLanguages = fetchNativeLanguages;
export const fetchCourse = async (language: string): Promise<ApiResult<Course | undefined>> => {
  const bundledCourse = getCourseByLanguage(language);
  const result = await withFallback<Course | undefined>(`/courses/${encodeURIComponent(language)}`, () => bundledCourse);
  return bundledCourse ? { data: bundledCourse, source: result.source } : result;
};
export const fetchLesson = async (lessonId: string): Promise<ApiResult<Lesson | undefined>> => {
  const bundledLesson = getLessonById(lessonId);
  const result = await withFallback<Lesson | undefined>(`/lessons/${encodeURIComponent(lessonId)}`, () => bundledLesson);

  // The bundled lesson is also our localization/content catalogue. Prefer it when
  // available so a still-running older API cannot remove newer translations,
  // pronunciation metadata, or native-language answer aliases from the UI.
  return bundledLesson ? { data: bundledLesson, source: result.source } : result;
};
export const fetchPlacement = async (language: LanguageCode): Promise<ApiResult<PlacementQuestion[]>> => {
  const bundledPlacement = getPlacementByLanguage(language);
  const result = await withFallback<PlacementQuestion[]>(`/placement/${language}`, () => bundledPlacement);
  return { data: bundledPlacement, source: result.source };
};
export const fetchReviewCatalog = async (language: LanguageCode) => {
  const bundledReview = getReviewCatalog(language);
  const result = await withFallback(`/review/${language}`, () => bundledReview);
  return { data: bundledReview, source: result.source };
};
export const fetchPractice = async (language: string, completedLessonIds: string[] = []) => {
  const safeLanguage = language.trim() || "ja";
  const suffix = completedLessonIds.length ? `/${completedLessonIds.map(encodeURIComponent).join(",")}` : "";
  const bundledPractice = makePracticeSet(safeLanguage, completedLessonIds);
  const result = await withFallback<PracticeSet>(`/practice/${safeLanguage}${suffix}`, () => bundledPractice);
  return { data: bundledPractice, source: result.source };
};
export const fetchLessons = async (language: string): Promise<ApiResult<Lesson[]>> => { const result = await fetchCourse(language); return { data: result.data?.levels.flatMap((level) => level.units.flatMap((unit) => unit.lessons)) ?? [], source: result.source }; };
