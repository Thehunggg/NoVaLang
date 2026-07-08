import { Link } from "react-router-dom";

export function Logo() {
  return (
    <Link to="/" className="group flex items-center gap-2.5" aria-label="NovaLang home">
      <span className="grid h-10 w-10 place-items-center rounded-2xl bg-grape-600 text-lg text-white shadow-lg shadow-violet-200 transition-transform group-hover:-rotate-6">N</span>
      <span className="font-display text-xl font-extrabold tracking-tight text-ink">Nova<span className="text-cyan-400">Lang</span></span>
    </Link>
  );
}
