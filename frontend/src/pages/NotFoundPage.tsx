import { Compass } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "../i18n/useTranslation";

export function NotFoundPage() {
  const { t } = useTranslation();
  return <div className="grid min-h-[65vh] place-items-center px-5 py-20 text-center"><div><Compass className="mx-auto animate-float text-cyan-300" size={64} /><p className="mt-5 text-sm font-extrabold uppercase tracking-[0.2em] text-violet-300">404 · NovaLang</p><h1 className="mt-2 font-display text-4xl font-black">{t("notFound")}</h1><Link to="/" className="mt-7 inline-flex rounded-2xl bg-gradient-to-r from-cyan-300 to-violet-400 px-6 py-3 font-extrabold text-violet-950">{t("returnHome")}</Link></div></div>;
}
