import { CloudOff, LoaderCircle } from "lucide-react";

export function LoadingScreen({ label = "Preparing your lesson…" }: { label?: string }) {
  return <div className="grid min-h-[55vh] place-items-center"><div className="text-center"><LoaderCircle className="mx-auto mb-3 animate-spin text-grape-600" size={34} /><p className="font-bold text-slate-500">{label}</p></div></div>;
}

export function OfflineBadge() {
  return <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3 py-1.5 text-xs font-bold text-amber-800"><CloudOff size={14} /> Offline lesson pack</div>;
}
