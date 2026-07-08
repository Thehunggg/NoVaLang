import { X } from "lucide-react";
import type { ReactNode } from "react";

export function Modal({ open, title, children, onClose }: { open: boolean; title: string; children: ReactNode; onClose: () => void }) {
  if (!open) return null;
  return <div className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-4 backdrop-blur-sm" role="dialog" aria-modal="true"><div className="w-full max-w-md rounded-3xl border border-white/10 bg-[#151020] p-6 shadow-2xl"><div className="mb-5 flex items-center justify-between"><h2 className="font-display text-xl font-black text-white">{title}</h2><button onClick={onClose} className="rounded-lg p-2 text-slate-400 hover:bg-white/10 hover:text-white"><X size={19} /></button></div>{children}</div></div>;
}
