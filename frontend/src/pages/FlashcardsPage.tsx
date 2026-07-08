import { CreditCard, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Flashcard } from "../components/learning/Flashcard";
import { PageContainer } from "../components/layout/PageContainer";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { useApp } from "../context/AppContext";
import { useTranslation } from "../i18n/useTranslation";

export function FlashcardsPage() {
  const { progress, removeFlashcard } = useApp();
  const { t } = useTranslation();
  return <PageContainer className="py-8 sm:py-11"><Badge tone="pink"><CreditCard size={12} /> {t("flashcards")}</Badge><h1 className="mt-4 font-display text-3xl font-black sm:text-4xl">{t("flashcardTitle")}</h1><p className="mt-3 max-w-xl text-sm leading-6 text-slate-500">{t("flashcardHelp")}</p>{progress.savedFlashcards.length ? <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{progress.savedFlashcards.map((card) => <Flashcard key={card.id} card={card} onRemove={() => removeFlashcard(card.id)} />)}</div> : <Card className="mt-8 p-10 text-center"><Sparkles className="mx-auto text-fuchsia-300" size={44} /><h2 className="mt-5 font-display text-2xl font-black">{t("flashcardEmpty")}</h2><p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">{t("reviewEmptyHelp")}</p><Link to="/"><Button className="mt-6">{t("coursePathButton")}</Button></Link></Card>}</PageContainer>;
}
