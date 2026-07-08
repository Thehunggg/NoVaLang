import { ArrowRight, BrainCircuit, Flame, Heart, Layers3, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Mascot } from "../components/learning/Mascot";
import { NativeLanguageSelector } from "../components/NativeLanguageSelector";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { languages } from "../data/fallbackCourses";
import { useTranslation } from "../i18n/useTranslation";

export function LandingPage() {
  const { t } = useTranslation();

  return (
    <main className="min-h-screen overflow-hidden bg-[#080510] text-white">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(34,211,238,.13),transparent_28%),radial-gradient(circle_at_85%_25%,rgba(168,85,247,.16),transparent_26%),radial-gradient(circle_at_50%_100%,rgba(236,72,153,.11),transparent_30%)]" />
      <nav className="relative mx-auto flex max-w-7xl items-center justify-between px-5 py-5 lg:px-8">
        <Link to="/welcome" className="font-display text-xl font-black">Nova<span className="text-cyan-300">Lang</span></Link>
        <Link to="/login" className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-black">{t("signIn")}</Link>
      </nav>
      <section className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 pb-24 pt-12 lg:grid-cols-[1.08fr_.92fr] lg:px-8 lg:pt-20">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-cyan-300/25 bg-cyan-300/10 px-4 py-2 text-sm font-black text-cyan-200"><Sparkles size={16} /> {t("novaWelcome")}</span>
          <h1 className="mt-7 max-w-3xl font-display text-5xl font-black leading-[1.02] sm:text-6xl lg:text-7xl">{t("tagline")}</h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-400">CEFR and JLPT-style course paths with pronunciation-first foundations, placement, micro-lessons, and spaced review.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link to="/login"><Button className="w-full sm:w-auto">{t("startLearning")} <ArrowRight size={19} /></Button></Link>
            <a href="#courses"><Button variant="ghost" className="w-full sm:w-auto">{t("exploreCourses")}</Button></a>
          </div>
          <p className="mt-5 text-xs font-bold text-slate-600">{t("noPaidApi")}</p>
        </div>
        <div className="mx-auto w-full max-w-md">
          <div className="flex justify-center"><Mascot size="lg" /></div>
          <Card className="mt-8 p-5"><NativeLanguageSelector /></Card>
        </div>
      </section>
      <section id="courses" className="relative border-y border-white/[.06] bg-white/[.02] px-5 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="text-xs font-black uppercase tracking-[.2em] text-cyan-300">Pre-A1 to B2 / Kana to JLPT N2</p>
            <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl">{t("foundationCourses")}</h2>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {languages.map((language) => (
              <Card key={language.code} className="p-6">
                <span className="text-5xl">{language.flag}</span>
                <p className="mt-5 text-sm font-black" style={{ color: language.color }}>{language.greeting}</p>
                <h3 className="mt-1 font-display text-2xl font-black">{language.name}</h3>
                <p className="mt-3 min-h-16 text-sm leading-6 text-slate-500">{language.description}</p>
                <div className="mt-5 flex items-center justify-between text-xs font-black text-slate-400"><span>8 levels · micro-lessons</span><ArrowRight size={17} /></div>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <section className="relative px-5 py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Layers3, title: t("featuresPath") },
            { icon: Heart, title: t("featuresHeart") },
            { icon: Flame, title: t("featuresDaily") },
            { icon: BrainCircuit, title: t("featuresReview") }
          ].map(({ icon: Icon, title }) => (
            <Card key={title} className="p-5">
              <Icon className="text-cyan-300" />
              <h3 className="mt-4 font-display text-lg font-black">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-500">{t("tagline")}</p>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}

