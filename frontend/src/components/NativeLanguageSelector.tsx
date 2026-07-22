import { Check, ChevronDown, Info, Languages, Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useApp } from "../context/AppContext";
import { nativeLanguages } from "../data/nativeLanguages";
import { useTranslation } from "../i18n/useTranslation";
import { getNativeLanguages } from "../services/api";
import type { NativeLanguage } from "../types/index";

const normalize = (value: string) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
const hasNativeChoice = () => {
  try { return Boolean(localStorage.getItem("nativeLanguage")); } catch { return false; }
};

export function NativeLanguageSelector({ compact = false }: { compact?: boolean }) {
  const { progress, setNativeLanguage } = useApp(); const { t } = useTranslation();
  const [catalog, setCatalog] = useState<NativeLanguage[]>(nativeLanguages); const [query, setQuery] = useState(""); const [expanded, setExpanded] = useState(!compact);
  const [showSuggestion, setShowSuggestion] = useState(!hasNativeChoice());
  useEffect(() => { getNativeLanguages().then(({ data }) => setCatalog(data.length > 0 ? data : nativeLanguages)); }, []);
  const selected = catalog.find((item) => item.code === progress.nativeLanguage) ?? nativeLanguages.find((item) => item.code === progress.nativeLanguage) ?? nativeLanguages[0];
  const deviceLanguage = useMemo(() => {
    const codes = typeof navigator === "undefined" ? [] : [...(navigator.languages ?? []), navigator.language].filter(Boolean);
    const normalizedCodes = codes.flatMap((code) => [code, code.split("-")[0]]);
    return normalizedCodes.map((code) => catalog.find((item) => item.code === code || item.code.split("-")[0] === code)).find(Boolean);
  }, [catalog]);
  const filtered = useMemo(() => { const needle = normalize(query.trim()); return catalog.filter((item) => !needle || normalize(`${item.name} ${item.nativeName} ${item.region ?? ""} ${item.code}`).includes(needle)); }, [catalog, query]);
  const choose = (item: NativeLanguage) => { setNativeLanguage(item.code); setShowSuggestion(false); if (compact) setExpanded(false); };
  const suggestionLanguage = deviceLanguage ? (deviceLanguage.nativeName || deviceLanguage.name) : "";

  return <div className="w-full"><div className="mb-3 flex items-center justify-between gap-3"><div className="flex items-center gap-2"><Languages className="text-cyan-300" size={18} /><div><h3 className="font-display font-black text-white">{t("chooseNativeLanguage")}</h3>{!compact && <p className="mt-1 text-xs text-slate-500">{t("nativeLanguageHelp")}</p>}</div></div>{compact && <button onClick={() => setExpanded((value) => !value)} className="inline-flex items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs font-black text-cyan-200">{t("changeNativeLanguage")}<ChevronDown size={14} /></button>}</div>
  {showSuggestion && deviceLanguage && <div className="mb-3 rounded-2xl border border-violet-300/25 bg-violet-300/10 p-4"><p className="whitespace-pre-line text-sm font-extrabold text-white">{t("deviceLanguageSuggestion", { language: suggestionLanguage })}</p><div className="mt-4 flex flex-wrap gap-2"><button onClick={() => choose(deviceLanguage)} className="rounded-xl bg-gradient-to-r from-cyan-600 to-violet-600 px-4 py-2 text-sm font-black text-white shadow-lg shadow-violet-950/25 hover:from-cyan-500 hover:to-violet-500">{t("useDeviceLanguage", { language: suggestionLanguage })}</button><button onClick={() => { setShowSuggestion(false); setExpanded(true); }} className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-black text-slate-200">{t("searchAnotherLanguage")}</button></div></div>}
  <div className="flex items-center gap-3 rounded-2xl border border-cyan-300/25 bg-cyan-300/10 p-4"><span className="grid h-10 w-10 place-items-center rounded-xl bg-cyan-300/15 text-xl">{selected.flagEmoji}</span><span className="min-w-0 flex-1"><span className="block text-[10px] font-black uppercase tracking-wider text-cyan-300">{t("selectedNativeLanguage")}</span><strong className="block truncate text-sm text-white">{selected.nativeName} <span className="font-medium text-slate-400">· {selected.name}</span></strong></span><span className={`rounded-lg px-2 py-1 text-[10px] font-black ${selected.uiSupported ? "bg-emerald-300/10 text-emerald-300" : "bg-amber-300/10 text-amber-300"}`}>{selected.uiSupported ? progress.effectiveUILanguage.toUpperCase() : "EN UI"}</span></div>
  {!selected.uiSupported && <div className="mt-3 flex gap-2 rounded-xl border border-amber-300/20 bg-amber-300/10 p-3 text-xs leading-5 text-amber-100"><Info className="mt-0.5 shrink-0" size={15} /><span>{t("englishFallbackNotice")}</span></div>}
  {expanded && <div className="mt-4"><label className="flex h-12 items-center gap-3 rounded-xl border border-white/10 bg-black/20 px-4 focus-within:border-cyan-300/40"><Search className="text-slate-500" size={17} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={t("searchLanguage")} className="min-w-0 flex-1 bg-transparent text-sm font-bold text-white outline-none" /><span className="text-[10px] font-black text-slate-600">{filtered.length}</span></label><div className="mt-4 max-h-72 space-y-2 overflow-y-auto pr-1">{filtered.map((item) => <button key={item.code} onClick={() => choose(item)} className={`relative flex w-full items-center gap-3 rounded-xl border p-3 text-left transition ${progress.nativeLanguage === item.code ? "border-cyan-300/50 bg-cyan-300/10 shadow-[0_0_20px_rgba(34,211,238,.08)]" : "border-white/[.07] bg-white/[.025] hover:border-violet-300/25 hover:bg-white/[.045]"}`}><span className="text-xl" aria-hidden>{item.flagEmoji}</span><span className="min-w-0 flex-1"><strong className="block truncate text-sm text-white">{item.nativeName}</strong><span className="mt-0.5 block truncate text-[11px] text-slate-500">{item.name}{item.region ? ` · ${item.region}` : ""}</span></span>{item.uiSupported && <span className="rounded-md bg-emerald-300/10 px-2 py-1 text-[9px] font-black text-emerald-300">UI</span>}{progress.nativeLanguage === item.code && <Check className="text-cyan-300" size={17} />}</button>)}</div>{!filtered.length && <p className="py-8 text-center text-sm font-bold text-slate-500">{t("searchLanguage")}: “{query}”</p>}</div>}</div>;
}
