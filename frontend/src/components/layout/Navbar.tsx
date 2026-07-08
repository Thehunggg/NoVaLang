import { Flame, Heart, LogOut, Zap } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import { useAuth } from "../../context/AuthContext";
import { useTranslation } from "../../i18n/useTranslation";
import { Logo } from "../Logo";

const navClass = ({ isActive }: { isActive: boolean }) => `rounded-xl px-3 py-2 text-sm font-extrabold transition ${isActive ? "bg-cyan-300/10 text-cyan-200" : "text-slate-400 hover:bg-white/5 hover:text-white"}`;
export function Navbar() {
  const { progress } = useApp(); const { user, signOut } = useAuth(); const { t } = useTranslation();
  const avatar = (progress.displayName || user?.name || "N").trim().slice(0, 1).toUpperCase();
  return <header className="sticky top-0 z-40 border-b border-white/[.07] bg-[#090612]/85 backdrop-blur-xl"><div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"><div className="[&_span]:text-white"><Logo /></div><nav className="hidden items-center gap-1 lg:flex"><NavLink to="/" end className={navClass}>{t("learn")}</NavLink><NavLink to={`/practice/${progress.selectedLanguage}`} className={navClass}>{t("practice")}</NavLink><NavLink to="/review" className={navClass}>{t("review")}</NavLink><NavLink to="/mistakes" className={navClass}>{t("mistakes")}</NavLink><NavLink to="/flashcards" className={navClass}>{t("flashcards")}</NavLink><NavLink to="/profile" className={navClass}>{t("profile")}</NavLink></nav><div className="flex items-center gap-2"><span className="hidden items-center gap-1.5 rounded-xl bg-orange-400/10 px-3 py-2 text-xs font-black text-orange-300 sm:flex"><Flame size={16} />{progress.streak}</span><span className="flex items-center gap-1.5 rounded-xl bg-rose-400/10 px-3 py-2 text-xs font-black text-rose-300"><Heart size={15} fill="currentColor" />{progress.hearts}</span><span className="hidden items-center gap-1.5 rounded-xl bg-violet-400/10 px-3 py-2 text-xs font-black text-violet-300 sm:flex"><Zap size={15} />{progress.totalXp}</span><NavLink to="/profile" className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-cyan-400 via-violet-500 to-fuchsia-500 text-xs font-black">{avatar}</NavLink><button onClick={signOut} className="hidden rounded-xl p-2 text-slate-500 hover:text-rose-300 sm:block" aria-label={t("signOut")}><LogOut size={17} /></button></div></div></header>;
}
