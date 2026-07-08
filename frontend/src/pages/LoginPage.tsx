import { ArrowRight, Check, Eye, EyeOff, Globe2, LockKeyhole, Mail, Sparkles, UserRound } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { Logo } from "../components/Logo";
import { Mascot } from "../components/learning/Mascot";
import { NativeLanguageSelector } from "../components/NativeLanguageSelector";
import { useAuth } from "../context/AuthContext";
import { useTranslation } from "../i18n/useTranslation";

type Mode = "login" | "signup" | "reset";
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function LoginPage() {
  const [mode, setMode] = useState<Mode>("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [resetSent, setResetSent] = useState(false);
  const { user, signIn, signUp, continueAsGuest } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const destination = (location.state as { from?: string } | null)?.from || "/";

  if (user) return <Navigate to="/" replace />;

  const switchMode = (next: Mode) => {
    setMode(next);
    setError("");
    setResetSent(false);
  };

  const submit = (event: FormEvent) => {
    event.preventDefault();
    setError("");
    if (!emailPattern.test(email)) return setError(t("emailError"));
    if (mode === "reset") return setResetSent(true);
    if (mode === "signup" && name.trim().length < 2) return setError(t("nameError"));
    if (password.length < 6) return setError(t("passwordError"));
    mode === "signup" ? signUp(name, email) : signIn(email);
    navigate(destination, { replace: true });
  };

  const guest = () => {
    continueAsGuest();
    navigate(destination, { replace: true });
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#080510] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(168,85,247,.24),transparent_28%),radial-gradient(circle_at_85%_20%,rgba(34,211,238,.18),transparent_25%),radial-gradient(circle_at_65%_90%,rgba(236,72,153,.18),transparent_30%)]" />
      <div className="relative mx-auto grid min-h-screen max-w-7xl lg:grid-cols-[1.05fr_.95fr]">
        <section className="hidden flex-col justify-between p-14 lg:flex">
          <div className="[&_span]:text-white"><Logo /></div>
          <div>
            <Mascot size="lg" />
            <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-cyan-300/25 bg-cyan-300/10 px-4 py-2 text-sm font-black text-cyan-200"><Sparkles size={16} /> {t("novaWelcome")}</div>
            <h1 className="mt-6 font-display text-6xl font-black leading-tight">{t("tagline")}</h1>
            <p className="mt-5 max-w-lg text-lg leading-8 text-slate-400">CEFR and JLPT-style paths, micro-lessons, placement, and spaced review kept together in one bright learning signal.</p>
          </div>
          <p className="text-sm font-bold text-slate-600">English / Japanese / Spanish</p>
        </section>
        <section className="flex min-h-screen items-center justify-center p-4 sm:p-8">
          <div className="w-full max-w-md">
            <div className="mb-6 lg:hidden"><div className="[&_span]:text-white"><Logo /></div></div>
            <div className="rounded-[2rem] border border-white/10 bg-white/[.075] p-6 shadow-2xl backdrop-blur-2xl sm:p-8">
              <NativeLanguageSelector compact />
              <div className="my-6 h-px bg-white/10" />
              {resetSent ? (
                <div className="rounded-2xl border border-emerald-300/25 bg-emerald-300/10 p-5">
                  <Check className="text-emerald-300" />
                  <h2 className="mt-3 font-display text-xl font-black">Reset path prepared</h2>
                  <p className="mt-2 text-sm text-slate-400">This local MVP does not send email. Return and use any six-character password.</p>
                  <button onClick={() => switchMode("login")} className="mt-5 w-full rounded-xl bg-emerald-300 py-3 font-black text-emerald-950">{t("back")}</button>
                </div>
              ) : (
                <>
                  <p className="text-xs font-black uppercase tracking-[.16em] text-cyan-300">{mode === "login" ? t("welcomeBack") : mode === "signup" ? t("createProfile") : t("forgotPassword")}</p>
                  <h1 className="mt-2 font-display text-3xl font-black">{mode === "login" ? t("continueStreak") : mode === "signup" ? t("createProfile") : t("forgotPassword")}</h1>
                  <form onSubmit={submit} className="mt-6 space-y-4">
                    {mode === "signup" && <label className="flex h-14 items-center gap-3 rounded-2xl border border-white/10 bg-black/20 px-4"><UserRound className="text-fuchsia-300" size={18} /><input value={name} onChange={(event) => setName(event.target.value)} placeholder="Display name" className="min-w-0 flex-1 bg-transparent text-sm font-bold outline-none" /></label>}
                    <label className="flex h-14 items-center gap-3 rounded-2xl border border-white/10 bg-black/20 px-4"><Mail className="text-cyan-300" size={18} /><input value={email} onChange={(event) => setEmail(event.target.value)} placeholder={t("email")} type="email" className="min-w-0 flex-1 bg-transparent text-sm font-bold outline-none" /></label>
                    {mode !== "reset" && <label className="flex h-14 items-center gap-3 rounded-2xl border border-white/10 bg-black/20 px-4"><LockKeyhole className="text-violet-300" size={18} /><input value={password} onChange={(event) => setPassword(event.target.value)} placeholder={t("password")} type={showPassword ? "text" : "password"} className="min-w-0 flex-1 bg-transparent text-sm font-bold outline-none" /><button type="button" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button></label>}
                    {mode === "login" && <button type="button" onClick={() => switchMode("reset")} className="block w-full text-right text-xs font-black text-cyan-300">{t("forgotPassword")}</button>}
                    {error && <p className="rounded-xl bg-rose-400/10 p-3 text-sm font-bold text-rose-200">{error}</p>}
                    <button className="flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-300 via-violet-400 to-fuchsia-400 font-black text-[#10051a]">{mode === "login" ? t("enterApp") : mode === "signup" ? t("createProfile") : t("continue")}<ArrowRight size={18} /></button>
                  </form>
                  {mode !== "reset" && (
                    <>
                      <button onClick={guest} className="mt-4 flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 text-sm font-black"><Globe2 size={17} className="text-cyan-300" />{t("continueExplorer")}</button>
                      <p className="mt-5 text-center text-sm text-slate-500"><button onClick={() => switchMode(mode === "login" ? "signup" : "login")} className="font-black text-fuchsia-300">{mode === "login" ? t("createProfile") : t("signIn")}</button></p>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

